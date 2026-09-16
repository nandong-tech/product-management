import { useRef, useState } from 'react';

export type IdUploadValue = {
  fileName: string;
  fileSize: number;
  previewUrl: string | null;
} | null;

type Props = {
  value: IdUploadValue;
  onChange: (value: IdUploadValue) => void;
  onNext: () => void;
  onBack: () => void;
};

const MSG_REQUIRED = 'This is required';
const MSG_TYPE =
  'This file type is not supported. Please upload a JPEG, JPG, PDF, PNG, or HEIC file.';
const MSG_SIZE = 'This file is too large. Please upload a file smaller than 4MB.';

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = '.jpeg,.jpg,.pdf,.png,.heic,image/jpeg,image/png,image/heic,application/pdf';

function isAllowedType(file: File) {
  const name = file.name.toLowerCase();
  const extOk =
    name.endsWith('.jpeg') ||
    name.endsWith('.jpg') ||
    name.endsWith('.pdf') ||
    name.endsWith('.png') ||
    name.endsWith('.heic');
  const mime = file.type.toLowerCase();
  const mimeOk =
    !mime ||
    mime === 'image/jpeg' ||
    mime === 'image/png' ||
    mime === 'image/heic' ||
    mime === 'image/heif' ||
    mime === 'application/pdf';
  return extOk && mimeOk;
}

export default function ActivationIdUpload({ value, onChange, onNext, onBack }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    setError(null);
    if (!file) return;

    if (!isAllowedType(file)) {
      setError(MSG_TYPE);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    if (file.size >= MAX_BYTES) {
      setError(MSG_SIZE);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    onChange({ fileName: file.name, fileSize: file.size, previewUrl });
  };

  const handleNext = () => {
    if (!value) {
      setError(MSG_REQUIRED);
      return;
    }
    onNext();
  };

  return (
    <div className="activation">
      <div className="activation-content">
        <h1>ID Verification</h1>
        <p className="activation-subtitle">
          Only JPEG, JPG, PDF, PNG and HEIC files with max size of 4MB.
        </p>

        <label className="activation-label" htmlFor="id-upload">
          Photo of Your Valid ID
        </label>
        <div className="activation-upload-row">
          <button
            type="button"
            className="activation-upload-field"
            onClick={() => inputRef.current?.click()}
            aria-invalid={Boolean(error)}
          >
            <span className={value ? '' : 'activation-upload-placeholder'}>
              {value ? value.fileName : 'Choose a file'}
            </span>
            <span className="activation-upload-icon" aria-hidden>
              ↑
            </span>
          </button>
          <input
            ref={inputRef}
            id="id-upload"
            type="file"
            accept={ACCEPT}
            className="activation-file-input"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
        {error && (
          <p className="activation-field-error" role="alert">
            {error}
          </p>
        )}

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
