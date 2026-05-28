import { mockStats } from '@/mocks/stats'
import type { Stats } from '@/entities/profile/model'

export const statsService = {
  get: async (): Promise<Stats> => {
    return mockStats
  },
}
