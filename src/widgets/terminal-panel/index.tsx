'use client'

import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef } from 'react'
import { useTerminalRuntime } from '@/terminal/runtime'
import { TerminalEngine } from '@/terminal/engine'

export function TerminalPanel() {
  const termRef = useRef<HTMLDivElement>(null)
  const { onCommandExecuted, onVimMotion } = useTerminalRuntime()

  // Refs so the effect closure always calls the latest version without re-running
  const onCommandExecutedRef = useRef(onCommandExecuted)
  const onVimMotionRef = useRef(onVimMotion)
  onCommandExecutedRef.current = onCommandExecuted
  onVimMotionRef.current = onVimMotion

  useEffect(() => {
    if (!termRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let term: any = null
    let ro: ResizeObserver | null = null
    let disposed = false
    const inputBuffer = { value: '' }

    async function init() {
      const { Terminal } = await import('@xterm/xterm')
      const { FitAddon } = await import('@xterm/addon-fit')

      if (disposed || !termRef.current) return

      term = new Terminal({
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 13,
        lineHeight: 1.4,
        cursorBlink: true,
        cursorStyle: 'block',
        theme: {
          background:   '#0a0a0a',
          foreground:   '#e2e2e2',
          cursor:       '#a3e635',
          cursorAccent: '#0a0a0a',
          black:        '#0a0a0a',
          green:        '#a3e635',
          blue:         '#60a5fa',
          cyan:         '#22d3ee',
          red:          '#ef4444',
          yellow:       '#f59e0b',
          white:        '#e2e2e2',
          brightBlack:  '#5a5a5a',
        },
        scrollback: 1000,
      })

      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(termRef.current)
      fitAddon.fit()

      const engine = new TerminalEngine(
        {
          onOutput:          (text: string) => term.write(text),
          onVimMotion:       (motion: string) => onVimMotionRef.current(motion),
          onCommandExecuted: (input: string) => onCommandExecutedRef.current(input),
        },
        term.cols,
        term.rows
      )

      term.write(engine.getPrompt())

      term.onKey(({ key }: { key: string }) => {
        if (engine.isVimMode()) {
          engine.handleVimKey(key)
          return
        }

        if (key === '\r') {
          term.write('\r\n')
          engine.executeShellCommand(inputBuffer.value)
          inputBuffer.value = ''
        } else if (key === '\x7f') {
          if (inputBuffer.value.length > 0) {
            inputBuffer.value = inputBuffer.value.slice(0, -1)
            term.write('\b \b')
          }
        } else if (key >= ' ') {
          inputBuffer.value += key
          term.write(key)
        }
      })

      ro = new ResizeObserver(() => {
        fitAddon.fit()
        engine.updateDimensions(term.cols, term.rows)
      })
      ro.observe(termRef.current!)
    }

    init()

    return () => {
      disposed = true
      ro?.disconnect()
      term?.dispose()
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg)]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <span className="font-mono text-xs text-[var(--text-3)]">terminal</span>
      </div>
      <div ref={termRef} className="flex-1 overflow-hidden p-1" />
    </div>
  )
}
