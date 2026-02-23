# hardware-advisor Specification

## Purpose
TBD - created by archiving change openclaw-stack-wizard. Update Purpose after archive.
## Requirements
### Requirement: Conditional hardware step trigger
The hardware advisor step SHALL be triggered only when the user selects at least one local component (Local LLM, Local Voice, or Local TTS) and is NOT on a VPS environment.

#### Scenario: Hardware step shown for local LLM on macOS
- **WHEN** user selects macOS as environment AND Local Model (Ollama) as LLM
- **THEN** the GPU check and hardware recommendation step SHALL be displayed

#### Scenario: Hardware step hidden for VPS
- **WHEN** user selects VPS as environment AND Local Model as LLM
- **THEN** the hardware recommendation step SHALL NOT be displayed (VPS handles compute)

#### Scenario: Hardware step hidden when no local components
- **WHEN** user selects Cloud LLM AND No voice AND No TTS
- **THEN** the hardware recommendation step SHALL NOT be displayed

### Requirement: GPU availability check
The hardware advisor SHALL ask the user whether they have a dedicated GPU before displaying hardware recommendations. The system SHALL offer four options: Nvidia GPU, AMD GPU, Apple Silicon (M-series), and No / I don't know.

#### Scenario: User selects Nvidia GPU
- **WHEN** user selects "Yes — Nvidia GPU"
- **THEN** hardware recommendations SHALL prioritize Nvidia CUDA-capable configurations

#### Scenario: User selects Apple Silicon
- **WHEN** user selects "Apple Silicon (M-series)"
- **THEN** hardware recommendations SHALL prioritize Mac Studio configurations with unified memory

#### Scenario: User doesn't know their GPU
- **WHEN** user selects "No / I don't know"
- **THEN** the system SHALL display expandable, OS-specific instructions for checking GPU availability
- **THEN** instructions SHALL include: `nvidia-smi` for Linux/Windows, "About This Mac" for macOS, `lspci | grep -i vga` for Linux

### Requirement: Hardware specs with cost ranges
The hardware advisor SHALL display minimum and recommended hardware specifications with estimated cost ranges based on the combination of local components selected.

#### Scenario: Local LLM only
- **WHEN** user has selected only Local LLM (no local voice or TTS)
- **THEN** the system SHALL recommend minimum 16GB RAM / modern CPU and recommended Mac Studio M2 / Nvidia-capable PC at $1,200–$3,000

#### Scenario: Full local stack
- **WHEN** user has selected Local LLM + Local Voice + Local TTS
- **THEN** the system SHALL recommend minimum 64GB RAM / GPU required and recommended Mac Studio M3 Ultra / Nvidia Spark at $3,000–$10,000+

### Requirement: VPS alternative suggestion
When the estimated hardware cost is high (full local stack), the hardware advisor SHALL proactively suggest switching to a VPS-based alternative.

#### Scenario: High-cost hardware suggestion
- **WHEN** the user's local stack requires 64GB+ RAM / dedicated GPU
- **THEN** the system SHALL display a message: "This setup requires significant hardware. Would you like to see a VPS-based alternative?"
- **THEN** a soft call-to-action SHALL allow the user to revisit the environment selection step

