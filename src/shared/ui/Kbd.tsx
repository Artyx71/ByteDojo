import { cn } from '@/shared/lib'

interface KbdProps {
  children: React.ReactNode
  className?: string
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5',
        'font-mono text-xs text-[var(--text-1)]',
        'bg-[var(--surface-2)] border border-[var(--border)] rounded',
        className
      )}
    >
      {children}
    </kbd>
  )
}
