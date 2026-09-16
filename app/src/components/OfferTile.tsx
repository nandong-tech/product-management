import { formatOfferDates, formatPrice, type CatalogOffer } from '../data/offerList';

const PLACEHOLDER_IMAGE = 'https://placehold.co/320x180/30363d/8b949e?text=Placeholder';

export function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M6 6 5 3H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

type Props = {
  offer: CatalogOffer;
  onOpen: () => void;
  onAddToCart: () => void;
};

export default function OfferTile({ offer, onOpen, onAddToCart }: Props) {
  const dates = formatOfferDates(offer.startTime, offer.endTime);
  const price = formatPrice(offer.price);

  return (
    <li className="offer-tile">
      <div className="offer-tile-media">
        <button type="button" className="offer-tile-hit" onClick={onOpen}>
          {offer.imageUrl ? (
            <img
              className="offer-tile-image"
              src={offer.imageUrl}
              alt=""
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = PLACEHOLDER_IMAGE;
              }}
            />
          ) : (
            <img
              className="offer-tile-image offer-tile-image-placeholder"
              src={PLACEHOLDER_IMAGE}
              alt=""
            />
          )}
        </button>
        <button
          type="button"
          className="offer-tile-add-icon"
          aria-label="Add to cart"
          onClick={onAddToCart}
        >
          <CartIcon />
        </button>
      </div>
      <button type="button" className="offer-tile-body" onClick={onOpen}>
        {offer.name ? <h2 className="offer-tile-name">{offer.name}</h2> : null}
        {dates ? <p className="offer-tile-dates">{dates}</p> : null}
        {price ? <p className="offer-tile-price">{price}</p> : null}
        {offer.offerKindLabel ? <p className="offer-tile-meta">{offer.offerKindLabel}</p> : null}
      </button>
    </li>
  );
}
