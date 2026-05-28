'use client'

import { useEffect } from 'react'
import type { Scenario } from '@/entities/scenario/model'
import { useSessionStore } from '@/entities/session/model/store'
import { SessionHeader } from '@/widgets/session-header'
import { ScenarioSidebar } from '@/widgets/scenario-sidebar'
import { TerminalPanel } from '@/widgets/terminal-panel'
import { TaskPanel } from '@/widgets/task-panel'
import { MetricsBar } from '@/widgets/metrics-bar'

interface SessionViewProps {
  scenario: Scenario
  allScenarios: Scenario[]
  completedScenarioIds: Set<string>
}

export function SessionView({ scenario, allScenarios, completedScenarioIds }: SessionViewProps) {
  const { startSession, session } = useSessionStore()

  useEffect(() => {
    if (session?.scenarioId !== scenario.id) {
      startSession(scenario)
    }
  }, [scenario.id])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <SessionHeader />

      <div className="flex flex-1 overflow-hidden">
        <ScenarioSidebar
          scenarios={allScenarios}
          activeScenarioId={scenario.id}
          completedScenarioIds={completedScenarioIds}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TerminalPanel />
          <MetricsBar />
        </div>

        <TaskPanel />
      </div>
    </div>
  )
}
