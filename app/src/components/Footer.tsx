import { useState } from 'react';

const LOGO_URL = 'https://lotusflare.com/wp-content/uploads/2024/02/LotusFlare-Logo-White2.svg';
const FALLBACK_LOGO_TEXT = 'LotusFlare';

type Page =
  | 'welcome'
  | 'login'
  | 'number-entry'
  | 'otp'
  | 'activate-sim'
  | 'create-pin'
  | 'account-details'
  | 'account-address'
  | 'id-upload'
  | 'take-selfie'
  | 'registration-review'
  | 'activation-success'
  | 'email-verification'
  | 'shop-sim'
  | 'home'
  | 'privacy'
  | 'terms'
  | 'next-step';

type Social = { name: string; url: string; icon: string };
const SOCIALS: Social[] = [
  { name: 'Facebook', url: 'https://www.facebook.com/lotusflare', icon: 'f' },
  { name: 'YouTube', url: 'https://www.youtube.com/@lotusflare', icon: '▶' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/lotusflare', icon: 'in' },
  { name: 'Instagram', url: 'https://www.instagram.com/lotusflare', icon: '◉' },
];

type Props = {
  onNavigate: (page: Page) => void;
};

export default function Footer({ onNavigate }: Props) {
  // EC-01: operator logo fails to load → show default text logo
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* AC-02: operator logo */}
        <div className="footer-logo">
          {logoFailed ? (
            <span className="logo-text">{FALLBACK_LOGO_TEXT}</span>
          ) : (
            <img src={LOGO_URL} alt="LotusFlare" onError={() => setLogoFailed(true)} />
          )}
        </div>

        {/* AC-03..AC-08: social links */}
        <div className="footer-social">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* AC-09..AC-12: Privacy & Terms */}
        <div className="footer-links">
          <button className="link" onClick={() => onNavigate('privacy')}>Privacy Policy</button>
          <button className="link" onClick={() => onNavigate('terms')}>Terms &amp; Conditions</button>
        </div>
      </div>
    </footer>
  );
}
