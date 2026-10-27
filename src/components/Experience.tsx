import Section from './Section'
import { experiences } from '../data/profile'
import { featuredProjects } from '../data/projects'
import type { Project } from '../data/types'
import { formatPeriod } from '../utils/date'
import { withPlaceholders } from '../utils/placeholder'

interface ExperienceProps {
  onSelect: (project: Project) => void
}

export default function Experience({ onSelect }: ExperienceProps) {
  return (
    <Section title="Experience">
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] gap-x-8">
            <div>
              <h3 className="font-semibold text-neutral-900">{exp.company}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">{exp.role}</p>
              <ul className="mt-3 space-y-1.5">
                {exp.description.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-neutral-600"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="whitespace-nowrap text-sm text-neutral-400">
              {formatPeriod(exp.start, exp.end)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs font-medium text-neutral-400">대표 실무 프로젝트</p>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <HighlightCard key={project.id} project={project} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function HighlightCard({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  if (!project.achievements?.length) return null

  return (
    <article className="rounded-xl border border-neutral-100 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="text-base font-bold text-neutral-900">{project.name}</h4>
        <p className="whitespace-nowrap text-xs text-neutral-400">
          {formatPeriod(project.start, project.end)}
        </p>
      </div>
      {project.role && <p className="mt-1 text-xs text-blue-500">{withPlaceholders(project.role)}</p>}

      <ul className="mt-4 space-y-3 text-sm">
        {project.achievements.map((a, i) => (
          <li key={i}>
            <p className="font-semibold text-neutral-900">
              {withPlaceholders(a.x)}
              <span className="mx-1.5 text-neutral-300">|</span>
              <span className="text-blue-600">{withPlaceholders(a.y)}</span>
            </p>
            <p className="mt-0.5 leading-relaxed text-neutral-600">{withPlaceholders(a.z)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tag) => (
            <span key={tag} className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-medium text-neutral-500">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect(project)}
          className="text-xs font-semibold text-blue-500 transition-colors hover:text-blue-700"
        >
          구현 상세·아키텍처 보기 →
        </button>
      </div>
    </article>
  )
}
