import { Suspense, useEffect, useState } from 'react'
import { loadManifest } from '@utils/content'
import { SubjectCard } from '@components/SubjectCard'
import type { SubjectManifest } from '@types-def/content'

export function HomePage() {
  const [subjects, setSubjects] = useState<SubjectManifest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadManifest().then(data => {
      setSubjects(data.subjects)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-12 w-12 bg-[var(--bg-tertiary)] rounded-xl mb-4" />
            <div className="h-6 w-3/4 bg-[var(--bg-tertiary)] rounded mb-2" />
            <div className="h-4 w-1/2 bg-[var(--bg-tertiary)] rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Theory for every subject
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Clear explanations, formulas, and examples for school exams. Algebra, Geometry, Russian, Literature — all in one place.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map(subject => (
          <SubjectCard key={subject.slug} subject={subject} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-[var(--text-muted)]">
          More subjects coming soon: Physics, Chemistry, History, Biology...
        </p>
      </div>
    </div>
  )
}