export type Experience = {
  company: string
  role: string
  start: string
  end?: string
  description: string[]
}

export type ProjectLabel = 'Dev' | 'Monitoring' | 'SDK' | 'WebApp' | 'LLM'

export type Issue = {
  title: string
  status: 'closed' | 'open'
  problem?: string
  solution?: string
  // architecture mermaid 다이어그램의 노드 ID (해당 이슈와 연관된 컴포넌트 강조 표시용)
  relatedNodes?: string[]
  // 이 이슈 하나의 정량적 결과/임팩트
  impact?: string
  // 여러 서브프로젝트를 묶은 프로젝트에서, 이 이슈가 속한 컴포넌트 (architectures[].key와 매칭)
  component?: string
}

export type ProjectArchitecture = {
  key: string
  label: string
  diagram: string
}

export type Project = {
  id: number
  label: ProjectLabel
  name: string
  summary: string
  start: string
  end?: string
  description: string[]
  stack: string[]
  // 단일 다이어그램 프로젝트용 (기존 방식, 대부분의 프로젝트는 이것만 사용)
  architecture?: string
  // 여러 서브프로젝트/서비스를 하나의 카드로 묶을 때, 컴포넌트별로 다이어그램을 분리
  architectures?: ProjectArchitecture[]
  issues?: Issue[]
  metrics?: { label: string; value: string }[]
}
