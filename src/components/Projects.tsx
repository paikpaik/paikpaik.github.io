import { projects, projectOrder, type Project } from '../data/resume'
import { labelStyle } from '../utils/labelStyle'

interface ProjectsProps {
  selected: Project | null
  onSelect: (project: Project) => void
}

export default function Projects({ selected, onSelect }: ProjectsProps) {
  const sorted = projectOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((project) => {
        const isSelected = selected?.name === project.name
        const ls = labelStyle[project.label]
        return (
          <button
            key={project.id}
            onClick={() => onSelect(project)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-500'
                : 'border-neutral-100 bg-white hover:border-blue-200 hover:bg-blue-50'
            }`}
          >
            <span
              className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                isSelected ? ls.selected : ls.base
              }`}
            >
              {project.label}
            </span>
            <p className={`mt-2.5 text-base font-bold leading-snug ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
              {project.name}
            </p>
            <p className={`mt-1.5 text-sm leading-relaxed ${isSelected ? 'text-blue-50' : 'text-neutral-500'}`}>
              {project.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                    isSelected ? 'bg-white/15 text-blue-50' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {tag}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${isSelected ? 'text-blue-100' : 'text-neutral-400'}`}>
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
