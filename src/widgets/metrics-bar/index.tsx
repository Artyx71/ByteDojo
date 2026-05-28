'use client'

import { useSessionStore } from '@/entities/session/model/store'
import { Kbd } from '@/shared/ui'
import { cn } from '@/shared/lib'

interface MetricsBarProps {
  className?: string
}

function calcAccuracy(stepResults: ReturnType<typeof useSessionStore.getState>['stepResults']): number {
  if (stepResults.length === 0) return 100
  const correct = stepResults.filter((r) => r.correct).length
  return Math.round((correct / stepResults.length) * 100)
}

function calcAvgTime(stepResults: ReturnType<typeof useSessionStore.getState>['stepResults']): string {
  const completed = stepResults.filter((r) => r.correct)
  if (completed.length === 0) return '—'
  const avg = completed.reduce((sum, r) => sum + r.timeMs, 0) / completed.length
  return `${(avg / 1000).toFixed(1)}s`
}

function calcKeystrokes(stepResults: ReturnType<typeof useSessionStore.getState>['stepResults']): number {
  return stepResults.reduce((sum, r) => sum + r.keystrokes, 0)
}

export function MetricsBar({ className }: MetricsBarProps) {
  const { keystrokeHistory, stepResults, hintsUsed } = useSessionStore()

  const accuracy = calcAccuracy(stepResults)
  const avgTime = calcAvgTime(stepResults)
  const totalKeystrokes = calcKeystrokes(stepResults)

  return (
    <div
      className={cn(
        'flex flex-col border-t border-[var(--border)] bg-[var(--surface)]',
        className
      )}
    >
      {/* KEY HISTORY */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] shrink-0">
          key history
        </span>

        <div className="flex items-center gap-1 flex-1 overflow-hidden">
          {keystrokeHistory.length === 0 ? (
            <span className="font-mono text-[10px] text-[var(--text-3)]">
              no input yet
            </span>
          ) : (
            keystrokeHistory.map((key, i) => (
              <Kbd
                key={i}
                className={cn(
                  'transition-opacity duration-150',
                  i === keystrokeHistory.length - 1
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'opacity-50'
                )}
              >
                {key}
              </Kbd>
            ))
          )}
        </div>

        {keystrokeHistory.length > 0 && (
          <span className="font-mono text-[10px] text-[var(--text-3)] shrink-0">
            {keystrokeHistory.length} keys
          </span>
        )}
      </div>

      {/* METRICS */}
      <div className="flex items-center gap-6 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] shrink-0">
          metrics
        </span>

        <Metric label="accuracy" value={`${accuracy}%`} highlight={accuracy === 100} />
        <Metric label="keystrokes" value={String(totalKeystrokes)} />
        <Metric label="avg time" value={avgTime} />
        <Metric label="hints" value={String(hintsUsed)} highlight={hintsUsed === 0} />
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] text-[var(--text-3)]">{label}</span>
      <span
        className={cn(
          'font-mono text-xs tabular-nums',
          highlight ? 'text-[var(--accent)]' : 'text-[var(--text-1)]'
        )}
      >
        {value}
      </span>
    </div>
  )
}
