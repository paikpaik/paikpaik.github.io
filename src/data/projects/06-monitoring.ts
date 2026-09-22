import type { Project } from '../types'

export const monitoring: Project = {
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
}
