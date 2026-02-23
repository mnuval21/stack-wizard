## Why

OpenClaw is an open-source autonomous AI agent orchestrator with broad system access, yet there is no guided path for new users to choose a coherent, secure tech stack. The barrier to entry — reconciling LLM providers, compute environments, voice I/O, and security posture — is too high for most users. A wizard-driven Stack Advisor website removes this friction and drives OpenClaw adoption by turning a complex multi-variable setup decision into a simple, conversational flow.

## What Changes

- **New website**: A static React (Vite) single-page application — the "OpenClaw Stack Wizard" — lives in a new `web/` directory in this repo (or a dedicated repo, TBD)
- **Wizard flow**: Multi-step guided questionnaire covering environment, LLM provider, voice transcription, TTS, and security posture
- **Live stack preview panel**: Alongside the wizard, a Markdown-rendering panel builds the user's recommendation in real time as each step is answered
- **Export**: Users can copy or download their recommendation as Markdown, plain text, or JSON — no data is ever stored server-side
- **Hardware recommendations**: When all-local selections are made, the wizard surfaces minimum and recommended hardware specs with estimated cost ranges
- **Phase 2 stubs**: Voice, TTS, and security detail sections are fully present in the UI but display mocked/placeholder recommendations with "Phase 2 — Coming Soon" badges
- **Zero data retention**: No analytics, no cookies, no local storage persistence, no outbound network requests during wizard flow

## Capabilities

### New Capabilities

- `wizard-flow`: Multi-step branching questionnaire that collects environment, LLM, voice, TTS, and security preferences; drives all downstream recommendation logic
- `live-stack-preview`: A dual-panel layout where a Markdown-rendered recommendation panel updates in real time as wizard steps are completed
- `recommendation-engine`: Client-side logic that maps wizard selections to a structured recommendation object (environment, LLM, voice, TTS, security, hardware); includes cost range estimates for all choices
- `export-output`: Save/copy functionality that serializes the recommendation to Markdown, plain text, and JSON; supports clipboard copy and browser file download
- `hardware-advisor`: Conditional step that surfaces minimum/recommended hardware specs and cost ranges when the user selects a fully local stack (LLM + voice + TTS); proactively suggests VPS as alternative if compute requirements are high
- `terminal-ui`: Pip-Boy / retro 80s green-phosphor terminal visual theme (VT323 + Share Tech Mono fonts, scanline overlay, CRT glow, typing animations) embedded in a modern dark web shell

### Modified Capabilities

*(None — this is a greenfield project with no existing specs)*

## Impact

- **New code**: `web/` directory — React + Vite app, Vanilla CSS, client-side only
- **No backend**: Zero server-side components; deployable to any static host (GitHub Pages, Netlify, Vercel, self-hosted Nginx)
- **No external runtime dependencies**: All fonts self-hosted; no CDN libraries that phone home
- **Repo structure**: Adds `web/` alongside existing `openspec/` directory; no changes to existing OpenClaw core
- **Dependencies (build-time only)**: React, Vite, and a Markdown rendering library (e.g., `marked` or `react-markdown`)
