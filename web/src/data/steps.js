// Step definitions — data-driven wizard config
// Each step has: id, question, prompt (optional), choices, showWhen

export const STEPS = [
    {
        id: 'environment',
        question: '> Where will you run OpenClaw?',
        prompt: 'Select your compute environment to get started.',
        choices: [
            {
                id: 'macos',
                key: 'A',
                icon: '🖥',
                label: 'macOS',
                description: 'Local Mac machine',
                costEstimate: 'Hardware only (one-time)',
            },
            {
                id: 'windows',
                key: 'B',
                icon: '🪟',
                label: 'Windows',
                description: 'Local Windows machine',
                costEstimate: 'Hardware only (one-time)',
            },
            {
                id: 'linux',
                key: 'C',
                icon: '🐧',
                label: 'Linux',
                description: 'Local Linux machine',
                costEstimate: 'Hardware only (one-time)',
            },
            {
                id: 'vps',
                key: 'D',
                icon: '☁️',
                label: 'VPS',
                description: 'Virtual Private Server (rented cloud compute)',
                costEstimate: '$5–$200/mo depending on specs',
            },
        ],
        showWhen: () => true,
    },

    {
        id: 'vpsProvider',
        question: '> Which VPS provider do you prefer?',
        prompt: 'Choose your cloud infrastructure provider.',
        choices: [
            {
                id: 'digitalocean',
                key: 'A',
                icon: '🌊',
                label: 'DigitalOcean Droplet',
                description: 'Simple cloud infrastructure',
                costEstimate: '$6–$96/mo',
            },
            {
                id: 'hetzner',
                key: 'B',
                icon: '⚡',
                label: 'Hetzner Cloud',
                description: 'Best value European provider',
                costEstimate: '$4–$60/mo',
            },
            {
                id: 'linode',
                key: 'C',
                icon: '🔷',
                label: 'Linode (Akamai)',
                description: 'Reliable, developer-friendly',
                costEstimate: '$5–$96/mo',
            },
            {
                id: 'aws',
                key: 'D',
                icon: '📦',
                label: 'AWS EC2',
                description: 'Enterprise-grade, complex pricing',
                costEstimate: '$8–$200/mo',
            },
            {
                id: 'other',
                key: 'E',
                icon: '❓',
                label: "Other / I'm not sure",
                description: "We'll provide general VPS guidance",
                costEstimate: 'Varies',
            },
        ],
        showWhen: (selections) => selections.environment === 'vps',
    },

    {
        id: 'llmType',
        question: "> How do you want to power OpenClaw's AI brain?",
        prompt: 'Choose between running models locally or using cloud APIs.',
        choices: [
            {
                id: 'local-ollama',
                key: 'A',
                icon: '🏠',
                label: 'Local Model (Ollama)',
                description: 'Runs entirely on your machine. No data leaves your network.',
                costEstimate: 'Hardware cost only',
            },
            {
                id: 'cloud-openrouter',
                key: 'B',
                icon: '☁️',
                label: 'Open-Source Cloud (OpenRouter)',
                description: 'Hosted open-source models. Cheap, no GPU needed.',
                costEstimate: '~$0.001–$0.01/1K tokens',
            },
            {
                id: 'cloud-together',
                key: 'C',
                icon: '☁️',
                label: 'Open-Source Cloud (Together.ai)',
                description: 'Hosted open-source models with batch options.',
                costEstimate: '~$0.001–$0.008/1K tokens',
            },
            {
                id: 'other',
                key: 'D',
                icon: '🔧',
                label: 'Other (self-hosted, API)',
                description: 'Advanced: bring your own endpoint',
                costEstimate: 'Varies',
            },
        ],
        showWhen: () => true,
    },

    {
        id: 'voiceTranscription',
        question: '> Do you want OpenClaw to listen to your voice?',
        prompt: 'Voice transcription converts your speech to text for AI input.',
        choices: [
            {
                id: 'none',
                key: 'A',
                icon: '❌',
                label: 'No',
                description: 'Text input only',
                costEstimate: 'Free',
            },
            {
                id: 'local',
                key: 'B',
                icon: '🏠',
                label: 'Yes — Local (Whisper.cpp)',
                description: 'Transcription runs on your machine',
                costEstimate: 'Free (hardware cost)',
                phase2Stub: true,
            },
            {
                id: 'cloud',
                key: 'C',
                icon: '☁️',
                label: 'Yes — Cloud',
                description: 'Hosted transcription service',
                costEstimate: '~$0.006/min',
                phase2Stub: true,
            },
        ],
        showWhen: () => true,
    },

    {
        id: 'tts',
        question: '> Do you want OpenClaw to talk back to you?',
        prompt: 'Text-to-speech converts AI responses to spoken audio.',
        choices: [
            {
                id: 'none',
                key: 'A',
                icon: '❌',
                label: 'No',
                description: 'Silent output only',
                costEstimate: 'Free',
            },
            {
                id: 'local',
                key: 'B',
                icon: '🏠',
                label: 'Yes — Local (Piper TTS)',
                description: 'TTS runs on your machine',
                costEstimate: 'Free (hardware cost)',
                phase2Stub: true,
            },
            {
                id: 'cloud',
                key: 'C',
                icon: '☁️',
                label: 'Yes — Cloud',
                description: 'Hosted TTS service',
                costEstimate: '~$0.015/1K chars',
                phase2Stub: true,
            },
        ],
        showWhen: () => true,
    },

    {
        id: 'securityPosture',
        question: '> How do you want to secure your OpenClaw setup?',
        prompt:
            'OpenClaw has broad access to your system. Choosing the right security posture is important.',
        choices: [
            {
                id: 'maximum',
                key: 'A',
                icon: '🔒',
                label: 'Maximum Privacy (Local-only)',
                description:
                    'No external connections. All data stays on your machine or local network.',
                costEstimate: 'Hardware cost only',
                phase2Stub: true,
            },
            {
                id: 'balanced',
                key: 'B',
                icon: '🛡',
                label: 'Balanced (VPS + Secure Tunnel)',
                description:
                    'Hosted on VPS, accessed via encrypted tunnel (e.g., WireGuard, Tailscale).',
                costEstimate: 'VPS cost + free tunnel',
                phase2Stub: true,
            },
            {
                id: 'convenience',
                key: 'C',
                icon: '⚖️',
                label: 'Convenience (Cloud API + HTTPS)',
                description: 'Use cloud LLM APIs with HTTPS. Simplest setup. Some data leaves your network.',
                costEstimate: 'API costs only',
                phase2Stub: true,
            },
        ],
        showWhen: () => true,
        autoSuggest: (selections) => {
            if (selections.environment === 'vps') return 'balanced';
            if (selections.llmType === 'local-ollama' && selections.environment !== 'vps') return 'maximum';
            if (selections.llmType?.startsWith('cloud-')) return 'convenience';
            return null;
        },
    },

    {
        id: 'gpuType',
        question: '> Does your machine have a dedicated GPU?',
        prompt: "This helps us recommend the right hardware for local AI models. Not sure? Expand the help below.",
        choices: [
            {
                id: 'nvidia',
                key: 'A',
                icon: '💚',
                label: 'Yes — Nvidia GPU',
                description: 'Best for local LLMs; CUDA acceleration',
                costEstimate: '',
            },
            {
                id: 'amd',
                key: 'B',
                icon: '❤️',
                label: 'Yes — AMD GPU',
                description: 'Supported by some local LLM runtimes',
                costEstimate: '',
            },
            {
                id: 'apple-silicon',
                key: 'C',
                icon: '🍎',
                label: 'Apple Silicon (M-series)',
                description: 'Unified memory; natively supported by Ollama',
                costEstimate: '',
            },
            {
                id: 'none',
                key: 'D',
                icon: '❓',
                label: "No / I don't know",
                description: 'See instructions below to check',
                costEstimate: '',
            },
        ],
        showGpuHelper: true,
        showWhen: (selections) => {
            const hasLocal =
                selections.llmType === 'local-ollama' ||
                selections.voiceTranscription === 'local' ||
                selections.tts === 'local';
            return hasLocal && selections.environment !== 'vps';
        },
    },

    {
        id: 'summary',
        question: '> Your OpenClaw Stack Recommendation',
        prompt: "Here's your personalized setup. Copy or download it below.",
        choices: [],
        showWhen: () => true,
    },
];

// Returns only the steps that should be visible given current selections
export function getVisibleSteps(selections) {
    return STEPS.filter((step) => step.showWhen(selections));
}

// Helper: does the user have any local component selected?
export function hasLocalComponent(selections) {
    return (
        selections.llmType === 'local-ollama' ||
        selections.voiceTranscription === 'local' ||
        selections.tts === 'local'
    );
}
