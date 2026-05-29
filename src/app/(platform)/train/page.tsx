import { scenarioService } from '@/services/scenarios'
import { stripAllScenarioFunctions } from '@/shared/lib'
import { TrainView } from './TrainView'

export default async function TrainPage() {
  const scenarios = await scenarioService.getAll()

  return (
    <TrainView scenarios={stripAllScenarioFunctions(scenarios)} />
  )
}
