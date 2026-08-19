import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '@hooks/useSearch'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { Icon } from '@components/Icons'
import type { SearchIndexItem } from '@types-def/content'

export function SearchPage() {
  const { query, results, isLoading, search, setQuery } = useSearch()
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Focus search input on mount
    const input = document.getElementById('search-page-input')
    input?.focus()
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumbs />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Search</h1>
        <p className="text-[var(--text-secondary)]">Find topics across all subjects</p>
      </header>

      <div className="relative mb-8">
        <Icon name="search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          id="search-page-input"
          type="text"
          value={query}
          onChange={e => { search(e.target.value); setShowResults(true) }}
          onFocus={() => setShowResults(true)}
          placeholder="Search topics... (⌘K)"
          className="input pl-10 pr-4 py-3 text-lg"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); search('') }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="Clear search"
          >
            <Icon name="close" size={18} />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <Icon name="search" size={32} className="mx-auto mb-2 opacity-50" />
          <p>Loading search index...</p>
        </div>
      ) : query && results.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="search" size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-50" />
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2">No results found</h2>
          <p className="text-[var(--text-secondary)]">Try different keywords or check spelling</p>
        </div>
      ) : query && results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-muted)]">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          <ul className="space-y-3" role="list">
            {results.map(item => (
              <li key={item.id}>
                <Link
                  to={`/topic/${item.subjectSlug}/${item.topicSlug}`}
                  className="card p-4 hover:shadow-md transition-shadow block"
                >
                  <div className="flex items-start gap-3">
                    <Icon name={item.subjectSlug as keyof typeof import('@components/Icons').Icons} size={20} className="text-[var(--brand-primary)] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[var(--text-primary)]">{item.title}</span>
                        <span className="badge-secondary text-xs">{item.subject}</span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2">{item.excerpt}</p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 4).map(tag => (
                            <span key={tag} className="badge-primary text-xs">{tag}</span>
                          ))}
                          {item.tags.length > 4 && (
                            <span className="badge-secondary text-xs">+{item.tags.length - 4}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16">
          <Icon name="search" size={64} className="mx-auto text-[var(--text-muted)] mb-4 opacity-30" />
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2">Search theory</h2>
          <p className="text-[var(--text-secondary)] mb-6">Type a keyword to find topics across all subjects</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['equations', 'triangle', 'spelling', 'romantism', 'function', 'vector', 'punctuation', 'Pushkin'].map(q => (
              <button
                key={q}
                onClick={() => { search(q); setShowResults(true) }}
                className="badge-secondary hover:bg-[var(--brand-light)] hover:text-[var(--brand-primary)] cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}