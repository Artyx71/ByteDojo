import { scenarioService } from '@/services/scenarios'
import { sessionService } from '@/services/sessions'
import { stripAllScenarioFunctions } from '@/shared/lib'
import { TrainView } from './TrainView'

export default async function TrainPage() {
  const [scenarios, sessions] = await Promise.all([
    scenarioService.getAll(),
    sessionService.getAll(),
  ])

  const completedScenarioIds = new Set(
    sessions
      .filter((s) => s.status === 'completed')
      .map((s) => s.scenarioId)
  )

  return (
    <TrainView
      scenarios={stripAllScenarioFunctions(scenarios)}
      completedScenarioIds={completedScenarioIds}
    />
  )
}
