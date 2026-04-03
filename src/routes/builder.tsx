import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { FileText, ArrowLeft, Download } from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import FormPanel from "@/components/builder/FormPanel";
import PreviewPanel from "@/components/builder/PreviewPanel";
import ATSScoreBadge from "@/components/builder/ATSScoreBadge";
import { toast } from "sonner";

export const Route = createFileRoute("/builder")({
  validateSearch: (search: Record<string, unknown>): { template?: string } => ({
    template: (search.template as string) || undefined,
  }),
  component: BuilderPage,
});

function BuilderPage() {
  const { template } = Route.useSearch();
  const { data, updateData } = useResume();

  useEffect(() => {
    if (template) updateData({ templateId: template });
  }, [template, updateData]);

  const handleDownload = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ResumePDF } = await import(
        "@/components/pdf/ResumePDF"
      );
      const blob = await pdf(<ResumePDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const name =
        data.personalInfo.fullName?.replace(/\s+/g, "_") || "Resume";
      a.href = url;
      a.download = `${name}_Resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      toast.success("Resume downloaded successfully!");
    } catch {
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-surface-primary">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-secondary px-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-bg">
              <FileText className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
            <span className="font-heading font-bold text-foreground">
              ResumeAI
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ATSScoreBadge />
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-card px-4 py-2 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] shrink-0 overflow-y-auto border-r border-border bg-surface-secondary">
          <FormPanel />
        </div>
        <div className="flex-1 overflow-auto bg-surface-hover">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
