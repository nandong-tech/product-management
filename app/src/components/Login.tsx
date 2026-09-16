import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import BasicPageTemplate from './BasicPageTemplate';

type Props = {
  onBack: () => void;
  onSuccess: () => void;
  onForgotPin: () => void;
  onCreateAccount: () => void;
  onVerifyEmail: () => void;
};

type Dialog =
  | 'locked'
  | 'not-registered'
  | 'email-not-verified'
  | 'ported-out'
  | null;

const PIN_LENGTH = 6;
const MAX_WRONG_PIN = 3;
const LOCK_MS = 5 * 60_000;
const CORRECT_PIN = '123456';

/** Demo numbers (10 digits). PIN for all special cases is 123456 when “correct”. */
const DEMO = {
  /** Happy path — registered + email verified */
  success: '09121234567',
  /** Registered + correct PIN, email not verified */
  emailUnverified: '09120000002',
  /** Correct PIN path → not registered */
  notRegistered: '09120000003',
  /** Correct PIN path → ported out */
  portedOut: '09120000004',
  /** Already locked (correct PIN still shows locked) */
  alreadyLocked: '09120000005',
} as const;

function digitsOnly(value: string, max = 10) {
  return value.replace(/\D/g, '').slice(0, max);
}

function formatMobile(raw: string) {
  const d = digitsOnly(raw);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
}

function failKey(number: string) {
  return `lf-login-fails:${number}`;
}

function lockKey(number: string) {
  return `lf-login-lock:${number}`;
}

function readFails(number: string) {
  return Number(localStorage.getItem(failKey(number)) || 0);
}

function writeFails(number: string, count: number) {
  localStorage.setItem(failKey(number), String(count));
}

function readLock(number: string) {
  return Number(localStorage.getItem(lockKey(number)) || 0);
}

function writeLock(number: string, until: number) {
  localStorage.setItem(lockKey(number), String(until));
}

function clearAttempts(number: string) {
  localStorage.removeItem(failKey(number));
  localStorage.removeItem(lockKey(number));
}

/** Login (LF-S-016) */
export default function Login({
  onBack,
  onSuccess,
  onForgotPin,
  onCreateAccount,
  onVerifyEmail,
}: Props) {
  const [mobile, setMobile] = useState('');
  const [pinDigits, setPinDigits] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<Dialog>(null);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const pin = pinDigits.join('');
  const mobileDigits = digitsOnly(mobile);
  const canSubmit = useMemo(
    () => mobileDigits.length > 0 && pin.length === PIN_LENGTH,
    [mobileDigits, pin],
  );

  const setPinAt = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setPinDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < PIN_LENGTH - 1) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = () => {
    setInlineError(null);

    const number = mobileDigits;
    if (!number || pin.length < PIN_LENGTH) return;

    const now = Date.now();
    const lockUntil = number === DEMO.alreadyLocked ? now + LOCK_MS : readLock(number);
    if (lockUntil > now) {
      setDialog('locked');
      return;
    }

    const isCorrectPin = pin === CORRECT_PIN;
    const isKnownRegistered =
      number === DEMO.success ||
      number === DEMO.emailUnverified ||
      number === DEMO.portedOut ||
      number === DEMO.alreadyLocked ||
      number === DEMO.notRegistered;

    // Account-status popups only after correct number + correct PIN
    if (isCorrectPin && number === DEMO.notRegistered) {
      clearAttempts(number);
      setDialog('not-registered');
      return;
    }
    if (isCorrectPin && number === DEMO.emailUnverified) {
      clearAttempts(number);
      setDialog('email-not-verified');
      return;
    }
    if (isCorrectPin && number === DEMO.portedOut) {
      clearAttempts(number);
      setDialog('ported-out');
      return;
    }
    if (isCorrectPin && number === DEMO.alreadyLocked) {
      setDialog('locked');
      return;
    }
    if (isCorrectPin && number === DEMO.success) {
      clearAttempts(number);
      onSuccess();
      return;
    }

    // Incorrect number or PIN (EC-01 / EC-02)
    // Treat unknown numbers or wrong PIN as incorrect credentials
    if (!isCorrectPin || !isKnownRegistered || number !== DEMO.success) {
      const fails = readFails(number) + 1;
      if (fails >= MAX_WRONG_PIN) {
        writeFails(number, MAX_WRONG_PIN);
        writeLock(number, now + LOCK_MS);
        setDialog('locked');
        return;
      }
      writeFails(number, fails);
      const remaining = MAX_WRONG_PIN - fails;
      setInlineError(
        `The mobile number or PIN you entered is incorrect. You can try ${remaining} more times`,
      );
    }
  };

  const closeDialog = () => setDialog(null);

  return (
    <>
      <BasicPageTemplate title="Enter your number to log in" showBack onBack={onBack}>
        <div className="login-form">
          <label className="activation-label" htmlFor="login-mobile">
            Mobile Number
          </label>
          <input
            id="login-mobile"
            className="activation-input"
            type="tel"
            inputMode="numeric"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(formatMobile(e.target.value))}
            autoComplete="tel"
          />

          <label className="activation-label" htmlFor="login-pin-0">
            6-Digit PIN
          </label>
          <div className="otp-inputs login-pin-inputs" role="group" aria-label="6-Digit PIN">
            {pinDigits.map((d, i) => (
              <input
                key={i}
                id={i === 0 ? 'login-pin-0' : undefined}
                ref={(el) => {
                  pinRefs.current[i] = el;
                }}
                className="otp-digit"
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setPinAt(i, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(i, e)}
                aria-label={`PIN digit ${i + 1}`}
              />
            ))}
          </div>

          <button type="button" className="btn-link login-forgot" onClick={onForgotPin}>
            Forgot PIN?
          </button>

          {inlineError && (
            <p className="activation-field-error" role="alert">
              {inlineError}
            </p>
          )}

          <button
            type="button"
            className="btn btn-primary btn-lg login-submit"
            disabled={!canSubmit}
            onClick={handleLogin}
          >
            Log in
          </button>

          <p className="otp-demo-hint">
            Demo: success <code>0912 123 4567</code> / PIN <code>123456</code>. Wrong PIN → 3 tries then
            lock. Also: <code>0912 000 0002</code> email unverified · <code>…0003</code> not registered ·{' '}
            <code>…0004</code> ported out · <code>…0005</code> locked.
          </p>
        </div>
      </BasicPageTemplate>

      {dialog === 'locked' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>Sorry, your account is locked! You may try again after 5 minutes.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={closeDialog}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === 'not-registered' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>Sorry, this number is not yet registered. Please create an account to log in.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  closeDialog();
                  onCreateAccount();
                }}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === 'email-not-verified' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>
              Your account is not yet verified. Click the verification link sent to your email to
              proceed.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  closeDialog();
                  onVerifyEmail();
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === 'ported-out' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>Sorry, you have been ported out.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={closeDialog}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
