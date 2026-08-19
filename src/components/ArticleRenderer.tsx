import { useEffect, useRef } from 'react'
import { Icon } from './Icons'

interface ArticleRendererProps {
  html: string
  onTocUpdate?: (headings: Array<{ id: string; text: string; level: number }>) => void
}

export function ArticleRenderer({ html, onTocUpdate }: ArticleRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = html

      // Process images for lightbox
      const images = containerRef.current.querySelectorAll('img')
      images.forEach(img => {
        img.classList.add('rounded-lg', 'shadow-md', 'my-6', 'max-w-full', 'h-auto', 'cursor-zoom-in')
        img.loading = 'lazy'
      })

      // Process tables
      const tables = containerRef.current.querySelectorAll('table')
      tables.forEach(table => {
        table.classList.add('w-full', 'border-collapse', 'my-4')
        const wrapper = document.createElement('div')
        wrapper.className = 'overflow-x-auto'
        table.parentNode?.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      })

      // Process code blocks
      const codeBlocks = containerRef.current.querySelectorAll('pre code')
      codeBlocks.forEach(block => {
        block.classList.add('text-sm')
      })

      // Generate TOC
      if (onTocUpdate) {
        const headings = containerRef.current.querySelectorAll('h2, h3')
        const tocItems = Array.from(headings).map((heading, index) => {
          const id = heading.id || `heading-${index}`
          heading.id = id
          const tagName = heading.tagName
          const level = tagName.length > 1 ? parseInt(tagName[1] as string, 10) : 2
          const text = (heading.textContent ?? '') as string
          return {
            id,
            text,
            level: isNaN(level) ? 2 : level,
          }
        })
        onTocUpdate(tocItems)
      }

      // Add copy buttons to code blocks
      const preBlocks = containerRef.current.querySelectorAll('pre')
      preBlocks.forEach(pre => {
        if (!pre.querySelector('.copy-btn')) {
          const btn = document.createElement('button')
          btn.className = 'copy-btn absolute top-2 right-2 px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded transition-colors opacity-0 hover:opacity-100'
          btn.textContent = 'Copy'
          btn.onclick = async () => {
            const code = pre.querySelector('code')?.textContent || ''
            await navigator.clipboard.writeText(code)
            btn.textContent = 'Copied!'
            setTimeout(() => btn.textContent = 'Copy', 2000)
          }
          pre.style.position = 'relative'
          pre.appendChild(btn)
        }
      })
    }
  }, [html, onTocUpdate])

  return (
    <div
      ref={containerRef}
      className="prose-custom prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  )
}