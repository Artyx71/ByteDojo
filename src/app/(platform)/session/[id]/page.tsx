import { notFound } from 'next/navigation'
import { scenarioService } from '@/services/scenarios'
import { sessionService } from '@/services/sessions'
import { stripScenarioFunctions, stripAllScenarioFunctions } from '@/shared/lib'
import { SessionView } from './SessionView'

interface SessionPageProps {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params

  const [scenario, allScenarios, sessions] = await Promise.all([
    scenarioService.getById(id),
    scenarioService.getAll(),
    sessionService.getAll(),
  ])

  if (!scenario) notFound()

  const completedScenarioIds = new Set(
    sessions.filter((s) => s.status === 'completed').map((s) => s.scenarioId)
  )

  return (
    <SessionView
      scenario={stripScenarioFunctions(scenario)}
      allScenarios={stripAllScenarioFunctions(allScenarios)}
      completedScenarioIds={completedScenarioIds}
    />
  )
}
