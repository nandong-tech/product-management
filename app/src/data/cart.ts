import { MOCK_OFFERS, type CatalogOffer } from './offerList';

export const MAX_CART_QTY = 99;

export type CartItem = {
  offerId: string;
  quantity: number;
  selected: boolean;
};

export const EMPTY_CART_ITEMS: CartItem[] = [];

export function addOfferToCart(
  items: CartItem[],
  offerId: string,
  quantity: number,
): CartItem[] {
  const offer = getOfferForCart(offerId);
  const isEsim = offer?.kind === 'esim';
  const qty = isEsim ? 1 : Math.min(MAX_CART_QTY, Math.max(1, quantity));
  const existing = items.find((item) => item.offerId === offerId);
  if (existing) {
    if (isEsim) return items;
    return items.map((item) =>
      item.offerId === offerId
        ? { ...item, quantity: Math.min(MAX_CART_QTY, item.quantity + qty) }
        : item,
    );
  }
  return [...items, { offerId, quantity: qty, selected: true }];
}

export function getOfferForCart(offerId: string): CatalogOffer | undefined {
  const offer = MOCK_OFFERS.find((o) => o.id === offerId);
  if (!offer || !offer.allowAddToCart) return undefined;
  return offer;
}

export function parseCartQuantity(input: string): number | null {
  const s = input.trim();
  if (!/^[0-9]+$/.test(s)) return null;
  const n = Number.parseInt(s, 10);
  if (!Number.isFinite(n) || n < 1 || n > MAX_CART_QTY) return null;
  return n;
}

export function cartQuantityFieldError(input: string): string | null {
  const s = input.trim();
  if (!s) return 'This is required';
  if (!parseCartQuantity(s)) return `Quantity must be between 1 and ${MAX_CART_QTY}.`;
  return null;
}

export function quantityForTotal(input: string, fallback: number): number {
  const s = input.trim();
  if (!/^[0-9]+$/.test(s)) return fallback;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function checkoutSelectionError(
  lines: { item: CartItem; offer: CatalogOffer }[],
): string | null {
  const selected = lines.filter(({ item }) => item.selected);
  const hasEsim = selected.some(({ offer }) => offer.kind === 'esim');
  const hasPhysical = selected.some(({ offer }) => offer.kind === 'physical-sim');
  const hasData = selected.some(({ offer }) => offer.kind === 'data');
  const esimCount = selected.filter(({ offer }) => offer.kind === 'esim').length;
  const esimQty = selected
    .filter(({ offer }) => offer.kind === 'esim')
    .reduce((sum, { item }) => sum + item.quantity, 0);

  if (hasData && (hasPhysical || hasEsim)) {
    return 'Data offers cannot be checked out with SIM offers.';
  }

  if (hasEsim && (esimCount !== 1 || esimQty !== 1 || hasPhysical)) {
    return 'You can check out only one eSIM, with no other offers.';
  }

  if (hasPhysical && selected.some(({ offer }) => offer.kind !== 'physical-sim')) {
    return 'Physical SIM cannot be checked out with other offers.';
  }

  return null;
}
