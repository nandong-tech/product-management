# PRD: LF-J-013 - Balance Transfer

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value             |
| -------------------- | ----------------- |
| Feature              | Balance Transfer  |
| Channels             | App + Web         |
| Status (owning team) | PM — drafting     |
| Owner (PM)           | Nan Dong          |
| Contributors         | Nan Dong          |
| Created              | 2026-09-07        |
| Last updated         | 2026-09-10         |
| Figma                | N / A             |
| Confluence           | [PRD: LF-J-013 - Balance Transfer](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791870029/PRD+LF-J-013+-+Balance+Transfer) |
| Jira                 | —                 |
| API Spec             | N / A             |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Balance Transfer journey is where the logged-in user chooses a line on Line Management, transfers remaining GB, calls, texts, or wallet balance to that line, and sees the transfer result.

### b. Goals

- Transfer remaining balances to a selected line

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  startDash([User selects Transfer balance on Dashboard LF-S-033]) --> list[Line Management LF-S-045]
  startWallet([User selects Transfer on Wallet LF-S-050]) --> list
  list -->|Selects a line when the invitation has been accepted| transfer[Balance Transfer LF-S-053]
  transfer -->|Confirm| result[Transfer Result LF-S-054]
  result -->|Back to Home| dashHome([Dashboard LF-S-033])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
