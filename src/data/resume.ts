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
      },
      {
        title: 'SSE 스트림 디바운스 배치 처리로 렌더링 성능 개선',
        status: 'closed',
        problem: 'Claude가 스트리밍으로 텍스트를 내려보낼 때 초당 수십~수백 개의 spec:run_chunk 이벤트가 날아왔다. 이벤트마다 setState를 하면 터미널 컴포넌트가 그만큼 다시 그려져서 UI가 버벅였다.',
        solution: '실행 단위별 텍스트 버퍼를 두고 50ms 이내에 쏟아지는 이벤트를 묶어서 한 번만 화면을 갱신하는 디바운스 방식을 적용했다. 초당 수백 개 이벤트가 약 20회 화면 갱신으로 줄어들어 버벅임이 사라졌다.',
      },
      {
        title: 'SQLite WAL(Write-Ahead-Logging) 파일 백업·롤백 시스템 구현',
        status: 'closed',
        problem: 'Claude가 파일을 수정하다 실패하거나 결과가 마음에 안 들면 되돌릴 방법이 없었다. 실행 단위로 어떤 파일을 건드렸는지 추적하지 않으면 git으로 일일이 찾아서 되돌려야 했다.',
        solution: '에이전트가 파일을 처음 건드릴 때 원본 내용을 실행 단위로 저장해두는 구조를 만들었다. 신규 파일은 없음으로 기록하고, 롤백 시 저장된 원본으로 덮어쓰거나 신규 파일이면 삭제한다. 에이전트 실행 중에도 안전하게 읽고 쓸 수 있는 WAL 모드를 적용했다.',
      },
      {
        title: 'MCP 서버 14개 도구로 멀티 레포 에이전트 조율 지원',
        status: 'closed',
        problem: '에이전트 여럿이 동시에 작업할 때 서로 어디까지 됐는지 알 방법이 없었다. 사람 승인이 필요한 지점에서 에이전트를 멈추게 하거나, 에이전트끼리 결과물을 주고받는 구조가 없었다.',
        solution: '에이전트 등록 → 마일스톤 보고 → 사람 검토 요청 → 단계 완료 순서로 워크플로를 정의하는 도구 14개를 MCP 서버에 구현했다. 검토 요청 도구가 승인·거부 상태를 반환하기 전까지 다음 단계로 넘어가지 않고, 결과물 공유 도구로 에이전트 간 산출물을 주고받는다.',
      },
      {
        title: '키워드 스코어링 기반 컨텍스트 파일 자동 선별 알고리즘',
        status: 'closed',
        problem: '코드베이스 전체를 컨텍스트에 넣으면 200K 문자 한도를 금방 넘는다. 그렇다고 파일을 일일이 지정하면 태스크마다 손이 가고 놓치는 파일도 생긴다.',
        solution: '태스크 설명에서 키워드를 추출해 파일명 완전 일치·접두사·포함 여부 순으로 관련도 점수를 매기는 선별 알고리즘을 구현했다. 항상 포함할 핵심 파일을 최우선으로 확보한 뒤 점수 순으로 한도까지 채우고, 대형 파일은 앞부분만 잘라 넣어 한도 초과를 막는다.',
      },
      {
        title: '첫 실행 최소 컨텍스트 전달로 토큰 최적화',
        status: 'closed',
        problem: '첫 태스크 실행도 전체 코드베이스 파일을 컨텍스트에 담아서 보냈다. 태스크와 무관한 파일까지 200K 문자를 채워 넣으니 첫 응답이 느리고 불필요한 토큰 소비가 많았다.',
        solution: '첫 실행 시 파일 내용 대신 디렉토리 구조만 전달하고, 에이전트가 필요한 파일을 직접 읽어가도록 방식을 바꿨다. 파일을 통째로 포함하는 이미지 첨부 모드와 구분해서 일반 실행에서는 시작 토큰을 약 50K 줄일 수 있었다.',
      },
      {
        title: '폴더 기반 구독 시스템 — 프로젝트별 계정·API 키 분리',
        status: 'closed',
        problem: '여러 Claude 계정을 쓰거나 프로젝트마다 다른 API 키로 에이전트를 연결하고 싶은데, 전역 설정 하나만 있어서 프로젝트별로 분리할 방법이 없었다.',
        solution: '구독과 API 키 두 가지 인증 방식을 프로젝트 단위로 설정할 수 있게 했다. 구독 모드는 계정 이메일 기반으로 디렉토리를 격리해 각 계정이 독립된 환경에서 동작하고, API 키 모드는 프로젝트별 키를 실행 시 환경 변수로 주입한다. 실행 시 프로젝트 설정을 먼저 보고 없으면 전역 설정으로 폴백된다.',
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
        problem: 'Node.js 16이하 버전에서 18버전으로 올리면서 OpenSSL 3가 레거시 알고리즘 정책을 바꿔서 기존 RS256 private.key(2047비트)로 서명한 JWT 검증이 실패했다. 운영 중인 서비스를 중단하지 않고 키를 교체해야 했다.',
        solution: 'private.new.key로 새 토큰을 서명하되 검증 시에는 기존 public.key로도 폴백 시도하는 듀얼키 구조를 적용했다. 기존 토큰을 가진 관리자도 재로그인 없이 사용하다가 자연스럽게 신규 키 토큰으로 전환됐다.',
      },
      {
        title: '클라이언트 전용 인가 구조 — API 엔드포인트 서버사이드 타입 검증 추가',
        status: 'closed',
        problem: '서비스가 달라서 정산이 다르다보니 어드민 계정을 분리해야할 요구사항이 있었는데, 타입 체크가 useAuth() Context에만 있고 API 엔드포인트에는 인가 미들웨어가 없었다. 쿠키를 직접 조작하거나 API를 직접 호출하면 타입 제한을 우회할 수 있었다.',
        solution: 'APIHandler 래퍼에 쿠키 토큰 검증 + adminType 체크를 추가했다. 정산 조회처럼 타입 1 전용인 엔드포인트는 서버에서 직접 토큰의 type 필드를 확인해 401로 차단한다.',
      },
      {
        title: '예외 처리 누락 — 중복 이메일 외 에러 발생 시 클라이언트 무한 로딩',
        status: 'closed',
        problem: '광고주 등록·수정 API가 중복 이메일 에러만 처리하고 나머지 에러는 아무 응답도 보내지 않았다. 예외적인 DB 오류가 발생하면 클라이언트는 응답을 기다리며 무한 로딩 상태에 빠졌다.',
        solution: '에러 종류에 상관없이 항상 응답을 반환하도록 예외 처리를 정비했다. 중복 이메일은 409, 그 외 에러는 500을 반환하고 에러 내용을 서버 로그에 기록해 디버깅에 쓸 수 있게 했다.',
      },
      {
        title: '광고 검수 상태 머신 — 허용되지 않은 상태 전이 차단',
        status: 'closed',
        problem: '광고 검수 상태 변경 API가 유효하지 않은 상태 값도 그대로 처리했다. 검수 대기→검수 완료/검수 반려 순서를 강제하지 않으면 데이터가 비정상 상태에 빠질 수 있었다.',
        solution: '검수 API에 현재 상태에서 허용된 다음 상태만 받도록 전이 규칙을 추가했다. 잘못된 전이는 400으로 거부하고, 프론트엔드에서도 현재 상태에 따라 버튼을 비활성화해 이중으로 막았다.',
      },
      {
        title: '정산 로직 외부 위임 — 어드민-리워드 데이터 일관성 확보',
        status: 'closed',
        problem: '어드민에서 직접 정산 DB를 조회하면 리워드 시스템과 정산 계산 로직이 두 곳에 중복되고 데이터 불일치가 생길 수 있었다.',
        solution: '정산 조회를 리워드 서버에 위임하는 프록시 방식으로 구현했다. 어드민은 화면 렌더링만 담당하고 정산관련 비지니스 로직은 프록시 서버에서 단일 소스로 관리하도록 해서 오차를 사전 차단했다.',
      },
      {
        title: 'S3 업로드 파일 타입·크기 미검증 — 서버사이드 검증 추가',
        status: 'closed',
        problem: '파일 업로드 API가 파일 타입이나 크기를 전혀 검사하지 않았다. S3 버킷이 공개 접근 설정이라 아무 파일이나 업로드되면 외부에서 바로 접근 가능했다.',
        solution: '업로드 전에 이미지 타입 여부와 크기(5MB 이하)를 서버에서 직접 검증하도록 추가했다. 파일명도 원본 대신 타임스탬프 기반으로 재생성해 경로 예측을 막았다.(물론 nginx에서 최대 mb는 설정되어 있음.)',
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
        problem: 'AWS IAM 권한관리시스템을 테마로 개인권한과 그룹권한을 각각 지정할 수 있는 요구사항이 있었다. 개인 추가 권한과 그룹 권한이 겹치면 어느 쪽을 따르는지 기준도 불명확했다.',
        solution: '권한 조회 쿼리에서 개인 역할 경로와 그룹 역할 경로를 합산해(UNION) 실효 권한 집합을 구성했다. 두 경로에서 같은 권한이 나오면 중복을 제거해 최대 허용 집합을 기준으로 삼는다.',
      },
      {
        title: 'JWT private key → AWS Secrets Manager 이관',
        status: 'closed',
        problem: 'JWT 서명에 쓰이는 private.key 파일이 서버 파일시스템에 존재해 배포 패키지에 포함될 위험이 있었고, 키 교체 시 전체 서버 재배포가 필요했다.',
        solution: 'AWS Secrets Manager에 private key를 저장하고 서버 시작 시 API로 가져오도록 변경했다. 키 교체를 서버 재배포 없이 Secrets Manager에서 단독으로 처리할 수 있게 됐다.',
      },
      {
        title: '전체 관리자 API 호출 Audit Trail — 조회 행위까지 포함해 자동 기록',
        status: 'closed',
        problem: '관리자가 어떤 데이터를 조회·변경했는지 추적할 수단이 없었다. 사후에 누가 언제 무엇을 했는지 확인할 방법이 전혀 없는 상태였다.',
        solution: 'Restify 미들웨어 레이어에서 모든 API 요청을 하이재킹해 요청자·경로·메서드·바디를 DB에 자동 기록했다. 조회 행위까지 포함해 전체 액션을 추적 가능하게 했다. 어드민 트레픽이 적어서 가능한 방식이었고 추후 DB 메모리관리를 위해 벌크 insert 방식도 고려했었다.',
      },
      {
        title: 'Permission JWT 클레임 문자열 부분 매칭 취약점 — 숫자 배열 비교로 전환',
        status: 'closed',
        problem: '권한 목록을 JWT에 쉼표 구분 문자열("1,12,23")로 저장하고 미들웨어에서 .includes(requiredPermission)로 체크했다. 권한 ID "1"을 검색하면 "1,12"도 통과하는 부분 매칭 버그가 있었다.',
        solution: 'JWT 클레임을 문자열 대신 숫자 배열로 바꾸고 검사도 배열 indexOf 비교로 전환했다. 권한 ID 1과 12가 겹쳐서 잘못된 접근이 허용되던 문제가 해소됐다.',
      },
      {
        title: '이력 기록 민감 정보 마스킹 — 비밀번호 변경 파라미터 로깅 방지',
        status: 'closed',
        problem: 'Restify 미들웨어에서 요청 바디 전체를 그대로 DB에 저장하다 보니 비밀번호 변경 API 호출 시 평문 패스워드가 로그에 JSON으로 기록됐다.',
        solution: '미들웨어 호출 전에 바디 파라미터를 정규화하는 단계를 추가했다. password, token 등 민감 키는 "***"로 마스킹한 뒤 저장하도록 했다.',
      },
      {
        title: 'OAuth2 x5c 인증서 캐시 무효화 없음 — Redis TTL 만료 설정으로 자동 갱신 처리',
        status: 'closed',
        problem: 'Azure AD의 x5c 인증서를 모듈 메모리에 캐시하고 만료나 갱신 로직이 없었다. 인증서가 갱신되면 서버를 재시작하기 전까지 모든 OAuth2 로그인이 실패했다.',
        solution: '인증서 캐시에 TTL을 설정하고 검증 실패 시 캐시를 무효화한 뒤 x5c를 다시 가져오는 로직을 추가했다. 서버 재시작 없이 인증서 갱신을 자동으로 처리한다.',
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
        problem: '광고 네트워크마다 초기화 방식, 요청 파라미터, 완료 콜백 구조가 전부 달랐다. 네트워크마다 코드 분기를 쌓으면 새 네트워크 추가할 때마다 기존 로직을 건드려야 했다.',
        solution: '각 네트워크를 동일한 인터페이스의 어댑터 함수로 래핑해서 폴백 체인이 네트워크 종류를 몰라도 실행할 수 있게 했다. 새 네트워크 추가는 어댑터 함수 하나와 팩토리 케이스 하나만 추가하면 기존 코드를 건드리지 않아도 된다.',
      },
      {
        title: 'reduce 기반 폴백 체인 — 실패 시 다음 네트워크 자동 전환',
        status: 'closed',
        problem: '첫 번째 네트워크가 광고 없음이나 오류를 반환하면 그냥 광고가 뜨지 않았다. 노출 기회를 최대한 살리려면 우선순위대로 다음 네트워크를 자동으로 시도하는 구조가 필요했다.',
        solution: '광고 네트워크 목록을 순서대로 체이닝해서 앞 네트워크가 실패하면 자동으로 다음 네트워크를 시도하는 구조를 적용했다. 중간에 취소가 들어오면 즉시 멈추고, 모두 실패하면 마지막에 노출 실패를 기록한다.',
      },
      {
        title: '즉시실행함수 클로저로 window.**외 내부 구현 전역 노출 차단',
        status: 'closed',
        problem: 'SDK를 스크립트 태그로 로드하면 내부 변수들이 window에 직접 붙을 수 있었다. 호스트 페이지의 변수와 이름이 겹치면 충돌하거나 내부 상태가 외부에서 조작될 위험이 있었다.',
        solution: '즉시실행함수 클로저 안에 내부 구현을 전부 가두고 외부에는 단일 진입점 하나만 전역 변수로 노출했다.(window.**) 내부 식별자가 호스트 페이지의 변수와 충돌하거나 외부에서 조작되는 위험을 원천 차단했다.',
      },
      {
        title: 'Core-JS 3 + Babel preset-env — 구형 브라우저 호환성 확보',
        status: 'closed',
        problem: 'SDK가 실행되는 환경은 호스트 페이지의 브라우저라서 구형 사파리나 낮은 버전 안드로이드에서도 동작해야 했다. async/await나 fetch 같은 API가 없는 환경에서 SDK가 바로 죽었다.',
        solution: '실제로 사용하는 기능만 폴리필을 자동으로 포함하는 설정을 적용해 불필요한 번들 크기 증가를 막았다. 지원 대상 브라우저 범위를 명시적으로 정의해 호환성 기준을 코드로 관리했다.',
      },
      {
        title: 'localStorage 쿨다운 방식으로 광고 중복 노출 방지',
        status: 'closed',
        problem: '같은 사용자가 광고를 연달아 요청하거나 로딩 중에 새 요청이 들어오면 중복 노출이 발생했다. 특히 사용자가 빠르게 화면을 반복해서 열 때 문제가 됐다.',
        solution: '마지막 광고 표시 시각을 로컬에 저장해 쿨다운 기간 내 재요청을 차단하고, 광고가 로딩 중이면 진행 중 상태를 별도로 관리해 같은 광고가 동시에 두 번 실행되지 않도록 했다.',
      },
      {
        title: '광고 완료 후 슬롯·이벤트 리스너 정리 — 메모리 누수 방지',
        status: 'closed',
        problem: '광고가 끝난 후에도 특정 네트워크사에 정책때문에 슬롯과 이벤트 리스너가 남아있었다. 뷰에서 사라진 뒤에도 DOM에 붙어있어서 요청이 반복될수록 메모리가 쌓였다.',
        solution: '광고 완료 시점을 플래그로 추적해 완료 처리가 한 번만 실행되도록 보장하고, 완료되면 광고 슬롯과 이벤트 리스너를 모두 제거했다. 중복 실행 방지 플래그로 예외 케이스에서의 이중 처리도 함께 막았다.',
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
      '3단계 보안 모드(Auto·Safe·Plan), bash 블록리스트, 심볼릭 링크 안전 볼트 제한으로 플러그인 환경에서의 파일시스템 접근 위협 모델링',
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
        problem: '메시지를 보낼 때마다 SDK를 새로 초기화하다 보니 첫 응답이 나오기까지 2~5초씩 걸렸다. 짧은 대화에서도 턴마다 이 딜레이가 반복돼서 체감이 꽤 나빴다.',
        solution: '에이전트 인스턴스를 대화 내내 유지하고, 시스템 프롬프트나 모델 설정이 바뀔 때만 재시작하도록 했다. 대화 중에 새 메시지가 들어오면 큐에 쌓아뒀다가 현재 턴이 끝난 후 순서대로 처리하도록 했다.',
      },
      {
        title: 'MessageChannel 추상화로 SDK 스트림 이벤트 중복 렌더링 방지',
        status: 'closed',
        problem: 'SDK가 텍스트를 두 번 보냈다. stream_events가 실시간으로 오고, 턴이 끝나면 같은 내용이 assistant 메시지로 또 왔다. 그냥 두면 화면에 같은 텍스트가 두 번 찍혔다.',
        solution: '응답 처리기에 스트림으로 이미 받았음을 표시하는 플래그를 달아서, 스트림 텍스트가 먼저 도착한 경우 이후에 오는 완성 메시지를 건너뛰도록 했다. 응답 처리기를 턴당 하나만 쓰도록 강제해 플래그가 뒤섞이는 상황도 막았다.',
      },
      {
        title: 'Planit JSON 스키마 기반 자연어 일정 조작 연동 설계',
        status: 'closed',
        problem: 'Claudian과 Planit을 코드로 직접 연결하면 한쪽을 업데이트할 때마다 반드시 다른 쪽도 함께 고쳐야 한다. Obsidian 플러그인은 서로 코드를 직접 import할 수도 없어서 다른 방법이 필요했다.',
        solution: '공유 JSON 파일을 두 플러그인의 계약으로 삼았다. AI 플러그인은 파일을 직접 읽고 쓰고, 캘린더 플러그인은 파일 변경을 감지해 UI를 자동으로 갱신한다. 공유 코드 없이 파일 포맷만 약속해서 두 플러그인이 독립적으로 배포되어도 공유 데이터가 유지되도록 했다.(다른 플래너와 차별되는 Planit만의 이점)',
      },
      {
        title: '3단계 보안 모드 (Auto·Plan·Normal) 및 bash 블록리스트·볼트 경계 구현',
        status: 'closed',
        problem: 'Obsidian은 로컬 파일시스템에 직접 붙어 있어서 에이전트가 bash를 마음대로 쓰면 볼트 밖 파일을 건드리거나 rm -rf를 날리는 걸 막을 방법이 없었다. SDK 권한 모델은 실행 여부를 묻지만, 명령어 내용 자체를 보고 막는 기능은 없었다.',
        solution: '실행 권한을 3단계로 나눠 각 모드에 맞는 제한을 적용했다. 명령어 실행 직전에 위험 패턴 목록으로 차단 여부를 검사하고, 파이프와 서브셸까지 파싱해서 볼트 밖 경로 접근을 잡아낸다. 심볼릭 링크를 실제 경로로 풀어서 경계 우회 시도도 막았다.',
      },
      {
        title: '현재 컨텍스트 파악 불가 — 첨부 파일 가시화 UI 구현',
        status: 'closed',
        problem: '@로 파일을 붙여도 입력창에 아무것도 표시되지 않아서 어떤 파일이 세션에 포함됐는지 알 방법이 없었다. 파일 크기도 보이지 않으니 컨텍스트가 얼마나 쌓였는지도 감이 없었다.',
        solution: '첨부 파일을 입력창 위에 칩 형태로 표시하는 컴포넌트를 만들었다. 줄 수를 비동기로 캐싱해 컨텍스트 크기를 직관적으로 보여주고, 현재 열려있는 노트는 시각적으로 구분된다. 파일이 많으면 접어서 표시하고, 개별 제거와 파일 열기도 지원한다.',
      },
      {
        title: 'TickTick MCP 버그 + 유료 구독 → Planit 자체 개발 및 Claudian 호환 설계',
        status: 'closed',
        problem: '유료 구독 플래너 TickTick을 MCP로 연결해 쓰다 보니 반복되는 버그가 있었고, 수정 권한도 없었다. 별도로 만들기로 했는데 Claudian이 자연어로 일정을 바로 조작하려면 AI가 파일을 직접 읽고 쓸 수 있는 포맷이 필요했다.',
        solution: '태스크 파일 포맷을 문서화해 AI 플러그인의 시스템 프롬프트에 포함시키고, 캘린더 플러그인은 파일 변경 이벤트를 감지해 자동으로 UI를 갱신하도록 설계했다. 두 플러그인 사이에 공유 코드는 없고 파일 포맷이 유일한 계약이다.',
      },
      {
        title: '설정 탭 UI 재편 — Slack·MySQL·ClickHouse 비개발자 연동 개선',
        status: 'closed',
        problem: 'MCP 서버나 DB 연결을 추가하려면 JSON 파일을 직접 편집해야 했다. 디자이너·기획자 입장에서는 설정 자체를 못 하면 플러그인을 쓸 수 없는 문제였다.',
        solution: '설정을 탭 구조로 재편하고 MCP·DB 연결을 폼 기반 UI로 전환했다. 서버 타입을 선택하면 필요한 입력 항목이 자동으로 변경되고, DB 종류를 고르면 기본 포트가 미리 채워진다. 연결 테스트 버튼으로 저장 전에 설정을 바로 확인할 수 있다.',
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
        problem: '고빈도 엔드포인트의 샘플링 비율을 낮추면 trace 저장량은 줄지만, 메트릭 집계도 같이 줄어들어 실제 트래픽의 일부만 반영됐다. RPS와 P99 수치가 실제와 전혀 달랐다.',
        solution: '경로별 샘플링 로직을 직접 구현해 trace 저장은 줄이되 메트릭 집계는 전체 요청 기준으로 유지되도록 분리했다. trace 저장 비용을 약 10배 줄이면서 메트릭 정확도는 100%를 유지했다.',
      },
      {
        title: 'OpenTelemetry Fastify 5 미지원 — 요청 경로 정보 직접 주입으로 해결',
        status: 'closed',
        problem: 'OpenTelemetry 공식 Fastify 계측 라이브러리가 Fastify 5를 지원하지 않아 요청 경로 정보가 추적 데이터에 기록되지 않았다. 모든 요청이 경로 구분 없이 뭉쳐 어떤 엔드포인트가 느린지 파악할 수 없었다.',
        solution: 'HTTP 계측 라이브러리가 경로 정보를 읽는 시점을 파악해, 요청 처리 단계에서 해당 위치에 경로를 미리 주입했다. 이후 Prometheus에서 경로별 RPS와 P99를 정확히 확인할 수 있게 됐다.',
      },
      {
        title: 'Redis 클러스터 쿼리 추적 누락 — 직접 래핑으로 해결',
        status: 'closed',
        problem: 'OpenTelemetry의 Redis 계측 라이브러리가 클러스터 모드를 지원하지 않아 Redis 클러스터 쿼리가 추적 데이터에 전혀 기록되지 않았다.',
        solution: 'Redis 클러스터 클라이언트의 명령 실행 지점을 직접 래핑해 추적 데이터를 수동으로 생성했다. 이후 Redis 클러스터 쿼리 레이턴시를 트레이스에서 직접 확인할 수 있게 됐다.',
      },
      {
        title: 'DB 호출 추적명 범용화 — 프로시저 단위 병목 식별 불가',
        status: 'closed',
        problem: 'MySQL Stored Procedure 호출이 추적 데이터에 전부 동일한 범용 명칭으로 기록됐다. 어떤 프로시저가 느린지 구분이 안 됐고, DB 병목을 찾으려면 로그를 직접 뒤져야 했다.',
        solution: '추적 데이터 처리 단계에서 DB 쿼리 항목의 이름을 실제 실행된 프로시저명으로 자동 변환하도록 했다. 이후 Grafana에서 프로시저 단위로 응답 시간을 바로 확인할 수 있게 됐다.',
      },
      {
        title: 'ECS 오토스케일링 — Prometheus 수집 대상 자동 갱신',
        status: 'closed',
        problem: 'ECS 오토스케일링으로 인스턴스가 늘거나 줄면 Prometheus 수집 대상도 바뀌는데, 매번 수동으로 설정 파일을 고쳐야 했다. 바쁜 시간대에는 새 인스턴스가 한동안 모니터링 대상에서 빠졌다.',
        solution: 'ECS 클러스터의 실행 중인 인스턴스 목록을 AWS API로 조회해 Prometheus 수집 설정을 자동 재생성하는 스크립트를 만들었다. 주기적으로 실행되며 수동 개입 없이 인스턴스 증감이 반영된다.',
      },
      {
        title: '멀티 워커 환경 메트릭 중복 집계 — 공유 집계 방식으로 전환',
        status: 'closed',
        problem: '여러 워커 프로세스가 동시에 실행될 때 카운터 값이 프로세스마다 따로 저장됐다. Prometheus가 수집할 때 일부 워커 분만 집계돼 실제 요청 수보다 훨씬 적게 기록됐다.',
        solution: '각 워커가 공유 공간에 메트릭을 기록하고 수집 요청 시 전체 워커 값을 합산해 반환하도록 구조를 변경했다. 커스텀 지표도 동적으로 등록·증가시킬 수 있어 수집 항목을 유연하게 관리할 수 있다.',
      },
      {
        title: 'Prometheus·Tempo 이중 연결 — 메트릭에서 트레이스로 드릴다운',
        status: 'closed',
        problem: 'P99가 높게 나오면 원인 요청을 확인하러 트레이스 화면을 별도로 열어야 했다. 메트릭과 트레이스 화면을 오가는 과정이 번거롭고 원인 파악까지 시간이 걸렸다.',
        solution: '메트릭 대시보드에서 이상 구간을 발견하면 같은 화면에서 원본 트레이스로 바로 이동할 수 있도록 두 데이터소스를 연결했다. 서비스와 경로 기준으로 필터링하면 요청률·응답시간과 트레이스를 단일 화면에서 확인할 수 있다.',
      },
      {
        title: '모니터링 관리 API 무단 접근 차단 — 인증 미들웨어 추가',
        status: 'closed',
        problem: '모니터링 수집 설정을 강제로 재생성하는 API가 인증 없이 열려 있으면 외부에서 설정을 무단으로 조작할 수 있었다. 모니터링 서버가 망가지면 전체 지표 수집이 멈추는 상황이었다.',
        solution: 'API 요청에 인증 키 검증 미들웨어를 추가해 인가되지 않은 접근을 차단했다. 설정 재생성·재시작 API 모두 이 검증을 거치고, 인증 키는 환경 변수로 관리해 코드에 직접 노출되지 않도록 했다.',
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
        problem: 'Fastify req/res 구조가 Restify와 달라 14개 이상 하위 서버에서 사용하던 요청 객체 속성들이 전부 깨졌다. 서버마다 코드를 수정하는 것은 현실적으로 불가능했다.',
        solution: '요청 처리 플러그인에서 Fastify req 객체에 Restify 호환 속성을 직접 주입했다. 하위 서버는 코드 수정 없이 기존 인터페이스 그대로 사용할 수 있게 됐다.',
      },
      {
        title: '빈 JSON 바디 파싱 — Restify는 빈 객체 반환, Fastify는 400 에러',
        status: 'closed',
        problem: 'Restify는 바디 없는 요청을 빈 객체로 처리했는데 Fastify는 파싱 에러를 던졌다. GET 요청이나 바디 없이 보내는 경우가 많아 하위 서버 전체에서 오류가 발생했다.',
        solution: 'JSON 파서를 기본 파서보다 먼저 등록해 바디가 비어있으면 빈 객체를 반환하고, 내용이 있으면 정상 파싱하는 방식으로 Restify 동작을 그대로 유지했다.',
      },
      {
        title: '멀티파트 필드 구조 차이 — Fastify·Restify 응답 형태 불일치',
        status: 'closed',
        problem: 'Fastify의 멀티파트 파서가 필드를 중첩 객체 형태로 반환해, 평탄한 구조를 기대하던 하위 서버에서 폼 데이터 접근이 전부 깨졌다.',
        solution: '요청 처리 단계에서 멀티파트 필드 구조를 순회해 실제 값만 꺼내는 평탄화 처리를 추가했다. Restify와 동일한 형태로 맞춰 하위 서버 코드 변경 없이 동작하도록 했다.',
      },
      {
        title: '인가 바이패스 경로 매칭 — 프레임워크 간 동작 차이로 보안 허점 발생',
        status: 'closed',
        problem: '와일드카드 패턴으로 공개 경로를 허용하는데 Fastify의 기본 패턴 매칭이 Restify와 달랐다. 공개 엔드포인트가 인증 실패로 막히거나, 반대로 보호해야 할 경로가 뚫리는 문제가 발생했다.',
        solution: '전체 허용과 접두사 일치를 구분하는 경로 매칭 로직을 직접 구현했다. HTTP 메서드 표기 차이와 와일드카드 처리를 기존 관례에 맞게 통일해 동작을 일치시켰다.',
      },
      {
        title: '플러그인 등록 순서 고정 — 순서 오류 시 전 서버 장애',
        status: 'closed',
        problem: 'Fastify는 플러그인 등록 순서가 곧 실행 순서라 바디 파싱 전에 인가 체크가 먼저 돌거나, 에러 핸들러가 라우트보다 먼저 등록되는 상황이 생겼다. 14개 서버가 공유하는 모듈이라 한 번 순서가 틀리면 전체가 영향을 받았다.',
        solution: '초기화 단계에서 바디 파서 → 파이프라인 → 인가 → 라우트 → 에러 핸들러 순서를 명시적으로 고정했다. 공유 모듈 특성상 순서 변경이 전체 서버에 영향을 주므로 코드 리뷰 필수 항목으로 문서화했다.',
      },
      {
        title: '확률 기반 로그 샘플링 — 5xx는 100%, 일반 요청은 비율 조정',
        status: 'closed',
        problem: '운영 환경에서 모든 요청을 로그로 기록하면 DataDog 비용이 과도하게 발생했다. 전체 비율을 줄이면 5xx 에러도 함께 누락돼 장애 대응이 어려웠다.',
        solution: '일반 요청은 설정한 비율로만 기록하고, 5xx 에러는 100% 기록하는 샘플링 로직을 구현했다. 경로별로 비율을 다르게 설정할 수 있어 비용과 이상 감지 사이의 균형을 조절할 수 있었다.',
      },
      {
        title: 'v2.x(Restify) + v3.x(Fastify) 병행 배포로 점진적 전환',
        status: 'closed',
        problem: '14개 이상 하위 서버를 한 번에 전환하는 건 불가능했다. 기존 버전을 유지하면서 새 버전을 동시에 관리해야 했다.',
        solution: '기존 버전 태그를 유지하면서 새 버전을 병행 배포해 하위 서버가 준비됐을 때 개별적으로 전환할 수 있게 했다. 전환은 버전 범위 수정만으로 가능하고, 6개월 이상 하위 호환 API를 유지해 각 서버가 전환 시점을 자유롭게 조율했다.',
      },
      {
        title: 'API 문서 통합 — 운영 환경 스펙 노출 방지',
        status: 'closed',
        problem: '하위 서버마다 API 문서 설정을 직접 해야 했고, 운영 환경에서 실수로 문서를 활성화하면 API 스펙이 외부에 노출되는 위험이 있었다.',
        solution: '공통 인증 스키마와 응답 형식을 모듈에 내장해 하위 서버가 간단하게 API 문서를 붙일 수 있게 했다. 운영 환경에서 API 문서가 활성화되어 있으면 경고를 출력해 실수로 스펙이 노출되는 상황을 방지했다.',
      },
      {
        title: 'Accept-Version 헤더 버전 라우팅 — Restify 자동화 기능 Fastify에 직접 구현',
        status: 'closed',
        problem: 'Restify는 Accept-Version 헤더 기반 버전 라우팅을 내장 기능으로 제공했지만, Fastify는 이를 지원하지 않았다. 클라이언트가 버전 헤더를 생략하면 가장 최신 버전 핸들러로 자동 라우팅하는 기능도 없어 기존 클라이언트와의 호환이 깨질 수 있었다.',
        solution: '경로·메서드 단위로 버전 제약을 설정해 라우트를 등록하고, 등록된 핸들러 중 가장 높은 버전을 자동으로 찾아 버전 미지정 요청의 기본 라우트로 함께 등록했다. 클라이언트는 기존과 동일하게 Accept-Version 헤더로 특정 버전을 지정할 수 있고, 헤더 없이 요청하면 자동으로 최신 버전으로 라우팅된다.',
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
        problem: '적립 토큰을 검증할 때 확인과 삭제를 두 단계로 나눠 처리했다. 거의 동시에 들어온 요청 두 개가 확인을 통과한 후 둘 다 적립으로 이어질 수 있었다.',
        solution: '조회와 삭제를 단일 원자 연산으로 처리해 경쟁 조건을 제거했다. 첫 번째 요청만 토큰 값을 가져가고 즉시 삭제되므로 동시 요청이 들어와도 두 번째는 거부된다.(openKey)',
      },
      {
        title: '인앱·아웃브라우저 흐름 통합 — 단회용 토큰을 공통 브릿지로',
        status: 'closed',
        problem: '인앱 흐름은 JWT 인증 사용자가 직접 세션을 열고, 아웃브라우저는 외부 서버가 토큰을 발급해 클라이언트에 전달하는 구조라 완전히 달랐다. 두 경로를 하나의 적립 로직으로 처리하기가 어려웠다.',
        solution: '토큰 안에 사용자·앱·경로 유형 정보를 담아 발급 방식에 관계없이 적립 시점에는 동일한 데이터를 참조하게 했다. 인증은 세션 발급 시에만 처리하고 실제 적립은 토큰에 담긴 유저정보를 보고 수행한다.',
      },
      {
        title: '아웃브라우저 트랜잭션 상태 머신 — 중간 단계 타임아웃·재시도 처리',
        status: 'closed',
        problem: '외부 서버가 세션을 열고, 클라이언트가 검증하고, 서버가 적립하는 3단계 흐름에서 중간에 타임아웃이 나거나 재시도가 들어오면 상태가 꼬일 수 있었다.',
        solution: '트랜잭션을 대기 상태로 시작해 적립 완료 시 완료 상태로 전환한다. 생성 시 24시간 만료 시각을 설정하고, 만료된 트랜잭션은 적립 요청을 거부한다. 동일한 트랜잭션 ID면 기존 활성 트랜잭션을 재활용해 중복 생성도 막았다.',
      },
      {
        title: 'Redis 분산 락 — 동시 요청 이중 적립 방지',
        status: 'closed',
        problem: '네트워크 재시도나 연속 클릭으로 같은 트랜잭션에 대한 적립 요청이 거의 동시에 들어올 수 있었다. 락 없이는 두 요청이 모두 통과해 이중 지급이 발생할 수 있었다.',
        solution: '원자적 연산으로 분산 락을 구현해 경쟁 조건 없이 첫 번째 요청만 처리를 이어가도록 했다. 유효 기간을 설정해 프로세스가 비정상 종료되어도 락이 자동 해제된다.',
      },
      {
        title: '전략+팩토리 패턴 — 적립 피처를 독립 구현체로 분리',
        status: 'closed',
        problem: '여러(20개이상) 피처마다 검증·지급·롤백 로직이 달랐다. 기능을 추가할 때마다 기존 코드를 건드리거나 조건 분기가 늘어났다.',
        solution: '공통 인터페이스를 정의하고 피처마다 구현체를 만들었다.(class) 피처 이름으로 적절한 구현체를 선택하는 팩토리를 통해 처리해서, 새 피처 추가 및 연동이 세팅 추가로 연동되도록 확장시켰다.',
      },
      {
        title: '단계별 롤백 — 실패 지점에 따라 역전 범위를 다르게',
        status: 'closed',
        problem: '적립 처리 중 어느 단계에서 실패하느냐에 따라 롤백해야 할 데이터가 달랐다. log만 기록된 경우, 비지니스 데이터가 변경된 경우, 상태까지 바뀐 경우를 구분하지 않으면 롤백 과잉이나 누락이 생겼다.',
        solution: '처리 단계를 순서대로 추적하고 실패 시 그 시점까지 완료된 단계만 선택적으로 되돌리도록 변경하여 Redis key의 파편화 및 DB 메모리 누수를 차단했다.',
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
        problem: '콘텐츠 목록 API가 요청마다 DB에서 전체 목록을 조회했다. 목록 데이터가 자주 바뀌지 않는데도 트래픽이 몰리면 DB 부하가 올라갔다.',
        solution: '콘텐츠 목록과 노출 이력을 각각 적절한 유효 기간으로 캐시해 DB 조회를 인메모리로 대체했다. 상위 키 패턴을 활용해 연관 캐시를 일괄 무효화할 수도 있어서 운영상에 문제도 해결했다.',
      },
      {
        title: 'Pyroscope 연속 프로파일링 — 원본 소스 기준 코드 레벨 병목 시각화',
        status: 'closed',
        problem: 'P99가 높다는 건 알지만 어느 부분에서 시간이 걸리는지 추적할 방법이 없었다. 요청 단위 추적만으로는 범위가 너무 넓어 코드 레벨 병목을 특정하기 어려웠다.',
        solution: '연속 프로파일링을 도입하고 소스 맵을 연결해 컴파일된 파일이 아닌 원본 소스 기준으로 플레임 그래프를 볼 수 있게 했다. Grafana에서 응답 시간 지표와 프로파일을 함께 보면서 코드 레벨 병목을 직접 찾을 수 있도록 대시보드를 구성했다.',
      },
      {
        title: '메트릭 카운터 배치 플러시 — 메트릭 서버 지연이 API 응답에 영향',
        status: 'closed',
        problem: '요청마다 메트릭 서버에 카운터를 직접 전송하면 메트릭 서버가 잠깐 느려질 때 적립 API 응답도 함께 느려졌다. 전송에 실패하면 해당 카운터가 유실됐다.',
        solution: '인메모리 버퍼에 카운터를 누적하다가 주기적으로 일괄 전송하는 방식으로 전환했다. 전송 실패한 항목은 재시도 큐에 넣어 다음 전송 때 합산해 처리하고, 전송 중에 들어오는 카운터도 손실 없이 처리한다.',
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
        problem: 'API 스펙을 바꿀 때마다 구버전 SDK가 호출하는 앱들이 터질 위험이 있었다. 앱스토어 심사에 수 주가 걸려서 SDK 강제 업데이트는 사실상 불가능한 상황이었다.',
        solution: 'URL에 버전을 넣는 대신 Accept-Version 헤더로 분리해 버전별 핸들러를 독립 파일로 관리했다. 신규 버전 핸들러를 추가해도 구버전은 그대로 남아 기존 SDK가 계속 동작했다.',
      },
      {
        title: 'WebView ↔ 네이티브 SDK 브릿지 추상화 — Android/iOS 분기 격리',
        status: 'closed',
        problem: 'Android와 iOS가 서로 다른 브릿지 방식을 사용하는데, 웹 코드 곳곳에서 플랫폼을 직접 분기하다 보니 SDK 업데이트가 있을 때마다 여러 파일을 수정해야 했다.',
        solution: '플랫폼별 분기와 SDK 버전 감지를 단일 통합 레이어에 격리했다. 웹 컴포넌트는 플랫폼에 관계없이 동일한 인터페이스만 호출하면 되고, 플랫폼 대응은 브릿지 레이어에서 일괄 처리하도록 했다.',
      },
      {
        title: '광고 포스트백 SQS 비동기 처리 — 파트너 API 지연으로 응답 블로킹 방지',
        status: 'closed',
        problem: '적립 완료 후 파트너사에 포스트백 콜백을 동기로 보내다 보니 파트너 API가 느리거나 다운됐을 때 사용자 응답도 함께 블로킹됐다.',
        solution: '포스트백을 SQS 큐에 위임하는 방식으로 전환했다. 사용자 응답은 즉시 반환하고 파트너 전달은 비동기로 처리한다. 파트너가 일시적으로 다운돼도 SQS가 자동 재시도해 유실 없이 처리되었다.',
      },
      {
        title: '광고 클릭 중복 방지 — 동시 요청 레이스 컨디션 해소',
        status: 'closed',
        problem: '광고 클릭 요청이 짧은 시간에 연속으로 들어올 때, 처리 중 여부 확인을 통과한 두 요청이 모두 DB에 클릭 레코드를 삽입하는 중복 적립이 발생했다.',
        solution: 'DB 삽입 직전에 원자적 분산 락을 추가해 첫 번째 요청만 처리를 이어가도록 했다. 처리 완료 후 락을 해제하며, 충돌한 두 번째 요청은 조용히 실패 처리한다.',
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
