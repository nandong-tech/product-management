import { useState } from 'react';

// In a real deployment this URL would come from tenant configuration.
const TENANT_WELCOME_BG: string | null = null; // e.g. 'https://example.com/tenant-bg.jpg'

const DEFAULT_BG = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';

type Props = {
  onLogin: () => void;
  onActivateSim: () => void;
  onShopNow: () => void;
};

export default function Welcome({ onLogin, onActivateSim, onShopNow }: Props) {
  // EC-01: if the configured background fails to load, fall back to the default.
  const [bgFailed, setBgFailed] = useState(false);
  const bg = TENANT_WELCOME_BG && !bgFailed ? TENANT_WELCOME_BG : null;

  return (
    <div
      className="welcome"
      style={bg ? { backgroundImage: `url(${bg})` } : { background: DEFAULT_BG }}
    >
      {bg && (
        <img
          src={bg}
          alt=""
          style={{ display: 'none' }}
          onError={() => setBgFailed(true)}
        />
      )}
      <div className="welcome-content">
        <h1>Welcome</h1>
        <p className="welcome-sub">Choose how to continue.</p>
        <div className="welcome-actions">
          <button className="btn btn-primary btn-lg" onClick={onLogin}>
            Log in
          </button>
          <button className="btn btn-primary btn-lg" onClick={onActivateSim}>
            Activate your SIM
          </button>
        </div>
        <div className="welcome-footer">
          <span>Don’t have a SIM yet?</span>
          <button className="btn btn-link" onClick={onShopNow}>
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
}
