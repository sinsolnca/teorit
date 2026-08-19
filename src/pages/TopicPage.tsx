import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadManifest, loadTopic } from '@utils/content'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { ArticleRenderer } from '@components/ArticleRenderer'
import { TableOfContents } from '@components/TableOfContents'
import { PrintDownload } from '@components/PrintDownload'
import { Icon } from '@components/Icons'
import type { SubjectManifest, TopicManifest } from '@types-def/content'

export function TopicPage() {
  const { subjectSlug, topicSlug } = useParams<{ subjectSlug: string; topicSlug: string }>()
  const [subject, setSubject] = useState<SubjectManifest | null>(null)
  const [topic, setTopic] = useState<TopicManifest & { html: string; excerpt: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([])

  useEffect(() => {
    Promise.all([
      loadManifest(),
      loadTopic(subjectSlug!, topicSlug!)
    ]).then(([manifest, topicData]) => {
      const subj = manifest.subjects.find(s => s.slug === subjectSlug)
      setSubject(subj || null)
      if (topicData) {
        setTopic(topicData as any)
      }
      setLoading(false)
    })
  }, [subjectSlug, topicSlug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Breadcrumbs />
        {[1,2,3,4,5].map(i => (
          <div key={i} className="h-8 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <Breadcrumbs />
        <Icon name="literature" size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">Topic not found</h1>
        <Link to={`/subject/${subjectSlug}`} className="text-[var(--brand-primary)] hover:underline">← Back to subject</Link>
      </div>
    )
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: topic.excerpt,
    dateModified: topic.updated,
    author: { '@type': 'Organization', name: 'Teorit' },
    publisher: { '@type': 'Organization', name: 'Teorit' },
  }

  return (
    <article className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumbs />

      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
          <Link to={`/subject/${subjectSlug}`} className="hover:text-[var(--brand-primary)] transition-colors">
            <Icon name={subjectSlug as keyof typeof import('@components/Icons').Icons} size={16} />
            {subject?.title}
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{topic.title}</h1>
        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.tags.map(tag => (
              <span key={tag} className="badge-primary">{tag}</span>
            ))}
          </div>
        )}
        {topic.updated && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Icon name="download" size={16} />
            <span>Updated {new Date(topic.updated).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        )}
      </header>

      <PrintDownload title={topic.title} />

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <ArticleRenderer
            html={topic.html}
            onTocUpdate={setTocItems}
          />
        </div>

        <TableOfContents items={tocItems} />
      </div>

      <footer className="mt-12 pt-8 border-t border-[var(--border-light)]">
        <nav className="flex items-center justify-between" aria-label="Navigation">
          <Link
            to={`/subject/${subjectSlug}`}
            className="btn-secondary flex items-center gap-1.5"
          >
            <Icon name="back" size={16} />
            <span>Back to {subject?.title}</span>
          </Link>
          <Link to="/" className="btn-ghost flex items-center gap-1.5">
            <Icon name="home" size={16} />
            <span>Home</span>
          </Link>
        </nav>
      </footer>
    </article>
  )
}