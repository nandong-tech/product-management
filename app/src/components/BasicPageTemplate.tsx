import type { ReactNode } from 'react';

type Props = {
  title?: string;
  /** LF-P-001: true · LF-P-002: false */
  showBack?: boolean;
  onBack?: () => void;
  children: ReactNode;
};

/** Basic page content chrome (LF-P-001 / LF-P-002). Header + Footer are composed by App. */
export default function BasicPageTemplate({ title, showBack = true, onBack, children }: Props) {
  return (
    <div className="page-template">
      <div className="page-template-top">
        {showBack ? (
          <button type="button" className="page-back" onClick={onBack} aria-label="Back">
            ←
          </button>
        ) : (
          <span className="page-back-spacer" aria-hidden="true" />
        )}
        {title ? <h1 className="page-title">{title}</h1> : <span className="page-title" aria-hidden="true" />}
      </div>
      <div className="page-template-content">{children}</div>
    </div>
  );
}
