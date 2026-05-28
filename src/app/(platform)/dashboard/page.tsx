import { statsService } from '@/services/stats'
import { sessionService } from '@/services/sessions'
import { scenarioService } from '@/services/scenarios'
import { stripAllScenarioFunctions } from '@/shared/lib'
import { DashboardView } from './DashboardView'

export default async function DashboardPage() {
  const [stats, recentSessions, scenarios] = await Promise.all([
    statsService.get(),
    sessionService.getRecent(1),
    scenarioService.getAll(),
  ])

  const completedScenarioIds = new Set(
    recentSessions
      .filter((s) => s.status === 'completed')
      .map((s) => s.scenarioId)
  )

  return (
    <DashboardView
      stats={stats}
      recentSession={recentSessions[0] ?? null}
      scenarios={stripAllScenarioFunctions(scenarios)}
      completedScenarioIds={completedScenarioIds}
    />
  )
}
