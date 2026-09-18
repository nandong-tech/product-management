# PRD: LF-S-040 - Redeem a Voucher

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Redeem a Voucher                                                                 |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-040 - Redeem a Voucher](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7787085845/PRD+LF-S-040+-+Redeem+a+Voucher) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Redeem a voucher screen is where the logged-in user enters a voucher code to redeem it.

### b. Goals

- Redeem a voucher

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                         | When                         | Then                                                                                                                                                          |
| ----- | --------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Redeem a voucher screen is shown                                                          | The user views the screen    | - Helper text "Enter your code below to redeem your reward." is shown<br>- The **Voucher Code** field is shown<br>- **Redeem** is shown and can be selected         |
| AC-02 | The Redeem a voucher screen is shown, **Voucher Code** is filled, and the voucher code can be redeemed | The user selects **Redeem**  | The user is taken to Redemption Success (LF-S-041)                                                                                                            |


## 6. Edge cases & error cases


| ID    | Case (category)                    | Trigger / entry                                                                                         | Expected behavior (observable)                                                                                          | Exit / recovery                                      |
| ----- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| EC-01 | Error — voucher code already used  | The user selects **Redeem** with a voucher code that has already been used                              | - Message "This voucher code has been used." is shown<br>- **Got it** is shown and can be selected                | The user selects **Got it**. The message closes. The user stays on Redeem a voucher |
| EC-02 | Error — voucher code invalid       | The user selects **Redeem** with a voucher code that is invalid                                         | - Message "This voucher code is invalid. Please enter a valid code." is shown<br>- **Got it** is shown and can be selected | The user selects **Got it**. The message closes. The user stays on Redeem a voucher |


## 7. Data Mapping

N / A
