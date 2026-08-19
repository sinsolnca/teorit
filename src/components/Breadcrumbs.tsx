import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { useLocation } from 'react-router-dom'
import { loadManifest } from '@utils/content'
import { useEffect, useState } from 'react'
import type { SubjectManifest, TopicManifest } from '@types-def/content'

export function Breadcrumbs() {
  const location = useLocation()
  const [subjects, setSubjects] = useState<SubjectManifest[]>([])

  useEffect(() => {
    loadManifest().then(data => setSubjects(data.subjects))
  }, [])

  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const getSubject = (slug: string) => subjects.find(s => s.slug === slug)
  const getTopic = (subjectSlug: string, topicSlug: string) => {
    const subject = getSubject(subjectSlug)
    return subject?.topics.find(t => t.slug === topicSlug)
  }

  const breadcrumbs = segments.map((segment, index) => {
    const isLast = index === segments.length - 1
    const path = '/' + segments.slice(0, index + 1).join('/')

    if (index === 0) {
      return { label: 'Home', path: '/', isLast: segments.length === 1 }
    }
    if (index === 1 && segments[0] === 'subject') {
      const subject = getSubject(segment)
      const title = subject?.title
      const label: string = title ?? segment
      return { label, path, isLast }
    }
    if (index === 2 && segments[0] === 'topic') {
      const topic = getTopic(segments[1], segment)
      const title = topic?.title
      const label: string = title ?? segment
      return { label, path, isLast }
    }
    if (index === 1 && segments[0] === 'search') {
      return { label: 'Search', path: '/search', isLast: true }
    }
    return { label: segment, path, isLast }
  })

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <Icon name="chevronRight" size={14} className="text-[var(--text-muted)]" />}
            {crumb.isLast ? (
              <span className="text-[var(--text-primary)] font-medium truncate max-w-[300px]">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors truncate max-w-[200px]"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}