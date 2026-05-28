import { mockSessions } from '@/mocks/sessions'
import type { Session } from '@/entities/session/model'

export const sessionService = {
  getAll: async (): Promise<Session[]> => {
    return mockSessions
  },

  getById: async (id: string): Promise<Session | null> => {
    return mockSessions.find((s) => s.id === id) ?? null
  },

  getByScenario: async (scenarioId: string): Promise<Session[]> => {
    return mockSessions.filter((s) => s.scenarioId === scenarioId)
  },

  getRecent: async (limit = 5): Promise<Session[]> => {
    return [...mockSessions]
      .sort((a, b) => b.startedAt - a.startedAt)
      .slice(0, limit)
  },
}
