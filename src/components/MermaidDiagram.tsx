import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#eff6ff',
    primaryTextColor: '#1d4ed8',
    primaryBorderColor: '#bfdbfe',
    lineColor: '#3b82f6',
    secondaryColor: '#f8fafc',
    background: '#ffffff',
    fontSize: '14px',
  },
})

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // 매 렌더마다 고유 ID를 사용해 StrictMode 이중 실행 충돌 방지
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      })
      .catch(console.error)
  }, [chart])

  return <div ref={ref} className="overflow-x-auto py-2" />
}
