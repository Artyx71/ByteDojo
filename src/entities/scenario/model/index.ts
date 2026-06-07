export type Difficulty = 'easy' | 'medium' | 'hard'

export type Category = 'vim' | 'shell' | 'git' | 'tmux' | 'keyboard'

export interface Step {
  id: string
  instruction: string
  expectedCommands: string[]
  output: string
  hint: string
  validate?: (input: string) => boolean
}

export interface Scenario {
  id: string
  title: string
  description: string
  category: Category
  difficulty: Difficulty
  estimatedTime: number
  steps: Step[]
}

export const CATEGORY_LABELS: Record<Category, string> = {
  vim:      'Vim',
  shell:    'Shell',
  git:      'Git',
  tmux:     'Tmux',
  keyboard: 'Keyboard',
}

// Canonical learning order: shell foundation → vim muscle memory → git workflows
// Phase 2: replace with `order` field from DB
export const CATEGORY_ORDER: Category[] = ['shell', 'vim', 'git', 'tmux', 'keyboard']

export function groupByCategory(scenarios: Scenario[]): Map<Category, Scenario[]> {
  const raw = new Map<Category, Scenario[]>()
  for (const s of scenarios) {
    const group = raw.get(s.category) ?? []
    group.push(s)
    raw.set(s.category, group)
  }
  const ordered = new Map<Category, Scenario[]>()
  for (const cat of CATEGORY_ORDER) {
    if (raw.has(cat)) ordered.set(cat, raw.get(cat)!)
  }
  return ordered
}
