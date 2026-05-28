import type { Session } from '@/entities/session/model'

export const mockSessions: Session[] = [
  {
    id: 'session-001',
    scenarioId: 'vim-navigation-001',
    status: 'completed',
    currentStepIndex: 5,
    startedAt: Date.now() - 1000 * 60 * 60 * 2,
    completedAt: Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 8,
    stepResults: [
      { stepId: 'step-1', input: '$', correct: true, keystrokes: 1, timeMs: 3200, hintsUsed: 0 },
      { stepId: 'step-2', input: '0', correct: true, keystrokes: 1, timeMs: 2100, hintsUsed: 1 },
      { stepId: 'step-3', input: 'j', correct: true, keystrokes: 1, timeMs: 1800, hintsUsed: 0 },
      { stepId: 'step-4', input: 'k', correct: true, keystrokes: 1, timeMs: 1500, hintsUsed: 0 },
      { stepId: 'step-5', input: 'gg', correct: true, keystrokes: 2, timeMs: 4100, hintsUsed: 0 },
    ],
  },
  {
    id: 'session-002',
    scenarioId: 'shell-navigation-001',
    status: 'completed',
    currentStepIndex: 3,
    startedAt: Date.now() - 1000 * 60 * 60 * 24,
    completedAt: Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5,
    stepResults: [
      { stepId: 'step-1', input: 'pwd', correct: true, keystrokes: 3, timeMs: 2900, hintsUsed: 0 },
      { stepId: 'step-2', input: 'ls', correct: true, keystrokes: 2, timeMs: 1700, hintsUsed: 0 },
      { stepId: 'step-3', input: 'cd projects', correct: true, keystrokes: 10, timeMs: 3300, hintsUsed: 0 },
    ],
  },
]
