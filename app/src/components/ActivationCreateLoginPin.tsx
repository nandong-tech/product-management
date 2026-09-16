import { useState } from 'react';

type Props = {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
};

const MSG_REQUIRED = 'This is required';
const MSG_WEAK =
  'Kindly nominate a strong PIN that does not have sequential (e.g. 123456), repetitive (e.g. 111111), or double-repeating (e.g. 121212) patterns';
const MSG_MISMATCH = 'The PINs you have entered do not match';

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 6);
}

function isSequential(pin: string) {
  if (pin.length !== 6) return false;
  let asc = true;
  let desc = true;
  for (let i = 1; i < pin.length; i++) {
    if (Number(pin[i]) !== Number(pin[i - 1]) + 1) asc = false;
    if (Number(pin[i]) !== Number(pin[i - 1]) - 1) desc = false;
  }
  return asc || desc;
}

function isRepetitive(pin: string) {
  return pin.length === 6 && /^(.)\1{5}$/.test(pin);
}

function isDoubleRepeating(pin: string) {
  return pin.length === 6 && /^(..)\1{2}$/.test(pin);
}

function isWeakPin(pin: string) {
  return isSequential(pin) || isRepetitive(pin) || isDoubleRepeating(pin);
}

export default function ActivationCreateLoginPin({ phoneNumber, onNext, onBack }: Props) {
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleNext = () => {
    setPinError(null);
    setConfirmError(null);

    let hasError = false;

    if (!pin) {
      setPinError(MSG_REQUIRED);
      hasError = true;
    } else if (pin.length < 6) {
      setPinError(MSG_REQUIRED);
      hasError = true;
    }

    if (!confirm) {
      setConfirmError(MSG_REQUIRED);
      hasError = true;
    } else if (confirm.length < 6) {
      setConfirmError(MSG_REQUIRED);
      hasError = true;
    }

    if (hasError) return;

    if (isWeakPin(pin)) {
      setPinError(MSG_WEAK);
      return;
    }

    if (pin !== confirm) {
      setConfirmError(MSG_MISMATCH);
      return;
    }

    onNext();
  };

  return (
    <div className="activation">
      <button className="otp-back" onClick={onBack} aria-label="Back" type="button">
        ←
      </button>

      <div className="activation-content">
        <h1>Create your login PIN</h1>
        <p className="activation-subtitle">Creating PIN for {phoneNumber}</p>

        <label className="activation-label" htmlFor="activation-pin">
          PIN
        </label>
        <div className="activation-pin-row">
          <input
            id="activation-pin"
            className="activation-input"
            type={showPin ? 'text' : 'password'}
            inputMode="numeric"
            autoComplete="new-password"
            placeholder="Enter 6 digits code"
            value={pin}
            onChange={(e) => {
              setPin(digitsOnly(e.target.value));
              setPinError(null);
            }}
            aria-invalid={Boolean(pinError)}
            aria-describedby={pinError ? 'activation-pin-error' : 'activation-pin-hint'}
          />
          <button
            type="button"
            className="activation-pin-toggle"
            onClick={() => setShowPin((v) => !v)}
            aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
          >
            {showPin ? 'Hide' : 'Show'}
          </button>
        </div>
        <p id="activation-pin-hint" className="activation-helper">
          Enter 6 digits code
        </p>
        {pinError && (
          <p id="activation-pin-error" className="activation-field-error" role="alert">
            {pinError}
          </p>
        )}

        <label className="activation-label" htmlFor="activation-confirm-pin">
          Confirm PIN
        </label>
        <div className="activation-pin-row">
          <input
            id="activation-confirm-pin"
            className="activation-input"
            type={showConfirm ? 'text' : 'password'}
            inputMode="numeric"
            autoComplete="new-password"
            placeholder="Enter 6 digits code"
            value={confirm}
            onChange={(e) => {
              setConfirm(digitsOnly(e.target.value));
              setConfirmError(null);
            }}
            aria-invalid={Boolean(confirmError)}
            aria-describedby={confirmError ? 'activation-confirm-pin-error' : undefined}
          />
          <button
            type="button"
            className="activation-pin-toggle"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Hide Confirm PIN' : 'Show Confirm PIN'}
          >
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
        {confirmError && (
          <p id="activation-confirm-pin-error" className="activation-field-error" role="alert">
            {confirmError}
          </p>
        )}

        <button type="button" className="btn btn-gradient btn-lg activation-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
