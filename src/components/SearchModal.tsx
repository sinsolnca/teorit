import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearch } from '@hooks/useSearch'
import { Icon } from './Icons'
import { Link, useNavigate } from 'react-router-dom'
import type { SearchIndexItem } from '@types-def/content'

export function SearchModal() {
  const { query, results, isLoading, isOpen, search, close, setQuery } = useSearch()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) close()
        else document.getElementById('search-input')?.focus()
      }
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  if (!isOpen) return null

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      navigate(`/topic/${results[selectedIndex].subjectSlug}/${results[selectedIndex].topicSlug}`)
      close()
    } else if (e.key === 'Escape') {
      close()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-2xl bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl shadow-lg overflow-hidden animate-in">
        <div className="relative p-4">
          <div className="relative">
            <Icon name="search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              value={query}
              onChange={e => search(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search topics... (⌘K)"
              className="input pl-10 pr-4 py-3 text-lg"
              autoComplete="off"
              autoFocus
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
          <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-muted)]">
            <kbd className="px-2 py-0.5 bg-[var(--bg-tertiary)] rounded">⌘</kbd>
            <kbd className="px-2 py-0.5 bg-[var(--bg-tertiary)] rounded">K</kbd>
            <span>to open</span>
            <span className="mx-1">·</span>
            <kbd className="px-2 py-0.5 bg-[var(--bg-tertiary)] rounded">Esc</kbd>
            <span>to close</span>
          </div>
        </div>

        <div className="border-t border-[var(--border-light)] max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-[var(--text-muted)]">Loading search index...</div>
          ) : query && results.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-muted)]">No results found</div>
          ) : query && results.length > 0 ? (
            <ul className="divide-y divide-[var(--border-light)]" role="listbox">
              {results.map((item: SearchIndexItem, index) => (
                <li key={item.id} role="option" aria-selected={index === selectedIndex}>
                  <Link
                    to={`/topic/${item.subjectSlug}/${item.topicSlug}`}
                    onClick={close}
                    className={`block p-4 hover:bg-[var(--bg-tertiary)] transition-colors ${
                      index === selectedIndex ? 'bg-[var(--bg-tertiary)]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon name={item.subjectSlug as keyof typeof import('./Icons').Icons} size={20} className="text-[var(--brand-primary)] shrink-0 mt-0.5" />
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
          ) : (
            <div className="p-8 text-center text-[var(--text-muted)]">
              <Icon name="search" size={32} className="mx-auto mb-2 opacity-50" />
              <p>Press <kbd className="px-2 py-0.5 bg-[var(--bg-tertiary)] rounded ml-1">⌘K</kbd> to search topics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}