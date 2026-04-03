import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { templates } from '@/types/resume';

// Show first 6 on homepage, rest on /templates page
const SHOWCASE_LIMIT = 6;

const TemplateShowcase = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground">
          Choose your <span className="gradient-text">perfect template</span>
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-16 text-center text-text-secondary"
      >
        30+ templates designed for every Indian professional — fresher to executive
      </motion.p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.slice(0, SHOWCASE_LIMIT).map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-card-lg border border-border bg-surface-tertiary transition-all hover:-translate-y-1 hover:border-accent/30"
          >
            {/* Template thumbnail */}
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
            <div className="absolute inset-0 flex items-center justify-center bg-surface-primary/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Link
                to="/builder"
                search={{ template: t.id }}
                className="rounded-card px-6 py-3 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-105"
              >
                Use Template →
              </Link>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.name}</h3>
                <p className="text-xs text-text-muted capitalize">{t.category.replace('-', ' ')}</p>
              </div>
              <div className="flex gap-1.5">
                {t.tags.map(tag => (
                  <span key={tag} className="rounded-pill bg-success/15 px-2 py-0.5 text-xs font-medium text-success">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/templates" className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80">
          View all 30+ templates →
        </Link>
      </div>
    </div>
  </section>
);

export default TemplateShowcase;
