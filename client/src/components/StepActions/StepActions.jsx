import './component.styles.scss';

const StepActions = ({ onBack, onNext, backLabel = 'Back', nextLabel = 'Continue', isFirst = false, isPending = false }) => (
  <div className="step-actions">
    {!isFirst ? (
      <button type="button" className="step-actions-secondary" onClick={onBack}>
        {backLabel}
      </button>
    ) : <span />}
    <button type="submit" className="step-actions-primary" onClick={onNext} disabled={isPending}>
      {isPending ? 'Continuing...' : nextLabel}
    </button>
  </div>
);

export default StepActions;
