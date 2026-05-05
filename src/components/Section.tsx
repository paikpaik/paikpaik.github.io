interface SectionProps {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="py-10">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-blue-500">
        {title}
      </h2>
      {children}
    </section>
  )
}
