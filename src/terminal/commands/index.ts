import type { VirtualFS } from '../filesystem'
import type { ParsedCommand } from '../parser'

export function executeCommand(parsed: ParsedCommand, fs: VirtualFS): string | Error {
  const { cmd, subCmd, args, flags } = parsed

  switch (cmd) {
    case 'pwd':
      return fs.cwd + '\r\n'

    case 'ls': {
      const result = fs.ls(args[0])
      if (result instanceof Error) return result
      if (result.length === 0) return ''
      return result.join('  ') + '\r\n'
    }

    case 'cd': {
      const err = fs.cd(args[0] ?? '~')
      return err ?? ''
    }

    case 'cat': {
      if (!args[0]) return new Error('cat: missing operand')
      const result = fs.cat(args[0])
      if (result instanceof Error) return result
      return result.replace(/\n/g, '\r\n') + '\r\n'
    }

    case 'mkdir': {
      if (!args[0]) return new Error('mkdir: missing operand')
      return fs.mkdir(args[0]) ?? ''
    }

    case 'touch': {
      if (!args[0]) return new Error('touch: missing operand')
      return fs.touch(args[0]) ?? ''
    }

    case 'rm': {
      if (!args[0]) return new Error('rm: missing operand')
      return fs.rm(args[0]) ?? ''
    }

    case 'clear':
      return '\x1b[2J\x1b[H'

    case 'echo':
      return args.join(' ') + '\r\n'

    case 'git':
      return handleGit(subCmd, args, flags)

    case 'help':
      return HELP_TEXT

    default:
      return new Error(`${cmd}: command not found`)
  }
}

function handleGit(
  subCmd: string | null,
  args: string[],
  flags: Record<string, string | boolean>
): string | Error {
  switch (subCmd) {
    case 'status':
      return 'On branch main\nnothing to commit, working tree clean\r\n'

    case 'log':
      if (flags['oneline']) {
        return [
          '\x1b[33mabc1234\x1b[0m feat(terminal): add command parser',
          '\x1b[33mdef5678\x1b[0m feat(session): add scenario state machine',
          '\x1b[33m1234abc\x1b[0m chore(init): initialize project',
        ].join('\r\n') + '\r\n'
      }
      return [
        '\x1b[33mcommit abc1234\x1b[0m',
        'Author: Developer <dev@bytedojo.dev>',
        '',
        '    feat(terminal): add command parser',
      ].join('\r\n') + '\r\n'

    case 'add':
      return ''

    case 'commit': {
      const msg = args[0]
      if (!msg) return new Error('git commit: specify a commit message with -m')
      return `[main abc1234] ${msg}\r\n 1 file changed\r\n`
    }

    case 'reset': {
      if (flags['soft'] || args.includes('--soft')) {
        return 'Unstaged changes after reset:\r\nM\tfile.txt\r\n'
      }
      return new Error('git reset: specify --soft, --mixed, or --hard')
    }

    case 'init':
      return 'Initialized empty Git repository in .git/\r\n'

    case 'diff':
      return '(no changes)\r\n'

    default:
      if (!subCmd) return new Error('git: specify a subcommand. Try git help.')
      return new Error(`git: '${subCmd}' is not a git command`)
  }
}

const HELP_TEXT = [
  '\x1b[90m──────────────────────────────────────\x1b[0m',
  '  ByteDojo Terminal',
  '\x1b[90m──────────────────────────────────────\x1b[0m',
  '  \x1b[32mNavigation\x1b[0m',
  '    pwd           print working directory',
  '    ls [dir]      list directory contents',
  '    cd <dir>      change directory',
  '',
  '  \x1b[32mFiles\x1b[0m',
  '    cat <file>    print file contents',
  '    touch <f>     create empty file',
  '    mkdir <d>     create directory',
  '    rm <file>     remove file',
  '',
  '  \x1b[32mEditors\x1b[0m',
  '    vim <file>    open file in vim',
  '',
  '  \x1b[32mGit\x1b[0m',
  '    git status|log|add|commit|reset|init',
  '',
  '  \x1b[32mOther\x1b[0m',
  '    clear         clear terminal',
  '    help          show this help',
  '\x1b[90m──────────────────────────────────────\x1b[0m',
].join('\r\n') + '\r\n'
