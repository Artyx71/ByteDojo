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
  stepStartedAt: number | null
  stepResults: StepResult[]
  completedScenarioIds: string[]

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
      stepStartedAt: null,
      stepResults: [],
      completedScenarioIds: [],

      startSession: (scenario) => {
        const now = Date.now()
        const session: Session = {
          id: `session-${now}`,
          scenarioId: scenario.id,
          status: 'active',
          currentStepIndex: 0,
          startedAt: now,
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
          startedAt: now,
          stepStartedAt: now,
          stepResults: [],
        })
      },

      submitCommand: (input) => {
        const { scenario, currentStepIndex, keystrokeHistory, hintsUsed, stepStartedAt, stepResults } = get()
        if (!scenario) return false

        const step = scenario.steps[currentStepIndex]
        if (!step) return false

        const correct = step.validate
          ? step.validate(input)
          : step.expectedCommands.includes(input)

        const now = Date.now()

        const result: StepResult = {
          stepId: step.id,
          input,
          correct,
          keystrokes: input.length,
          timeMs: stepStartedAt ? now - stepStartedAt : 0,
          hintsUsed,
        }

        const updatedHistory = [...keystrokeHistory, input].slice(-10)
        const updatedResults = [...stepResults, result]
        const nextIndex = correct ? currentStepIndex + 1 : currentStepIndex
        const isCompleted = correct && nextIndex >= scenario.steps.length

        const { completedScenarioIds } = get()
        const updatedCompletedIds = isCompleted && !completedScenarioIds.includes(scenario.id)
          ? [...completedScenarioIds, scenario.id]
          : completedScenarioIds

        set({
          keystrokeHistory: updatedHistory,
          stepResults: updatedResults,
          currentStepIndex: nextIndex,
          hintsUsed: 0,
          stepStartedAt: correct ? now : stepStartedAt,
          status: isCompleted ? 'completed' : 'active',
          completedScenarioIds: updatedCompletedIds,
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
          stepStartedAt: null,
          stepResults: [],
        })
      },
    }),
    {
      name: 'bytedojo-session',
      partialize: (state) => ({
        stepResults: state.stepResults,
        completedScenarioIds: state.completedScenarioIds,
      }),
    }
  )
)
