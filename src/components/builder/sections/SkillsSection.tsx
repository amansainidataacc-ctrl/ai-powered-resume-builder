import { useState, KeyboardEvent } from 'react';
import { useResume } from '@/context/ResumeContext';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { suggestSkills } from '@/utils/aiClient';
import { toast } from 'sonner';

const TagInput = ({ label, tags, onAdd, onRemove }: {
  label: string; tags: string[]; onAdd: (t: string) => void; onRemove: (i: number) => void;
}) => {
  const [input, setInput] = useState('');
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-secondary">{label}</label>
      <div className="flex flex-wrap gap-1.5 rounded-input border border-input bg-surface-primary p-2">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-pill bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
            {t}
            <button onClick={() => onRemove(i)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type + Enter"
          className="min-w-[100px] flex-1 bg-transparent text-sm text-foreground placeholder:text-text-muted outline-none"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { data, updateData } = useResume();
  const s = data.skills;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const addSkill = (type: keyof typeof s, skill: string) => {
    if (!s[type].includes(skill)) {
      updateData({ skills: { ...s, [type]: [...s[type], skill] } });
    }
  };

  const removeSkill = (type: keyof typeof s, index: number) => {
    updateData({ skills: { ...s, [type]: s[type].filter((_, i) => i !== index) } });
  };

  const handleSuggest = async () => {
    setLoadingSuggestions(true);
    try {
      const result = await suggestSkills(
        data.personalInfo.targetRole,
        data.personalInfo.industry,
        s.technical
      );
      setSuggestions(result.filter(sk => !s.technical.includes(sk)));
      toast.success('Skills suggested!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to suggest skills');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const addSuggestion = (skill: string) => {
    addSkill('technical', skill);
    setSuggestions(prev => prev.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Skills</h3>
        <button
          onClick={handleSuggest}
          disabled={loadingSuggestions}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
        >
          {loadingSuggestions ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          {loadingSuggestions ? 'Suggesting...' : 'Suggest Skills'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="rounded-card border border-accent/20 bg-accent/5 p-3">
          <p className="mb-2 text-xs font-medium text-text-secondary">AI Suggestions — click to add:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map(sk => (
              <button
                key={sk}
                onClick={() => addSuggestion(sk)}
                className="rounded-pill bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/25"
              >
                + {sk}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-card bg-surface-tertiary p-5 space-y-4">
        <TagInput label="Technical Skills" tags={s.technical} onAdd={t => addSkill('technical', t)} onRemove={i => removeSkill('technical', i)} />
        <TagInput label="Soft Skills" tags={s.soft} onAdd={t => addSkill('soft', t)} onRemove={i => removeSkill('soft', i)} />
        <TagInput label="Tools & Technologies" tags={s.tools} onAdd={t => addSkill('tools', t)} onRemove={i => removeSkill('tools', i)} />
      </div>
    </div>
  );
};

export default SkillsSection;
