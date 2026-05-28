'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { useSessionStore } from '@/entities/session/model/store'
import { Kbd } from '@/shared/ui'
import { cn } from '@/shared/lib'

interface TaskPanelProps {
  className?: string
}

export function TaskPanel({ className }: TaskPanelProps) {
  const { scenario, currentStepIndex, hintsUsed, useHint } = useSessionStore()
  const [hintVisible, setHintVisible] = useState(false)

  if (!scenario) return null

  const currentStep = scenario.steps[currentStepIndex]
  const isCompleted = currentStepIndex >= scenario.steps.length

  const handleHint = () => {
    if (!hintVisible) useHint()
    setHintVisible(true)
  }

  return (
    <aside
      className={cn(
        'flex flex-col w-56 shrink-0',
        'border-l border-[var(--border)] bg-[var(--surface)]',
        'overflow-y-auto',
        className
      )}
    >
      {/* Current task */}
      <div className="px-3 pt-3 pb-2 border-b border-[var(--border)]">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-2">
          current task
        </div>

        {isCompleted ? (
          <p className="font-mono text-xs text-[var(--accent)]">
            all tasks completed
          </p>
        ) : currentStep ? (
          <>
            <p className="font-sans text-sm text-[var(--text-1)] leading-snug mb-3">
              {currentStepIndex + 1}. {currentStep.instruction}
            </p>

            {currentStep.expectedCommands.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                <span className="font-mono text-[10px] text-[var(--text-3)] mr-1">
                  expected:
                </span>
                {currentStep.expectedCommands.map((cmd) => (
                  <Kbd key={cmd}>{cmd}</Kbd>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Task list */}
      <div className="px-3 pt-2 pb-2 border-b border-[var(--border)] flex-1">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-2">
          tasks
        </div>

        <div className="flex flex-col gap-0.5">
          {scenario.steps.map((step, i) => {
            const done = i < currentStepIndex
            const active = i === currentStepIndex
            const pending = i > currentStepIndex

            return (
              <div
                key={step.id}
                className={cn(
                  'flex items-start gap-1.5 py-0.5',
                  'font-mono text-xs leading-snug'
                )}
              >
                <span className="mt-px shrink-0">
                  {done && <CheckCircle2 size={10} className="text-[var(--accent)]" />}
                  {active && <ArrowRight size={10} className="text-[var(--accent)]" />}
                  {pending && <Circle size={10} className="text-[var(--text-3)]" />}
                </span>
                <span
                  className={cn(
                    done    && 'text-[var(--text-3)] line-through',
                    active  && 'text-[var(--text-1)]',
                    pending && 'text-[var(--text-3)]'
                  )}
                >
                  {i + 1}. {step.instruction.length > 28
                    ? step.instruction.slice(0, 28) + '…'
                    : step.instruction}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hint */}
      {!isCompleted && currentStep && (
        <div className="px-3 pt-2 pb-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-1.5">
            hint
          </div>

          {hintVisible ? (
            <p className="font-mono text-xs text-[var(--text-2)] leading-relaxed">
              {currentStep.hint}
            </p>
          ) : (
            <button
              onClick={handleHint}
              className={cn(
                'font-mono text-xs text-[var(--text-3)]',
                'border border-[var(--border)] rounded px-2 py-1',
                'hover:text-[var(--text-2)] hover:border-[var(--text-3)]',
                'transition-colors duration-150'
              )}
            >
              show hint
              {hintsUsed > 0 && (
                <span className="ml-1 text-[var(--text-3)]">({hintsUsed})</span>
              )}
            </button>
          )}
        </div>
      )}
    </aside>
  )
}
