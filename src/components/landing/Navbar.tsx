import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/"><img src="/logo.png" alt="Analytics Career Connect" className="h-10 w-auto" /></Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/templates" className="text-sm text-gray-400 hover:text-white transition-colors">Templates</Link>
          <Link to="/builder" className="text-sm text-gray-400 hover:text-white transition-colors">Builder</Link>
        </div>
        <Link to="/builder" className="btn-primary text-sm px-5 py-2.5">Build Free Resume</Link>
      </div>
    </nav>
  )
}
