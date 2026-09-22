import { useEffect } from 'react'
import type { Issue } from '../data/types'
import Markdown from './Markdown'

interface IssueModalProps {
  issue: Issue
  onClose: () => void
  onViewArchitecture?: () => void
}

export default function IssueModal({ issue, onClose, onViewArchitecture }: IssueModalProps) {
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl">
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

        <div className="flex items-center gap-2 pr-8">
          {issue.status === 'closed' ? (
            <>
              <svg className="h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 4.78a.75.75 0 0 0-1.06-1.06L6.75 6.69 5.28 5.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z" />
              </svg>
              <span className="text-sm text-neutral-400">해결 완료</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 shrink-0 text-blue-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
              </svg>
              <span className="text-sm font-medium text-blue-500">진행중</span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug text-neutral-900">{issue.title}</h3>

        {issue.problem && (
          <section className="mt-6">
            <h4 className="mb-2 border-l-4 border-red-300 pl-3 text-sm font-bold text-neutral-700">문제</h4>
            <Markdown className="pl-3">{issue.problem}</Markdown>
          </section>
        )}

        {issue.solution && (
          <section className="mt-5">
            <h4 className="mb-2 border-l-4 border-blue-300 pl-3 text-sm font-bold text-neutral-700">해결</h4>
            <Markdown className="pl-3">{issue.solution}</Markdown>
          </section>
        )}

        {issue.impact && (
          <section className="mt-5">
            <h4 className="mb-2 border-l-4 border-emerald-300 pl-3 text-sm font-bold text-neutral-700">결과</h4>
            <Markdown className="pl-3">{issue.impact}</Markdown>
          </section>
        )}

        {onViewArchitecture && (
          <button
            onClick={onViewArchitecture}
            className="mt-6 flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            관련 아키텍처에서 보기
          </button>
        )}
      </div>
    </div>
  )
}
