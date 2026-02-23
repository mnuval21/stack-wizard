# terminal-ui Specification

## Purpose
TBD - created by archiving change openclaw-stack-wizard. Update Purpose after archive.
## Requirements
### Requirement: CRT terminal container
The wizard SHALL be rendered inside a CRT-style terminal container with a green phosphor (#00FF41) or amber (#FFB000) color scheme, dark background (#0a0a0a), and a subtle screen-glow box-shadow effect.

#### Scenario: Terminal container styling
- **WHEN** the wizard page loads
- **THEN** the terminal container SHALL display with a dark background, phosphor-green text, and a glowing border effect
- **THEN** all text inside the terminal SHALL use a monospace font (VT323 or Share Tech Mono from Google Fonts)

### Requirement: Scanline overlay
The terminal container SHALL display a scanline overlay effect using a CSS pseudo-element with a repeating linear gradient at low opacity.

#### Scenario: Scanline visibility
- **WHEN** the terminal is rendered
- **THEN** thin horizontal scanlines SHALL be visible across the terminal surface at ~5% opacity
- **THEN** scanlines SHALL NOT interfere with text readability or clickable elements

### Requirement: Typing cursor animation
The wizard SHALL display a blinking block cursor animation at the active input area, styled as a classic terminal cursor.

#### Scenario: Cursor blink on active step
- **WHEN** a wizard step is active and awaiting user input
- **THEN** a block cursor SHALL blink with a CSS keyframe animation at the prompt line

### Requirement: Text reveal animation
New wizard step content SHALL be revealed with a typing effect that simulates text appearing character by character or line by line.

#### Scenario: Step transition animation
- **WHEN** the wizard advances to a new step
- **THEN** the question text SHALL appear with a typing reveal animation using CSS `steps()` timing function
- **THEN** the choice options SHALL appear after the question text finishes revealing

### Requirement: Choice cards styled as terminal options
Wizard choices SHALL be styled as terminal input options with keystroke affordance (e.g., `[A]`, `[B]`) and SHALL be clickable. Hover and focus states SHALL use the terminal color palette.

#### Scenario: Choice card interaction
- **WHEN** user hovers over a choice card
- **THEN** the card SHALL display a highlighted border and background in the terminal theme color
- **THEN** the card SHALL be keyboard-focusable and selectable via Enter key

### Requirement: Modern outer chrome
The area outside the terminal container SHALL use a modern dark web design with a near-black background, subtle texture or noise, and a modern sans-serif font for any outer-chrome text (e.g., site title, footer).

#### Scenario: Outer chrome styling
- **WHEN** the page loads
- **THEN** the terminal container SHALL be centered within a modern dark background
- **THEN** any text outside the terminal (title bar, footer) SHALL use a modern sans-serif font

### Requirement: Keyboard navigation
All wizard controls SHALL be fully keyboard-navigable. Users SHALL be able to tab between choices and press Enter to confirm a selection.

#### Scenario: Keyboard-only wizard completion
- **WHEN** user navigates the wizard using only keyboard (Tab + Enter)
- **THEN** all steps SHALL be completable without using a mouse
- **THEN** focus indicators SHALL be clearly visible in the terminal theme

### Requirement: ARIA accessibility
All interactive elements SHALL have appropriate ARIA labels. The wizard step transitions SHALL announce the new step content to screen readers.

#### Scenario: Screen reader support
- **WHEN** the wizard advances to a new step
- **THEN** the new step question SHALL be announced via an ARIA live region
- **THEN** all choice cards SHALL have ARIA labels describing their purpose and cost

