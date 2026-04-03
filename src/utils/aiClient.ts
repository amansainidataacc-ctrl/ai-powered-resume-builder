const BASE = 'https://integrate.api.nvidia.com/v1/chat/completions'
const MODELS = {
  quality: 'meta/llama-4-maverick-17b-128e-instruct',
  fast: 'mistralai/mistral-large-3-675b-instruct-2512',
  analysis: 'deepseek-ai/deepseek-v3.2',
  fallback: 'meta/llama-3.1-8b-instruct',
}
const KEYS = {
  quality: import.meta.env.VITE_NVIDIA_KEY_QUALITY,
  fast: import.meta.env.VITE_NVIDIA_KEY_FAST,
  analysis: import.meta.env.VITE_NVIDIA_KEY_ANALYSIS,
  fallback: import.meta.env.VITE_NVIDIA_KEY_FALLBACK,
}
type M = keyof typeof MODELS
function clean(s: string) { return s.replace(/```json\n?/gi,'').replace(/```\n?/gi,'').trim() }

async function call(model: string, key: string, msgs: {role:string,content:string}[], temp=0.7, tokens=1024): Promise<string> {
  if (!key) throw new Error('API key missing')
  const r = await fetch(BASE, {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
    body: JSON.stringify({ model, messages:msgs, temperature:temp, max_tokens:tokens })
  })
  if (!r.ok) throw new Error(`API ${r.status}`)
  const d = await r.json()
  const c = d.choices?.[0]?.message?.content?.trim() || ''
  if (!c) throw new Error('Empty response')
  return c
}

async function ai(type: M, msgs: {role:string,content:string}[], temp?: number, tokens?: number): Promise<string> {
  const t = temp ?? (type==='analysis'?0.3:0.7)
  const tk = tokens ?? (type==='fast'?512:1024)
  try { return await call(MODELS[type], KEYS[type], msgs, t, tk) }
  catch { return await call(MODELS.fallback, KEYS.fallback, msgs, 0.7, 512) }
}

export async function generateSummary(p: {fullName:string,targetRole:string,industry:string,yearsOfExperience:string,professionalTitle:string}) {
  return ai('quality', [
    { role:'system', content:'You are an expert Indian resume writer. Write 3-4 line professional summaries that sound completely human. Never use: passionate, hardworking, team player, go-getter. Be specific. Return ONLY the summary text.' },
    { role:'user', content:`Write summary for: Name: ${p.fullName}, Role: ${p.targetRole}, Industry: ${p.industry}, Experience: ${p.yearsOfExperience} years. Indian job market context.` }
  ], 0.7, 300)
}

export async function enhanceBullet(bullet: string, role: string) {
  return ai('quality', [
    { role:'system', content:'Transform rough bullets into achievement statements. Start with action verb. Add metrics. Under 120 chars. Sound human. Return ONLY the enhanced bullet.' },
    { role:'user', content:`Enhance for ${role}: "${bullet}"` }
  ], 0.6, 150)
}

export async function suggestSkills(role: string, industry: string, existing: string[]): Promise<string[]> {
  const r = await ai('fast', [
    { role:'system', content:'Suggest skills. Return ONLY valid JSON array: ["skill1","skill2"]. No markdown.' },
    { role:'user', content:`12 skills for ${role} in ${industry}. Skip: ${existing.join(', ')}. Indian market.` }
  ], 0.5, 300)
  try { const m = r.match(/\[[\s\S]*\]/); return m ? JSON.parse(m[0]) : [] } catch { return [] }
}

export async function analyzeJobMatch(resumeText: string, jd: string): Promise<{score:number,matchedSkills:string[],missingSkills:string[],suggestions:string[]}> {
  const r = await ai('analysis', [
    { role:'system', content:'Analyze resume vs JD. Return ONLY valid JSON, no markdown.' },
    { role:'user', content:`RESUME:\n${resumeText.slice(0,2000)}\n\nJD:\n${jd.slice(0,2000)}\n\nReturn: {"score":72,"matchedSkills":["React"],"missingSkills":["Docker"],"suggestions":["Add Docker"]}` }
  ], 0.3, 800)
  try { const m = r.match(/\{[\s\S]*\}/); return m ? JSON.parse(clean(m[0])) : {score:50,matchedSkills:[],missingSkills:[],suggestions:[]} }
  catch { return {score:50,matchedSkills:[],missingSkills:[],suggestions:['Analysis failed. Try again.']} }
}
