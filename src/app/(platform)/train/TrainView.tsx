'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { Scenario, Category } from '@/entities/scenario/model'
import { CATEGORY_LABELS, groupByCategory } from '@/entities/scenario/model'
import { ScenarioCard } from '@/entities/scenario/ui/ScenarioCard'
import { useSessionStore } from '@/entities/session/model/store'
import { TopNav } from '@/widgets/top-nav'
import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

interface TrainViewProps {
  scenarios: Scenario[]
}

export function TrainView({ scenarios }: TrainViewProps) {
  const completedScenarioIds = new Set(useSessionStore((s) => s.completedScenarioIds))
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
                      {items.map((scenario) => (
                        <ScenarioCard
                          key={scenario.id}
                          scenario={scenario}
                          done={completedScenarioIds.has(scenario.id)}
                          onClick={() => router.push(routes.session(scenario.id))}
                        />
                      ))}
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
