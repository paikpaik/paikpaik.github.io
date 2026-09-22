import type { Project } from '../types'

export const partnerAdmin: Project = {
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
}
