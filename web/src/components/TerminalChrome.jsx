export default function TerminalChrome({ children, title = 'OPENCLAW STACK WIZARD — TERMINAL v1.0' }) {
    return (
        <div className="terminal-frame">
            <div className="terminal-titlebar">
                <div className="terminal-titlebar-dots">
                    <span className="terminal-titlebar-dot active" />
                    <span className="terminal-titlebar-dot" />
                    <span className="terminal-titlebar-dot" />
                </div>
                <span>{title}</span>
                <div style={{ width: '48px' }} />
            </div>
            {children}
        </div>
    );
}
