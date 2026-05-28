import { notFound } from 'next/navigation'
import { scenarioService } from '@/services/scenarios'
import { stripScenarioFunctions, stripAllScenarioFunctions } from '@/shared/lib'
import { SessionView } from './SessionView'

interface SessionPageProps {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params

  const [scenario, allScenarios] = await Promise.all([
    scenarioService.getById(id),
    scenarioService.getAll(),
  ])

  if (!scenario) notFound()

  return (
    <SessionView
      scenario={stripScenarioFunctions(scenario)}
      allScenarios={stripAllScenarioFunctions(allScenarios)}
    />
  )
}
