import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import {
  INVALID_OPERATOR_NUMBERS,
  MAX_OTHER_LINES,
  OTHER_ACCOUNT_NUMBERS,
  OWN_MOBILE_DIGITS,
  digitsOnly,
  formatMsisdn,
  isCompleteMsisdn,
  isPendingActive,
  type ManagedLine,
} from '../data/lines';

type Props = {
  lines: ManagedLine[];
  ownMobileDigits?: string;
  onBack: () => void;
  onAdded: (mobileDigits: string) => void;
  onResent: (mobileDigits: string) => void;
};

type ErrorKind = 'own' | 'already-here' | 'other-account' | 'invalid' | 'max';

const ERROR_COPY: Record<ErrorKind, string> = {
  own: "You can't add your own number.",
  'already-here': 'This number is already added to your account.',
  'other-account':
    'This number is already added to another account. A number can only be added to one account at a time.',
  invalid: 'The number you have entered is not a valid number.',
  max: 'The maximum number of lines has been reached for this account.',
};

/** Add a New Line (LF-S-046) */
export default function AddANewLine({
  lines,
  ownMobileDigits = OWN_MOBILE_DIGITS,
  onBack,
  onAdded,
  onResent,
}: Props) {
  const [value, setValue] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<ErrorKind | null>(null);
  const [resendOpen, setResendOpen] = useState(false);

  const digits = digitsOnly(value);
  const visibleCount = lines.filter((line) => line.invitationAccepted || isPendingActive(line)).length;

  const validateField = (raw: string) => {
    const d = digitsOnly(raw);
    if (!d || d.length !== 10) {
      setFieldError('This is required');
      return false;
    }
    setFieldError(null);
    return true;
  };

  const classify = (d: string): ErrorKind | 'pending' | 'ok' => {
    if (d === ownMobileDigits) return 'own';
    if (INVALID_OPERATOR_NUMBERS.has(d)) return 'invalid';
    if (OTHER_ACCOUNT_NUMBERS.has(d)) return 'other-account';
    const existing = lines.find((line) => line.mobileDigits === d);
    if (existing?.invitationAccepted) return 'already-here';
    if (existing && isPendingActive(existing)) return 'pending';
    if (visibleCount >= MAX_OTHER_LINES) return 'max';
    if (!isCompleteMsisdn(d)) return 'invalid';
    return 'ok';
  };

  const handleAdd = () => {
    if (!validateField(value)) return;
    const result = classify(digits);
    if (result === 'pending') {
      setResendOpen(true);
      return;
    }
    if (result !== 'ok') {
      setError(result);
      return;
    }
    onAdded(digits);
  };

  return (
    <BasicPageTemplate title="Add a New Line" showBack onBack={onBack}>
      <div className="add-line">
        <p className="add-line-help">
          You can add up to {MAX_OTHER_LINES} lines to your account.
        </p>
        <label className="add-line-label" htmlFor="add-line-msisdn">
          Mobile Number
        </label>
        <input
          id="add-line-msisdn"
          className="number-input add-line-input"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={(e) => {
            setValue(formatMsisdn(e.target.value));
            if (fieldError) setFieldError(null);
          }}
          onBlur={() => validateField(value)}
        />
        {fieldError ? <p className="add-line-field-error">{fieldError}</p> : null}
        <button type="button" className="btn btn-primary add-line-submit" onClick={handleAdd}>
          Add
        </button>
      </div>

      {resendOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="resend-title">
          <div className="modal">
            <h2 id="resend-title">Invitation already sent</h2>
            <p>The invitation was already sent. Do you want to send again?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setResendOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setResendOpen(false);
                  onResent(digits);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="add-line-error-title">
          <div className="modal">
            <h2 id="add-line-error-title">Cannot add this number</h2>
            <p>{ERROR_COPY[error]}</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setError(null)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </BasicPageTemplate>
  );
}
