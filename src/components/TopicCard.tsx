import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { formatDate } from '@utils/content'
import type { TopicManifest } from '@types-def/content'

interface TopicCardProps {
  topic: TopicManifest
  subjectSlug: string
}

export function TopicCard({ topic, subjectSlug }: TopicCardProps) {
  return (
    <Link
      to={`/topic/${subjectSlug}/${topic.slug}`}
      className="card p-5 hover:shadow-md transition-all duration-200 group flex flex-col"
    >
      <div className="flex items-start gap-3">
        <Icon name={subjectSlug as keyof typeof import('./Icons').Icons} size={20} className="text-[var(--brand-primary)] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
            {topic.title}
          </h3>
          {topic.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {topic.tags.slice(0, 3).map(tag => (
                <span key={tag} className="badge-secondary text-xs">{tag}</span>
              ))}
              {topic.tags.length > 3 && (
                <span className="badge-secondary text-xs">+{topic.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
      {topic.updated && (
        <div className="mt-3 pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Updated {formatDate(topic.updated)}</span>
          <Icon name="chevronRight" size={14} className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
        </div>
      )}
    </Link>
  )
}