import { useState } from 'react';

export type AccountDetailsValues = {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  email: string;
};

type Props = {
  values: AccountDetailsValues;
  onChange: (values: AccountDetailsValues) => void;
  onNext: () => void;
};

const MSG_REQUIRED = 'This is required';
const MSG_SPECIAL = 'Special characters are not allowed';
const MSG_NAME_MAX = 'The maximum length for this field is 50 characters';
const MSG_EMAIL_MAX = 'The maximum length for this field is 254 characters';
const MSG_EMAIL = 'Invalid email format';
const NAME_MAX = 50;
const EMAIL_MAX = 254;
/** Letters and spaces only — numbers and all other characters are special characters. */
const NAME_ALLOWED = /^[A-Za-z\s]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  gender?: string;
};

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function validateName(value: string): string | undefined {
  if (!value) return MSG_REQUIRED;
  if (value.length > NAME_MAX) return MSG_NAME_MAX;
  if (!NAME_ALLOWED.test(value)) return MSG_SPECIAL;
  return undefined;
}

function validateBirthday(value: string): string | undefined {
  if (!value) return MSG_REQUIRED;
  // Future dates are not selectable (max=today)
  if (value > todayIso()) return MSG_REQUIRED;
  return undefined;
}

export default function ActivationAccountDetails({ values, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const maxBirthday = todayIso();

  const patch = (partial: Partial<AccountDetailsValues>) => {
    onChange({ ...values, ...partial });
  };

  const handleNext = () => {
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const email = values.email.trim();

    // Trim silently into kept values
    if (firstName !== values.firstName || lastName !== values.lastName || email !== values.email) {
      onChange({ ...values, firstName, lastName, email });
    }

    const next: FieldErrors = {};

    const firstErr = validateName(firstName);
    if (firstErr) next.firstName = firstErr;

    const lastErr = validateName(lastName);
    if (lastErr) next.lastName = lastErr;

    if (!values.gender) next.gender = MSG_REQUIRED;

    const birthdayErr = validateBirthday(values.birthday);
    if (birthdayErr) next.birthday = birthdayErr;

    if (!email) {
      next.email = MSG_REQUIRED;
    } else if (email.length > EMAIL_MAX) {
      next.email = MSG_EMAIL_MAX;
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = MSG_EMAIL;
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onNext();
  };

  return (
    <div className="activation">
      <div className="activation-content">
        <h1>Create account</h1>
        <p className="activation-subtitle">Fill out your personal information</p>

        <label className="activation-label" htmlFor="account-first-name">
          First name
        </label>
        <input
          id="account-first-name"
          className="activation-input"
          type="text"
          autoComplete="given-name"
          placeholder="Enter first name"
          value={values.firstName}
          onChange={(e) => {
            patch({ firstName: e.target.value });
            setErrors((prev) => ({ ...prev, firstName: undefined }));
          }}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? 'account-first-name-error' : undefined}
        />
        {errors.firstName && (
          <p id="account-first-name-error" className="activation-field-error" role="alert">
            {errors.firstName}
          </p>
        )}

        <label className="activation-label" htmlFor="account-last-name">
          Last name
        </label>
        <input
          id="account-last-name"
          className="activation-input"
          type="text"
          autoComplete="family-name"
          placeholder="Enter last name"
          value={values.lastName}
          onChange={(e) => {
            patch({ lastName: e.target.value });
            setErrors((prev) => ({ ...prev, lastName: undefined }));
          }}
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby={errors.lastName ? 'account-last-name-error' : undefined}
        />
        {errors.lastName && (
          <p id="account-last-name-error" className="activation-field-error" role="alert">
            {errors.lastName}
          </p>
        )}

        <label className="activation-label" htmlFor="account-gender">
          Gender
        </label>
        <select
          id="account-gender"
          className="activation-input activation-select"
          value={values.gender}
          onChange={(e) => {
            patch({ gender: e.target.value });
            setErrors((prev) => ({ ...prev, gender: undefined }));
          }}
          aria-invalid={Boolean(errors.gender)}
          aria-describedby={errors.gender ? 'account-gender-error' : undefined}
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <p id="account-gender-error" className="activation-field-error" role="alert">
            {errors.gender}
          </p>
        )}

        <label className="activation-label" htmlFor="account-birthday">
          Birthday
        </label>
        <input
          id="account-birthday"
          className="activation-input"
          type="date"
          max={maxBirthday}
          value={values.birthday}
          onChange={(e) => {
            patch({ birthday: e.target.value });
            setErrors((prev) => ({ ...prev, birthday: undefined }));
          }}
          onKeyDown={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          aria-invalid={Boolean(errors.birthday)}
          aria-describedby={errors.birthday ? 'account-birthday-error' : undefined}
        />
        {errors.birthday && (
          <p id="account-birthday-error" className="activation-field-error" role="alert">
            {errors.birthday}
          </p>
        )}

        <label className="activation-label" htmlFor="account-email">
          Email
        </label>
        <input
          id="account-email"
          className="activation-input"
          type="email"
          autoComplete="email"
          placeholder="Enter email"
          value={values.email}
          onChange={(e) => {
            patch({ email: e.target.value });
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'account-email-error' : undefined}
        />
        {errors.email && (
          <p id="account-email-error" className="activation-field-error" role="alert">
            {errors.email}
          </p>
        )}

        <button type="button" className="btn btn-gradient btn-lg activation-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
