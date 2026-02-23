## ADDED Requirements

### Requirement: Dual-panel layout
The system SHALL display a two-panel layout: a wizard panel on the left and a live stack preview panel on the right. On screens narrower than 768px, the panels SHALL stack vertically with the wizard on top and the preview below.

#### Scenario: Desktop layout
- **WHEN** the viewport width is 768px or wider
- **THEN** the wizard panel and stack preview panel SHALL be displayed side by side

#### Scenario: Mobile layout
- **WHEN** the viewport width is narrower than 768px
- **THEN** the wizard panel SHALL be displayed above the stack preview panel in a stacked layout

### Requirement: Real-time preview updates
The stack preview panel SHALL update in real time as each wizard step is confirmed. Each confirmed selection SHALL immediately appear in the preview as a formatted section.

#### Scenario: Selection triggers preview update
- **WHEN** user confirms a selection on any wizard step
- **THEN** the corresponding section in the stack preview SHALL update within 100ms to reflect the new choice

#### Scenario: Incomplete sections show pending state
- **WHEN** a wizard step has not yet been reached
- **THEN** the corresponding section in the stack preview SHALL display as "[pending...]" with dimmed styling

### Requirement: Phase 2 stub badges in preview
Phase 2 stub recommendations SHALL be displayed in the preview panel with a visible "[PHASE 2 — COMING SOON]" badge. The stub content SHALL still show placeholder provider names and cost estimates.

#### Scenario: Stub section display
- **WHEN** a selection has `status: 'phase2_stub'` (e.g., local voice transcription)
- **THEN** the preview section SHALL render with a "[PHASE 2 — COMING SOON]" badge
- **THEN** the preview section SHALL display placeholder provider name and cost

### Requirement: Preview formatted as Markdown
The stack preview panel SHALL render its content as styled Markdown with section headers, tables, and inline formatting. The rendered Markdown SHALL be identical to the string exported via the "Copy as Markdown" function.

#### Scenario: Markdown rendering fidelity
- **WHEN** the recommendation object is fully populated
- **THEN** the preview panel SHALL render the same Markdown string that would be produced by the Markdown export function
