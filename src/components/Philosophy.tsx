import Section from './Section'
import { philosophy } from '../data/profile'

export default function Philosophy() {
  return (
    <Section title="Philosophy">
      <div className="space-y-5">
        {philosophy.map((p, i) => (
          <div key={i}>
            <h3 className="font-semibold text-neutral-900">{p.heading}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
