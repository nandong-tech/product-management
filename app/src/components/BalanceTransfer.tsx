import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import { displayName, formatMsisdn, type ManagedLine } from '../data/lines';
import {
  remainingInPeriod,
  TRANSFER_MAX,
  TRANSFER_MAX_WALLET,
  TRANSFER_PERIOD_LABEL,
  TRANSFER_UNITS,
  isServiceUnit,
  unitLabel,
  unitWord,
  type CurrencyCode,
  type OwnBalances,
  type TransferPeriodUsage,
  type TransferUnit,
} from '../data/transfer';

type Props = {
  line: ManagedLine;
  kind: 'service' | 'wallet';
  currency?: CurrencyCode;
  ownBalances: OwnBalances;
  walletRemaining?: number;
  period: TransferPeriodUsage;
  onBack: () => void;
  onTransferred: (amount: number, unit: TransferUnit) => void;
};

type Popup = { title: string; message: string } | null;

function parseAmount(input: string) {
  if (input === '') return null;
  if (!/^\d+$/.test(input)) return null;
  return Number(input);
}

/** Balance Transfer (LF-S-053) — service units or wallet currency. */
export default function BalanceTransfer({
  line,
  kind,
  currency = 'USD',
  ownBalances,
  walletRemaining = 0,
  period,
  onBack,
  onTransferred,
}: Props) {
  const units =
    kind === 'wallet'
      ? [{ id: currency, label: currency, unitWord: currency }]
      : TRANSFER_UNITS;
  const [unit, setUnit] = useState<TransferUnit>(kind === 'wallet' ? currency : 'gb');
  const [amountInput, setAmountInput] = useState('1');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [popup, setPopup] = useState<Popup>(null);

  const remaining = kind === 'wallet' ? walletRemaining : ownBalances[unit as 'gb' | 'calls' | 'texts'];
  const amount = parseAmount(amountInput) ?? 0;
  const after = remaining - amount;
  const name = displayName(line);
  const number = line.mobileDigits ? formatMsisdn(line.mobileDigits) : '';
  const word = unitWord(unit);

  const showNotEnough = () => {
    setPopup({
      title: 'Not enough balance',
      message: `You don't have enough ${word} to make this transfer.`,
    });
  };

  const handleDecrease = () => {
    if (amount <= 1) {
      setPopup({
        title: 'Minimum amount',
        message: `The minimum allowed transfer amount is 1 ${word}.`,
      });
      setAmountInput('1');
      return;
    }
    const next = amount - 1;
    setAmountInput(String(next));
  };

  const handleIncrease = () => {
    if (amount >= remaining) {
      showNotEnough();
      return;
    }
    setAmountInput(String(amount + 1));
  };

  const handleAmountChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    setAmountInput(digits);
  };

  const handleAmountBlur = () => {
    const parsed = parseAmount(amountInput);
    if (parsed != null && parsed > remaining) {
      showNotEnough();
    }
  };

  const handleTransfer = () => {
    if (amount < 1) {
      setPopup({
        title: 'Minimum amount',
        message: `The minimum allowed transfer amount is 1 ${word}.`,
      });
      return;
    }
    if (amount > remaining) {
      showNotEnough();
      return;
    }
    if (unit === 'gb' && remaining - amount < 1) {
      setPopup({
        title: 'Maintaining balance',
        message: "You can't proceed with the transfer as you need to have a maintaining balance of 1GB.",
      });
      return;
    }
    if (remainingInPeriod(period, unit) <= 0 || amount > remainingInPeriod(period, unit)) {
      const max = isServiceUnit(unit) ? TRANSFER_MAX[unit] : TRANSFER_MAX_WALLET;
      setPopup({
        title: 'Transfer limit',
        message: `You reached the max ${max} ${word} that can be transferred within ${TRANSFER_PERIOD_LABEL} period.`,
      });
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <BasicPageTemplate title="Balance Transfer" showBack onBack={onBack}>
      <div className="balance-transfer">
        <section className="balance-transfer-section" aria-labelledby="transfer-to-label">
          <h2 id="transfer-to-label" className="balance-transfer-label">
            Transfer to
          </h2>
          {name ? <p className="balance-transfer-name">{name}</p> : null}
          {number ? <p className="balance-transfer-msisdn">{number}</p> : null}
        </section>

        <section className="balance-transfer-section" aria-labelledby="transfer-amount-label">
          <h2 id="transfer-amount-label" className="balance-transfer-label">
            Transfer Amount
          </h2>
          <div className="balance-transfer-units" role="tablist" aria-label="Transfer unit">
            {units.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={unit === item.id}
                className={unit === item.id ? 'balance-transfer-unit selected' : 'balance-transfer-unit'}
                onClick={() => {
                  if (kind === 'service') setUnit(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="offer-detail-qty-control">
            <button
              type="button"
              className="offer-detail-qty-step"
              onClick={handleDecrease}
              aria-label="Decrease transfer amount"
            >
              −
            </button>
            <input
              className="offer-detail-qty-input"
              value={amountInput}
              inputMode="numeric"
              aria-label="Transfer Amount"
              onChange={(e) => handleAmountChange(e.target.value)}
              onBlur={handleAmountBlur}
            />
            <button
              type="button"
              className="offer-detail-qty-step"
              onClick={handleIncrease}
              aria-label="Increase transfer amount"
            >
              +
            </button>
          </div>
        </section>

        <section className="balance-transfer-section">
          <div className="balance-transfer-summary-row">
            <span>Balance before transfer</span>
            <span>
              {remaining} {unitLabel(unit)}
            </span>
          </div>
          <div className="balance-transfer-summary-row">
            <span>Balance after transfer</span>
            <span>
              {after} {unitLabel(unit)}
            </span>
          </div>
        </section>

        <button type="button" className="btn btn-primary btn-lg" onClick={handleTransfer}>
          Transfer
        </button>
      </div>

      {confirmOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="transfer-confirm-title">
          <div className="modal">
            <h2 id="transfer-confirm-title">Confirm transfer</h2>
            <p>
              Are you sure you want to transfer {amount} {word} to {name} ({number})?
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setConfirmOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setConfirmOpen(false);
                  onTransferred(amount, unit);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="transfer-popup-title">
          <div className="modal">
            <h2 id="transfer-popup-title">{popup.title}</h2>
            <p>{popup.message}</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setPopup(null)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </BasicPageTemplate>
  );
}
