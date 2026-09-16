import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import { formatPrice } from '../data/offerList';

type PayMethod = 'card' | 'wallet';

export type SavedCard = {
  id: string;
  last4: string;
};

export const SAMPLE_SAVED_CARDS: SavedCard[] = [{ id: 'card-4242', last4: '4242' }];

type Props = {
  totalAmount: number;
  isLoggedIn?: boolean;
  walletRemaining?: number;
  savedCards?: SavedCard[];
  onSaveCard?: (card: SavedCard) => void;
  onBack: () => void;
  onPaid: (method: 'Credit / Debit Card' | 'Wallet') => void;
};

const MSG_REQUIRED = 'This is required';
const MSG_WALLET_SHORT =
  "You don't have enough balance in wallet to make this payment.";

function last4FromNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.slice(-4);
}

/** Payment method (LF-S-026) — credit/debit card and wallet. */
export default function PaymentMethod({
  totalAmount,
  isLoggedIn = false,
  walletRemaining = 0,
  savedCards = [],
  onSaveCard,
  onBack,
  onPaid,
}: Props) {
  const cards = isLoggedIn ? savedCards : [];
  const hasSavedCards = cards.length > 0;
  const [method, setMethod] = useState<PayMethod>('card');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id ?? '');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [walletError, setWalletError] = useState(false);

  const payLabel = `Pay ${formatPrice(totalAmount) ?? '$0.00'}`;
  const selectedSavedCard = cards.find((card) => card.id === selectedCardId) ?? cards[0] ?? null;

  const validate = () => {
    const next: Record<string, string | null> = {
      cardNumber: cardNumber.trim() ? null : MSG_REQUIRED,
      nameOnCard: nameOnCard.trim() ? null : MSG_REQUIRED,
      expiry: expiry.trim() ? null : MSG_REQUIRED,
      cvv: cvv.trim() ? null : MSG_REQUIRED,
    };
    setErrors(next);
    return Object.values(next).every((e) => e == null);
  };

  const onPrimaryPay = () => {
    if (method === 'wallet') {
      if (walletRemaining < totalAmount) {
        setWalletError(true);
        return;
      }
      onPaid('Wallet');
      return;
    }
    if (hasSavedCards && selectedSavedCard) {
      onPaid('Credit / Debit Card');
      return;
    }
    setSheetOpen(true);
  };

  const onSheetPay = () => {
    if (!validate()) return;
    if (isLoggedIn && saveCard && onSaveCard) {
      const last4 = last4FromNumber(cardNumber);
      if (last4) {
        onSaveCard({ id: `card-${last4}-${Date.now()}`, last4 });
      }
    }
    onPaid('Credit / Debit Card');
  };

  return (
    <BasicPageTemplate title="Payment Method" showBack onBack={onBack}>
      <div className="payment-method">
        <p className="payment-method-helper">How do you want to pay?</p>
        <label className="payment-method-option">
          <input
            type="radio"
            name="pay-method"
            checked={method === 'card'}
            onChange={() => setMethod('card')}
          />
          Credit / Debit Card
        </label>
        {method === 'card' && hasSavedCards ? (
          <div className="payment-saved-cards">
            {cards.map((card) => (
              <label key={card.id} className="payment-method-option payment-saved-card">
                <input
                  type="radio"
                  name="saved-card"
                  checked={selectedSavedCard?.id === card.id}
                  onChange={() => setSelectedCardId(card.id)}
                />
                Card ending in {card.last4}
              </label>
            ))}
            <button
              type="button"
              className="payment-enter-another"
              onClick={() => setSheetOpen(true)}
            >
              Enter another card
            </button>
          </div>
        ) : null}
        {isLoggedIn ? (
          <label className="payment-method-option">
            <input
              type="radio"
              name="pay-method"
              checked={method === 'wallet'}
              onChange={() => setMethod('wallet')}
            />
            <span>Wallet</span>
            <span className="payment-method-option-amount">
              {formatPrice(walletRemaining) ?? '$0.00'}
            </span>
          </label>
        ) : null}
        <button type="button" className="btn btn-primary btn-lg" onClick={onPrimaryPay}>
          {payLabel}
        </button>
      </div>

      {sheetOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="card-sheet-title">
          <div className="modal payment-card-sheet">
            <div className="payment-card-sheet-header">
              <h2 id="card-sheet-title">Card details</h2>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <label className="activation-label">
              Card number
              <input
                className="activation-input"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    cardNumber: cardNumber.trim() ? null : MSG_REQUIRED,
                  }))
                }
              />
              {errors.cardNumber && (
                <span className="activation-field-error">{errors.cardNumber}</span>
              )}
            </label>
            <label className="activation-label">
              Name on card
              <input
                className="activation-input"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    nameOnCard: nameOnCard.trim() ? null : MSG_REQUIRED,
                  }))
                }
              />
              {errors.nameOnCard && (
                <span className="activation-field-error">{errors.nameOnCard}</span>
              )}
            </label>
            <label className="activation-label">
              Expiry date
              <input
                className="activation-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    expiry: expiry.trim() ? null : MSG_REQUIRED,
                  }))
                }
              />
              {errors.expiry && <span className="activation-field-error">{errors.expiry}</span>}
            </label>
            <label className="activation-label">
              CVV
              <input
                className="activation-input"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    cvv: cvv.trim() ? null : MSG_REQUIRED,
                  }))
                }
              />
              {errors.cvv && <span className="activation-field-error">{errors.cvv}</span>}
            </label>
            {isLoggedIn ? (
              <label className="payment-save-card">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                />
                Save card
              </label>
            ) : null}
            <button type="button" className="btn btn-primary btn-lg" onClick={onSheetPay}>
              {payLabel}
            </button>
          </div>
        </div>
      )}

      {walletError && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="wallet-short-title">
          <div className="modal">
            <h2 id="wallet-short-title">Not enough remaining</h2>
            <p>{MSG_WALLET_SHORT}</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setWalletError(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </BasicPageTemplate>
  );
}
