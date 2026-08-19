import { useState, useEffect, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'
import type { SearchIndexItem } from '@types-def/content'
import { loadSearchIndex } from '@utils/content'

export function useSearch() {
  const [index, setIndex] = useState<SearchIndexItem[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchIndexItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    loadSearchIndex().then(data => {
      setIndex(data)
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }, [])

  const fuse = useMemo(() => new Fuse(index, {
    keys: ['title', 'tags', 'subject', 'excerpt'],
    threshold: 0.35,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  }), [index])

  const search = useCallback((q: string) => {
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      return
    }
    const fuseResults = fuse.search(q)
    setResults(fuseResults.map(r => r.item).slice(0, 20))
  }, [fuse])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => { setIsOpen(false); setQuery(''); setResults([]) }, [])

  return { query, results, isLoading, isOpen, search, open, close, setQuery }
}