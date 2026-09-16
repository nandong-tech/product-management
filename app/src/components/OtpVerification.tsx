import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';

const OTP_LENGTH = 6;
const DEMO_CORRECT_OTP = '123456';
const RESEND_COOLDOWN_MS = 60_000;
const CODE_VALIDITY_MS = 5 * 60_000;
const LOCK_DURATION_MS = 5 * 60_000;
const MAX_ATTEMPTS = 3;
const MAX_OTPS_PER_24H = 6;
const DAY_MS = 24 * 60 * 60_000;

const GENERIC_ERROR = 'Something went wrong. Please try again.';
const INVALID_OTP = 'Invalid OTP entered';
const LOCKOUT_MSG =
  "You've exceeded the maximum number of attempts to enter the correct OTP. You may try again after 5 minutes.";
const MAX_REQUESTS_MSG =
  "You've exceeded the maximum number of requests. You may try again after 24 hours.";

const STORAGE = {
  lockUntil: 'lf-otp-lock-until',
  fails: 'lf-otp-fail-count',
  sentAt: 'lf-otp-sent-at',
  sendLog: 'lf-otp-send-log',
};

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function readSendLog(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE.sendLog);
    const list: number[] = raw ? JSON.parse(raw) : [];
    const cutoff = Date.now() - DAY_MS;
    return list.filter((t) => t > cutoff);
  } catch {
    return [];
  }
}

function writeSendLog(timestamps: number[]) {
  localStorage.setItem(STORAGE.sendLog, JSON.stringify(timestamps));
}

/** Mask email local part: keep first and last characters, asterisks in between. */
function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length <= 2) return `${local[0] ?? ''}*@${domain}`;
  const middle = '*'.repeat(local.length - 2);
  return `${local[0]}${middle}${local[local.length - 1]}@${domain}`;
}

type Props = {
  phoneNumber?: string;
  /** Destination shown for the OTP. Defaults to number / MSISDN. */
  destinationType?: 'number' | 'email';
  onVerified: () => void;
  onNotYourNumber: () => void;
};

export default function OtpVerification({
  phoneNumber = '0912 123 4567',
  destinationType = 'number',
  onVerified,
  onNotYourNumber,
}: Props) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [, setFailCount] = useState(() => {
    const lockUntil = Number(localStorage.getItem(STORAGE.lockUntil) || 0);
    if (lockUntil > Date.now()) return MAX_ATTEMPTS;
    return Number(localStorage.getItem(STORAGE.fails) || 0);
  });
  const [lockUntil, setLockUntil] = useState(() => Number(localStorage.getItem(STORAGE.lockUntil) || 0));
  const [sentAt, setSentAt] = useState(() => {
    const existing = Number(localStorage.getItem(STORAGE.sentAt) || 0);
    if (existing && Date.now() - existing < CODE_VALIDITY_MS) return existing;
    const now = Date.now();
    localStorage.setItem(STORAGE.sentAt, String(now));
    const log = readSendLog();
    if (log.length === 0) {
      writeSendLog([now]);
    }
    return now;
  });
  const [now, setNow] = useState(Date.now());
  const [verifying, setVerifying] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const verifyingRef = useRef(false);

  const locked = lockUntil > now;
  const resendRemaining = Math.max(0, RESEND_COOLDOWN_MS - (now - sentAt));
  const canResend = !locked && resendRemaining === 0;
  const sendsIn24h = readSendLog().length;

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (lockUntil > 0 && lockUntil <= now) {
      localStorage.removeItem(STORAGE.lockUntil);
      localStorage.setItem(STORAGE.fails, '0');
      setLockUntil(0);
      setFailCount(0);
      setError(null);
    }
  }, [lockUntil, now]);

  const clearDigits = useCallback(() => {
    setDigits(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  }, []);

  const verifyCode = useCallback(
    async (code: string) => {
      if (verifyingRef.current || locked) return;
      verifyingRef.current = true;
      setVerifying(true);
      setError(null);

      try {
        // Demo: simulate a brief verify call. Correct demo code is 123456.
        await new Promise((r) => setTimeout(r, 300));

        const expired = Date.now() - sentAt > CODE_VALIDITY_MS;
        if (expired || code !== DEMO_CORRECT_OTP) {
          let nextFails = 0;
          setFailCount((prev) => {
            nextFails = prev + 1;
            localStorage.setItem(STORAGE.fails, String(nextFails));
            if (nextFails >= MAX_ATTEMPTS) {
              const until = Date.now() + LOCK_DURATION_MS;
              setLockUntil(until);
              localStorage.setItem(STORAGE.lockUntil, String(until));
              setError(LOCKOUT_MSG);
            } else {
              setError(INVALID_OTP);
            }
            return nextFails;
          });
          clearDigits();
          return;
        }

        localStorage.setItem(STORAGE.fails, '0');
        setFailCount(0);
        onVerified();
      } catch {
        setError(GENERIC_ERROR);
        clearDigits();
      } finally {
        verifyingRef.current = false;
        setVerifying(false);
      }
    },
    [clearDigits, locked, onVerified, sentAt],
  );

  const handleChange = (index: number, value: string) => {
    if (locked || verifying) return;
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError((prev) => (prev === INVALID_OTP || prev === GENERIC_ERROR ? null : prev));

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (digit && index === OTP_LENGTH - 1 && next.every((d) => d.length === 1)) {
      void verifyCode(next.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (locked || verifying) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => {
      next[i] = d;
    });
    setDigits(next);
    if (pasted.length === OTP_LENGTH) {
      void verifyCode(pasted);
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || locked) return;
    const log = readSendLog();
    if (log.length >= MAX_OTPS_PER_24H) {
      setError(MAX_REQUESTS_MSG);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 200));
      const t = Date.now();
      const nextLog = [...log, t];
      writeSendLog(nextLog);
      localStorage.setItem(STORAGE.sentAt, String(t));
      setSentAt(t);
      setError(null);
      clearDigits();
    } catch {
      setError(GENERIC_ERROR);
    }
  };

  const destinationLabel =
    destinationType === 'email' ? maskEmail(phoneNumber) : phoneNumber;

  return (
    <div className="otp">
      <button className="otp-back" onClick={onNotYourNumber} aria-label="Back">
        ←
      </button>

      <div className="otp-content">
        <h1>OTP Verification</h1>
        <p className="otp-hint">Please enter the code sent to</p>
        <p className="otp-phone">{destinationLabel}</p>
        <button className="otp-not-yours" onClick={onNotYourNumber}>
          {destinationType === 'email' ? 'Not your email?' : 'Not your number?'}
        </button>

        <div className="otp-inputs" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              className="otp-digit"
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={d}
              disabled={locked || verifying}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>

        {error && <p className="otp-error" role="alert">{error}</p>}
        {verifying && <p className="otp-status">Verifying…</p>}

        <p className="otp-resend-hint">Didn&apos;t receive the code?</p>
        <div className="otp-resend-row">
          <button
            className={`otp-resend ${canResend ? '' : 'disabled'}`}
            onClick={handleResend}
            disabled={!canResend}
          >
            Resend OTP
          </button>
          {!canResend && !locked && (
            <span className="otp-timer">({formatCountdown(resendRemaining)})</span>
          )}
        </div>

        <p className="otp-demo-hint">Demo correct code: {DEMO_CORRECT_OTP}</p>
        <p className="otp-demo-hint">OTPs sent in last 24h: {sendsIn24h}/{MAX_OTPS_PER_24H}</p>
      </div>
    </div>
  );
}
