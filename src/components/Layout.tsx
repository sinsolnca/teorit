import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Icon } from './Icons'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:ml-0 min-w-0">
          <div className="lg:hidden p-4 flex items-center justify-between border-b border-[var(--border-light)]">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn-ghost p-2"
              aria-label="Open sidebar"
            >
              <Icon name="menu" size={24} />
            </button>
            <h1 className="font-semibold text-[var(--text-primary)]">Teorit</h1>
            <div className="w-10" />
          </div>
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}