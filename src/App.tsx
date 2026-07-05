import { useEffect, useState } from 'react'
import Header from './components/Header'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Troubleshooting from './components/Troubleshooting'
import Education from './components/Education'
import ProjectDetail from './components/ProjectDetail'
import IssueDetail from './components/IssueDetail'
import type { Issue, Project } from './data/resume'

type View = 'projects' | 'troubleshooting'
type SelectedIssue = { project: Project; issue: Issue }

export default function App() {
  const [view, setView] = useState<View>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<SelectedIssue | null>(null)

  const handleChangeView = (next: View) => {
    setView(next)
    setSelectedProject(null)
    setSelectedIssue(null)
  }

  const handleSelectProject = (project: Project) => {
    setSelectedIssue(null)
    setSelectedProject((prev) =>
      prev?.name === project.name ? null : project,
    )
  }

  const handleSelectIssue = (project: Project, issue: Issue) => {
    setSelectedProject(null)
    setSelectedIssue((prev) =>
      prev && prev.project.id === project.id && prev.issue.title === issue.title
        ? null
        : { project, issue },
    )
  }

  const handleClose = () => {
    setSelectedProject(null)
    setSelectedIssue(null)
  }

  const panelOpen = !!selectedProject || !!selectedIssue

  useEffect(() => {
    if (!panelOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [panelOpen])

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6">
          <div className="divide-y divide-neutral-100">
            <Experience />

            <section className="py-10">
              <div className="mb-6 flex items-center gap-2">
                {(['projects', 'troubleshooting'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => handleChangeView(v)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      view === v
                        ? 'bg-blue-500 text-white'
                        : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                    }`}
                  >
                    {v === 'projects' ? 'Projects' : 'Troubleshooting'}
                  </button>
                ))}
                <span className="ml-1 text-xs text-neutral-400">
                  {view === 'projects'
                    ? '클릭시 프로젝트의 상세 내용을 확인하실 수 있습니다.'
                    : '클릭시 이슈의 상세 내용과 관련 아키텍처를 확인하실 수 있습니다.'}
                </span>
              </div>
              {view === 'projects' ? (
                <Projects selected={selectedProject} onSelect={handleSelectProject} />
              ) : (
                <Troubleshooting selected={selectedIssue} onSelect={handleSelectIssue} />
              )}
            </section>

            <Skills />
            <Education />
          </div>
        </main>
        <footer className="mt-16 border-t border-neutral-100 py-8">
          <p className="text-center text-xs text-neutral-400">
            © 2026 노재열 · Built with React & Tailwind
          </p>
        </footer>
      </div>

      {/* 배경 딤 처리 */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-in-out ${
          panelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* 상세 패널: 화면 4분의 3을 덮는 슬라이드 오버레이 */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-3/4 ${
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={handleClose} />
        )}
        {selectedIssue && (
          <IssueDetail
            project={selectedIssue.project}
            issue={selectedIssue.issue}
            onClose={handleClose}
          />
        )}
      </div>
    </>
  )
}
