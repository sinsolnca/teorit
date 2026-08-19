export interface Frontmatter {
  title: string
  description?: string
  icon?: string
  tags?: string[]
  order: number
  updated?: string
}

export interface TopicFrontmatter extends Frontmatter {
  subject: string
}

export interface SubjectManifest {
  slug: string
  title: string
  description?: string
  icon: string
  order: number
  topics: TopicManifest[]
}

export interface TopicManifest {
  slug: string
  title: string
  tags: string[]
  order: number
  updated?: string
}

export interface SearchIndexItem {
  id: string
  subject: string
  subjectSlug: string
  topicSlug: string
  title: string
  tags: string[]
  html: string
  excerpt: string
}

export interface ParsedContent {
  frontmatter: Frontmatter | TopicFrontmatter
  html: string
  excerpt: string
  slug: string
  subjectSlug?: string
}

export interface ContentManifest {
  subjects: SubjectManifest[]
  lastUpdated: string
}