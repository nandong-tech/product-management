# PRD: LF-S-013 - Verify Email

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Verify Email                                                                                       |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-08-11                                                                                         |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-013 - Verify Email](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676723264/PRD+LF-S-013+-+Verify+Email) |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The verify-email screen is where the user is told a verification link was sent to their email and can resend it or leave for edit email or log in.

### b. Goals

- See which email the verification link was sent to
- Resend the verification link when allowed

### c. Non-Goals

N / A

### d. Entry points


| Entry point                                              | In or out of scope? | Note                                                                        |
| -------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| User selects **Next** on Activation — success (LF-S-012) | In                  | A verification link has been sent to the user's email when the screen opens |
| User selects **Got it** on the not-yet-verified message after Login (LF-S-019) | In | From LF-S-019; starts or continues email verification (LF-J-002) |
| User selects **Resend verification link** on Email verification link expired (LF-S-016) | In | A new verification link has been sent when the screen opens |
| User selects **Save** on Edit email (LF-S-014) and a new verification email can be sent | In | A new verification link has been sent to the entered email when the screen opens |
| User selects **Cancel** on Edit email (LF-S-014) | In | From LF-S-014 |
| User clicks **Not your number?** on OTP verification (LF-S-004) after **Not your email?** on this screen | In | From LF-S-004 in email verification (LF-J-002) |




### e. Exit points


| Exit point                      | In or out of scope? | Note                 |
| ------------------------------- | ------------------- | -------------------- |
| User clicks **Not your email?** | In                  | OTP verification (LF-S-004), then Edit email (LF-S-014) on correct OTP |
| User clicks **Log in**          | In                  | Login (LF-S-019)      |




## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                           | When                                          | Then                                                                                                                                                                                                                                                                                                                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The verify-email screen is shown                                                                | The user views the screen                     | - Title "Email verification" is shown<br>- Text "We've sent a verification link to" plus the user's email is shown<br>- **Not your email?** is shown and can be clicked<br>- "Didn't receive the verification link?" is shown<br>- **Resend Verification Link** is shown<br>- Text "You can only try 3 times in total" is shown<br>- "Email already verified?" is shown<br>- **Log in** is shown and can be clicked |
| AC-02 | After a verification email was sent                                                             | The user views the verify-email screen        | - A five-minute countdown timer appears with **Resend Verification Link**<br>- **Resend Verification Link** cannot be selected during the countdown                                                                                                                                                                                                                                               |
| AC-03 | The five-minute countdown has ended                                                             | The user views the verify-email screen        | - The countdown timer is no longer shown<br>- **Resend Verification Link** can be selected                                                                                                                                                                                                                                                                                                        |
| AC-04 | The five-minute countdown has ended and the user has been sent fewer than 3 verification emails | The user selects **Resend Verification Link** | - A new verification link is sent to the user's email<br>- A five-minute countdown starts again<br>- **Resend Verification Link** cannot be selected during the countdown                                                                                                                                                                                                                            |
| AC-05 | The verify-email screen is shown                                                                | The user clicks **Not your email?**           | The user is taken to OTP verification (LF-S-004)                                                                                                                                                                                                                                                                                                                                               |
| AC-06 | The verify-email screen is shown                                                                | The user clicks **Log in**                    | The user is taken to Login (LF-S-019)                                                                                                                                                                                                                                                                                                                                                           |




## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
|----|-----------------|-----------------|--------------------------------|-----------------|
| EC-01 | Error — max verification email requests | The user has already been sent a verification email 3 times (same limit shared with Edit email (LF-S-014) and Email verification link expired (LF-S-016)) and selects **Resend Verification Link** again | - Message "Sorry, you've reached the maximum number of requests. You can request a new one again tomorrow or after 24 hours." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the verify-email screen |




## 7. Data Mapping

N / A