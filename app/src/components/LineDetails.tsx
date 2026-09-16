import { useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import type { BalanceType, BalanceZone, ManagedLine, UsageKind } from '../data/lines';
import { formatMsisdn } from '../data/lines';

type CollapsibleSection = 'plans' | 'balances' | 'usage';

type Props = {
  line: ManagedLine;
  balanceLoadFailed?: boolean;
  onBack: () => void;
  onPurchaseAddOn: () => void;
  onChangeBasePlan: () => void;
};

const COLLAPSIBLE: { id: CollapsibleSection; title: string }[] = [
  { id: 'plans', title: 'Plans' },
  { id: 'balances', title: 'Balances' },
  { id: 'usage', title: 'Usage History' },
];

const USAGE_EMPTY: Record<UsageKind, string> = {
  data: 'No data usage found.',
  call: 'No call usage found.',
  sms: 'No SMS usage found.',
};

function formatUsage(kind: UsageKind, amount: number) {
  if (kind === 'data') return `${amount.toFixed(2)} GB used`;
  if (kind === 'call') return `${amount} MIN used`;
  return `${amount} SMS used`;
}

/** Line Details (LF-S-047) */
export default function LineDetails({
  line,
  balanceLoadFailed = false,
  onBack,
  onPurchaseAddOn,
  onChangeBasePlan,
}: Props) {
  const [open, setOpen] = useState<Record<CollapsibleSection, boolean>>({
    plans: false,
    balances: false,
    usage: false,
  });
  const [zone, setZone] = useState<BalanceZone>('local');
  const [usageTab, setUsageTab] = useState<UsageKind>('data');

  const toggle = (id: CollapsibleSection) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  const fullName = [line.firstName, line.lastName].filter(Boolean).join(' ');

  const usageRecords = line.usage
    .filter((row) => row.kind === usageTab)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const hasAnyUsage = line.usage.length > 0;
  const addOns = line.addOns;
  const namedAddOns = addOns.filter((name) => name != null && name !== '');

  return (
    <BasicPageTemplate title="Line Details" showBack onBack={onBack}>
      <div className="line-details">
        <div className="line-static">
          <div className="line-static-label">Name</div>
          {fullName ? <p className="line-acc-copy">{fullName}</p> : null}
        </div>
        <div className="line-static">
          <div className="line-static-label">Number</div>
          {line.mobileDigits ? <p className="line-acc-copy">{formatMsisdn(line.mobileDigits)}</p> : null}
        </div>
        {COLLAPSIBLE.map((section) => (
          <div key={section.id} className="line-acc">
            <button
              type="button"
              className="line-acc-toggle"
              aria-expanded={open[section.id]}
              onClick={() => toggle(section.id)}
            >
              <span>{section.title}</span>
              <span aria-hidden>{open[section.id] ? '−' : '+'}</span>
            </button>
            {open[section.id] && (
              <div className="line-acc-body">
                {section.id === 'plans' && (
                  <div className="line-plans">
                    <div className="line-plan-row">
                      <div>
                        <div className="line-plan-label">Base plan</div>
                        {line.basePlan ? <div className="line-plan-value">{line.basePlan}</div> : null}
                      </div>
                      {line.basePlan ? (
                        <button type="button" className="btn btn-secondary" onClick={onChangeBasePlan}>
                          Change plan
                        </button>
                      ) : null}
                    </div>
                    <div className="line-plan-row">
                      <div>
                        <div className="line-plan-label">Add-ons</div>
                        {namedAddOns.map((name, index) => (
                          <div key={`${name}-${index}`} className="line-plan-value">
                            {name}
                          </div>
                        ))}
                      </div>
                      <button type="button" className="btn btn-primary" onClick={onPurchaseAddOn}>
                        Buy add-ons
                      </button>
                    </div>
                  </div>
                )}
                {section.id === 'balances' && (
                  <div>
                    <div className="dashboard-zone" role="tablist" aria-label="Local or Roaming">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={zone === 'local'}
                        className={zone === 'local' ? 'dashboard-zone-btn selected' : 'dashboard-zone-btn'}
                        onClick={() => setZone('local')}
                      >
                        Local
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={zone === 'roaming'}
                        className={zone === 'roaming' ? 'dashboard-zone-btn selected' : 'dashboard-zone-btn'}
                        onClick={() => setZone('roaming')}
                      >
                        Roaming
                      </button>
                    </div>
                    {line.balances[zone].map((service) => (
                      <BalanceTypeBlock
                        key={service.type}
                        label={service.label}
                        type={service.type}
                        buckets={service.buckets}
                        failed={balanceLoadFailed}
                      />
                    ))}
                  </div>
                )}
                {section.id === 'usage' && (
                  <div>
                    {!hasAnyUsage ? (
                      <p className="line-acc-copy">No usage history found.</p>
                    ) : (
                      <>
                        <div className="dashboard-zone" role="tablist" aria-label="Usage type">
                          {(['data', 'call', 'sms'] as const).map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              role="tab"
                              aria-selected={usageTab === tab}
                              className={
                                usageTab === tab ? 'dashboard-zone-btn selected' : 'dashboard-zone-btn'
                              }
                              onClick={() => setUsageTab(tab)}
                            >
                              {tab === 'data' ? 'Data' : tab === 'call' ? 'Call' : 'SMS'}
                            </button>
                          ))}
                        </div>
                        {usageRecords.length === 0 ? (
                          <p className="line-acc-copy">{USAGE_EMPTY[usageTab]}</p>
                        ) : (
                          <ul className="line-usage-list">
                            {usageRecords.map((row) => (
                              <li key={`${row.kind}-${row.date}-${row.amount}`} className="line-usage-item">
                                <span>{formatUsage(row.kind, row.amount)}</span>
                                <span>{row.date}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </BasicPageTemplate>
  );
}

function BalanceTypeBlock({
  label,
  type,
  buckets,
  failed,
}: {
  label: string;
  type: BalanceType;
  buckets: ManagedLine['balances']['local'][number]['buckets'];
  failed: boolean;
}) {
  return (
    <div className="line-balance-type">
      <h3 className="line-balance-type-title">{label}</h3>
      {buckets.length === 0 ? null : (
        <ul className="dashboard-bucket-list">
          {buckets.map((bucket, index) => (
            <li key={`${type}-${index}`} className="dashboard-bucket">
              {bucket.offerName ? <div className="dashboard-bucket-name">{bucket.offerName}</div> : null}
              <div>Remaining: {failed ? '--' : bucket.remaining}</div>
              <div>Original quota: {failed ? '--' : bucket.quota}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
