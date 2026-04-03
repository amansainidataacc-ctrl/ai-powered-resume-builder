import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ResumeProvider } from './context/ResumeContext'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import TemplatesPage from './pages/TemplatesPage'

export default function App() {
  return (
    <ResumeProvider>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="*" element={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4">404</h1>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          </div>
        } />
      </Routes>
    </ResumeProvider>
  )
}
