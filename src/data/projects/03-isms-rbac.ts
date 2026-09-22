import type { Project } from '../types'

export const ismsRbac: Project = {
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
        problem: 'AWS IAM 권한관리시스템을 참고해서 개인권한과 그룹권한을 각각 지정할 수 있게 만들었는데, 구현하다 보니 두 권한이 겹칠 때 어느 쪽을 기준으로 삼을지 정해야 하는 순간이 있었다. 개인 추가 권한과 그룹 권한을 단순히 합치면, 그룹 권한 설계가 느슨할 경우 의도보다 넓은 권한이 부여될 수 있는 구조였다.',
        solution: '그룹 안에서 특정 인원에게만 예외적으로 권한을 추가하는 상황을 단순하게 처리하기 위해 개인 역할 경로와 그룹 역할 경로를 합산하는(UNION) 방식을 택했다. 합산 방식 자체는 권한이 과도하게 누적될 여지가 있지만, 그룹 권한을 해당 그룹에 꼭 필요한 최소 권한으로 제한해서 설계하면 문제가 되지 않는다고 판단했다. 권한 조회 쿼리에서 두 경로의 결과를 합치고 중복은 제거해 실효 권한 집합을 구성한다.',
        relatedNodes: ['Acc', 'Grp', 'Role', 'Perm'],
      },
      {
        title: 'JWT private key → AWS Secrets Manager 이관',
        status: 'closed',
        problem: '레포지토리 자체는 프라이빗이었지만 위험 경고 메일을 받으면서, 전사적으로 민감한 키 파일을 저장소나 서버 파일시스템에 직접 두지 않고 AWS Secrets Manager로 관리하기로 방침이 정해졌다. 이 프로젝트도 JWT 서명용 private.key가 서버 파일시스템에 그대로 있었고, 키를 교체하려면 전체 서버를 재배포해야 하는 구조였다.',
        solution: 'AWS Secrets Manager에 private key를 저장하고 서버 시작 시 API로 가져오도록 변경했다. 이후로는 키 교체가 필요할 때 서버 재배포 없이 Secrets Manager에서 단독으로 처리할 수 있게 됐다.',
        relatedNodes: ['App', 'SM'],
        impact: '키 교체 시 서버 재배포 불필요',
      },
      {
        title: '전체 관리자 API 호출 Audit Trail — 조회 행위까지 포함해 자동 기록',
        status: 'closed',
        problem: 'RBAC 기반 권한 관리를 추가하면서, 어느 직원이 실제로 어떤 어드민 작업을 했는지 파악할 방법이 없다는 것도 같이 눈에 들어왔다. 권한을 세밀하게 나눠봤자 누가 그 권한으로 뭘 했는지 사후에 확인할 수 없으면 의미가 반감되는 상황이었다.',
        solution: 'Restify 미들웨어 레이어에서 모든 API 요청을 가로채 요청자·경로·메서드·바디를 DB에 자동 기록하도록 만들었다. 조회 행위까지 포함해서 전체 액션을 추적할 수 있게 했다. 로그성 데이터라 변경이 잦으면 벌크 insert도 고려했지만, 어드민 특성상 호출 빈도가 높지 않을 것으로 판단해서 요청 단위로 바로 저장하는 단순한 방식을 택했다.',
        relatedNodes: ['App', 'DB'],
        impact: '전체 관리자 API 호출을 조회 행위까지 포함해 추적 가능',
      },
      {
        title: 'Permission JWT 클레임 문자열 부분 매칭 취약점 — 숫자 배열 비교로 전환',
        status: 'closed',
        problem: 'QA 과정에서 권한이 없는 기능에 접근되는 사례가 발견됐다. 원인을 확인해보니 권한 목록을 JWT에 쉼표 구분 문자열("1,12,23")로 저장하고 미들웨어에서 .includes(requiredPermission)로 체크하고 있었는데, 권한 ID 1과 12처럼 자릿수가 겹치는 조합에서 문자열 부분 매칭으로 걸려 잘못 통과되는 문제였다.',
        solution: 'JWT 클레임을 문자열 대신 숫자 배열로 바꾸고 검사도 배열 indexOf 비교로 전환했다. 권한 ID가 겹치는 조합이어도 정확히 일치하는 값만 통과하도록 만들어서 문제를 해소했다.',
        relatedNodes: ['App'],
      },
      {
        title: 'OAuth2 x5c 인증서 캐시 무효화 없음 — Redis TTL 만료 설정으로 자동 갱신 처리',
        status: 'closed',
        problem: '출근해서 어드민에 로그인하려는데 안 됐다. 확인해보니 Azure AD의 x5c 인증서를 모듈 메모리에 캐시해두고 만료나 갱신 로직을 따로 두지 않은 상태였다. 인증서가 갱신되면서 캐시된 값이 무효화됐고, 서버를 재시작하기 전까지는 모든 OAuth2 로그인이 실패하는 구조였다.',
        solution: '그 자리에서는 서버를 재배포하면 바로 해결되는 문제였지만, 인증서 갱신 시점을 예측할 수 없어서 같은 장애가 언제 또 터질지 알 수 없는 상황이었다. 그래서 인증서 캐시에 TTL을 설정하고, 검증에 실패하면 캐시를 무효화한 뒤 x5c를 다시 가져오도록 로직을 추가해서 인증서가 갱신되어도 서버 재시작 없이 자동으로 갱신되도록 만들었다.',
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
}
