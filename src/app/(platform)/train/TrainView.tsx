'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, Check } from 'lucide-react'
import type { Scenario, Category } from '@/entities/scenario/model'
import { TopNav } from '@/widgets/top-nav'
import { Badge } from '@/shared/ui'
import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

const CATEGORY_LABELS: Record<Category, string> = {
  vim:      'vim',
  shell:    'shell',
  git:      'git',
  tmux:     'tmux',
  keyboard: 'keyboard',
}

interface TrainViewProps {
  scenarios: Scenario[]
  completedScenarioIds: Set<string>
}

function groupByCategory(scenarios: Scenario[]): Map<Category, Scenario[]> {
  const map = new Map<Category, Scenario[]>()
  for (const s of scenarios) {
    const group = map.get(s.category) ?? []
    group.push(s)
    map.set(s.category, group)
  }
  return map
}

export function TrainView({ scenarios, completedScenarioIds }: TrainViewProps) {
  const router = useRouter()
  const grouped = groupByCategory(scenarios)
  const categories = Array.from(grouped.keys())

  const [openCategories, setOpenCategories] = useState<Set<Category>>(
    () => new Set(categories)
  )

  const toggle = (cat: Category) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  return (
    <div className="h-full flex flex-col">
      <TopNav />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">

          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-8">
            scenarios
          </p>

          <div className="flex flex-col gap-8">
            {categories.map((cat) => {
              const items = grouped.get(cat)!
              const isOpen = openCategories.has(cat)
              const doneCount = items.filter((s) => completedScenarioIds.has(s.id)).length

              return (
                <section key={cat}>
                  {/* Category header */}
                  <button
                    onClick={() => toggle(cat)}
                    className="flex items-center w-full gap-2 mb-4 group"
                  >
                    <span className="text-[var(--text-3)] shrink-0">
                      {isOpen
                        ? <ChevronDown size={12} />
                        : <ChevronRight size={12} />}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors">
                      {CATEGORY_LABELS[cat]}
                    </span>
                    <div className="flex-1 h-px bg-[var(--border)] mx-2" />
                    <span className="font-mono text-[10px] text-[var(--text-3)] shrink-0">
                      {doneCount}/{items.length} done
                    </span>
                  </button>

                  {/* Cards grid */}
                  {isOpen && (
                    <div className="grid grid-cols-2 gap-3">
                      {items.map((scenario) => {
                        const done = completedScenarioIds.has(scenario.id)
                        return (
                          <button
                            key={scenario.id}
                            onClick={() => router.push(routes.session(scenario.id))}
                            className={cn(
                              'flex flex-col p-4 rounded text-left',
                              'border transition-colors duration-150',
                              'bg-[var(--surface-2)]',
                              done
                                ? 'border-[var(--accent)]/20 hover:border-[var(--accent)]/40'
                                : 'border-[var(--border)] hover:border-[var(--text-3)]'
                            )}
                          >
                            {/* Title row */}
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <span className={cn(
                                'font-sans text-sm leading-snug',
                                done ? 'text-[var(--accent)]' : 'text-[var(--text-1)]'
                              )}>
                                {scenario.title.replace(/^[^:]+:\s*/, '')}
                              </span>
                              {done && (
                                <Check size={12} className="text-[var(--accent)] shrink-0 mt-0.5" />
                              )}
                            </div>

                            {/* Progress bar */}
                            <div className="h-px bg-[var(--border)] rounded mb-3">
                              <div
                                className="h-full bg-[var(--accent)] rounded transition-all"
                                style={{ width: done ? '100%' : '0%' }}
                              />
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  scenario.difficulty === 'easy'   ? 'muted'    :
                                  scenario.difficulty === 'medium'  ? 'warning'  : 'danger'
                                }
                              >
                                {scenario.difficulty}
                              </Badge>
                              <span className="font-mono text-[10px] text-[var(--text-3)]">
                                {scenario.estimatedTime}m
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
