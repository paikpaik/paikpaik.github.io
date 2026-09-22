import type { Experience } from './types'

export const profile = {
  name: '노재열',
  nameEn: 'Roh Jaeyeol',
  role: 'Backend Engineer',
  email: 'woduf9311@gmail.com',
  github: 'https://github.com/paikpaik',
  summary:
    '확장 가능한 백엔드 시스템과 클라우드 인프라, 옵저버빌리티 플랫폼에 집중하는 백엔드 엔지니어입니다.\n리워드·광고 플랫폼 API부터 SDK 개발, 전사 서버 모듈 마이그레이션, 모니터링 시스템 구축까지 다양하게 작업해왔습니다.\n최근에는 LLM을 활용한 오픈소스 툴을 만들고 있습니다.\n함께 일할 때, 항상 같이 일하고 싶은 개발자로 기억되고 싶습니다.',
}

export const philosophy = [
  {
    heading: '좋은 코드는 가독성이 좋은 코드',
    body: 'AI를 활용해 개발하는 요즘 더 중요하다고 생각합니다. 결국 라이브 이슈에 빠르게 대응하려면 제 코드를 팀 전체가 쉽게 읽을 수 있어야 하고, AI에게 물어봐도 가독성이 나쁘면 이해를 기반으로 한 적절한 조치와 병목 대응이 늦어집니다.',
  },
  {
    heading: '지속 가능한 소프트웨어도 같은 맥락',
    body: '가독성 위에 재사용성과 적절한 모듈화가 더해질 때 오래 유지보수할 수 있는 코드가 된다고 생각합니다.',
  },
]

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
    items: ['Anthropic SDK', 'MCP', 'AWS Bedrock'],
  },
]

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
      'AWS Bedrock 임베딩 기반 오퍼월 AI 자동 그룹핑 시스템 구축',
      'LLM Claude API 기반 Obsidian 플러그인 오픈소스 개발',
    ],
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
