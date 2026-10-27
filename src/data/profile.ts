import type { Experience } from './types'

export const profile = {
  name: '노재열',
  nameEn: 'Roh Jaeyeol',
  role: 'Backend · Product Engineer',
  phone: '010-2030-9311',
  email: 'woduf9311@gmail.com',
  github: 'https://github.com/paikpaik',
  summary:
    '확장 가능한 백엔드와 옵저버빌리티를 기반으로, 서버부터 어드민·SDK·사내 도구까지 끝까지 책임지는 프로덕트 엔지니어로 성장하고 있습니다.\n리워드·광고 플랫폼의 적립·콘텐츠 API, 광고 SDK, 전사 서버 모듈 마이그레이션, 모니터링 내재화를 단독으로 리드하며 설계·운영해왔습니다.\n평시 초당 2,000건의 적립 API를 이중 적립 0건으로 운영하며, 서버 인스턴스 20~30%와 모니터링 비용 95%를 줄였습니다.\n최근에는 LLM으로 디자이너·기획자가 직접 쓰는 도구를 만들며, 함께 일할 때 다시 같이 일하고 싶은 개발자로 기억되고 싶습니다.',
}

export const philosophy = [
  {
    heading: '좋은 코드는 읽히는 코드',
    body: '라이브 이슈에 빠르게 대응하려면 팀 전체가, 그리고 AI가 제 코드를 쉽게 읽을 수 있어야 합니다. AI로 개발하는 지금 가독성은 더 중요해졌습니다.',
  },
  {
    heading: '오래 가는 소프트웨어',
    body: '가독성 위에 재사용성과 적절한 모듈화를 더해야 오래 유지보수할 수 있는 코드가 된다고 생각합니다.',
  },
  {
    heading: '만들고 끝내지 않는다',
    body: '배포 이후 지표로 효과를 확인하고, 사용자가 실제로 쓰고 있는지까지 확인할 때 일이 끝났다고 생각합니다.',
  },
]

export const skills = [
  {
    category: 'Backend',
    items: ['TypeScript', 'Node.js', 'Fastify', 'NestJS', 'Next.js', 'Python(FastAPI)'],
  },
  {
    category: 'Data',
    items: ['MySQL(Aurora)', 'Redis(Valkey)', 'Kafka', 'ClickHouse', 'Airflow'],
  },
  {
    category: 'Infra',
    items: ['AWS(ECS·EB·S3·Secrets Manager)', 'Docker', 'GitHub Actions'],
  },
  {
    category: 'Observability',
    items: ['OpenTelemetry', 'Prometheus', 'Grafana·Tempo', 'Pyroscope', 'DataDog'],
  },
  {
    category: 'AI',
    items: ['Claude Agent SDK', 'MCP'],
  },
]

export const experiences: Experience[] = [
  {
    company: 'Avatye',
    role: 'Backend Engineer',
    start: '2023.12',
    // end 없으면 현재로 동적 계산
    description: [
      '리워드·광고 플랫폼 API 서버 설계·운영 — 20개 이상 광고 파트너 연동, 리워드 콘텐츠 API 초당 300~1,000건 처리',
      '전사 공유 서버 모듈 Restify → Fastify 5 마이그레이션 (14개 이상 서버 코드 변경 없이 무중단 전환)',
      'OpenTelemetry·Prometheus·Tempo 기반 모니터링 파이프라인 및 Grafana 대시보드 구축',
      'Redis 단회용 토큰·분산 락 기반 적립 API 설계로 동시 요청 이중 적립 방지',
      '광고 네트워크 9개 이상을 단일 인터페이스로 통합한 웹 미디에이션 SDK 개발 및 CDN 배포',
      '광고주·파트너 어드민, ISMS 권한관리(RBAC)·감사 로그 시스템 풀스택 1인 개발',
    ],
  },
]

export const education = [
  {
    school: '단국대학교 죽전캠퍼스',
    major: '국어국문학과',
    start: '2016.03',
    end: '2018.07',
    degree: '학사 (편입 후 졸업)',
  },
]
