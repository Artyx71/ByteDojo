import { cn } from '@/shared/lib'

type BadgeVariant = 'default' | 'accent' | 'danger' | 'warning' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'border-[var(--border)] text-[var(--text-2)]',
  accent:  'border-[var(--accent)] text-[var(--accent)]',
  danger:  'border-[var(--danger)] text-[var(--danger)]',
  warning: 'border-[var(--warning)] text-[var(--warning)]',
  muted:   'border-transparent text-[var(--text-3)]',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-xs font-mono border rounded',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
