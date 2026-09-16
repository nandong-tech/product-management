# PRD: LF-S-032 - Enter Existing PIN

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Enter Existing PIN                                                               |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-31                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The enter existing PIN screen is where a logged-in user enters their current login PIN before setting a new PIN.

### b. Goals

- Enter the existing login PIN

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                  | When                                     | Then                                                                                                                                                        |
| ----- | -------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The enter existing PIN screen is shown | The user views the screen                | - Title "Update 6-digit PIN" is shown<br>- Text "Enter your 6-digit PIN" is shown<br>- A 6-digit PIN entry is shown<br>- **Forgot PIN?** is shown and can be clicked |
| AC-02 | The enter existing PIN screen is shown | The user enters a value in the PIN entry | Only numbers can be entered. Non-number characters are not accepted. The field accepts at most 6 digits                                                     |
| AC-03 | The enter existing PIN screen is shown | The user enters the correct existing PIN | The user is taken to PIN Entering (LF-S-006)                                                                                                                |
| AC-04 | The enter existing PIN screen is shown | The user clicks **Forgot PIN?**          | The user is taken to Forgot PIN (LF-J-006)                                                                                                                  |


## 6. Edge cases & error cases

Incorrect PIN attempts and the 5-minute lock on this screen are counted only on Enter Existing PIN. They are not counted together with Login (LF-S-016).


| ID    | Case (category)                                      | Trigger / entry                                                                                                                              | Expected behavior (observable)                                                                                                                                                                                                             | Exit / recovery                                                                                                                               |
| ----- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| EC-01 | Error — incorrect PIN                                | The user enters a PIN that is not the existing PIN, and this screen has fewer than 2 prior incorrect PIN attempts in the current lock window | - Message "The mobile number or PIN you entered is incorrect" is shown<br>- Text "You can try N more times" is shown, where N is how many incorrect PIN attempts remain before this screen locks the number. 3 incorrect PIN attempts on this screen lock the number for this screen | The user can enter the existing PIN again or click **Forgot PIN?**                                                                            |
| EC-02 | Error — number locked after 3 incorrect PIN attempts | The user enters a PIN that is not the existing PIN for the 3rd time on this screen                                                                          | - Message "Sorry, your account is locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown<br>- This screen locks that number for 5 minutes                                                                                         | **Got it** closes the message and the user stays on the enter existing PIN screen. After 5 minutes, the user can enter the existing PIN again |
| EC-03 | Error — number is locked                             | The user enters a PIN when this screen has locked that number                                                                                             | - Message "Sorry, your account is locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown                                                                                                                               | **Got it** closes the message and the user stays on the enter existing PIN screen. After 5 minutes, the user can enter the existing PIN again |
| EC-04 | Edge — return while locked                           | The user is locked for 5 minutes on this screen after 3 incorrect PIN attempts, leaves the flow, and comes back to the enter existing PIN screen while this screen still has that number locked | - Message "Sorry, your account is locked! You may try again after 5 minutes." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the enter existing PIN screen. After 5 minutes, the user can enter the existing PIN again |


## 7. Data Mapping

N / A