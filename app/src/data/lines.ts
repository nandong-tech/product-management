export const OWN_MOBILE_DIGITS = '09121234567';
export const MAX_OTHER_LINES = 5;
export const PENDING_MS = 24 * 60 * 60 * 1000;

/** Numbers that already belong to another account (demo). */
export const OTHER_ACCOUNT_NUMBERS = new Set(['5550109999']);

/** Operator-invalid numbers that still match the MSISDN length (demo). */
export const INVALID_OPERATOR_NUMBERS = new Set(['0000000000', '5550000000']);

export type BalanceZone = 'local' | 'roaming';
export type BalanceType = 'data' | 'call' | 'sms';

export type BalanceBucket = {
  offerName: string | null;
  remaining: string | null;
  quota: string | null;
};

export type LineBalanceType = {
  type: BalanceType;
  label: string;
  buckets: BalanceBucket[];
};

export type UsageKind = 'data' | 'call' | 'sms';

export type UsageRecord = {
  kind: UsageKind;
  amount: number;
  date: string;
};

export type ManagedLine = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  mobileDigits: string | null;
  invitationAccepted: boolean;
  invitedAt: number;
  isGroupAdmin: boolean;
  basePlan: string | null;
  addOns: (string | null)[];
  balances: Record<BalanceZone, LineBalanceType[]>;
  usage: UsageRecord[];
};

export function digitsOnly(value: string, max = 10) {
  return value.replace(/\D/g, '').slice(0, max);
}

/** Shared MSISDN display / entry format: xxx-xxx-xxxx */
export function formatMsisdn(raw: string) {
  const d = digitsOnly(raw);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isCompleteMsisdn(digits: string) {
  return digitsOnly(digits).length === 10;
}

export function isPendingActive(line: ManagedLine, now = Date.now()) {
  return !line.invitationAccepted && now - line.invitedAt < PENDING_MS;
}

export function isPendingExpired(line: ManagedLine, now = Date.now()) {
  return !line.invitationAccepted && now - line.invitedAt >= PENDING_MS;
}

export function visibleLines(lines: ManagedLine[], now = Date.now()) {
  return lines.filter((line) => line.invitationAccepted || isPendingActive(line, now));
}

export function displayName(line: ManagedLine) {
  return [line.firstName, line.lastName].filter(Boolean).join(' ');
}

function emptyBalances(): Record<BalanceZone, LineBalanceType[]> {
  const types: LineBalanceType[] = [
    { type: 'data', label: 'Data', buckets: [] },
    { type: 'call', label: 'Call', buckets: [] },
    { type: 'sms', label: 'SMS', buckets: [] },
  ];
  return { local: types.map((t) => ({ ...t, buckets: [] })), roaming: types.map((t) => ({ ...t, buckets: [] })) };
}

function jordanBalances(): Record<BalanceZone, LineBalanceType[]> {
  return {
    local: [
      {
        type: 'data',
        label: 'Data',
        buckets: [
          { offerName: 'Family Base Plan', remaining: '8 GB', quota: '10 GB' },
          { offerName: 'Weekend Data', remaining: '2 GB', quota: '5 GB' },
        ],
      },
      {
        type: 'call',
        label: 'Call',
        buckets: [{ offerName: 'Family Base Plan', remaining: '120 min', quota: '200 min' }],
      },
      { type: 'sms', label: 'SMS', buckets: [] },
    ],
    roaming: [
      {
        type: 'data',
        label: 'Data',
        buckets: [{ offerName: 'Roaming Data Pack', remaining: '1 GB', quota: '2 GB' }],
      },
      { type: 'call', label: 'Call', buckets: [] },
      { type: 'sms', label: 'SMS', buckets: [] },
    ],
  };
}

export function createInitialLines(now = Date.now()): ManagedLine[] {
  return [
    {
      id: 'line-jordan',
      firstName: 'Jordan',
      lastName: 'Lee',
      mobileDigits: '5550101001',
      invitationAccepted: true,
      invitedAt: now - 3 * PENDING_MS,
      isGroupAdmin: false,
      basePlan: 'Family Base Plan',
      addOns: ['Weekend Data', 'Roaming Data Pack'],
      balances: jordanBalances(),
      usage: [
        { kind: 'data', amount: 1.25, date: '2026-09-03' },
        { kind: 'data', amount: 0.4, date: '2026-09-01' },
        { kind: 'call', amount: 12, date: '2026-09-02' },
        { kind: 'sms', amount: 3, date: '2026-08-28' },
      ],
    },
    {
      id: 'line-sam',
      firstName: 'Sam',
      lastName: 'Kim',
      mobileDigits: '5550101002',
      invitationAccepted: false,
      invitedAt: now - 60 * 60 * 1000,
      isGroupAdmin: false,
      basePlan: null,
      addOns: [],
      balances: emptyBalances(),
      usage: [],
    },
    {
      id: 'line-casey',
      firstName: 'Casey',
      lastName: null,
      mobileDigits: '5550101003',
      invitationAccepted: true,
      invitedAt: now - 2 * PENDING_MS,
      isGroupAdmin: false,
      basePlan: 'Family Base Plan',
      addOns: [null, 'Night Owl Data'],
      balances: {
        local: [
          {
            type: 'data',
            label: 'Data',
            buckets: [
              { offerName: 'Family Base Plan', remaining: '4 GB', quota: '10 GB' },
              { offerName: null, remaining: '1 GB', quota: '2 GB' },
            ],
          },
          { type: 'call', label: 'Call', buckets: [] },
          { type: 'sms', label: 'SMS', buckets: [] },
        ],
        roaming: [
          { type: 'data', label: 'Data', buckets: [] },
          { type: 'call', label: 'Call', buckets: [] },
          { type: 'sms', label: 'SMS', buckets: [] },
        ],
      },
      usage: [{ kind: 'data', amount: 0.1, date: '2026-09-04' }],
    },
    {
      id: 'line-riley',
      firstName: 'Riley',
      lastName: 'Chen',
      mobileDigits: '5550101004',
      invitationAccepted: true,
      invitedAt: now - PENDING_MS,
      isGroupAdmin: false,
      basePlan: 'Family Base Plan',
      addOns: [],
      balances: jordanBalances(),
      usage: [],
    },
  ];
}

export function createMemberLines(now = Date.now()): ManagedLine[] {
  const morgan: ManagedLine = {
    id: 'line-morgan-admin',
    firstName: 'Morgan',
    lastName: 'Patel',
    mobileDigits: '5550101005',
    invitationAccepted: true,
    invitedAt: now - 10 * PENDING_MS,
    isGroupAdmin: true,
    basePlan: 'Family Base Plan',
    addOns: ['Family Data Boost'],
    balances: jordanBalances(),
    usage: [{ kind: 'call', amount: 5, date: '2026-09-04' }],
  };
  return [morgan, ...createInitialLines(now).map((line) => ({ ...line, isGroupAdmin: false }))];
}

export function newPendingLine(mobileDigits: string, now = Date.now()): ManagedLine {
  return {
    id: `line-${mobileDigits}-${now}`,
    firstName: 'Invited',
    lastName: 'User',
    mobileDigits,
    invitationAccepted: false,
    invitedAt: now,
    isGroupAdmin: false,
    basePlan: null,
    addOns: [],
    balances: emptyBalances(),
    usage: [],
  };
}
