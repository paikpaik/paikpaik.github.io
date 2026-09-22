import type { Project } from '../types'

export const obsidianClaudian: Project = {
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
        solution: '공유 JSON 파일을 두 플러그인의 계약으로 삼았다. AI 플러그인은 파일을 직접 읽고 쓰고, 캘린더 플러그인은 파일 변경을 감지해 UI를 자동으로 갱신한다. 공유 코드 없이 파일 포맷만 약속해서 두 플러그인이 독립적으로 배포되어도 공유 데이터가 유지되도록 했다 — 다른 플래너와 차별되는 Planit만의 이점이다.',
        relatedNodes: ['PlanitJSON', 'Planit', 'Claudian'],
      },
      {
        title: '3단계 보안 모드 (Auto·Safe·Plan) 및 bash 블록리스트·볼트 경계 구현',
        status: 'closed',
        problem: 'Obsidian은 로컬 파일시스템에 직접 붙어 있어서 에이전트가 bash를 마음대로 쓰면 볼트 밖 파일을 건드리거나 위험한 명령을 실행하는 걸 막을 방법이 없었다. SDK의 권한 모델은 도구 실행 여부를 허용할지만 물을 뿐, 명령어 안에 어떤 경로가 들어있는지는 보지 않았다.',
        solution: '명령어를 문자열로 대충 비교하는 대신 실제로 파싱했다. `$(...)`/백틱 서브셸을 먼저 재귀적으로 뽑아 안의 명령까지 검사하고, `&&`/`||`/`;`/`|`로 명령어를 세그먼트 단위로 쪼개 각각 독립적으로 분석했다. 세그먼트마다 `sudo`/`env` 같은 래퍼와 앞쪽 `KEY=VALUE` 환경변수 할당을 건너뛰어 실제 명령어를 찾고, `cp`/`mv`/`rsync`처럼 목적지 인자가 명확한 명령은 마지막 경로 인자를 쓰기 대상으로 판단했다. `>`, `>>`, `-o파일`, `--output=파일` 같은 리다이렉션·출력 옵션도 정규식으로 잡아 읽기/쓰기를 구분하고, 각 경로 토큰이 볼트 안인지 허용된 export/context 경로인지 대조해 벗어난 접근을 차단했다. 심볼릭 링크는 대상이 아직 존재하지 않는 신규 파일이어도 가장 가까운 존재하는 상위 경로까지는 실제 경로로 풀어서 재조합하는 방식으로 경계 우회를 막았다. 이 검사 위에 실행 권한 자체를 Auto/Safe/Plan 3단계로 나눴다.',
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
}
