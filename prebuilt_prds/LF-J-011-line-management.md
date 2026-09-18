# PRD: LF-J-011 - Line Management

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value            |
| -------------------- | ---------------- |
| Feature              | Line Management  |
| Channels             | App + Web        |
| Status (owning team) | PM — drafting    |
| Owner (PM)           | Nan Dong         |
| Contributors         | Nan Dong         |
| Created              | 2026-09-04       |
| Last updated         | 2026-09-10        |
| Figma                | N / A            |
| Confluence           | [PRD: LF-J-011 - Line Management](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791870008/PRD+LF-J-011+-+Line+Management) |
| Jira                 | —                |
| API Spec             | N / A            |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Line Management journey is where the logged-in user reviews their lines and adds a line. The group admin reviews a selected line when the invitation has been accepted.

### b. Goals

- Review their lines
- Add a new line
- Review a selected line as the group admin when the invitation has been accepted

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  startDash([User selects Line management on Dashboard LF-S-033]) --> list[Line Management LF-S-045]
  startHeader([User selects Line management in Header LF-S-002]) --> list
  list -->|Add a new line when the user is the group admin or the user does not belong to a group yet| add[Add a New Line LF-S-046]
  list -->|Selects a line when the invitation has been accepted and the user is the group admin| detail[Line Details LF-S-047]
  add -->|Add when the invited user is not in a group yet and there is no pending invitation| list
  add -->|Confirm send invitation again| list
  detail -->|Change plan| basePlanMgmt([Base Plan Management LF-J-010])
  detail -->|Buy add-ons| shopPurchase([Shop Purchase LF-J-003])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
