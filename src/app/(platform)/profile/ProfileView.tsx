'use client'

import { TopNav } from '@/widgets/top-nav'
import type { Profile } from '@/entities/profile/model'
import { CATEGORY_LABELS } from '@/entities/scenario/model'
import { formatTimeShort } from '@/shared/lib'

interface ProfileViewProps {
  profile: Profile
}

function daysSince(ts: number): number {
  return Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24))
}

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
}

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-[var(--surface-2)] border border-[var(--border)] rounded">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">
        {label}
      </span>
      <span className="font-mono text-xl text-[var(--text-1)]">
        {value}
      </span>
      {sub && (
        <span className="font-mono text-[10px] text-[var(--text-3)]">{sub}</span>
      )}
    </div>
  )
}

export function ProfileView({ profile }: ProfileViewProps) {
  const { stats } = profile
  const joined = daysSince(profile.joinedAt)
  const categories = Object.entries(stats.byCategory) as [
    keyof typeof CATEGORY_LABELS,
    { completed: number; total: number }
  ][]

  return (
    <div className="h-full flex flex-col">
      <TopNav />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-8">

          {/* Identity */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-sans text-lg text-[var(--text-1)]">{profile.name}</h1>
              <span className="font-mono text-xs text-[var(--text-3)]">{profile.email}</span>
              <span className="font-mono text-[10px] text-[var(--text-3)]">
                joined {joined} day{joined !== 1 ? 's' : ''} ago
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-xs text-[var(--accent)]">
                {stats.currentStreak} day streak
              </span>
              <span className="font-mono text-[10px] text-[var(--text-3)]">
                best: {stats.bestStreak} days
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-3">
              stats
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="sessions" value={stats.totalSessions} />
              <StatCard label="accuracy" value={`${stats.accuracyPercent}%`} />
              <StatCard label="keystrokes" value={stats.totalKeystrokes} />
              <StatCard
                label="avg / step"
                value={formatTimeShort(stats.avgTimePerStepMs)}
                sub={`${stats.totalHintsUsed} hints used`}
              />
            </div>
          </div>

          {/* Category progress */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-3">
              progress by category
            </p>
            <div className="flex flex-col gap-3">
              {categories.map(([cat, { completed, total }]) => {
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--text-2)] w-16 shrink-0">
                      {CATEGORY_LABELS[cat].toLowerCase()}
                    </span>
                    <div className="flex-1 h-px bg-[var(--border)] relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-3)] w-10 text-right shrink-0">
                      {completed}/{total}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
