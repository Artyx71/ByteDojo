# ByteDojo

Terminal-first platform for training developer muscle memory.

Not LeetCode. Not courses. Not Duolingo.  
Real terminal workflows — practiced until they become reflex.

---

## What it is

ByteDojo puts you through scenario-based terminal sessions: vim navigation, git workflows, shell operations. Each step validates your exact keystrokes and tracks your progress. The goal is muscle memory, not knowledge.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 4 |
| Terminal | xterm.js 5 |
| State | Zustand 5 (persist) |
| Architecture | Feature-Sliced Design |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/dashboard` | Overview — streak, resume, quick start |
| `/train` | Scenario browser by category |
| `/session/[id]` | Training session with live terminal |
| `/profile` | Stats and category progress |

---

## Architecture

Feature-Sliced Design. Imports flow one direction: `app → widgets → features → entities → shared`.

```
src/
├── app/              # Next.js pages and layouts
├── widgets/          # Composed UI blocks (terminal-panel, scenario-sidebar, ...)
├── features/         # User actions (validate-step, track-keystroke, ...)
├── entities/         # Business types + UI (scenario, session, profile)
├── shared/           # Reusable utils, config, components
├── services/         # Data layer — swap mock → REST without touching UI
├── mocks/            # Typed mock data for Phase 1
└── terminal/         # Custom terminal engine (parser, filesystem, vim, commands)
```

The service layer is the only data boundary. `UI → Service → Provider`. Currently Provider = mock TS objects. Phase 2: Provider = REST API.

---

## Terminal engine

No real shell execution. Custom TypeScript engine simulates:

- **VirtualFS** — in-memory filesystem with ls/cd/cat/mkdir/touch/rm
- **Parser** — tokenizer handling quoted strings, short/long flags, git subcommands
- **Commands** — pwd, ls, cd, cat, mkdir, touch, rm, clear, echo, git, help
- **VimEditor** — full normal/insert/command mode with hjkl, w/b/e, gg/G, $, 0, :wq/:q
- **TerminalEngine** — orchestrates xterm.js ↔ engine ↔ Zustand store

---

## Scenarios

10 scenarios across three categories:

**Vim** — Basic Movements · Text Objects · Speed Drills  
**Shell** — Navigation · File Operations · Inspect Files  
**Git** — First Commit · Reading History · Full Workflow · Undo Last Commit

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm typecheck   # TypeScript check
pnpm test        # Vitest
pnpm build       # Production build
```

---

## Status

**Phase 1 — Frontend MVP** ✅  
All pages live. Terminal engine working. Completion state persisted via localStorage.

**Phase 2 — Backend** (planned)  
Better Auth · PostgreSQL + Prisma · WebSocket terminal sandbox · Progress sync
