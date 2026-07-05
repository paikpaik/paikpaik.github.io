export const profile = {
  name: '노재열',
  nameEn: 'Roh Jaeyeol',
  role: 'Backend Engineer',
  email: 'woduf9311@gmail.com',
  github: 'https://github.com/paikpaik',
  summary:
    '확장 가능한 백엔드 시스템과 클라우드 인프라, 옵저버빌리티 플랫폼에 집중하는 백엔드 엔지니어입니다.\n리워드·광고 플랫폼 API부터 SDK 개발, 전사 서버 모듈 마이그레이션, 모니터링 시스템 구축까지 다양하게 작업해왔습니다.\n최근에는 LLM을 활용한 오픈소스 툴을 만들고 있습니다.\n함께 일할 때, 항상 같이 일하고 싶은 개발자로 기억되고 싶습니다.',
}

export const skills = [
  {
    category: 'Language',
    items: ['TypeScript', 'Python'],
  },
  {
    category: 'Backend',
    items: ['Node', 'Fastify', 'Next.js'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'Redis', 'ClickHouse', 'Airflow'],
  },
  {
    category: 'Infra / Cloud',
    items: ['AWS', 'Docker'],
  },
  {
    category: 'Observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Tempo', 'Pyroscope', 'DataDog'],
  },
  {
    category: 'AI / LLM',
    items: ['Anthropic SDK', 'MCP'],
  },
]

export type Experience = {
  company: string
  role: string
  start: string
  end?: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Avatye',
    role: 'Backend Engineer',
    start: '2023.12',
    // end 없으면 현재로 동적 계산
    description: [
      '리워드·광고 플랫폼 API 서버 설계 및 운영 (20개 이상 광고 파트너 연동)',
      '광고 네트워크 9개 이상을 단일 인터페이스로 통합, 선택적인 광고 송출 및 송출 순서를 제어하는 웹 미디에이션 SDK 개발 및 CDN 배포',
      '전사 공유 서버 모듈 Restify → Fastify ^5.0 마이그레이션',
      'OpenTelemetry·Prometheus·Tempo 기반 모니터링 환경 구축 및 grafana 대시보드 구축',
      '어드민 시스템 풀스택 1인 개발 (권한관리·통계·정산)',
      'LLM Claude API 기반 Obsidian 플러그인 오픈소스 개발',
    ],
  },
]

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
  architecture?: string
  issues?: Issue[]
  metrics?: { label: string; value: string }[]
}

// 이 배열의 숫자 순서대로 Projects 섹션에 표시됩니다
export const projectOrder = [5, 1, 7, 6, 8, 4, 9, 10, 3, 2]

export const projects: Project[] = [
  {
    id: 1,
    label: 'LLM',
    name: 'AI 기반 코딩 자동화 플랫폼 오픈소스',
    summary: 'Claude가 프로젝트별로 직접 코드를 작성·수정하고 에이전트의 현재 작업 상태를 모니터링할 수 있는 IDE 대시보드 플랫폼',
    start: '2026.02',
    description: [
      'Anthropic 프롬프트 캐싱을 적용해 안정적 컨텍스트(코드베이스·컨벤션)와 동적 태스크를 분리 — 반복 실행 시 토큰 비용 약 90% 절감',
      '파일별 관련성 정도를 점수로 구분 + 너무 큰 파일은 요약 및 제외로 관련 파일만 선별해 컨텍스트에 포함 — 200K 문자 상한 내에서 품질 유지',
      'SSE 기반 실시간 스트리밍에 50ms 디바운스 배치 처리를 더해 초당 수천의 청크 이벤트를 약 20회 렌더링으로 축소',
      'MCP 서버 14개 도구 구현으로 외부 에이전트와의 멀티 레포 조율, 승인 게이트(human-in-the-loop), 마일스톤 추적 지원',
      'SQLite WAL 모드 + 파일 백업 테이블로 Claude 실행 전 원본을 저장해 한 번의 클릭으로 롤백 가능',
      'MIT 오픈소스 공개 — Hono.js 백엔드, React 19 + xterm.js 프론트엔드, 단일 포트로 정적 빌드까지 서빙',
    ],
    stack: ['TypeScript', 'Hono.js', 'React 19', 'Anthropic SDK', 'MCP', 'SQLite', 'xterm.js', 'Vite'],
    metrics: [
      { label: '반복 실행 토큰 비용', value: '~90% 절감' },
      { label: 'MCP 서버 도구', value: '14개' },
      { label: 'SSE 렌더링 최적화', value: '수천 청크 → 20회/초' },
    ],
    issues: [
      {
        title: '프롬프트 캐싱 적용으로 반복 실행 시 토큰 비용 절감',
        status: 'closed',
        problem: '같은 프로젝트에서 태스크를 반복 실행할 때 200K 문자짜리 코드베이스를 매번 통째로 보냈다. 변하지 않는 코드베이스·CLAUDE.md가 태스크마다 토큰을 새로 소비해서 비용이 금방 쌓였다.',
        solution: '프롬프트를 자주 바뀌지 않는 안정 영역(코드베이스·규칙)과 매번 달라지는 동적 영역(태스크 내용)으로 분리하고, 안정 영역에만 캐시 힌트를 적용했다. 같은 프로젝트에서 반복 실행하면 변하지 않는 부분은 재처리하지 않아 비용이 약 90% 줄었다.',
        relatedNodes: ['API', 'Claude'],
        impact: '반복 실행 시 토큰 비용 약 90% 절감',
      },
      {
        title: 'SSE 스트림 디바운스 배치 처리로 렌더링 성능 개선',
        status: 'closed',
        problem: 'Claude가 스트리밍으로 텍스트를 내려보낼 때 초당 수십~수백 개의 spec:run_chunk 이벤트가 날아왔다. 이벤트마다 setState를 하면 터미널 컴포넌트가 그만큼 다시 그려져서 UI가 버벅였다.',
        solution: '실행 단위별 텍스트 버퍼를 두고 50ms 이내에 쏟아지는 이벤트를 묶어서 한 번만 화면을 갱신하는 디바운스 방식을 적용했다. 초당 수백 개 이벤트가 약 20회 화면 갱신으로 줄어들어 버벅임이 사라졌다.',
        relatedNodes: ['UI', 'API'],
        impact: '초당 수백 개 이벤트 → 화면 갱신 약 20회로 축소',
      },
      {
        title: 'SQLite WAL(Write-Ahead-Logging) 파일 백업·롤백 시스템 구현',
        status: 'closed',
        problem: 'Claude가 파일을 수정하다 실패하거나 결과가 마음에 안 들면 되돌릴 방법이 없었다. 실행 단위로 어떤 파일을 건드렸는지 추적하지 않으면 git으로 일일이 찾아서 되돌려야 했다.',
        solution: '에이전트가 파일을 처음 건드릴 때 원본 내용을 실행 단위로 저장해두는 구조를 만들었다. 신규 파일은 없음으로 기록하고, 롤백 시 저장된 원본으로 덮어쓰거나 신규 파일이면 삭제한다. 에이전트 실행 중에도 안전하게 읽고 쓸 수 있는 WAL 모드를 적용했다.',
        relatedNodes: ['API', 'FS', 'DB'],
      },
      {
        title: 'MCP 서버 14개 도구로 멀티 레포 에이전트 조율 지원',
        status: 'closed',
        problem: '에이전트 여럿이 동시에 작업할 때 서로 어디까지 됐는지 알 방법이 없었다. 사람 승인이 필요한 지점에서 에이전트를 멈추게 하거나, 에이전트끼리 결과물을 주고받는 구조가 없었다.',
        solution: '에이전트 등록 → 마일스톤 보고 → 사람 검토 요청 → 단계 완료 순서로 워크플로를 정의하는 도구 14개를 MCP 서버에 구현했다. 검토 요청 도구가 승인·거부 상태를 반환하기 전까지 다음 단계로 넘어가지 않고, 결과물 공유 도구로 에이전트 간 산출물을 주고받는다.',
        relatedNodes: ['MCP', 'Agents'],
        impact: 'MCP 도구 14개로 승인 게이트·마일스톤 추적 지원',
      },
      {
        title: '키워드 스코어링 기반 컨텍스트 파일 자동 선별 알고리즘',
        status: 'closed',
        problem: '코드베이스 전체를 컨텍스트에 넣으면 200K 문자 한도를 금방 넘는다(50KB 넘는 파일은 첫 100줄만 요약해서 넣어도 마찬가지다). 그렇다고 관련 파일을 매번 사람이 지정하면 태스크마다 손이 가고 놓치는 파일도 생긴다.',
        solution: '태스크 설명에서 키워드를 뽑아 파일마다 관련도 점수를 매겼다 — 파일명이 키워드와 완전히 같으면 4점, 파일명이 키워드로 시작하면 3점, 파일명에 포함되면 2점, 경로에만 포함되면 1점을 준다. 여기에 컨벤션 설정의 `always_include_files` 패턴에 매칭되는 파일은 무조건 999점을 줘서 점수 순위와 무관하게 항상 포함되게 했다. 사용자가 파일을 직접 지정한 경우엔 그 파일들(998점) + always_include 파일만 남기고, 지정이 없으면 always_include → 점수 높은 순 → 나머지(경로순)로 채워서 200K 문자 한도까지 그리디하게 담는다.',
      },
      {
        title: 'CLI 모드 최소 프롬프트 — 이미지 첨부 시에만 파일 전문 포함',
        status: 'closed',
        problem: '모든 실행에서 파일 내용을 직접 프롬프트에 넣는 SDK 경로만 쓰면 매번 코드베이스 전체를 토큰으로 태워야 했다. 그런데 이미지 첨부가 없는 일반 실행은 Claude CLI의 Read/Write/Edit 툴로 에이전트가 파일을 직접 읽고 쓸 수 있어서, 파일 내용을 미리 넣어줄 필요가 없는 경우였다.',
        solution: '이미지 첨부 여부로 두 경로를 나눴다. 이미지가 있으면 기존처럼 키워드 스코어링으로 고른 파일 내용을 프롬프트에 통째로 넣는 SDK 모드를 쓰고, 이미지가 없는 일반 실행은 `git ls-files`로 뽑은 파일 목록(최대 300개, 허용 확장자만 필터링)만 프롬프트에 넣는 최소 프롬프트로 전환했다. 파일 내용 없이 경로만 주고 나머지는 Claude CLI가 알아서 읽어가게 해서 시작 토큰을 크게 줄였다.',
      },
      {
        title: '폴더 기반 구독 시스템 — 프로젝트별 계정·API 키 분리',
        status: 'closed',
        problem: 'Claude 계정을 여러 개 쓰거나 프로젝트마다 다른 API 키로 에이전트를 붙이고 싶은데, Claude CLI는 기본적으로 전역 설정(`~/.claude`) 하나만 보고 동작해서 프로젝트별로 분리할 방법이 없었다.',
        solution: '구독 모드에서는 실행 환경변수에서 `ANTHROPIC_API_KEY`를 아예 지워서 구독 로그인을 쓰도록 강제하고, `CLAUDE_CONFIG_DIR`을 계정 이메일 기준으로 만든 전용 디렉토리(`~/.agentpub/accounts/<이메일>`)로 지정해서 계정마다 세션·자격증명이 완전히 격리되도록 했다. API 키 모드에서는 프로젝트에 저장된 키를 실행 시 `ANTHROPIC_API_KEY`로 주입한다. 우선순위는 프로젝트에 지정된 계정/키 → 프로젝트 전용 config 디렉토리 → 전역 설정 순으로 폴백하게 만들어서, 프로젝트별 설정이 없으면 자동으로 전역 기본값을 쓰게 했다.',
      },
    ],
    architecture: `graph TD
  Dev["개발자"] -->|자연어 태스크 입력| UI["AgentPub Web UI (React 19)"]
  UI <-->|REST + SSE| API["Backend (Hono.js)"]
  UI <-->|WebSocket PTY| Shell["인터랙티브 셸 (node-pty)"]
  API -->|프롬프트 캐싱 적용| Claude["Claude API (Anthropic SDK)"]
  API -->|파일 읽기·쓰기·롤백| FS["로컬 파일시스템"]
  API -->|status·diff·commit| Git["Git"]
  API -->|스펙·세션·백업 저장| DB[("SQLite WAL")]
  API -->|14개 MCP 도구| MCP["MCP 서버"]
  MCP -->|멀티 레포 조율| Agents["외부 Claude 에이전트"]`,
  },
  {
    id: 2,
    label: 'Dev',
    name: '광고주·파트너 어드민 시스템',
    summary: '광고주용·파트너(퍼블리셔)용 어드민 풀스택 1인 개발',
    start: '2023.12',
    description: [
      'Next.js API Routes 기반 BFF(BackEnd For FrontEnd) 패턴으로 프론트엔드·서버사이드 로직을 단일 코드베이스에서 통합',
      '광고주용·파트너(퍼블리셔)용 어드민을 독립 서비스로 분리 설계',
      'AWS Elastic Beanstalk + GitHub Actions CI/CD + PM2 클러스터 모드 배포 파이프라인 구축',
      '광고 캠페인, 게재위치 관리, 일별/시간별 통계, 정산까지 포함한 다기능 어드민 시스템',
      'Node.js 메이저 업그레이드 시 OpenSSL 비호환 이슈를 RS256 듀얼키 구조(신규 서명 + 레거시 검증 폴백)로 해결',
      'nginx 레이어에서 악성 URI 패턴·스캐닝 도구 차단 설정으로 보안 강화',
    ],
    stack: ['Next.js', 'TypeScript', 'MySQL', 'AWS S3', 'AWS SES', 'AWS EB'],
    metrics: [
      { label: '개발 인원', value: '1인 풀스택' },
      { label: '운영 기간', value: '2년이상' },
    ],
    issues: [
      {
        title: 'Node.js 18 업그레이드 — OpenSSL 3 RS256 비호환을 듀얼키 폴백으로 해결',
        status: 'closed',
        problem: 'Node 16에서 18로 올리는 배포를 진행했는데, 배포 자체가 에러로 실패했다. 원인을 확인해보니 OpenSSL 3부터 레거시 알고리즘 정책이 바뀌면서 기존 RS256 private.key(2047비트)로 서명한 JWT 검증이 전부 실패하고 있었다. 운영 중인 어드민 서비스라 무중단으로 처리해야 했고, 키를 한 번에 교체하면 로그인 중인 관리자들의 세션이 모두 끊기는 문제도 있었다.',
        solution: '새 키(private.new.key)로 신규 토큰을 서명하고, 검증 시에는 새 키를 먼저 시도한 뒤 실패하면 기존 public.key로 폴백하는 구조를 적용했다. 트래픽이 적은 어드민 서비스인 만큼 별도 롤백 계획은 마련하지 않았고, 배포 후 기존 로그인 세션이 재로그인 없이 자연스럽게 신규 키 토큰으로 전환되는 과정을 지켜봤다.',
        relatedNodes: ['AS', 'PS'],
        impact: '서비스 중단·재로그인 없이 신규 서명 키로 전환',
      },
      {
        title: '클라이언트 전용 인가 구조 — API 엔드포인트 서버사이드 타입 검증 추가',
        status: 'closed',
        problem: '광고주 어드민에 계정 타입을 분리해야 하는 요구사항이 들어왔다. 광고주마다 정산 조건이 달라서 특정 계정 타입에서는 정산 내용이 아예 보이면 안 되는 상황이었는데, 막상 구현하려고 보니 인가 체크가 useAuth() 클라이언트 Context에만 있고 API 엔드포인트에는 별도 검증이 없었다. 이 상태로는 쿠키를 조작하거나 API를 직접 호출하는 방식으로 화면단 제한을 우회할 수 있는 구조였다.',
        solution: 'APIHandler 래퍼에 쿠키 토큰 검증과 adminType 체크를 추가했다. 정산 조회처럼 특정 계정 타입 전용인 엔드포인트는 서버에서 직접 토큰의 type 필드를 확인해서 401로 차단하도록 해서, 클라이언트 화면단 제한과 무관하게 서버에서 한 번 더 걸러지도록 만들었다.',
        relatedNodes: ['AS'],
      },
      {
        title: '광고 검수 상태 머신 — 허용되지 않은 상태 전이 차단',
        status: 'closed',
        problem: '검수 상태를 설계하면서, 같은 \'대기\' 상태라도 처음 등록되어 대기 중인 경우와 반려된 뒤 재검수를 기다리는 대기 중인 경우가 있고, 두 경우에 허용되는 다음 상태가 서로 다르다는 걸 알게 됐다. 상태 값만 보고 전이를 처리하면 이 차이가 구분되지 않아서, 이미 발행된 광고가 대기 상태로 되돌아가는 것 같은 비정상적인 전이가 가능한 구조였다.',
        solution: '현재 상태에서 허용되는 다음 상태만 받도록 전이 규칙을 정의했다. 같은 \'대기\'라도 이전 상태가 무엇이었는지에 따라 허용되는 전이를 다르게 구성해서 앞서 발견한 문제를 막았고, 잘못된 전이 요청은 400으로 거부했다. 프론트엔드에서도 현재 상태에 맞는 버튼만 노출하도록 해서 이중으로 막았다.',
        relatedNodes: ['AS'],
      },
      {
        title: '정산 로직 외부 위임 — 어드민-리워드 데이터 일관성 확보',
        status: 'closed',
        problem: '어드민에서 정산 데이터를 직접 조회하는 구조로 가면 정산 계산 로직이 리워드 시스템과 어드민 두 곳에 중복된다. 로직이 바뀔 때마다 두 곳을 다 고쳐야 하고, 하나라도 놓치면 두 시스템의 정산 수치가 어긋날 수 있는 구조라 이대로는 안 되겠다고 판단했다.',
        solution: '정산 조회를 리워드 서버 쪽 프록시로 위임했다. 어드민은 화면 렌더링만 담당하고, 정산 계산 로직은 리워드 서버 한 곳에서만 관리하도록 해서 두 시스템 간 수치가 어긋날 여지를 애초에 없앴다.',
        relatedNodes: ['AS', 'RS'],
      },
      {
        title: 'S3 업로드 파일 타입·크기 미검증 — 서버사이드 검증 추가',
        status: 'closed',
        problem: 'QA 과정에서 용량이 큰 이미지도 제한 없이 그대로 업로드되는 걸 발견했다. 확인해보니 업로드 API가 파일 타입이나 크기를 전혀 검사하지 않고 있었다. nginx에 전체 요청 크기 제한은 걸려 있었지만 그것만으로는 부족했고, S3 버킷도 공개 접근 설정이라 아무 파일이나 올라가면 외부에서 바로 접근 가능한 상태였다.',
        solution: '업로드 전에 이미지 타입 여부와 크기(5MB 이하)를 서버에서 직접 검증하도록 추가했다. 파일명도 원본 대신 타임스탬프 기반으로 재생성해서 경로를 예측하기 어렵게 만들었다.',
        relatedNodes: ['PS', 'S3'],
      },
    ],
    architecture: `graph TD
  subgraph AdvertiserApp["광고주 어드민 (Next.js)"]
    AC["페이지 (CSR + SSR)"]
    AS["API Routes"]
    AC --> AS
  end
  subgraph PartnerApp["파트너 어드민 (Next.js)"]
    PC["페이지 (CSR + SSR)"]
    PS["API Routes"]
    PC --> PS
  end
  subgraph DeployA["배포 (광고주)"]
    GHA_A["GitHub Actions"] -->|빌드 및 배포| EB_A["AWS EB"]
    EB_A -->|PM2 클러스터| AdvertiserApp
  end
  subgraph DeployP["배포 (파트너)"]
    GHA_P["GitHub Actions"] -->|빌드 및 배포| EB_P["AWS EB"]
    EB_P -->|PM2 클러스터| PartnerApp
  end
  AS -->|파트너 계정 생성, 광고 검수| DB[("MySQL")]
  PS -->|광고 등록 및 조회| DB
  AS -->|검수 승인·반려 알림| SES["AWS SES"]
  PS -->|광고 등록 알림| SES
  PS -->|광고 이미지 업로드| S3["AWS S3"]
  AS -->|정산 조회 프록시| RS["정산관련 프록시 서버"]
  RS -->|정산 데이터 조회| DB`,
  },
  {
    id: 3,
    label: 'Dev',
    name: '자사 어드민 ISMS 권한관리 및 로그추적 시스템 구축',
    summary: 'RBAC(Role-Based Access Control) 기반 권한 관리와 전체 API 액션 Audit Trail 풀스택 1인 개발',
    start: '2024.01',
    description: [
      'Account → Group → Role → Permission 4계층 RBAC 구조 설계 및 구현',
      '모든 관리자 API 호출을 DB에 자동 기록하는 Audit Trail 구현 (조회 행위 포함)',
      'Next.js + Restify 커스텀 서버 BFF 패턴으로 권한 미들웨어를 서버 레이어에서 일괄 적용',
      'JWT private key를 파일시스템에서 AWS Secrets Manager로 이관해 보안 강화',
      '기간·HTTP 메서드·경로 기준 로그 검색 및 Monaco Editor 기반 datadog과 유사한 상세 JSON 뷰어 제공',
    ],
    stack: ['Next.js', 'JavaScript', 'AWS Aurora', 'AWS EB', 'AWS Secrets Manager', 'JWT RS256'],
    metrics: [
      { label: 'Audit Trail 적용 범위', value: '전체 관리자의 모든 API' },
      { label: '개발 인원', value: '1인 풀스택' },
    ],
    issues: [
      {
        title: 'RBAC 4계층 권한 위임 — 개인·그룹 역할 합산으로 실효 권한 계산',
        status: 'closed',
        problem: 'AWS IAM 권한관리시스템을 참고해서 개인권한과 그룹권한을 각각 지정할 수 있게 만들었는데, 구현하다 보니 두 권한이 겹칠 때 어느 쪽을 기준으로 삼을지 정해야 하는 순간이 있었다. 개인 추가 권한과 그룹 권한을 단순히 합치면, 그룹 권한 설계가 느슨할 경우 의도보다 넓은 권한이 부여될 수 있는 구조였다.',
        solution: '그룹 안에서 특정 인원에게만 예외적으로 권한을 추가하는 상황을 단순하게 처리하기 위해 개인 역할 경로와 그룹 역할 경로를 합산하는(UNION) 방식을 택했다. 합산 방식 자체는 권한이 과도하게 누적될 여지가 있지만, 그룹 권한을 해당 그룹에 꼭 필요한 최소 권한으로 제한해서 설계하면 문제가 되지 않는다고 판단했다. 권한 조회 쿼리에서 두 경로의 결과를 합치고 중복은 제거해 실효 권한 집합을 구성한다.',
        relatedNodes: ['Acc', 'Grp', 'Role', 'Perm'],
      },
      {
        title: 'JWT private key → AWS Secrets Manager 이관',
        status: 'closed',
        problem: '레포지토리 자체는 프라이빗이었지만 위험 경고 메일을 받으면서, 전사적으로 민감한 키 파일을 저장소나 서버 파일시스템에 직접 두지 않고 AWS Secrets Manager로 관리하기로 방침이 정해졌다. 이 프로젝트도 JWT 서명용 private.key가 서버 파일시스템에 그대로 있었고, 키를 교체하려면 전체 서버를 재배포해야 하는 구조였다.',
        solution: 'AWS Secrets Manager에 private key를 저장하고 서버 시작 시 API로 가져오도록 변경했다. 이후로는 키 교체가 필요할 때 서버 재배포 없이 Secrets Manager에서 단독으로 처리할 수 있게 됐다.',
        relatedNodes: ['App', 'SM'],
        impact: '키 교체 시 서버 재배포 불필요',
      },
      {
        title: '전체 관리자 API 호출 Audit Trail — 조회 행위까지 포함해 자동 기록',
        status: 'closed',
        problem: 'RBAC 기반 권한 관리를 추가하면서, 어느 직원이 실제로 어떤 어드민 작업을 했는지 파악할 방법이 없다는 것도 같이 눈에 들어왔다. 권한을 세밀하게 나눠봤자 누가 그 권한으로 뭘 했는지 사후에 확인할 수 없으면 의미가 반감되는 상황이었다.',
        solution: 'Restify 미들웨어 레이어에서 모든 API 요청을 가로채 요청자·경로·메서드·바디를 DB에 자동 기록하도록 만들었다. 조회 행위까지 포함해서 전체 액션을 추적할 수 있게 했다. 로그성 데이터라 변경이 잦으면 벌크 insert도 고려했지만, 어드민 특성상 호출 빈도가 높지 않을 것으로 판단해서 요청 단위로 바로 저장하는 단순한 방식을 택했다.',
        relatedNodes: ['App', 'DB'],
        impact: '전체 관리자 API 호출을 조회 행위까지 포함해 추적 가능',
      },
      {
        title: 'Permission JWT 클레임 문자열 부분 매칭 취약점 — 숫자 배열 비교로 전환',
        status: 'closed',
        problem: 'QA 과정에서 권한이 없는 기능에 접근되는 사례가 발견됐다. 원인을 확인해보니 권한 목록을 JWT에 쉼표 구분 문자열("1,12,23")로 저장하고 미들웨어에서 .includes(requiredPermission)로 체크하고 있었는데, 권한 ID 1과 12처럼 자릿수가 겹치는 조합에서 문자열 부분 매칭으로 걸려 잘못 통과되는 문제였다.',
        solution: 'JWT 클레임을 문자열 대신 숫자 배열로 바꾸고 검사도 배열 indexOf 비교로 전환했다. 권한 ID가 겹치는 조합이어도 정확히 일치하는 값만 통과하도록 만들어서 문제를 해소했다.',
        relatedNodes: ['App'],
      },
      {
        title: 'OAuth2 x5c 인증서 캐시 무효화 없음 — Redis TTL 만료 설정으로 자동 갱신 처리',
        status: 'closed',
        problem: '출근해서 어드민에 로그인하려는데 안 됐다. 확인해보니 Azure AD의 x5c 인증서를 모듈 메모리에 캐시해두고 만료나 갱신 로직을 따로 두지 않은 상태였다. 인증서가 갱신되면서 캐시된 값이 무효화됐고, 서버를 재시작하기 전까지는 모든 OAuth2 로그인이 실패하는 구조였다.',
        solution: '그 자리에서는 서버를 재배포하면 바로 해결되는 문제였지만, 인증서 갱신 시점을 예측할 수 없어서 같은 장애가 언제 또 터질지 알 수 없는 상황이었다. 그래서 인증서 캐시에 TTL을 설정하고, 검증에 실패하면 캐시를 무효화한 뒤 x5c를 다시 가져오도록 로직을 추가해서 인증서가 갱신되어도 서버 재시작 없이 자동으로 갱신되도록 만들었다.',
      },
    ],
    architecture: `graph TD
  Browser["관리자 브라우저"] -->|HTTPS| App["Next.js + Restify 서버"]
  App -->|JWT private key 조회| SM["AWS Secrets Manager"]
  App -->|권한 체크| DB[("AWS Aurora")]
  App -->|CRUD + API 액션 자동 기록| DB
  subgraph RBAC["권한 체계"]
    Acc["계정"] --> Grp["그룹"] --> Role["역할"] --> Perm["권한"]
  end
  GHA["GitHub Actions"] -->|CI/CD| EB["AWS EB"]
  EB -->|PM2| App`,
  },
  {
    id: 4,
    label: 'SDK',
    name: '웹광고 통합 미디에이션 SDK 개발',
    summary: '9개 이상 광고 네트워크를 단일 인터페이스로 통합하는 클라이언트 사이드 웹 광고 SDK',
    start: '2024.09',
    description: [
      '다수의 광고 네트워크(9개 이상)를 어댑터 패턴으로 추상화해 단일 API로 통합',
      '광고 요청 실패 시 우선순위 기반 폴백 체인을 자동 탐색해 광고 노출률 극대화',
      'Rollup + Terser 즉시실행함수 번들로 빌드해 CDN에 배포 — 버전 기반 파일명으로 캐시 자동 무효화',
      '글로벌 네임스페이스로 외부 공개 API를 격리해 호스트 페이지 오염 방지',
      'Core-JS 3 폴리필로 하위 버전 브라우저에서의 호환성 확보, 번들 크기 최적화',
    ],
    stack: ['TypeScript', 'Rollup', 'Babel', 'Fastify', 'AWS S3', 'CDN'],
    metrics: [
      { label: '통합 광고 네트워크', value: '9개 이상' },
      { label: '배포 방식', value: 'CDN 정적 빌드' },
    ],
    issues: [
      {
        title: '어댑터 패턴 — 네트워크마다 다른 초기화·파라미터를 단일 인터페이스로',
        status: 'closed',
        problem: '여러 광고 네트워크를 통합하려는데, 네트워크마다 초기화 방식, 요청 파라미터, 완료 콜백 구조가 전부 달랐다. 이대로 네트워크마다 분기 코드를 쌓으면 네트워크가 추가될 때마다 기존 로직을 건드려야 하고, 나중에 순서대로 시도하는 폴백 구조를 얹기도 어려워질 게 뻔했다.',
        solution: '각 네트워크를 동일한 인터페이스의 어댑터 함수로 래핑했다. 호출하는 쪽에서는 어떤 네트워크인지 몰라도 동일한 방식으로 초기화·요청·완료 처리를 할 수 있고, 새 네트워크가 추가돼도 어댑터 함수 하나와 팩토리 케이스 하나만 추가하면 기존 코드는 건드릴 필요가 없다.',
        relatedNodes: ['SDK', 'Chain'],
      },
      {
        title: 'reduce 기반 폴백 체인 — 실패 시 다음 네트워크 자동 전환',
        status: 'closed',
        problem: '어댑터로 인터페이스는 통일했지만, 첫 번째 네트워크가 광고 없음이나 오류를 반환하면 그대로 광고가 뜨지 않는 상태였다. 노출 기회를 최대한 살리려면 우선순위대로 다음 네트워크를 자동으로 시도하는 실행 흐름이 필요했다.',
        solution: '네트워크 목록을 reduce로 체이닝해서, 앞 네트워크가 실패하면 자동으로 다음 네트워크의 어댑터를 시도하는 구조를 만들었다. 중간에 취소가 들어오면 즉시 멈추고, 모든 네트워크가 실패해도 마지막에 백필 광고를 항상 노출하도록 해서 노출 실패율을 최소화했다.',
        relatedNodes: ['Chain', 'A1', 'A2'],
        impact: '백필까지 포함한 폴백 체인으로 노출 실패율 최소화',
      },
      {
        title: '즉시실행함수 클로저로 window.**외 내부 구현 전역 노출 차단',
        status: 'closed',
        problem: 'SDK를 스크립트 태그로 배포하면 내부 변수들이 그대로 window에 붙을 수 있는 구조였다. 광고 SDK 특성상 여러 호스트 페이지에 실리는데, 흔히 쓰는 네이밍이 겹칠 확률이 높다고 판단해서 이름 충돌이나 외부 조작 위험을 배포 전에 미리 막기로 했다.',
        solution: '즉시실행함수 클로저 안에 내부 구현을 전부 가두고, 외부에는 단일 진입점 하나만 전역 변수로 노출했다.(window.**) 내부 식별자가 호스트 페이지의 변수와 충돌하거나 외부에서 조작될 위험을 원천 차단했다.',
        relatedNodes: ['SDK', 'Host'],
      },
      {
        title: 'localStorage 쿨다운 방식으로 광고 중복 노출 방지',
        status: 'closed',
        problem: '같은 사용자에게 광고가 너무 자주 노출되지 않도록 제한하는 게 SDK의 정책이었다. 그런데 사용자가 화면을 빠르게 반복해서 열거나 로딩 중에 새 요청이 들어오면, 정책과 무관하게 짧은 시간 안에 광고가 중복으로 노출될 수 있는 구조였다.',
        solution: '마지막 광고 표시 시각을 로컬에 저장해서 정책에 정의된 쿨다운 기간 안에는 재요청을 차단했다. 광고가 로딩 중인 동안에는 별도로 진행 중 상태를 관리해서, 같은 광고가 동시에 두 번 실행되는 것도 함께 막았다.',
      },
      {
        title: '광고 완료 후 슬롯·이벤트 리스너 정리 — 메모리 누수 방지',
        status: 'closed',
        problem: '특정 광고 네트워크는 완료 후 특정 액션(노출·클릭 감지 등)을 잡아내기 위해 슬롯이 DOM에 미리 만들어져 있어야 하는 정책이었다. 그러다 보니 광고가 끝난 뒤에도 슬롯과 이벤트 리스너를 바로 제거하지 못하는 구조가 됐고, 이 상태를 그대로 두면 요청이 반복될수록 DOM에 슬롯이 계속 쌓여 메모리 누수로 이어질 게 예상됐다.',
        solution: '광고 완료 시점을 플래그로 추적해서 완료 처리가 정확히 한 번만 실행되도록 보장하고, 필요한 감지가 끝나는 시점에 광고 슬롯과 이벤트 리스너를 모두 제거하도록 만들었다. 중복 실행 방지 플래그로 예외 케이스에서 슬롯이 이중으로 처리되는 것도 함께 막았다.',
      },
    ],
    architecture: `graph TD
  Host["호스트 웹페이지"] -->|스크립트 로드| CDN["CDN"]
  CDN -->|IIFE 번들 전달| SDK["Web Ad SDK"]
  SDK -->|광고 요청| Chain["폴백 체인"]
  Chain --> A1["광고 네트워크 A"]
  Chain --> A2["광고 네트워크 B"]
  Chain --> A3["광고 네트워크 C"]
  Chain --> A4["광고 네트워크 D"]
  Chain --> A5["광고 네트워크 E 등 9개+"]
  SDK -->|API 호출| API["API 서버"]
  API --> DB[("Aurora/MySQL")]
  GHA["GitHub Actions"] -->|빌드 후 업로드| S3["AWS S3"]
  S3 --> CDN`,
  },
  {
    id: 5,
    label: 'LLM',
    name: '디자이너·기획자를 위한 Obsidian Claude 플러그인 오픈소스',
    summary: 'Claude Agent SDK를 Obsidian에 임베딩한 AI 에이전트 플러그인 (claudian + planit) 오픈소스 개발',
    start: '2026.04',
    description: [
      'Anthropic Claude Agent SDK를 Obsidian 플러그인에 직접 통합 — 볼트 파일 읽기/쓰기·bash 실행·스트리밍 응답·서브에이전트·MCP 서버를 사이드바 AI 에이전트로 노출',
      '영속 쿼리 패턴으로 활성 대화의 콜드스타트 지연 제거, MessageChannel 추상화로 SDK 스트림 이벤트 중복 렌더링 방지, 세션 재개·포크 추적으로 연속 대화 복원',
      '3단계 보안 모드(Auto·Plan·Normal), bash 블록리스트, 심볼릭 링크 안전 볼트 제한으로 플러그인 환경에서의 파일시스템 접근 위협 모델링',
      'Planit(캘린더·태스크 매니저 플러그인)을 JSON 스키마 기반으로 설계해 claudian이 자연어로 일정을 직접 조작 — 두 플러그인 간 코드 결합 없는 AI↔UI 연동',
      '디자이너 전용 슬래시 커맨드 15개·커스텀 에이전트 7개(디자인 리뷰, 사용자 리서치, 스프린트 플래닝 등) 및 10개 언어 i18n 내장',
      'ESLint 의존성 규칙으로 레이어 간 순환 참조 방지, Jest TDD 워크플로로 SDK 연동 복잡도 관리',
    ],
    stack: ['TypeScript', 'Anthropic Claude Agent SDK', 'Obsidian API', 'MCP', 'Jest'],
    metrics: [
      { label: '디자인 커맨드', value: '15개' },
      { label: '커스텀 에이전트', value: '7개' },
      { label: '지원 DB MCP', value: '2개' },
    ],
    issues: [
      {
        title: '영속 쿼리 패턴으로 대화 콜드스타트 지연 제거',
        status: 'closed',
        problem: '메시지를 보낼 때마다 SDK 쿼리를 새로 만들면 매번 초기화 비용이 들어서 첫 응답까지 2~5초가 걸렸다. 대화가 짧아도 턴마다 이 지연이 반복돼서 체감이 나빴다.',
        solution: '대화가 활성화된 동안 SDK 쿼리(`persistentQuery`)를 계속 살려두고, `MessageChannel`을 통해 새 메시지를 큐에 넣는 방식으로 바꿨다. 재시작이 필요한 건 시스템 프롬프트, 비허용 도구 목록, 플러그인 구성, CLI 경로, effort 레벨처럼 쿼리를 다시 만들어야만 반영되는 설정이 바뀔 때뿐이고, 권한 모드처럼 실행 중에도 바꿀 수 있는 값은 재시작 없이 그때그때 반영했다. 재시작이 필요하면 기존 쿼리를 먼저 닫고 새로 여는 순서로 처리해서, CLI 자체가 사용 불가능해진 경우에도 콜드스타트로 자연스럽게 폴백되게 만들었다.',
        relatedNodes: ['Claudian', 'Claude'],
        impact: '턴당 첫 응답 지연 2~5초 → 콜드스타트 제거',
      },
      {
        title: 'MessageChannel 추상화로 SDK 스트림 이벤트 중복 렌더링 방지',
        status: 'closed',
        problem: 'SDK가 같은 텍스트를 두 번 보냈다. 턴이 진행되는 동안 `stream_event`로 텍스트가 조각조각 실시간으로 오고, 턴이 끝나면 완성된 assistant 메시지로 같은 내용이 또 왔다. 그대로 두면 화면에 같은 텍스트가 두 번 찍혔다.',
        solution: '스트림 텍스트를 먼저 받았는지 표시하는 `sawStreamText` 플래그를 응답 처리기에 뒀다. `assistant` 메시지의 텍스트 이벤트가 오면, 같은 턴에서 스트림으로 이미 텍스트를 받은 적이 있는지 플래그로 확인해서 있으면 건너뛰었다. 이 플래그가 여러 턴에 걸쳐 뒤섞이지 않도록, `MessageChannel`이 한 번에 하나의 턴만 진행되도록 강제해서(턴이 끝나야 다음 메시지가 큐에서 빠져나온다) 응답 처리기가 항상 하나만 활성 상태이도록 설계 자체로 보장했다.',
      },
      {
        title: 'Planit JSON 스키마 기반 자연어 일정 조작 연동 설계',
        status: 'closed',
        problem: 'Claudian과 Planit을 코드로 직접 연결하면 한쪽을 업데이트할 때마다 반드시 다른 쪽도 함께 고쳐야 한다. Obsidian 플러그인은 서로 코드를 직접 import할 수도 없어서 다른 방법이 필요했다.',
        solution: '공유 JSON 파일을 두 플러그인의 계약으로 삼았다. AI 플러그인은 파일을 직접 읽고 쓰고, 캘린더 플러그인은 파일 변경을 감지해 UI를 자동으로 갱신한다. 공유 코드 없이 파일 포맷만 약속해서 두 플러그인이 독립적으로 배포되어도 공유 데이터가 유지되도록 했다.(다른 플래너와 차별되는 Planit만의 이점)',
        relatedNodes: ['PlanitJSON', 'Planit', 'Claudian'],
      },
      {
        title: '3단계 보안 모드 (Auto·Plan·Normal) 및 bash 블록리스트·볼트 경계 구현',
        status: 'closed',
        problem: 'Obsidian은 로컬 파일시스템에 직접 붙어 있어서 에이전트가 bash를 마음대로 쓰면 볼트 밖 파일을 건드리거나 위험한 명령을 실행하는 걸 막을 방법이 없었다. SDK의 권한 모델은 도구 실행 여부를 허용할지만 물을 뿐, 명령어 안에 어떤 경로가 들어있는지는 보지 않았다.',
        solution: '명령어를 문자열로 대충 비교하는 대신 실제로 파싱했다. `$(...)`/백틱 서브셸을 먼저 재귀적으로 뽑아 안의 명령까지 검사하고, `&&`/`||`/`;`/`|`로 명령어를 세그먼트 단위로 쪼개 각각 독립적으로 분석했다. 세그먼트마다 `sudo`/`env` 같은 래퍼와 앞쪽 `KEY=VALUE` 환경변수 할당을 건너뛰어 실제 명령어를 찾고, `cp`/`mv`/`rsync`처럼 목적지 인자가 명확한 명령은 마지막 경로 인자를 쓰기 대상으로 판단했다. `>`, `>>`, `-o파일`, `--output=파일` 같은 리다이렉션·출력 옵션도 정규식으로 잡아 읽기/쓰기를 구분하고, 각 경로 토큰이 볼트 안인지 허용된 export/context 경로인지 대조해 벗어난 접근을 차단했다. 심볼릭 링크는 대상이 아직 존재하지 않는 신규 파일이어도 가장 가까운 존재하는 상위 경로까지는 실제 경로로 풀어서 재조합하는 방식으로 경계 우회를 막았다. 이 검사 위에 실행 권한 자체를 Auto/Plan/Normal 3단계로 나눴다.',
        relatedNodes: ['Security', 'Claudian'],
      },
      {
        title: '현재 컨텍스트 파악 불가 — 첨부 파일 가시화 UI 구현',
        status: 'closed',
        problem: '@로 파일을 첨부해도 입력창에는 아무 표시가 없어서 지금 세션에 어떤 파일이 포함돼 있는지 알 방법이 없었다. 파일 크기(대략적인 컨텍스트 분량)도 안 보이니 컨텍스트가 얼마나 쌓였는지 감이 안 왔다.',
        solution: '첨부 파일을 칩으로 렌더링하는 뷰를 만들었다. 현재 열려 있는 노트는 항상 맨 앞에 오고 시각적으로 구분되는 테두리를 준다. 줄 수는 `vault.cachedRead()`로 비동기 조회해서 칩에 `(N줄)`로 표시하고 파일별로 캐싱해뒀다가 볼트 변경 이벤트가 오면 캐시를 무효화한다. 칩이 2개를 넘어가면 나머지를 숨기고 "+N개" 토글로 펼치고 접을 수 있게 했고, 칩을 클릭하면 파일이 열리고 × 아이콘만 클릭하면 첨부에서 제거되도록 클릭 영역을 분리했다.',
      },
      {
        title: 'TickTick 대신 볼트 파일 기반 자체 플래너(Planit) 개발',
        status: 'closed',
        problem: '일정 관리를 Claudian과 자연어로 연동하고 싶었는데, TickTick 같은 기존 플래너는 볼트 밖의 외부 서비스라 Claudian이 파일을 직접 읽고 쓰는 방식으로 연동할 수 없었다. 게다가 TickTick은 유료 구독 서비스라 오픈소스로 공개할 플러그인이 여기 의존하게 만들기도 애매했다.',
        solution: '일정 데이터를 볼트 안의 파일(`.planit/tasks.json`, `.planit/lists.json`)로 저장하는 Planit을 직접 만들었다. Claudian은 이 파일을 Write 도구로 직접 읽고 쓰고, Planit은 `vault.on(\'modify\')`로 파일 변경을 감지해 캘린더 UI를 자동으로 갱신한다. 두 플러그인 사이에 공유 코드는 없고 파일 포맷(스키마 버전 포함)만 계약으로 삼아서, Obsidian 생태계 안에서 무료로 완결되는 일정 관리 흐름을 만들었다.',
        relatedNodes: ['PlanitJSON', 'Planit'],
      },
      {
        title: '설정 탭 UI 재편 — Slack·MySQL·ClickHouse 비개발자 연동 개선',
        status: 'closed',
        problem: 'MCP 서버나 DB 연결을 추가하려면 JSON 설정 파일을 직접 편집해야 했다. 디자이너·기획자 입장에서는 JSON 문법을 몰라 설정 자체를 못 하면 플러그인을 아예 못 쓰는 셈이었다.',
        solution: 'MCP는 stdio/SSE/HTTP 서버 타입을 드롭다운으로 고르면 필요한 입력 필드(커맨드+인자+환경변수 또는 엔드포인트 URL)만 나타나도록 폼을 구성했다. DB 연결은 MySQL/ClickHouse를 고르면 기본 포트(3306/8123)가 자동으로 채워지고, Database 필드는 비워두면 서버 전체에 접근하도록 선택 사항으로 뒀다. "연결 테스트" 버튼은 실제로 클라이언트를 붙였다 끊어보고 성공/실패(실패 시 에러 메시지 포함)를 알려줘서, 저장하기 전에 설정이 맞는지 바로 확인할 수 있게 했다.',
      },
    ],
    architecture: `graph TD
  User["User (디자이너 / 기획자)"] -->|채팅·슬래시커맨드| Claudian["Claudian 플러그인 (Obsidian 사이드바)"]
  Claudian -->|Agent SDK 쿼리| Claude["Claude API (Haiku/Sonnet/Opus)"]
  Claude -->|자연어 데이터 추출| Claudian
  Claudian -->|파일 읽기·쓰기| Vault["Obsidian Vault"]
  Vault -->|노트 콘텐츠| Claudian
  Claudian -->|stdio / SSE / HTTP| MCP["MCP 서버들 (Slack / MySQL / ClickHouse)"]
  MCP -->|쿼리 결과| Claudian
  Claudian -->|자연어 일정 조작| PlanitJSON["Planit JSON (.planit/tasks.json)"]
  PlanitJSON --> Planit["Planit 플러그인 (캘린더 UI)"]
  subgraph Security["보안 레이어"]
    Mode["Auto / Safe / Plan 모드"]
    Block["bash 블록리스트"]
    VaultConf["볼트 경계 제한"]
  end
  Claudian --> Security`,
  },
  {
    id: 6,
    label: 'Monitoring',
    name: 'Prometheus·Tempo 기반 적립 서버 모니터링 내재화',
    summary: 'OTel 기반 분산 추적·메트릭 수집 파이프라인을 직접 설계·운영해 DataDog 의존 탈피',
    start: '2025.10',
    description: [
      '고빈도 API 경로는 trace 저장을 최소화하면서도 메트릭은 전량 집계하는 이중 전략 적용 — trace 저장 비용 10배 절감, 메트릭 정확도 유지',
      'OpenTelemetry가 공식 지원하지 않는 Fastify 5와 Redis 클러스터 환경을 직접 패치해 trace 수집 범위 확보',
      'DB 호출 추적 시 범용 명칭 대신 실제 호출된 프로시저명으로 자동 변환 — Grafana에서 DB 병목을 즉시 식별 가능',
      '커스텀 지표는 전용 수집 서버(FastAPI + Nginx, ECS 배포)로 직접 처리 — 멀티워커 환경에서 지표가 중복 집계되지 않도록 설계',
      'ECS 인스턴스 목록을 주기적으로 조회해 Prometheus 스크레이프 설정을 자동 재생성 — 서버 인스턴스 증감을 수동 개입 없이 반영',
      'Grafana에 Prometheus·Tempo 이중 데이터소스를 연결해 요청률·응답시간(P99) 메트릭과 원본 트레이스를 단일 대시보드에서 연계 조회',
    ],
    stack: ['OpenTelemetry', 'Prometheus', 'Grafana Tempo', 'Grafana', 'FastAPI', 'AWS ECS', 'Node.js', 'Python'],
    metrics: [
      { label: 'Trace 저장 비용', value: '10배 절감' },
      { label: '메트릭 정확도', value: '100% 유지' },
      { label: 'DataDog 비용 대체', value: '자체 서버 비용만 계산(오픈소스)' },
    ],
    issues: [
      {
        title: '고빈도 경로 샘플링 최적화 — trace 비용 절감과 메트릭 정확도 동시 확보',
        status: 'closed',
        problem: '고빈도 엔드포인트는 trace를 전량 저장하면 비용이 크게 늘어나기 때문에 샘플링 비율을 낮춰야 했다. 그런데 trace 샘플링 비율을 낮추면 거기서 파생되는 메트릭 집계도 같이 줄어들어서, 실제 트래픽의 일부만 반영된 RPS·P99 수치가 나올 거라는 걸 미리 예상할 수 있었다.',
        solution: '경로별 샘플링 로직을 직접 구현해서 trace 저장은 줄이되 메트릭 집계는 전체 요청 기준으로 유지되도록 분리했다. trace 저장 비용을 약 10배 줄이면서도 메트릭 정확도는 100%로 유지할 수 있었다.',
        relatedNodes: ['API', 'Collector', 'Prom'],
        impact: 'trace 저장 비용 10배 절감, 메트릭 정확도 100% 유지',
      },
      {
        title: 'OpenTelemetry Fastify 5 미지원 — 요청 경로 정보 직접 주입으로 해결',
        status: 'closed',
        problem: 'OpenTelemetry로 계측을 붙여보다가, 공식 Fastify 계측 라이브러리(`@opentelemetry/instrumentation-fastify`)가 Fastify 5를 지원하지 않는다는 걸 알게 됐다(테스트 기준 v4.18.0). 이 라이브러리 없이 `instrumentation-http`만으로 계측하면 요청 경로 정보가 추적 데이터에 전혀 기록되지 않아서, 모든 요청이 경로 구분 없이 뭉쳐 어떤 엔드포인트가 느린지 파악할 수 없는 상태였다.',
        solution: '`instrumentation-http`는 응답이 끝나는 시점에 OTel 컨텍스트의 RPC 메타데이터(`rpcMetadata.route`)를 읽어서 `http.route` 속성을 채우는 방식으로 동작한다. 문제는 이 값을 누군가 미리 채워줘야 하는데, Fastify 계측 라이브러리가 빠지니 그 역할을 할 게 없었다는 점이었다.\n\n그래서 Fastify `preHandler` 훅을 하나 만들었다. 이 훅에서 `getRPCMetadata`로 현재 활성 컨텍스트를 가져와서 `rpcMeta.route`에 라우트 패턴(`req.routeOptions.url`, 없으면 쿼리스트링을 제거한 원본 경로)을 직접 채워 넣었다. 이후 Prometheus에서 경로별 RPS와 P99를 정확히 확인할 수 있게 됐다.',
        relatedNodes: ['API', 'Collector'],
      },
      {
        title: 'Redis 클러스터 쿼리 추적 누락 — 직접 래핑으로 해결',
        status: 'closed',
        problem: 'OpenTelemetry의 `instrumentation-ioredis`는 `Redis.prototype.sendCommand`만 패치하는데, 앱에서는 `ioredis.Cluster`를 쓰고 있었다. `Cluster`는 `Redis`를 상속하지 않는 별개의 클래스라서 공식 계측이 아예 손대지 못하는 구조였고, 그 결과 Redis 클러스터로 나가는 모든 쿼리가 트레이스에 전혀 기록되지 않았다.',
        solution: '`Cluster.prototype.sendCommand`를 직접 몽키패치했다. 원본 함수를 호출하기 전에 CLIENT 종류의 span을 열어서 `db.system`, `db.statement`(명령어와 인자를 합쳐 200자로 자른 값) 속성을 채우고, 동기 예외와 비동기 Promise 실패를 모두 잡아 각각 예외를 기록한 뒤 종료하도록 만들었다. 중복 패치를 막기 위해 플래그로 한 번만 적용되게 했다. 이후 Redis 클러스터 쿼리 레이턴시를 트레이스에서 직접 확인할 수 있게 됐다.',
      },
      {
        title: 'DB 호출 추적명 범용화 — 프로시저 단위 병목 식별 불가',
        status: 'closed',
        problem: 'MySQL instrumentation이 만드는 span은 전부 이름이 `CALL`로 동일하게 기록됐다. Stored Procedure를 호출하는 방식이다 보니 실제로는 `rcprod.GetProviderCampaign` 같은 프로시저가 실행되는데, 트레이스에서는 그 구분이 사라져서 어떤 프로시저가 느린지 알 수 없었고 DB 병목을 찾으려면 로그를 직접 뒤져야 했다.',
        solution: 'mysql instrumentation이 span 생성 직후에 `db.statement` 속성을 채운다는 걸 확인하고, `SpanProcessor`의 `onStart`에서 `setImmediate`로 한 틱 뒤에 그 값을 다시 읽도록 만들었다. `db.statement`가 `CALL `로 시작하면 정규식으로 프로시저명만 뽑아내 `span.updateName()`으로 span 이름을 실제 프로시저명(예: `rcprod.GetProviderCampaign`)으로 바꿔치기했다. 이후 Grafana에서 프로시저 단위로 응답 시간을 바로 확인할 수 있게 됐다.',
      },
      {
        title: 'ECS 오토스케일링 — Prometheus 수집 대상 자동 갱신',
        status: 'closed',
        problem: 'ECS 오토스케일링으로 인스턴스가 늘거나 줄면 그때마다 인스턴스 주소가 바뀌는데, Prometheus 수집 대상은 고정된 설정 파일에 박혀 있었다. 오토스케일이 일어날 때마다 이전 주소로는 수집이 끊기고 새로 뜬 인스턴스는 수집 대상에 아예 없는 상태가 됐다.',
        solution: 'ECS 클러스터의 실행 중인 인스턴스 목록을 AWS API(boto3)로 3시간 주기로 조회해서 Prometheus 수집 설정을 자동으로 재생성하는 스크립트를 만들었다. 오토스케일링으로 인스턴스 주소가 바뀌어도 수동 개입 없이 최신 상태로 반영된다.',
        relatedNodes: ['ECS', 'Prom'],
      },
      {
        title: '멀티 워커 환경 메트릭 과소 집계 — Prometheus 멀티프로세스 모드로 전환',
        status: 'closed',
        problem: 'FastAPI 커스텀 지표 수집 서버가 여러 워커 프로세스로 떠 있는데, 메트릭 객체를 각 프로세스 메모리에만 등록하면 워커마다 카운터 값이 따로 쌓인다. Prometheus가 `/metrics`를 스크레이프할 때는 그 순간 요청을 받은 워커 하나의 값만 보게 되니, 실제 전체 요청 수보다 훨씬 적게 집계됐다.',
        solution: '`prometheus_client`의 멀티프로세스 모드를 적용했다. Counter/Histogram은 `registry=None`으로 만들어서 각 워커가 자기 프로세스 전용 파일에 값을 기록하게 하고, Gauge는 `multiprocess_mode="livesum"`으로 살아있는 프로세스 값만 합산하도록 설정했다. `/metrics` 엔드포인트에서는 `CollectorRegistry()`에 `multiprocess.MultiProcessCollector`를 붙여서, 어떤 워커가 스크레이프 요청을 받든 모든 워커의 파일을 읽어 합산한 값을 반환하도록 만들었다.',
        relatedNodes: ['MEH', 'Prom'],
      },
    ],
    architecture: `graph TD
  API["API 서버 (Node.js)"]
  API -->|gRPC OTLP| Collector["OTel Collector"]
  API -->|HTTP POST 커스텀 지표| MEH["커스텀 지표 수집 서버 (FastAPI / ECS)"]
  Collector -->|trace| Tempo["Grafana Tempo"]
  Collector -->|span metrics| Prom["Prometheus"]
  Tempo -->|metrics_generator remote_write| Prom
  MEH -->|multiprocess registry| Prom
  Prom -->|메트릭 쿼리| Grafana["Grafana"]
  Tempo -->|트레이스 조회| Grafana
  subgraph MonitoringServer["모니터링 서버"]
    ECS["boto3 ECS 디스커버리 (3h 주기)"]
    ECS -->|scrape config 재생성| Prom
    Collector
    Tempo
    Prom
    Grafana
  end`,
  },
  {
    id: 7,
    label: 'Dev',
    name: '자사 통합 서버 모듈 Restify → Fastify 마이그레이션',
    summary: '14개 이상 API 서버가 공유하는 내부 npm 모듈을 서비스 중단 없이 프레임워크 전환',
    start: '2025.10',
    end: '2026.01',
    description: [
      'Fastify의 req/res 객체를 Restify 호환 인터페이스로 래핑해 14개 이상 하위 서버의 코드 변경 없이 전환',
      '빈 JSON 바디를 파싱 오류 없이 빈 객체로 처리하는 커스텀 Content-Type 파서, 멀티파트 폼 필드 평탄화 처리 구현으로 Restify/Fastify 동작 차이 흡수',
      '권한 바이패스 경로 매칭을 정규식 기반으로 직접 구현 — Fastify 기본 패턴 매칭이 Restify와 달라 발생한 인가 오동작 해결',
      '프로덕션 로그를 확률 기반 샘플링으로 전송하되 5xx 에러는 100% 기록해 DataDog 비용 절감과 이상 감지 균형 확보',
      'v2.x(Restify)·v3.x(Fastify) 병행 배포로 점진적 마이그레이션 지원, v3.0.0 이후 18개월 이상 하위 호환 API 무변경 유지',
      'Accept-Version 헤더 기반 버전 라우팅 직접 구현 — Restify 내장 기능과 달리 Fastify는 미지원이라 버전 제약 라우트 등록 및 최신 버전 자동 폴백 로직을 직접 개발',
    ],
    stack: ['Fastify', 'Node.js', 'TypeScript', 'npm (내부 패키지)', 'DataDog APM'],
    metrics: [
      { label: '코드 변경 없이 전환한 서버', value: '14개 이상' },
      { label: '하위 호환 API 유지', value: '6개월 이상' },
      { label: '마이그레이션 방식', value: '무중단 점진적 전환' },
    ],
    issues: [
      {
        title: 'req/res 호환 레이어 — Fastify에 Restify 인터페이스 주입',
        status: 'closed',
        problem: 'Fastify의 req/res 인터페이스는 Restify와 완전히 달랐다. 14개 이상의 하위 서버가 `req.header()`, `req.path()`, `req.clientIP`, `res.setStatus()`, `res.setHeader()` 같은 Restify 스타일 접근 방식을 그대로 쓰고 있었는데, Fastify의 `FastifyRequest`/`FastifyReply`에는 이런 속성·메서드가 아예 없었다. 공유 모듈 특성상 하위 서버 코드를 하나하나 고치는 건 현실적으로 불가능했다.',
        solution: '`onRequest` 훅에서 `Object.defineProperties`로 Fastify의 `req` 객체에 `clientIP`, `header()`, `path()`, `authorization` 같은 Restify 속성을 런타임에 주입했다. 일반 할당 대신 `defineProperties`를 쓴 건 Fastify 내부 속성과 충돌을 피하고, `enumerable: false`로 지정해서 로그에 직렬화될 때 주입한 속성이 노출되지 않게 하기 위해서였다.\n\n`res` 쪽은 좀 더 까다로웠다. Restify는 `res.setStatus(code)`를 부르고 핸들러가 return하면 알아서 응답이 나가는데, Fastify는 `reply.status().send()`를 순서대로 호출해야 하는 2단계 구조였다. 그래서 `setStatus`가 호출되면 상태 코드를 클로저 변수에만 저장해두고, 핸들러가 return한 뒤에 `reply.status(_statusCode).send(result)`로 한 번에 처리하는 얇은 래퍼를 만들었다.\n\n마지막으로 타입 문제가 남았다. `FastifyRequest`에는 애초에 `clientIP`나 `header()` 같은 필드가 없어서 하위 서버 코드가 컴파일조차 안 됐다. `Omit<FastifyRequest, keyof R> & R` 형태로 겹치는 필드는 지우고 그 자리에 하위 서버가 원하는 타입을 끼워 넣는 타입 오버레이를 만들어서, 런타임 주입과 타입 정의가 1:1로 맞물리게 했다.',
        relatedNodes: ['Module', 'Init'],
        impact: '14개 이상 하위 서버 코드 무변경 전환',
      },
      {
        title: '빈 JSON 바디 파싱 — Restify는 빈 객체 반환, Fastify는 400 에러',
        status: 'closed',
        problem: 'Fastify의 기본 JSON 파서는 `Content-Type: application/json`인데 바디가 비어 있으면 400 에러를 던진다. Restify는 이런 요청도 `req.body`를 `{}`로 채워줬는데, 하위 서버들은 전부 이 Restify 동작을 전제로 만들어져 있어서 바디 없는 요청 전체에서 오류가 났다.',
        solution: '`addContentTypeParser(\'application/json\', { parseAs: \'string\' }, ...)`로 커스텀 파서를 직접 등록했다. 바디를 문자열로 받아서 `trim()` 후 길이가 0이면 `{}`를, 내용이 있으면 `JSON.parse()` 결과를 반환하도록 만들었다. `Buffer`가 아니라 `string`으로 받은 이유는, 공백만 있는 바디(`" "`)는 `Buffer` 기준 길이가 0이 아니라서 그냥 `JSON.parse`하면 에러가 나는 엣지 케이스를 `trim()`으로 걸러내기 위해서였다. JSON 형식이 아닌 바디는 원래대로 400을 반환하되, `SyntaxError`엔 기본 `statusCode`가 없어서 500으로 새는 걸 막으려고 직접 `err.statusCode = 400`을 채워줬다.',
        relatedNodes: ['Module', 'Init'],
      },
      {
        title: '멀티파트 필드 구조 차이 — Fastify·Restify 응답 형태 불일치',
        status: 'closed',
        problem: '`@fastify/multipart`를 `attachFieldsToBody: true`로 등록하면 폼 필드가 `req.body`에 자동으로 붙긴 하는데, `{ username: { value: \'john\', fieldname: ..., mimetype: ..., type: \'field\' } }`처럼 메타데이터를 포함한 중첩 객체 형태였다. Restify는 `req.body.username`이 그냥 `\'john\'` 문자열이었기 때문에, 하위 서버에서 폼 데이터에 접근하는 코드가 전부 깨졌다.',
        solution: '`preHandler` 훅에서 `req.body`를 순회하면서 `.value` 속성이 있는 필드만 값을 뽑아 평탄화하고, 파일 필드(`.file` 스트림을 가진 객체)는 원래 구조 그대로 남겨뒀다. 이 훅을 `preHandler` 시점에 둔 이유는 `preValidation`(JSON Schema 검증)보다 뒤에 있어야 검증이 평탄화된 값 기준으로 동작하기 때문이다 — 다만 멀티파트 요청에 body 스키마 검증을 같이 쓰면 이 순서 특성상 평탄화 전 구조가 검증된다는 제약은 남아있다.',
        relatedNodes: ['Module', 'Init'],
      },
      {
        title: '인가 바이패스 경로 매칭 — 프레임워크 간 동작 차이로 보안 허점 발생',
        status: 'closed',
        problem: 'Restify는 byPass 경로에 와일드카드(`/public/*`)를 지원하는 자체 매칭 유틸리티가 있었는데, Fastify의 라우팅용 패턴 매칭은 등록 시점의 정적 라우트에만 쓸 수 있어서 `onRequest` 훅에서 임의 경로를 동적으로 검사하는 용도로는 못 썼다. 그래서 단순 `req.url.startsWith(\'/public\')`처럼 문자열 비교로 대체했는데, 이러면 `/publicfoo`처럼 의도하지 않은 경로까지 byPass되는 보안 허점이 생겼다.',
        solution: '정규식 기반 매칭을 직접 구현했다. `/public/*`처럼 와일드카드가 붙은 설정은 `/\\*+`와 남은 `*`를 제거해 `/public`으로 만들고, 그 뒤에 단어 경계 앵커(`\\b`)를 붙인 정규식(`(?:\\/public)\\b`)으로 변환했다. `\\b` 덕분에 `/health`는 `/health`와 `/health/sub`엔 매칭되지만 `/healthcheck`엔 매칭되지 않는다. `/*`(전체 허용)는 정규식으로 변환하면 빈 패턴이 되어버려서 별도로 먼저 처리했고, `search(regex) === 0` 조건으로 경로 시작부터 매칭되는 경우만 인정했다. 메서드 키도 Restify 표기(`del`, `opts`)에 맞춰 `DELETE`→`DEL`, `OPTIONS`→`OPTS`로 정규화했다.\n\n다만 `\\b`도 완벽하진 않다. `/my-api`처럼 하이픈으로 끝나는 경로를 등록하면 `/my-api-v2`도 인덱스 0에서 매칭돼버려서 의도치 않게 byPass될 수 있다는 한계는 문서로 남겨뒀다.',
        relatedNodes: ['Module', 'Auth'],
      },
      {
        title: '플러그인 등록 순서 고정 — 순서 오류 시 전 서버 장애',
        status: 'closed',
        problem: 'Fastify는 플러그인을 등록한 순서가 곧 실행 순서다. 바디 파싱 플러그인보다 인가 플러그인을 먼저 등록하면 바디가 파싱되기 전에 인가 체크가 도는 식으로 꼬였고, `await` 없이 `fastify.register()`를 연달아 호출하면 앞 플러그인 초기화가 끝나기도 전에 다음 플러그인이 실행되는 문제도 있었다. 14개 서버가 공유하는 모듈이라 한 번 순서가 틀리면 그 순서를 쓰는 모든 서버가 영향을 받았다.',
        solution: '바디 파싱 → requestPipeline(req 데코레이션) → CORS → Authorization → 라우트 등록 순서를 코드에 명시적으로 고정하고, 모든 `register()` 호출을 `await`으로 순차 대기하도록 통일했다. 에러 핸들러는 Fastify가 마지막에 등록된 것 하나만 쓰기 때문에(`setErrorHandler`를 두 번 부르면 첫 번째가 조용히 무시된다), 초기화 로직 안에서 정확히 한 번만 등록되도록 만들고 이 순서를 코드 리뷰 필수 항목으로 문서화했다.',
      },
      {
        title: '확률 기반 로그 샘플링 — 5xx는 100%, 일반 요청은 비율 조정',
        status: 'closed',
        problem: '운영 환경에서 모든 요청을 로그로 남기면 DataDog 비용이 과도하게 발생했다. 그렇다고 전체 로그 비율을 낮추면 장애 신호인 5xx 에러까지 같이 샘플링돼서 누락될 수 있었고, 로드밸런서가 초당 수십 번씩 때리는 `/now` 헬스체크 로그가 그대로 쌓이는 것도 낭비였다.',
        solution: '샘플링 확률을 0~1000 사이의 정수로 다뤘다(`Math.random() * 1000`과 비교). 0.0~1.0 부동소수로 비교하는 것보다 부동소수점 오차에 덜 민감하기 때문이다. 경로별 비율은 `pathLogRate` 설정 키를 사전순 역정렬한 뒤 `startsWith`로 매칭해서, `/api`보다 `/api/heavy`처럼 더 구체적인 경로가 먼저 걸리는 최장 접두사 매칭을 흉내 냈다. 5xx 응답은 이 경로별 비율을 무시하고 무조건 1000(100%)을 넘겨서 장애 신호가 샘플링으로 누락되지 않게 했고, `/now` 헬스체크는 아예 `_noAfter` 플래그로 `onResponse` 훅 자체를 건너뛰게 했다. PROD 환경에서는 샘플링을 통과한 로그라도 요청/응답 바디를 1000자로 잘라서 기록했다.',
        relatedNodes: ['Module', 'DD'],
      },
      {
        title: 'v2.x(Restify) + v3.x(Fastify) 병행 배포로 점진적 전환',
        status: 'closed',
        problem: '14개 이상 하위 서버를 한 번에 전환하는 건 불가능했다. 각 서버가 준비되는 시점이 다 달랐기 때문에, 기존 v2.x(Restify)를 계속 유지보수하면서 v3.x(Fastify)를 동시에 배포할 방법이 필요했다.',
        solution: 'npm dist-tag로 두 버전을 병행 배포했다. 새 버전은 `latest` 태그로 배포하고 기존 v2.x는 별도 태그로 유지해서, 하위 서버가 준비됐을 때 개별적으로 버전을 올릴 수 있게 했다. v2.x 라인에도 필요하면 핫픽스를 계속 배포했고, 6개월 이상 하위 호환 API를 유지해 각 서버가 전환 시점을 자유롭게 조율하게 했다.',
        relatedNodes: ['Module', 'V2'],
        impact: '14개 이상 서버 무중단 점진 전환',
      },
      {
        title: 'API 문서 통합 — 운영 환경 스펙 노출 방지',
        status: 'closed',
        problem: '하위 서버마다 `@fastify/swagger`를 직접 등록하고 보안 스킴, 공통 에러/성공 응답 스키마를 각자 정의해야 했다. 게다가 운영(PROD) 환경에 실수로 Swagger 플러그인을 활성화한 채로 배포하면 API 스펙 전체가 외부에 그대로 노출되는 위험이 있었다.',
        solution: '`bearerAuth`/`basicAuth` 보안 스킴과 공통 `Error`/`Success` 응답 스키마를 `swaggerDefaults`로 모듈에 내장해서, 하위 서버는 `openapi.components`에 스프레드하기만 하면 되게 했다. 라우트 등록 직전에 `onBeforeRoute` 훅을 열어줘서 원하는 서버만 그 시점에 Swagger를 등록할 수 있게 했고, 서버가 뜰 때 `__mode === \'PROD\'`인데 Fastify 인스턴스에 `.swagger` 메서드가 감지되면 콘솔에 `[SECURITY]` 경고를 출력하도록 만들어서 실수로 운영 환경에 문서가 노출되는 걸 눈에 띄게 했다.',
      },
      {
        title: 'Accept-Version 헤더 버전 라우팅 — Restify 자동화 기능 Fastify에 직접 구현',
        status: 'closed',
        problem: 'Restify는 `Accept-Version` 헤더가 없으면 최신 버전 핸들러로 자동 폴백하는 걸 프레임워크 차원에서 지원했다. Fastify 5도 `constraints: { version }`으로 버전 매칭 자체는 지원했지만, `Accept-Version` 헤더가 없는 요청은 버전 제약이 걸린 라우트에 아예 매칭되지 않아 404가 났다. 하위 서버들은 전부 "헤더 없으면 최신 버전"이라는 Restify 동작을 전제로 만들어져 있었다.',
        solution: 'API 파일을 스캔하면서 각 버전 핸들러를 `constraints: { version }`으로 등록하는 동시에, 등록된 버전들을 세그먼트 단위로 직접 비교해서 최고 버전을 추적했다(semver 라이브러리 대신 `major.minor.patch` 숫자만 비교하면 충분해서 직접 구현했다). 모든 버전 라우트를 등록한 뒤, 추적해둔 최고 버전의 핸들러를 이번엔 `constraints` 없이 같은 경로에 한 번 더 등록해서, `Accept-Version` 헤더가 없는 요청이 이 무제약 라우트로 떨어지며 최신 버전 핸들러가 실행되게 만들었다. 버전 지정 없이(`\'*\'`) 만들어진 API 파일이 이미 있는 경로는 그 자체가 폴백 역할을 하므로 중복 등록을 막는 예외 처리도 넣었다.\n\n다만 `req.version()`은 아직 실제 매칭된 버전을 추적하지 못하고 항상 `\'1.0.0\'`을 반환하는 한계가 남아있어, 로깅에서 정확한 버전을 보려면 `routeOptions.constraints.version`을 직접 읽도록 개선이 필요하다는 걸 문서로 남겨뒀다.',
      },
      {
        title: 'JSON Schema(Ajv) 검증 도입 검토 — 벤치마크 후 미채택',
        status: 'closed',
        problem: 'Fastify로 전환하면서 Ajv 기반 JSON Schema 검증(`__schema`)을 새로 만들어 기존 수동 검증(`__apiParams`)을 대체할지 검토했다. Schema 방식은 검증 규칙을 선언적으로 정의할 수 있고 Swagger 문서까지 자동으로 생성해주는 장점이 있었다.',
        solution: '실제 API 엔드포인트에 두 방식을 각각 적용해 응답 속도를 비교했다. Ajv는 `allErrors: true`로 모든 필드를 끝까지 검증하고 상세한 에러 객체를 만드느라 5~7단계의 내부 호출 스택을 거쳤고, 수동 검증은 첫 에러에서 바로 멈추는 Fail-Fast 방식으로 호출 스택이 2~3단계에 그쳤다. 측정 결과 수동 검증 쪽이 더 빨랐고, 응답 속도가 중요한 서비스 특성상 Schema 방식을 채택하지 않고 기존 `__apiParams` 방식을 그대로 유지하기로 결정했다. Ajv의 JIT 컴파일 최적화가 개선되거나 API 문서 자동화가 필수가 되는 시점에 재검토하기로 하고 판단 근거를 문서로 남겼다.',
      },
    ],
    architecture: `graph TD
  subgraph Consumers["하위 API 서버 (14개+)"]
    S1["API 서버 A"]
    S2["API 서버 B"]
    S3["API 서버 C 외 11개+"]
  end
  S1 & S2 & S3 -->|npm install| Module["공유 서버 모듈 v3.x"]
  subgraph Module
    Init["initialize.ts (Fastify 셋업)"]
    Pipeline["requestPipeline (req/res 데코레이션)"]
    Auth["authorization (와일드카드 RBAC)"]
    Err["errorHandler (표준 에러 포맷)"]
  end
  Module -.->|레거시 호환| V2["v2.x (Restify, 점진적 전환)"]
  Module -->|APM 트레이싱| DD["DataDog"]`,
  },
  {
    id: 8,
    label: 'Dev',
    name: 'Redis 오픈키 기반 인앱/아웃브라우저 적립 API',
    summary: '단회성 Redis 토큰으로 인앱·아웃브라우저 적립 흐름을 통합한 API 설계',
    start: '2025.03',
    description: [
      'Redis에 10분 유효 기간을 둔 단회용 적립 토큰을 발급하고 조회·삭제를 원자 연산으로 처리해 단회 소비 보장 — 재사용·재전송 공격 원천 차단',
      '인앱(token 인증)과 아웃브라우저(무인증) 두 가지 흐름을 동일한 단회용 토큰 인터페이스로 통일해 아웃브라우저에서도 적립가능한 URL과 정크 URL을 구분',
      'Redis 분산 락으로 동시 요청 이중 적립 방지 — 유효 기간을 설정해 프로세스 크래시 시에도 락 자동 해제',
      '전략+팩토리 패턴으로 20개 이상 리워드 feature를 플러그인 구조로 확장 가능하게 설계',
      '적립 실패 시 롤백 메커니즘으로 데이터 정합성 보장',
    ],
    stack: ['Fastify', 'Node.js', 'TypeScript', 'AWS Aurora', 'Redis', 'JWT'],
    metrics: [
      { label: '지원 feature', value: '20개 이상' },
    ],
    issues: [
      {
        title: '단회용 토큰 소비 — 조회·삭제 분리 시 경쟁 조건',
        status: 'closed',
        problem: '아웃브라우저 흐름에서는 URL에 토큰을 그대로 심어서 전달하는데, 토큰을 삭제하지 않으면 그 URL이 계속 유효한 상태로 남아 재사용될 수 있는 구조였다. 단순히 "토큰이 있는지 확인하고 나서 삭제"하는 두 단계로 처리하면, 거의 동시에 들어온 요청 두 개가 모두 확인을 통과한 뒤 둘 다 적립으로 이어질 수 있어서 일회성 보장이 깨지는 문제가 있었다.',
        solution: '조회와 삭제를 단일 원자 연산으로 묶어서(openKey) URL을 여는 순간 토큰이 즉시 삭제되도록 만들었다. 첫 번째 요청만 토큰 값을 가져가고 즉시 삭제되므로, 동시에 요청이 들어와도 두 번째는 거부되어 URL의 일회성이 보장된다.',
        relatedNodes: ['R1', 'Redis'],
        impact: 'URL 재사용·동시 요청 상황에서도 단 한 번만 유효하도록 보장',
      },
      {
        title: '인앱·아웃브라우저 흐름 통합 — 단회용 토큰을 공통 브릿지로',
        status: 'closed',
        problem: '인앱과 아웃브라우저 노출은 광고 단가 조건에 따라 자유롭게 전환될 수 있어야 했다. 그런데 인앱은 JWT 인증 사용자가 직접 세션을 열고 아웃브라우저는 외부 서버가 토큰을 발급해 클라이언트에 전달하는 방식이라 구조가 완전히 달랐고, 두 경로를 각각 다른 로직으로 만들면 노출 방식이 바뀔 때마다 호환이 안 되는 문제가 생길 수 있었다.',
        solution: '토큰 안에 사용자·앱·경로 유형 정보를 담아서 발급 방식과 무관하게 적립 시점에는 동일한 데이터를 참조하도록 처음부터 통합 설계했다. 인증은 세션 발급 시에만 처리하고, 실제 적립은 토큰에 담긴 정보만 보고 수행하도록 만들어서 인앱과 아웃브라우저 어느 쪽으로 노출되든 같은 로직으로 처리된다.',
        relatedNodes: ['S1', 'S2', 'Redis'],
      },
      {
        title: '아웃브라우저 트랜잭션 상태 머신 — 중간 단계 타임아웃·재시도 처리',
        status: 'closed',
        problem: '외부 서버가 세션을 열고, 클라이언트가 검증하고, 서버가 적립하는 3단계 흐름을 설계하면서, 중간에 타임아웃이 나거나 같은 요청이 재시도로 다시 들어오면 트랜잭션 상태가 꼬일 수 있다는 걸 미리 예상했다.',
        solution: '트랜잭션을 대기 상태로 시작해서 적립이 완료되면 완료 상태로 전환하도록 만들었다. 생성 시 24시간 만료 시각을 설정해 만료된 트랜잭션은 적립 요청을 거부하고, 동일한 트랜잭션 ID로 재시도가 들어와도 기존 활성 트랜잭션을 재활용하도록 해서 중복 생성을 막았다.',
        relatedNodes: ['T', 'DB'],
      },
      {
        title: '전략+팩토리 패턴 — 적립 피처를 독립 구현체로 분리',
        status: 'closed',
        problem: '정확히 몇 개가 될지는 몰랐지만, 리워드 피처가 계속 늘어날 거라는 건 예상할 수 있었다. 피처마다 검증·지급·롤백 로직이 다른데, 이걸 조건 분기로 처리하면 기능이 추가될 때마다 기존 코드를 건드려야 하는 구조가 될 게 뻔했다.',
        solution: '공통 인터페이스를 정의하고 피처마다 독립된 구현체(class)로 분리했다. 피처 이름으로 적절한 구현체를 선택하는 팩토리를 통해 처리하도록 만들어서, 새 피처가 추가돼도 구현체와 설정만 추가하면 되고 기존 코드는 건드릴 필요가 없게 했다.',
        impact: '20개 이상 피처를 기존 코드 변경 없이 확장',
      },
      {
        title: '단계별 롤백 — 실패 지점에 따라 역전 범위를 다르게',
        status: 'closed',
        problem: '적립 처리를 여러 단계로 나누어 설계하면서, 어느 단계에서 실패하느냐에 따라 롤백해야 할 범위가 다르다는 걸 미리 고려해야 했다. log만 기록된 경우, 비즈니스 데이터가 변경된 경우, 상태까지 바뀐 경우를 구분하지 않고 일괄적으로 롤백하면 과잉 롤백이나 누락이 생길 수 있는 구조였다.',
        solution: '처리 단계를 순서대로 추적하고, 실패 시 그 시점까지 완료된 단계만 선택적으로 되돌리도록 만들었다. 이 덕분에 불필요한 롤백으로 인한 Redis key 파편화나 DB 메모리 누수도 함께 막을 수 있었다.',
      },
    ],
    architecture: `graph TD
  subgraph InApp["인앱 흐름"]
    A1["네이티브 앱"] -->|JWT 인증| S1["세션 발급"]
    S1 -->|openKey 10분 TTL| Redis["Redis"]
    A1 -->|openKey| R1["적립 요청"]
    R1 -->|GET/DEL 원자 소비| Redis
    R1 -->|분산 락 획득| Redis
    R1 --> DB[("Aurora/MySQL")]
  end
  subgraph OutBrowser["아웃브라우저 흐름"]
    GS["외부 서버"] -->|txID| S2["트랜잭션 세션 발급"]
    S2 -->|openKey 10분 TTL| Redis
    GC["클라이언트"] -->|openKey| V["세션 검증"]
    V -->|GET/DEL 원자 소비| Redis
    GS -->|txID + 적립 금액| T["트랜잭션 적립 요청"]
    T -->|PENDING → COMPLETED| DB
  end`,
  },
  {
    id: 9,
    label: 'Dev',
    name: '리워드 컨텐츠 플랫폼 서버 고도화',
    summary: 'Fastify 5 기반 리워드 컨텐츠 API 서버 성능·옵저버빌리티 개선',
    start: '2025.01',
    description: [
      '11개 파트너사 컨텐츠를 3계층 필터링으로 할당하고, 클릭 기록과 포스트백 검증을 독립된 파이프라인으로 분리해 할당-클릭-전환 흐름을 단계별로 명확하게 구성',
      '컨텐츠 batch cron job의 크롤링 실패시 슬렉 알림을 받아서 해당 컨텐츠의 크롤링만 재시도하는 시스템 구축',
      'AWS Valkey 릴레이 캐싱으로 콘텐츠 목록·노출 이력·일일 한도 DB 조회를 인메모리로 대체 — 트래픽 집중 시 DB 부하 절감',
      '전환 단계 분산 락으로 동시 포스트백 이중 적립 방지, 일일 한도·쿨타임·중복 검증 파이프라인으로 데이터 정합성 보장',
      'OpenTelemetry 기반 분산 트레이싱 도입 — Fastify 5·Redis 클러스터 공식 미지원 환경을 직접 패치해 전 구간 추적 범위 확보',
      '고빈도 경로 trace 샘플링 최소화 + Pyroscope 연속 프로파일링으로 저장 비용 절감과 코드 레벨 병목 시각화 동시 확보',
    ],
    stack: ['Fastify', 'Node.js', 'TypeScript', 'AWS Aurora', 'AWS Valkey', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Pyroscope'],
    metrics: [
      { label: '안정 트레픽', value: '안정적인 초당 300 ~ 1000건의 트레픽처리' },
    ],
    issues: [
      {
        title: 'AWS Valkey 릴레이 캐싱 — 콘텐츠 목록·노출 이력 DB 조회 인메모리로 대체',
        status: 'closed',
        problem: '콘텐츠 목록 API가 요청마다 DB에서 전체 목록을 조회하는 구조였다. 트래픽이 몰리면 DB 부하가 올라가서 처음에는 Valkey(Redis) 캐싱만 붙여서 대응했는데, 그것만으로는 부족해서 트래픽이 몰릴 때마다 서버가 계속 죽어나가는 장애가 반복됐다.',
        solution: 'Valkey 캐싱에 더해 서버 프로세스 메모리에도 캐시를 한 겹 더 두는 방식으로 바꿨다. 콘텐츠 목록과 노출 이력을 각각 적절한 유효 기간으로 인메모리에 캐시해서, 매 요청마다 Valkey까지 갈 필요 없이 먼저 인메모리에서 응답하도록 만들었다. 이 조합을 적용한 뒤로 장애가 해결됐고, 상위 키 패턴으로 연관 캐시를 일괄 무효화하는 것도 가능해졌다.',
        relatedNodes: ['API', 'Valkey'],
        impact: 'Valkey 단독 캐싱으로 반복되던 서버 장애를 인메모리+Valkey 이중 캐싱으로 해결',
      },
      {
        title: 'Pyroscope 연속 프로파일링 — 원본 소스 기준 코드 레벨 병목 시각화',
        status: 'closed',
        problem: '옵저버빌리티를 강화하려는 목적으로 프로파일링 도입을 검토했다. 기존에는 요청 단위 트레이싱만 있어서 P99가 높은 구간은 보여도 실제 코드의 어느 지점이 병목인지는 알 수 없었고, 범위가 넓어 코드 레벨까지 좁혀서 보기 어려웠다.',
        solution: 'OpenTelemetry 기반 Continuous Profiling을 붙이고, TypeScript Source Map을 업로드해서 Pyroscope의 Flame Graph를 컴파일된 dist/**/.js가 아니라 원본 src/**/.ts 기준으로 볼 수 있게 만들었다. Grafana에서 응답 시간 지표와 프로파일을 함께 보면서 코드 레벨 병목을 직접 찾을 수 있는 대시보드를 구성했다.',
        relatedNodes: ['Pyroscope', 'Grafana'],
        impact: '원본 소스 기준 플레임 그래프로 코드 레벨 병목 특정',
      },
      {
        title: '메트릭 카운터 배치 플러시 설계 — 동기 전송으로 인한 API 응답 지연 예방',
        status: 'closed',
        problem: '적립 관련 지표를 쌓아야 할 필요가 있어서 메트릭 카운터 전송 기능을 처음 만드는 단계였다. 요청마다 메트릭 서버로 카운터를 동기 전송하는 방식으로 만들면, 메트릭 서버가 잠깐이라도 느려질 때 적립 API 응답까지 함께 느려질 수 있고 전송 실패 시 카운터가 그대로 유실될 수 있는 구조라는 걸 미리 알고 있었다.',
        solution: '처음부터 인메모리 버퍼에 카운터를 누적해뒀다가 주기적으로 일괄 전송하는 방식으로 설계했다. 전송에 실패한 항목은 재시도 큐에 넣어 다음 전송 때 합산 처리하도록 해서, 전송 중에 들어오는 카운터도 손실 없이 처리되게 만들었다.',
        relatedNodes: ['API', 'Prom'],
      },
    ],
    architecture: `graph TD
  Clients["클라이언트 (SDK/Web)"] -->|HTTPS| API["콘텐츠 API 서버 (Fastify 5)"]
  API -->|Write| Master[("Aurora Master")]
  API -->|Read| Replica[("Aurora Replica")]
  API -->|캐시 조회·갱신| Valkey["AWS Valkey"]
  API -->|콘텐츠 제공| Providers["11개 콘텐츠 파트너"]
  subgraph Observability["옵저버빌리티"]
    OTEL["OpenTelemetry Collector"]
    Tempo["Grafana Tempo"]
    Prom["Prometheus"]
    Grafana["Grafana 대시보드"]
    Pyroscope["Pyroscope"]
    OTEL --> Tempo
    OTEL --> Prom
    Prom --> Grafana
  end
  API -->|트레이스 전송| OTEL
  API -->|CPU 프로파일| Pyroscope
  Pyroscope --> Grafana
  GHA["GitHub Actions"] -->|CI/CD| EB["AWS EB"]`,
  },
  {
    id: 10,
    label: 'WebApp',
    name: '파트너사 전용 포인트 적립 플랫폼',
    summary: '네이티브 앱 WebView 기반 리워드 시스템 풀스택 개발',
    start: '2024.06',
    description: [
      '출석체크·룰렛·뉴스·콘텐츠 적립 등 다양한 리워드 콘텐츠를 포함한 모바일 WebView 플랫폼 구축',
      'Fastify 기반 API 서버 설계 — 37개 도메인, 200개 이상 엔드포인트, 20개 이상 광고 파트너 네트워크 연동',
      'WebView ↔ 네이티브 SDK 브릿지 설계로 Android·iOS 앱과 웹 기능 연동',
      'Accept-Version 헤더 기반 API 버전 관리로 SDK·클라이언트 하위 호환성 유지하며 지속적 기능 추가',
      'DataDog APM 도입 및 경로별 샘플링률 조정으로 분산 트레이싱 비용 최적화',
    ],
    stack: ['Next.js', 'TypeScript', 'Fastify', 'Aurora/MySQL', 'Redis', 'DataDog APM', 'AWS EB'],
    metrics: [
      { label: '광고 파트너 네트워크', value: '20개 이상' },
    ],
    issues: [
      {
        title: 'Accept-Version 헤더 기반 버전 라우팅 — SDK 구버전 하위 호환 유지',
        status: 'closed',
        problem: '기존 SDK에 영향을 주면 안 되는 신규 기능을 추가해야 했다. API 스펙을 그대로 바꾸면 구버전 SDK를 쓰는 앱들이 영향을 받을 수 있는데, 앱스토어 심사에 수 주가 걸려서 SDK 강제 업데이트로 문제를 해결하는 것도 사실상 불가능했다. 신규 기능과 기존 동작을 어떤 기준으로 분기할지가 관건이었다.',
        solution: 'URL에 버전을 넣는 대신 Accept-Version 헤더로 요청을 분리해서 버전별 핸들러를 독립 파일로 관리하는 방식을 택했다. 신규 기능은 새 버전 핸들러에만 넣고 기존 핸들러는 그대로 둬서, 구버전 SDK는 기존 동작을 유지하면서 신규 기능을 추가할 수 있었다.',
        relatedNodes: ['API'],
      },
      {
        title: 'WebView ↔ 네이티브 SDK 브릿지 추상화 — Android/iOS 분기 격리',
        status: 'closed',
        problem: 'Android와 iOS가 서로 다른 브릿지 방식을 쓰다 보니 웹 코드 곳곳에서 플랫폼을 직접 분기하고 있었다. SDK가 업데이트될 때마다 분기 코드가 흩어져 있는 여러 파일을 일일이 찾아 고쳐야 했고, 앞으로도 이 방식이 반복될 게 뻔해서 리팩토링이 필요하다고 판단했다.',
        solution: '플랫폼별 분기와 SDK 버전 감지를 단일 통합 레이어로 격리했다. 웹 컴포넌트는 플랫폼에 관계없이 동일한 인터페이스만 호출하면 되고, 플랫폼별 대응은 브릿지 레이어 한 곳에서만 처리하도록 만들어서 이후 SDK가 업데이트돼도 그 레이어만 고치면 되게 했다.',
        relatedNodes: ['App', 'Web'],
      },
      {
        title: '광고 클릭 중복 방지 — 동시 요청 레이스 컨디션 해소',
        status: 'closed',
        problem: '광고 클릭 요청이 짧은 시간에 연속으로 들어오면 중복 적립이 발생할 수 있는 구조였다. 클라이언트에서도 동시 클릭을 어느 정도 막아주긴 하겠지만, 클라이언트단 제어만 믿고 서버에서 아무런 방어를 하지 않으면 결국 뚫릴 수 있는 지점이라고 판단했다.',
        solution: 'DB 삽입 직전에 원자적 분산 락을 추가해서 첫 번째 요청만 처리를 이어가도록 만들었다. 클라이언트 동시성 제어와는 별개로 서버에서도 한 번 더 이중으로 막아서, 클라이언트 쪽 방어가 뚫리더라도 중복 적립으로 이어지지 않도록 했다. 처리 완료 후 락을 해제하고, 충돌한 두 번째 요청은 조용히 실패 처리한다.',
        relatedNodes: ['API', 'DB'],
      },
    ],
    architecture: `graph TD
  App["네이티브 앱 (iOS/Android)"] -->|WebView 임베드| Web["Next.js WebView"]
  App <-->|SDK 브릿지| Web
  Web -->|BFF API Routes| API["포인트 적립 API (Fastify)"]
  API -->|Read/Write| DB[("Aurora/MySQL")]
  API -->|세션·캐시| Redis["Redis"]
  API -->|포스트백 비동기| SQS["AWS SQS"]
  SQS -->|콜백 전달| Partners["20+ 광고 파트너"]
  GHA["GitHub Actions"] -->|CI/CD| EB["AWS EB"]
  API -->|APM 트레이싱| DD["DataDog"]`,
  },
]

export const education = [
  {
    school: '단국대학교 죽전캠퍼스',
    major: '국어국문학과',
    start: '2016.03',
    end: '2018.07',
    degree: '학사',
  },
]
