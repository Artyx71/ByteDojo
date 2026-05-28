import { notFound } from 'next/navigation'
import { scenarioService } from '@/services/scenarios'
import type { Scenario } from '@/entities/scenario/model'
import { SessionView } from './SessionView'

interface SessionPageProps {
  params: Promise<{ id: string }>
}

function stripFunctions(scenario: Scenario): Scenario {
  return {
    ...scenario,
    steps: scenario.steps.map(({ validate: _, ...step }) => step),
  }
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
      scenario={stripFunctions(scenario)}
      allScenarios={allScenarios.map(stripFunctions)}
    />
  )
}
