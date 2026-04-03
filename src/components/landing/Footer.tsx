import { Link } from '@tanstack/react-router';

const Footer = () => (
  <footer className="border-t border-border bg-surface-secondary py-12">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Analytics Career Connect" className="h-9 w-auto" />
          </Link>
          <p className="text-sm text-text-muted leading-relaxed">
            AI-powered resume builder for Indian professionals. Free forever.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Features</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/builder" className="hover:text-foreground transition-colors">AI Resume Builder</Link></li>
            <li><Link to="/builder" className="hover:text-foreground transition-colors">ATS Score Checker</Link></li>
            <li><Link to="/builder" className="hover:text-foreground transition-colors">JD Matcher</Link></li>
            <li><Link to="/builder" className="hover:text-foreground transition-colors">PDF Download</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Templates</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/templates" className="hover:text-foreground transition-colors">IT Fresher</Link></li>
            <li><Link to="/templates" className="hover:text-foreground transition-colors">MBA</Link></li>
            <li><Link to="/templates" className="hover:text-foreground transition-colors">Naukri Style</Link></li>
            <li><Link to="/templates" className="hover:text-foreground transition-colors">Creative</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Resources</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><span className="cursor-default">Resume Tips</span></li>
            <li><span className="cursor-default">Interview Prep</span></li>
            <li><span className="cursor-default">Cover Letters</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center">
        <p className="text-sm text-text-muted">© 2026 Analytics Career Connect. 100% Free. Made with ❤️ in India.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
