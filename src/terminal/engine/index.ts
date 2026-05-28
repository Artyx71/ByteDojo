import { VirtualFS } from '../filesystem'
import { parseCommand } from '../parser'
import { executeCommand } from '../commands'
import { VimEditor } from './vim'

export interface EngineCallbacks {
  onOutput: (text: string) => void
  onVimMotion?: (motion: string) => void
  onCommandExecuted?: (input: string) => void
}

export class TerminalEngine {
  private fs: VirtualFS
  private vim: VimEditor | null
  private callbacks: EngineCallbacks
  private cols: number
  private rows: number

  constructor(callbacks: EngineCallbacks, cols = 80, rows = 24) {
    this.fs = new VirtualFS()
    this.vim = null
    this.callbacks = callbacks
    this.cols = cols
    this.rows = rows
  }

  isVimMode(): boolean {
    return this.vim !== null
  }

  getPrompt(): string {
    const cwd = this.fs.cwd
    const short = cwd === '/' ? '~' : cwd.split('/').pop() ?? '~'
    return `\x1b[32m$\x1b[0m \x1b[34m${short}\x1b[0m \x1b[90m>\x1b[0m `
  }

  handleVimKey(key: string): void {
    if (!this.vim) return
    const output = this.vim.handleKey(key)
    if (output) this.callbacks.onOutput(output)
  }

  executeShellCommand(input: string): void {
    const trimmed = input.trim()
    if (!trimmed) {
      this.callbacks.onOutput(this.getPrompt())
      return
    }

    this.callbacks.onCommandExecuted?.(trimmed)

    const parsed = parseCommand(trimmed)

    if (parsed.cmd === 'vim' || parsed.cmd === 'nvim') {
      const filename = parsed.args[0] ?? 'notes.txt'
      const fileResult = parsed.args[0] ? this.fs.cat(parsed.args[0]) : ''
      const content = fileResult instanceof Error ? '' : fileResult

      this.vim = new VimEditor(
        content,
        filename,
        {
          onMotion: (motion) => this.callbacks.onVimMotion?.(motion),
          onExit: () => {
            this.vim = null
            this.callbacks.onOutput('\x1b[2J\x1b[H' + this.getPrompt())
          },
        },
        this.cols,
        this.rows
      )
      this.callbacks.onOutput(this.vim.render())
      return
    }

    const result = executeCommand(parsed, this.fs)
    if (result instanceof Error) {
      this.callbacks.onOutput(`\x1b[31m${result.message}\x1b[0m\r\n${this.getPrompt()}`)
    } else {
      this.callbacks.onOutput(result + this.getPrompt())
    }
  }

  updateDimensions(cols: number, rows: number): void {
    this.cols = cols
    this.rows = rows
    this.vim?.updateDimensions(cols, rows)
  }
}
