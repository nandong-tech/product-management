import { useMemo, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import { COUNTRIES, getCountry } from '../data/addressRegions';
import { formatPrice, type CatalogOffer } from '../data/offerList';
import type { AccountAddressValues } from './ActivationAccountAddress';
import type { AccountDetailsValues } from './ActivationAccountDetails';

export type CheckoutLine = {
  offer: CatalogOffer;
  quantity: number;
};

export type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referralCode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
};

export const EMPTY_CHECKOUT_FORM: CheckoutFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  referralCode: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
};

type PurchaseKind = 'physical-sim' | 'esim' | 'data';

type Props = {
  lines: CheckoutLine[];
  values: CheckoutFormValues;
  onChange: (values: CheckoutFormValues) => void;
  onBack: () => void;
  onProceedToPayment: () => void;
  isLoggedIn?: boolean;
  /** Guest eSIM details after email OTP verified */
  esimDetailsVerified?: boolean;
  onFillEsimDetails?: () => void;
  onEditEsimDetails?: () => void;
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/320x180/30363d/8b949e?text=Placeholder';
const MSG_REQUIRED = 'This is required';
const MSG_EMAIL_MAX = 'The maximum length for this field is 254 characters';
const MSG_EMAIL = 'Invalid email format';
const MSG_FORMAT = 'The number format is incorrect';
const EMAIL_MAX = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MSISDN_PATTERN = /^\d{3}-\d{3}-\d{4}$/;

type FieldErrors = Partial<Record<keyof CheckoutFormValues, string>>;

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

function formatMsisdn(raw: string) {
  const d = digitsOnly(raw);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

function validateEmail(value: string): string | undefined {
  if (!value) return MSG_REQUIRED;
  if (value.length > EMAIL_MAX) return MSG_EMAIL_MAX;
  if (!EMAIL_PATTERN.test(value)) return MSG_EMAIL;
  return undefined;
}

function validatePhone(value: string): string | undefined {
  if (!value) return MSG_REQUIRED;
  if (!MSISDN_PATTERN.test(value)) return MSG_FORMAT;
  return undefined;
}

function getPurchaseKind(lines: CheckoutLine[]): PurchaseKind | null {
  if (lines.length === 0) return null;
  const kinds = new Set(lines.map((line) => line.offer.kind));
  if (kinds.size !== 1) return null;
  const kind = lines[0].offer.kind;
  if (kind === 'esim' && (lines.length !== 1 || lines[0].quantity !== 1)) return null;
  return kind;
}

export function prefillCheckoutForm(
  form: CheckoutFormValues,
  account: AccountDetailsValues,
  address: AccountAddressValues,
  phoneNumber: string,
  isLoggedIn: boolean,
): CheckoutFormValues {
  if (!isLoggedIn) return form;
  const formattedPhone = formatMsisdn(phoneNumber);
  return {
    ...form,
    firstName: form.firstName || account.firstName,
    lastName: form.lastName || account.lastName,
    email: form.email || account.email,
    phone: form.phone || (MSISDN_PATTERN.test(formattedPhone) ? formattedPhone : ''),
    addressLine1: form.addressLine1 || address.addressLine1,
    addressLine2: form.addressLine2 || address.addressLine2,
    city: form.city || address.city,
    stateProvince: form.stateProvince || address.stateProvince,
    postalCode: form.postalCode || address.postalCode.replace(/\D/g, ''),
    country: form.country || address.country,
  };
}

export default function Checkout({
  lines,
  values,
  onChange,
  onBack,
  onProceedToPayment,
  isLoggedIn = false,
  esimDetailsVerified = false,
  onFillEsimDetails,
  onEditEsimDetails,
}: Props) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [esimGateMessage, setEsimGateMessage] = useState<string | null>(null);
  const purchaseKind = getPurchaseKind(lines);
  const isPhysical = purchaseKind === 'physical-sim';
  const isEsim = purchaseKind === 'esim';
  const showReferral = isPhysical || isEsim;
  const showAddress = isPhysical;
  const guestEsimNeedsDetails = isEsim && !isLoggedIn && !esimDetailsVerified;
  const guestEsimReady = isEsim && !isLoggedIn && esimDetailsVerified;
  const loggedInEsim = isEsim && isLoggedIn;
  const showPhysicalContact = isPhysical;

  const subdivisions = useMemo(() => {
    if (!values.country) return [];
    return getCountry(values.country)?.subdivisions ?? [];
  }, [values.country]);

  const total = lines.reduce((sum, line) => sum + (line.offer.price ?? 0) * line.quantity, 0);

  const patch = (partial: Partial<CheckoutFormValues>) => {
    onChange({ ...values, ...partial });
  };

  const setFieldError = (field: keyof CheckoutFormValues, message: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const handleCountryChange = (country: string) => {
    patch({ country, stateProvince: '' });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.country;
      delete next.stateProvince;
      return next;
    });
  };

  const handleProceed = () => {
    if (guestEsimNeedsDetails) {
      setEsimGateMessage('You need to fill in your details first.');
      return;
    }
    setEsimGateMessage(null);

    const next: FieldErrors = {};
    const nextValues: CheckoutFormValues = {
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      addressLine1: values.addressLine1.trim(),
    };
    if (
      nextValues.firstName !== values.firstName ||
      nextValues.lastName !== values.lastName ||
      nextValues.email !== values.email ||
      nextValues.addressLine1 !== values.addressLine1
    ) {
      onChange(nextValues);
    }

    if (showPhysicalContact) {
      const emailErr = validateEmail(nextValues.email);
      if (emailErr) next.email = emailErr;
      const phoneErr = validatePhone(nextValues.phone);
      if (phoneErr) next.phone = phoneErr;
    }

    if (showAddress) {
      if (!nextValues.addressLine1) next.addressLine1 = MSG_REQUIRED;
      if (!nextValues.country) next.country = MSG_REQUIRED;
      if (!nextValues.stateProvince) next.stateProvince = MSG_REQUIRED;
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onProceedToPayment();
  };

  return (
    <BasicPageTemplate title="Checkout" showBack onBack={onBack}>
      <div className="checkout">
        <ul className="checkout-list">
          {lines.map((line) => {
            const price = formatPrice(line.offer.price ?? undefined);
            return (
              <li key={line.offer.id} className="checkout-item">
                <img
                  className="shopping-cart-image"
                  src={line.offer.imageUrl ?? PLACEHOLDER_IMAGE}
                  alt=""
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <div className="shopping-cart-item-body">
                  {line.offer.name ? <h3 className="shopping-cart-item-name">{line.offer.name}</h3> : null}
                  {price ? <p className="shopping-cart-item-price">{price}</p> : null}
                  <p className="checkout-item-qty">Qty {line.quantity}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {isEsim ? (
          <section className="checkout-send-to" aria-labelledby="checkout-send-to-title">
            <h2 id="checkout-send-to-title" className="shop-landing-heading">
              Send to
            </h2>
            {guestEsimNeedsDetails ? (
              <button type="button" className="btn btn-link" onClick={onFillEsimDetails}>
                Fill in your details
              </button>
            ) : null}
            {guestEsimReady || loggedInEsim ? (
              <div className="checkout-send-to-details">
                <p>
                  {[values.firstName, values.lastName].filter(Boolean).join(' ') || '—'}
                </p>
                <p>{values.phone || '—'}</p>
                <p>{values.email || '—'}</p>
                {guestEsimReady ? (
                  <button type="button" className="btn btn-link" onClick={onEditEsimDetails}>
                    Edit
                  </button>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}

        {showPhysicalContact ? (
          <>
            <label className="activation-label" htmlFor="checkout-email">
              Email
            </label>
            <input
              id="checkout-email"
              className="activation-input"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => {
                patch({ email: e.target.value });
                setFieldError('email', undefined);
              }}
              onBlur={() => {
                const email = values.email.trim();
                if (email !== values.email) patch({ email });
                setFieldError('email', validateEmail(email));
              }}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <p className="activation-field-error" role="alert">
                {errors.email}
              </p>
            ) : null}

            <label className="activation-label" htmlFor="checkout-phone">
              Phone number
            </label>
            <input
              id="checkout-phone"
              className="activation-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="xxx-xxx-xxxx"
              value={values.phone}
              onChange={(e) => {
                patch({ phone: formatMsisdn(e.target.value) });
                setFieldError('phone', undefined);
              }}
              onBlur={() => setFieldError('phone', validatePhone(values.phone))}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? (
              <p className="activation-field-error" role="alert">
                {errors.phone}
              </p>
            ) : null}
          </>
        ) : null}

        {showAddress ? (
          <>
            <label className="activation-label" htmlFor="checkout-addr-line1">
              Address line 1
            </label>
            <input
              id="checkout-addr-line1"
              className="activation-input"
              type="text"
              autoComplete="address-line1"
              value={values.addressLine1}
              onChange={(e) => {
                patch({ addressLine1: e.target.value });
                setFieldError('addressLine1', undefined);
              }}
              onBlur={() =>
                setFieldError(
                  'addressLine1',
                  values.addressLine1.trim() ? undefined : MSG_REQUIRED,
                )
              }
              aria-invalid={Boolean(errors.addressLine1)}
            />
            {errors.addressLine1 ? (
              <p className="activation-field-error" role="alert">
                {errors.addressLine1}
              </p>
            ) : null}

            <label className="activation-label" htmlFor="checkout-addr-line2">
              Address line 2
            </label>
            <input
              id="checkout-addr-line2"
              className="activation-input"
              type="text"
              autoComplete="address-line2"
              value={values.addressLine2}
              onChange={(e) => patch({ addressLine2: e.target.value })}
            />

            <label className="activation-label" htmlFor="checkout-city">
              City
            </label>
            <input
              id="checkout-city"
              className="activation-input"
              type="text"
              autoComplete="address-level2"
              value={values.city}
              onChange={(e) => patch({ city: e.target.value })}
            />

            <label className="activation-label" htmlFor="checkout-country">
              Country
            </label>
            <select
              id="checkout-country"
              className="activation-input activation-select"
              value={values.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              onBlur={() => setFieldError('country', values.country ? undefined : MSG_REQUIRED)}
              aria-invalid={Boolean(errors.country)}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country ? (
              <p className="activation-field-error" role="alert">
                {errors.country}
              </p>
            ) : null}

            <label className="activation-label" htmlFor="checkout-state">
              State / Province
            </label>
            <select
              id="checkout-state"
              className="activation-input activation-select"
              value={values.stateProvince}
              onChange={(e) => {
                patch({ stateProvince: e.target.value });
                setFieldError('stateProvince', undefined);
              }}
              onBlur={() =>
                setFieldError('stateProvince', values.stateProvince ? undefined : MSG_REQUIRED)
              }
              aria-invalid={Boolean(errors.stateProvince)}
            >
              <option value="">Select state / province</option>
              {subdivisions.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.stateProvince ? (
              <p className="activation-field-error" role="alert">
                {errors.stateProvince}
              </p>
            ) : null}

            <label className="activation-label" htmlFor="checkout-postal">
              Postal code
            </label>
            <input
              id="checkout-postal"
              className="activation-input"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={values.postalCode}
              onChange={(e) => patch({ postalCode: e.target.value.replace(/\D/g, '') })}
            />
          </>
        ) : null}

        {showReferral ? (
          <>
            <label className="activation-label" htmlFor="checkout-referral">
              Referral code
            </label>
            <input
              id="checkout-referral"
              className="activation-input"
              type="text"
              value={values.referralCode}
              onChange={(e) => patch({ referralCode: e.target.value })}
            />
          </>
        ) : null}

        <div className="checkout-footer">
          <p className="shopping-cart-total">Total {formatPrice(total) ?? '$0.00'}</p>
          {esimGateMessage ? (
            <div className="modal-backdrop" role="dialog" aria-modal="true">
              <div className="modal">
                <p>{esimGateMessage}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEsimGateMessage(null)}
                >
                  Got it
                </button>
              </div>
            </div>
          ) : null}
          <button type="button" className="btn btn-primary shopping-cart-checkout" onClick={handleProceed}>
            Proceed to payment
          </button>
        </div>
      </div>
    </BasicPageTemplate>
  );
}
