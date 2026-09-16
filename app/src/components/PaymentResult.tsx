import { formatPrice, type CatalogOffer } from '../data/offerList';
import BasicPageTemplate from './BasicPageTemplate';

export type PaymentResultLine = {
  offer: CatalogOffer;
  quantity: number;
};

type Props = {
  lines: PaymentResultLine[];
  totalAmount: number;
  paymentMethod?: string;
  onBackToShop: () => void;
};

/** Payment result (LF-S-027) — successful purchase. */
export default function PaymentResult({
  lines,
  totalAmount,
  paymentMethod = 'Credit / Debit Card',
  onBackToShop,
}: Props) {
  const purchasedAt = new Date().toLocaleString();
  const transactionNumber = `TXN-${Date.now().toString().slice(-8)}`;

  return (
    <BasicPageTemplate title="" showBack={false}>
      <div className="payment-result">
        <h1 className="payment-result-heading">Successful Purchase!</h1>
        <p className="page-body-text">We sent an email with the confirmation of your purchase.</p>

        <section className="payment-result-summary" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title" className="shop-landing-heading">
            Order summary
          </h2>
          <p className="payment-result-meta">{purchasedAt}</p>
          <ul className="payment-result-lines">
            {lines.map(({ offer, quantity }) => (
              <li key={offer.id}>
                <span>{offer.name ?? 'Offer'}</span>
                <span>× {quantity}</span>
              </li>
            ))}
          </ul>
          <p className="payment-result-meta">Transaction {transactionNumber}</p>
          <p className="payment-result-total">
            Total {formatPrice(totalAmount) ?? '$0.00'}
          </p>
          <p className="payment-result-meta">Payment method {paymentMethod}</p>
        </section>

        <button type="button" className="btn btn-primary btn-lg" onClick={onBackToShop}>
          Back to Shop
        </button>
      </div>
    </BasicPageTemplate>
  );
}
