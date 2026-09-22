import type { Project } from '../types'

export const forgeEcosystem: Project = {
    id: 11,
    label: 'Dev',
    name: 'forge 시리즈 — 백엔드 공유 모듈 오픈소스 생태계',
    summary: '재사용 가능한 백엔드 공유 모듈(node-forge, kafka-forge)을 만들고, 실제 아키텍처 실험(forgeLab)으로 검증하며 발견한 버그를 실제 버전업까지 반영한 오픈소스 생태계',
    start: '2026.07',
    description: [
      'node-forge: NestJS/Fastify 공용 모듈 12종(core·response·logger·redis·database·http·events·metrics·versioning·health·auth·grpc)을 GitHub Packages로 배포 — 프레임워크 무관 코어와 NestJS/Fastify 어댑터를 분리',
      'kafka-forge: 토픽 네이밍 컨벤션, Event Contract, Zod 스키마 검증, 재시도+DLQ, 멱등성(claim/release), Outbox 패턴, OTel 트레이싱, Prometheus 메트릭, 폴리글랏 JSON Schema 내보내기를 표준 제공하는 Kafka 코어 모듈',
      'forgeLab: 두 패키지를 상대경로가 아닌 실제 npm 설치로 검증하는 모노레포 — Redis ZSET 기반 가상 대기열(waiting-room), Kafka 이벤트 기반 실시간 랭킹(live-ranking), TypeORM 기반 Outbox 패턴(order-outbox), gRPC 기반 saga 분산 트랜잭션(msa-checkout), 분산 서킷브레이커 기반 웹훅 릴레이(webhook-relay), Redis 락·pub/sub 기반 실시간 경매(live-auction), 외부 PG 연동 결제 게이트웨이(payment-gateway) 7개 실험 서비스',
      'dashboard(Fastify)로 실험 서비스 기동·상태·아키텍처 문서·이슈 이력을 한 화면에서 관리 — 서비스는 forge-lab.json 선언만으로 대시보드에 자동 등록',
      '실 소비 중 발견한 버그를 proposals/ 제안서로 정리 → 각 패키지 레포에서 직접 반영·배포하는 워크플로 확립, 총 22건의 실전 이슈를 버전별로 추적',
    ],
    stack: ['TypeScript', 'NestJS', 'Fastify', 'KafkaJS', 'Redis', 'Redpanda', 'TypeORM', 'PostgreSQL', 'gRPC', 'WebSocket', 'Zod', 'OpenTelemetry', 'Prometheus'],
    metrics: [
      { label: 'node-forge 버전', value: 'v1.0.10' },
      { label: 'kafka-forge 버전', value: 'v1.0.5' },
      { label: '발견→반영 이슈', value: '22건' },
      { label: '실험 서비스', value: '7개' },
    ],
    issues: [
      {
        title: '패키지 exports 맵 오류 — require()로 전체 서브패스 로드 불가',
        status: 'closed',
        component: 'node-forge',
        problem: 'node-forge를 forgeLab에 처음 붙여보는 중이었다. `npm install`로 설치하고 import하자마자 모듈을 못 찾는다는 식의 에러가 떴는데, 정확한 메시지는 기억이 안 난다. 이것저것 건드려보다가 30분 정도 지나서야 `package.json`의 `exports` 맵이 원인이라는 걸 알아챘다 — `.`, `./core`, `./response/nestjs` 같은 서브패스마다 `require` 조건이 실제로는 존재하지 않는 `.cjs` 파일을 가리키고 있어서, CommonJS로는 아무것도 로드가 안 되는 상태였다.',
        solution: '`require` 조건은 실제 산출물(`.js`)을, `import` 조건은 `.mjs`를 가리키게 exports 맵을 고쳤다. 로컬에서 소스를 직접 import했으면 못 잡았을 버그라서, `npm pack`으로 실제 패키징한 tarball을 설치해 서브패스별로 제대로 로드되는지 확인하는 스모크 테스트를 CI에 추가했다.',
        impact: '스모크 테스트가 통과하는 걸 보고 forgeLab에 실제로 다시 연결해 정상 로드되는 것까지 확인했다 (v1.0.1 반영)',
        relatedNodes: ['Pkg'],
      },
      {
        title: 'tsup 번들 분할로 클래스 중복 생성 — instanceof 매칭 실패로 에러가 500으로 새어나감',
        status: 'closed',
        component: 'node-forge',
        problem: 'exports 맵을 고치고 바로 이어서 테스트하는데 결과가 이상했다. `ForgeExceptionFilter`를 분명히 붙였는데 `ForgeBizError`를 하나도 못 잡고 계속 500으로 떨어졌다. tsup을 `splitting: false`로 빌드하다 보니 `core/index.js`, `response/nestjs/index.js` 같은 엔트리마다 `ForgeBizError` 클래스가 각자 따로 번들링되고 있었다 — 서비스 코드가 던진 인스턴스와 필터가 import한 클래스가 자바스크립트 상으로는 서로 다른 클래스 취급을 받으니 `instanceof`가 당연히 실패할 수밖에 없었다.',
        solution: 'tsup 설정을 `splitting: true`로 바꿔서 공유 청크로 클래스를 단일화했다. 앞서 exports 맵 문제 때 추가해둔 `npm pack` 기반 스모크 테스트가 여기서도 바로 잡아냈다.',
        impact: '재배포 후 다시 붙여서 테스트해보니 500 없이 정상적으로 비즈니스 에러가 잡히는 걸 확인했다 (v1.0.2 반영)',
        relatedNodes: ['Pkg'],
      },
      {
        title: '재고 확인 후 차감의 TOCTOU — 원자적 조건부 UPDATE로 교체',
        status: 'closed',
        component: 'msa-checkout',
        problem: 'saga의 inventory Try 단계를 처음엔 "SELECT로 남은 수량 확인 → 애플리케이션에서 `total - reserved >= qty` 검사 → UPDATE로 예약"이라는 익숙한 2단계로 짰다. inventory-service를 2개 인스턴스로 띄워 다중 인스턴스 정합성을 검증하는 게 이 실험의 핵심 목적인데, 이 방식으로는 두 인스턴스가 거의 동시에 같은 상품을 조회하면 둘 다 통과 조건을 만족한 뒤 각자 UPDATE를 날려서 재고가 마이너스로 내려갈 수 있는 TOCTOU였다.',
        solution: '조회와 검사를 애플리케이션에서 분리하는 대신, `UPDATE inventory SET reserved = reserved + :qty WHERE total - reserved >= :qty`처럼 조건과 갱신을 하나의 원자적 SQL 문으로 합쳤다. 동시에 두 요청이 들어와도 DB 레벨에서 한쪽만 조건을 만족해 영향받은 행이 1건이 되고, 나머지 한쪽은 영향받은 행이 0건이라 자연스럽게 실패로 판정된다. saga의 Try 순서도 order를 inventory보다 먼저 호출하도록 설계했는데, 재고 부족이 이 실험의 핵심 실패 시나리오라서 반드시 그 실패 경로에서 order-service의 CancelOrder(보상) gRPC 호출이 실제로 실행되도록 순서를 맞춘 것이다.',
        impact: '재고 1개에 동시 요청 2건 → 정확히 1건만 성공, 나머지는 CancelOrder 보상 트랜잭션으로 정상 롤백 확인',
        relatedNodes: ['INV1', 'INV2'],
      },
      {
        title: '인메모리 서킷브레이커가 멀티 인스턴스 배달 워커에서 무력화됨',
        status: 'closed',
        component: 'node-forge',
        problem: 'webhook-relay의 delivery-worker를 여러 인스턴스로 스케일해서 특정 엔드포인트로 가는 배달을 인스턴스별로 나눠 처리하게 했더니, node-forge의 `ForgeCircuitBreaker`가 순수 인메모리 클래스라 회로 상태가 프로세스 하나에 갇혀 있다는 게 드러났다. 한 인스턴스가 실패를 3번 겪어 회로를 열어도, 같은 엔드포인트로 가는 다른 인스턴스는 아무것도 모른 채 계속 실패를 두드렸다 — "임계치 도달 시 요청을 막는다"는 circuit breaker 본연의 목적이 인스턴스 수만큼 무력화되는 셈이었다. Kafka 토픽 파티션을 4개로 늘려 delivery-worker 2개 인스턴스가 실제로 서로 다른 파티션을 소비하는 걸 확인한 뒤, 실패 엔드포인트로 이벤트 6건을 동시에 발행해 재현했다.',
        solution: '`redis` 모듈에 `DistributedCircuitBreaker`를 제안했다 — Redis 해시(`{keyPrefix}:{key}`)에 `state/failures/successes/openedAt`을 저장해 여러 인스턴스가 엔드포인트 ID 같은 키 하나당 회로 상태를 공유하게 했고, HALF_OPEN은 영속 저장 없이 "OPEN + resetTimeout 경과"를 읽기 시점에 가상으로 계산해서 half-open 프로브가 실패하면 즉시 재-OPEN되도록 단순화했다. 로컬로 먼저 구현·검증한 뒤 제안서 2건(기본 기능 + `successThreshold`/`onStateChange` 옵션 동등성 addendum)을 같은 날 1.0.10으로 반영시켰고, 로컬 구현을 공식 API로 전량 교체하면서 자체 상태 전이 테스트 6건은 삭제했다.',
        impact: '실제 컨테이너에서 재검증한 결과, 로컬(인스턴스별) 회로였다면 6건 다 실제 HTTP 호출이 나갔어야 하는데 분산 회로 덕분에 최소 1건은 회로 OPEN으로 확실히 막히는 것까지 확인했다 (v1.0.10 반영)',
        relatedNodes: ['RedisMod'],
      },
      {
        title: '재시도가 타임아웃 응답을 가로채 거래가 영원히 멈추는 버그',
        status: 'closed',
        component: 'payment-gateway',
        problem: '실제 Docker 3중 검증 중 `ForgeHttpClient`의 재시도(300ms/600ms 지연)가 fake-pg의 6초짜리 타임아웃 시뮬레이션 도중에 발동하는 상황을 만났다. fake-pg가 `clientReference` 기반 멱등성 체크로 "이미 아는 거래"라고 판단해서 재시도 요청에 즉시 `PROCESSING` 응답을 돌려줬는데, 정작 원래 요청은 여전히 타임아웃 중이었다. 그 결과 거래가 `PENDING`에 `pgTransactionId`만 채워진 채로 남았다 — 이건 진짜 비동기 접수(202)가 아니라 재시도가 우연히 가로챈 응답이라 아무도 웹훅을 보내주지 않는다. 초기 구현은 `reconcile()`이 `IN_DOUBT` 상태만 대상으로 삼고 있어서, 이 거래가 영원히 멈춰 있는 버그가 있었다.',
        solution: '`reconcile()`과 reconciler가 순회하는 대상 목록(`listInDoubt()`)을 `IN_DOUBT`뿐 아니라 "`PENDING`이면서 `pgTransactionId`가 있는" 거래까지 포함하도록 확장했다. PG가 "처리 중"이라고 답한 이상, 그 경로가 웹훅이든 재시도가 우연히 잡아챈 응답이든 상관없이 "누군가는 나중에 확인해야 하는 상태"라는 게 핵심 통찰이었다. 웹훅이 먼저 도착하면 reconciler는 이미 종결 상태라 대상에서 빠지고, reconciler가 먼저 돌면 fake-pg가 아직 `PROCESSING`이라고 답하니 재시도 카운터만 올리고 넘어간다 — 두 경로가 경합해도 서로 덮어쓰지 않는다.',
        impact: '타임아웃율 100% 설정 후 재현 → PaymentReconcilerService(3초 간격)가 자동으로 거래조회해 FAILED로 해소되는 것 확인',
        relatedNodes: ['App', 'FakePg'],
      },
    ],
    architectures: [
      {
        key: 'overview',
        label: '전체 개요',
        diagram: `graph TD
  Dev["개발자"] -->|npm install| NF["node-forge (GitHub Packages)"]
  Dev -->|npm install| KF["kafka-forge (GitHub Packages)"]
  subgraph ForgeLab["forgeLab 모노레포"]
    Dashboard["dashboard :4000 (Fastify)"] -->|Up/Down/Status| WR["waiting-room :3000"]
    Dashboard -->|Up/Down/Status| LR["live-ranking (ingest:3100/aggregator:3101)"]
    Dashboard -->|Up/Down/Status| OO["order-outbox (api:3200/fulfillment:3201)"]
    Dashboard -->|Up/Down/Status| MC["msa-checkout (gateway:3300/orchestrator:3301/order:3302/inventory×2)"]
    Dashboard -->|Up/Down/Status| WH["webhook-relay (ingest:3400/delivery-worker×N)"]
    Dashboard -->|Up/Down/Status| LA["live-auction (app×3: 3500-3502)"]
    Dashboard -->|Up/Down/Status| PGW["payment-gateway (app:3600/fake-pg:3601)"]
  end
  WR -->|설치| NF
  LR -->|설치| NF
  LR -->|설치| KF
  OO -->|설치| NF
  OO -->|설치| KF
  MC -->|설치| NF
  WH -->|설치| NF
  WH -->|설치| KF
  LA -->|설치| NF
  PGW -->|설치| NF
  NF -.->|버그 발견 시 제안서| Proposals["proposals/"]
  KF -.->|버그 발견 시 제안서| Proposals
  Proposals -.->|반영 후 버전업| NF
  Proposals -.->|반영 후 버전업| KF`,
      },
      {
        key: 'node-forge',
        label: 'node-forge',
        diagram: `graph TD
  Core["core (프레임워크 무관 타입/유틸, traceparent 포함)"]
  subgraph Modules["12개 모듈"]
    Response["response"]
    Logger["logger (pino)"]
    RedisMod["redis (ioredis)"]
    Database["database (TypeORM)"]
    Http["http (axios)"]
    Events["events"]
    Metrics["metrics (prom-client)"]
    Versioning["versioning"]
    Health["health"]
    Auth["auth (jsonwebtoken)"]
    Grpc["grpc (round_robin LB 옵션 + 트레이싱 인터셉터)"]
  end
  Pkg["package.json exports / tsup 빌드"]
  Core --> Modules
  Modules -->|서브패스 /nestjs| NestAdapter["NestJS 어댑터"]
  Modules -->|서브패스 /fastify| FastifyAdapter["Fastify 어댑터"]
  NestAdapter --> Services["소비 서비스 (waiting-room 등)"]
  FastifyAdapter --> Services
  Modules -.->|배포 산출물 경로| Pkg`,
      },
      {
        key: 'kafka-forge',
        label: 'kafka-forge',
        diagram: `graph TD
  Contract["defineEvent() Event Contract"] --> Producer["StandardProducer"]
  Contract --> Consumer["StandardConsumer"]
  Producer -->|Zod 검증 후 send| Redpanda[("Redpanda / Kafka")]
  Redpanda -->|subscribe| Consumer
  Consumer -->|재시도 소진| Dlq["<topic>.dlq"]
  Consumer <-->|claim/release| Idem["IdempotencyStore"]
  Outbox["OutboxPublisher"] -->|DB 트랜잭션 이후 발행| Redpanda
  Producer -.->|OTel span| Tracing["분산 트레이싱"]
  Consumer -.->|OTel span| Tracing
  Producer -.->|메트릭| Metrics["Prometheus Registry"]
  Consumer -.->|메트릭| Metrics`,
      },
      {
        key: 'waiting-room',
        label: 'waiting-room',
        diagram: `graph TD
  User["사용자"] -->|panel.html| API["WaitingRoomController"]
  API -->|zadd NX / zrank / zcard| ZSet[("Redis ZSET: queue")]
  Admission["AdmissionService (5초 주기)"] -->|peek 후 성공분만 zrem| ZSet
  Admission -->|입장 토큰 발급| Token["TokenService (HMAC)"]
  Token --> TokenStore[("Redis: admitted:*")]
  NodeForge["node-forge (redis/response/logger/metrics/health)"] -.-> API
  NodeForge -.-> Admission`,
      },
      {
        key: 'live-ranking',
        label: 'live-ranking',
        diagram: `graph TD
  Client["사용자"] -->|POST /leaderboards/:id/events| Ingest["ingest :3100 (Producer)"]
  Ingest -->|StandardProducer.send| Topic[("ranking.score-events.v1")]
  Topic -->|subscribe| Aggregator["aggregator :3101 (Consumer)"]
  Aggregator -->|claim/release 멱등성| IdemStore[("Redis: idempotency:*")]
  Aggregator -->|zincrby| Rank[("Redis ZSET: ranking")]
  Aggregator -->|재시도 소진| Dlq[("...v1.dlq")]
  Dlq -->|subscribe| DlqConsumer["ScoreEventDlqConsumer"]
  DlqConsumer -->|lpush| DlqLog[("Redis LIST: dlq log")]
  KafkaForge["kafka-forge (producer/consumer/idempotency)"] -.-> Ingest
  KafkaForge -.-> Aggregator`,
      },
      {
        key: 'order-outbox',
        label: 'order-outbox',
        diagram: `graph TD
  User["사용자"] -->|panel.html| API["api :3200 (OrdersController/OrdersService)"]
  API -->|같은 트랜잭션으로 커밋| ORDERS[("Postgres: orders")]
  API -->|같은 트랜잭션으로 커밋| OUTBOX[("Postgres: outbox_records")]
  PUB["OutboxPublisherService (@Interval 5초)"] -->|fetchPending| STORE["TypeormOutboxStore"]
  STORE --> OUTBOX
  PUB -->|publish| TOPIC[("Redpanda: order.created.v1")]
  STORE -->|"markPublished / markFailed"| OUTBOX
  DEADAPI["OutboxController (GET /outbox/dead)"] -->|listDead| STORE
  TOPIC -->|subscribe| CONS["fulfillment :3201 (OrderCreatedConsumer)"]
  CONS -->|status='confirmed'| ORDERS
  KafkaForge["kafka-forge (Outbox/Producer/Consumer)"] -.-> PUB
  KafkaForge -.-> CONS`,
      },
      {
        key: 'msa-checkout',
        label: 'msa-checkout',
        diagram: `graph TD
  User["사용자"] -->|HTTP| GW["gateway :3300 (Auth/Checkout/AdminController)"]
  GW -->|"gRPC StartCheckout/GetSagaStatus"| ORCH["orchestrator :3301 (SagaService/SagaProcessorService)"]
  ORCH -->|"gRPC TryOrder/ConfirmOrder/CancelOrder"| ORDER["order-service :3302"]
  ORCH -->|"gRPC TryReserve/ConfirmReserve/CancelReserve (round_robin)"| INV1["inventory-service #1"]
  ORCH -->|"gRPC (round_robin)"| INV2["inventory-service #2"]
  ORDER --> ORDERDB[("Postgres: orders")]
  INV1 --> INVDB[("Postgres: inventory")]
  INV2 --> INVDB
  ORCH --> SAGADB[("Postgres: saga_state")]
  NodeForge["node-forge (auth/grpc/core trace)"] -.-> GW
  NodeForge -.-> ORCH`,
      },
      {
        key: 'webhook-relay',
        label: 'webhook-relay',
        diagram: `graph TD
  Tenant["테넌트(고객사)"] -->|POST /events| Ingest["ingest :3400 (Events/Endpoints/Admin)"]
  Ingest -->|같은 트랜잭션으로 커밋| OutboxTbl[("Postgres: dispatch_outbox_records")]
  OutPub["OutboxPublisherService"] -->|fetchPending| OutboxTbl
  OutPub -->|publish| Topic[("Redpanda: webhook.deliveries.v1")]
  Topic -->|consume| Worker["delivery-worker ×N (DispatchConsumer)"]
  Retry["RetryPollerService (@Interval)"] --> Worker
  Worker -->|"get/hincrby (회로 상태)"| Circuit[("Redis: circuit:{endpointId}")]
  Worker -->|"HTTP POST + HMAC 서명"| Receiver["구독자(웹훅 수신 서버)"]
  NodeForge["node-forge (DistributedCircuitBreaker/auth/http)"] -.-> Worker`,
      },
      {
        key: 'live-auction',
        label: 'live-auction',
        diagram: `graph TD
  Bidder["입찰자 (panel.html)"] -->|REST + WebSocket| A1["app-1"]
  Bidder -->|REST + WebSocket| A2["app-2"]
  Spectator["관전자 (spectator.html)"] -->|WebSocket| A3["app-3"]
  A1 -->|withLock| PG[("Postgres: auctions/bids")]
  A2 --> PG
  A3 --> PG
  A1 -->|"미러 set/get + lock"| Redis[("Redis: current/lock/pub-sub")]
  A2 --> Redis
  A3 --> Redis
  A1 -.->|"publish(auction:events)"| Redis
  Redis -.->|subscribe| A2
  Redis -.->|subscribe| A3
  NodeForge["node-forge (withLock/publish/subscribe)"] -.-> A1`,
      },
      {
        key: 'payment-gateway',
        label: 'payment-gateway',
        diagram: `graph TD
  Merchant["가맹점 콘솔 (panel.html)"] -->|REST| App["app :3600 (결제 API + reconciler)"]
  Widget["체크아웃 위젯 데모"] -->|REST| App
  App -->|"ForgeHttpClient 재시도 + DistributedCircuitBreaker"| FakePg["fake-pg :3601 (테스트 더블)"]
  FakePg -.->|웹훅 콜백| App
  App --> PG[("Postgres: payment_transactions/attempts")]
  App --> Redis[("Redis: circuit:fake-pg")]
  NodeForge["node-forge (http/redis/versioning)"] -.-> App`,
      },
    ],
}
