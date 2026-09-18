# PRD: LF-S-016 - Login

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Login                                                                            |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-12                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A                                                                              |
| Confluence           | [PRD: LF-S-016 - Login](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676657731/PRD+LF-S-016+-+Login) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope



### a. Central requirement

The login screen is where the user enters their mobile number and 6-digit PIN to log in.

### b. Goals

- Enter a mobile number and 6-digit PIN
- Log in with **Log in**



### c. Non-Goals

- Dashboard after successful **Log in** (destination content and behavior)
- Forgot PIN after **Forgot PIN?** (destination content and behavior)
- Create account after **Create an account** (destination content and behavior)
- Email verification after **Got it** on the not-yet-verified message (destination content and behavior)



### d. Entry points


| Entry point                                                   | In or out of scope? | Note                                                                                                                                                                                                      |
| ------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User selects **Log in** on Welcome (LF-S-001)                 | In                  | From LF-S-001                                                                                                                                                                                             |
| User selects **Log in** in Header (LF-S-002)                  | In                  | From LF-S-002 guest menu                                                                                                                                                                                  |
| User selects **Log in** that takes the user to the login flow | In                  | Any other **Log in** that redirects to this screen (for example Verify email (LF-S-013), Email verification result (LF-S-015) — success, or the already-activated message on Activation — enter number (LF-S-005)) |




### e. Exit points


| Exit point                | In or out of scope? | Note                                                                                                                                                                                          |
| ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User logs in successfully | In                  | Dashboard (LF-S-033) when email is verified. When email is not verified, the not-yet-verified popup is shown first; **Got it** starts email verification (LF-J-002) at Verify email (LF-S-013) |




## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The login screen is shown | The user views the screen | - Title "Enter your number to log in" is shown<br>- **Mobile Number** field is shown with placeholder "Mobile Number"<br>- Label "6-Digit PIN" is shown<br>- A 6-digit PIN entry is shown<br>- **Forgot PIN?** is shown and can be clicked<br>- **Log in** is shown and can be selected |
| AC-02 | The login screen is shown | The user enters a value in the PIN entry | Only numbers can be entered; non-number characters are not accepted; at most 6 digits |
| AC-03 | The login screen is shown | The user enters a registered mobile number and the correct 6-digit PIN for that number, the email for that account is verified, and the user selects **Log in** | - The user is taken to Dashboard (LF-S-033)<br>- The user is logged out on every other device |
| AC-04 | The login screen is shown | The user selects the back arrow | The user is taken to Welcome (LF-S-001) |
| AC-05 | The login screen is shown and the user has entered a mobile number | The user clicks **Forgot PIN?** | - An OTP is sent to that mobile number<br>- The user is taken to OTP verification (LF-S-004) and starts Forgot PIN (LF-J-006) |




## 6. Edge cases & error cases

Account-status popups (number locked, number not registered, email not verified, number ported out) are shown only after the user enters the correct mobile number and the correct 6-digit PIN and selects **Log in**. Incorrect number or PIN (EC-01) and lock after 3 incorrect PIN attempts (EC-02) are shown when the number or PIN is incorrect. Incorrect PIN attempts and the 5-minute lock on this screen are counted only on Login. They are not counted together with Enter Existing PIN (LF-S-032).


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — incorrect number or PIN | The user selects **Log in** when the mobile number or PIN is incorrect, and that number has fewer than 2 prior incorrect PIN attempts in the current lock window | - Message "The mobile number or PIN you entered is incorrect" is shown<br>- Text "You can try N more times" is shown, where N is how many incorrect PIN attempts remain before the number is locked (3 incorrect PIN attempts lock the number) | The user can correct the number or PIN and select **Log in** again |
| EC-02 | Error — number locked after 3 incorrect PIN attempts | The user selects **Log in** with an incorrect PIN for a number for the 3rd time | - Message "Sorry, your account is locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown<br>- That number is locked for 5 minutes | **Got it** closes the message and the user stays on the login screen. After 5 minutes, the user can try **Log in** again for that number |
| EC-03 | Error — number is locked | The user enters the correct mobile number and the correct 6-digit PIN for a number that is locked and selects **Log in** | - Message "Sorry, your account is locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the login screen. After 5 minutes, the user can try **Log in** again for that number |
| EC-04 | Error — number not registered | The user enters the correct mobile number and the correct 6-digit PIN and selects **Log in**, and the number is not registered | - Message "Sorry, this number is not yet registered. Please create an account to log in." is shown<br>- **Create an account** and **Cancel** are shown | - **Create an account** takes the user to Activation — enter number (LF-S-005) and starts create account (LF-J-001)<br>- **Cancel** closes the message and the user stays on the login screen |
| EC-05 | Error — email not verified | The user enters a registered mobile number and the correct 6-digit PIN for that number, the email for that account is not verified, and the user selects **Log in** | - Message "Your account is not yet verified. Click the verification link sent to your email to proceed." is shown<br>- **Got it** is shown | **Got it** takes the user to Verify email (LF-S-013) and starts email verification (LF-J-002) |
| EC-06 | Error — number ported out | The user enters the correct mobile number and the correct 6-digit PIN and selects **Log in**, and that number has been ported out | - Message "Sorry, you have been ported out." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the login screen |




## 7. Data Mapping

N / A