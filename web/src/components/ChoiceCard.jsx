export default function ChoiceCard({ choice, selected, onSelect, recommended }) {
    return (
        <button
            id={`choice-${choice.id}`}
            className={`choice-card${selected ? ' selected' : ''}`}
            onClick={() => onSelect(choice.id)}
            aria-label={`${choice.label}${choice.description ? ` — ${choice.description}` : ''}${choice.costEstimate ? ` — ${choice.costEstimate}` : ''}`}
            aria-pressed={selected}
            type="button"
        >
            <span className="choice-card-key">[{choice.key}]</span>
            <div className="choice-card-content">
                <div className="choice-card-label">
                    {choice.icon} {choice.label}
                    {recommended && <span className="badge badge-recommended" style={{ marginLeft: '0.5rem' }}>RECOMMENDED</span>}
                    {choice.phase2Stub && <span className="badge badge-stub" style={{ marginLeft: '0.5rem' }}>PHASE 2</span>}
                </div>
                {choice.description && (
                    <div className="choice-card-description">{choice.description}</div>
                )}
                {choice.costEstimate && (
                    <div className="choice-card-cost">💰 {choice.costEstimate}</div>
                )}
            </div>
        </button>
    );
}
