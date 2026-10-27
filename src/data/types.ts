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

// 구글 XYZ 형식의 성과 한 줄: X(성과) - Y(수치) - Z(문제 해결 행동)
// 아직 확인되지 않은 수치는 {{?설명}} 으로 적어두면 PDF에 노란 칸으로 표시된다
export type Achievement = {
  x: string
  y: string
  z: string
}

export type Project = {
  id: number
  label: ProjectLabel
  name: string
  summary: string
  start: string
  end?: string
  // 회사 업무가 아닌 개인 프로젝트 (Experience와 분리해서 표시)
  personal?: boolean
  description: string[]
  stack: string[]
  // PDF 이력서에 들어갈 담당 범위 (예: '설계·구현 단독')
  role?: string
  // PDF 첫 장 '경력 요약'에 들어갈 핵심 수치 한 줄
  headline?: string
  // PDF 이력서의 핵심 내용. 있으면 경력 섹션에, 없으면 '기타 프로젝트' 한 줄 요약으로 표시
  achievements?: Achievement[]
  // 단일 다이어그램 프로젝트용 (기존 방식, 대부분의 프로젝트는 이것만 사용)
  architecture?: string
  // 여러 서브프로젝트/서비스를 하나의 카드로 묶을 때, 컴포넌트별로 다이어그램을 분리
  architectures?: ProjectArchitecture[]
  issues?: Issue[]
  metrics?: { label: string; value: string }[]
}
