'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSessionStore } from '@/entities/session/model/store'
import { formatTime } from '@/shared/lib'
import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

interface SessionHeaderProps {
  className?: string
}

export function SessionHeader({ className }: SessionHeaderProps) {
  const { scenario, currentStepIndex, status, startedAt, resetSession } = useSessionStore()
  const router = useRouter()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (status !== 'active' || !startedAt) return
    const interval = setInterval(() => {
      setElapsed(Date.now() - startedAt)
    }, 1000)
    return () => clearInterval(interval)
  }, [status, startedAt])

  const handleExit = () => {
    resetSession()
    router.push(routes.train)
  }

  const totalSteps = scenario?.steps.length ?? 0
  const completedSteps = Math.min(currentStepIndex, totalSteps)
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 h-12',
        'border-b border-[var(--border)] bg-[var(--surface)]',
        className
      )}
    >
      {/* Left: logo + breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs min-w-0">
        <Link href={routes.dashboard} className="text-[var(--accent)] font-medium shrink-0 hover:opacity-80 transition-opacity">
          ByteDojo&nbsp;<span className="opacity-60">&gt;_</span>
        </Link>

        {scenario && (
          <>
            <span className="text-[var(--text-3)] shrink-0">/</span>
            <span className="text-[var(--text-3)] shrink-0">scenarios</span>
            <span className="text-[var(--text-3)] shrink-0">/</span>
            <span className="text-[var(--text-2)] truncate">{scenario.id}</span>
          </>
        )}
      </div>

      {/* Right: timer + progress + exit */}
      <div className="flex items-center gap-4 shrink-0">
        {status === 'active' && (
          <>
            <span className="font-mono text-xs text-[var(--text-2)] tabular-nums">
              {formatTime(elapsed)}
            </span>

            <span className="font-mono text-xs text-[var(--text-3)]">
              <span className="text-[var(--text-1)]">{completedSteps}</span>
              <span className="text-[var(--text-3)]">/{totalSteps} tasks</span>
            </span>

            {/* progress bar */}
            <div className="w-20 h-px bg-[var(--border)] relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        )}

        {status === 'completed' && (
          <span className="font-mono text-xs text-[var(--accent)]">completed</span>
        )}

        <button
          onClick={handleExit}
          className={cn(
            'font-mono text-xs px-2 py-1 rounded',
            'text-[var(--text-3)] border border-[var(--border)]',
            'hover:text-[var(--text-1)] hover:border-[var(--text-3)]',
            'transition-colors duration-150'
          )}
        >
          exit
        </button>
      </div>
    </header>
  )
}
