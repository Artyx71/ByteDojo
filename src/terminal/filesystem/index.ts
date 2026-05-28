type FSEntry =
  | { type: 'dir'; children: Record<string, FSEntry> }
  | { type: 'file'; content: string }

const INITIAL_FS: FSEntry = {
  type: 'dir',
  children: {
    notes: {
      type: 'dir',
      children: {
        'vim-tips.md': {
          type: 'file',
          content: [
            '# Vim Tips',
            '',
            'ByteDojo helps you master vim motions through practice.',
            '',
            'Basic motions:',
            '  h j k l  - move left/down/up/right',
            '  0        - beginning of line',
            '  $        - end of line',
            '  gg       - first line',
            '  G        - last line',
            '  w        - next word',
            '  b        - previous word',
            '  e        - end of word',
            '',
            'Practice makes permanent.',
          ].join('\n'),
        },
        'git-cheatsheet.md': {
          type: 'file',
          content: [
            '# Git Cheatsheet',
            '',
            'git init            initialize repo',
            'git add .           stage all files',
            'git commit -m ""    create commit',
            'git log --oneline   view history',
            'git reset --soft    undo last commit',
            'git status          working tree status',
          ].join('\n'),
        },
      },
    },
    projects: {
      type: 'dir',
      children: {
        'README.md': {
          type: 'file',
          content: '# My Project\n\nA sample project for ByteDojo.\n',
        },
        'package.json': {
          type: 'file',
          content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}\n',
        },
      },
    },
    '.config': {
      type: 'dir',
      children: {},
    },
  },
}

export class VirtualFS {
  private root: FSEntry
  private _cwd: string[]

  constructor() {
    this.root = JSON.parse(JSON.stringify(INITIAL_FS))
    this._cwd = []
  }

  get cwd(): string {
    return this._cwd.length === 0 ? '/' : '/' + this._cwd.join('/')
  }

  private getNode(parts: string[]): FSEntry | null {
    let node = this.root
    for (const part of parts) {
      if (node.type !== 'dir') return null
      const child = node.children[part]
      if (!child) return null
      node = child
    }
    return node
  }

  private resolveParts(path: string): string[] {
    const base = path.startsWith('/') ? [] : [...this._cwd]
    const segments = path.startsWith('/') ? path.slice(1).split('/') : path.split('/')
    const resolved: string[] = [...base]
    for (const seg of segments) {
      if (seg === '' || seg === '.') continue
      if (seg === '..') { resolved.pop(); continue }
      resolved.push(seg)
    }
    return resolved
  }

  ls(path?: string): string[] | Error {
    const parts = path ? this.resolveParts(path) : [...this._cwd]
    const node = this.getNode(parts)
    if (!node) return new Error(`ls: ${path ?? '.'}: No such file or directory`)
    if (node.type !== 'dir') return new Error(`ls: ${path}: Not a directory`)
    return Object.keys(node.children)
  }

  cd(path: string): Error | null {
    if (path === '~' || path === '') {
      this._cwd = []
      return null
    }
    const parts = this.resolveParts(path)
    const node = this.getNode(parts)
    if (!node) return new Error(`cd: ${path}: No such file or directory`)
    if (node.type !== 'dir') return new Error(`cd: ${path}: Not a directory`)
    this._cwd = parts
    return null
  }

  cat(path: string): string | Error {
    const parts = this.resolveParts(path)
    const node = this.getNode(parts)
    if (!node) return new Error(`cat: ${path}: No such file or directory`)
    if (node.type !== 'file') return new Error(`cat: ${path}: Is a directory`)
    return node.content
  }

  mkdir(name: string): Error | null {
    const parent = this.getNode(this._cwd)
    if (!parent || parent.type !== 'dir') return new Error('mkdir: cannot create directory')
    if (parent.children[name]) return new Error(`mkdir: ${name}: File exists`)
    parent.children[name] = { type: 'dir', children: {} }
    return null
  }

  touch(name: string): Error | null {
    const parent = this.getNode(this._cwd)
    if (!parent || parent.type !== 'dir') return new Error('touch: cannot create file')
    if (!parent.children[name]) {
      parent.children[name] = { type: 'file', content: '' }
    }
    return null
  }

  rm(name: string): Error | null {
    const parent = this.getNode(this._cwd)
    if (!parent || parent.type !== 'dir') return new Error('rm: cannot remove')
    if (!parent.children[name]) return new Error(`rm: ${name}: No such file or directory`)
    delete parent.children[name]
    return null
  }
}
