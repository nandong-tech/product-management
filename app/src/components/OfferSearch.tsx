import { useMemo, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import OfferTile from './OfferTile';
import {
  MOCK_OFFERS,
  getApprovedOffers,
  searchOffersByName,
  sortOffers,
  type CatalogOffer,
} from '../data/offerList';

const SEARCH_MAX = 100;

type Props = {
  onBack: () => void;
  onOfferDetail: (offerId: string) => void;
  onAddToCart: (offer: CatalogOffer) => void;
  forceEmpty?: boolean;
};

export default function OfferSearch({
  onBack,
  onOfferDetail,
  onAddToCart,
  forceEmpty = false,
}: Props) {
  const offersSource = forceEmpty ? [] : MOCK_OFFERS;
  const availableOffers = useMemo(
    () => sortOffers(getApprovedOffers(offersSource), 'default'),
    [offersSource],
  );
  const hasOffersInCategory = availableOffers.length > 0;

  const [draftQuery, setDraftQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [lengthError, setLengthError] = useState(false);
  const [cartToast, setCartToast] = useState<string | null>(null);

  const visibleOffers = useMemo(
    () => sortOffers(searchOffersByName(offersSource, appliedQuery), 'default'),
    [offersSource, appliedQuery],
  );

  const showLengthError = () => {
    if (draftQuery.length > SEARCH_MAX) {
      setLengthError(true);
      return true;
    }
    setLengthError(false);
    return false;
  };

  const runSearch = () => {
    if (showLengthError()) return;
    setAppliedQuery(draftQuery);
  };

  const addToCart = (offer: CatalogOffer) => {
    onAddToCart(offer);
    setCartToast('added to cart successfully');
    window.setTimeout(() => setCartToast(null), 2000);
  };

  const emptyMessage = !hasOffersInCategory
    ? 'No offers available'
    : appliedQuery.trim() && visibleOffers.length === 0
      ? 'No matching offers'
      : null;

  return (
    <BasicPageTemplate showBack onBack={onBack}>
      <div className="offer-search">
        <div className="offer-search-bar">
          <div className="offer-search-field">
            <input
              className="activation-input offer-search-input"
              type="search"
              value={draftQuery}
              placeholder="What are you looking for?"
              aria-label="What are you looking for?"
              aria-invalid={lengthError}
              aria-describedby={lengthError ? 'offer-search-error' : undefined}
              onChange={(e) => {
                setDraftQuery(e.target.value);
                if (lengthError && e.target.value.length <= SEARCH_MAX) setLengthError(false);
              }}
              onBlur={showLengthError}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  runSearch();
                }
              }}
            />
            {lengthError ? (
              <p id="offer-search-error" className="activation-field-error" role="alert">
                Enter up to 100 characters
              </p>
            ) : null}
          </div>
          <button type="button" className="btn btn-primary offer-search-submit" onClick={runSearch}>
            Search
          </button>
        </div>

        {emptyMessage ? (
          <p className="offer-list-empty">{emptyMessage}</p>
        ) : (
          <ul className="offer-list-grid">
            {visibleOffers.map((offer) => (
              <OfferTile
                key={offer.id}
                offer={offer}
                onOpen={() => onOfferDetail(offer.id)}
                onAddToCart={() => addToCart(offer)}
              />
            ))}
          </ul>
        )}

        {cartToast ? (
          <div className="offer-list-toast" role="status">
            {cartToast}
          </div>
        ) : null}
      </div>
    </BasicPageTemplate>
  );
}
