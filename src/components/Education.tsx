import Section from './Section'
import { education } from '../data/resume'
import { formatPeriod } from '../utils/date'

export default function Education() {
  return (
    <Section title="Education">
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] gap-x-8">
            <div>
              <h3 className="font-semibold text-neutral-900">{edu.school}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">
                {edu.major} · {edu.degree}
              </p>
            </div>
            <p className="whitespace-nowrap text-sm text-neutral-400">
              {formatPeriod(edu.start, edu.end)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
