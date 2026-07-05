import type { ProjectLabel } from '../data/resume'

export const labelStyle: Record<ProjectLabel, { base: string; selected: string }> = {
  Dev:        { base: 'bg-blue-50 text-blue-500',       selected: 'bg-blue-500 text-white' },
  Monitoring: { base: 'bg-indigo-50 text-indigo-600',   selected: 'bg-indigo-500 text-white' },
  SDK:        { base: 'bg-amber-50 text-amber-600',      selected: 'bg-amber-500 text-white' },
  WebApp:     { base: 'bg-emerald-50 text-emerald-600',  selected: 'bg-emerald-500 text-white' },
  LLM:        { base: 'bg-purple-50 text-purple-500',    selected: 'bg-purple-500 text-white' },
}
