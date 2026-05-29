'use client'

import { Check } from 'lucide-react'
import type { Scenario } from '@/entities/scenario/model'
import { Badge } from '@/shared/ui'
import { cn } from '@/shared/lib'

interface ScenarioCardProps {
  scenario: Scenario
  done: boolean
  onClick: () => void
}

export function ScenarioCard({ scenario, done, onClick }: ScenarioCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col p-4 rounded text-left',
        'border transition-colors duration-150',
        'bg-[var(--surface-2)]',
        done
          ? 'border-[var(--accent)]/20 hover:border-[var(--accent)]/40'
          : 'border-[var(--border)] hover:border-[var(--text-3)]'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={cn(
          'font-sans text-sm leading-snug',
          done ? 'text-[var(--accent)]' : 'text-[var(--text-1)]'
        )}>
          {scenario.title.replace(/^[^:]+:\s*/, '')}
        </span>
        {done && (
          <Check size={12} className="text-[var(--accent)] shrink-0 mt-0.5" />
        )}
      </div>

      <div className="h-px bg-[var(--border)] rounded mb-3">
        <div
          className="h-full bg-[var(--accent)] rounded transition-all"
          style={{ width: done ? '100%' : '0%' }}
        />
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant={
            scenario.difficulty === 'easy'   ? 'muted'   :
            scenario.difficulty === 'medium' ? 'warning' : 'danger'
          }
        >
          {scenario.difficulty}
        </Badge>
        <span className="font-mono text-[10px] text-[var(--text-3)]">
          {scenario.estimatedTime}m
        </span>
      </div>
    </button>
  )
}
