import { useMemo, useState } from 'react';
import { COUNTRIES, getCountry } from '../data/addressRegions';

export type AccountAddressValues = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
};

type Props = {
  values: AccountAddressValues;
  onChange: (values: AccountAddressValues) => void;
  onNext: () => void;
  onBack: () => void;
};

const MSG_REQUIRED = 'This is required';

type FieldErrors = {
  addressLine1?: string;
  stateProvince?: string;
  country?: string;
};

export default function ActivationAccountAddress({ values, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const subdivisions = useMemo(() => {
    if (!values.country) return [];
    return getCountry(values.country)?.subdivisions ?? [];
  }, [values.country]);

  const patch = (partial: Partial<AccountAddressValues>) => {
    onChange({ ...values, ...partial });
  };

  const handleCountryChange = (country: string) => {
    patch({ country, stateProvince: '' });
    setErrors((prev) => ({ ...prev, country: undefined, stateProvince: undefined }));
  };

  const handleNext = () => {
    const next: FieldErrors = {};
    if (!values.addressLine1.trim()) next.addressLine1 = MSG_REQUIRED;
    if (!values.country) next.country = MSG_REQUIRED;
    if (!values.stateProvince) next.stateProvince = MSG_REQUIRED;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onNext();
  };

  return (
    <div className="activation">
      <div className="activation-content">
        <h1>Create account</h1>
        <p className="activation-subtitle">Enter your address</p>

        <label className="activation-label" htmlFor="addr-line1">
          Address line 1
        </label>
        <input
          id="addr-line1"
          className="activation-input"
          type="text"
          autoComplete="address-line1"
          value={values.addressLine1}
          onChange={(e) => {
            patch({ addressLine1: e.target.value });
            setErrors((prev) => ({ ...prev, addressLine1: undefined }));
          }}
          aria-invalid={Boolean(errors.addressLine1)}
        />
        {errors.addressLine1 && (
          <p className="activation-field-error" role="alert">
            {errors.addressLine1}
          </p>
        )}

        <label className="activation-label" htmlFor="addr-line2">
          Address line 2
        </label>
        <input
          id="addr-line2"
          className="activation-input"
          type="text"
          autoComplete="address-line2"
          value={values.addressLine2}
          onChange={(e) => patch({ addressLine2: e.target.value })}
        />

        <label className="activation-label" htmlFor="addr-city">
          City
        </label>
        <input
          id="addr-city"
          className="activation-input"
          type="text"
          autoComplete="address-level2"
          value={values.city}
          onChange={(e) => patch({ city: e.target.value })}
        />

        <label className="activation-label" htmlFor="addr-country">
          Country
        </label>
        <select
          id="addr-country"
          className="activation-input activation-select"
          value={values.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          aria-invalid={Boolean(errors.country)}
        >
          <option value="">Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="activation-field-error" role="alert">
            {errors.country}
          </p>
        )}

        <label className="activation-label" htmlFor="addr-state">
          State / Province
        </label>
        <select
          id="addr-state"
          className="activation-input activation-select"
          value={values.stateProvince}
          onChange={(e) => {
            patch({ stateProvince: e.target.value });
            setErrors((prev) => ({ ...prev, stateProvince: undefined }));
          }}
          aria-invalid={Boolean(errors.stateProvince)}
        >
          <option value="">Select state / province</option>
          {subdivisions.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.stateProvince && (
          <p className="activation-field-error" role="alert">
            {errors.stateProvince}
          </p>
        )}

        <label className="activation-label" htmlFor="addr-postal">
          Postal code
        </label>
        <input
          id="addr-postal"
          className="activation-input"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          value={values.postalCode}
          onChange={(e) => patch({ postalCode: e.target.value.replace(/\D/g, '') })}
        />

        <div className="activation-nav-row">
          <button type="button" className="btn btn-outline-light" onClick={onBack}>
            Previous
          </button>
          <button type="button" className="btn btn-gradient" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
