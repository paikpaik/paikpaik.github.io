import { useMemo, useState } from 'react'
import type { Project, Issue } from '../data/resume'
import { formatPeriod } from '../utils/date'
import MermaidDiagram from './MermaidDiagram'
import ArchitectureModal from './ArchitectureModal'
import Markdown from './Markdown'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

function IssueItem({ issue, open, onToggle }: { issue: Issue; open: boolean; onToggle: () => void }) {
  const hasDetail = !!(issue.problem || issue.solution)

  return (
    <li>
      <button
        className={`flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors ${hasDetail ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-default'}`}
        onClick={() => hasDetail && onToggle()}
        disabled={!hasDetail}
      >
        {issue.status === 'closed' ? (
          <svg className="mt-1 h-4 w-4 shrink-0 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 4.78a.75.75 0 0 0-1.06-1.06L6.75 6.69 5.28 5.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z" />
          </svg>
        ) : (
          <svg className="mt-1 h-4 w-4 shrink-0 text-blue-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
          </svg>
        )}
        <span className={`flex-1 text-base font-bold leading-snug ${issue.status === 'closed' ? 'text-neutral-500' : 'text-neutral-900'}`}>
          {issue.title}
        </span>
        {hasDetail && (
          <svg
            className={`mt-1.5 h-3.5 w-3.5 shrink-0 text-neutral-300 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      {hasDetail && open && (
        <div className="space-y-5 px-2 pb-6 pt-1">
          {issue.problem && (
            <section>
              <h4 className="mb-2 border-l-4 border-red-300 pl-3 text-sm font-bold text-neutral-700">문제</h4>
              <Markdown className="pl-3">{issue.problem}</Markdown>
            </section>
          )}
          {issue.solution && (
            <section>
              <h4 className="mb-2 border-l-4 border-blue-300 pl-3 text-sm font-bold text-neutral-700">해결</h4>
              <Markdown className="pl-3">{issue.solution}</Markdown>
            </section>
          )}
          {issue.impact && (
            <section>
              <h4 className="mb-2 border-l-4 border-emerald-300 pl-3 text-sm font-bold text-neutral-700">결과</h4>
              <Markdown className="pl-3">{issue.impact}</Markdown>
            </section>
          )}
          {issue.relatedNodes && issue.relatedNodes.length > 0 && (
            <p className="pl-3 text-[11px] text-blue-400">↑ 위 아키텍처에서 관련 컴포넌트가 강조 표시됩니다.</p>
          )}
        </div>
      )}
    </li>
  )
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set(project.issues?.length ? [0] : []))
  const [expanded, setExpanded] = useState(false)

  const toggleIssue = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const highlightNodeIds = useMemo(
    () =>
      (project.issues ?? [])
        .filter((_, i) => openIndexes.has(i))
        .flatMap((issue) => issue.relatedNodes ?? []),
    [project.issues, openIndexes],
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-neutral-100 px-8 py-8">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{project.name}</h2>
          <p className="mt-1 text-sm text-neutral-500">{formatPeriod(project.start, project.end)}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-neutral-400 transition-colors hover:text-blue-500"
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <p className="text-base text-neutral-600">{project.summary}</p>

        {project.architecture && (
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">아키텍처</h3>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2">
              <MermaidDiagram
                chart={project.architecture}
                highlightNodeIds={highlightNodeIds}
                onExpand={() => setExpanded(true)}
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">주요 작업</h3>
          <ul className="space-y-3">
            {project.description.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.issues && project.issues.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">이슈</h3>
            <ul className="space-y-0.5">
              {project.issues.map((issue, i) => (
                <IssueItem
                  key={`${project.id}-${i}`}
                  issue={issue}
                  open={openIndexes.has(i)}
                  onToggle={() => toggleIssue(i)}
                />
              ))}
            </ul>
          </div>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">주요 지표</h3>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2">
                  <span className="text-xs text-neutral-400">{m.label}</span>
                  <span className="text-sm font-semibold text-blue-600">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span key={tag} className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {expanded && project.architecture && (
        <ArchitectureModal
          chart={project.architecture}
          highlightNodeIds={highlightNodeIds}
          onClose={() => setExpanded(false)}
        />
      )}
    </div>
  )
}
