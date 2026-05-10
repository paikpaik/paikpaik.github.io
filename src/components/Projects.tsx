import Section from './Section'
import { projects, projectOrder, type Project, type ProjectLabel } from '../data/resume'

interface ProjectsProps {
  selected: Project | null
  onSelect: (project: Project) => void
}

const labelStyle: Record<ProjectLabel, { base: string; selected: string }> = {
  Dev:        { base: 'bg-blue-50 text-blue-500',       selected: 'bg-blue-500 text-white' },
  Monitoring: { base: 'bg-indigo-50 text-indigo-600',   selected: 'bg-indigo-500 text-white' },
  SDK:        { base: 'bg-amber-50 text-amber-600',      selected: 'bg-amber-500 text-white' },
  WebApp:     { base: 'bg-emerald-50 text-emerald-600',  selected: 'bg-emerald-500 text-white' },
  LLM:        { base: 'bg-purple-50 text-purple-500',    selected: 'bg-purple-500 text-white' },
}

export default function Projects({ selected, onSelect }: ProjectsProps) {
  const sorted = projectOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined)

  return (
    <Section title="Projects" hint="클릭시 프로젝트의 상세 내용을 확인하실 수 있습니다.">
      <div>
        {sorted.map((project) => {
          const isSelected = selected?.name === project.name
          const ls = labelStyle[project.label]
          return (
            <button
              key={project.id}
              onClick={() => onSelect(project)}
              className={`w-full rounded-lg px-3 py-3.5 text-left transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50 text-neutral-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-20 shrink-0 rounded px-1.5 py-0.5 text-center text-xs font-medium ${
                    isSelected ? ls.selected : ls.base
                  }`}
                >
                  {project.label}
                </span>
                <span className="font-semibold">{project.name}</span>
              </div>
              <div className="flex justify-end mt-1">
                <span
                  className={`text-sm ${isSelected ? 'text-blue-100' : 'text-neutral-400'}`}
                >
                  {project.summary}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </Section>
  )
}
