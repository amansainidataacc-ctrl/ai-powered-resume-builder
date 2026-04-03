import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { templates, TemplateCategory } from "@/types/resume";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

const categories: { label: string; value: TemplateCategory }[] = [
  { label: "All (30)", value: "all" },
  { label: "IT Fresher", value: "it-fresher" },
  { label: "MBA", value: "mba" },
  { label: "Experienced IT", value: "experienced" },
  { label: "Creative", value: "creative" },
  { label: "Naukri Style", value: "naukri" },
  { label: "Government", value: "government" },
  { label: "International", value: "international" },
  { label: "Data & Analytics", value: "data" },
  { label: "Finance", value: "finance" },
];

function TemplatesPage() {
  const [filter, setFilter] = useState<TemplateCategory>("all");
  const filtered =
    filter === "all" ? templates : templates.filter((t) => t.category === filter);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <h1 className="font-heading text-5xl font-bold text-foreground">
            30+ Professional <span className="gradient-text">Templates</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Designed for every Indian professional — fresher to executive. All free.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="mb-12 mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition-all ${
                filter === c.value
                  ? "gradient-bg text-accent-foreground shadow-glow"
                  : "border border-border text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-xs text-text-muted">
          Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-card-lg border border-border bg-surface-tertiary transition-all hover:-translate-y-1 hover:border-accent/30"
            >
              {/* Colored thumbnail */}
              <div className="aspect-[3/4] p-4" style={{ background: `${t.accent}18` }}>
                <div className="h-full rounded-sm bg-white p-4 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-3 w-2/3 rounded-sm" style={{ background: t.accent }} />
                    <div className="h-1.5 w-1/3 rounded-sm opacity-50" style={{ background: t.accent }} />
                    <div className="mt-3 h-px bg-gray-200" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full rounded-sm bg-gray-200" />
                      <div className="h-1.5 w-4/5 rounded-sm bg-gray-200" />
                      <div className="h-1.5 w-3/5 rounded-sm bg-gray-200" />
                    </div>
                    <div className="mt-2 h-px bg-gray-100" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-full rounded-sm bg-gray-100" />
                      <div className="h-1.5 w-5/6 rounded-sm bg-gray-100" />
                    </div>
                    <div className="mt-2 flex gap-1">
                      <div className="h-3 w-10 rounded-full opacity-40" style={{ background: t.accent }} />
                      <div className="h-3 w-8 rounded-full opacity-40" style={{ background: t.accent }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-primary/85 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <p className="text-xs text-text-secondary px-4 text-center">{t.description}</p>
                <Link
                  to="/builder"
                  search={{ template: t.id }}
                  className="rounded-card px-5 py-2.5 text-sm font-semibold text-accent-foreground gradient-bg hover:scale-105 transition-all"
                >
                  Use Template →
                </Link>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground">{t.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">ATS: {t.atsScore}/100</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {t.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="rounded-pill bg-success/15 px-2 py-0.5 text-xs font-medium text-success whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
