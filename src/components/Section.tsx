interface SectionProps {
  title: string
  hint?: string
  children: React.ReactNode
}

export default function Section({ title, hint, children }: SectionProps) {
  return (
    <section className="py-10">
      <div className="mb-6 flex items-baseline gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
          {title}
        </h2>
        {hint && <span className="text-xs text-neutral-400">{hint}</span>}
      </div>
      {children}
    </section>
  )
}
