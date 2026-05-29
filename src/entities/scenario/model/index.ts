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

export function groupByCategory(scenarios: Scenario[]): Map<Category, Scenario[]> {
  const map = new Map<Category, Scenario[]>()
  for (const s of scenarios) {
    const group = map.get(s.category) ?? []
    group.push(s)
    map.set(s.category, group)
  }
  return map
}
