import { marked } from 'marked'

interface MarkdownProps {
  children: string
  className?: string
}

export default function Markdown({ children, className }: MarkdownProps) {
  const html = marked.parse(children) as string

  return (
    <div
      className={`prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-500 prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-medium prose-code:text-red-600 prose-code:before:content-none prose-code:after:content-none ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
