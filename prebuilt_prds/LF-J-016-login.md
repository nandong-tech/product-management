# PRD: LF-J-016 - Login

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| 2026-09-18 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Login |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-09-18 |
| Last updated | 2026-09-18 |
| Figma | N / A |
| Confluence | [PRD: LF-J-016 - Login](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7827816774/PRD+LF-J-016+-+Login) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The Login journey is where the user logs in with their mobile number and PIN, or starts Forgot PIN.

### b. Goals

- Log in with their mobile number and PIN

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  startWelcome([User selects Log in on Welcome LF-S-001]) --> login[Login LF-S-016]
  startHeader([User selects Log in in Header LF-S-002]) --> login
  login -->|Registered number + correct PIN + email verified + Log in| dashboard([Dashboard LF-S-033])
  login -->|Forgot PIN?| forgotPin[Forgot PIN LF-J-006]
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
