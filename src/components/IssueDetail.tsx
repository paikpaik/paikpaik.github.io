import { useState } from 'react'
import type { Issue, Project } from '../data/resume'
import MermaidDiagram from './MermaidDiagram'
import ArchitectureModal from './ArchitectureModal'
import Markdown from './Markdown'
import { labelStyle } from '../utils/labelStyle'

interface IssueDetailProps {
  project: Project
  issue: Issue
  onClose: () => void
}

export default function IssueDetail({ project, issue, onClose }: IssueDetailProps) {
  const [expanded, setExpanded] = useState(false)
  const ls = labelStyle[project.label]

  // 여러 컴포넌트로 나뉜 프로젝트면 이슈가 속한 컴포넌트의 다이어그램을, 아니면 기본 다이어그램을 고른다
  const diagram = project.architectures?.length
    ? (project.architectures.find((d) => d.key === issue.component) ?? project.architectures[0])
    : project.architecture
      ? { key: '_default', label: '아키텍처', diagram: project.architecture }
      : null

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-neutral-100 px-8 py-8">
        <div>
          <div className="flex items-center gap-2">
            <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${ls.base}`}>
              {project.label}
            </span>
            <span className="text-sm text-neutral-400">{project.name}</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-900">{issue.title}</h2>
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
        <div className="flex items-center gap-2">
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

        {issue.problem && (
          <section className="mt-6">
            <h3 className="mb-2 border-l-4 border-red-300 pl-3 text-base font-bold text-neutral-800">문제 상황</h3>
            <Markdown className="pl-3">{issue.problem}</Markdown>
          </section>
        )}

        {issue.solution && (
          <section className="mt-6">
            <h3 className="mb-2 border-l-4 border-blue-300 pl-3 text-base font-bold text-neutral-800">해결 과정</h3>
            <Markdown className="pl-3">{issue.solution}</Markdown>
          </section>
        )}

        {issue.impact && (
          <section className="mt-6">
            <h3 className="mb-2 border-l-4 border-emerald-300 pl-3 text-base font-bold text-neutral-800">결과</h3>
            <Markdown className="pl-3">{issue.impact}</Markdown>
          </section>
        )}

        {diagram && (
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">
              관련 아키텍처{diagram.key !== '_default' ? ` — ${diagram.label}` : ''}
            </h3>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2">
              <MermaidDiagram
                chart={diagram.diagram}
                highlightNodeIds={issue.relatedNodes}
                onExpand={() => setExpanded(true)}
              />
            </div>
            {!issue.relatedNodes?.length && (
              <p className="mt-2 text-xs text-neutral-400">이 프로젝트의 전체 아키텍처입니다.</p>
            )}
          </div>
        )}
      </div>

      {expanded && diagram && (
        <ArchitectureModal
          chart={diagram.diagram}
          highlightNodeIds={issue.relatedNodes}
          onClose={() => setExpanded(false)}
        />
      )}
    </div>
  )
}
