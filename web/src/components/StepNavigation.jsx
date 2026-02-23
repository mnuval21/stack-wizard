export default function StepNavigation({ onBack, isFirstStep, isLastStep, isSummary, stepLabel, onReset }) {
    return (
        <div className="wizard-navigation">
            {!isFirstStep ? (
                <button
                    className="terminal-btn"
                    onClick={onBack}
                    type="button"
                    aria-label="Go to previous step"
                    id="btn-back"
                >
                    ← BACK
                </button>
            ) : (
                <div className="wizard-navigation-spacer" />
            )}

            <span className="wizard-step-indicator">{stepLabel}</span>

            {isSummary && onReset && (
                <button
                    className="terminal-btn danger"
                    onClick={onReset}
                    type="button"
                    aria-label="Start over"
                    id="btn-reset"
                >
                    ⟳ START OVER
                </button>
            )}
        </div>
    );
}
