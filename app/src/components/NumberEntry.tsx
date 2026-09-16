import { useState } from 'react';

type Props = {
  initialNumber?: string;
  onContinue: (phoneNumber: string) => void;
  onBack: () => void;
};

/** Stub previous screen — out of scope for LF-S-004; used only so OTP can return here. */
export default function NumberEntry({ initialNumber = '', onContinue, onBack }: Props) {
  const [number, setNumber] = useState(initialNumber || '0912 123 4567');

  return (
    <div className="number-entry">
      <button className="otp-back" onClick={onBack} aria-label="Back">
        ←
      </button>
      <div className="number-entry-content">
        <p className="number-entry-badge">Stub · previous screen</p>
        <h1>Enter your number</h1>
        <p className="number-entry-sub">
          This screen is out of scope for OTP verification. Continue to open the OTP page.
        </p>
        <input
          className="number-input"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          aria-label="Mobile number"
        />
        <button className="btn btn-primary btn-lg" onClick={() => onContinue(number)}>
          Continue to OTP
        </button>
      </div>
    </div>
  );
}
