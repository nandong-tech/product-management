import { useMemo, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import OfferTile from './OfferTile';
import {
  CURRENT_OFFER_CATEGORY_NAME,
  MOCK_OFFERS,
  REMOTE_CONFIG_QUICK_LINKS,
  type CatalogOffer,
  type SortOption,
  filterOffersByCategory,
  getDisplayedQuickLinks,
  getFilterCategories,
  sortOffers,
} from '../data/offerList';

type Props = {
  onBack: () => void;
  onSearch: () => void;
  onOfferDetail: (offerId: string) => void;
  onAddToCart: (offer: CatalogOffer) => void;
  /** Page title / current offer category name from DNO */
  offerCategoryName?: string;
  /** Offers to show under this root category (defaults to full mock catalog) */
  offers?: CatalogOffer[];
  /** Demo: force EC-01 empty state */
  forceEmpty?: boolean;
  /** Demo: simulate remote config fail / empty → only All */
  remoteConfigMode?: 'ok' | 'fail' | 'empty';
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        d="M4 6h16M7 12h10M10 18h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type AppliedState = {
  categoryName: string | null;
  selectedQuickLink: string | null;
  sort: SortOption;
};

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'newest', label: 'Newest first' },
];

export default function OfferList({
  onBack,
  onSearch,
  onOfferDetail,
  onAddToCart,
  offerCategoryName = CURRENT_OFFER_CATEGORY_NAME,
  offers = MOCK_OFFERS,
  forceEmpty = false,
  remoteConfigMode = 'ok',
}: Props) {
  const offersSource = forceEmpty ? [] : offers;
  const hasOffers = offersSource.some((o) => o.approvedAndRunning);

  const remoteConfig =
    remoteConfigMode === 'fail' || remoteConfigMode === 'empty'
      ? remoteConfigMode === 'empty'
        ? []
        : null
      : REMOTE_CONFIG_QUICK_LINKS;

  const quickLinks = useMemo(
    () => getDisplayedQuickLinks(remoteConfig, undefined, offersSource),
    [remoteConfig, offersSource],
  );

  const filterCategories = useMemo(
    () => getFilterCategories(undefined, offersSource),
    [offersSource],
  );

  const [applied, setApplied] = useState<AppliedState>({
    categoryName: null,
    selectedQuickLink: 'All',
    sort: 'default',
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [draftCategory, setDraftCategory] = useState<string | null>(null);
  const [draftSort, setDraftSort] = useState<SortOption>('default');
  const [cartToast, setCartToast] = useState<string | null>(null);

  const visibleOffers = useMemo(() => {
    const filtered = filterOffersByCategory(offersSource, applied.categoryName);
    return sortOffers(filtered, applied.sort);
  }, [offersSource, applied]);

  const openFilter = () => {
    if (applied.selectedQuickLink === 'All') {
      setDraftCategory(null);
    } else if (applied.selectedQuickLink) {
      setDraftCategory(applied.selectedQuickLink);
    } else {
      setDraftCategory(applied.categoryName);
    }
    setDraftSort(applied.sort);
    setFilterOpen(true);
  };

  const closeFilter = () => setFilterOpen(false);

  const applyFilter = () => {
    const categoryName = draftCategory;
    let selectedQuickLink: string | null;

    if (!categoryName) {
      selectedQuickLink = 'All';
    } else if (quickLinks.includes(categoryName)) {
      selectedQuickLink = categoryName;
    } else {
      selectedQuickLink = null;
    }

    setApplied({
      categoryName,
      selectedQuickLink,
      sort: draftSort,
    });
    setFilterOpen(false);
  };

  const selectQuickLink = (name: string) => {
    if (name === 'All') {
      setApplied((prev) => ({
        ...prev,
        categoryName: null,
        selectedQuickLink: 'All',
      }));
      return;
    }
    setApplied((prev) => ({
      ...prev,
      categoryName: name,
      selectedQuickLink: name,
    }));
  };

  const addToCart = (offer: CatalogOffer) => {
    onAddToCart(offer);
    setCartToast('added to cart successfully');
    window.setTimeout(() => setCartToast(null), 2000);
  };

  if (!hasOffers) {
    return (
      <BasicPageTemplate title={offerCategoryName} showBack onBack={onBack}>
        <p className="offer-list-empty">No offers available</p>
      </BasicPageTemplate>
    );
  }

  return (
    <BasicPageTemplate title={offerCategoryName} showBack onBack={onBack}>
      <div className="offer-list">
        <div className="offer-list-toolbar">
          <button type="button" className="offer-list-icon-btn" onClick={onSearch} aria-label="Search">
            <SearchIcon />
          </button>
          <button
            type="button"
            className="offer-list-icon-btn"
            onClick={openFilter}
            aria-label="Filter"
            aria-haspopup="dialog"
          >
            <FilterIcon />
          </button>
        </div>

        <div className="offer-list-quicklinks" role="tablist" aria-label="Quick links">
          {quickLinks.map((name, index) => {
            const selected = applied.selectedQuickLink === name;
            return (
              <button
                key={`${name}-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`offer-list-chip${selected ? ' is-selected' : ''}`}
                onClick={() => selectQuickLink(name)}
              >
                {name}
              </button>
            );
          })}
        </div>

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

        {cartToast ? <div className="offer-list-toast" role="status">{cartToast}</div> : null}
      </div>

      {filterOpen ? (
        <div className="offer-filter-backdrop" role="presentation" onClick={closeFilter}>
          <div
            className="offer-filter-sheet"
            role="dialog"
            aria-labelledby="offer-filter-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="offer-filter-header">
              <h2 id="offer-filter-title">Filter & sort</h2>
              <button type="button" className="page-back" onClick={closeFilter} aria-label="Close">
                ✕
              </button>
            </div>

            {filterCategories.length > 0 ? (
              <fieldset className="offer-filter-section">
                <legend>Filter by category</legend>
                {filterCategories.map((cat) => (
                  <label key={cat.id} className="offer-filter-option">
                    <input
                      type="radio"
                      name="offer-category"
                      checked={draftCategory === cat.name}
                      onChange={() => setDraftCategory(cat.name)}
                      onClick={() => {
                        if (draftCategory === cat.name) setDraftCategory(null);
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </fieldset>
            ) : null}

            <fieldset className="offer-filter-section">
              <legend>Sort by</legend>
              {SORT_LABELS.map((opt) => (
                <label key={opt.value} className="offer-filter-option">
                  <input
                    type="radio"
                    name="offer-sort"
                    checked={draftSort === opt.value}
                    onChange={() => setDraftSort(opt.value)}
                    onClick={() => {
                      if (draftSort === opt.value) setDraftSort('default');
                    }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </fieldset>

            <button type="button" className="btn btn-primary offer-filter-apply" onClick={applyFilter}>
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </BasicPageTemplate>
  );
}
