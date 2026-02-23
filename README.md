# OpenClaw Stack Wizard

A guided, interactive wizard that helps new users choose a coherent, secure tech stack for [OpenClaw](https://github.com/openclaw/openclaw) — an open-source autonomous AI agent orchestrator.

Setting up OpenClaw means making a lot of interconnected decisions: compute environment, LLM provider, voice I/O, security posture, and hardware requirements. The Stack Wizard turns that complexity into a simple conversational flow with a live recommendation that builds as you answer each question.

---

## Features

- **Branching questionnaire** — 6–8 steps depending on your selections (environment, LLM, voice transcription, TTS, security posture, GPU/hardware)
- **Live stack preview** — a right-hand panel types out your recommendation in real time as you make choices
- **Hardware advisor** — surfaces minimum and recommended specs with cost ranges when a fully local stack is selected
- **4 export formats** — copy as Markdown, plain text, or JSON; download as a `.md` file
- **Retro CRT terminal UI** — phosphor amber, scanline overlay, VT323 font, blinking cursor, typewriter animations
- **Zero data retention** — no backend, no cookies, no analytics, no network requests during the wizard flow
- **Fully accessible** — keyboard navigation, ARIA live regions, screen reader support

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Vanilla CSS (no UI library) |
| State | `useReducer` (no Redux) |
| Markdown | `react-markdown` |
| Fonts | VT323 + Share Tech Mono (self-hosted) |
| Hosting | Any static host — GitHub Pages, Netlify, Vercel, Nginx |

No backend. No external CDN dependencies. Deployable as a static site.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/stack-wizard.git
cd stack-wizard/web

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `web/dist/` — drop it on any static host.

---

## Project Structure

```
stack-wizard/
├── web/                        # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── WizardShell.jsx     # Two-panel layout shell
│   │   │   ├── WizardStep.jsx      # Step renderer
│   │   │   ├── ChoiceCard.jsx      # Individual choice button
│   │   │   ├── StackPreview.jsx    # Live preview panel (typewriter)
│   │   │   ├── StepNavigation.jsx  # Back / Start Over buttons
│   │   │   ├── ExportControls.jsx  # Copy / download buttons
│   │   │   ├── TerminalChrome.jsx  # CRT frame wrapper
│   │   │   └── GpuHelper.jsx       # OS-specific GPU detection guide
│   │   ├── data/
│   │   │   ├── steps.js            # Step definitions (data-driven)
│   │   │   ├── recommendations.js  # Recommendation engine (pure function)
│   │   │   └── hardware.js         # Hardware specs + cost ranges
│   │   ├── hooks/
│   │   │   └── useWizard.js        # State machine (useReducer)
│   │   ├── styles/
│   │   │   ├── terminal.css        # CRT theme, colors, animations
│   │   │   └── wizard.css          # Two-panel grid layout
│   │   └── utils/
│   │       ├── exportMarkdown.js   # Markdown serializer
│   │       ├── exportText.js       # Plain text serializer
│   │       ├── exportJson.js       # JSON serializer
│   │       └── clipboard.js        # Clipboard + download helpers
│   └── package.json
└── openspec/                   # Spec-driven design docs
    ├── specs/                  # BDD-style capability specs
    └── changes/                # Proposals, design docs, task lists
```

---

## Roadmap

### Phase 1 — Complete
- Full wizard flow with branching logic
- Live stack preview with typewriter animation
- Hardware advisor for local stacks
- 4 export formats (Markdown, plain text, JSON, file download)
- Retro CRT terminal UI

### Phase 2 — Detailed Recommendations *(in progress)*
- Expanded voice transcription setup guides (Whisper.cpp, cloud options)
- TTS implementation guides (Piper TTS, cloud options)
- Security posture deep-dives (local network hardening, WireGuard/Tailscale, cloud API hardening)

### Phase 3 — AI-Powered Analysis *(planned)*
- Send your completed stack to an AI via OpenRouter API
- Receive a personalized configuration analysis and step-by-step setup instructions
- Still fully client-side — your API key, your data

---

## Contributing

Contributions welcome. The project uses a spec-driven workflow — see `openspec/` for capability specs and design docs before opening a PR.

```bash
npm run lint    # ESLint
npm run build   # Verify production build
```

---

## License

MIT
