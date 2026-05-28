export interface ParsedCommand {
  raw: string
  cmd: string
  subCmd: string | null
  args: string[]
  flags: Record<string, string | boolean>
}

const GIT_SUBCMDS = new Set(['commit', 'status', 'log', 'add', 'reset', 'diff', 'push', 'pull', 'init'])

export function parseCommand(input: string): ParsedCommand {
  const tokens: string[] = []
  let current = ''
  let inQuote: '"' | "'" | null = null

  for (const char of input.trim()) {
    if ((char === '"' || char === "'") && !inQuote) {
      inQuote = char
    } else if (char === inQuote) {
      inQuote = null
    } else if (char === ' ' && !inQuote) {
      if (current) { tokens.push(current); current = '' }
    } else {
      current += char
    }
  }
  if (current) tokens.push(current)

  const [cmd = '', ...rest] = tokens
  const args: string[] = []
  const flags: Record<string, string | boolean> = {}

  for (let i = 0; i < rest.length; i++) {
    const token = rest[i]
    if (token.startsWith('--')) {
      const eqIdx = token.indexOf('=')
      if (eqIdx !== -1) {
        flags[token.slice(2, eqIdx)] = token.slice(eqIdx + 1)
      } else {
        flags[token.slice(2)] = true
      }
    } else if (token.startsWith('-') && token.length > 1 && isNaN(Number(token))) {
      for (const char of token.slice(1)) flags[char] = true
    } else {
      args.push(token)
    }
  }

  let subCmd: string | null = null
  if (cmd === 'git' && args.length > 0 && GIT_SUBCMDS.has(args[0])) {
    subCmd = args.shift()!
  }

  return { raw: input, cmd, subCmd, args, flags }
}
