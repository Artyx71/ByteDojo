import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Scenario } from '@/entities/scenario/model'
import type { Session, SessionStatus, StepResult } from '@/entities/session/model'

interface SessionStore {
  scenario: Scenario | null
  session: Session | null
  currentStepIndex: number
  status: SessionStatus
  keystrokeHistory: string[]
  hintsUsed: number
  startedAt: number | null
  stepResults: StepResult[]

  startSession: (scenario: Scenario) => void
  submitCommand: (input: string) => boolean
  useHint: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      scenario: null,
      session: null,
      currentStepIndex: 0,
      status: 'idle',
      keystrokeHistory: [],
      hintsUsed: 0,
      startedAt: null,
      stepResults: [],

      startSession: (scenario) => {
        const session: Session = {
          id: `session-${Date.now()}`,
          scenarioId: scenario.id,
          status: 'active',
          currentStepIndex: 0,
          startedAt: Date.now(),
          completedAt: null,
          stepResults: [],
        }
        set({
          scenario,
          session,
          currentStepIndex: 0,
          status: 'active',
          keystrokeHistory: [],
          hintsUsed: 0,
          startedAt: Date.now(),
          stepResults: [],
        })
      },

      submitCommand: (input) => {
        const { scenario, currentStepIndex, keystrokeHistory, hintsUsed, startedAt, stepResults } = get()
        if (!scenario) return false

        const step = scenario.steps[currentStepIndex]
        if (!step) return false

        const correct = step.validate
          ? step.validate(input)
          : step.expectedCommands.includes(input)

        const result: StepResult = {
          stepId: step.id,
          input,
          correct,
          keystrokes: input.length,
          timeMs: startedAt ? Date.now() - startedAt : 0,
          hintsUsed,
        }

        const updatedHistory = [...keystrokeHistory, input].slice(-10)
        const updatedResults = [...stepResults, result]
        const nextIndex = correct ? currentStepIndex + 1 : currentStepIndex
        const isCompleted = correct && nextIndex >= scenario.steps.length

        set({
          keystrokeHistory: updatedHistory,
          stepResults: updatedResults,
          currentStepIndex: nextIndex,
          hintsUsed: 0,
          status: isCompleted ? 'completed' : 'active',
        })

        return correct
      },

      useHint: () => {
        set((state) => ({ hintsUsed: state.hintsUsed + 1 }))
      },

      resetSession: () => {
        set({
          scenario: null,
          session: null,
          currentStepIndex: 0,
          status: 'idle',
          keystrokeHistory: [],
          hintsUsed: 0,
          startedAt: null,
          stepResults: [],
        })
      },
    }),
    {
      name: 'bytedojo-session',
      partialize: (state) => ({
        stepResults: state.stepResults,
      }),
    }
  )
)
