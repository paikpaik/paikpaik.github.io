import { marked } from 'marked'

interface MarkdownProps {
  children: string
  className?: string
}

export default function Markdown({ children, className }: MarkdownProps) {
  const html = marked.parse(children) as string

  return (
    <div
      className={`prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-500 ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
