import { useMemo, useState } from 'react';

type Props = {
  onNext: (phoneNumber: string) => void;
  onBack: () => void;
  onGetSim: () => void;
  onLogIn: () => void;
};

type HelpTab = 'pSIM' | 'eSIM';

type ErrorKind = 'expired' | 'invalid' | 'replacement' | 'activated';

/** Shared general-context inline messages */
const MSG_REQUIRED = 'This is required';
const MSG_FORMAT = 'The number format is incorrect';

/**
 * Demo numbers that are format-valid but wrong state / not in operator pool.
 * Any other complete xxx-xxx-xxxx is treated as valid + correct state → next step.
 */
const DEMO_STATE_ERRORS: Record<string, ErrorKind> = {
  '111-111-1111': 'expired',
  '222-222-2222': 'invalid', // not in current operator number pool
  '333-333-3333': 'replacement',
  '444-444-4444': 'activated',
};

const MSISDN_PATTERN = /^\d{3}-\d{3}-\d{4}$/;

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

/** Format raw digits as xxx-xxx-xxxx while typing (shared MSISDN format). */
function formatMsisdn(raw: string) {
  const d = digitsOnly(raw);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

const ERROR_COPY: Record<
  ErrorKind,
  { message: string; primary: string; secondary?: string }
> = {
  expired: {
    message: 'Sorry, your SIM is expired. Please buy a new SIM and try again.',
    primary: 'Get a SIM',
    secondary: 'Back',
  },
  invalid: {
    message: 'The number you have entered is not a valid number.',
    primary: 'Got it',
  },
  replacement: {
    message:
      'Looks like the number you entered is intended for SIM replacement only. Kindly log in your original number and trigger a SIM replacement request in the Account section.',
    primary: 'Got it',
  },
  activated: {
    message: 'Looks like your SIM is activated already! Log in with your PIN to get started.',
    primary: 'Log in',
    secondary: 'Cancel',
  },
};

export default function ActivationEnterNumber({
  onNext,
  onBack,
  onGetSim,
  onLogIn,
}: Props) {
  const [number, setNumber] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpTab, setHelpTab] = useState<HelpTab>('pSIM');
  const [dialog, setDialog] = useState<ErrorKind | null>(null);

  const canSubmit = useMemo(() => number.length > 0, [number]);

  const handleNext = () => {
    setFieldError(null);

    if (!number.trim()) {
      setFieldError(MSG_REQUIRED);
      return;
    }

    if (!MSISDN_PATTERN.test(number)) {
      setFieldError(MSG_FORMAT);
      return;
    }

    const stateError = DEMO_STATE_ERRORS[number];
    if (stateError) {
      setDialog(stateError);
      return;
    }

    // Valid number whose state is correct for activation
    onNext(number);
  };

  const closeDialog = () => setDialog(null);

  const handleDialogPrimary = () => {
    if (!dialog) return;
    if (dialog === 'expired') {
      closeDialog();
      onGetSim();
      return;
    }
    if (dialog === 'activated') {
      closeDialog();
      onLogIn();
      return;
    }
    closeDialog();
  };

  const errorUi = dialog ? ERROR_COPY[dialog] : null;

  return (
    <div className="activation">
      <button className="otp-back" onClick={onBack} aria-label="Back" type="button">
        ←
      </button>

      <div className="activation-content">
        <h1>Enter your number to activate your account</h1>

        <button
          type="button"
          className="activation-find-link"
          onClick={() => {
            setHelpTab('pSIM');
            setHelpOpen(true);
          }}
        >
          Where can I find this?
        </button>

        <label className="activation-label" htmlFor="activation-msisdn">
          Mobile Number
        </label>
        <input
          id="activation-msisdn"
          className="activation-input"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="xxx-xxx-xxxx"
          value={number}
          onChange={(e) => {
            setNumber(formatMsisdn(e.target.value));
            setFieldError(null);
          }}
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? 'activation-msisdn-error' : undefined}
          aria-label="Mobile Number"
        />
        {fieldError && (
          <p id="activation-msisdn-error" className="activation-field-error" role="alert">
            {fieldError}
          </p>
        )}

        <ul className="activation-reminders">
          <li>
            <span className="activation-reminder-icon" aria-hidden>
              ▣
            </span>
            <span>For physical SIM: Make sure your SIM is inserted into your device</span>
          </li>
          <li>
            <span className="activation-reminder-icon" aria-hidden>
              ▤
            </span>
            <span>For eSIM: Make sure your eSIM is set up already on your e-SIM capable device</span>
          </li>
        </ul>

        <button
          type="button"
          className={`btn btn-gradient btn-lg activation-next ${canSubmit ? '' : 'is-disabled'}`}
          onClick={handleNext}
        >
          Next
        </button>

        <p className="activation-demo-hint">
          Demo — state errors: expired <code>111-111-1111</code> · not in operator pool{' '}
          <code>222-222-2222</code> · replacement <code>333-333-3333</code> · already activated{' '}
          <code>444-444-4444</code>. Any other complete number continues (valid + correct state).
          Incomplete entry shows format / required inline errors.
        </p>
      </div>

      {helpOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setHelpOpen(false)}>
          <div
            className="activation-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Where can I find this?"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="activation-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={helpTab === 'pSIM'}
                className={helpTab === 'pSIM' ? 'active' : ''}
                onClick={() => setHelpTab('pSIM')}
              >
                pSIM
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={helpTab === 'eSIM'}
                className={helpTab === 'eSIM' ? 'active' : ''}
                onClick={() => setHelpTab('eSIM')}
              >
                eSIM
              </button>
            </div>

            <div className="activation-help-body">
              {helpTab === 'pSIM' ? (
                <>
                  <div className="activation-help-art psim" aria-hidden>
                    <div className="sim-bed">
                      <span className="sim-highlight">976-123-4567</span>
                    </div>
                  </div>
                  <p className="activation-help-copy">
                    Your number can be found on the top portion of your SIM bed.
                  </p>
                </>
              ) : (
                <>
                  <div className="activation-help-art esim" aria-hidden>
                    <div className="esim-card">
                      <div className="esim-qr" />
                      <div className="esim-number-box">+63 976 123 1234</div>
                    </div>
                  </div>
                  <p className="activation-help-copy">
                    The number can be found in the order confirmation sent to your email upon
                    purchase.
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              className="btn btn-gradient btn-lg"
              onClick={() => setHelpOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {errorUi && (
        <div className="modal-backdrop" role="presentation" onClick={closeDialog}>
          <div
            className="activation-error-modal"
            role="dialog"
            aria-modal="true"
            aria-live="polite"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="activation-error-message">{errorUi.message}</p>
            <button type="button" className="btn btn-gradient btn-lg" onClick={handleDialogPrimary}>
              {errorUi.primary}
            </button>
            {errorUi.secondary && (
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={closeDialog}
              >
                {errorUi.secondary}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
