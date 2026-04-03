// ============================================================
// Analytics Career Connect — AI Client
// 4-model system with dedicated API keys per model
// ============================================================

const NVIDIA_BASE = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Each model has its own dedicated API key
const MODELS = {
  quality: {
    model: 'meta/llama-3.3-70b-instruct',
    key: import.meta.env.VITE_NVIDIA_KEY_QUALITY,
    temperature: 0.7,
    maxTokens: 1024,
  },
  analysis: {
    model: 'deepseek-ai/deepseek-v3.2',
    key: import.meta.env.VITE_NVIDIA_KEY_ANALYSIS,
    temperature: 0.3,
    maxTokens: 2048,
  },
  fast: {
    model: 'mistralai/mistral-7b-instruct-v0.2',
    key: import.meta.env.VITE_NVIDIA_KEY_FAST,
    temperature: 0.5,
    maxTokens: 512,
  },
  fallback: {
    model: 'meta/llama-3.1-8b-instruct',
    key: import.meta.env.VITE_NVIDIA_KEY_FALLBACK,
    temperature: 0.7,
    maxTokens: 512,
  },
};

type ModelType = keyof typeof MODELS;

// Strips markdown code fences from JSON responses
function cleanJSON(raw: string): string {
  return raw.replace(/```json\n?/gi, '').replace(/```\n?/gi, '').trim();
}

// Core fetch wrapper — uses model-specific key
async function callModel(
  modelType: ModelType,
  messages: { role: string; content: string }[],
): Promise<string> {
  const cfg = MODELS[modelType];

  if (!cfg.key) {
    throw new Error(`API key missing for model: ${modelType}. Check your .env file.`);
  }

  const res = await fetch(NVIDIA_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.key}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: cfg.temperature,
      max_tokens: cfg.maxTokens,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[${modelType}] API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim() ?? '';
  if (!content) throw new Error(`[${modelType}] Empty response`);
  return content;
}

// Tries primary model → falls back to llama-3.1-8b if it fails
async function callAI(
  modelType: ModelType,
  messages: { role: string; content: string }[],
): Promise<string> {
  try {
    return await callModel(modelType, messages);
  } catch (primaryErr) {
    console.error(`Primary model (${modelType}) failed:`, primaryErr);
    try {
      return await callModel('fallback', messages);
    } catch (fallbackErr) {
      console.error('Fallback also failed:', fallbackErr);
      throw new Error('AI service unavailable. Please try again in a moment.');
    }
  }
}

// ============================================================
// PUBLIC API — Use these functions in your components
// ============================================================

/** Generate professional summary — uses Llama 3.3 70B */
export async function generateSummary(personalInfo: {
  fullName: string;
  targetRole: string;
  industry: string;
  yearsOfExperience: string;
  professionalTitle: string;
}): Promise<string> {
  return callAI('quality', [
    {
      role: 'system',
      content:
        'You are an expert Indian resume writer with 15 years of experience. ' +
        'Write professional summaries that sound completely human and specific. ' +
        'Never use: passionate, hardworking, team player, go-getter, dynamic, results-driven. ' +
        'Return ONLY the summary text — no quotes, no labels, no explanation.',
    },
    {
      role: 'user',
      content:
        `Write a 3-4 line professional summary for:\n` +
        `Name: ${personalInfo.fullName || 'Professional'}\n` +
        `Role: ${personalInfo.targetRole || 'Professional'}\n` +
        `Industry: ${personalInfo.industry || 'Technology'}\n` +
        `Experience: ${personalInfo.yearsOfExperience || '0'} years\n` +
        `Title: ${personalInfo.professionalTitle || 'Professional'}\n\n` +
        `Indian job market context. Sound confident. No first-person "I".`,
    },
  ]);
}

/** Enhance a bullet point — uses Llama 3.3 70B */
export async function enhanceBullet(
  bullet: string,
  jobTitle: string,
  company: string,
): Promise<string> {
  return callAI('quality', [
    {
      role: 'system',
      content:
        'You are an expert resume writer. Transform rough bullet points into powerful achievement statements. ' +
        'Rules: Start with strong action verb. Add metrics where possible. ' +
        'Keep under 120 characters. Sound human, not AI. ' +
        'Return ONLY the enhanced bullet — nothing else.',
    },
    {
      role: 'user',
      content: `Enhance this bullet for ${jobTitle} at ${company}:\n"${bullet}"`,
    },
  ]);
}

/** Suggest relevant skills — uses Mistral 7B (fast) */
export async function suggestSkills(
  targetRole: string,
  industry: string,
  existingSkills: string[],
): Promise<string[]> {
  const result = await callAI('fast', [
    {
      role: 'system',
      content:
        'You are a technical recruiter. Suggest relevant skills. ' +
        'Return ONLY a valid JSON array of strings — no explanation, no markdown. ' +
        'Example: ["React", "Node.js", "AWS"]',
    },
    {
      role: 'user',
      content:
        `Suggest 12 skills for:\nRole: ${targetRole || 'Software Developer'}\n` +
        `Industry: ${industry || 'Technology'}\n` +
        `Already has: ${existingSkills.join(', ') || 'None'}\n` +
        `Indian job market focus. JSON array only.`,
    },
  ]);

  try {
    const match = result.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
  } catch {
    // ignore parse error
  }
  return result
    .split(',')
    .map(s => s.replace(/["[\]]/g, '').trim())
    .filter(Boolean);
}

/** Analyze JD vs Resume match — uses DeepSeek V3.2 (deep analysis) */
export async function analyzeJobMatch(
  resumeText: string,
  jobDescription: string,
): Promise<{
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}> {
  const result = await callAI('analysis', [
    {
      role: 'system',
      content:
        'You are an expert ATS analyst. Analyze resume-to-JD match deeply. ' +
        'Return ONLY valid raw JSON — no markdown, no explanation outside JSON.',
    },
    {
      role: 'user',
      content:
        `Analyze this resume against the job description.\n\n` +
        `RESUME:\n${resumeText.substring(0, 2000)}\n\n` +
        `JOB DESCRIPTION:\n${jobDescription.substring(0, 2000)}\n\n` +
        `Return this exact JSON:\n` +
        `{\n  "score": 72,\n  "matchedSkills": ["React", "Node.js"],\n` +
        `  "missingSkills": ["Docker", "AWS"],\n` +
        `  "suggestions": ["Add Docker to your work bullets", "Mention AWS in skills"]\n}`,
    },
  ]);

  try {
    const match = result.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(cleanJSON(match[0]));
  } catch {
    // ignore parse error
  }

  return {
    score: 50,
    matchedSkills: [],
    missingSkills: [],
    suggestions: ['Could not analyze. Please try again.'],
  };
}
