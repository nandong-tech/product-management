# PRD: LF-S-063 - Choose SIM type

## Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## Header

| Field | Value |
| --- | --- |
| Feature | Choose SIM type |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-09-28 |
| Last updated | 2026-09-30 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | N / A |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-063 - Choose SIM type](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7875428432/PRD+LF-S-063+-+Choose+SIM+type) |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The choose SIM type screen is where the user chooses an eSIM or a pSIM for a SIM swap, chooses an eSIM or a pSIM to purchase for a port-in, or continues with a pSIM they already purchased.

### Goals

- Choose an eSIM or a pSIM
- Continue with a pSIM they already purchased

### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The choose SIM type screen is shown | The user views the screen | - Page title "Choose SIM type" is shown<br>- **eSIM** is shown and can be selected<br>- **pSIM** is shown and can be selected<br>- **Already purchased a pSIM?** is shown below those options and can be clicked |
| AC-02 | The choose SIM type screen is shown and this is SIM swap | The user selects **eSIM** | - eSIM is the chosen SIM type for this SIM swap<br>- The user is taken to eSIM Replacement (LF-J-023) |
| AC-03 | The choose SIM type screen is shown and the user is in the port-in journey | The user selects **eSIM** | - eSIM is the chosen SIM type for this port-in<br>- The user is taken to eSIM port-in (LF-J-029) |
| AC-04 | The choose SIM type screen is shown and this is SIM swap | The user selects **pSIM** | - pSIM is the chosen SIM type for this SIM swap<br>- The user is taken to Purchase replacement pSIM (LF-J-020) |
| AC-05 | The choose SIM type screen is shown and the user is in the port-in journey | The user selects **pSIM** | - pSIM is the chosen SIM type for this port-in<br>- The user is taken to Purchase port-in pSIM (LF-J-026) |
| AC-06 | The choose SIM type screen is shown and this is SIM swap | The user clicks **Already purchased a pSIM?** | The user is taken to Process pSIM replacement (LF-J-021) |
| AC-07 | The choose SIM type screen is shown and the user is in the port-in journey | The user clicks **Already purchased a pSIM?** | The user is taken to Process pSIM port-in (LF-J-027) |

## Edge cases & error cases

N / A

## Data Mapping

N / A
