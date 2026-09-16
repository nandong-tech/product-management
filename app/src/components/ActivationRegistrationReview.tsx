import type { AccountDetailsValues } from './ActivationAccountDetails';
import type { AccountAddressValues } from './ActivationAccountAddress';
import type { IdUploadValue } from './ActivationIdUpload';
import { getCountry } from '../data/addressRegions';

type Props = {
  phoneNumber: string;
  accountDetails: AccountDetailsValues;
  address: AccountAddressValues;
  idUpload: IdUploadValue;
  selfieDataUrl: string | null;
  onEditPersonal: () => void;
  onEditAddress: () => void;
  onEditId: () => void;
  onEditSelfie: () => void;
  onSubmit: () => void;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || '—'}</span>
    </div>
  );
}

function genderLabel(value: string) {
  if (value === 'female') return 'Female';
  if (value === 'male') return 'Male';
  if (value === 'prefer-not-to-say') return 'Prefer not to say';
  return value;
}

export default function ActivationRegistrationReview({
  phoneNumber,
  accountDetails,
  address,
  idUpload,
  selfieDataUrl,
  onEditPersonal,
  onEditAddress,
  onEditId,
  onEditSelfie,
  onSubmit,
}: Props) {
  const countryName = getCountry(address.country)?.name ?? address.country;
  const stateName =
    getCountry(address.country)?.subdivisions.find((s) => s.code === address.stateProvince)?.name ??
    address.stateProvince;

  return (
    <div className="activation">
      <div className="activation-content activation-review">
        <h1>Create an Account</h1>
        <p className="activation-helper-warn">Make sure all details are correct before submitting!</p>

        <section className="review-section">
          <div className="review-section-head">
            <h2>Personal Info</h2>
            <button type="button" className="review-edit" onClick={onEditPersonal}>
              Edit
            </button>
          </div>
          <Row label="Mobile Number" value={phoneNumber} />
          <Row label="First Name" value={accountDetails.firstName} />
          <Row label="Last Name" value={accountDetails.lastName} />
          <Row label="Gender" value={genderLabel(accountDetails.gender)} />
          <Row label="Birthday" value={accountDetails.birthday} />
          <Row label="Email" value={accountDetails.email} />
        </section>

        <section className="review-section">
          <div className="review-section-head">
            <h2>Address</h2>
            <button type="button" className="review-edit" onClick={onEditAddress}>
              Edit
            </button>
          </div>
          <Row label="Address line 1" value={address.addressLine1} />
          <Row label="Address line 2" value={address.addressLine2} />
          <Row label="City" value={address.city} />
          <Row label="Country" value={countryName} />
          <Row label="State / Province" value={stateName} />
          <Row label="Postal code" value={address.postalCode} />
        </section>

        <section className="review-section">
          <div className="review-section-head">
            <h2>ID Upload</h2>
            <button type="button" className="review-edit" onClick={onEditId}>
              Edit
            </button>
          </div>
          <Row label="Photo of Your Valid ID" value={idUpload?.fileName ?? ''} />
          {idUpload?.previewUrl && (
            <img src={idUpload.previewUrl} alt="Uploaded ID" className="review-preview" />
          )}
        </section>

        <section className="review-section">
          <div className="review-section-head">
            <h2>Selfie</h2>
            <button type="button" className="review-edit" onClick={onEditSelfie}>
              Edit
            </button>
          </div>
          {selfieDataUrl ? (
            <img src={selfieDataUrl} alt="Selfie" className="review-preview review-preview-selfie" />
          ) : (
            <Row label="Selfie" value="" />
          )}
        </section>

        <button type="button" className="btn btn-gradient btn-lg activation-next" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
