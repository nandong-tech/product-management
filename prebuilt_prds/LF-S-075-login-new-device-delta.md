# PRD: LF-S-075 - Login new device delta

## Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## Header

| Field | Value |
| --- | --- |
| Feature | Login new device delta |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-10-14 |
| Last updated | 2026-10-21 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | [Prebuilt Page Templates — Login new device delta](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=649-33775) |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-075 - Login new device delta](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7929921552/PRD+LF-S-075+-+Login+new+device+delta) |
| Links (optional) | based on: [PRD: LF-S-016 - Login](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676657731/PRD+LF-S-016+-+Login)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The login new device delta checks Account locked before any other login outcome. When the account is not locked and this is a new device, login asks for a verification code. A wrong code does not take the user to another screen. After the correct code, a ported-out number shows Number ported out and does not continue. If the number is not ported out and the account is not created, login continues at account details. If the account is created and the email is not verified, login shows Email not verified. **Got it** takes the user to Email verification. If the account is created and the email is verified, login opens Dashboard. When this is not a new device and the account is not locked, login checks the account before Dashboard and before Email not verified.

### Goals

- Show Account locked before any other login outcome
- Confirm a verification code when this is a new device and the account is not locked
- Leave the user on the verification code when the code is wrong
- Show Number ported out after the correct code
- After that code, continue at account details when the account is not created
- After that code, show Email not verified when the account is created and the email is not verified
- After that code, open Dashboard when the account is created and the email is verified
- Continue at account details when this is not a new device and the account is not created
- Open Dashboard when this is not a new device, the account is created, and the email is verified
- Show Email not verified when this is not a new device, the account is created, and the email is not verified

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
| AC-01 | The login screen is shown, the account is not locked, and the user is logging in on a new device | The user enters the correct mobile number and the correct 6-digit PIN and selects **Log in** | - A verification code is sent to the user's mobile number<br>- The user is taken to Enter verification code (LF-S-004) |
| AC-02 | The login screen is shown, the account is not locked, this is not a new device, and the account is not created | The user enters the correct mobile number and the correct 6-digit PIN and selects **Log in** | The user is taken to Create account (LF-J-001) at Activation — account details (LF-S-007) |
| AC-03 | The login screen is shown, the account is not locked, this is not a new device, the account is created, and the email is verified | The user enters the correct mobile number and the correct 6-digit PIN and selects **Log in** | - The user is taken to Dashboard (LF-S-033)<br>- The user is logged out on every other device |

## Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — account locked | The user enters the correct mobile number and the correct 6-digit PIN for a number that Login has locked and selects **Log in** | - Title **Account locked** is shown<br>- Message "Sorry, your account is temporarily locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown<br>- This is checked before a verification code, account details, Email not verified, and Dashboard | **Got it** closes the message and the user stays on the login screen |
| EC-02 | Error — email not verified | The login screen is shown, the account is not locked, this is not a new device, the account is created, the user enters the correct mobile number and the correct 6-digit PIN, the email is not verified, and the user selects **Log in** | - Title **Email not verified** is shown<br>- Message "Your account is not yet verified. Click the verification link sent to your email to proceed." is shown<br>- **Got it** is shown | **Got it** takes the user to Email verification (LF-J-002) |
| EC-03 | Error — email not verified | The user enters the correct verification code and selects **Next**, the number is not ported out, the account is created, and the email is not verified | - Title **Email not verified** is shown<br>- Message "Your account is not yet verified. Click the verification link sent to your email to proceed." is shown<br>- **Got it** is shown | **Got it** takes the user to Email verification (LF-J-002) |

## Data Mapping

N / A
