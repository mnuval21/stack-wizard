# export-output Specification

## Purpose
TBD - created by archiving change openclaw-stack-wizard. Update Purpose after archive.
## Requirements
### Requirement: Copy as Markdown
The system SHALL provide a "Copy as Markdown" button that copies the full recommendation as formatted Markdown to the user's clipboard.

#### Scenario: Successful Markdown copy
- **WHEN** user clicks "Copy as Markdown" on the summary step
- **THEN** the formatted Markdown string SHALL be written to the clipboard
- **THEN** the button SHALL display a brief "Copied!" confirmation

### Requirement: Copy as plain text
The system SHALL provide a "Copy as Plain Text" button that copies the recommendation as stripped, human-readable text (no Markdown syntax) to the clipboard.

#### Scenario: Successful plain text copy
- **WHEN** user clicks "Copy as Plain Text"
- **THEN** the plain text version (no formatting characters like `#`, `|`, `*`) SHALL be written to the clipboard

### Requirement: Copy as JSON
The system SHALL provide a "Copy as JSON" button that copies the structured recommendation object as formatted JSON to the clipboard.

#### Scenario: Successful JSON copy
- **WHEN** user clicks "Copy as JSON"
- **THEN** the JSON representation of the recommendation object SHALL be written to the clipboard
- **THEN** the JSON SHALL be pretty-printed with 2-space indentation

### Requirement: Download as Markdown file
The system SHALL provide a "Download" button that triggers a browser download of the recommendation as a `.md` file.

#### Scenario: Successful file download
- **WHEN** user clicks "Download"
- **THEN** the browser SHALL download a file named `openclaw-stack-recommendation.md`
- **THEN** the file content SHALL be identical to the "Copy as Markdown" output

### Requirement: Clipboard fallback
The system SHALL provide a fallback mechanism for clipboard operations in browsers that do not support `navigator.clipboard.writeText()`.

#### Scenario: Fallback clipboard copy
- **WHEN** user clicks a copy button AND `navigator.clipboard` is not available
- **THEN** the system SHALL fall back to `document.execCommand('copy')` using a temporary textarea element

