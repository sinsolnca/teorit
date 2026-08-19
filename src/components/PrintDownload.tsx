import { useEffect, useRef } from 'react'
import { Icon } from './Icons'

interface PrintDownloadProps {
  title: string
  contentSelector?: string
}

export function PrintDownload({ title, contentSelector = '.prose-custom' }: PrintDownloadProps) {
  const downloadPdf = async () => {
    const { default: html2pdf } = await import('html2pdf.js')
    const element = document.querySelector(contentSelector)
    if (!element) return

    const clone = element.cloneNode(true) as HTMLElement
    clone.querySelectorAll('a').forEach(a => {
      a.style.color = 'inherit'
      a.style.textDecoration = 'none'
    })

    const opt = {
      margin: [10, 15, 10, 15] as [number, number, number, number],
      filename: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }

    await html2pdf().set(opt).from(clone).save()
  }

  const printPage = () => {
    window.print()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={printPage}
        className="btn-ghost text-sm flex items-center gap-1.5"
        aria-label="Print this page"
      >
        <Icon name="printer" size={16} />
        <span>Print</span>
      </button>
      <button
        onClick={downloadPdf}
        className="btn-ghost text-sm flex items-center gap-1.5"
        aria-label="Download as PDF"
      >
        <Icon name="download" size={16} />
        <span>PDF</span>
      </button>
    </div>
  )
}