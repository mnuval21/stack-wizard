## Context

The OpenClaw Stack Wizard is a **greenfield static React (Vite) SPA** that guides users through a multi-step wizard to assemble a personalized, secure tech stack for running the [OpenClaw](https://github.com/openclaw/openclaw) AI agent orchestrator. It operates as a standalone `web/` directory within the `stack-wizard` repo — no backend, no APIs, no data retention.

The primary constraint is **zero runtime network requests** beyond initial page load (Google Fonts CDN is accepted). All recommendation logic is client-side. The visual identity is a Fallout Pip-Boy / 80s phosphor-green CRT terminal embedded in a modern dark shell.

**Proposal reference:** 6 capabilities — `wizard-flow`, `live-stack-preview`, `recommendation-engine`, `export-output`, `hardware-advisor`, `terminal-ui`.

## Goals / Non-Goals

**Goals:**
- Define the component architecture for the wizard and preview panels
- Establish the state management pattern (wizard selections → recommendation object → rendered output)
- Document the branching logic for environment-specific and hardware-conditional paths
- Choose the Markdown rendering approach for the live preview
- Define the recommendation data model and how Phase 2 stubs coexist with live data

**Non-Goals:**
- Detailed CSS specification (handled in implementation, guided by the terminal-ui spec)
- Specific recommendation content curation (Phase 2)
- Deployment infrastructure decisions
- Testing strategy details (covered in tasks)

## Decisions

### 1. Project Structure

**Decision:** Single Vite + React SPA in `web/` directory.

```
web/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.ico
└── src/
    ├── main.jsx                    # React root
    ├── App.jsx                     # Shell layout + routing
    ├── App.css                     # Global styles + CRT theme
    ├── components/
    │   ├── WizardShell.jsx         # Two-panel layout container
    │   ├── WizardStep.jsx          # Generic step renderer (question + choices)
    │   ├── StepNavigation.jsx      # Back / Next / Confirm controls
    │   ├── ChoiceCard.jsx          # Individual selectable option card
    │   ├── StackPreview.jsx        # Live Markdown preview panel
    │   ├── ExportControls.jsx      # Copy/Download buttons
    │   ├── GpuHelper.jsx           # Expandable GPU check instructions
    │   └── TerminalChrome.jsx      # CRT frame, scanlines, glow effects
    ├── data/
    │   ├── steps.js                # Step definitions, questions, choices
    │   ├── recommendations.js      # Mapping logic: selections → recommendations
    │   └── hardware.js             # Hardware specs + cost ranges
    ├── hooks/
    │   └── useWizard.js            # Central wizard state (useReducer)
    ├── utils/
    │   ├── exportMarkdown.js       # Serialize recommendation → Markdown
    │   ├── exportJson.js           # Serialize recommendation → JSON
    │   ├── exportText.js           # Serialize recommendation → plain text
    │   └── clipboard.js            # Clipboard + download helpers
    └── styles/
        ├── terminal.css            # CRT/Pip-Boy theme tokens + effects
        └── wizard.css              # Wizard-specific layout styles
```

**Why:** Flat component structure with clear data/logic separation. No routing library needed — wizard state drives what renders. Small enough that a single `useReducer` hook handles all state without Redux/Zustand overhead.

### 2. State Management: `useReducer` Wizard Machine

**Decision:** A single `useReducer` in `useWizard.js` manages all wizard state.

```
State shape:
{
  currentStep: number,           // 0-indexed current wizard step
  selections: {
    environment: string | null,  // 'macos' | 'windows' | 'linux' | 'vps'
    vpsProvider: string | null,  // only if environment === 'vps'
    llmType: string | null,      // 'local' | 'cloud-openrouter' | 'cloud-together' | 'other'
    voiceTranscription: string | null,  // 'none' | 'local' | 'cloud'
    tts: string | null,          // 'none' | 'local' | 'cloud'
    securityPosture: string | null,     // 'maximum' | 'balanced' | 'convenience'
    gpuType: string | null,      // 'nvidia' | 'amd' | 'apple-silicon' | 'none'
  },
  recommendation: object | null  // Computed from selections by recommendation engine
}
```

**Actions:** `SELECT_CHOICE`, `GO_BACK`, `RESET`

**Why `useReducer` over `useState`?** The branching logic (VPS sub-steps, conditional hardware step, auto-suggested security) benefits from a centralized reducer where transitions can be validated. A simple `useState` per step would scatter the branching logic across components.

**Why not a state library?** The state is small (< 10 fields), ephemeral (never persisted), and local to one component tree. Adding Zustand or Redux would be over-engineering.

### 3. Step Definitions as Data

**Decision:** Wizard steps are defined declaratively in `data/steps.js` as an array of step objects.

```js
// Simplified example:
{
  id: 'environment',
  question: 'Where will you run OpenClaw?',
  choices: [
    { id: 'macos', label: 'macOS', icon: '🖥', description: '...', costEstimate: '...' },
    { id: 'vps', label: 'VPS', icon: '☁️', description: '...', costEstimate: '$5–200/mo' },
    ...
  ],
  // Conditional: only show this step if condition is met
  showWhen: (selections) => true,  // always show
}
```

**Why data-driven?** Adding new steps or choices in Phase 2 requires zero component changes — just add entries to the data file. The `WizardStep` component is a pure renderer.

### 4. Branching Logic

**Decision:** Steps use a `showWhen` predicate function that receives current selections and returns a boolean.

| Step | `showWhen` condition |
|---|---|
| Environment | Always shown |
| VPS Provider | `selections.environment === 'vps'` |
| LLM Provider | Always shown |
| Voice Transcription | Always shown |
| TTS | Always shown |
| Security Posture | Always shown |
| GPU Check | `hasLocalComponent(selections) && selections.environment !== 'vps'` |
| Hardware Recommendation | `hasLocalComponent(selections)` |
| Summary | Always shown (final step) |

The `useWizard` reducer skips steps whose `showWhen` returns false when navigating forward/back.

### 5. Recommendation Engine

**Decision:** Pure function `buildRecommendation(selections) → RecommendationObject` in `data/recommendations.js`.

The recommendation object follows the PRD data model:

```js
{
  environment: { type, provider, estCost },
  llm: { type, provider, estCost, status },
  voiceTranscription: { type, provider, estCost, status },
  tts: { type, provider, estCost, status },
  security: { posture, recommendation, status },
  hardware: { minimum, recommended, estCost } | null,
}
```

- `status` field is either `'active'` or `'phase2_stub'`
- Phase 2 stubs are populated with placeholder data and flagged
- The function is called reactively on every selection change — the `recommendation` state updates and the preview re-renders

**Why a pure function vs. a rules engine?** With ~30 total choice combinations and no dynamic data, a simple function with conditional logic is readable and maintainable. A rules engine would be premature abstraction.

### 6. Live Stack Preview

**Decision:** The `StackPreview` component renders a Markdown string generated from the current recommendation object using `react-markdown`.

**Flow:**
```
selections → buildRecommendation() → exportMarkdown() → <StackPreview />
```

- `exportMarkdown()` generates a formatted Markdown string with section headers, tables, and badges
- `react-markdown` renders it in the preview panel
- Phase 2 stub sections are wrapped in a visual `[PHASE 2 — COMING SOON]` badge (CSS-styled)
- Incomplete/pending sections show as `[pending...]` with dimmed styling

**Why `react-markdown`?** Lightweight (~13kb gzipped), no XSS risk with default sanitization, and the same Markdown string doubles as the export output — single source of truth.

### 7. Export System

**Decision:** Three serializers + two output methods.

| Serializer | Module | Output |
|---|---|---|
| Markdown | `exportMarkdown.js` | Human-readable `.md` with headers, tables, badges |
| Plain text | `exportText.js` | Stripped, indented text (no Markdown syntax) |
| JSON | `exportJson.js` | Structured recommendation object |

| Output method | Implementation |
|---|---|
| Copy to clipboard | `navigator.clipboard.writeText()` with fallback to `document.execCommand('copy')` |
| Download as `.md` file | `Blob` + `URL.createObjectURL()` + click-triggered `<a download>` |

**Why no server?** The entire export pipeline runs in the browser. The Markdown string used for preview IS the export string — zero duplication.

### 8. CRT Terminal Theme

**Decision:** CSS custom properties + pseudo-element overlays.

```css
/* Core theme tokens */
--terminal-green: #00FF41;
--terminal-amber: #FFB000;
--terminal-bg: #0a0a0a;
--terminal-glow: 0 0 10px rgba(0, 255, 65, 0.3);
--scanline-opacity: 0.05;
```

- **Scanlines:** `::after` pseudo-element with repeating linear gradient
- **CRT glow:** `box-shadow` on the terminal container
- **Typing effect:** CSS animation with `steps()` timing function on text reveal
- **Cursor blink:** CSS keyframe `@keyframes blink` on a `::after` block cursor

**Why CSS-only (no animation library)?** The effects are simple enough that CSS handles them performantly. Adding Framer Motion or GSAP for scanlines and cursor blink would be dependency bloat.

### 9. Security Posture Auto-Suggest

**Decision:** The security step pre-selects a recommendation based on prior choices but lets the user override.

| Prior selections | Auto-suggested posture |
|---|---|
| Local env + Local LLM | Maximum Privacy |
| VPS env (any LLM) | Balanced (VPS + Secure Tunnel) |
| Local env + Cloud LLM | Convenience (Cloud API + HTTPS) |

The auto-suggestion is a visual highlight (pre-selected card with `[RECOMMENDED]` badge), not a locked choice.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| **Phase 2 stubs may confuse users** who expect real recommendations | Clear visual badges + explanatory tooltip: "This section will have detailed recommendations in a future update." |
| **Google Fonts CDN is a privacy trade-off** | Accepted per product decision. Google Fonts serves fonts without cookies/tracking. Can self-host later if concerns arise. |
| **Hardware cost estimates become stale** | Costs are stored in `data/hardware.js` as plain data — easy to update without code changes. Add "last updated" timestamp to the data. |
| **react-markdown bundle size** (~13kb gzip) could grow if plugins are added | Pin the dependency and avoid adding plugins. If bundle size becomes a concern, swap to a lighter renderer or pre-render at build time. |
| **No server = no way to update recommendations without redeployment** | Acceptable for Phase 1. Phase 2 could load recommendations from a static JSON file fetched at load time (still no backend). |
| **Branching logic complexity could grow in Phase 2** | Data-driven step definitions + `showWhen` predicates keep branching isolated. If it grows beyond 15 steps, consider a formal state machine (XState). |
