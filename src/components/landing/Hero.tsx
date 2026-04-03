import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden bg-surface-primary pt-16">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] animate-float-slow" />
      <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent-secondary/15 blur-[100px] animate-float-slow" style={{ animationDelay: '5s' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
    </div>

    <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
      <div className="flex-[3] space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-pill gradient-border px-4 py-1.5 text-sm text-text-secondary"
        >
          <span className="shimmer inline-block rounded-pill bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">✦ New</span>
          India&apos;s AI Resume Builder for Every Professional
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl"
        >
          Build Resumes That<br />
          <span className="gradient-text">Get You Hired.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg text-lg leading-relaxed text-text-secondary"
        >
          AI-powered resume builder built for Indian professionals.
          Beat ATS systems. Land more interviews. 100% free PDF download.
        </motion.p>

        {/* Key benefits — no fake numbers */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          {[
            '30+ templates for every role — fresher to executive',
            'AI writes your summary & bullets in seconds',
            'Free PDF download — no login, no payment',
          ].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 rounded-card px-8 py-4 text-base font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            Create My Resume Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-card border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-surface-hover"
          >
            View 30+ Templates
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex-[2] hidden lg:block"
      >
        <div className="relative rounded-card-lg bg-foreground p-6 shadow-lg" style={{ transform: 'rotate(-3deg)' }}>
          <div className="space-y-3">
            <div className="h-4 w-3/4 rounded-sm bg-primary" />
            <div className="h-2 w-1/2 rounded-sm bg-accent/60" />
            <div className="mt-4 h-px w-full bg-border" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-sm bg-muted" />
              <div className="h-2 w-5/6 rounded-sm bg-muted" />
              <div className="h-2 w-4/6 rounded-sm bg-muted" />
            </div>
            <div className="mt-3 h-px w-full bg-border" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-sm bg-muted" />
              <div className="h-2 w-3/4 rounded-sm bg-muted" />
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-5 w-16 rounded-pill bg-accent/20" />
              <div className="h-5 w-12 rounded-pill bg-accent/20" />
              <div className="h-5 w-14 rounded-pill bg-accent/20" />
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -top-4 rounded-pill bg-success px-3 py-1 text-xs font-semibold text-success-foreground shadow-md animate-float">
          ✓ ATS Score: 94
        </div>
        <div className="absolute -bottom-3 -left-4 rounded-pill bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-md animate-float" style={{ animationDelay: '2s' }}>
          ⚡ AI Enhanced
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
