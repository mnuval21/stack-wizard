// Hardware specification tiers based on local component count
// Last updated: 2026-02-22

export const HARDWARE_SPECS = {
    basic: {
        label: 'Local LLM Only',
        minimum: {
            ram: '16GB RAM',
            cpu: 'Modern multi-core CPU',
            gpu: 'Recommended but not required',
            storage: '50GB free SSD space',
        },
        recommended: {
            description: 'Mac Studio M2 / Nvidia-capable PC',
            ram: '32GB RAM',
            cpu: '8-core+',
            gpu: 'Nvidia RTX 3060+ or Apple Silicon M2+',
            storage: '100GB SSD',
        },
        estCost: '$1,200–$3,000 (one-time)',
    },

    medium: {
        label: 'Local LLM + Voice or TTS',
        minimum: {
            ram: '32GB RAM',
            cpu: '8-core CPU',
            gpu: 'Dedicated GPU recommended',
            storage: '100GB free SSD space',
        },
        recommended: {
            description: 'Mac Studio M3 / Nvidia RTX 4090 PC',
            ram: '64GB RAM',
            cpu: '12-core+',
            gpu: 'Nvidia RTX 4080+ or Apple Silicon M3 Pro+',
            storage: '200GB SSD',
        },
        estCost: '$2,500–$6,000 (one-time)',
    },

    full: {
        label: 'Full Local Stack (LLM + Voice + TTS)',
        minimum: {
            ram: '64GB RAM',
            cpu: '12-core CPU',
            gpu: 'Dedicated GPU required',
            storage: '200GB free SSD space',
        },
        recommended: {
            description: 'Mac Studio M3 Ultra / Nvidia Spark / Custom build',
            ram: '128GB RAM',
            cpu: '16-core+',
            gpu: 'Nvidia RTX 4090 or Apple Silicon M3 Ultra',
            storage: '500GB SSD',
        },
        estCost: '$3,000–$10,000+ (one-time)',
        vpsAlternative: {
            description: 'GPU-enabled VPS as alternative',
            estCost: '$20–$80/mo',
            note: 'This setup requires significant hardware. Consider a VPS-based alternative to avoid high upfront costs.',
        },
    },
};
