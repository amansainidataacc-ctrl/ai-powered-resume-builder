import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-4xl px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-heading text-4xl font-bold text-foreground">Ready to build your <span className="gradient-text">perfect resume?</span></h2>
        <p className="mt-4 text-text-secondary">Join thousands of Indian professionals who landed their dream jobs.</p>
        <Link
          to="/builder"
          className="mt-8 inline-flex items-center gap-2 rounded-card px-8 py-4 text-base font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.02] hover:shadow-glow"
        >
          Start Building Free <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
