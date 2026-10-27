import { education, experiences, philosophy, profile, skills } from '../data/profile'
import { visibleProjects } from '../data/projects'
import type { Achievement, Project } from '../data/types'
import { formatPeriod } from '../utils/date'
import { withPlaceholders } from '../utils/placeholder'

// v2: 1장은 '누구인지·어떤 생각으로 일하는지·핵심 수치'만 보여주는 요약, 2장부터 XYZ 상세

const SITE_URL = 'https://paikpaik.github.io'

const workProjects = visibleProjects.filter((p) => !p.personal && p.achievements?.length)
const personalProjects = visibleProjects.filter((p) => p.personal && p.achievements?.length)

// A4 인쇄 기준 레이아웃. 화면에서는 종이처럼 가운데 정렬하고, 인쇄 시에는 여백·배경을 걷어낸다.
const printStyles = `
  @page { size: A4; margin: 14mm 16mm; }
  @media print {
    body { background: #fff !important; }
    .no-print { display: none !important; }
    .paper { box-shadow: none !important; margin: 0 !important; padding: 0 !important; max-width: none !important; }
    .page-break { break-before: page; }
  }
`

const FONT = "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"

const period = (start: string, end?: string) => `${start} – ${end ?? '현재'}`

const contacts = [
  { label: 'Phone', value: profile.phone },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github },
  { label: 'Portfolio', value: SITE_URL.replace('https://', ''), href: SITE_URL },
]

export default function Resume() {
  return (
    <>
      <style>{printStyles}</style>

      <div className="no-print sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[210mm] items-center justify-between px-4 py-3 text-sm">
          <a href="/" className="text-neutral-500 hover:text-blue-500">
            ← 프로젝트 상세 페이지
          </a>
          <button
            onClick={() => window.print()}
            className="rounded-full bg-blue-500 px-4 py-1.5 font-semibold text-white hover:bg-blue-600"
          >
            PDF로 저장
          </button>
        </div>
      </div>

      <main
        className="paper mx-auto my-8 max-w-[210mm] bg-white px-[16mm] py-[14mm] text-[13px] leading-[1.6] text-neutral-700 shadow-sm"
        style={{ fontFamily: FONT, wordBreak: 'keep-all' }}
      >
        {/* ───── 1장: 요약 ───── */}
        <ResumeHeader />

        <ResumeSection title="개발 철학">
          <ul className="grid grid-cols-3 gap-3">
            {philosophy.map((p) => (
              <li key={p.heading} className="rounded-md border border-blue-100 px-3 py-2.5">
                <p className="font-bold text-neutral-900">{p.heading}</p>
                <p className="mt-1 text-[12px] leading-[1.55] text-neutral-600">{p.body}</p>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="경력 요약" hint="문제 상황과 해결 과정은 다음 장 ‘프로젝트 상세’에 정리했습니다">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <CompanyBar company={exp.company} role={exp.role} period={formatPeriod(exp.start, exp.end)} />
              <ul className="mt-3 grid grid-cols-2 gap-2.5">
                {workProjects.map((p) => (
                  <SummaryRow key={p.id} project={p} />
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        {/* ───── 2장~: 상세 ───── */}
        <div className="page-break">
          <ResumeSection title="프로젝트 상세" first>
            <div className="space-y-6">
              {workProjects.map((p) => (
                <ProjectBlock key={p.id} project={p} />
              ))}
            </div>
          </ResumeSection>
        </div>

        {personalProjects.length > 0 && (
          <div className="page-break">
            <ResumeSection title="개인 프로젝트" first>
              <div className="space-y-6">
                {personalProjects.map((p) => (
                  <ProjectBlock key={p.id} project={p} />
                ))}
              </div>
            </ResumeSection>
          </div>
        )}

        <ResumeSection title="기술">
          <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1">
            {skills.map((group) => (
              <div key={group.category} className="contents">
                <dt className="font-semibold text-neutral-900">{group.category}</dt>
                <dd>{withPlaceholders(group.items.join(', '))}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title="학력">
          {education.map((edu) => (
            <div key={edu.school} className="flex items-baseline justify-between gap-4">
              <p>
                <span className="font-semibold text-neutral-900">{edu.school}</span>
                <span className="ml-2 text-neutral-500">
                  {edu.major} · {edu.degree}
                </span>
              </p>
              <span className="shrink-0 text-[12px] text-neutral-500">{period(edu.start, edu.end)}</span>
            </div>
          ))}
        </ResumeSection>
      </main>
    </>
  )
}

function ResumeHeader() {
  return (
    <header>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-[30px] font-bold leading-none tracking-tight text-neutral-900">{profile.name}</h1>
          <p className="mt-2 text-[15px] font-semibold text-blue-600">{profile.role}</p>
        </div>
        <dl className="grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 text-[12px]">
          {contacts.map((c) => (
            <div key={c.label} className="contents">
              <dt className="font-semibold text-blue-600">{c.label}</dt>
              <dd className="text-neutral-700">
                {c.href ? (
                  <a href={c.href} className="hover:underline">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-5 space-y-1 border-l-[3px] border-blue-500 pl-4 text-[13px] text-neutral-800">
        {profile.summary.split('\n').map((line, i) => (
          <li key={i}>{withPlaceholders(line)}</li>
        ))}
      </ul>
    </header>
  )
}

function ResumeSection({
  title,
  first,
  hint,
  children,
}: {
  title: string
  first?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className={first ? '' : 'mt-7'}>
      <h2 className="mb-4 flex items-center gap-3 text-[15px] font-bold text-blue-600">
        {title}
        <span className="h-px flex-1 bg-blue-100" />
        {hint && <span className="text-[11px] font-normal text-neutral-400">{hint}</span>}
      </h2>
      {children}
    </section>
  )
}

function CompanyBar({ company, role, period }: { company: string; role: string; period: string }) {
  return (
    <div className="flex items-baseline justify-between rounded-md bg-blue-50 px-3 py-2">
      <p>
        <span className="text-[16px] font-bold text-neutral-900">{company}</span>
        <span className="ml-2 text-neutral-500">{role}</span>
      </p>
      <span className="text-[12px] text-neutral-500">{period}</span>
    </div>
  )
}

// 1장 경력 요약의 한 칸: 프로젝트명·역할 + 핵심 지표 (headline을 ', ' 단위로 끊어 한 줄에 하나씩)
function SummaryRow({ project }: { project: Project }) {
  const metrics = project.headline?.split(', ') ?? []

  return (
    <li className="break-inside-avoid rounded-md bg-neutral-50 px-3.5 py-2.5">
      <p className="text-[13px] font-bold leading-snug text-neutral-900">{project.name}</p>
      {project.role && (
        <p className="mt-0.5 text-[11px] font-medium text-neutral-400">{withPlaceholders(project.role)}</p>
      )}
      <ul className="mt-1.5 space-y-0.5">
        {metrics.map((m) => (
          <li
            key={m}
            className="relative pl-3 text-[12.5px] font-semibold leading-snug text-blue-600 before:absolute before:left-0 before:content-['›']"
          >
            {withPlaceholders(m)}
          </li>
        ))}
      </ul>
    </li>
  )
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[14.5px] font-bold text-neutral-900">{project.name}</h3>
        <span className="shrink-0 text-[12px] text-neutral-500">{period(project.start, project.end)}</span>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px] text-neutral-500">
        {project.role && (
          <span className="rounded bg-blue-50 px-1.5 py-px font-semibold text-blue-700">
            {withPlaceholders(project.role)}
          </span>
        )}
        <span>{project.stack.slice(0, 5).join(' · ')}</span>
      </p>
    </div>
  )
}

function ProjectBlock({ project }: { project: Project }) {
  const [first, ...rest] = project.achievements ?? []

  return (
    // 인쇄 시 제목만 페이지 끝에 남지 않도록 제목과 첫 번째 성과를 한 덩어리로 묶는다
    <article>
      <div className="break-inside-avoid">
        <ProjectHeader project={project} />
        {first && (
          <ul className="mt-3">
            <AchievementItem achievement={first} />
          </ul>
        )}
      </div>
      {rest.length > 0 && (
        <ul className="mt-3 space-y-3">
          {rest.map((a, i) => (
            <AchievementItem key={i} achievement={a} />
          ))}
        </ul>
      )}
    </article>
  )
}

// X(성과)·Y(수치)·Z(행동)를 한 줄씩 나눠 3단으로 읽히게 배치
function AchievementItem({ achievement: { x, y, z } }: { achievement: Achievement }) {
  return (
    <li className="relative break-inside-avoid pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-500">
      <p className="font-semibold text-neutral-900">{withPlaceholders(x)}</p>
      <p className="mt-0.5 font-semibold text-blue-600">{withPlaceholders(y)}</p>
      <p className="mt-0.5 text-neutral-600">{withPlaceholders(z)}</p>
    </li>
  )
}
