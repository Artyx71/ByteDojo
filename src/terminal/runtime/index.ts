import { useCallback } from 'react'
import { useSessionStore } from '@/entities/session/model/store'

export function useTerminalRuntime() {
  const submitCommand = useSessionStore((s) => s.submitCommand)

  const onCommandExecuted = useCallback(
    (input: string) => { submitCommand(input) },
    [submitCommand]
  )

  const onVimMotion = useCallback(
    (motion: string) => { submitCommand(motion) },
    [submitCommand]
  )

  return { onCommandExecuted, onVimMotion }
}
