// Serialize recommendation object → pretty-printed JSON

export function exportJson(recommendation) {
    if (!recommendation) return '{}';
    return JSON.stringify(recommendation, null, 2);
}
