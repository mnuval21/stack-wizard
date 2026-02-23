import { HARDWARE_SPECS } from './hardware';

// Pure function: selections → recommendation object
export function buildRecommendation(selections) {
    const {
        environment,
        vpsProvider,
        llmType,
        voiceTranscription,
        tts,
        securityPosture,
        gpuType,
    } = selections;

    const rec = {
        environment: buildEnvironment(environment, vpsProvider),
        llm: buildLlm(llmType),
        voiceTranscription: buildVoice(voiceTranscription),
        tts: buildTts(tts),
        security: buildSecurity(securityPosture),
        hardware: buildHardware(selections),
    };

    return rec;
}

function buildEnvironment(environment, vpsProvider) {
    if (!environment) return null;

    const ENV_MAP = {
        macos: { type: 'local', label: 'macOS', estCost: 'Hardware only (one-time)', pros: 'Local set up, familiar Apple ecosystem, always available.', cons: 'Compute in house, potential hardware bottlenecks.' },
        windows: { type: 'local', label: 'Windows', estCost: 'Hardware only (one-time)', pros: 'Vast gaming hardware compatibility, local control.', cons: 'Higher electricity consumption, relies on local compute.' },
        linux: { type: 'local', label: 'Linux', estCost: 'Hardware only (one-time)', pros: 'Total open-source freedom, highly optimized for Docker.', cons: 'Steeper learning curve, local hardware dependent.' },
        vps: { type: 'vps', label: 'Virtual Private Server', estCost: '$5–$200/mo', pros: 'Accessible from anywhere, zero immediate hardware investments.', cons: 'Recurring cloud subscription cost, latent network dependency.' },
    };

    const VPS_MAP = {
        digitalocean: { label: 'DigitalOcean Droplet', estCost: '$6–$96/mo', pros: 'Excellent documentation, predictable pricing.', cons: 'Fewer GPU instances available.' },
        hetzner: { label: 'Hetzner Cloud', estCost: '$4–$60/mo', pros: 'Extremely cost-effective, great European latency.', cons: 'Strict account KYC triggers.' },
        linode: { label: 'Linode (Akamai)', estCost: '$5–$96/mo', pros: 'Reliable cloud up-time, robust API.', cons: 'Limited AI-specific templates.' },
        aws: { label: 'AWS EC2', estCost: '$8–$200/mo', pros: 'Infinite scale, massive GPU availability.', cons: 'Extremely complex billing, hidden egress costs.' },
        other: { label: 'VPS (custom)', estCost: 'Varies', pros: 'Ultimate flexibility.', cons: 'You manage everything.' },
    };

    const env = ENV_MAP[environment] || null;
    if (!env) return null;

    return {
        ...env,
        provider: environment === 'vps' && vpsProvider ? VPS_MAP[vpsProvider] : null,
    };
}

function buildLlm(llmType) {
    if (!llmType) return null;

    const LLM_MAP = {
        'local-ollama': {
            type: 'local',
            provider: 'Ollama',
            estCost: 'Free (hardware cost only)',
            status: 'active',
            description: 'Run open-source models locally. No data leaves your network.',
            pros: 'Absolute privacy, zero recurring usage costs, offline capable.',
            cons: 'Requires very powerful local hardware for fast responses.'
        },
        'cloud-openrouter': {
            type: 'cloud',
            provider: 'OpenRouter',
            estCost: '~$0.001–$0.01/1K tokens',
            status: 'active',
            description: 'Access open-source models via OpenRouter API.',
            pros: 'Access massive models quickly, pay-per-use, zero hardware footprint.',
            cons: 'Data sent to an external provider.'
        },
        'cloud-together': {
            type: 'cloud',
            provider: 'Together.ai',
            estCost: '~$0.001–$0.008/1K tokens',
            status: 'active',
            description: 'Access open-source models via Together.ai API.',
            pros: 'Fast API speeds, focus on open-source.',
            cons: 'Requires internet, variable latency.'
        },
        other: {
            type: 'custom',
            provider: 'Self-hosted / Custom API',
            estCost: 'Varies',
            status: 'active',
            description: 'Bring your own LLM endpoint.',
            pros: 'Use existing investments, high control.',
            cons: 'Manual setup required.'
        },
    };

    return LLM_MAP[llmType] || null;
}

function buildVoice(voiceTranscription) {
    if (!voiceTranscription) return null;

    const VOICE_MAP = {
        none: {
            type: 'none',
            provider: 'None',
            estCost: 'Free',
            status: 'active',
            description: 'Text input only — no voice transcription.',
        },
        local: {
            type: 'local',
            provider: 'Whisper.cpp',
            estCost: 'Free (hardware cost)',
            status: 'phase2_stub',
            description: 'Local speech-to-text using Whisper.cpp.',
        },
        cloud: {
            type: 'cloud',
            provider: 'Cloud STT (TBD)',
            estCost: '~$0.006/min',
            status: 'phase2_stub',
            description: 'Cloud-based speech-to-text service.',
        },
    };

    return VOICE_MAP[voiceTranscription] || null;
}

function buildTts(ttsChoice) {
    if (!ttsChoice) return null;

    const TTS_MAP = {
        none: {
            type: 'none',
            provider: 'None',
            estCost: 'Free',
            status: 'active',
            description: 'Silent output — no text-to-speech.',
        },
        local: {
            type: 'local',
            provider: 'Piper TTS',
            estCost: 'Free (hardware cost)',
            status: 'phase2_stub',
            description: 'Local text-to-speech using Piper.',
        },
        cloud: {
            type: 'cloud',
            provider: 'Cloud TTS (TBD)',
            estCost: '~$0.015/1K chars',
            status: 'phase2_stub',
            description: 'Cloud-based text-to-speech service.',
        },
    };

    return TTS_MAP[ttsChoice] || null;
}

function buildSecurity(securityPosture) {
    if (!securityPosture) return null;

    const SEC_MAP = {
        maximum: {
            posture: 'Maximum Privacy',
            recommendation: 'Local-only setup with network hardening',
            details: 'No external connections. All data stays on your machine or local network. Recommended: firewall rules, VLAN isolation, prompt injection mitigation.',
            status: 'phase2_stub',
        },
        balanced: {
            posture: 'Balanced (VPS + Secure Tunnel)',
            recommendation: 'WireGuard or Tailscale VPN tunnel',
            details: 'Hosted on VPS, accessed via encrypted tunnel. Your data is encrypted in transit. Recommended: WireGuard, Tailscale, or Cloudflare Tunnel.',
            status: 'phase2_stub',
        },
        convenience: {
            posture: 'Convenience (Cloud API + HTTPS)',
            recommendation: 'HTTPS + API key authentication',
            details: 'Use cloud LLM APIs with HTTPS. Simplest setup. Some data leaves your network via encrypted API calls.',
            status: 'phase2_stub',
        },
    };

    return SEC_MAP[securityPosture] || null;
}

function buildHardware(selections) {
    const { environment, llmType, voiceTranscription, tts, gpuType } = selections;

    // Only recommend hardware for local setups (not VPS)
    if (environment === 'vps') return null;

    const hasLocalLlm = llmType === 'local-ollama';
    const hasLocalVoice = voiceTranscription === 'local';
    const hasLocalTts = tts === 'local';

    if (!hasLocalLlm && !hasLocalVoice && !hasLocalTts) return null;

    const localCount = [hasLocalLlm, hasLocalVoice, hasLocalTts].filter(Boolean).length;

    let tier;
    if (localCount >= 3) {
        tier = 'full';
    } else if (localCount >= 2) {
        tier = 'medium';
    } else {
        tier = 'basic';
    }

    const specs = HARDWARE_SPECS[tier];
    const gpuNote = gpuType ? GPU_NOTES[gpuType] : null;

    return {
        tier,
        ...specs,
        gpuType,
        gpuNote,
        suggestVps: tier === 'full',
    };
}

const GPU_NOTES = {
    nvidia: 'Your Nvidia GPU supports CUDA — ideal for local LLM inference.',
    amd: 'AMD GPUs are supported by some runtimes (ROCm). Check model compatibility.',
    'apple-silicon': 'Apple Silicon uses unified memory — excellent for Ollama.',
    none: 'Without a dedicated GPU, local models will run on CPU (slower). Consider a VPS.',
};
