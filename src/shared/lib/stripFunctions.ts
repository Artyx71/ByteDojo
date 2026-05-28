import type { Scenario } from '@/entities/scenario/model'

export function stripScenarioFunctions(scenario: Scenario): Scenario {
  return {
    ...scenario,
    steps: scenario.steps.map(({ validate: _, ...step }) => step),
  }
}

export function stripAllScenarioFunctions(scenarios: Scenario[]): Scenario[] {
  return scenarios.map(stripScenarioFunctions)
}
