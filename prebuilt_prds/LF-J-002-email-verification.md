# PRD: LF-J-002 - Email Verification

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-28 | Migrated to the Header-only PRD template (Decision-66 · PRDs carry no frontmatter) | aidr-conform-prebuilt.sh | Version 1 did not track edits; content changed since v1 without a record |

## 2. Header


| Field                | Value              |
| -------------------- | ------------------ |
| Feature              | Email Verification |
| Channels             | App + Web          |
| Status (owning team) | PM — drafting      |
| Owner (PM)           | Nan Dong           |
| Contributors         | Nan Dong           |
| Created              | 2026-08-12         |
| Last updated         | 2026-10-15  |
| Figma                | [Prebuilt Page Templates — Email Verification](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=341-2348) |
| Confluence           | [PRD: LF-J-002 - Email Verification](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7692091431/PRD+LF-J-002+-+Email+Verification) |
| Jira                 | —                  |
| API Spec             | N / A              |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The email verification journey is where the user verifies the email used at registration, can change that email after OTP, and sees the matching verification result when they open a verification link.

### b. Goals

- See that a verification link was sent and resend it when allowed
- Change the email after OTP when the email shown is wrong
- Open a verification link and see the result for that situation



### c. Non-Goals

- Field-level rules on each screen (owned by Enter verification code (LF-S-004), Verify email (LF-S-013), Edit email (LF-S-014), and Email verification result (LF-S-015))



### d. Entry points


| Entry point                                              | In or out of scope? | Note                                                 |
| -------------------------------------------------------- | ------------------- | ---------------------------------------------------- |
| User selects **Next** on Activation — success (LF-S-012) | In                  | Starts email verification at Verify email (LF-S-013) |
| User selects **Got it** on **Email not verified** on Login (LF-S-016) | In | Starts email verification at Verify email (LF-S-013) |
| User selects **Save** on Edit email (LF-S-014) in User profile editing (LF-J-018) when a verification email can be sent | In | Starts email verification at Verify email (LF-S-013) |




### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User selects **Log in** on Verify email (LF-S-013) | In | Login (LF-S-016) |
| User selects **Log in** on Email verification result (LF-S-015) — success | In | Login (LF-S-016) |

## 4. User Journey

```mermaid
flowchart TD
  start([User selects Next on Activation — success LF-S-012]) --> verifyEmail[Verify email LF-S-013]
  startLogin([User selects Got it on Email not verified on Login LF-S-016]) --> verifyEmail
  startProfile([User selects Save on Edit email LF-S-014 in User profile editing LF-J-018 when a verification email can be sent]) --> verifyEmail
  verifyEmail -->|Not your email + OTP sent to the user's mobile number| otp[Enter verification code LF-S-004]
  otp -->|Correct OTP + Next| editEmail[Edit email LF-S-014]
  editEmail -->|Save when verification email can be sent| verifyEmail
  verifyEmail -->|Log in| login([Login LF-S-016])
  verifyEmail -->|Opens verification link| result[Email verification result LF-S-015]
  result -->|Success — Log in| login
  result -->|Expired — Resend when allowed — new link sent| verifyEmail
  result -->|Already verified or failed — Back to Home| welcome([Welcome LF-S-001])
```





## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A