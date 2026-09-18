# PRD: LF-S-015 - Email Verification Result

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Email Verification Result                                                                          |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-08-11                                                                                         |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-015 - Email Verification Result](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676657709/PRD+LF-S-015+-+Email+Verification+Result) |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The email verification result screen is where the user sees that their email was verified after opening a verification link and can go to log in. Expired link, already verified, and failed verification are shown as error cases on this screen.

### b. Goals

- See that email verification succeeded
- Go to log in

### c. Non-Goals

- Deciding which result to show when the verification link is opened

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                       | When                        | Then                                                                                                                                                                                                                                                                                                               |
| ----- | --------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The email verification result screen is shown for a successful verification | The user views the screen   | - Log the current user out, even if that log-in is for a different account than the verification link<br>- Title "Email successfully verified" is shown<br>- Text "You're good to go! Kindly log in again so you can track and convert your data into awesome deals!" is shown<br>- **Log in** is shown and can be selected |
| AC-02 | The email verification result screen is shown for a successful verification | The user selects **Log in** | The user is taken to Login (LF-S-019)                                                                                                                                                                                                                                                                              |


## 6. Edge cases & error cases

Expired-link **Resend verification link** uses the same five-minute window and 3-sends-in-24-hours limit as Verify email (LF-S-013) and Edit email (LF-S-014).


| ID    | Case (category)                                      | Trigger / entry                                                                                                                                             | Expected behavior (observable)                                                                                                                                                                                                             | Exit / recovery                                                                                                                                                                                                                    |
| ----- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EC-01 | Error — expired verification link                    | The user opens an expired email verification link                                                                                                           | - Title "Expired verification link" is shown<br>- Text "The link to verify your email has expired. You may click on the "Resend verification link" to send another one." is shown<br>- **Resend verification link** is shown and can be selected | When the five-minute countdown has ended and the user has been sent fewer than 3 verification emails, **Resend verification link** sends a new verification link to the user's email and takes the user to Verify email (LF-S-013) |
| EC-02 | Error — verification email within five-minute window | The user selects **Resend verification link** while a verification email was already requested within the last five minutes                                 | - A new verification link is not sent<br>- Message "Sorry, you've already requested a verification email. Please request again in 5 minutes." is shown<br>- **Got it** is shown                                                                  | **Got it** closes the message and the user stays on the email verification result screen (expired link)                                                                                                                            |
| EC-03 | Error — max verification email requests              | The user selects **Resend verification link** when the user has already been sent a verification email 3 times                                              | - A new verification link is not sent<br>- Message "Sorry, you've reached the maximum number of requests. You can request a new one again tomorrow or after 24 hours." is shown<br>- **Got it** is shown                                         | **Got it** closes the message and the user stays on the email verification result screen (expired link)                                                                                                                            |
| EC-04 | Error — email already verified                       | The user opens a verification link when their email is already verified                                                                                     | - Any current log-in ends<br>- Title "Your email is already verified" is shown<br>- Text "You are ready to go. Click the button below to go to the home page." is shown<br>- **Back to Home** is shown and can be selected                          | **Back to Home** takes the user to Welcome (LF-S-001)                                                                                                                                                                              |
| EC-05 | Error — email verification failed                    | The user opens a verification link and verification fails (for example, the link parameters were changed). Does not cover expired or already-verified cases | - Any current log-in ends<br>- Title "Email verification failed" is shown<br>- Text "Sorry, something went wrong!" is shown<br>- **Back to Home** is shown and can be selected                                                                      | **Back to Home** takes the user to Welcome (LF-S-001)                                                                                                                                                                              |


## 7. Data Mapping

N / A
