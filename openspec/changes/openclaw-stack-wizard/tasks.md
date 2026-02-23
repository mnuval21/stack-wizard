```
### 1. Project Scaffolding
- [x] 1.1 Scaffold Vite context: `npx create-vite web --template react`
- [x] 1.2 Clear Vite boilerplate (App.css, index.css, default assets)
- [x] 1.3 Update `index.html` title, meta description, and Google Fonts links
- [x] 1.4 Install dependencies: `npm install react-markdown`components/`, `data/`, `hooks/`, `utils/`, `styles/`
- [x] 1.5 Install `react-markdown` dependency
- [x] 1.6 Clean up Vite boilerplate (remove default styles, logo, counter app)

### 2. Terminal UI Theme Core
- [x] 2.1 Create `src/styles/terminal.css` variables (colors, glow, scanline opacity)
- [x] 2.2 Implement `.terminal-frame` with scanline pseudo-element overlay
- [x] 2.3 Add custom `.terminal-cursor` blinking CSS animation
- [x] 2.4 Add `.type-reveal` and `.fade-slide-in` CSS animations for text rendering
- [x] 2.5 Style buttons (`.terminal-btn`), choice cards (`.choice-card`), and badges
- [x] 2.6 Create `src/styles/wizard.css` for the two-panel grid layout and responsive queries
- [x] 2.7 Create global `src/App.css` for dark modern outer chrome and CRT centeringames blink` on `::after` block cursor)
- [x] 2.5 Implement text reveal animation using CSS `steps()` timing function for new step transitions
- [x] 2.6 Create `App.css` with global styles — dark background, outer chrome layout with modern sans-serif font
- [x] 2.7 Add mobile responsive breakpoint (< 768px stacks wizard above preview)

### 3. Wizard State Machine
- [x] 3.1 Create `src/hooks/useWizard.js` hook scaffolding
- [x] 3.2 Define `INITIAL_SELECTIONS` object
- [x] 3.3 Implement `wizardReducer` with `SELECT_CHOICE` action
- [x] 3.4 Implement dependent selection clearing (e.g., clearing `vpsProvider` if `environment` switches from VPS)
- [x] 3.5 Implement `GO_BACK` and `RESET` actions — returns to previous applicable step, preserves selection
- [x] 3.4 Implement back-navigation clearing — when a prior selection changes, clear all dependent subsequent selections
- [x] 3.5 Implement `RESET` action — clears all state, returns to step 0
- [x] 3.6 Add `showWhen` predicate evaluation — skip steps whose condition returns false during forward/back nav

### 4. Step Data Definitions
- [x] 4.1 Create `src/data/steps.js` array
- [x] 4.2 Define Step 1: `environment` (macOS, Windows, Linux, VPS)
- [x] 4.3 Define Step 2: `vpsProvider` with `showWhen` logic restricted to VPS env
- [x] 4.4 Define Step 3: `llmType` (local vs cloud paths)
- [x] 4.5 Define Step 4: `voiceTranscription` (local vs cloud vs none, stub markers)
- [x] 4.6 Define Step 5: `tts` (local vs cloud vs none, stub markers)
- [x] 4.7 Define Step 6: `securityPosture` (maximum, balanced, convenience, stub markers)
- [x] 4.8 Add `autoSuggest` logic to `securityPosture` definition
- [x] 4.9 Define Step 7: `gpuType` with `showWhen` logic requiring local LLM/voice/TTS
- [x] 4.10 Define Step 8: Document `summary` step definitionts, Cloud) with Phase 2 stub flag
- [x] 4.6 Add Step 5: Security Posture (Maximum Privacy, Balanced, Convenience) with auto-suggest logic
- [x] 4.7 Add Step 6: GPU Check (Nvidia, AMD, Apple Silicon, None/Don't know) with `showWhen: hasLocalComponent && !isVps`
- [x] 4.8 Add Step 7: Hardware Recommendation (conditional display based on local component count and GPU type)
- [x] 4.9 Add Step 8: Summary (always shown, final step)

## 5. Wizard UI Components (wizard-flow + terminal-ui specs)

- [x] 5.1 Create `components/WizardShell.jsx` — two-panel layout container (wizard left, preview right)
- [x] 5.2 Create `components/WizardStep.jsx` — generic step renderer: question text + choice list,### 5. Shared UI Components
- [x] 5.1 Create `TerminalChrome.jsx` (outer border, title bar, window controls)
- [x] 5.2 Create `ChoiceCard.jsx` (radio-button alternative with keystroke letter, label, description, badges)
- [x] 5.3 Implement hover/focus glow effects on ChoiceCard
- [x] 5.4 Create `StepNavigation.jsx` (Back button, step indicator, start over button)
- [x] 5.5 Create `GpuHelper.jsx` `<details>` component with OS-specific terminal instructions
- [x] 5.6 Create `ProgressBar.jsx` segmented indicator components/GpuHelper.jsx` — expandable instructions for checking GPU (nvidia-smi, About This Mac, lspci)
- [x] 5.7 Add ARIA labels and roles to all interactive elements (choice cards, buttons, navigation)
- [x] 5.8 Add ARIA live region for step transitions (announce new question to screen readers)
- [x] 5.9 Ensure full keyboard navigation (Tab between choices, Enter to confirm, Escape to go back)

### 6. Recommendation Engine Rules
- [x] 6.1 Create `src/data/hardware.js` declaring Basic/Medium/Full hardware spec tiers and costs
- [x] 6.2 Create `src/data/recommendations.js:buildRecommendation()` pure function
- [x] 6.3 Implement mappings for Environment selection to final output strings
- [x] 6.4 Implement mappings for LLM selection to features/costs
- [x] 6.5 Implement Local Component Counter logic (is LLM + Voice + TTS local?)
- [x] 6.6 Implement Hardware Advisor tier threshold logic based on counter
- [x] 6.7 Include Phase 2 `.status = 'phase2_stub'` flags in security and voice output objects
- [x] 6.8 Append VPS Alternative warning object if hardware tier is Full
- [x] 6.9 Connect `buildRecommendation` output to the `useWizard` context values where applicable)
- [x] 6.6 Implement security posture mapping (posture → recommendation + placeholder protocol)
- [x] 6.7 Create `data/hardware.js` — hardware spec tables (minimum, recommended, cost ranges) per local component combination and GPU type
- [x] 6.8 Implement hardware recommendation logic — compute required specs based on selected local components
- [x] 6.9 Implement VPS alternative suggestion — trigger when full local stack exceeds cost threshold
- [x] 6.10 Wire `buildRecommendation()` into `useWizard` reducer — recompute on every selection change

## 7. Live Stack Preview (live-stack-p### 8. Live Preview Panel Integration
- [x] 8.1 Create `StackPreview.jsx` component
- [x] 8.2 Import `react-markdown` and render `exportMarkdown(recommendation)` output string
- [x] 8.3 Style Markdown typography to match green terminal theme
- [x] 8.4 Implement "Pending Phase" empty state view (blinking cursor fallback when empty)
- [x] 8.5 Ensure Markdown tables render bordered grid layouts seamlessly
- [x] 8.6 Inject `<ExportControls>` component at the bottom when `isSummaryStep = true`yling for incomplete sections
- [x] 7.4 Add "[PHASE 2 — COMING SOON]" badge styling for stub sections
- [x] 7.5 Ensure preview updates within 100ms of selection confirmation (reactive render from state)

## 8. Export System (export-out### 7. Export System
- [x] 7.1 Create `src/utils/exportMarkdown.js` serializer function
- [x] 7.2 Create `src/utils/exportJson.js` serializer function
- [x] 7.3 Create `src/utils/exportText.js` plain-text serializer function
- [x] 7.4 Create `src/utils/clipboard.js` utility (`navigator.clipboard` w/ execCommand fallback)
- [x] 7.5 Create `ExportControls.jsx` component holding action buttons
- [x] 7.6 Implement "Copied!" ephemeral UI state in buttons
- [x] 7.7 Implement "Download .md" Blob anchor click functionality — `Blob` + `URL.createObjectURL()` + `<a download="openclaw-stack-recommendation.md">`
- [x] 8.6 Add "Copied!" confirmation feedback on successful clipboard copy (brief toast or button text change)

### 9. App Assembly & Integration

- [x] 9.3 Add security posture auto-suggestion — pre-highlight recommended option based on environment + LLM choices
- [x] 9.4 Add VPS fallback CTA on hardware step — "Would you like to see a VPS-based alternative?" linking back to environment step
- [x] 9.5 Add unique IDs to all interactive elements for testability

## 10. Polish & Verification

- [x] 10.1 Test complete wizard flow — all environment paths (macOS, Windows, Linux, VPS) through to summary
- [x] 10.2 Test branching — VPS sub-step appears/hides correctly, hardware step triggers only for local components
- [x] 10.3 Test back navigation — selections preserved, dependent selections cleared on change
- [x] 10.4 Test all 4 export functions — Markdown copy, JSON copy, plain text copy, file download
- [x] 10.5 Test mobile responsive layout (< 768px stacked, ≥ 768px side-by-side)
- [x] 10.6 Test keyboard-only navigation through entire wizard flow
- [x] 10.7 Test screen reader announcements on step transitions (ARIA live region)
- [x] 10.8 Verify zero outbound network requests during wizard flow (DevTools Network tab audit)
- [x] 10.9 Verify no cookies, no localStorage usage, no analytics scripts
- [x] 10.10 Run production build (`npm run build`) and verify output
