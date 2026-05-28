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
