import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Target, FileText, BarChart2, Layout, Shield, ArrowRight } from 'lucide-react'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import { templates } from '../types/resume'

const features = [
  { icon: Zap, title: 'AI-Powered Content', desc: 'Generate human-sounding summaries and bullet points. Llama 3 AI — results so good recruiters cannot tell.', color: '#6c63ff' },
  { icon: Target, title: 'Job Description Matching', desc: 'Paste any JD and get instant match analysis. See missing keywords and increase your ATS score.', color: '#ff6584' },
  { icon: FileText, title: '100% Free PDF', desc: 'Download your resume as a PDF instantly. No login. No payment. No watermark. Free forever.', color: '#00c896' },
  { icon: BarChart2, title: 'Live ATS Score', desc: 'Real-time score as you type. Know exactly what is missing and fix it before applying.', color: '#0891B2' },
  { icon: Layout, title: '30+ Indian Templates', desc: 'Naukri format, IT fresher, MBA, government, creative — templates built for the Indian job market.', color: '#D97706' },
  { icon: Shield, title: 'No Account Needed', desc: 'Just open the builder and start. Your data stays in your browser. We never see your information.', color: '#7C3AED' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen surface-primary">
      <Navbar />
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-float-slow" />
          <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-pink-500/15 blur-[100px] animate-float-slow" style={{animationDelay:'5s'}} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-4 py-1.5 text-sm text-gray-400">
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-400">✦ New</span>
              India's AI Resume Builder for Every Professional
            </div>
            <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Build Resumes That<br />
              <span className="gradient-text">Get You Hired.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-400">
              AI-powered resume builder built for Indian professionals. Beat ATS systems. Land more interviews. 100% free PDF download.
            </p>
            <ul className="mb-10 space-y-2">
              {['30+ templates for every role — fresher to executive','AI writes your summary & bullets in seconds','Free PDF download — no login, no payment'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-400" />{item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link to="/builder" className="btn-primary text-base px-8 py-4">Create My Resume Free <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/templates" className="btn-secondary text-base px-8 py-4">View 30+ Templates</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-24 bg-[#1a1f2e]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center font-heading text-4xl font-bold text-white">Other resume builders <span className="gradient-text">rob you.</span> We don't.</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card-dark p-8">
              <h3 className="mb-6 font-heading text-xl font-bold text-red-400">The Problem ✗</h3>
              <ul className="space-y-3">
                {['Pay ₹2000+ just to download your own resume','Generic AI content that screams "ChatGPT wrote this"','Templates built for US market, not Indian jobs','No ATS optimization — rejected before human reads','Hidden charges after you spend hours building'].map(p => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="mt-0.5 text-red-400 font-bold">✗</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark p-8 border-purple-500/20">
              <h3 className="mb-6 font-heading text-xl font-bold text-green-400">Analytics Career Connect ✓</h3>
              <ul className="space-y-3">
                {['100% Free PDF download — always, no tricks','AI that learns YOUR story — sounds human, not robotic','30+ templates built for the Indian job market','Real-time ATS score — know before you apply','No account needed — just build and download'].map(s => (
                  <li key={s} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="mt-0.5 text-green-400 font-bold">✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center font-heading text-4xl font-bold text-white">Everything you need to <span className="gradient-text">land your dream job</span></h2>
          <p className="mb-16 text-center text-gray-400">Built for Indian professionals, from freshers to executives</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card-dark p-6 hover:-translate-y-1 transition-transform">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{background:`${f.color}20`}}>
                  <f.icon className="h-5 w-5" style={{color:f.color}} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-24 bg-[#1a1f2e]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center font-heading text-4xl font-bold text-white">Choose your <span className="gradient-text">perfect template</span></h2>
          <p className="mb-16 text-center text-gray-400">30+ templates designed for every Indian professional</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.slice(0, 6).map((t, i) => (
              <motion.div key={t.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                className="group relative overflow-hidden rounded-card-lg border border-white/10 bg-[#242938] hover:-translate-y-1 transition-all hover:border-purple-500/30">
                <div className="aspect-[3/4] p-4" style={{background:`${t.accent}18`}}>
                  <div className="h-full rounded bg-white p-4 shadow-sm">
                    <div className="h-3 w-2/3 rounded mb-2" style={{background:t.accent}} />
                    <div className="h-1.5 w-1/3 rounded mb-3 opacity-50" style={{background:t.accent}} />
                    <div className="h-px bg-gray-200 mb-2" />
                    <div className="space-y-1.5"><div className="h-1.5 w-full rounded bg-gray-200"/><div className="h-1.5 w-4/5 rounded bg-gray-200"/><div className="h-1.5 w-3/5 rounded bg-gray-200"/></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                  <Link to={`/builder?template=${t.id}`} className="btn-primary text-sm">Use Template →</Link>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div><p className="font-heading text-sm font-bold text-white">{t.name}</p><p className="text-xs text-gray-500 capitalize">{t.category.replace('-',' ')}</p></div>
                  <span className="tag tag-success">{t.tags[0]}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/templates" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">View all 30+ templates →</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center font-heading text-4xl font-bold text-white">From blank to hired in <span className="gradient-text">10 minutes</span></h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[{n:'01',t:'Choose Template',d:'Pick from 30+ templates designed for Indian professionals'},{n:'02',t:'Add Details + AI',d:'Fill your info and let AI enhance every section automatically'},{n:'03',t:'Download & Apply',d:'Download your ATS-optimized PDF free and start applying'}].map(s => (
              <div key={s.n} className="text-center">
                <div className="mb-4 font-heading text-5xl font-extrabold gradient-text">{s.n}</div>
                <h3 className="mb-2 font-heading text-xl font-bold text-white">{s.t}</h3>
                <p className="text-gray-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-bg">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold text-white">Your dream job is one resume away</h2>
          <p className="mb-8 text-purple-200">Start building for free. No account required.</p>
          <Link to="/builder" className="inline-flex items-center gap-2 rounded-card-lg bg-white px-8 py-4 text-base font-bold text-purple-700 hover:scale-105 transition-all">
            Build My Resume Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
