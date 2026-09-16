import { useEffect, useMemo, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import {
  MOCK_OFFERS,
  formatPrice,
  type CatalogOffer,
} from '../data/offerList';

type Props = {
  offerId: string | null;
  isLoggedIn: boolean;
  onBack: () => void;
  onLogin: () => void;
  onAddToCart: (offer: CatalogOffer, quantity: number) => void;
  onCheckout: (offer: CatalogOffer, quantity: number) => void;
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/320x180/30363d/8b949e?text=Placeholder';
const MAX_QTY = 99;

function parseQuantity(input: string): number | null {
  const s = input.trim();
  if (!/^[0-9]+$/.test(s)) return null;
  const n = Number.parseInt(s, 10);
  if (!Number.isFinite(n)) return null;
  if (n < 1 || n > MAX_QTY) return null;
  return n;
}

function quantityFieldError(input: string): string | null {
  const s = input.trim();
  if (!s) return 'This is required';
  if (!parseQuantity(s)) return `Quantity must be between 1 and ${MAX_QTY}.`;
  return null;
}

export default function OfferDetail({
  offerId,
  isLoggedIn,
  onBack,
  onLogin,
  onAddToCart,
  onCheckout,
}: Props) {
  const offer = useMemo(
    () => (offerId ? MOCK_OFFERS.find((o) => o.id === offerId) ?? null : null),
    [offerId],
  );

  const [qtyInput, setQtyInput] = useState('1');
  const [qtyError, setQtyError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setQtyInput('1');
    setQtyError(null);
  }, [offerId]);

  const canAddToCart = Boolean(offer?.allowAddToCart);

  if (!offer) {
    return (
      <BasicPageTemplate title="" showBack onBack={onBack}>
        <p className="page-body-text">Offer not found.</p>
      </BasicPageTemplate>
    );
  }

  const canPurchase = isLoggedIn || offer.kind === 'physical-sim' || offer.kind === 'esim';
  const isEsim = offer.kind === 'esim';
  const maxQty = isEsim ? 1 : MAX_QTY;
  const price = formatPrice(offer.price ?? undefined);

  const onIncrease = () => {
    if (isEsim) return;
    setQtyError(null);
    const current = parseQuantity(qtyInput) ?? 1;
    const next = Math.min(maxQty, current + 1);
    setQtyInput(String(next));
  };

  const onDecrease = () => {
    setQtyError(null);
    const current = parseQuantity(qtyInput) ?? 1;
    const next = Math.max(1, current - 1);
    setQtyInput(String(next));
  };

  const onBuyNow = () => {
    if (!offer) return;
    if (isEsim) {
      onCheckout(offer, 1);
      return;
    }

    const error = quantityFieldError(qtyInput);
    if (error) {
      setQtyError(error);
      return;
    }

    const qty = parseQuantity(qtyInput);
    if (!qty) return;
    onCheckout(offer, qty);
  };

  const handleAddToCart = () => {
    if (!offer) return;
    if (!canAddToCart) return;
    if (isEsim) {
      onAddToCart(offer, 1);
      setToast('added to cart successfully');
      window.setTimeout(() => setToast(null), 2000);
      return;
    }

    const error = quantityFieldError(qtyInput);
    if (error) {
      setQtyError(error);
      return;
    }

    const qty = parseQuantity(qtyInput);
    if (!qty) return;
    onAddToCart(offer, qty);
    setToast('added to cart successfully');
    window.setTimeout(() => setToast(null), 2000);
  };

  const offerDetailsContent = offer.offerKindLabel;

  return (
    <BasicPageTemplate title="" showBack onBack={onBack}>
      <div className="offer-detail">
        <div className="offer-detail-media">
          <img
            className="offer-detail-image"
            src={offer.imageUrl ?? PLACEHOLDER_IMAGE}
            alt={offer.name ?? 'Offer image'}
          />
        </div>

        {offer.name ? <h2 className="offer-detail-name">{offer.name}</h2> : null}
        {price ? <p className="offer-detail-price">{price}</p> : null}

        <div className="offer-detail-section">
          <h3 className="offer-detail-section-title">Offer Details</h3>
          {offerDetailsContent ? (
            <p className="offer-detail-section-body">{offerDetailsContent}</p>
          ) : null}
        </div>

        <div className="offer-detail-qty">
          <label className="offer-detail-qty-label">Quantity</label>
          <div className="offer-detail-qty-control">
            <button
              type="button"
              className="offer-detail-qty-step"
              onClick={onDecrease}
              disabled={(parseQuantity(qtyInput) ?? 1) <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              className="offer-detail-qty-input"
              value={qtyInput}
              inputMode="numeric"
              readOnly={isEsim}
              onChange={(e) => {
                if (isEsim) return;
                setQtyError(null);
                setQtyInput(e.target.value.replace(/[^0-9]/g, ''));
              }}
              onBlur={() => {
                if (isEsim) return;
                setQtyError(quantityFieldError(qtyInput));
              }}
            />
            <button
              type="button"
              className="offer-detail-qty-step"
              onClick={onIncrease}
              disabled={isEsim || (parseQuantity(qtyInput) ?? 1) >= maxQty}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {qtyError ? <div className="offer-detail-qty-error">{qtyError}</div> : null}
        </div>

        {canPurchase ? (
          <>
            {canAddToCart ? (
              <button
                type="button"
                className="btn btn-primary offer-detail-add"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            ) : null}
            <button type="button" className="btn btn-primary offer-detail-buy" onClick={onBuyNow}>
              Buy now
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary offer-detail-buy" onClick={onLogin}>
            Log in to purchase
          </button>
        )}

        {toast ? (
          <div className="offer-detail-toast" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </BasicPageTemplate>
  );
}

