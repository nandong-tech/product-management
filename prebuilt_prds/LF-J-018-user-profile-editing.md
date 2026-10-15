# PRD: LF-J-018 - User profile editing

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | User profile editing |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-09-28 |
| Last updated | 2026-10-15 |
| Figma | N / A |
| Confluence | [PRD: LF-J-018 - User profile editing](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7875166331/PRD+LF-J-018+-+User+profile+editing) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The user profile editing journey is where the logged-in user reviews their personal information and updates their personal information or email.

### b. Goals

- Review their personal information
- Update their first name, last name, gender, and birthday
- Update their email

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  start([User selects User Profile on My Account Home LF-S-055]) --> profile[User Profile LF-S-059]
  profile -->|Edit on the personal info section| editProfile[Edit profile LF-S-060]
  editProfile -->|Save| profile
  profile -->|Edit on the email section + OTP sent to the user's mobile number| otp[Enter verification code LF-S-004]
  otp -->|Correct OTP + Next| editEmail[Edit email LF-S-014]
  editEmail -->|Save when a verification email can be sent| emailVerify([Email verification LF-J-002])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
