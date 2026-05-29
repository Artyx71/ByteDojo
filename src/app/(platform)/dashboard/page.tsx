import { statsService } from '@/services/stats'
import { scenarioService } from '@/services/scenarios'
import { stripAllScenarioFunctions } from '@/shared/lib'
import { DashboardView } from './DashboardView'

export default async function DashboardPage() {
  const [stats, scenarios] = await Promise.all([
    statsService.get(),
    scenarioService.getAll(),
  ])

  return (
    <DashboardView
      stats={stats}
      scenarios={stripAllScenarioFunctions(scenarios)}
    />
  )
}
