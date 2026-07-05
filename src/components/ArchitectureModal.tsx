import { useEffect } from 'react'
import MermaidDiagram from './MermaidDiagram'

interface ArchitectureModalProps {
  chart: string
  highlightNodeIds?: string[]
  onClose: () => void
}

export default function ArchitectureModal({ chart, highlightNodeIds, onClose }: ArchitectureModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-neutral-400 transition-colors hover:text-blue-500"
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">아키텍처</h3>
        <MermaidDiagram chart={chart} highlightNodeIds={highlightNodeIds} />
      </div>
    </div>
  )
}
