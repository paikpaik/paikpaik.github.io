import { profile } from '../data/resume'

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-end gap-6">
            <img
              src="/profile.png"
              alt="프로필 사진"
              className="h-24 w-24 rounded-full object-cover object-top shadow-sm"
            />
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm font-medium uppercase tracking-widest text-neutral-400">
                {profile.nameEn}
              </p>
              <p className="mt-3 text-lg text-blue-500">{profile.role}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-neutral-500">
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-blue-500"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-500"
            >
              github.com/paikpaik
            </a>
          </div>
        </div>
        <ul className="mt-6 max-w-2xl space-y-1.5">
          {profile.summary.split('\n').map((line, i) => (
            <li key={i} className="flex items-start gap-2.5 text-base leading-relaxed text-neutral-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
