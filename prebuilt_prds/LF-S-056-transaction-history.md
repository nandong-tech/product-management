# PRD: LF-S-056 - Transaction History

## 1. Change Log


| Date       | Change                      | Owner    | Rationale                               |
| ---------- | --------------------------- | -------- | --------------------------------------- |
| 2026-09-16 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |
| 2026-09-17 | Updated on Confluence       | Nan Dong | Take wiki AC-02; AC-01 transactions wording |


## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Transaction History                                                                                                                                                                                                                                                                                           |
| Channels             | App + Web                                                                                                                                                                                                                                                                                                     |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                                 |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Created              | 2026-09-16                                                                                                                                                                                                                                                                                                    |
| Last updated         | 2026-09-17                                                                                                                                                                                                                                                                                                    |
| Figma                | N / A                                                                                                                                                                                                                                                                                                         |
| Jira                 | —                                                                                                                                                                                                                                                                                                             |
| API Spec             | N / A                                                                                                                                                                                                                                                                                                         |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The Transaction History screen is where the logged-in user reviews their transactions and filters them by category.

### b. Goals

- Review their transactions



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                              | When                                | Then                                                                                                                                                                                   |
| ----- | ------------------------------------------------------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Transaction History screen is shown                            | The user views the screen           | - Page title "Transaction history" is shown<br>- **All**, **SIM offers**, and **Data offers** are shown and can be selected<br>- **All** is selected by default<br>- The transactions are shown |
| AC-02 | The Transaction History screen is shown and a transaction is shown | The user views that transaction     | - The transaction amount is shown<br>- The images of the purchase items are shown<br>- If there are more than 3 items purchased in one order and cannot fit in one row, we can hide the rest of the images<br>- The transaction date is shown and uses the shared date format<br>- The transaction time is shown |
| AC-03 | The Transaction History screen is shown                            | The user views the transaction list | Transactions are shown by time, newest first                                                                                                                                           |
| AC-04 | The Transaction History screen is shown                            | The user selects **SIM offers**     | Only SIM offer transactions are shown                                                                                                                                                  |
| AC-05 | The Transaction History screen is shown                            | The user selects **Data offers**    | Only data offer transactions are shown                                                                                                                                                 |
| AC-06 | The Transaction History screen is shown                            | The user selects **All**            | SIM offer and data offer transactions are shown                                                                                                                                        |
| AC-07 | The Transaction History screen is shown and a transaction is shown | The user selects that transaction   | The user is taken to Transaction detail (PRD TBD)                                                                                                                                      |




## 6. Edge cases & error cases


| ID    | Case (category)                                  | Trigger / entry                                          | Expected behavior (observable) | Exit / recovery                       |
| ----- | ------------------------------------------------ | -------------------------------------------------------- | ------------------------------ | ------------------------------------- |
| EC-01 | Edge — no transactions for the selected category | The selected category has no transactions                | No transactions are shown      | The user stays on Transaction History |
| EC-02 | Edge — no transactions                           | The user has no SIM offer and no data offer transactions | No transactions are shown      | The user stays on Transaction History |




## 7. Data Mapping

N / A
