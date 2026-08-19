import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import type { SubjectManifest } from '@types-def/content'

interface SubjectCardProps {
  subject: SubjectManifest
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link
      to={`/subject/${subject.slug}`}
      className="card p-6 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[var(--brand-light)] rounded-xl text-[var(--brand-primary)] shrink-0">
          <Icon name={subject.icon as keyof typeof import('./Icons').Icons} size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
            {subject.title}
          </h3>
          {subject.description && (
            <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-2">{subject.description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}