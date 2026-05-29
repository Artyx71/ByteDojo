'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ─── Vim demo data ────────────────────────────────────────────

const FILE_LINES = [
  '# Vim Tips',
  '',
  'ByteDojo helps you master vim motions',
  'through deliberate practice.',
  '',
  'Basic motions:',
  '  h j k l   move cursor',
  '  0 / $      line start / end',
  '  gg / G     file start / end',
  '  w / b / e  word navigation',
  '',
  'Practice makes permanent.',
]

type Frame = { line: number; col: number; key: string; ms: number }

const FRAMES: Frame[] = [
  { line: 0,  col: 0,  key: '',    ms: 1600 },
  { line: 11, col: 0,  key: 'G',   ms: 1000 },
  { line: 0,  col: 0,  key: 'gg',  ms: 900  },
  { line: 0,  col: 9,  key: '$',   ms: 800  },
  { line: 0,  col: 0,  key: '0',   ms: 800  },
  { line: 5,  col: 0,  key: '5j',  ms: 1000 },
  { line: 5,  col: 6,  key: 'w',   ms: 700  },
  { line: 5,  col: 0,  key: 'b',   ms: 700  },
  { line: 11, col: 0,  key: 'G',   ms: 1400 },
]

// ─── Terminal demo ────────────────────────────────────────────

function VimDemo() {
  const [fi, setFi] = useState(0)
  const [ready, setReady] = useState(false)
  const [keyVisible, setKeyVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const frame = FRAMES[fi]
    setKeyVisible(!!frame.key)
    const hide = frame.key ? setTimeout(() => setKeyVisible(false), 320) : undefined
    const next = setTimeout(() => setFi(i => (i + 1) % FRAMES.length), frame.ms)
    return () => { clearTimeout(next); if (hide) clearTimeout(hide) }
  }, [fi, ready])

  const f = FRAMES[fi]

  return (
    <div style={{
      opacity: ready ? 1 : 0,
      transform: ready ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      background: '#0d0d0d',
      border: '1px solid #1f1f1f',
      borderRadius: '6px',
      overflow: 'hidden',
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: '12px',
      lineHeight: '1.6',
    }}>
      {/* Titlebar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 12px',
        borderBottom: '1px solid #1a1a1a',
        background: '#111',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a3e635', display: 'block' }} />
        <span style={{ color: '#5a5a5a', fontSize: '11px' }}>vim-tips.md</span>
      </div>

      {/* File lines */}
      <div style={{ padding: '8px 0' }}>
        {FILE_LINES.map((content, idx) => {
          const lineNum = String(idx + 1).padStart(3, ' ')
          const isActive = idx === f.line

          let lineEl: React.ReactNode
          if (!content) {
            lineEl = <span>&nbsp;</span>
          } else if (isActive) {
            const before = content.slice(0, f.col)
            const ch = content[f.col] ?? ' '
            const after = content.slice(f.col + 1)
            lineEl = (
              <>
                <span style={{ color: '#8a8a8a' }}>{before}</span>
                <span style={{ background: '#a3e635', color: '#0a0a0a', boxShadow: '0 0 8px rgba(163,230,53,0.4)' }}>{ch}</span>
                <span style={{ color: '#8a8a8a' }}>{after}</span>
              </>
            )
          } else {
            lineEl = <span style={{ color: idx === 0 ? '#e2e2e2' : '#4a4a4a' }}>{content}</span>
          }

          return (
            <div key={idx} style={{ display: 'flex', paddingInline: '12px' }}>
              <span style={{ color: '#252525', marginRight: '16px', userSelect: 'none', minWidth: '24px' }}>
                {lineNum}
              </span>
              <span style={{ flex: 1 }}>{lineEl}</span>
            </div>
          )
        })}
      </div>

      {/* Statusline */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '2px 8px',
        background: '#d4d4d4',
        color: '#0a0a0a',
        fontSize: '11px',
      }}>
        <span>NORMAL&nbsp;&nbsp;vim-tips.md</span>
        <span>{f.line + 1},{f.col + 1}&nbsp;&nbsp;&nbsp;&nbsp;All</span>
      </div>

      {/* Key echo */}
      <div style={{ height: '22px', padding: '2px 12px', color: '#a3e635' }}>
        <span style={{
          opacity: keyVisible ? 1 : 0,
          transition: 'opacity 0.15s',
          textShadow: '0 0 8px rgba(163,230,53,0.6)',
        }}>
          {f.key}
        </span>
      </div>
    </div>
  )
}

// ─── Stagger reveal ───────────────────────────────────────────

function useReveal(delay: number) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return visible
}

function reveal(visible: boolean): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-10px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  }
}

// ─── Feature item ─────────────────────────────────────────────

function Feature({ label, desc, delay }: { label: string; desc: string; delay: number }) {
  const visible = useReveal(delay)
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{ color: '#a3e635', fontSize: '11px', marginBottom: '6px', textShadow: '0 0 6px rgba(163,230,53,0.35)' }}>
        {label}
      </div>
      <div style={{ color: '#4a4a4a', fontSize: '11px', lineHeight: 1.6 }}>
        {desc}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────

export default function LandingPage() {
  const navVisible   = useReveal(80)
  const l1           = useReveal(280)
  const l2           = useReveal(460)
  const l3           = useReveal(640)
  const subVisible   = useReveal(880)
  const ctaVisible   = useReveal(1050)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#e2e2e2',
      fontFamily: '"IBM Plex Mono", monospace',
    }}>
      {/* Scanlines overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
      }} />

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid #141414',
        opacity: navVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <span style={{ fontSize: '14px', letterSpacing: '0.04em' }}>
          ByteDojo{' '}
          <span style={{ color: '#a3e635', textShadow: '0 0 10px rgba(163,230,53,0.5)' }}>&gt;_</span>
        </span>

        <Link href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px',
          border: '1px solid #222',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#a3e635',
          textDecoration: 'none',
          background: 'rgba(163,230,53,0.04)',
          textShadow: '0 0 6px rgba(163,230,53,0.4)',
        }}>
          $ start
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
        padding: '88px 40px 64px',
        maxWidth: '1080px',
        margin: '0 auto',
      }}>
        {/* Tagline */}
        <div>
          <div style={{ marginBottom: '44px' }}>
            <div style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '4px', ...reveal(l1) }}>
              train your
            </div>
            <div style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '4px', ...reveal(l2) }}>
              developer
            </div>
            <div style={{
              fontSize: 'clamp(34px, 4vw, 54px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#a3e635',
              textShadow: '0 0 40px rgba(163,230,53,0.2)',
              ...reveal(l3),
            }}>
              muscle memory.
            </div>
          </div>

          <div style={{ ...reveal(subVisible), marginBottom: '36px' }}>
            <p style={{ fontSize: '12px', color: '#4a4a4a', lineHeight: 1.8, maxWidth: '340px' }}>
              Not LeetCode. Not courses. Not Duolingo.<br />
              Real terminal workflows — practiced until<br />
              they become reflex.
            </p>
          </div>

          <div style={{ ...reveal(ctaVisible), display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              border: '1px solid #a3e635',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#a3e635',
              textDecoration: 'none',
              background: 'rgba(163,230,53,0.06)',
              textShadow: '0 0 8px rgba(163,230,53,0.4)',
              boxShadow: '0 0 24px rgba(163,230,53,0.07)',
            }}>
              start training →
            </Link>
            <span style={{ fontSize: '11px', color: '#2a2a2a' }}>no account needed</span>
          </div>
        </div>

        {/* Terminal */}
        <VimDemo />
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #111', margin: '0 40px' }} />

      {/* Features */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 40px',
      }}>
        {[
          { label: 'vim motions', desc: 'hjkl to gg, G, w, b, e — navigation that becomes reflex, not lookup.', delay: 1400 },
          { label: 'git workflows', desc: 'status → add → commit → reset — practice recovery before it goes wrong.', delay: 1600 },
          { label: 'shell fluency', desc: 'cd, ls, cat, mkdir — build the muscle memory that makes you fast.', delay: 1800 },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '32px 28px',
            borderRight: i < 2 ? '1px solid #111' : undefined,
          }}>
            <Feature label={f.label} desc={f.desc} delay={f.delay} />
          </div>
        ))}
      </section>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #0f0f0f',
        margin: '0 40px',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '11px', color: '#222' }}>ByteDojo — terminal-first developer training</span>
        <span style={{ fontSize: '11px', color: '#222' }}>Phase 1 MVP</span>
      </div>
    </div>
  )
}
