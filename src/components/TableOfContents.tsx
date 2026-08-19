import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'

interface TableOfContentsProps {
  items: Array<{ id: string; text: string; level: number }>
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%', threshold: 0 }
    )

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav className="sticky top-24 space-y-1" aria-label="Table of contents">
        <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">Contents</h4>
        <ul className="space-y-1">
          {items.map(item => (
            <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
              <Link
                to={`#${item.id}`}
                className={`block py-1 px-2 text-sm transition-colors rounded ${
                  activeId === item.id
                    ? 'text-[var(--brand-primary)] font-medium bg-[var(--brand-light)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                onClick={e => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    history.pushState(null, '', `#${item.id}`)
                    setActiveId(item.id)
                  }
                }}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}