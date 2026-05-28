import { mockScenarios } from '@/mocks/scenarios'
import type { Scenario } from '@/entities/scenario/model'

export const scenarioService = {
  getAll: async (): Promise<Scenario[]> => {
    return mockScenarios
  },

  getById: async (id: string): Promise<Scenario | null> => {
    return mockScenarios.find((s) => s.id === id) ?? null
  },

  getByCategory: async (category: string): Promise<Scenario[]> => {
    return mockScenarios.filter((s) => s.category === category)
  },
}
