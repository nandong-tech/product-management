import { useEffect, useMemo, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import {
  MAX_CART_QTY,
  cartQuantityFieldError,
  getOfferForCart,
  parseCartQuantity,
  quantityForTotal,
  checkoutSelectionError,
  type CartItem,
} from '../data/cart';
import { formatPrice, type CatalogOffer } from '../data/offerList';

type Props = {
  items: CartItem[];
  onItemsChange: (items: CartItem[]) => void;
  onBack: () => void;
  onGoToShop: () => void;
  onCheckout: (lines: { offer: CatalogOffer; quantity: number }[]) => void;
  isLoggedIn?: boolean;
  onLogin?: () => void;
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/320x180/30363d/8b949e?text=Placeholder';

type ConfirmKind = 'delete' | 'clear' | null;

export default function ShoppingCart({
  items,
  onItemsChange,
  onBack,
  onGoToShop,
  onCheckout,
  isLoggedIn = false,
  onLogin,
}: Props) {
  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const offer = getOfferForCart(item.offerId);
        return offer ? [{ item, offer }] : [];
      }),
    [items],
  );

  const [qtyInputs, setQtyInputs] = useState<Record<string, string>>({});
  const [qtyErrors, setQtyErrors] = useState<Record<string, string | null>>({});
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [deleteOfferId, setDeleteOfferId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    setQtyInputs((prev) => {
      const next: Record<string, string> = {};
      let changed = false;
      for (const { item } of lines) {
        if (item.offerId in prev) {
          next[item.offerId] = prev[item.offerId];
        } else {
          next[item.offerId] = String(item.quantity);
          changed = true;
        }
      }
      for (const key of Object.keys(prev)) {
        if (!(key in next)) changed = true;
      }
      return changed || Object.keys(prev).length !== Object.keys(next).length ? next : prev;
    });
  }, [lines]);

  const allSelected = lines.length > 0 && lines.every(({ item }) => item.selected);

  const total = lines.reduce((sum, { item, offer }) => {
    if (!item.selected) return sum;
    const qty =
      offer.kind === 'esim'
        ? 1
        : quantityForTotal(qtyInputs[item.offerId] ?? String(item.quantity), item.quantity);
    return sum + (offer.price ?? 0) * qty;
  }, 0);

  const updateItem = (offerId: string, patch: Partial<CartItem>) => {
    onItemsChange(items.map((item) => (item.offerId === offerId ? { ...item, ...patch } : item)));
  };

  const removeItem = (offerId: string) => {
    onItemsChange(items.filter((item) => item.offerId !== offerId));
    setQtyInputs((prev) => {
      const next = { ...prev };
      delete next[offerId];
      return next;
    });
    setQtyErrors((prev) => {
      const next = { ...prev };
      delete next[offerId];
      return next;
    });
  };

  const setQtyInput = (offerId: string, value: string, isEsim: boolean) => {
    if (isEsim) return;
    const digits = value.replace(/[^0-9]/g, '');
    setQtyInputs((prev) => ({ ...prev, [offerId]: digits }));
    setQtyErrors((prev) => ({ ...prev, [offerId]: null }));
  };

  const commitQty = (offerId: string, item: CartItem, isEsim: boolean) => {
    if (isEsim) {
      updateItem(offerId, { quantity: 1 });
      setQtyInputs((prev) => ({ ...prev, [offerId]: '1' }));
      setQtyErrors((prev) => ({ ...prev, [offerId]: null }));
      return;
    }
    const input = qtyInputs[offerId] ?? String(item.quantity);
    const error = cartQuantityFieldError(input);
    setQtyErrors((prev) => ({ ...prev, [offerId]: error }));
    const parsed = parseCartQuantity(input);
    if (parsed) updateItem(offerId, { quantity: parsed });
  };

  const onDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      setDeleteOfferId(item.offerId);
      setConfirm('delete');
      return;
    }
    const next = item.quantity - 1;
    updateItem(item.offerId, { quantity: next });
    setQtyInputs((prev) => ({ ...prev, [item.offerId]: String(next) }));
    setQtyErrors((prev) => ({ ...prev, [item.offerId]: null }));
  };

  const onIncrease = (item: CartItem, isEsim: boolean) => {
    if (isEsim) return;
    if (item.quantity >= MAX_CART_QTY) return;
    const next = item.quantity + 1;
    updateItem(item.offerId, { quantity: next });
    setQtyInputs((prev) => ({ ...prev, [item.offerId]: String(next) }));
    setQtyErrors((prev) => ({ ...prev, [item.offerId]: null }));
  };

  const onSelectAll = () => {
    setCheckoutError(null);
    const nextSelected = !allSelected;
    onItemsChange(items.map((item) => ({ ...item, selected: nextSelected })));
  };

  const onCheckoutClick = () => {
    const selected = lines.filter(({ item }) => item.selected);
    if (selected.length === 0) return;

    const mixError = checkoutSelectionError(
      lines.map(({ item, offer }) => ({
        item: {
          ...item,
          quantity:
            offer.kind === 'esim'
              ? 1
              : parseCartQuantity(qtyInputs[item.offerId] ?? '') ?? item.quantity,
        },
        offer,
      })),
    );
    if (mixError) {
      setCheckoutError(mixError);
      return;
    }
    setCheckoutError(null);

    const dataOnly = selected.every(({ offer }) => offer.kind === 'data');
    if (dataOnly && !isLoggedIn) {
      onLogin?.();
      return;
    }

    let blocked = false;
    const nextErrors: Record<string, string | null> = { ...qtyErrors };
    for (const { item, offer } of selected) {
      if (offer.kind === 'esim') continue;
      const input = qtyInputs[item.offerId] ?? String(item.quantity);
      const error = cartQuantityFieldError(input);
      nextErrors[item.offerId] = error;
      if (error) blocked = true;
    }
    setQtyErrors(nextErrors);
    if (blocked) return;

    onCheckout(
      selected.map(({ item, offer }) => ({
        offer,
        quantity:
          offer.kind === 'esim'
            ? 1
            : parseCartQuantity(qtyInputs[item.offerId] ?? String(item.quantity)) ?? item.quantity,
      })),
    );
  };

  const closeConfirm = () => {
    setConfirm(null);
    setDeleteOfferId(null);
  };

  if (lines.length === 0) {
    return (
      <BasicPageTemplate title="Shopping Cart" showBack onBack={onBack}>
        <div className="shopping-cart shopping-cart-empty">
          <p className="shopping-cart-empty-message">There is no items in your cart.</p>
          <button type="button" className="btn btn-primary" onClick={onGoToShop}>
            Go to shop
          </button>
        </div>
      </BasicPageTemplate>
    );
  }

  return (
    <BasicPageTemplate title="Shopping Cart" showBack onBack={onBack}>
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <h2 className="shopping-cart-your-items">
            Your Items <span className="shopping-cart-count">{lines.length}</span>
          </h2>
          <button type="button" className="btn btn-secondary" onClick={() => setConfirm('clear')}>
            Clear Cart
          </button>
        </div>

        <ul className="shopping-cart-list">
          {lines.map(({ item, offer }) => {
            const price = formatPrice(offer.price ?? undefined);
            const isEsim = offer.kind === 'esim';
            const qtyValue = isEsim ? '1' : qtyInputs[item.offerId] ?? String(item.quantity);
            const qtyError = qtyErrors[item.offerId];
            return (
              <li key={item.offerId} className="shopping-cart-item">
                <label className="shopping-cart-select">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => {
                      setCheckoutError(null);
                      updateItem(item.offerId, { selected: !item.selected });
                    }}
                    aria-label="Select item"
                  />
                </label>
                <img
                  className="shopping-cart-image"
                  src={offer.imageUrl ?? PLACEHOLDER_IMAGE}
                  alt=""
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <div className="shopping-cart-item-body">
                  {offer.name ? <h3 className="shopping-cart-item-name">{offer.name}</h3> : null}
                  {price ? <p className="shopping-cart-item-price">{price}</p> : null}
                  <div className="offer-detail-qty-control">
                    <button
                      type="button"
                      className="offer-detail-qty-step"
                      onClick={() => onDecrease(item)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      className="offer-detail-qty-input"
                      value={qtyValue}
                      inputMode="numeric"
                      aria-label="Quantity"
                      readOnly={isEsim}
                      onChange={(e) => setQtyInput(item.offerId, e.target.value, isEsim)}
                      onBlur={() => commitQty(item.offerId, item, isEsim)}
                    />
                    <button
                      type="button"
                      className="offer-detail-qty-step"
                      onClick={() => onIncrease(item, isEsim)}
                      disabled={isEsim || item.quantity >= MAX_CART_QTY}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  {qtyError ? <div className="offer-detail-qty-error">{qtyError}</div> : null}
                </div>
              </li>
            );
          })}
        </ul>

        <label className="shopping-cart-select-all">
          <input type="checkbox" checked={allSelected} onChange={onSelectAll} />
          <span>Select All</span>
        </label>

        <div className="shopping-cart-footer">
          <p className="shopping-cart-total">Total {formatPrice(total) ?? '$0.00'}</p>
          {checkoutError ? (
            <p className="activation-field-error" role="alert">
              {checkoutError}
            </p>
          ) : null}
          <button type="button" className="btn btn-primary shopping-cart-checkout" onClick={onCheckoutClick}>
            Checkout
          </button>
        </div>
      </div>

      {confirm === 'delete' ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>Are you sure to delete this item from cart?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeConfirm}>
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (deleteOfferId) removeItem(deleteOfferId);
                  closeConfirm();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirm === 'clear' ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p>Are you sure to clear all the items in cart?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeConfirm}>
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onItemsChange([]);
                  closeConfirm();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </BasicPageTemplate>
  );
}
