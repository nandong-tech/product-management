# PRD: LF-S-075 - Login new device delta

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Login new device delta |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-10-14 |
| Last updated | 2026-10-14 |
| Figma | N / A |
| Confluence | [PRD: LF-S-075 - Login new device delta](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7929921552/PRD+LF-S-075+-+Login+new+device+delta) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | based on: [PRD: LF-S-016 - Login](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676657731/PRD+LF-S-016+-+Login)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The login new device delta asks for a verification code when the user logs in on a new device.

### b. Goals

- Confirm a verification code when logging in on a new device

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The login screen is shown, the account is created, and the user is logging in on a new device | The user enters the correct 6-digit PIN and selects **Log in** | - A verification code is sent to the user's mobile number<br>- The user is taken to Enter verification code (LF-S-004) |

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
