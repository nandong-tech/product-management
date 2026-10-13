# PRD: LF-J-034 - Port out

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Port out |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-10-13 |
| Last updated | 2026-10-13 |
| Figma | N / A |
| Confluence | [PRD: LF-J-034 - Port out](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7921991803/PRD+LF-J-034+-+Port+out) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The port-out journey is where the logged-in user ports their number out of this operator.

### b. Goals

- Port out their number

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  start([User selects Port out on My Account Home LF-S-055]) -->|OTP sent to the user's mobile number| otp[Enter verification code LF-S-004]
  otp -->|Correct OTP + Next| confirm[Port out confirmation LF-S-073]
  confirm -->|Terms & Conditions selected + Confirm| result[Port out result LF-S-074]
  result -->|Back to Home| welcome([Welcome LF-S-001])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
