import type { Stats } from '@/entities/profile/model'

export const mockStats: Stats = {
  totalSessions: 7,
  completedScenarios: 2,
  totalKeystrokes: 312,
  accuracyPercent: 87,
  avgTimePerStepMs: 2800,
  totalHintsUsed: 3,
  currentStreak: 2,
  bestStreak: 5,
  byCategory: {
    vim: { completed: 1, total: 2 },
    shell: { completed: 1, total: 1 },
    git: { completed: 0, total: 1 },
  },
}
