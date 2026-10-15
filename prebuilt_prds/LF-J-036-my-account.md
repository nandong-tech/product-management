# PRD: LF-J-036 - My Account

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | My Account |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-10-15 |
| Last updated | 2026-10-15 |
| Figma | N / A |
| Confluence | [PRD: LF-J-036 - My Account](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7933526051/PRD+LF-J-036+-+My+Account) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The My Account journey is where the logged-in user sees their name and mobile number and opens account sections.

### b. Goals

- See their name and mobile number
- Open account sections

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  startHeader([User selects My Account in Header LF-S-002]) --> home[My Account Home LF-S-055]
  home -->|User Profile| profile([User profile editing LF-J-018])
  home -->|Update PIN| pin([Reset PIN LF-J-007])
  home -->|Saved Addresses| addresses([Saved Address Management LF-J-004])
  home -->|Transaction History| history([Transaction History LF-J-015])
  home -->|SIM replacement| sim([SIM Replacement LF-J-024])
  home -->|Port in| portIn([Port-in LF-J-030])
  home -->|Port out| portOut([Port out LF-J-034])
  home -->|Delete account| deleteAccount([Delete account LF-J-019])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
