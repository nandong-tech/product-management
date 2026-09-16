import { useEffect, useRef, useState } from 'react';

type Props = {
  selfieDataUrl: string | null;
  onCapture: (dataUrl: string) => void;
  onClear: () => void;
  onNext: () => void;
  onBack: () => void;
};

const MSG_REQUIRED = 'This is required';
const MSG_CAMERA = 'Camera is not available. Please allow camera access and try again.';

export default function ActivationTakeSelfie({
  selfieDataUrl,
  onCapture,
  onClear,
  onNext,
  onBack,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      setCameraError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError(MSG_CAMERA);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        if (!cancelled) setCameraError(MSG_CAMERA);
      }
    }

    if (!selfieDataUrl) startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [selfieDataUrl]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) {
      setCameraError(MSG_CAMERA);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    onCapture(canvas.toDataURL('image/jpeg', 0.9));
    setSubmitError(null);
  };

  const handleRetake = () => {
    onClear();
    setSubmitError(null);
  };

  const handleBack = () => {
    onClear();
    onBack();
  };

  const handleNext = () => {
    if (!selfieDataUrl) {
      setSubmitError(MSG_REQUIRED);
      return;
    }
    onNext();
  };

  return (
    <div className="activation">
      <div className="activation-content">
        <h1>Take a Selfie</h1>

        <div className="activation-selfie-frame">
          {selfieDataUrl ? (
            <img src={selfieDataUrl} alt="Captured selfie" className="activation-selfie-img" />
          ) : (
            <video ref={videoRef} className="activation-selfie-video" playsInline muted />
          )}
        </div>

        {cameraError && !selfieDataUrl && (
          <p className="activation-field-error" role="alert">
            {cameraError}
          </p>
        )}
        {submitError && (
          <p className="activation-field-error" role="alert">
            {submitError}
          </p>
        )}

        <div className="activation-selfie-actions">
          {selfieDataUrl ? (
            <button type="button" className="btn btn-outline-light" onClick={handleRetake}>
              Retake
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-gradient"
              onClick={handleCapture}
              disabled={Boolean(cameraError)}
            >
              Capture
            </button>
          )}
        </div>

        <div className="activation-nav-row">
          <button type="button" className="btn btn-outline-light" onClick={handleBack}>
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
