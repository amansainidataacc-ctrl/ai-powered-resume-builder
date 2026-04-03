import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import { toast } from 'sonner'
import { useResume } from '../context/ResumeContext'
import ATSScoreBadge from '../components/builder/ATSScoreBadge'
import FormPanel from '../components/builder/FormPanel'
import PreviewPanel from '../components/builder/PreviewPanel'

export default function BuilderPage() {
  const [searchParams] = useSearchParams()
  const template = searchParams.get('template')
  const { data, updateData } = useResume()

  useEffect(() => {
    if (template) updateData({ templateId: template })
  }, [template])

  const handleDownload = async () => {
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { default: ResumePDF } = await import('../components/pdf/ResumePDF')
      const blob = await pdf(<ResumePDF data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${data.personalInfo.fullName?.replace(/\s+/g,'_') || 'Resume'}_Resume.pdf`
      a.click()
      URL.revokeObjectURL(url)
      const confetti = (await import('canvas-confetti')).default
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      toast.success('Resume downloaded!')
    } catch (e) {
      toast.error('Download failed. Try again.')
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#0f1117]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#1a1f2e] px-4">
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <img src="/logo.png" alt="Analytics Career Connect" className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <ATSScoreBadge />
          <button onClick={handleDownload} className="btn-primary text-sm px-4 py-2">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] shrink-0 overflow-y-auto border-r border-white/10 bg-[#1a1f2e]">
          <FormPanel />
        </div>
        <div className="flex-1 overflow-auto bg-[#242938]">
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
