export type TaskStatus = 'pending' | 'active' | 'completed'

export interface Task {
  id: string
  stepId: string
  instruction: string
  status: TaskStatus
  hint: string
}
