import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1a1f2e] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/"><img src="/logo.png" alt="Analytics Career Connect" className="h-9 w-auto" /></Link>
            <p className="text-sm text-gray-500 leading-relaxed">AI-powered resume builder for Indian professionals. Free forever.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Features</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/builder" className="hover:text-white transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">ATS Score Checker</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">JD Matcher</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">Free PDF Download</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Templates</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/templates" className="hover:text-white transition-colors">IT Fresher</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">MBA</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Naukri Style</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Creative</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Resume Tips</li><li>Interview Prep</li><li>Cover Letters</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-600">© 2026 Analytics Career Connect. 100% Free. Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  )
}
