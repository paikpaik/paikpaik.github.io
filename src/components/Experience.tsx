import Section from './Section'
import { experiences } from '../data/resume'
import { formatPeriod } from '../utils/date'

export default function Experience() {
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
    </Section>
  )
}
