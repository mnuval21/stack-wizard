## ADDED Requirements

### Requirement: Selection-to-recommendation mapping
The system SHALL map wizard selections to a structured recommendation object via a pure function. The function SHALL accept the current selections state and return a complete recommendation object.

#### Scenario: Complete selections produce full recommendation
- **WHEN** all wizard steps have been completed with selections
- **THEN** the recommendation object SHALL be fully populated with no null fields (except hardware, which is conditional)

#### Scenario: Partial selections produce partial recommendation
- **WHEN** only some wizard steps have been completed
- **THEN** the recommendation object SHALL contain data for completed steps and null for incomplete steps

### Requirement: Cost estimate inclusion
Every recommendation item SHALL include an estimated cost range. Cost estimates SHALL be present for all choices including environment, LLM, voice, TTS, and hardware.

#### Scenario: VPS with cloud LLM cost estimate
- **WHEN** user selects VPS (Hetzner) + Cloud (OpenRouter)
- **THEN** the recommendation SHALL include monthly cost estimates for both the VPS ($4–$60/mo) and LLM usage (~$0.001–$0.01/1K tokens)

### Requirement: Phase 2 stub marking
Recommendation items for features in Phase 2 refinement SHALL be marked with `status: 'phase2_stub'`. Items with full recommendations SHALL be marked with `status: 'active'`.

#### Scenario: Voice transcription stub
- **WHEN** user selects local voice transcription
- **THEN** the recommendation SHALL return `{ type: 'local', provider: 'whisper.cpp', status: 'phase2_stub', estCost: 'free' }`

### Requirement: Security posture recommendation
The recommendation engine SHALL generate a security recommendation based on the selected posture. Phase 1 SHALL include placeholder protocol recommendations.

#### Scenario: Maximum privacy posture
- **WHEN** user selects Maximum Privacy posture
- **THEN** the recommendation SHALL include `{ posture: 'maximum', recommendation: 'Local network hardening guide', status: 'phase2_stub' }`

#### Scenario: Balanced posture
- **WHEN** user selects Balanced posture
- **THEN** the recommendation SHALL include `{ posture: 'balanced', recommendation: 'WireGuard or Tailscale VPN tunnel', status: 'phase2_stub' }`
