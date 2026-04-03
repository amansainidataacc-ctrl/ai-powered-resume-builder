import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { analyzeJobMatch } from '../../utils/aiClient';
import { toast } from 'sonner';
import { Target, Loader2 } from 'lucide-react';

const JDMatcher = () => {
  const { data, updateData } = useResume();
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    suggestions: string[];
  } | null>(null);

  const getResumeText = () => {
    const p = data.personalInfo;
    const parts = [
      p.fullName, p.professionalTitle, p.targetRole, p.industry,
      data.summary,
      ...data.experience.flatMap(e => [e.jobTitle, e.company, ...e.bullets]),
      ...data.education.map(e => `${e.degree} ${e.fieldOfStudy} ${e.institution}`),
      ...data.skills.technical,
      ...data.skills.soft,
      ...data.skills.tools,
      ...data.projects.map(p => `${p.name} ${p.description}`),
      ...data.certifications.map(c => c.name),
    ];
    return parts.filter(Boolean).join(' ');
  };

  const handleAnalyze = async () => {
    if (!jd.trim()) {
      toast.error('Please paste a job description');
      return;
    }
    setLoading(true);
    try {
      const res = await analyzeJobMatch(getResumeText(), jd);
      setResult(res);
      toast.success('Analysis complete!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  const addMissingSkill = (skill: string) => {
    if (!data.skills.technical.includes(skill)) {
      updateData({
        skills: { ...data.skills, technical: [...data.skills.technical, skill] },
      });
      toast.success(`Added "${skill}" to technical skills`);
    }
  };

  const circumference = 2 * Math.PI * 40;
  const offset = result ? circumference - (result.score / 100) * circumference : circumference;
  const scoreColor = result ? (result.score >= 80 ? '#00c896' : result.score >= 50 ? '#ffb547' : '#ff5757') : '#6c63ff';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-accent" />
        <h3 className="font-heading text-base font-bold text-foreground">Job Description Matcher</h3>
      </div>

      <div className="rounded-card bg-surface-tertiary p-5 space-y-4">
        <textarea
          value={jd}
          onChange={e => setJd(e.target.value)}
          placeholder="Paste the job description here..."
          rows={6}
          className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 resize-none"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-card px-4 py-2.5 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.01] disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
          {loading ? 'Analyzing...' : 'Analyze Match'}
        </button>
      </div>

      {result && (
        <div className="rounded-card bg-surface-tertiary p-5 space-y-4">
          <div className="flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
              <circle
                cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="6"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 50 50)"
                className="transition-all duration-700"
              />
              <text x="50" y="54" textAnchor="middle" fill={scoreColor} fontSize="22" fontWeight="bold">
                {result.score}
              </text>
            </svg>
          </div>

          {result.matchedSkills.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-success">✓ Matched Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedSkills.map(s => (
                  <span key={s} className="rounded-pill bg-success/15 px-2.5 py-1 text-xs font-medium text-success">{s}</span>
                ))}
              </div>
            </div>
          )}

          {result.missingSkills.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-warning">⚠ Missing Skills — click to add</p>
              <div className="flex flex-wrap gap-1.5">
                {result.missingSkills.map(s => (
                  <button
                    key={s}
                    onClick={() => addMissingSkill(s)}
                    className="rounded-pill bg-warning/15 px-2.5 py-1 text-xs font-medium text-warning hover:bg-warning/25 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result.suggestions.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-text-secondary">💡 Suggestions</p>
              <ul className="space-y-1.5">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-text-muted">• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JDMatcher;
