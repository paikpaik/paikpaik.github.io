import Section from './Section'
import { skills } from '../data/resume'

export default function Skills() {
  return (
    <Section title="Skills">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <p className="mb-2 text-xs font-medium text-blue-500">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
