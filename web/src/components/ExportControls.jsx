import { useState } from 'react';
import { copyToClipboard, downloadFile } from '../utils/clipboard';
import { exportMarkdown } from '../utils/exportMarkdown';
import { exportJson } from '../utils/exportJson';
import { exportText } from '../utils/exportText';

export default function ExportControls({ recommendation }) {
    const [copiedFormat, setCopiedFormat] = useState(null);

    const handleCopy = async (format) => {
        let text;
        if (format === 'md') text = exportMarkdown(recommendation);
        else if (format === 'json') text = exportJson(recommendation);
        else text = exportText(recommendation);

        const success = await copyToClipboard(text);
        if (success) {
            setCopiedFormat(format);
            setTimeout(() => setCopiedFormat(null), 2000);
        }
    };

    const handleDownload = () => {
        const md = exportMarkdown(recommendation);
        downloadFile(md, 'openclaw-stack-recommendation.md');
    };

    const btnLabel = (format, label) =>
        copiedFormat === format ? '✓ Copied!' : label;

    return (
        <div className="export-controls">
            <button
                className="terminal-btn"
                onClick={() => handleCopy('md')}
                type="button"
                id="btn-copy-md"
                aria-label="Copy recommendation as Markdown"
            >
                📋 {btnLabel('md', 'Copy MD')}
            </button>
            <button
                className="terminal-btn"
                onClick={() => handleCopy('text')}
                type="button"
                id="btn-copy-text"
                aria-label="Copy recommendation as plain text"
            >
                📋 {btnLabel('text', 'Copy Text')}
            </button>
            <button
                className="terminal-btn"
                onClick={() => handleCopy('json')}
                type="button"
                id="btn-copy-json"
                aria-label="Copy recommendation as JSON"
            >
                📋 {btnLabel('json', 'Copy JSON')}
            </button>
            <button
                className="terminal-btn primary"
                onClick={handleDownload}
                type="button"
                id="btn-download"
                aria-label="Download recommendation as Markdown file"
            >
                ⬇ Download .md
            </button>
        </div>
    );
}
