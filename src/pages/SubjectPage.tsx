import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadManifest } from '@utils/content'
import { TopicCard } from '@components/TopicCard'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { Icon } from '@components/Icons'
import type { SubjectManifest, TopicManifest } from '@types-def/content'

export function SubjectPage() {
  const { subjectSlug } = useParams<{ subjectSlug: string }>()
  const [subject, setSubject] = useState<SubjectManifest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadManifest().then(data => {
      const found = data.subjects.find(s => s.slug === subjectSlug)
      setSubject(found || null)
      setLoading(false)
    })
  }, [subjectSlug])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="card p-5 animate-pulse">
            <div className="flex gap-3">
              <div className="h-10 w-10 bg-[var(--bg-tertiary)] rounded-xl" />
              <div className="flex-1">
                <div className="h-5 w-1/2 bg-[var(--bg-tertiary)] rounded mb-2" />
                <div className="h-4 w-1/3 bg-[var(--bg-tertiary)] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="text-center py-12">
        <Icon name="literature" size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">Subject not found</h1>
        <Link to="/" className="text-[var(--brand-primary)] hover:underline">← Back to home</Link>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumbs />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[var(--brand-light)] rounded-xl text-[var(--brand-primary)]">
            <Icon name={subject.icon as keyof typeof import('@components/Icons').Icons} size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{subject.title}</h1>
            {subject.description && (
              <p className="text-[var(--text-secondary)] mt-1">{subject.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subject.topics.map(topic => (
          <TopicCard key={topic.slug} topic={topic} subjectSlug={subject.slug} />
        ))}
      </div>

      {subject.topics.length === 0 && (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <Icon name="literature" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No topics yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}