import ReactMarkdown from 'react-markdown';
import { exportMarkdown } from '../utils/exportMarkdown';
import { useState, useEffect, useRef } from 'react';

const CHARS_PER_TICK = 6;
const TICK_MS = 10;

export default function StackPreview({ recommendation, activeStepId, isSummary }) {
    const markdown = exportMarkdown(recommendation, isSummary ? null : activeStepId);

    const [displayed, setDisplayed] = useState('');
    // Refs let the async typing loop read/write the latest values without stale closures
    const displayedRef = useRef('');
    const targetRef = useRef('');
    const panelRef = useRef(null);

    useEffect(() => {
        const target = markdown;
        targetRef.current = target;

        const current = displayedRef.current;

        // Find how much of the current displayed text is still valid in the new target
        let commonLen = 0;
        const minLen = Math.min(current.length, target.length);
        while (commonLen < minLen && current[commonLen] === target[commonLen]) {
            commonLen++;
        }

        // Shrinking (reset / back-navigation) — snap immediately, no animation
        if (target.length <= current.length) {
            displayedRef.current = target;
            setDisplayed(target);
            return;
        }

        // Growing — reset to common prefix then type forward
        displayedRef.current = target.slice(0, commonLen);
        setDisplayed(displayedRef.current);

        let cancelled = false;

        function tick() {
            if (cancelled || targetRef.current !== target) return;

            const nextLen = Math.min(displayedRef.current.length + CHARS_PER_TICK, target.length);
            displayedRef.current = target.slice(0, nextLen);
            setDisplayed(displayedRef.current);

            // Slowly scroll the panel down as content fills
            if (panelRef.current) {
                panelRef.current.scrollTop = panelRef.current.scrollHeight;
            }

            if (nextLen < target.length) {
                setTimeout(tick, TICK_MS);
            }
        }

        if (commonLen < target.length) {
            setTimeout(tick, TICK_MS);
        }

        return () => { cancelled = true; };
    }, [markdown]);

    return (
        <div className="preview-side">
            <div className="preview-header">
                ▸ LIVE STACK PREVIEW
            </div>
            <div className="preview-panel" ref={panelRef} aria-live="polite" aria-label="Stack recommendation preview">
                {displayed ? (
                    <ReactMarkdown
                        components={{
                            code: ({ node, ...props }) =>
                                props.children === '___LOADING___' ? (
                                    <span className="loading-dots">...</span>
                                ) : (
                                    <code {...props} />
                                ),
                        }}
                    >
                        {displayed}
                    </ReactMarkdown>
                ) : (
                    <div className="preview-pending">
                        <p>{'>'} Awaiting selections...</p>
                        <p>Your stack recommendation will build here as you make choices.</p>
                        <span className="terminal-cursor" />
                    </div>
                )}
            </div>
        </div>
    );
}
