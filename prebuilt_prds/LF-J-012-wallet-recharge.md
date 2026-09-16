# PRD: LF-J-012 - Wallet Recharge

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value            |
| -------------------- | ---------------- |
| Feature              | Wallet Recharge  |
| Channels             | App + Web        |
| Status (owning team) | PM — drafting    |
| Owner (PM)           | Nan Dong         |
| Contributors         | Nan Dong         |
| Created              | 2026-09-08       |
| Last updated         | 2026-09-10        |
| Figma                | N / A            |
| Jira                 | —                |
| API Spec             | N / A            |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Wallet Recharge journey is where the logged-in user chooses a recharge amount from Wallet, pays in Payment, and sees the recharge status.

### b. Goals

- Recharge their wallet

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  startDash([User selects Wallet on Dashboard LF-S-033]) --> wallet[Wallet LF-S-050]
  wallet -->|Recharge| recharge[Recharge LF-S-051]
  recharge -->|Recharge| payment[Payment LF-J-014]
  payment -->|Pay| status[Recharge Status LF-S-052]
  status -->|Succeeded — Back to Home| dashHome([Dashboard LF-S-033])
  status -->|Failed — Try again| recharge
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
