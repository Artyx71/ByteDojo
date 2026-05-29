'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { Scenario, Category } from '@/entities/scenario/model'
import { CATEGORY_LABELS, groupByCategory } from '@/entities/scenario/model'
import { cn } from '@/shared/lib'
import { routes } from '@/shared/config/routes'

interface ScenarioSidebarProps {
  scenarios: Scenario[]
  activeScenarioId?: string
  completedScenarioIds?: Set<string>
  className?: string
}

export function ScenarioSidebar({ scenarios, activeScenarioId, completedScenarioIds = new Set(), className }: ScenarioSidebarProps) {
  const router = useRouter()
  const grouped = groupByCategory(scenarios)
  const categories = Array.from(grouped.keys())

  const [openCategories, setOpenCategories] = useState<Set<Category>>(
    () => new Set(categories)
  )

  const toggleCategory = (cat: Category) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const completedCount = scenarios.filter((s) => completedScenarioIds.has(s.id)).length
  const totalCount = scenarios.length

  return (
    <aside
      className={cn(
        'flex flex-col w-48 shrink-0',
        'border-r border-[var(--border)] bg-[var(--surface)]',
        'overflow-y-auto',
        className
      )}
    >
      {/* Header */}
      <div className="px-3 pt-3 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">
          scenarios
        </span>
      </div>

      {/* Category groups */}
      <div className="flex-1 px-2 pb-2">
        {categories.map((cat) => {
          const items = grouped.get(cat)!
          const isOpen = openCategories.has(cat)

          return (
            <div key={cat} className="mb-1">
              {/* Category row */}
              <button
                onClick={() => toggleCategory(cat)}
                className={cn(
                  'flex items-center gap-1 w-full px-1 py-1 rounded',
                  'font-mono text-xs text-[var(--text-2)]',
                  'hover:text-[var(--text-1)] transition-colors duration-100'
                )}
              >
                {isOpen
                  ? <ChevronDown size={10} className="shrink-0" />
                  : <ChevronRight size={10} className="shrink-0" />
                }
                {CATEGORY_LABELS[cat]}
              </button>

              {/* Scenario list */}
              {isOpen && (
                <div className="ml-3">
                  {items.map((scenario) => {
                    const isActive = scenario.id === activeScenarioId
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => router.push(routes.session(scenario.id))}
                        className={cn(
                          'flex items-center gap-1.5 w-full px-1 py-0.5 rounded text-left',
                          'font-mono text-xs transition-colors duration-100',
                          isActive
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                        )}
                      >
                        <span className={cn(
                          'shrink-0 text-[8px]',
                          isActive ? 'text-[var(--accent)]' : 'opacity-0'
                        )}>
                          •
                        </span>
                        <span className="truncate leading-tight">
                          {scenario.title.replace(/^[^:]+:\s*/, '')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Overall progress */}
      <div className="px-3 py-3 border-t border-[var(--border)]">
        <div className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest mb-1">
          overall
        </div>
        <div className="font-mono text-xs text-[var(--text-2)] mb-1.5">
          {totalCount > 0
            ? `${Math.round((completedCount / totalCount) * 100)}%`
            : '0%'}
        </div>
        <div className="h-px bg-[var(--border)] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-300"
            style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          />
        </div>
        <div className="font-mono text-[10px] text-[var(--text-3)] mt-1">
          {completedCount} of {totalCount} done
        </div>
      </div>
    </aside>
  )
}
