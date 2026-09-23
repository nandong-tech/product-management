# PRD: LF-J-016 - Login

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Login |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-09-18 |
| Last updated | 2026-09-22 |
| Figma | [Prebuilt Page Templates — Login](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=182-7503) |
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
  login -->|Forgot PIN? + OTP sent| forgotPin[Forgot PIN LF-J-006]
  login -->|Create an account| createAccount([Create account LF-J-001 at Activation — enter number LF-S-005])
  login -->|Email not verified — Got it| emailVerification([Email verification LF-J-002 at Verify email LF-S-013])
  login -->|Number ported out — Got it| login
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
