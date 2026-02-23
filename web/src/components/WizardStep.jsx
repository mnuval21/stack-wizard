import ChoiceCard from './ChoiceCard';
import GpuHelper from './GpuHelper';

export default function WizardStep({ step, currentSelection, onSelect, selections }) {
    const autoSuggested = step.autoSuggest ? step.autoSuggest(selections) : null;

    return (
        <div className="wizard-panel-content fade-slide-in" aria-live="polite" role="region" aria-label={`Wizard step: ${step.id}`}>
            <div className="wizard-question type-reveal">{step.question}</div>
            {step.prompt && (
                <div className="wizard-prompt">{step.prompt}</div>
            )}

            {step.id === 'summary' ? (
                <div className="wizard-prompt" style={{ marginTop: '1rem' }}>
                    <p>{'>'} Your recommendation is complete. Review it in the panel to the right.</p>
                    <p>{'>'} Use the export buttons below the preview to save your stack.</p>
                    <span className="terminal-cursor" />
                </div>
            ) : (
                <div className="wizard-choices stagger-children">
                    {step.choices.map((choice) => (
                        <ChoiceCard
                            key={choice.id}
                            choice={choice}
                            selected={currentSelection === choice.id}
                            onSelect={onSelect}
                            recommended={autoSuggested === choice.id}
                        />
                    ))}
                </div>
            )}

            {step.showGpuHelper && selections.environment && selections.environment !== 'vps' && (
                <GpuHelper environment={selections.environment} />
            )}
        </div>
    );
}
