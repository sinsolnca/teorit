import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { SearchModal } from './SearchModal'
import { Icon } from './Icons'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="Teorit Home">
            <Icon name="literature" size={28} className="text-[var(--brand-primary)]" />
            <span className="text-xl font-bold text-[var(--text-primary)]">Teorit</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/search" className="btn-ghost text-sm">Search</Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm flex items-center gap-1"
              aria-label="GitHub"
            >
              <Icon name="github" size={18} />
              <span>GitHub</span>
            </a>
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <SearchModal />
    </header>
  )
}