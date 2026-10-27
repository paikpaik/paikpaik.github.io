// {{?설명}} 형태의 미확정 수치를 노란 칸으로 강조해서 렌더링 (빠진 숫자를 한눈에 찾기 위함)
const PLACEHOLDER = /(\{\{\?.*?\}\})/g

export function withPlaceholders(text: string) {
  return text.split(PLACEHOLDER).map((part, i) =>
    part.startsWith('{{?') ? (
      <mark key={i} className="rounded bg-yellow-200 px-1 text-neutral-900">
        {part.slice(3, -2)}
      </mark>
    ) : (
      part
    ),
  )
}
