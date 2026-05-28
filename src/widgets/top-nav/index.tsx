'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

const NAV_LINKS = [
  { label: 'dashboard', href: routes.dashboard },
  { label: 'train',     href: routes.train },
  { label: 'profile',   href: routes.profile },
]

interface TopNavProps {
  className?: string
}

export function TopNav({ className }: TopNavProps) {
  const pathname = usePathname()

  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 h-12 shrink-0',
        'border-b border-[var(--border)] bg-[var(--surface)]',
        className
      )}
    >
      <Link href={routes.dashboard} className="font-mono text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
        ByteDojo&nbsp;<span className="opacity-50">&gt;_</span>
      </Link>

      <nav className="flex items-center gap-6">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-mono text-xs transition-colors duration-150',
                isActive
                  ? 'text-[var(--text-1)]'
                  : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
