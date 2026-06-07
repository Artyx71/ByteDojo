# Graph Report - src  (2026-06-07)

## Corpus Check
- Corpus is ~10,577 words - fits in a single context window. You may not need a graph.

## Summary
- 104 nodes · 89 edges · 44 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Shell Commands & VirtualFS|Shell Commands & VirtualFS]]
- [[_COMMUNITY_Vim Editor Engine|Vim Editor Engine]]
- [[_COMMUNITY_Terminal Core & Parser|Terminal Core & Parser]]
- [[_COMMUNITY_Metrics Calculations|Metrics Calculations]]
- [[_COMMUNITY_Terminal UI & Runtime|Terminal UI & Runtime]]
- [[_COMMUNITY_Time Formatters|Time Formatters]]
- [[_COMMUNITY_ServerClient Strip Utils|Server/Client Strip Utils]]
- [[_COMMUNITY_App Providers|App Providers]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Platform Layout|Platform Layout]]
- [[_COMMUNITY_Dashboard Page|Dashboard Page]]
- [[_COMMUNITY_Train View|Train View]]
- [[_COMMUNITY_Train Page|Train Page]]
- [[_COMMUNITY_Session Page|Session Page]]
- [[_COMMUNITY_Profile Page|Profile Page]]
- [[_COMMUNITY_Profile View|Profile View]]
- [[_COMMUNITY_Scenario Sidebar|Scenario Sidebar]]
- [[_COMMUNITY_Task Panel|Task Panel]]
- [[_COMMUNITY_Session Header|Session Header]]
- [[_COMMUNITY_Top Nav|Top Nav]]
- [[_COMMUNITY_Session Complete|Session Complete]]
- [[_COMMUNITY_Scenario Model|Scenario Model]]
- [[_COMMUNITY_Badge UI|Badge UI]]
- [[_COMMUNITY_Kbd UI|Kbd UI]]
- [[_COMMUNITY_cn Utility|cn Utility]]
- [[_COMMUNITY_Landing Page|Landing Page]]
- [[_COMMUNITY_Dashboard View|Dashboard View]]
- [[_COMMUNITY_Session View|Session View]]
- [[_COMMUNITY_Scenario Card|Scenario Card]]
- [[_COMMUNITY_Session Model Types|Session Model Types]]
- [[_COMMUNITY_Session Store (Zustand)|Session Store (Zustand)]]
- [[_COMMUNITY_Task Model|Task Model]]
- [[_COMMUNITY_Profile Model|Profile Model]]
- [[_COMMUNITY_Shared UI Exports|Shared UI Exports]]
- [[_COMMUNITY_Shared Lib Exports|Shared Lib Exports]]
- [[_COMMUNITY_Routes Config|Routes Config]]
- [[_COMMUNITY_Scenarios Service|Scenarios Service]]
- [[_COMMUNITY_Sessions Service|Sessions Service]]
- [[_COMMUNITY_Profile Service|Profile Service]]
- [[_COMMUNITY_Stats Service|Stats Service]]
- [[_COMMUNITY_Sessions Mock|Sessions Mock]]
- [[_COMMUNITY_Users Mock|Users Mock]]
- [[_COMMUNITY_Stats Mock|Stats Mock]]
- [[_COMMUNITY_Scenarios Mock|Scenarios Mock]]

## God Nodes (most connected - your core abstractions)
1. `VirtualFS` - 11 edges
2. `VimEditor` - 9 edges
3. `executeCommand()` - 9 edges
4. `TerminalEngine` - 7 edges
5. `TerminalPanel()` - 2 edges
6. `handleGit()` - 2 edges
7. `parseCommand()` - 2 edges
8. `useTerminalRuntime()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `TerminalPanel()` --calls--> `useTerminalRuntime()`  [INFERRED]
  src/widgets/terminal-panel/index.tsx → src/terminal/runtime/index.ts

## Communities

### Community 0 - "Shell Commands & VirtualFS"
Cohesion: 0.28
Nodes (3): executeCommand(), handleGit(), VirtualFS

### Community 1 - "Vim Editor Engine"
Cohesion: 0.4
Nodes (1): VimEditor

### Community 2 - "Terminal Core & Parser"
Cohesion: 0.22
Nodes (2): parseCommand(), TerminalEngine

### Community 3 - "Metrics Calculations"
Cohesion: 0.5
Nodes (0): 

### Community 4 - "Terminal UI & Runtime"
Cohesion: 0.5
Nodes (2): TerminalPanel(), useTerminalRuntime()

### Community 5 - "Time Formatters"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Server/Client Strip Utils"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "App Providers"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Platform Layout"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Dashboard Page"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Train View"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Train Page"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Session Page"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Profile Page"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Profile View"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Scenario Sidebar"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Task Panel"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Session Header"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Top Nav"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Session Complete"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Scenario Model"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Badge UI"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Kbd UI"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "cn Utility"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Landing Page"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Dashboard View"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Session View"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Scenario Card"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Session Model Types"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Session Store (Zustand)"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Task Model"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Profile Model"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Shared UI Exports"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Shared Lib Exports"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Routes Config"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Scenarios Service"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Sessions Service"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Profile Service"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Stats Service"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Sessions Mock"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Users Mock"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Stats Mock"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Scenarios Mock"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `App Providers`** (2 nodes): `Providers()`, `providers.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Platform Layout`** (2 nodes): `PlatformLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dashboard Page`** (2 nodes): `DashboardPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Train View`** (2 nodes): `TrainView.tsx`, `toggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Train Page`** (2 nodes): `TrainPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Page`** (2 nodes): `SessionPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile Page`** (2 nodes): `ProfilePage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile View`** (2 nodes): `daysSince()`, `ProfileView.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scenario Sidebar`** (2 nodes): `toggleCategory()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Panel`** (2 nodes): `handleHint()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Header`** (2 nodes): `handleExit()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Top Nav`** (2 nodes): `TopNav()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Complete`** (2 nodes): `StatBlock()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scenario Model`** (2 nodes): `groupByCategory()`, `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge UI`** (2 nodes): `Badge()`, `Badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Kbd UI`** (2 nodes): `Kbd()`, `Kbd.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `cn Utility`** (2 nodes): `cn()`, `cn.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Landing Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dashboard View`** (1 nodes): `DashboardView.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session View`** (1 nodes): `SessionView.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scenario Card`** (1 nodes): `ScenarioCard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Model Types`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Store (Zustand)`** (1 nodes): `store.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Model`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile Model`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared UI Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Lib Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Routes Config`** (1 nodes): `routes.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scenarios Service`** (1 nodes): `scenarios.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sessions Service`** (1 nodes): `sessions.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile Service`** (1 nodes): `profile.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stats Service`** (1 nodes): `stats.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sessions Mock`** (1 nodes): `sessions.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Mock`** (1 nodes): `users.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stats Mock`** (1 nodes): `stats.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scenarios Mock`** (1 nodes): `scenarios.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `executeCommand()` connect `Shell Commands & VirtualFS` to `Terminal Core & Parser`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `executeCommand()` (e.g. with `.executeShellCommand()` and `.ls()`) actually correct?**
  _`executeCommand()` has 7 INFERRED edges - model-reasoned connections that need verification._