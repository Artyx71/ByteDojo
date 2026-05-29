'use client'

import { useRouter } from 'next/navigation'
import type { Scenario } from '@/entities/scenario/model'
import type { Stats } from '@/entities/profile/model'
import { useSessionStore } from '@/entities/session/model/store'
import { TopNav } from '@/widgets/top-nav'
import { Badge } from '@/shared/ui'
import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

interface DashboardViewProps {
  stats: Stats
  scenarios: Scenario[]
}

export function DashboardView({ stats, scenarios }: DashboardViewProps) {
  const router = useRouter()
  const { session, scenario: activeScenario, completedScenarioIds } = useSessionStore()

  const completedSet = new Set(completedScenarioIds)
  const completedCount = completedScenarioIds.length

  const resumeScenario = session && activeScenario && session.status === 'active'
    ? activeScenario
    : null

  const quickStart = scenarios
    .filter((s) => s.difficulty === 'easy' && !completedSet.has(s.id))
    .slice(0, 3)

  return (
    <div className="h-full flex flex-col">
      <TopNav />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-12">

          {/* Hero */}
          <div className="mb-10">
            <h1 className="font-mono text-3xl text-[var(--text-1)] mb-2 flex items-center gap-1">
              ByteDojo
              <span className="inline-block w-[3px] h-8 bg-[var(--accent)] ml-1 animate-pulse" />
            </h1>
            <p className="font-mono text-xs text-[var(--text-3)]">
              {stats.currentStreak}d streak&nbsp;&nbsp;·&nbsp;&nbsp;
              {stats.accuracyPercent}% accuracy&nbsp;&nbsp;·&nbsp;&nbsp;
              {completedCount} scenarios done
            </p>
          </div>

          {/* Terminal status block */}
          <div className="font-mono text-xs bg-[var(--bg)] border border-[var(--border)] rounded p-4 mb-10">
            <div className="mb-2">
              <span className="text-[var(--accent)]">$&nbsp;</span>
              <span className="text-[var(--text-3)]">bytedojo status</span>
            </div>
            <div className="flex flex-col gap-1 text-[var(--text-3)] pl-4">
              <StatusLine label="streak"    value={`${stats.currentStreak} days`} />
              <StatusLine label="completed" value={`${completedCount} scenarios`} />
              <StatusLine label="accuracy"  value={`${stats.accuracyPercent}%`} />
              <StatusLine label="keystrokes" value={String(stats.totalKeystrokes)} />
              {resumeScenario && (
                <StatusLine label="active" value={resumeScenario.id} accent />
              )}
            </div>
            <div className="mt-3">
              <span className="text-[var(--accent)]">$&nbsp;</span>
              <span className="inline-block w-[6px] h-3 bg-[var(--accent)] animate-pulse align-middle" />
            </div>
          </div>

          {/* Resume */}
          {resumeScenario && (
            <section className="mb-8">
              <SectionLabel>pick up where you left off</SectionLabel>
              <ScenarioRow
                scenario={resumeScenario}
                cta="continue →"
                onClick={() => router.push(routes.session(resumeScenario.id))}
              />
            </section>
          )}

          {/* Quick start */}
          {quickStart.length > 0 && (
            <section>
              <SectionLabel>quick start</SectionLabel>
              <div className="flex flex-col gap-2">
                {quickStart.map((s) => (
                  <ScenarioRow
                    key={s.id}
                    scenario={s}
                    onClick={() => router.push(routes.session(s.id))}
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  )
}

function StatusLine({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex gap-4">
      <span className="w-24 shrink-0">{label}</span>
      <span className={accent ? 'text-[var(--accent)]' : 'text-[var(--text-2)]'}>{value}</span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-3">
      {children}
    </p>
  )
}

function ScenarioRow({
  scenario,
  cta,
  onClick,
}: {
  scenario: Scenario
  cta?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-between w-full',
        'px-3 py-2.5 rounded border border-[var(--border)]',
        'bg-[var(--surface)] hover:border-[var(--text-3)]',
        'transition-colors duration-150 text-left'
      )}
    >
      <span className="font-mono text-xs text-[var(--text-2)]">{scenario.title}</span>
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant={scenario.difficulty === 'easy' ? 'muted' : 'warning'}>
          {scenario.difficulty}
        </Badge>
        {cta && (
          <span className="font-mono text-[10px] text-[var(--accent)]">{cta}</span>
        )}
      </div>
    </button>
  )
}
