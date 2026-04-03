import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import { templates, TemplateCategory } from '../types/resume'

const cats: {label:string,value:TemplateCategory}[] = [
  {label:'All (30)',value:'all'},{label:'IT Fresher',value:'it-fresher'},
  {label:'MBA',value:'mba'},{label:'Experienced',value:'experienced'},
  {label:'Creative',value:'creative'},{label:'Naukri',value:'naukri'},
  {label:'Government',value:'government'},{label:'International',value:'international'},
  {label:'Data',value:'data'},{label:'Finance',value:'finance'},
]

export default function TemplatesPage() {
  const [filter, setFilter] = useState<TemplateCategory>('all')
  const filtered = filter === 'all' ? templates : templates.filter(t => t.category === filter)
  return (
    <div className="min-h-screen surface-primary">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-white">30+ Professional <span className="gradient-text">Templates</span></h1>
          <p className="mt-4 text-gray-400">Designed for every Indian professional — fresher to executive. All free.</p>
        </motion.div>
        <div className="mb-12 mt-8 flex flex-wrap justify-center gap-2">
          {cats.map(c => (
            <button key={c.value} onClick={() => setFilter(c.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${filter===c.value?'gradient-bg text-white':'border border-white/10 text-gray-400 hover:bg-white/5'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <p className="mb-6 text-center text-xs text-gray-600">Showing {filtered.length} templates</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t,i) => (
            <motion.div key={t.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
              className="group relative overflow-hidden rounded-card-lg border border-white/10 bg-[#1a1f2e] hover:-translate-y-1 transition-all hover:border-purple-500/30">
              <div className="aspect-[3/4] p-4" style={{background:`${t.accent}18`}}>
                <div className="h-full rounded bg-white p-4 shadow">
                  <div className="h-3 w-2/3 rounded mb-2" style={{background:t.accent}} />
                  <div className="h-1.5 w-1/3 rounded mb-3 opacity-40" style={{background:t.accent}} />
                  <div className="h-px bg-gray-200 mb-2"/>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-gray-200"/><div className="h-1.5 w-4/5 rounded bg-gray-200"/><div className="h-1.5 w-3/5 rounded bg-gray-200"/>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <div className="h-3 w-10 rounded-full opacity-30" style={{background:t.accent}}/><div className="h-3 w-8 rounded-full opacity-30" style={{background:t.accent}}/>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm">
                <p className="px-4 text-center text-xs text-gray-300">{t.description}</p>
                <Link to={`/builder?template=${t.id}`} className="btn-primary text-sm px-5 py-2.5">Use Template →</Link>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-sm font-bold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">ATS: {t.atsScore}/100</p>
                  </div>
                  <span className="tag tag-success">{t.tags[0]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
