type Props = {
  onNext: () => void;
};

export default function ActivationSuccess({ onNext }: Props) {
  return (
    <div className="activation">
      <div className="activation-content activation-success">
        <div className="activation-success-icon" aria-hidden>
          ✓
        </div>
        <h1>Registration complete</h1>
        <p className="activation-subtitle">Thank you for completing your SIM Registration.</p>
        <button type="button" className="btn btn-gradient btn-lg activation-next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
