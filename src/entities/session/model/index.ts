export type SessionStatus = 'idle' | 'active' | 'paused' | 'completed' | 'failed'

export interface StepResult {
  stepId: string
  input: string
  correct: boolean
  keystrokes: number
  timeMs: number
  hintsUsed: number
}

export interface Session {
  id: string
  scenarioId: string
  status: SessionStatus
  currentStepIndex: number
  startedAt: number
  completedAt: number | null
  stepResults: StepResult[]
}
