# PRD: LF-S-013 - Verify Email

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-28 | Migrated to the Header-only PRD template (Decision-66 · PRDs carry no frontmatter) | aidr-conform-prebuilt.sh | Version 1 did not track edits; content changed since v1 without a record |


## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Verify Email                                                                                                                                                                                                                                                                                                                    |
| Channels             | App + Web                                                                                                                                                                                                                                                                                                                       |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                                                   |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                                                        |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                                                        |
| Created              | 2026-08-11                                                                                                                                                                                                                                                                                                                      |
| Last updated         | 2026-10-15                                                                                                                                                                                                                                                                                                                      |
| Figma                | [Prebuilt Page Templates — Verify Email](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=239-13582)                                                                                                                                                                                         |
| Confluence           | [PRD: LF-S-013 - Verify Email](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676723264/PRD+LF-S-013+-+Verify+Email)                                                                                                                                                                                                  |
| Jira                 | —                                                                                                                                                                                                                                                                                                                               |
| API Spec             | N / A                                                                                                                                                                                                                                                                                                                           |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The verify-email screen is where the user is told a verification link was sent to their email and can resend it or leave for edit email or log in.

### b. Goals

- See which email the verification link was sent to
- Resend the verification link when allowed
- Send the verification email



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                           | When                                          | Then                                                                                                                                                                                                                                                                                                                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The verify-email screen is shown                                                                | The user views the screen                     | - Title "Verify email" is shown - Text "We've sent a verification link to" plus the user's email is shown - **Not your email?** is shown and can be clicked - "Didn't receive the link?" is shown - When resends remain, the remaining count is shown, such as "(2 resends remaining)" - "Email already verified?" is shown - **Log in** is shown and can be clicked |
| AC-02 | After a verification email was sent                                                             | The user views the verify-email screen        | - **Resend in** plus the remaining time is shown - **Resend** cannot be selected during the countdown - Toast "Verification link sent to your email." is shown                                                                                                                                                                                                                                   |
| AC-03 | The five-minute countdown has ended                                                             | The user views the verify-email screen        | - The countdown is no longer shown - **Resend** is shown and can be selected                                                                                                                                                                                                                                                                                                                    |
| AC-04 | The five-minute countdown has ended and the user has been sent fewer than 3 verification emails | The user selects **Resend**                   | - A new verification link is sent to the user's email - A five-minute countdown starts again - **Resend** cannot be selected during the countdown                                                                                                                                                                                                                                               |
| AC-05 | The verify-email screen is shown                                                                | The user clicks **Not your email?**           | - A verification code is sent to the user's mobile number<br>- The user is taken to Enter verification code (LF-S-004)                                                                                                                                                                                                                                                                                                                                        |
| AC-06 | The verify-email screen is shown                                                                | The user clicks **Log in**                    | The user is taken to Login (LF-S-016)                                                                                                                                                                                                                                                                                                                                                          |




## 6. Edge cases & error cases


| ID    | Case (category)                         | Trigger / entry                                                                                                                                                                                                   | Expected behavior (observable)                                                                                                                               | Exit / recovery                                                             |
| ----- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| EC-01 | Error — max verification email requests | The user has already been sent a verification email 3 times (same limit shared with Edit email (LF-S-014) and Email verification result (LF-S-015) — expired link) and selects **Resend** again | - "(Maximum resend attempts reached)" is shown - Title "Maximum requests reached" is shown - Message "Sorry, you've reached the maximum number of requests. You can request a new one again tomorrow or after 24 hours." is shown - **Got it** is shown | **Got it** closes the message and the user stays on the verify-email screen |




## 7. Data Mapping

N / A