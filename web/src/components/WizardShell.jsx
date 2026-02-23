import { useRef, useState, useEffect } from 'react';
import WizardStep from './WizardStep';
import StepNavigation from './StepNavigation';
import StackPreview from './StackPreview';
import ExportControls from './ExportControls';

export default function WizardShell({ wizard }) {
    const {
        state,
        currentStep,
        visibleSteps,
        recommendation,
        isFirstStep,
        isLastStep,
        isSummaryStep,
        selectChoice,
        goBack,
        goToStep,
        reset,
    } = wizard;

    const stepLabel = `STEP ${state.currentStepIndex + 1}/${visibleSteps.length}`;

    const scrollRef = useRef(null);
    const [showScrollHint, setShowScrollHint] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        function check() {
            const overflows = el.scrollHeight > el.clientHeight + 4;
            const notAtBottom = el.scrollTop < el.scrollHeight - el.clientHeight - 16;
            setShowScrollHint(overflows && notAtBottom);
        }

        check();
        el.addEventListener('scroll', check, { passive: true });

        const ro = new ResizeObserver(check);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', check);
            ro.disconnect();
        };
    }, [currentStep?.id]);

    return (
        <div className="wizard-shell">
            {/* Progress bar */}
            <div className="wizard-progress" style={{ gridColumn: '1 / -1' }}>
                {visibleSteps.map((step, i) => (
                    <div
                        key={step.id}
                        className={`wizard-progress-step${i < state.currentStepIndex ? ' completed' : ''
                            }${i === state.currentStepIndex ? ' active' : ''}`}
                    />
                ))}
            </div>

            {/* Left panel — wizard */}
            <div className="wizard-panel">
                {/* Scrollable content — nav stays pinned below */}
                <div className="wizard-panel-scroll" ref={scrollRef}>
                    {currentStep && (
                        <WizardStep
                            key={currentStep.id}
                            step={currentStep}
                            currentSelection={state.selections[currentStep.id]}
                            onSelect={(value) => selectChoice(currentStep.id, value)}
                            selections={state.selections}
                        />
                    )}

                    {isSummaryStep && recommendation && (
                        <div className="wizard-export-wrapper" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                            <ExportControls recommendation={recommendation} />
                        </div>
                    )}
                </div>

                {/* Bouncing scroll hint — fades in/out based on overflow */}
                <div className={`scroll-hint${showScrollHint ? '' : ' scroll-hint--hidden'}`} aria-hidden="true">
                    <span className="scroll-hint-arrow">▼</span>
                    <span className="scroll-hint-label">SCROLL</span>
                </div>

                <StepNavigation
                    onBack={goBack}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    isSummary={isSummaryStep}
                    stepLabel={stepLabel}
                    onReset={reset}
                />
            </div>

            {/* Right panel — preview */}
            <StackPreview
                recommendation={recommendation}
                activeStepId={currentStep?.id}
                isSummary={isSummaryStep}
            />
        </div>
    );
}
