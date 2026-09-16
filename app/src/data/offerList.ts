/** Mock DNO portal data for LF-S-017 Offer list demo */

export type OfferKind = 'physical-sim' | 'esim' | 'data';

export type CatalogOffer = {
  id: string;
  name?: string;
  imageUrl?: string;
  startTime?: string; // ISO date
  endTime?: string;
  price?: number;
  sortPriority?: number | null;
  kind: OfferKind;
  /** Whether add to cart is allowed from the list tile */
  allowAddToCart: boolean;
  /** Optional label for demo (e.g. Physical SIM / eSIM / Data) */
  offerKindLabel?: string;
  /** Level-1 category under the current offer category */
  categoryId: string;
  approvedAndRunning: boolean;
};

export type Level1Category = {
  id: string;
  name: string;
};

/** Demo: current root offer category name from DNO (page title) */
export const CURRENT_OFFER_CATEGORY_NAME = 'SIM Offers';

export type RootOfferCategory = 'sim' | 'data';

export const ROOT_CATEGORY_TITLES: Record<RootOfferCategory, string> = {
  sim: 'SIM Offers',
  data: 'Data Offers',
};

export function offersForRootCategory(
  root: RootOfferCategory,
  offers: CatalogOffer[] = MOCK_OFFERS,
): CatalogOffer[] {
  const approved = getApprovedOffers(offers);
  if (root === 'data') return approved.filter((o) => o.kind === 'data');
  return approved.filter((o) => o.kind === 'physical-sim' || o.kind === 'esim');
}

/** Featured offers per root category on Shop landing (DNO portal config) */
export const FEATURED_OFFER_IDS_BY_ROOT: Record<RootOfferCategory, readonly string[]> = {
  sim: ['o1', 'o2', 'o3'],
  data: ['o4', 'o5'],
};

export function getFeaturedOffersForRoot(
  root: RootOfferCategory,
  offers: CatalogOffer[] = MOCK_OFFERS,
): CatalogOffer[] {
  return FEATURED_OFFER_IDS_BY_ROOT[root]
    .map((id) => offers.find((o) => o.id === id))
    .filter((o): o is CatalogOffer => o != null && o.approvedAndRunning);
}

/** Level 1 children under the current offer category on the DNO portal */
export const LEVEL1_CATEGORIES: Level1Category[] = [
  { id: 'prepaid', name: 'Prepaid' },
  { id: 'postpaid', name: 'Postpaid' },
  { id: 'data', name: 'Data' },
  { id: 'roaming', name: 'Roaming' }, // no qualifying offers → hidden
  { id: 'family', name: 'Family' }, // has offers; not in remote config quick links
];

/**
 * Remote-config quick-link array for the current offer category.
 * Includes: qualifying names, a non-match, a duplicate, and All.
 */
export const REMOTE_CONFIG_QUICK_LINKS: string[] = [
  'Prepaid',
  'NotACategory',
  'Data',
  'Roaming',
  'Prepaid',
  'All',
];

export const MOCK_OFFERS: CatalogOffer[] = [
  {
    id: 'o1',
    name: 'Starter Physical SIM',
    imageUrl: 'https://placehold.co/320x180/1f6feb/ffffff?text=Starter',
    startTime: '2026-08-01T00:00:00Z',
    endTime: '2026-12-31T23:59:59Z',
    price: 15,
    sortPriority: 10,
    kind: 'physical-sim',
    allowAddToCart: true,
    offerKindLabel: 'Physical SIM',
    categoryId: 'prepaid',
    approvedAndRunning: true,
  },
  {
    id: 'o2',
    name: 'Unlimited Talk eSIM',
    imageUrl: 'https://placehold.co/320x180/238636/ffffff?text=Unlimited',
    startTime: '2026-08-10T00:00:00Z',
    endTime: '2027-01-31T23:59:59Z',
    price: 29.99,
    sortPriority: 5,
    kind: 'esim',
    allowAddToCart: true,
    offerKindLabel: 'eSIM',
    categoryId: 'prepaid',
    approvedAndRunning: true,
  },
  {
    id: 'o3',
    name: 'Postpaid Plus',
    imageUrl: 'https://placehold.co/320x180/8957e5/ffffff?text=Postpaid',
    startTime: '2026-07-15T00:00:00Z',
    endTime: '2026-11-30T23:59:59Z',
    price: 45,
    sortPriority: 5,
    kind: 'physical-sim',
    allowAddToCart: true,
    offerKindLabel: 'Physical SIM',
    categoryId: 'postpaid',
    approvedAndRunning: true,
  },
  {
    id: 'o4',
    name: 'Data Boost 20GB',
    imageUrl: 'https://placehold.co/320x180/d29922/ffffff?text=Data+20GB',
    startTime: '2026-08-20T00:00:00Z',
    endTime: '2026-10-31T23:59:59Z',
    price: 12.5,
    sortPriority: 20,
    kind: 'data',
    allowAddToCart: true,
    offerKindLabel: 'Data',
    categoryId: 'data',
    approvedAndRunning: true,
  },
  {
    id: 'o5',
    name: 'Data Night Owl',
    startTime: '2026-08-25T00:00:00Z',
    endTime: '2026-09-30T23:59:59Z',
    price: 8,
    sortPriority: null,
    kind: 'esim',
    allowAddToCart: true,
    offerKindLabel: 'eSIM',
    categoryId: 'data',
    approvedAndRunning: true,
  },
  {
    id: 'o6',
    name: 'Family Share Physical',
    imageUrl: 'https://placehold.co/320x180/da3633/ffffff?text=Family',
    startTime: '2026-06-01T00:00:00Z',
    endTime: '2026-12-01T23:59:59Z',
    price: 55,
    sortPriority: 15,
    kind: 'physical-sim',
    allowAddToCart: true,
    offerKindLabel: 'Physical SIM',
    categoryId: 'family',
    approvedAndRunning: true,
  },
  {
    id: 'o7',
    imageUrl: 'https://placehold.co/320x180/30363d/ffffff?text=No+name',
    startTime: '2026-08-12T00:00:00Z',
    endTime: '2026-09-12T23:59:59Z',
    price: 9.99,
    sortPriority: 30,
    kind: 'physical-sim',
    allowAddToCart: true,
    offerKindLabel: 'Physical SIM',
    categoryId: 'prepaid',
    approvedAndRunning: true,
  },
  {
    id: 'o8',
    name: 'Draft Roaming (hidden)',
    imageUrl: 'https://placehold.co/320x180/484f58/ffffff?text=Draft',
    startTime: '2026-08-01T00:00:00Z',
    endTime: '2026-12-31T23:59:59Z',
    price: 99,
    sortPriority: 1,
    kind: 'physical-sim',
    allowAddToCart: true,
    offerKindLabel: 'Physical SIM',
    categoryId: 'roaming',
    approvedAndRunning: false,
  },
];

export function getApprovedOffers(offers: CatalogOffer[] = MOCK_OFFERS): CatalogOffer[] {
  return offers.filter((o) => o.approvedAndRunning);
}

export function categoryHasApprovedOffers(
  categoryId: string,
  offers: CatalogOffer[] = MOCK_OFFERS,
): boolean {
  return getApprovedOffers(offers).some((o) => o.categoryId === categoryId);
}

export function getFilterCategories(
  categories: Level1Category[] = LEVEL1_CATEGORIES,
  offers: CatalogOffer[] = MOCK_OFFERS,
): Level1Category[] {
  return categories.filter((c) => categoryHasApprovedOffers(c.id, offers));
}

export function getDisplayedQuickLinks(
  remoteConfig: string[] | null,
  categories: Level1Category[] = LEVEL1_CATEGORIES,
  offers: CatalogOffer[] = MOCK_OFFERS,
): string[] {
  const links: string[] = ['All'];
  if (!remoteConfig || remoteConfig.length === 0) return links;

  const level1Names = new Set(categories.map((c) => c.name));
  const nameToId = new Map(categories.map((c) => [c.name, c.id]));

  for (const name of remoteConfig) {
    if (name === 'All') continue;
    if (!level1Names.has(name)) continue;
    const id = nameToId.get(name);
    if (!id || !categoryHasApprovedOffers(id, offers)) continue;
    links.push(name);
  }
  return links;
}

export type SortOption = 'default' | 'price-high' | 'price-low' | 'newest';

function startMs(o: CatalogOffer): number {
  return o.startTime ? Date.parse(o.startTime) : 0;
}

function priorityValue(o: CatalogOffer): number {
  return o.sortPriority == null ? Number.MAX_SAFE_INTEGER : o.sortPriority;
}

export function sortOffers(offers: CatalogOffer[], sort: SortOption): CatalogOffer[] {
  const list = [...offers];
  if (sort === 'price-high') {
    return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  }
  if (sort === 'price-low') {
    return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  }
  if (sort === 'newest') {
    return list.sort((a, b) => startMs(b) - startMs(a));
  }
  return list.sort((a, b) => {
    const p = priorityValue(a) - priorityValue(b);
    if (p !== 0) return p;
    return startMs(b) - startMs(a);
  });
}

export function filterOffersByCategory(
  offers: CatalogOffer[],
  categoryName: string | null,
  categories: Level1Category[] = LEVEL1_CATEGORIES,
): CatalogOffer[] {
  const approved = getApprovedOffers(offers);
  if (!categoryName) return approved;
  const cat = categories.find((c) => c.name === categoryName);
  if (!cat) return approved;
  return approved.filter((o) => o.categoryId === cat.id);
}

export function formatOfferDates(start?: string, end?: string): string | null {
  if (!start && !end) return null;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  if (start && end) return `${fmt(start)} – ${fmt(end)}`;
  if (start) return `From ${fmt(start)}`;
  return `Until ${fmt(end!)}`;
}

export function searchOffersByName(
  offers: CatalogOffer[],
  query: string,
): CatalogOffer[] {
  const approved = getApprovedOffers(offers);
  const q = query.trim().toLowerCase();
  if (!q) return approved;
  return approved.filter((o) => o.name != null && o.name.toLowerCase().includes(q));
}

export function formatPrice(price?: number): string | null {
  if (price == null) return null;
  return `$${price.toFixed(2)}`;
}
