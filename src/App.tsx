import { useState } from 'react'
import Header from './components/Header'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import ProjectDetail from './components/ProjectDetail'
import type { Project } from './data/resume'

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleSelect = (project: Project) => {
    setSelectedProject((prev) =>
      prev?.name === project.name ? null : project,
    )
  }

  const handleClose = () => setSelectedProject(null)

  return (
    <div className="flex min-h-screen">
      {/* Left: Resume */}
      <div
        className={`flex min-w-0 flex-col transition-all duration-300 ease-in-out ${
          selectedProject ? 'w-1/2' : 'w-full'
        }`}
      >
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6">
          <div className="divide-y divide-neutral-100">
            <Experience />
            <Projects selected={selectedProject} onSelect={handleSelect} />
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

      {/* Right: Project Detail Panel */}
      <div
        className={`sticky top-0 h-screen shrink-0 overflow-hidden border-l border-neutral-200 bg-white transition-all duration-300 ease-in-out ${
          selectedProject ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}
