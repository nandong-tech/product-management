# PRD: LF-S-005 - Activation — Enter Number

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Title, reminder, and eligibility copy from design |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                     |
| -------------------- | ------------------------- |
| Feature              | Activation — Enter Number |
| Channels             | App + Web                 |
| Status (owning team) | PM — drafting             |
| Owner (PM)           | Nan Dong                  |
| Contributors         | Nan Dong                  |
| Created              | 2026-07-30                |
| Last updated         | 2026-09-11 |
| Figma                | [Prebuilt Page Templates — Enter Number](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=45-2547&m=dev) |
| Jira                 | —                         |
| API Spec             | N / A                     |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The enter-number screen is where the user enters their mobile number to start activating their account.

### b. Goals

- Enter a mobile number to continue
- See physical SIM and eSIM setup reminders
- See how to find the number (pSIM / eSIM)

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The enter-number screen is shown | The user views the screen | - Title "Enter mobile number" is shown<br>- The mobile number field is shown<br>- **Next** is shown<br>- **Where can I find this?** is shown and can be clicked<br>- "Make sure your SIM is ready. Physical SIM: Insert it. eSIM: Set it up on your device." is shown |
| AC-02 | The enter-number screen is shown | The user clicks **Where can I find this?** | - Find-number help is shown with **pSIM** and **eSIM**<br>- **pSIM** (default): image of the SIM bed with the number location indicated, and "Your number can be found on the top portion of your SIM bed."<br>- **eSIM**: image of the order confirmation / eSIM voucher with the number location indicated, and "The number can be found in the order confirmation sent to your email upon purchase."<br>- **Got it** closes the help and returns to the enter-number screen |
| AC-03 | The enter-number screen is shown | The user enters a valid mobile number whose state is correct for activation and selects **Next** | The user is taken to OTP verification (LF-S-004) |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — expired SIM | The user enters a number for an expired SIM and selects **Next** | - Title "SIM expired" is shown<br>- Message "Sorry, your SIM is expired. Buy a new SIM and try again." is shown<br>- **Get a SIM** and **Back** are shown | - **Get a SIM** takes the user to Offer list (LF-S-017) for SIM offers<br>- **Back** closes the message and the user stays on the enter-number screen |
| EC-02 | Error — number not in operator pool | The user enters a number that is not in the operator’s number pool (not a number from the current operator) and selects **Next** | The inline message "The number you entered is not valid. Check the number and try again." is shown on the mobile number field | The user can correct the number and select **Next** again |
| EC-03 | Error — replacement SIM only | The user enters a number intended for SIM replacement only and selects **Next** | - Title "SIM replacement required" is shown<br>- Message "The number you entered is intended for SIM replacement only. Log in with your original number and request a SIM replacement from the Account section." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the enter-number screen |
| EC-04 | Error — SIM already activated | The user enters a number for a SIM that is already activated and selects **Next** | - Title "SIM already activated" is shown<br>- Message "Your SIM is activated already! Log in with your PIN to get started." is shown<br>- **Log in** and **Back** are shown | - **Log in** takes the user to Login (LF-S-016)<br>- **Back** closes the message and the user stays on the enter-number screen |


## 7. Data Mapping

N / A
