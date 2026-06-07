'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import type { Scenario } from '@/entities/scenario/model'
import { useSessionStore } from '@/entities/session/model/store'
import { routes } from '@/shared/config/routes'
import { formatTimeShort } from '@/shared/lib'

interface SessionCompleteProps {
  scenario: Scenario
  allScenarios: Scenario[]
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-6 py-4 border-r border-[var(--border)] last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">
        {label}
      </span>
      <span className="font-mono text-2xl text-[var(--text-1)] tabular-nums">{value}</span>
    </div>
  )
}

export function SessionComplete({ scenario, allScenarios }: SessionCompleteProps) {
  const router = useRouter()
  const { stepResults, completedScenarioIds } = useSessionStore()

  const completedSet   = new Set(completedScenarioIds)
  const correctResults = stepResults.filter((r) => r.correct)
  const accuracy       = stepResults.length
    ? Math.round((correctResults.length / stepResults.length) * 100)
    : 100
  const keystrokes     = stepResults.reduce((s, r) => s + r.keystrokes, 0)
  const avgTime        = correctResults.length
    ? formatTimeShort(Math.round(correctResults.reduce((s, r) => s + r.timeMs, 0) / correctResults.length))
    : '—'
  const hints          = stepResults.reduce((s, r) => s + r.hintsUsed, 0)

  const nextScenario = allScenarios.find(
    (s) => s.category === scenario.category && s.id !== scenario.id && !completedSet.has(s.id)
  ) ?? null

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 size={18} className="text-[var(--accent)] shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
            completed
          </span>
        </div>
        <h2 className="font-sans text-xl text-[var(--text-1)] mb-8 leading-snug">
          {scenario.title}
        </h2>

        {/* Stats row */}
        <div className="flex border border-[var(--border)] rounded bg-[var(--surface)] mb-8">
          <StatBlock label="accuracy"   value={`${accuracy}%`} />
          <StatBlock label="keystrokes" value={String(keystrokes)} />
          <StatBlock label="avg / step" value={avgTime} />
          <StatBlock label="hints"      value={String(hints)} />
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {nextScenario && (
            <button
              onClick={() => router.push(routes.session(nextScenario.id))}
              className="flex items-center justify-between w-full px-4 py-3 rounded border border-[var(--accent)] bg-[var(--accent)]/5 text-left hover:bg-[var(--accent)]/10 transition-colors duration-150"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest">
                  next up
                </span>
                <span className="font-mono text-sm text-[var(--text-1)]">
                  {nextScenario.title}
                </span>
              </div>
              <span className="font-mono text-sm text-[var(--accent)]">→</span>
            </button>
          )}

          <button
            onClick={() => router.push(routes.train)}
            className="font-mono text-xs text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150 text-left px-1"
          >
            ← back to train
          </button>
        </div>

      </div>
    </div>
  )
}
