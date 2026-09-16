# PRD: LF-S-050 - Wallet

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Wallet                                                                           |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-08                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The Wallet screen is where the logged-in user reviews their wallet balance and continues to recharge or transfer.

### b. Goals

- Review their wallet balance



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                               | When                          | Then                                                                                                                                                        |
| ----- | --------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Wallet screen is shown                          | The user views the screen     | - Page title "Wallet" is shown<br>- The balance in wallet is shown with a **$** sign<br>- **Recharge** is shown and can be selected<br>- **Transfer** is shown and can be selected |
| AC-02 | The Wallet screen is shown and **Recharge** is shown | The user selects **Recharge** | The user is taken to Recharge (LF-S-051)                                                                                                                    |
| AC-03 | The Wallet screen is shown and **Transfer** is shown | The user selects **Transfer** | The user is taken to Line Management (LF-S-045)                                                                                                             |




## 6. Edge cases & error cases


| ID    | Case (category)               | Trigger / entry                                          | Expected behavior (observable)                      | Exit / recovery          |
| ----- | ----------------------------- | -------------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| EC-01 | Error — get balance API fails | The Wallet screen is shown and the get balance API fails | Placeholder "--" is shown for the balance in wallet | The user stays on Wallet |




## 7. Data Mapping

N / A