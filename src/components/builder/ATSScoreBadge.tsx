import { useResume } from '../../context/ResumeContext'
export default function ATSScoreBadge() {
  const { atsScore } = useResume()
  const color = atsScore >= 71 ? '#00c896' : atsScore >= 41 ? '#ffb547' : '#ff5757'
  const label = atsScore >= 71 ? 'Great!' : atsScore >= 41 ? 'Improve' : 'Needs work'
  const c = 2 * Math.PI * 16
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
      <div className="relative flex h-9 w-9 items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 36 36" className="absolute">
          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c*(1-atsScore/100)} transform="rotate(-90 18 18)"
            style={{transition:'stroke-dashoffset 0.5s ease'}}/>
        </svg>
        <span className="text-[9px] font-bold" style={{color}}>{atsScore}</span>
      </div>
      <div>
        <div className="text-xs font-semibold text-white">ATS Score</div>
        <div className="text-[10px]" style={{color}}>{label}</div>
      </div>
    </div>
  )
}
