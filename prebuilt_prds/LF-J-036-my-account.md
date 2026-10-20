# PRD: LF-J-036 - My Account

## Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## Header

| Field | Value |
| --- | --- |
| Feature | My Account |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-10-15 |
| Last updated | 2026-10-15 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | N / A |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-J-036 - My Account](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7933526051/PRD+LF-J-036+-+My+Account) |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The My Account journey is where the logged-in user sees their name and mobile number and opens account sections.

### Goals

- See their name and mobile number
- Open account sections

### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

```mermaid
flowchart TD
  startHeader([User selects My Account in Header LF-S-002]) --> home[My Account Home LF-S-055]
  home -->|User Profile| profile([User profile editing LF-J-018])
  home -->|Update PIN| pin([Reset PIN LF-J-007])
  home -->|Saved Addresses| addresses([Saved Address Management LF-J-004])
  home -->|Transaction History| history([Transaction History LF-J-015])
  home -->|SIM swap| sim([SIM Swap LF-J-024])
  home -->|Port in| portIn([Port-in LF-J-030])
  home -->|Port out| portOut([Port out LF-J-034])
  home -->|Delete account| deleteAccount([Delete account LF-J-019])
```

## Acceptance Criteria

N / A

## Edge cases & error cases

N / A

## Data Mapping

N / A
