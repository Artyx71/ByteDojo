'use client'

import { useEffect } from 'react'
import type { Scenario } from '@/entities/scenario/model'
import { useSessionStore } from '@/entities/session/model/store'
import { SessionHeader } from '@/widgets/session-header'
import { ScenarioSidebar } from '@/widgets/scenario-sidebar'
import { TaskPanel } from '@/widgets/task-panel'
import { MetricsBar } from '@/widgets/metrics-bar'

interface SessionViewProps {
  scenario: Scenario
  allScenarios: Scenario[]
}

export function SessionView({ scenario, allScenarios }: SessionViewProps) {
  const { startSession, status } = useSessionStore()

  useEffect(() => {
    if (status === 'idle') {
      startSession(scenario)
    }
  }, [scenario, status, startSession])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <SessionHeader />

      <div className="flex flex-1 overflow-hidden">
        <ScenarioSidebar
          scenarios={allScenarios}
          activeScenarioId={scenario.id}
        />

        {/* Terminal placeholder */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg)]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--text-3)]">terminal</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <span className="font-mono text-xs text-[var(--text-3)]">
              terminal engine — coming soon
            </span>
          </div>

          <MetricsBar />
        </div>

        <TaskPanel />
      </div>
    </div>
  )
}
