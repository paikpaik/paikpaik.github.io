import type { Project } from '../types'

export const fastifyMigration: Project = {
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
}
