type VimMode = 'normal' | 'insert' | 'command'

interface Cursor { line: number; col: number }

export interface VimCallbacks {
  onMotion: (keys: string) => void
  onExit: (saved: boolean) => void
}

export class VimEditor {
  private lines: string[]
  private cursor: Cursor
  private mode: VimMode
  private filename: string
  private pendingKey: string
  private commandBuffer: string
  private callbacks: VimCallbacks
  private cols: number
  private rows: number

  constructor(
    content: string,
    filename: string,
    callbacks: VimCallbacks,
    cols = 80,
    rows = 24
  ) {
    this.lines = content.split('\n')
    if (this.lines.length === 0) this.lines = ['']
    this.cursor = { line: 0, col: 0 }
    this.mode = 'normal'
    this.filename = filename
    this.pendingKey = ''
    this.commandBuffer = ''
    this.callbacks = callbacks
    this.cols = cols
    this.rows = rows
  }

  updateDimensions(cols: number, rows: number): void {
    this.cols = cols
    this.rows = rows
  }

  handleKey(key: string): string {
    if (this.mode === 'normal')  return this.handleNormal(key)
    if (this.mode === 'insert')  return this.handleInsert(key)
    if (this.mode === 'command') return this.handleCommand(key)
    return this.render()
  }

  private clamp(): void {
    this.cursor.line = Math.max(0, Math.min(this.cursor.line, this.lines.length - 1))
    const len = this.lines[this.cursor.line]?.length ?? 0
    const max = this.mode === 'insert' ? len : Math.max(0, len - 1)
    this.cursor.col = Math.max(0, Math.min(this.cursor.col, max))
  }

  private handleNormal(key: string): string {
    // Resolve pending 'g' sequence
    if (this.pendingKey === 'g') {
      this.pendingKey = ''
      if (key === 'g') {
        this.cursor = { line: 0, col: 0 }
        this.callbacks.onMotion('gg')
        return this.render()
      }
      // Unrecognised sequence — fall through
    }

    const line = () => this.lines[this.cursor.line] ?? ''

    switch (key) {
      case 'h':
        this.cursor.col = Math.max(0, this.cursor.col - 1)
        this.callbacks.onMotion('h')
        break

      case 'j':
        this.cursor.line = Math.min(this.lines.length - 1, this.cursor.line + 1)
        this.clamp()
        this.callbacks.onMotion('j')
        break

      case 'k':
        this.cursor.line = Math.max(0, this.cursor.line - 1)
        this.clamp()
        this.callbacks.onMotion('k')
        break

      case 'l':
        this.cursor.col = Math.min(Math.max(0, line().length - 1), this.cursor.col + 1)
        this.callbacks.onMotion('l')
        break

      case '0':
        this.cursor.col = 0
        this.callbacks.onMotion('0')
        break

      case '^': {
        const m = line().match(/^\s*/)
        this.cursor.col = m ? m[0].length : 0
        this.callbacks.onMotion('^')
        break
      }

      case '$':
        this.cursor.col = Math.max(0, line().length - 1)
        this.callbacks.onMotion('$')
        break

      case 'w': {
        let col = this.cursor.col
        const l = line()
        while (col < l.length && /\S/.test(l[col])) col++
        while (col < l.length && /\s/.test(l[col])) col++
        if (col < l.length) {
          this.cursor.col = col
        } else if (this.cursor.line < this.lines.length - 1) {
          this.cursor.line++
          this.cursor.col = 0
        }
        this.callbacks.onMotion('w')
        break
      }

      case 'b': {
        let col = this.cursor.col - 1
        const l = line()
        while (col > 0 && /\s/.test(l[col])) col--
        while (col > 0 && /\S/.test(l[col - 1])) col--
        this.cursor.col = Math.max(0, col)
        this.callbacks.onMotion('b')
        break
      }

      case 'e': {
        let col = this.cursor.col + 1
        const l = line()
        while (col < l.length && /\s/.test(l[col])) col++
        while (col + 1 < l.length && /\S/.test(l[col + 1])) col++
        this.cursor.col = Math.min(col, Math.max(0, l.length - 1))
        this.callbacks.onMotion('e')
        break
      }

      case 'G':
        this.cursor.line = this.lines.length - 1
        this.cursor.col = 0
        this.callbacks.onMotion('G')
        break

      case 'g':
        this.pendingKey = 'g'
        break

      case 'i':
        this.mode = 'insert'
        break

      case ':':
        this.mode = 'command'
        this.commandBuffer = ''
        break

      case '\x1b':
        this.pendingKey = ''
        break
    }

    this.clamp()
    return this.render()
  }

  private handleInsert(key: string): string {
    if (key === '\x1b') {
      this.mode = 'normal'
      this.cursor.col = Math.max(0, this.cursor.col - 1)
      this.clamp()
      return this.render()
    }
    if (key === '\r' || key === '\n') {
      const l = this.lines[this.cursor.line]
      this.lines[this.cursor.line] = l.slice(0, this.cursor.col)
      this.lines.splice(this.cursor.line + 1, 0, l.slice(this.cursor.col))
      this.cursor.line++
      this.cursor.col = 0
      return this.render()
    }
    if (key === '\x7f' || key === '\b') {
      if (this.cursor.col > 0) {
        const l = this.lines[this.cursor.line]
        this.lines[this.cursor.line] = l.slice(0, this.cursor.col - 1) + l.slice(this.cursor.col)
        this.cursor.col--
      } else if (this.cursor.line > 0) {
        const prev = this.lines[this.cursor.line - 1]
        const cur = this.lines[this.cursor.line]
        this.cursor.col = prev.length
        this.lines[this.cursor.line - 1] = prev + cur
        this.lines.splice(this.cursor.line, 1)
        this.cursor.line--
      }
      return this.render()
    }
    if (key.length === 1 && key >= ' ') {
      const l = this.lines[this.cursor.line]
      this.lines[this.cursor.line] = l.slice(0, this.cursor.col) + key + l.slice(this.cursor.col)
      this.cursor.col++
    }
    return this.render()
  }

  private handleCommand(key: string): string {
    if (key === '\x1b') {
      this.mode = 'normal'
      this.commandBuffer = ''
      return this.render()
    }
    if (key === '\r' || key === '\n') {
      const cmd = this.commandBuffer.trim()
      this.commandBuffer = ''
      this.mode = 'normal'
      if (cmd === 'q' || cmd === 'q!') { this.callbacks.onExit(false); return '' }
      if (cmd === 'wq' || cmd === 'x') { this.callbacks.onExit(true); return '' }
      return this.render()
    }
    if (key === '\x7f' || key === '\b') {
      this.commandBuffer = this.commandBuffer.slice(0, -1)
    } else if (key.length === 1) {
      this.commandBuffer += key
    }
    return this.render()
  }

  render(): string {
    const contentRows = Math.max(1, this.rows - 2)
    const scrollStart = Math.max(
      0,
      Math.min(
        this.cursor.line - Math.floor(contentRows / 2),
        Math.max(0, this.lines.length - contentRows)
      )
    )

    const out: string[] = ['\x1b[2J\x1b[H']

    for (let i = 0; i < contentRows; i++) {
      const idx = scrollStart + i
      if (idx >= this.lines.length) {
        out.push('\x1b[34m~\x1b[0m\r\n')
        continue
      }
      const lineNum = String(idx + 1).padStart(3, ' ')
      out.push(`\x1b[90m${lineNum}\x1b[0m  `)

      const content = this.lines[idx]
      if (idx === this.cursor.line && this.mode !== 'insert') {
        const before = content.slice(0, this.cursor.col)
        const ch = content[this.cursor.col] ?? ' '
        const after = content.slice(this.cursor.col + 1)
        out.push(`${before}\x1b[7m${ch}\x1b[0m${after}`)
      } else {
        out.push(content)
      }
      out.push('\r\n')
    }

    // Statusline
    const modeLabel = this.mode === 'insert' ? '-- INSERT --' : this.mode === 'command' ? '' : 'NORMAL'
    const position = `${this.cursor.line + 1},${this.cursor.col + 1}`
    const left = `${modeLabel}  ${this.filename}`
    const right = `${position}    All`
    const pad = Math.max(0, this.cols - left.length - right.length - 2)
    out.push(`\x1b[7m ${left}${' '.repeat(pad)}${right} \x1b[0m\r\n`)

    // Command line
    if (this.mode === 'command') {
      out.push(`:${this.commandBuffer}`)
    } else {
      out.push('\x1b[90m \x1b[0m')
    }

    return out.join('')
  }
}
