import { Link } from 'react-router-dom'
import { Icon } from './Icons'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="Teorit Home">
              <Icon name="literature" size={24} className="text-[var(--brand-primary)]" />
              <span className="text-lg font-bold text-[var(--text-primary)]">Teorit</span>
            </Link>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              School theory for everyone. Algebra, Geometry, Russian, Literature and more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">Subjects</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/subject/algebra" className="hover:text-[var(--brand-primary)] transition-colors">Algebra</Link></li>
              <li><Link to="/subject/geometry" className="hover:text-[var(--brand-primary)] transition-colors">Geometry</Link></li>
              <li><Link to="/subject/russian" className="hover:text-[var(--brand-primary)] transition-colors">Russian</Link></li>
              <li><Link to="/subject/literature" className="hover:text-[var(--brand-primary)] transition-colors">Literature</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/search" className="hover:text-[var(--brand-primary)] transition-colors">Search</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-primary)] transition-colors">GitHub</a></li>
              <li><Link to="/about" className="hover:text-[var(--brand-primary)] transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/privacy" className="hover:text-[var(--brand-primary)] transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--brand-primary)] transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-light)] text-center text-sm text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Teorit. Built with React, TypeScript & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}