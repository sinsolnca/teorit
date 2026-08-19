import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONTENT_DIR = path.resolve(__dirname, '../content/subjects')
const OUTPUT_DIR = path.resolve(__dirname, '../src/content')

interface ParsedFile {
  slug: string
  subjectSlug: string
  frontmatter: any
  html: string
  excerpt: string
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  return String(result)
}

function generateExcerpt(html: string, maxLength = 300): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

function getSubjectIcon(subjectSlug: string): string {
  const icons: Record<string, string> = {
    algebra: 'function-square',
    geometry: 'triangle',
    russian: 'book-text',
    literature: 'book-open',
  }
  return icons[subjectSlug] || 'book'
}

async function buildContent() {
  console.log('🔨 Building content...')

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const subjectDirs = fs.readdirSync(CONTENT_DIR).filter((dir) => {
    const fullPath = path.join(CONTENT_DIR, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  const subjects: any[] = []
  const searchIndex: any[] = []
  let globalLastUpdated = ''

  for (const subjectSlug of subjectDirs.sort()) {
    const subjectPath = path.join(CONTENT_DIR, subjectSlug)
    const files = fs.readdirSync(subjectPath).filter((f) => f.endsWith('.md'))

    let subjectIndexMd: ParsedFile | null = null
    const topics: any[] = []

    for (const file of files.sort()) {
      const filePath = path.join(subjectPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content: markdown } = matter(content)
      const html = await markdownToHtml(markdown)
      const excerpt = generateExcerpt(html)
      const slug = file.replace('.md', '')

      const parsed: ParsedFile = {
        slug,
        subjectSlug,
        frontmatter: { ...frontmatter, subject: subjectSlug },
        html,
        excerpt,
      }

      if (slug === '_index') {
        subjectIndexMd = parsed
      } else {
        topics.push({
          slug,
          title: frontmatter.title,
          tags: frontmatter.tags || [],
          order: frontmatter.order || 999,
          updated: frontmatter.updated,
        })

        searchIndex.push({
          id: `${subjectSlug}/${slug}`,
          subject: frontmatter.title,
          subjectSlug,
          topicSlug: slug,
          title: frontmatter.title,
          tags: frontmatter.tags || [],
          html,
          excerpt,
        })

        if (frontmatter.updated && frontmatter.updated > globalLastUpdated) {
          globalLastUpdated = frontmatter.updated
        }
      }
    }

    if (!subjectIndexMd) {
      console.warn(`⚠️  Missing _index.md for subject: ${subjectSlug}`)
      continue
    }

    topics.sort((a, b) => a.order - b.order)

    const subjectManifest = {
      slug: subjectSlug,
      title: subjectIndexMd.frontmatter.title,
      description: subjectIndexMd.frontmatter.description,
      icon: subjectIndexMd.frontmatter.icon || getSubjectIcon(subjectSlug),
      order: subjectIndexMd.frontmatter.order || 999,
      topics,
    }

    subjects.push(subjectManifest)

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${subjectSlug}.json`),
      JSON.stringify(
        topics.map((t) => ({
          slug: t.slug,
          frontmatter: { title: t.title, tags: t.tags, order: t.order, updated: t.updated },
          html: searchIndex.find((s) => s.topicSlug === t.slug && s.subjectSlug === subjectSlug)?.html || '',
          excerpt: searchIndex.find((s) => s.topicSlug === t.slug && s.subjectSlug === subjectSlug)?.excerpt || '',
          subjectSlug,
        })),
        null,
        2
      )
    )
  }

  subjects.sort((a, b) => a.order - b.order)

  const manifest = {
    subjects,
    lastUpdated: globalLastUpdated || new Date().toISOString(),
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
  )

  console.log(`✅ Built ${subjects.length} subjects with ${searchIndex.length} topics`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)
}

buildContent().catch(console.error)