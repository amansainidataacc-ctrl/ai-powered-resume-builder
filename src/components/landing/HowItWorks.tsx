import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Choose Template', desc: 'Pick from 28 templates designed for Indian professionals' },
  { num: '02', title: 'Add Your Details + AI', desc: 'Fill in your info and let AI enhance every section' },
  { num: '03', title: 'Download Free PDF', desc: 'Get a beautiful, ATS-optimized resume instantly' },
];

const HowItWorks = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground">Three steps to your <span className="gradient-text">dream resume</span></h2>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-card-lg border border-border bg-surface-tertiary p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-bg text-xl font-bold text-accent-foreground">
              {s.num}
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-text-secondary">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
