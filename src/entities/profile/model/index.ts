import type { Category } from '@/entities/scenario/model'

export interface Stats {
  totalSessions: number
  completedScenarios: number
  totalKeystrokes: number
  accuracyPercent: number
  avgTimePerStepMs: number
  totalHintsUsed: number
  currentStreak: number
  bestStreak: number
  byCategory: Partial<Record<Category, { completed: number; total: number }>>
}

export interface Profile {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  joinedAt: number
  stats: Stats
}
