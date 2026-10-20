# PRD: LF-S-005 - Activation — Enter Number

## Change Log

| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |

## Header

| Field | Value |
| --- | --- |
| Feature | Activation — Enter Number |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-07-30 |
| Last updated | 2026-09-28 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | [Prebuilt Page Templates — Enter Number](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=45-2547&m=dev) |
| API Spec(s) | [UserClient.yaml](https://github.com/lotusflare/swagger/raw/20e5365bae70660fa8330fc68370ccedd62ca6be/swaggers/user/swagger/UserClient.yaml) |
| Jira | — |
| Confluence | [PRD: LF-S-005 - Activation — Enter Number](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676526644/PRD+LF-S-005+-+Activation+Enter+Number) |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The enter-number screen is where the user enters their mobile number to start activating their account.

### Goals

- Enter a mobile number to continue
- See physical SIM and eSIM setup reminders
- See how to find the number (pSIM / eSIM)

### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria

| ID    | Given                            | When                                                                                             | Then                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | -------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The enter-number screen is shown | The user views the screen                                                                        | - Title "Enter mobile number" is shown - The mobile number field is shown - **Next** is shown - **Where can I find this?** is shown and can be clicked - "Make sure your SIM is ready. Physical SIM: Insert it. eSIM: Set it up on your device." is shown                                                                                                                                                                                                             |
| AC-02 | The enter-number screen is shown | The user clicks **Where can I find this?**                                                       | - Find-number help is shown with **pSIM** and **eSIM** - **pSIM** (default): image of the SIM bed with the number location indicated, and "Your number can be found on the top portion of your SIM bed." - **eSIM**: image of the order confirmation / eSIM voucher with the number location indicated, and "The number can be found in the order confirmation sent to your email upon purchase." - **Got it** closes the help and returns to the enter-number screen |
| AC-03 | The enter-number screen is shown | The user enters a valid mobile number whose state is correct for activation and selects **Next** | The user is taken to PIN Entering (LF-S-006)                                                                                                                                                                                                                                                                                                                                                                                                               |

## Edge cases & error cases

| ID    | Case (category)                     | Trigger / entry                                                                                                                  | Expected behavior (observable)                                                                                                                                                                                                               | Exit / recovery                                                                                                                                    |
| ----- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| EC-01 | Error — expired SIM                 | The user enters a number for an expired SIM and selects **Next**                                                                 | - Title "SIM expired" is shown - Message "Sorry, your SIM is expired. Buy a new SIM and try again." is shown - **Get a SIM** and **Back** are shown                                                                                          | - **Get a SIM** takes the user to Offer list (LF-S-017) for SIM offers - **Back** closes the message and the user stays on the enter-number screen |
| EC-02 | Error — number not in operator pool | The user enters a number that is not in the operator’s number pool (not a number from the current operator) and selects **Next** | The inline message "The number you entered is not valid. Check the number and try again." is shown on the mobile number field                                                                                                                | The user can correct the number and select **Next** again                                                                                          |
| EC-03 | Error — replacement SIM only        | The user enters a number intended for SIM swap only and selects **Next**                                                  | - Title "SIM swap required" is shown - Message "The number you entered is intended for SIM swap only. Log in with your original number and request a SIM swap from the Account section." is shown - **Got it** is shown | **Got it** closes the message and the user stays on the enter-number screen                                                                        |
| EC-04 | Error — SIM already activated       | The user enters a number for a SIM that is already activated and selects **Next**                                                | - Title "SIM already activated" is shown - Message "Your SIM is activated already! Log in with your PIN to get started." is shown - **Log in** and **Back** are shown                                                                        | - **Log in** takes the user to Login (LF-S-016) - **Back** closes the message and the user stays on the enter-number screen                        |

## Data Mapping

| UI element / label | Endpoint | Field | Empty / fallback | Notes |
| --- | --- | --- | --- | --- |
| Mobile number | POST /api/v3/user/check_login_exists | login_id | Use generic error handling | |


