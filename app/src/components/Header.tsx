import { useState } from 'react';

import { CartIcon } from './OfferTile';

const LOGO_URL = 'https://lotusflare.com/wp-content/uploads/2024/02/LotusFlare-Logo-White2.svg';
const FALLBACK_LOGO_TEXT = 'LotusFlare';

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
  onNavigate: (page: 'welcome' | 'login' | 'activate-sim' | 'dashboard') => void;
  onCart: () => void;
  onShopPlans?: () => void;
  onLineManagement?: () => void;
};

/** Header (LF-S-002) — shown for logged-in and not-logged-in users. */
export default function Header({
  isLoggedIn,
  onLogout,
  onNavigate,
  onCart,
  onShopPlans,
  onLineManagement,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const handleLogoClick = () => onNavigate(isLoggedIn ? 'dashboard' : 'welcome');

  const handleLogoutConfirm = () => {
    setLogoutPrompt(false);
    setMenuOpen(false);
    setSettingsOpen(false);
    onLogout();
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button type="button" className="header-logo" onClick={handleLogoClick} aria-label="Home">
            {logoFailed ? (
              <span className="logo-text">{FALLBACK_LOGO_TEXT}</span>
            ) : (
              <img src={LOGO_URL} alt="LotusFlare" onError={() => setLogoFailed(true)} />
            )}
          </button>

          <div className="header-actions">
            <button
              type="button"
              className="header-cart"
              onClick={() => {
                setMenuOpen(false);
                onCart();
              }}
              aria-label="Cart"
            >
              <CartIcon />
            </button>
            <button
              type="button"
              className="header-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="header-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav id="header-menu" className="header-menu">
          {isLoggedIn ? (
            <ul>
              <li>
                <button type="button">My Account</button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSettingsOpen((v) => !v)}
                  aria-expanded={settingsOpen}
                >
                  Settings
                </button>
                {settingsOpen && (
                  <ul className="submenu">
                    <li>
                      <button type="button">My Profile</button>
                    </li>
                    <li>
                      <button type="button">Manage Users</button>
                    </li>
                    <li>
                      <button type="button">Preferences</button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onShopPlans?.();
                  }}
                >
                  Shop Plans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onLineManagement?.();
                  }}
                >
                  Line management
                </button>
              </li>
              <li>
                <button type="button">Help & Support</button>
              </li>
              <li className="logout-item">
                <button type="button" onClick={() => setLogoutPrompt(true)}>
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('login');
                  }}
                >
                  Log in
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('activate-sim');
                  }}
                >
                  Activate your SIM
                </button>
              </li>
            </ul>
          )}
        </nav>
      )}

      {logoutPrompt && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="modal">
            <h2 id="logout-title">Log out?</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setLogoutPrompt(false)}>
                No
              </button>
              <button type="button" className="btn btn-primary" onClick={handleLogoutConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
