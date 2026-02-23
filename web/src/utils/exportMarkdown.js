// Serialize recommendation object → formatted Markdown string

export function exportMarkdown(recommendation, activeStepId = null) {
    if (!recommendation) return '';

    const sections = [];

    sections.push('# 🤖 OpenClaw Stack Recommendation\n');
    sections.push(`*Generated on ${new Date().toLocaleDateString()}*\n`);
    sections.push('---\n');

    // Helper: generate pending or loading state
    const getPendingBlock = (stepId) => activeStepId === stepId ? '\n**Pending:** `___LOADING___`\n' : '\n*(Waiting for selection...)*\n';

    // Environment
    sections.push('## 🖥 Environment\n');
    if (recommendation.environment) {
        const env = recommendation.environment;
        sections.push(`**Type:** ${env.label}`);
        sections.push(`**Est. Cost:** ${env.estCost}`);
        if (env.pros) sections.push(`**Pros:** ${env.pros}`);
        if (env.cons) sections.push(`**Cons:** ${env.cons}`);
        if (env.provider) {
            sections.push(`\n**VPS Provider:** ${env.provider.label}`);
            sections.push(`**Provider Cost:** ${env.provider.estCost}`);
            if (env.provider.pros) sections.push(`**Provider Pros:** ${env.provider.pros}`);
            if (env.provider.cons) sections.push(`**Provider Cons:** ${env.provider.cons}`);
        }
        sections.push('');
    } else {
        sections.push(getPendingBlock('environment'));
    }

    // LLM
    sections.push('## 🧠 LLM Provider\n');
    if (recommendation.llm) {
        const llm = recommendation.llm;
        sections.push(`**Type:** ${llm.type}`);
        sections.push(`**Provider:** ${llm.provider}`);
        sections.push(`**Est. Cost:** ${llm.estCost}`);
        if (llm.pros) sections.push(`**Pros:** ${llm.pros}`);
        if (llm.cons) sections.push(`**Cons:** ${llm.cons}`);
        sections.push(`\n*${llm.description}*`);
        sections.push('');
    } else {
        sections.push(getPendingBlock('llmType'));
    }

    // Voice Transcription
    if (recommendation.voiceTranscription) {
        const voice = recommendation.voiceTranscription;
        const badge = voice.status === 'phase2_stub' ? ' `[PHASE 2 — COMING SOON]`' : '';
        sections.push(`## 🎤 Voice Transcription${badge}\n`);
        sections.push(`**Type:** ${voice.type}`);
        sections.push(`**Provider:** ${voice.provider}`);
        sections.push(`**Est. Cost:** ${voice.estCost}`);
        if (voice.pros) sections.push(`**Pros:** ${voice.pros}`);
        if (voice.cons) sections.push(`**Cons:** ${voice.cons}`);
        sections.push(`\n*${voice.description}*`);
        sections.push('');
    } else if (activeStepId === 'voiceTranscription' || (activeStepId === null && !recommendation.voiceTranscription)) {
        sections.push('## 🎤 Voice Transcription\n');
        sections.push(getPendingBlock('voiceTranscription'));
    }

    // TTS
    if (recommendation.tts) {
        const t = recommendation.tts;
        const badge = t.status === 'phase2_stub' ? ' `[PHASE 2 — COMING SOON]`' : '';
        sections.push(`## 🔊 Text-to-Speech${badge}\n`);
        sections.push(`**Type:** ${t.type}`);
        sections.push(`**Provider:** ${t.provider}`);
        sections.push(`**Est. Cost:** ${t.estCost}`);
        if (t.pros) sections.push(`**Pros:** ${t.pros}`);
        if (t.cons) sections.push(`**Cons:** ${t.cons}`);
        sections.push(`\n*${t.description}*`);
        sections.push('');
    } else if (activeStepId === 'tts' || (activeStepId === null && !recommendation.tts)) {
        sections.push('## 🔊 Text-to-Speech\n');
        sections.push(getPendingBlock('tts'));
    }

    // Security
    if (recommendation.security) {
        const sec = recommendation.security;
        const badge = sec.status === 'phase2_stub' ? ' `[PHASE 2 — DETAILED GUIDE COMING]`' : '';
        sections.push(`## 🔒 Security Posture${badge}\n`);
        sections.push(`**Posture:** ${sec.posture}`);
        sections.push(`**Recommendation:** ${sec.recommendation}`);
        sections.push(`\n*${sec.details}*`);
        sections.push('');
    } else if (activeStepId === 'securityPosture' || (activeStepId === null && !recommendation.security)) {
        sections.push('## 🔒 Security Posture\n');
        sections.push(getPendingBlock('securityPosture'));
    }

    // Hardware
    if (recommendation.hardware) {
        const hw = recommendation.hardware;
        sections.push('## 💻 Hardware Recommendation\n');
        sections.push(`**${hw.label}**\n`);
        sections.push(`**Est. Cost:** ${hw.estCost}\n`);
        sections.push(`- **Minimum Spec:** ${hw.minimum.ram}, ${hw.minimum.cpu}, ${hw.minimum.gpu}, ${hw.minimum.storage}`);
        sections.push(`- **Recommended:** ${hw.recommended.description} (${hw.recommended.ram}, ${hw.recommended.cpu}, ${hw.recommended.gpu}, ${hw.recommended.storage})\n`);

        if (hw.gpuNote) {
            sections.push(`> **GPU Note:** ${hw.gpuNote}\n`);
        }
        if (hw.suggestVps) {
            sections.push('> ⚠️ **This setup requires significant hardware. Consider a GPU-enabled VPS ($20–$80/mo) as an alternative.**\n');
        }
    } else if (activeStepId === 'gpuType') {
        sections.push('## 💻 Hardware Recommendation\n');
        sections.push(getPendingBlock('gpuType'));
    }

    // Footer
    sections.push('---\n');
    //sections.push('*Generated by [OpenClaw Stack Wizard](https://github.com/openclaw/openclaw)*');

    return sections.join('  \n');
}
