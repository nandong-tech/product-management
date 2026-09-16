# PRD: LF-S-004 - OTP Verification

## 1. Change Log


| Date       | Change                | Owner    | Rationale                                         |
| ---------- | --------------------- | -------- | ------------------------------------------------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Wrong code leaves Next available; Resend countdown during max-attempts lock |
| 2026-09-11 | Updated from design | Nan Dong | Verify mobile number copy and continue with Next |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | OTP Verification                                                                 |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-07-28                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | [Prebuilt Page Templates — OTP Verification](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=51-6449&m=dev) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The OTP verification screen is where the user enters the 6-digit code sent to their number or email to verify it.

### b. Goals

- Verify the OTP they entered

### c. Non-Goals

N / A

### d. Entry points


| Entry point                                                         | In or out of scope? | Note                                                                     |
| ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------ |
| A flow that requires OTP verification sends the user to this screen | In                  | A code has been sent to the user's number or email when the screen opens |


### e. Exit points


| Exit point                                                  | In or out of scope? | Note                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The user selects **Next** after entering the correct code   | In                  | The user is verified and taken to the next step of the flow. Examples: PIN Entering (LF-S-006) in create account (LF-J-001); PIN Entering (LF-S-006) in Forgot PIN (LF-J-006); Checkout (LF-S-021) after eSIM purchase fill info (LF-S-024)                                                |
| The user clicks **Not your number?** or **Not your email?** | In                  | The user is taken back to the previous screen. Examples: Activation — enter number (LF-S-005) when coming from activation; Login (LF-S-016) when coming from Forgot PIN (LF-J-006) started on Login; Verify email (LF-S-013) when coming from email verification; eSIM purchase fill info (LF-S-024) when the OTP was sent to email |


## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                  | When                                       | Then                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----- | ---------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The OTP verification screen is shown and the code was sent to a number | The user views the screen                  | - Title "Verify mobile number" is shown<br>- Text "Please enter the code sent to" is shown<br>- The number the code was sent to is shown<br>- A 6-digit code entry is shown<br>- **Resend code** is shown<br>- Toast "Verification code sent to mobile number." is shown<br>- **Next** is shown and is not available                                                                                                                                                                                                                                                                 |
| AC-02 | The OTP verification screen is shown, the code was sent to a number, and the user is not logged in | The user views the screen                  | **Not your number?** is shown and can be clicked                                                                                                                                                                                                                                                                 |
| AC-03 | The OTP verification screen is shown and the code was sent to an email | The user views the screen                  | - Title "OTP verification" is shown<br>- Text "Please enter the code sent to" is shown<br>- The email the code was sent to is shown masked: the first and last characters of the local part are shown, the characters between them are shown as asterisks, and the domain is shown in full<br>- **Not your email?** is shown under the masked email and can be clicked<br>- A 6-digit code entry is shown<br>- **Resend code** is shown<br>- **Next** is shown and is not available |
| AC-04 | The OTP verification screen is shown and a 6-digit code is entered     | The user views the screen                  | **Next** is shown and can be selected                                                                                                                                                                                                                                                                                                                                                                                    |
| AC-05 | The OTP verification screen is shown and the entered code is correct   | The user selects **Next**                  | The user is taken to the next step of the flow. Examples: PIN Entering (LF-S-006) in create account (LF-J-001); PIN Entering (LF-S-006) in Forgot PIN (LF-J-006); Checkout (LF-S-021) after eSIM purchase fill info (LF-S-024)                                                                                                                                                                                                                           |
| AC-06 | After an OTP was sent                                                  | The user views the OTP verification screen | - A one-minute countdown timer appears next to **Resend code**<br>- **Resend code** cannot be clicked during the countdown                                                                                                                                                                                                                                                                                                   |
| AC-07 | The one-minute countdown has ended                                     | The user views the OTP verification screen | - The countdown timer is no longer shown<br>- **Resend code** can be clicked                                                                                                                                                                                                                                                                                                                                                |
| AC-08 | The countdown has ended                                                | The user clicks **Resend code**             | A new OTP is sent to the same number or email                                                                                                                                                                                                                                                                                                                                                                           |
| AC-09 | The OTP verification screen is shown and **Not your number?** is shown | The user clicks **Not your number?**       | The user is taken back to the previous screen. Examples: Activation — enter number (LF-S-005) when coming from activation; Login (LF-S-016) when coming from Forgot PIN (LF-J-006) started on Login                                                                                                                                                                                                                                                                                                |
| AC-10 | The OTP verification screen is shown and **Not your email?** is shown  | The user clicks **Not your email?**        | The user is taken to the previous page to edit the email                                                                                                                                                                                                                                                                                                                                                                |


## 6. Edge cases & error cases


| ID    | Case (category)                  | Trigger / entry                                                                                                                                          | Expected behavior (observable)                                                                                                                                                                 | Exit / recovery                                                             |
| ----- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| EC-01 | Error — invalid or expired OTP   | The user selects **Next** when the entered code is wrong, or when the code was sent more than 5 minutes ago                                              | - The message "Incorrect code. Try again." is shown<br>- **Next** is shown and can be selected                                                                                                                                                     | The user can select **Next** again, enter the code again, or request a new code with **Resend code** |
| EC-02 | Error — max attempts             | The user selects **Next** with a wrong OTP for the 3rd time                                                                                               | - Message "You've exceeded the maximum number of attempts. Try again in 5 minutes." is shown<br>- The user cannot enter a code during the 5-minute lock<br>- **Next** is shown and is not available<br>- A countdown for the remaining lock time is shown next to **Resend code**<br>- **Resend code** cannot be clicked during that countdown | After 5 minutes, the user can enter a code again and **Resend code** can be clicked                            |
| EC-03 | Edge — return while locked       | The user is locked for 5 minutes after entering a wrong OTP 3 times, leaves the flow, comes back to the OTP verification screen, and enters an OTP again | - The message "You've exceeded the maximum number of attempts. Try again in 5 minutes." is shown<br>- The user cannot enter a code during the remaining lock time<br>- **Next** is shown and is not available<br>- A countdown for the remaining lock time is shown next to **Resend code**<br>- **Resend code** cannot be clicked during that countdown                                                       | After 5 minutes, the user can enter a code again and **Resend code** can be clicked                            |
| EC-04 | Error — max OTP requests         | The user has been sent 6 codes within 24 hours and clicks **Resend code**                                                                                 | - Message "You've exceeded the maximum number of requests. Try again in 24 hours." is shown<br>- No new code is sent                                                             | The user may try again after 24 hours                                       |
| EC-05 | Edge — return after max requests | The user has exceeded the maximum number of OTP requests, leaves the flow, and comes back to the OTP verification screen                                 | The message "You've exceeded the maximum number of requests. Try again in 24 hours." is shown                                                                                 | The user may try again after 24 hours                                       |


## 7. Data Mapping

N / A
