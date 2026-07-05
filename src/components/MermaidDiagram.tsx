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

// mermaid가 생성하는 노드/클러스터 id에서 원본 노드 ID만 추출
// 예: "flowchart-API-3" -> "API", "cluster-Security-1" -> "Security"
function extractNodeKey(rawId: string): string {
  return rawId.replace(/^flowchart-/, '').replace(/^cluster-/, '').replace(/-\d+$/, '')
}

function applyHighlight(container: HTMLDivElement, highlightNodeIds: string[]) {
  const targets = Array.from(container.querySelectorAll<SVGGElement>('.node, .cluster'))
  const exactMatch = (el: SVGGElement) => highlightNodeIds.includes(extractNodeKey(el.id))
  // 정확 매칭이 하나라도 있으면 그것만 신뢰한다. 그렇지 않을 때만(예상 못한 id 포맷)
  // 부분 문자열 폴백을 쓴다 — 안 그러면 'Claude'/'Claudian'처럼 한 노드 ID가 다른
  // 노드 ID의 접두사인 경우 의도치 않게 둘 다 강조될 수 있다.
  const hasExactMatch = targets.some(exactMatch)
  const isMatch = (el: SVGGElement) =>
    hasExactMatch ? exactMatch(el) : highlightNodeIds.some((id) => el.id.includes(id))

  targets.forEach((el) => {
    const matched = isMatch(el)
    el.classList.toggle('mermaid-highlight', matched)
    el.classList.toggle('mermaid-dim', !matched)
  })
}

interface MermaidDiagramProps {
  chart: string
  highlightNodeIds?: string[]
  onExpand?: () => void
}

export default function MermaidDiagram({ chart, highlightNodeIds, onExpand }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // 매 렌더마다 고유 ID를 사용해 StrictMode 이중 실행 충돌 방지
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!ref.current) return
        ref.current.innerHTML = svg
        if (highlightNodeIds && highlightNodeIds.length > 0) {
          applyHighlight(ref.current, highlightNodeIds)
        }
      })
      .catch(console.error)
  }, [chart, highlightNodeIds])

  return (
    <div
      className={onExpand ? 'group relative cursor-zoom-in' : undefined}
      onClick={onExpand}
    >
      <div ref={ref} className="overflow-x-auto py-2" />
      {onExpand && (
        <span className="pointer-events-none absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-neutral-400 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          확대
        </span>
      )}
    </div>
  )
}
