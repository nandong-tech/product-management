import { useMemo, useState } from 'react';

export type BalanceType = 'data' | 'call' | 'sms';
export type BalanceZone = 'local' | 'roaming';
export type BalanceScope = 'shared' | 'own';

export type BalanceBucket = {
  offerName: string | null;
  remaining: string;
  quota: string;
};

type ServiceBalance = {
  type: BalanceType;
  label: string;
  aggregated: string;
  buckets: BalanceBucket[];
};

type Props = {
  firstName: string;
  mobileNumber: string;
  hasFamilyPlan?: boolean;
  balanceLoadFailed?: boolean;
  onBuyAddOn: () => void;
  onTransferBalance: () => void;
  onReferral: () => void;
  onUsageHistory: () => void;
  onMyVouchers: () => void;
  onLineManagement: () => void;
  onInbox: () => void;
  onWallet: () => void;
};

const OWN_BALANCES: Record<BalanceZone, ServiceBalance[]> = {
  local: [
    {
      type: 'data',
      label: 'Data',
      aggregated: '15 GB',
      buckets: [
        { offerName: 'Monthly Data Pack', remaining: '10 GB', quota: '10 GB' },
        { offerName: 'Weekend Data', remaining: '5 GB', quota: '5 GB' },
      ],
    },
    {
      type: 'call',
      label: 'Call',
      aggregated: '200 min',
      buckets: [
        { offerName: 'Anytime Calls', remaining: '150 min', quota: '200 min' },
        { offerName: null, remaining: '50 min', quota: '50 min' },
      ],
    },
    {
      type: 'sms',
      label: 'SMS',
      aggregated: '0',
      buckets: [],
    },
  ],
  roaming: [
    {
      type: 'data',
      label: 'Data',
      aggregated: '2 GB',
      buckets: [{ offerName: 'Roaming Data Pack', remaining: '2 GB', quota: '3 GB' }],
    },
    {
      type: 'call',
      label: 'Call',
      aggregated: '30 min',
      buckets: [{ offerName: 'Roaming Calls', remaining: '30 min', quota: '60 min' }],
    },
    {
      type: 'sms',
      label: 'SMS',
      aggregated: '0',
      buckets: [],
    },
  ],
};

const SHARED_BALANCES: Record<BalanceZone, ServiceBalance[]> = {
  local: [
    {
      type: 'data',
      label: 'Data',
      aggregated: '40 GB',
      buckets: [{ offerName: 'Family Data', remaining: '40 GB', quota: '50 GB' }],
    },
    {
      type: 'call',
      label: 'Call',
      aggregated: '500 min',
      buckets: [{ offerName: 'Family Calls', remaining: '500 min', quota: '800 min' }],
    },
    {
      type: 'sms',
      label: 'SMS',
      aggregated: '200',
      buckets: [{ offerName: 'Family SMS', remaining: '200', quota: '300' }],
    },
  ],
  roaming: [
    {
      type: 'data',
      label: 'Data',
      aggregated: '5 GB',
      buckets: [{ offerName: 'Family Roaming Data', remaining: '5 GB', quota: '8 GB' }],
    },
    {
      type: 'call',
      label: 'Call',
      aggregated: '60 min',
      buckets: [{ offerName: 'Family Roaming Calls', remaining: '60 min', quota: '100 min' }],
    },
    {
      type: 'sms',
      label: 'SMS',
      aggregated: '0',
      buckets: [],
    },
  ],
};

const ENTRY_POINTS = [
  { id: 'referral', label: 'Referral' },
  { id: 'usage-history', label: 'Usage history' },
  { id: 'my-vouchers', label: 'My Vouchers' },
  { id: 'line-management', label: 'Line management' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'wallet', label: 'Wallet' },
] as const;

function applyLoadState(services: ServiceBalance[], failed: boolean): ServiceBalance[] {
  return services.map((service) => ({
    ...service,
    aggregated: failed ? '--' : service.aggregated,
    buckets: service.buckets.map((bucket) => ({
      ...bucket,
      remaining: failed ? '--' : bucket.remaining,
      quota: failed ? '--' : bucket.quota,
    })),
  }));
}

/** Dashboard (LF-S-033) — no page template. */
export default function DashboardHome({
  firstName,
  mobileNumber,
  hasFamilyPlan = false,
  balanceLoadFailed = false,
  onBuyAddOn,
  onTransferBalance,
  onReferral,
  onUsageHistory,
  onMyVouchers,
  onLineManagement,
  onInbox,
  onWallet,
}: Props) {
  const [zone, setZone] = useState<BalanceZone>('local');
  const [open, setOpen] = useState<{ scope: BalanceScope; type: BalanceType } | null>(null);

  const ownBalances = useMemo(
    () => applyLoadState(OWN_BALANCES[zone], balanceLoadFailed),
    [zone, balanceLoadFailed],
  );
  const sharedBalances = useMemo(
    () => applyLoadState(SHARED_BALANCES[zone], balanceLoadFailed),
    [zone, balanceLoadFailed],
  );

  const openList = open?.scope === 'shared' ? sharedBalances : ownBalances;
  const openService = open ? (openList.find((s) => s.type === open.type) ?? null) : null;

  const handleViewDetails = (scope: BalanceScope, service: ServiceBalance) => {
    if (service.buckets.length === 0) return;
    setOpen({ scope, type: service.type });
  };

  const handleZone = (next: BalanceZone) => {
    setZone(next);
    setOpen(null);
  };

  const handleEntry = (id: (typeof ENTRY_POINTS)[number]['id']) => {
    switch (id) {
      case 'referral':
        onReferral();
        break;
      case 'usage-history':
        onUsageHistory();
        break;
      case 'my-vouchers':
        onMyVouchers();
        break;
      case 'line-management':
        onLineManagement();
        break;
      case 'inbox':
        onInbox();
        break;
      case 'wallet':
        onWallet();
        break;
    }
  };

  return (
    <div className="dashboard-home">
      <section className="dashboard-identity" aria-label="First name and mobile number">
        <p className="dashboard-first-name">{firstName}</p>
        <p className="dashboard-msisdn">{mobileNumber}</p>
      </section>

      <section className="dashboard-balances" aria-label="Service balances">
        <div className="dashboard-zone" role="tablist" aria-label="Local or Roaming">
          <button
            type="button"
            role="tab"
            aria-selected={zone === 'local'}
            className={zone === 'local' ? 'dashboard-zone-btn selected' : 'dashboard-zone-btn'}
            onClick={() => handleZone('local')}
          >
            Local
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={zone === 'roaming'}
            className={zone === 'roaming' ? 'dashboard-zone-btn selected' : 'dashboard-zone-btn'}
            onClick={() => handleZone('roaming')}
          >
            Roaming
          </button>
        </div>

        <div className="dashboard-balance-actions">
          <button type="button" className="dashboard-action-icon" onClick={onBuyAddOn}>
            <BuyAddOnsIcon />
            Buy add-ons
          </button>
          <button type="button" className="dashboard-action-icon" onClick={onTransferBalance}>
            <TransferBalanceIcon />
            Transfer balance
          </button>
        </div>

        {hasFamilyPlan && (
          <div className="dashboard-balance-group">
            <h2 className="dashboard-balance-heading">Shared</h2>
            {sharedBalances.map((service) => (
              <BalanceRow
                key={`shared-${service.type}`}
                service={service}
                onViewDetails={() => handleViewDetails('shared', service)}
              />
            ))}
          </div>
        )}

        <div className="dashboard-balance-group">
          {ownBalances.map((service) => (
            <BalanceRow
              key={`own-${service.type}`}
              service={service}
              onViewDetails={() => handleViewDetails('own', service)}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-entries" aria-label="Entry points">
        {ENTRY_POINTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="dashboard-entry"
            onClick={() => handleEntry(item.id)}
          >
            {item.label}
          </button>
        ))}
      </section>

      {openService && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="balance-popup-title">
          <div className="modal dashboard-balance-popup">
            <h2 id="balance-popup-title">Detailed {openService.label} balances</h2>
            <ul className="dashboard-bucket-list">
              {openService.buckets.map((bucket, index) => (
                <li key={`${open?.scope}-${openService.type}-${index}`} className="dashboard-bucket">
                  {bucket.offerName != null && bucket.offerName !== '' && (
                    <div className="dashboard-bucket-name">{bucket.offerName}</div>
                  )}
                  <div>Remaining: {bucket.remaining}</div>
                  <div>Original quota: {bucket.quota}</div>
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TransferBalanceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="currentColor"
        d="M7 8h11l-3-3 1.4-1.4L22.8 9 16.4 15.4 15 14l3-3H7V8zm10 8H6l3 3-1.4 1.4L1.2 15 7.6 8.6 9 10l-3 3h11v3z"
      />
    </svg>
  );
}

function BuyAddOnsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="currentColor"
        d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"
      />
    </svg>
  );
}

function BalanceRow({
  service,
  onViewDetails,
}: {
  service: ServiceBalance;
  onViewDetails: () => void;
}) {
  return (
    <div className="dashboard-balance-row">
      <div className="dashboard-balance-copy">
        <span className="dashboard-balance-label">{service.label}</span>
        <span className="dashboard-balance-value">{service.aggregated}</span>
      </div>
      <button type="button" className="btn-link" onClick={onViewDetails}>
        View detailed {service.label} balances
      </button>
    </div>
  );
}
