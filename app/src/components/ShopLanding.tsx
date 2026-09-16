import {
  formatOfferDates,
  formatPrice,
  getFeaturedOffersForRoot,
  type CatalogOffer,
  type RootOfferCategory,
} from '../data/offerList';
import BasicPageTemplate from './BasicPageTemplate';

const PLACEHOLDER_IMAGE = 'https://placehold.co/320x180/30363d/8b949e?text=Placeholder';

const CATEGORIES: { root: RootOfferCategory; label: string }[] = [
  { root: 'sim', label: 'SIM offers' },
  { root: 'data', label: 'Data offers' },
];

type Props = {
  onSelectCategory: (root: RootOfferCategory) => void;
  onSelectOffer: (offerId: string) => void;
};

/** Shop landing page (LF-S-028) — no back (LF-P-002). */
export default function ShopLanding({ onSelectCategory, onSelectOffer }: Props) {
  return (
    <BasicPageTemplate title="Shop" showBack={false}>
      <div className="shop-landing">
        {CATEGORIES.map(({ root, label }) => {
          const featured = getFeaturedOffersForRoot(root);
          return (
            <section
              key={root}
              className="shop-landing-section"
              aria-labelledby={`shop-category-${root}`}
            >
              <button
                type="button"
                id={`shop-category-${root}`}
                className="shop-landing-category-title"
                onClick={() => onSelectCategory(root)}
              >
                {label}
              </button>
              {featured.length > 0 && (
                <div className="shop-landing-featured">
                  {featured.map((offer) => (
                    <FeaturedOfferCard
                      key={offer.id}
                      offer={offer}
                      onSelect={() => onSelectOffer(offer.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </BasicPageTemplate>
  );
}

function FeaturedOfferCard({
  offer,
  onSelect,
}: {
  offer: CatalogOffer;
  onSelect: () => void;
}) {
  const dates = formatOfferDates(offer.startTime, offer.endTime);
  const price = formatPrice(offer.price);

  return (
    <button type="button" className="shop-landing-featured-card" onClick={onSelect}>
      <img
        className="shop-landing-featured-image"
        src={offer.imageUrl || PLACEHOLDER_IMAGE}
        alt=""
      />
      <div className="shop-landing-featured-body">
        {offer.name != null && <div className="shop-landing-featured-name">{offer.name}</div>}
        {dates != null && <div className="shop-landing-featured-dates">{dates}</div>}
        {price != null && <div className="shop-landing-featured-price">{price}</div>}
      </div>
    </button>
  );
}
