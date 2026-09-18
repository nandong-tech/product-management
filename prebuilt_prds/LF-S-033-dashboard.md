# PRD: LF-S-033 - Dashboard

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value          |
| -------------------- | -------------- |
| Feature              | Dashboard |
| Channels             | App + Web      |
| Status (owning team) | PM — drafting  |
| Owner (PM)           | Nan Dong       |
| Contributors         | Nan Dong       |
| Created              | 2026-09-01     |
| Last updated         | 2026-09-10      |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-033 - Dashboard](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791313037/PRD+LF-S-033+-+Dashboard) |
| Jira                 | —              |
| API Spec             | N / A          |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Dashboard screen is where the logged-in user sees their first name, mobile number, and local and roaming data, call, and SMS balances, shared data, call, and SMS group balances on a family plan, can buy add-ons, can transfer remaining balances, and can open my plan, referral, usage history, my vouchers, line management, inbox, and wallet.

### b. Goals

- Check their balances
- Redirect to other account management sections

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                                                        | When                                                                         | Then                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Dashboard screen is shown                                                                                                           | The user views the screen                                                    | - The first name and mobile number section is shown<br>- The service balances section is shown<br>- The entry points section is shown                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| AC-02 | The Dashboard screen is shown                                                                                                           | The user views the first name and mobile number section                      | - The user's first name is shown<br>- The user's mobile number is shown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| AC-03 | The Dashboard screen is shown                                                                                                           | The user views the service balances section                                  | - **Local** and **Roaming** are shown and can be selected<br>- **Local** is selected by default<br>- Aggregated **Data**, **Call**, and **SMS** balances for the selected option are shown<br>- A control to view detailed balances is shown and can be selected for each of those balance types<br>- **Buy add-ons** is shown and can be selected<br>- **Transfer balance** is shown and can be selected |
| AC-04 | The Dashboard screen is shown and the user has a family plan                                                                            | The user views the service balances section                                  | - The **Shared** section is shown above the user's own balances<br>- Aggregated **Data**, **Call**, and **SMS** group balances for the selected option are shown<br>- A control to view detailed balances is shown and can be selected for each of those balance types |
| AC-05 | The Dashboard screen is shown, **Local** or **Roaming** is selected, and a balance type in **Shared** or in the user's own balances has at least one remaining balance for the selected option | The user selects the control to view detailed balances for that balance type | - The detailed balances popup is shown<br>- Each remaining balance for that balance type for the selected option is shown with the original offer name, how much is left, and the original quota<br>- A control to close the popup is shown and can be selected |
| AC-06 | The detailed balances popup is shown                                                                                                         | The user selects the control to close the popup                              | - The popup is closed<br>- The user stays on Dashboard |
| AC-07 | The Dashboard screen is shown                                                                                                           | The user selects **Buy add-ons**                                              | The user is taken to Offer list (LF-S-017) for data offers |
| AC-08 | The Dashboard screen is shown                                                                                                           | The user selects **Transfer balance**                                         | The user is taken to Line Management (LF-S-045) to select a line from the list |
| AC-09 | The Dashboard screen is shown                                                                                                           | The user views the entry points section                                      | - **My Plan** is shown and can be selected<br>- **Referral** is shown and can be selected<br>- **Usage history** is shown and can be selected<br>- **My Vouchers** is shown and can be selected<br>- **Line management** is shown and can be selected<br>- **Inbox** is shown and can be selected<br>- **Wallet** is shown and can be selected |
| AC-10 | The Dashboard screen is shown                                                                                                           | The user selects **My Plan**                                                 | The user is taken to My Plan (LF-S-034) |
| AC-11 | The Dashboard screen is shown                                                                                                           | The user selects **Referral**                                                | The user is taken to Referral (LF-S-036) |
| AC-12 | The Dashboard screen is shown                                                                                                           | The user selects **Usage history**                                           | The user is taken to Usage History (LF-S-037) |
| AC-13 | The Dashboard screen is shown                                                                                                           | The user selects **My Vouchers**                                             | The user is taken to My Vouchers (LF-S-038) |
| AC-14 | The Dashboard screen is shown                                                                                                           | The user selects **Line management**                                         | The user is taken to Line Management (LF-S-045) |
| AC-15 | The Dashboard screen is shown                                                                                                           | The user selects **Inbox**                                                   | The user is taken to Inbox (LF-S-042) |
| AC-16 | The Dashboard screen is shown                                                                                                           | The user selects **Wallet**                                                  | The user is taken to Wallet (LF-S-050) |


## 6. Edge cases & error cases


| ID    | Case (category)                      | Trigger / entry                                                                                                                     | Expected behavior (observable)                                                                                                                                                                                             | Exit / recovery                  |
| ----- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| EC-01 | Error — get balance API fails        | The Dashboard screen is shown and the get balance API fails                                                                    | Placeholder "--" is shown for the aggregated **Data**, **Call**, and **SMS** balances for the selected option, including in **Shared** when the user has a family plan. If the detailed balances popup is shown, placeholder "--" is shown for how much is left and original quota | The user stays on Dashboard |
| EC-02 | Edge — no remaining balances for a balance type | The Dashboard screen is shown, **Local** or **Roaming** is selected, and a balance type has no remaining balances for the selected option | That balance type is shown with **0**                                                                                                                                                                                      | The user stays on Dashboard |


## 7. Data Mapping

N / A
