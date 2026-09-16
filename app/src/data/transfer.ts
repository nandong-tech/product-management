export type ServiceTransferUnit = 'gb' | 'calls' | 'texts';
export type CurrencyCode = 'USD' | 'CAD';
export type TransferUnit = ServiceTransferUnit | CurrencyCode;

export type OwnBalances = {
  gb: number;
  calls: number;
  texts: number;
};

export const DEFAULT_OWN_BALANCES: OwnBalances = {
  gb: 15,
  calls: 200,
  texts: 50,
};

/** Demo configured maximum that can be transferred in the configured period. */
export const TRANSFER_MAX: OwnBalances = {
  gb: 10,
  calls: 100,
  texts: 30,
};

export const TRANSFER_MAX_WALLET = 20;

export const TRANSFER_PERIOD_MS = 24 * 60 * 60 * 1000;
export const TRANSFER_PERIOD_LABEL = '24 hours';

export const TRANSFER_UNITS: { id: ServiceTransferUnit; label: string; unitWord: string }[] = [
  { id: 'gb', label: 'GB', unitWord: 'GB' },
  { id: 'calls', label: 'Calls', unitWord: 'calls' },
  { id: 'texts', label: 'Texts', unitWord: 'texts' },
];

export function isServiceUnit(unit: TransferUnit): unit is ServiceTransferUnit {
  return unit === 'gb' || unit === 'calls' || unit === 'texts';
}

export function unitWord(unit: TransferUnit) {
  if (!isServiceUnit(unit)) return unit;
  return TRANSFER_UNITS.find((item) => item.id === unit)?.unitWord ?? 'GB';
}

export function unitLabel(unit: TransferUnit) {
  if (!isServiceUnit(unit)) return unit;
  return TRANSFER_UNITS.find((item) => item.id === unit)?.label ?? 'GB';
}

export function formatAmount(amount: number, unit: TransferUnit) {
  if (!isServiceUnit(unit)) return `${amount} ${unit}`;
  if (unit === 'gb') return `${amount} GB`;
  if (unit === 'calls') return `${amount} Calls`;
  return `${amount} Texts`;
}

export function formatSharedDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatTime(date = new Date()) {
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export type TransferPeriodUsage = {
  startedAt: number;
  used: OwnBalances;
  walletUsed: number;
};

export function createTransferPeriod(now = Date.now()): TransferPeriodUsage {
  return { startedAt: now, used: { gb: 0, calls: 0, texts: 0 }, walletUsed: 0 };
}

export function activeTransferPeriod(period: TransferPeriodUsage, now = Date.now()): TransferPeriodUsage {
  if (now - period.startedAt >= TRANSFER_PERIOD_MS) {
    return createTransferPeriod(now);
  }
  return period;
}

export function remainingInPeriod(period: TransferPeriodUsage, unit: TransferUnit, now = Date.now()) {
  const active = activeTransferPeriod(period, now);
  if (!isServiceUnit(unit)) {
    return TRANSFER_MAX_WALLET - active.walletUsed;
  }
  return TRANSFER_MAX[unit] - active.used[unit];
}
