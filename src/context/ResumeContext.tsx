import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { ResumeData, defaultResumeData } from '../types/resume'

interface ResumeContextType {
  data: ResumeData
  updateData: (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void
  atsScore: number
}
const ResumeContext = createContext<ResumeContextType | null>(null)
export const useResume = () => {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
const calcScore = (d: ResumeData) => {
  let s = 0
  const p = d.personalInfo
  if (p.fullName) s += 8; if (p.email) s += 7; if (p.phone) s += 7
  if (p.location) s += 3; if (p.professionalTitle) s += 5
  if (d.summary && d.summary.length > 50) s += 15; else if (d.summary) s += 5
  if (d.experience.length > 0) s += 15; if (d.experience.length > 1) s += 5
  if (d.education.length > 0) s += 10
  if (d.skills.technical.length >= 3) s += 8; else if (d.skills.technical.length > 0) s += 4
  if (d.skills.soft.length >= 2) s += 4
  if (d.projects.length > 0) s += 5; if (d.certifications.length > 0) s += 3
  return Math.min(s, 100)
}
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(defaultResumeData)
  const [atsScore, setAtsScore] = useState(0)
  useEffect(() => {
    try { const s = localStorage.getItem('acc-resume'); if (s) setData(JSON.parse(s)) } catch {}
  }, [])
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('acc-resume', JSON.stringify(data))
      setAtsScore(calcScore(data))
    }, 500)
    return () => clearTimeout(t)
  }, [data])
  const updateData = useCallback((updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setData(prev => typeof updater === 'function' ? updater(prev) : { ...prev, ...updater })
  }, [])
  return <ResumeContext.Provider value={{ data, updateData, atsScore }}>{children}</ResumeContext.Provider>
}
