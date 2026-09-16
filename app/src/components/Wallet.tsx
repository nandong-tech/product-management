import BasicPageTemplate from './BasicPageTemplate';
import { formatPrice } from '../data/offerList';

type Props = {
  balance: number;
  balanceFailed?: boolean;
  onBack: () => void;
  onRecharge: () => void;
  onTransfer: () => void;
};

/** Wallet (LF-S-050) */
export default function Wallet({
  balance,
  balanceFailed = false,
  onBack,
  onRecharge,
  onTransfer,
}: Props) {
  return (
    <BasicPageTemplate title="Wallet" showBack onBack={onBack}>
      <div className="wallet">
        <p className="wallet-balance-label">Balance in wallet</p>
        <p className="wallet-balance">{balanceFailed ? '--' : formatPrice(balance)}</p>
        <div className="wallet-actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={onRecharge}>
            Recharge
          </button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={onTransfer}>
            Transfer
          </button>
        </div>
      </div>
    </BasicPageTemplate>
  );
}
