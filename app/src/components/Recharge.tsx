import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';

const PRESETS = [5, 10, 20, 30] as const;
const MIN_AMOUNT = 5;
const MSG_REQUIRED = 'This is required';
const MSG_MIN = 'Minimum recharge amount is $5';

type Props = {
  onBack: () => void;
  onRecharge: (amount: number) => void;
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Recharge (LF-S-051) */
export default function Recharge({ onBack, onRecharge }: Props) {
  const [amountText, setAmountText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const amount = amountText === '' ? null : Number(amountText);

  const validate = (value: string): string | null => {
    if (value === '') return MSG_REQUIRED;
    const n = Number(value);
    if (!Number.isFinite(n) || n < MIN_AMOUNT) return MSG_MIN;
    return null;
  };

  const selectPreset = (preset: number) => {
    setSelectedPreset(preset);
    setAmountText(String(preset));
    setError(null);
  };

  const onAmountChange = (raw: string) => {
    const next = digitsOnly(raw);
    setAmountText(next);
    const n = next === '' ? null : Number(next);
    setSelectedPreset(n != null && PRESETS.includes(n as (typeof PRESETS)[number]) ? n : null);
  };

  const onAmountBlur = () => {
    setError(validate(amountText));
  };

  const submit = () => {
    const nextError = validate(amountText);
    setError(nextError);
    if (nextError || amount == null) return;
    onRecharge(amount);
  };

  return (
    <BasicPageTemplate title="Recharge" showBack onBack={onBack}>
      <div className="recharge">
        <p className="recharge-heading">Choose a recharge amount</p>
        <div className="recharge-presets" role="group" aria-label="Choose a recharge amount">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`recharge-preset${selectedPreset === preset ? ' selected' : ''}`}
              onClick={() => selectPreset(preset)}
            >
              ${preset}
            </button>
          ))}
        </div>

        <p className="recharge-or">or enter custom amount</p>

        <label className="activation-label" htmlFor="recharge-amount">
          Enter recharge amount
        </label>
        <div className={`recharge-amount-wrap${error ? ' has-error' : ''}`}>
          {amountText !== '' ? <span className="recharge-amount-prefix">$</span> : null}
          <input
            id="recharge-amount"
            className="activation-input recharge-amount-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={amountText}
            onChange={(e) => onAmountChange(e.target.value)}
            onBlur={onAmountBlur}
          />
        </div>
        {error ? <p className="activation-field-error">{error}</p> : null}
        <p className="recharge-helper">Minimum recharge amount is $5</p>

        <button type="button" className="btn btn-primary btn-lg recharge-submit" onClick={submit}>
          Recharge
        </button>
      </div>
    </BasicPageTemplate>
  );
}
