import BasicPageTemplate from './BasicPageTemplate';
import { displayName, formatMsisdn, type ManagedLine } from '../data/lines';
import {
  formatAmount,
  formatSharedDate,
  formatTime,
  unitWord,
  type TransferUnit,
} from '../data/transfer';

export type TransferResultDetails = {
  line: ManagedLine;
  amount: number;
  unit: TransferUnit;
  remainingAfter: number;
  transactionNumber: string;
  completedAt: Date;
};

type Props = {
  details: TransferResultDetails;
  onBackToHome: () => void;
};

/** Transfer Result (LF-S-054) */
export default function TransferResult({ details, onBackToHome }: Props) {
  const { line, amount, unit, remainingAfter, transactionNumber, completedAt } = details;
  const name = displayName(line);
  const number = line.mobileDigits ? formatMsisdn(line.mobileDigits) : '';
  const word = unitWord(unit);

  return (
    <BasicPageTemplate showBack={false}>
      <div className="transfer-result">
        <h1 className="transfer-result-heading">Successful transfer</h1>

        <section className="transfer-result-summary" aria-labelledby="transfer-summary-title">
          <h2 id="transfer-summary-title" className="transfer-result-summary-title">
            Transfer summary
          </h2>
          <p className="transfer-result-meta">
            {formatSharedDate(completedAt)} {formatTime(completedAt)}
          </p>
          <p className="transfer-result-copy">
            Transferred {amount} {word} to {name} ({number}).
          </p>
          <dl className="transfer-result-rows">
            <div>
              <dt>Transaction number</dt>
              <dd>{transactionNumber}</dd>
            </div>
            <div>
              <dt>Balance transferred</dt>
              <dd>{formatAmount(amount, unit)}</dd>
            </div>
            <div>
              <dt>Remaining balance</dt>
              <dd>{formatAmount(remainingAfter, unit)}</dd>
            </div>
          </dl>
        </section>

        <button type="button" className="btn btn-primary btn-lg" onClick={onBackToHome}>
          Back to Home
        </button>
      </div>
    </BasicPageTemplate>
  );
}
