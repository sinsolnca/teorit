import type { SubjectManifest, TopicManifest, ContentManifest, SearchIndexItem } from '@types-def/content'

const MANIFEST_URL = '/content/manifest.json'
const SEARCH_INDEX_URL = '/content/search-index.json'
const TOPIC_BASE_URL = '/content/'

let manifestCache: ContentManifest | null = null
let searchIndexCache: SearchIndexItem[] | null = null

export async function loadManifest(): Promise<ContentManifest> {
  if (manifestCache) return manifestCache
  const res = await fetch(MANIFEST_URL)
  if (!res.ok) throw new Error('Failed to load manifest')
  manifestCache = await res.json()
  return manifestCache!
}

export async function loadSearchIndex(): Promise<SearchIndexItem[]> {
  if (searchIndexCache) return searchIndexCache
  const res = await fetch(SEARCH_INDEX_URL)
  if (!res.ok) throw new Error('Failed to load search index')
  searchIndexCache = await res.json()
  return searchIndexCache!
}

export async function loadTopic(subjectSlug: string, topicSlug: string) {
  const res = await fetch(`${TOPIC_BASE_URL}${subjectSlug}.json`)
  if (!res.ok) throw new Error(`Failed to load topic ${subjectSlug}/${topicSlug}`)
  const topics = await res.json()
  return topics.find((t: any) => t.slug === topicSlug) || null
}

export function getSubjectIconName(subjectSlug: string): string {
  const icons: Record<string, string> = {
    algebra: 'function-square',
    geometry: 'triangle',
    russian: 'book-text',
    literature: 'book-open',
  }
  return icons[subjectSlug] || 'book'
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function generateExcerpt(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}