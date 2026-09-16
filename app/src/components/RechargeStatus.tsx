import BasicPageTemplate from './BasicPageTemplate';

type Props = {
  succeeded: boolean;
  onBackToHome: () => void;
  onTryAgain: () => void;
};

/** Recharge Status (LF-S-052) */
export default function RechargeStatus({ succeeded, onBackToHome, onTryAgain }: Props) {
  return (
    <BasicPageTemplate showBack={false}>
      <div className="recharge-status">
        {succeeded ? (
          <>
            <h1 className="transfer-result-heading">Successful recharge</h1>
            <p className="recharge-status-copy">Your wallet was recharged.</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={onBackToHome}>
              Back to Home
            </button>
          </>
        ) : (
          <>
            <h1 className="transfer-result-heading">Recharge failed</h1>
            <p className="recharge-status-copy">The recharge did not go through.</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={onTryAgain}>
              Try again
            </button>
          </>
        )}
      </div>
    </BasicPageTemplate>
  );
}
