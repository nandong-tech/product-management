import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';

export type EsimFillInfoValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const EMPTY_ESIM_FILL: EsimFillInfoValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const MSG_REQUIRED = 'This is required';
const MSG_SPECIAL = 'Special characters are not allowed';
const MSG_NAME_MAX = 'The maximum length for this field is 50 characters';
const MSG_EMAIL = 'Invalid email format';
const MSG_EMAIL_MAX = 'The maximum length for this field is 254 characters';
const MSG_FORMAT = 'The number format is incorrect';
const NAME_MAX = 50;
const EMAIL_MAX = 254;
const NAME_ALLOWED = /^[A-Za-z\s]+$/;
const MSISDN_PATTERN = /^\d{3}-\d{3}-\d{4}$/;

function formatMsisdn(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return MSG_REQUIRED;
  if (!NAME_ALLOWED.test(v)) return MSG_SPECIAL;
  if (v.length > NAME_MAX) return MSG_NAME_MAX;
  return undefined;
}

function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return MSG_REQUIRED;
  if (v.length > EMAIL_MAX) return MSG_EMAIL_MAX;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return MSG_EMAIL;
  return undefined;
}

function validatePhone(value: string): string | undefined {
  if (!value.trim()) return MSG_REQUIRED;
  if (!MSISDN_PATTERN.test(value)) return MSG_FORMAT;
  return undefined;
}

type Props = {
  values: EsimFillInfoValues;
  onChange: (values: EsimFillInfoValues) => void;
  onBack: () => void;
  onNext: (values: EsimFillInfoValues) => void;
};

/** eSIM purchase fill info (LF-S-024) — guest only. */
export default function EsimPurchaseFillInfo({ values, onChange, onBack, onNext }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof EsimFillInfoValues, string>>>({});

  const patch = (partial: Partial<EsimFillInfoValues>) => onChange({ ...values, ...partial });

  const handleNext = () => {
    const nextValues: EsimFillInfoValues = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone,
    };
    onChange(nextValues);

    const nextErrors = {
      firstName: validateName(nextValues.firstName),
      lastName: validateName(nextValues.lastName),
      email: validateEmail(nextValues.email),
      phone: validatePhone(nextValues.phone),
    };
    const cleaned = Object.fromEntries(
      Object.entries(nextErrors).filter(([, v]) => v != null),
    ) as Partial<Record<keyof EsimFillInfoValues, string>>;
    setErrors(cleaned);
    if (Object.keys(cleaned).length > 0) return;
    onNext(nextValues);
  };

  return (
    <BasicPageTemplate title="Fill in Your Details" showBack onBack={onBack}>
      <div className="esim-fill">
        <p className="page-body-text">All fields with * are required.</p>

        <label className="activation-label" htmlFor="esim-first-name">
          First Name *
        </label>
        <input
          id="esim-first-name"
          className="activation-input"
          value={values.firstName}
          onChange={(e) => patch({ firstName: e.target.value })}
          onBlur={() =>
            setErrors((prev) => ({ ...prev, firstName: validateName(values.firstName) }))
          }
        />
        {errors.firstName && (
          <p className="activation-field-error" role="alert">
            {errors.firstName}
          </p>
        )}

        <label className="activation-label" htmlFor="esim-last-name">
          Last Name *
        </label>
        <input
          id="esim-last-name"
          className="activation-input"
          value={values.lastName}
          onChange={(e) => patch({ lastName: e.target.value })}
          onBlur={() =>
            setErrors((prev) => ({ ...prev, lastName: validateName(values.lastName) }))
          }
        />
        {errors.lastName && (
          <p className="activation-field-error" role="alert">
            {errors.lastName}
          </p>
        )}

        <label className="activation-label" htmlFor="esim-email">
          Email *
        </label>
        <input
          id="esim-email"
          className="activation-input"
          type="email"
          value={values.email}
          onChange={(e) => patch({ email: e.target.value })}
          onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(values.email) }))}
        />
        {errors.email && (
          <p className="activation-field-error" role="alert">
            {errors.email}
          </p>
        )}

        <label className="activation-label" htmlFor="esim-phone">
          Mobile Number *
        </label>
        <input
          id="esim-phone"
          className="activation-input"
          type="tel"
          placeholder="xxx-xxx-xxxx"
          value={values.phone}
          onChange={(e) => patch({ phone: formatMsisdn(e.target.value) })}
          onBlur={() => setErrors((prev) => ({ ...prev, phone: validatePhone(values.phone) }))}
        />
        {errors.phone && (
          <p className="activation-field-error" role="alert">
            {errors.phone}
          </p>
        )}

        <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
          Next
        </button>
      </div>
    </BasicPageTemplate>
  );
}
