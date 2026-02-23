# wizard-flow Specification

## Purpose
TBD - created by archiving change openclaw-stack-wizard. Update Purpose after archive.
## Requirements
### Requirement: Multi-step wizard navigation
The system SHALL present a linear, multi-step wizard where each step occupies a single screen within the terminal panel. The user SHALL be able to navigate forward by confirming a choice and backward to previous steps.

#### Scenario: User advances to next step
- **WHEN** user selects a choice and confirms on the current step
- **THEN** the wizard advances to the next applicable step (skipping steps whose `showWhen` condition is false)

#### Scenario: User navigates back
- **WHEN** user clicks the Back button on any step after the first
- **THEN** the wizard returns to the previous applicable step with the prior selection preserved

#### Scenario: Back navigation clears subsequent answers
- **WHEN** user navigates back and changes their selection on a prior step
- **THEN** all selections on subsequent steps that depended on the changed value SHALL be cleared

### Requirement: Environment selection step
The system SHALL present the environment selection as the first wizard step with four choices: macOS, Windows, Linux, and VPS. Each choice SHALL display a description and estimated cost range.

#### Scenario: User selects a local environment
- **WHEN** user selects macOS, Windows, or Linux
- **THEN** the wizard advances to the LLM Provider step, skipping VPS-specific sub-steps

#### Scenario: User selects VPS
- **WHEN** user selects VPS
- **THEN** the wizard advances to the VPS Provider sub-step before continuing to LLM Provider

### Requirement: VPS provider sub-step
The system SHALL present a VPS provider selection step only when the user has selected VPS as their environment. Choices SHALL include DigitalOcean, Hetzner Cloud, Linode (Akamai), AWS EC2, and Other/I'm not sure, each with estimated monthly cost ranges.

#### Scenario: VPS provider step visibility
- **WHEN** user has selected VPS as environment
- **THEN** the VPS provider selection step SHALL be displayed

#### Scenario: VPS provider step hidden
- **WHEN** user has selected macOS, Windows, or Linux as environment
- **THEN** the VPS provider selection step SHALL NOT be displayed

### Requirement: LLM provider selection step
The system SHALL present LLM provider choices: Local Model (Ollama), Open-Source Cloud (OpenRouter), Open-Source Cloud (Together.ai), and Other (self-hosted, API). Each choice SHALL display a description and estimated cost range.

#### Scenario: User selects local LLM
- **WHEN** user selects Local Model (Ollama)
- **THEN** the selection is recorded and the wizard advances to Voice Transcription
- **THEN** the hardware check step SHALL be conditionally triggered at the end of the wizard

### Requirement: Voice transcription selection step
The system SHALL present voice transcription choices: No, Yes — Local (Whisper.cpp), and Yes — Cloud. Local and cloud options SHALL display with a Phase 2 stub badge.

#### Scenario: User selects local voice transcription
- **WHEN** user selects "Yes — Local (Whisper.cpp)"
- **THEN** the selection is recorded with `status: 'phase2_stub'`
- **THEN** the live preview shows a placeholder recommendation with a "[PHASE 2 — COMING SOON]" badge

### Requirement: TTS selection step
The system SHALL present TTS choices: No, Yes — Local, and Yes — Cloud. Local and cloud options SHALL display with a Phase 2 stub badge.

#### Scenario: User selects local TTS
- **WHEN** user selects "Yes — Local"
- **THEN** the selection is recorded with `status: 'phase2_stub'` and placeholder provider `piper-tts`

### Requirement: Security posture selection step
The system SHALL present security posture choices: Maximum Privacy (Local-only), Balanced (VPS + Secure Tunnel), and Convenience (Cloud API + HTTPS). All choices SHALL display with Phase 2 stub badges for detailed guides. The system SHALL auto-suggest a posture based on prior selections.

#### Scenario: Auto-suggestion for local environment with local LLM
- **WHEN** user has selected a local environment AND Local Model (Ollama) as LLM
- **THEN** the "Maximum Privacy" option SHALL be pre-highlighted with a "[RECOMMENDED]" badge

#### Scenario: Auto-suggestion for VPS environment
- **WHEN** user has selected VPS as environment
- **THEN** the "Balanced (VPS + Secure Tunnel)" option SHALL be pre-highlighted with a "[RECOMMENDED]" badge

#### Scenario: User overrides auto-suggestion
- **WHEN** user selects a security posture other than the auto-suggested one
- **THEN** the user's explicit choice SHALL be recorded without warning or friction

### Requirement: Summary step
The system SHALL display a final summary step showing the complete recommendation with all sections populated. The summary step SHALL display export controls.

#### Scenario: Summary step completion
- **WHEN** user reaches the summary step
- **THEN** the full recommendation is displayed in the live preview panel
- **THEN** export controls (Copy MD, Copy JSON, Copy Text, Download) are enabled

### Requirement: Wizard reset
The system SHALL provide a "Start Over" button that clears all state and returns to Step 1. No data SHALL be retained after reset.

#### Scenario: User restarts wizard
- **WHEN** user clicks "Start Over"
- **THEN** all selections, the recommendation object, and the preview panel SHALL be cleared
- **THEN** the wizard SHALL return to the Environment selection step

