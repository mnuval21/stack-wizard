export default function GpuHelper({ environment }) {
    const instructions = {
        macos: {
            title: 'macOS — Check your chip',
            steps: '1. Click the Apple menu  → "About This Mac"\n2. Look for "Chip" — if it says M1, M2, M3, etc. you have Apple Silicon\n3. If it says "Intel" check for a discrete GPU under "Graphics"',
        },
        windows: {
            title: 'Windows — Check for GPU',
            steps: '1. Press Win+R, type "dxdiag", press Enter\n2. Click the "Display" tab\n3. Under "Device", check the "Name" field\n4. Or open Command Prompt and run:\n   nvidia-smi',
        },
        linux: {
            title: 'Linux — Check for GPU',
            steps: '1. Open a terminal and run:\n   lspci | grep -i vga\n2. For Nvidia GPUs specifically:\n   nvidia-smi\n3. For AMD GPUs:\n   lspci | grep -i amd',
        },
    };

    const envInstructions = instructions[environment] || instructions.linux;

    return (
        <details className="gpu-helper" id="gpu-helper">
            <summary>🔍 Not sure? Click here to check your GPU</summary>
            <div style={{ marginTop: '0.75rem' }}>
                <strong style={{ color: 'var(--terminal-amber)' }}>{envInstructions.title}</strong>
                <pre>{envInstructions.steps}</pre>
            </div>
        </details>
    );
}
