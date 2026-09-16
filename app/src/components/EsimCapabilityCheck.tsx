import BasicPageTemplate from './BasicPageTemplate';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

/** eSIM capability check (LF-S-025) — demo happy path. */
export default function EsimCapabilityCheck({ onBack, onNext }: Props) {
  return (
    <BasicPageTemplate title="eSIM check" showBack onBack={onBack}>
      <div className="esim-check">
        <p className="page-body-text">
          This device can use an eSIM. Continue to checkout to complete your purchase.
        </p>
        <button type="button" className="btn btn-primary btn-lg" onClick={onNext}>
          Next
        </button>
      </div>
    </BasicPageTemplate>
  );
}
