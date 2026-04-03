import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { generateSummary } from '@/utils/aiClient';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';

const SummarySection = () => {
  const { data, updateData } = useResume();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const summary = await generateSummary(data.personalInfo);
      updateData({ summary });
      toast.success('Summary generated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-card bg-surface-tertiary p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Professional Summary</h3>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          {loading ? 'Generating...' : 'AI Generate'}
        </button>
      </div>
      <textarea
        value={data.summary}
        onChange={e => updateData({ summary: e.target.value })}
        placeholder="A brief 2-3 sentence summary of your professional background..."
        rows={5}
        className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">{data.summary.length}/400 characters</span>
      </div>
    </div>
  );
};

export default SummarySection;
