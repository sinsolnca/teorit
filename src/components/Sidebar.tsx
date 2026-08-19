import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import { loadManifest } from '@utils/content'
import type { SubjectManifest, TopicManifest } from '@types-def/content'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const [subjects, setSubjects] = useState<SubjectManifest[]>([])
  const [expanded, setExpanded] = useState<string[]>([])

  // Auto-expand current subject
  useEffect(() => {
    const subjectSlug = location.pathname.split('/')[2]
    if (subjectSlug && subjects.find(s => s.slug === subjectSlug)) {
      setExpanded(prev => prev.includes(subjectSlug) ? prev : [...prev, subjectSlug])
    }
  }, [location.pathname, subjects])

  useEffect(() => {
    loadManifest().then(data => setSubjects(data.subjects))
  }, [])

  const toggleSubject = (slug: string) => {
    setExpanded(prev => prev.includes(slug)
      ? prev.filter(s => s !== slug)
      : [...prev, slug]
    )
  }

  if (subjects.length === 0) return null

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[var(--bg-primary)] border-r border-[var(--border-light)] transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Subjects navigation"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[var(--border-light)] lg:hidden flex items-center justify-between">
            <h2 className="font-semibold text-[var(--text-primary)]">Subjects</h2>
            <button onClick={onClose} className="btn-ghost p-1" aria-label="Close sidebar">
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-6" aria-label="Subjects list">
            {subjects.map(subject => (
              <SubjectCard
                key={subject.slug}
                subject={subject}
                isExpanded={expanded.includes(subject.slug)}
                onToggle={() => toggleSubject(subject.slug)}
                currentPath={location.pathname}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--border-light)]">
            <p className="text-xs text-[var(--text-muted)] text-center">
              Teorit — school theory for everyone
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

function SubjectCard({
  subject,
  isExpanded,
  onToggle,
  currentPath,
}: {
  subject: SubjectManifest
  isExpanded: boolean
  onToggle: () => void
  currentPath: string
}) {
  const IconComponent = Icon as any
  const isActive = currentPath.startsWith(`/subject/${subject.slug}`) || currentPath.startsWith(`/topic/${subject.slug}/`)

  return (
    <div className={`card overflow-hidden ${isActive ? 'border-[var(--brand-primary)]/50' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 text-left"
        aria-expanded={isExpanded}
      >
        <Icon name={subject.icon as keyof typeof import('./Icons').Icons} size={20} className="text-[var(--brand-primary)] shrink-0" />
        <span className="font-medium text-[var(--text-primary)] flex-1 text-left">{subject.title}</span>
        <Icon name={isExpanded ? 'chevronDown' : 'chevronRight'} size={16} className="text-[var(--text-muted)] transition-transform" />
      </button>

      {isExpanded && (
        <ul className="space-y-1 px-3 pb-3 border-t border-[var(--border-light)] mt-1" role="list">
          {subject.topics.map(topic => (
            <li key={topic.slug}>
              <Link
                to={`/topic/${subject.slug}/${topic.slug}`}
                className={`sidebar-link block w-full ${currentPath === `/topic/${subject.slug}/${topic.slug}` ? 'active' : ''}`}
              >
                <span className="truncate">{topic.title}</span>
                {topic.tags.length > 0 && (
                  <span className="ml-2 text-xs text-[var(--text-muted)]">({topic.tags[0]})</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}