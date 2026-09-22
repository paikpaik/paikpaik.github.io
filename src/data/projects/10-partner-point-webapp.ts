import type { Project } from '../types'

export const partnerPointWebapp: Project = {
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
}
