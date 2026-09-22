import type { Project } from '../types'

export const rewardContentPlatform: Project = {
    id: 9,
    label: 'Dev',
    name: '리워드 콘텐츠 플랫폼 서버 고도화',
    summary: 'Fastify 5 기반 리워드 콘텐츠 API 서버 성능·옵저버빌리티 개선',
    start: '2025.01',
    description: [
      '11개 파트너사 콘텐츠를 3계층 필터링으로 할당하고, 클릭 기록과 포스트백 검증을 독립된 파이프라인으로 분리해 할당-클릭-전환 흐름을 단계별로 명확하게 구성',
      '콘텐츠 batch cron job의 크롤링 실패시 슬랙 알림을 받아서 해당 콘텐츠의 크롤링만 재시도하는 시스템 구축',
      'AWS Valkey 릴레이 캐싱으로 콘텐츠 목록·노출 이력·일일 한도 DB 조회를 인메모리로 대체 — 트래픽 집중 시 DB 부하 절감',
      '전환 단계 분산 락으로 동시 포스트백 이중 적립 방지, 일일 한도·쿨타임·중복 검증 파이프라인으로 데이터 정합성 보장',
      'OpenTelemetry 기반 분산 트레이싱 도입 — Fastify 5·Redis 클러스터 공식 미지원 환경을 직접 패치해 전 구간 추적 범위 확보',
      '고빈도 경로 trace 샘플링 최소화 + Pyroscope 연속 프로파일링으로 저장 비용 절감과 코드 레벨 병목 시각화 동시 확보',
    ],
    stack: ['Fastify', 'Node.js', 'TypeScript', 'AWS Aurora', 'AWS Valkey', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Pyroscope'],
    metrics: [
      { label: '처리 트래픽', value: '초당 300~1000건 안정 처리' },
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
}
