import { useState } from 'react'
import { projects, type Issue, type Project, type ProjectLabel } from '../data/resume'
import { labelStyle } from '../utils/labelStyle'

interface TroubleshootingProps {
  selected: { project: Project; issue: Issue } | null
  onSelect: (project: Project, issue: Issue) => void
}

const allLabels: ProjectLabel[] = ['Dev', 'Monitoring', 'SDK', 'WebApp', 'LLM']

const items = projects.flatMap((project) =>
  (project.issues ?? []).map((issue, idx) => ({ project, issue, key: `${project.id}-${idx}` })),
)

export default function Troubleshooting({ selected, onSelect }: TroubleshootingProps) {
  const [filter, setFilter] = useState<ProjectLabel | 'all'>('all')

  const filtered = filter === 'all' ? items : items.filter((item) => item.project.label === filter)

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            filter === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
          }`}
        >
          전체 {items.length}
        </button>
        {allLabels.map((label) => {
          const count = items.filter((item) => item.project.label === label).length
          if (count === 0) return null
          const isActive = filter === label
          return (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isActive ? labelStyle[label].selected : labelStyle[label].base
              }`}
            >
              {label} {count}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ project, issue, key }) => {
          const isSelected = selected?.project.id === project.id && selected?.issue.title === issue.title
          return (
            <button
              key={key}
              onClick={() => onSelect(project, issue)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                isSelected
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-neutral-100 bg-white hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                    isSelected ? labelStyle[project.label].selected : labelStyle[project.label].base
                  }`}
                >
                  {project.label}
                </span>
                {issue.status === 'closed' ? (
                  <svg className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-100' : 'text-neutral-400'}`} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 4.78a.75.75 0 0 0-1.06-1.06L6.75 6.69 5.28 5.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z" />
                  </svg>
                ) : (
                  <svg className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-100' : 'text-blue-400'}`} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                )}
              </div>
              <p className={`mt-2.5 text-sm font-semibold leading-snug ${isSelected ? 'text-white' : 'text-neutral-800'}`}>
                {issue.title}
              </p>
              <p className={`mt-1 text-xs ${isSelected ? 'text-blue-100' : 'text-neutral-400'}`}>
                {project.name}
              </p>
              {issue.problem && (
                <p className={`mt-2 line-clamp-2 text-xs leading-relaxed ${isSelected ? 'text-blue-50' : 'text-neutral-500'}`}>
                  {issue.problem}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
