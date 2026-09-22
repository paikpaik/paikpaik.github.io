import { useMemo, useState } from 'react'
import type { Project, Issue, ProjectArchitecture } from '../data/types'
import { formatPeriod } from '../utils/date'
import MermaidDiagram from './MermaidDiagram'
import ArchitectureModal from './ArchitectureModal'
import IssueModal from './IssueModal'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

type Tab = 'overview' | 'architecture' | 'issues'

// 이슈 카드에 보여줄 한 줄 요약 — impact가 있으면 그걸, 없으면 problem 첫 문장을 잘라 쓴다
function issueSummary(issue: Issue): string | null {
  if (issue.impact) return issue.impact
  if (issue.problem) {
    const firstSentence = issue.problem.split(/(?<=\.)\s/)[0]
    return firstSentence.length > 70 ? `${firstSentence.slice(0, 70)}…` : firstSentence
  }
  return null
}

function IssueCard({ issue, onOpen }: { issue: Issue; onOpen: () => void }) {
  const summary = issueSummary(issue)
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-start gap-2 rounded-lg border border-neutral-100 bg-white p-4 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/30"
    >
      <div className="flex w-full items-start gap-2">
        {issue.status === 'closed' ? (
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 4.78a.75.75 0 0 0-1.06-1.06L6.75 6.69 5.28 5.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z" />
          </svg>
        ) : (
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
          </svg>
        )}
        <span className="flex-1 text-sm font-bold leading-snug text-neutral-900">{issue.title}</span>
      </div>
      {summary && <p className="pl-5.5 text-xs leading-relaxed text-neutral-500">{summary}</p>}
    </button>
  )
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [tab, setTab] = useState<Tab>('overview')

  const diagrams = useMemo<ProjectArchitecture[]>(() => {
    if (project.architectures && project.architectures.length > 0) return project.architectures
    if (project.architecture) return [{ key: '_default', label: '아키텍처', diagram: project.architecture }]
    return []
  }, [project.architectures, project.architecture])

  const [activeArchKey, setActiveArchKey] = useState<string | undefined>(diagrams[0]?.key)
  const [componentFilter, setComponentFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState(false)
  const [openIssue, setOpenIssue] = useState<Issue | null>(null)
  const [highlightIssue, setHighlightIssue] = useState<Issue | null>(null)

  const activeDiagram = diagrams.find((d) => d.key === activeArchKey) ?? diagrams[0]

  const highlightNodeIds = useMemo(() => {
    if (!highlightIssue) return []
    if (diagrams.length > 1 && highlightIssue.component && highlightIssue.component !== activeArchKey) return []
    return highlightIssue.relatedNodes ?? []
  }, [highlightIssue, diagrams.length, activeArchKey])

  const components = useMemo(() => {
    const set = new Set<string>()
    for (const issue of project.issues ?? []) {
      if (issue.component) set.add(issue.component)
    }
    return Array.from(set)
  }, [project.issues])

  const filteredIssues = useMemo(() => {
    if (componentFilter === 'all') return project.issues ?? []
    return (project.issues ?? []).filter((issue) => issue.component === componentFilter)
  }, [project.issues, componentFilter])

  const viewIssueArchitecture = (issue: Issue) => {
    if (diagrams.length > 1 && issue.component && diagrams.some((d) => d.key === issue.component)) {
      setActiveArchKey(issue.component)
    }
    setHighlightIssue(issue)
    setOpenIssue(null)
    setTab('architecture')
  }

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview', label: '개요' },
    ...(diagrams.length > 0 ? [{ key: 'architecture' as Tab, label: '아키텍처' }] : []),
    ...(project.issues && project.issues.length > 0
      ? [{ key: 'issues' as Tab, label: '이슈', count: project.issues.length }]
      : []),
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-neutral-100 px-8 pb-6 pt-8">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{project.name}</h2>
          <p className="mt-1 text-sm text-neutral-500">{formatPeriod(project.start, project.end)}</p>
          <p className="mt-3 max-w-2xl text-base text-neutral-600">{project.summary}</p>
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

      <div className="flex gap-1 border-b border-neutral-100 px-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative px-3 py-3 text-sm font-semibold transition-colors ${
              tab === t.key ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {t.label}
            {typeof t.count === 'number' && <span className="ml-1 text-xs font-normal text-neutral-400">{t.count}</span>}
            {tab === t.key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue-500" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {tab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-500">주요 작업</h3>
              <ul className="max-w-2xl space-y-4">
                {project.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.metrics && project.metrics.length > 0 && (
              <div>
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

            <div>
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
        )}

        {tab === 'architecture' && diagrams.length > 0 && (
          <div>
            {diagrams.length > 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {diagrams.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setActiveArchKey(d.key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      activeArchKey === d.key
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
            {activeDiagram && (
              <div className="overflow-x-auto rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2">
                <MermaidDiagram
                  chart={activeDiagram.diagram}
                  highlightNodeIds={highlightNodeIds}
                  onExpand={() => setExpanded(true)}
                />
              </div>
            )}
            {highlightIssue && (
              <p className="mt-3 text-xs text-blue-500">
                “{highlightIssue.title}” 이슈와 관련된 컴포넌트가 강조 표시되어 있습니다.
              </p>
            )}
          </div>
        )}

        {tab === 'issues' && project.issues && project.issues.length > 0 && (
          <div>
            {components.length > 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setComponentFilter('all')}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    componentFilter === 'all'
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  전체
                </button>
                {components.map((c) => {
                  const label = diagrams.find((d) => d.key === c)?.label ?? c
                  return (
                    <button
                      key={c}
                      onClick={() => setComponentFilter(c)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        componentFilter === c
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredIssues.map((issue) => (
                <IssueCard key={`${project.id}-${issue.title}`} issue={issue} onOpen={() => setOpenIssue(issue)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {expanded && activeDiagram && (
        <ArchitectureModal
          chart={activeDiagram.diagram}
          highlightNodeIds={highlightNodeIds}
          onClose={() => setExpanded(false)}
        />
      )}

      {openIssue && (
        <IssueModal
          issue={openIssue}
          onClose={() => setOpenIssue(null)}
          onViewArchitecture={diagrams.length > 0 ? () => viewIssueArchitecture(openIssue) : undefined}
        />
      )}
    </div>
  )
}
