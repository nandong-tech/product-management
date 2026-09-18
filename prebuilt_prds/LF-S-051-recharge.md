# PRD: LF-S-051 - Recharge

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Recharge                                                                         |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-08                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-051 - Recharge](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791869974/PRD+LF-S-051+-+Recharge) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Recharge screen is where the logged-in user chooses a recharge amount and continues to pay.

### b. Goals

- Recharge for the wallet

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                               | When                                                   | Then                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----- | ------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Recharge screen is shown                                        | The user views the screen                              | - Page title "Recharge" is shown<br>- **Choose a recharge amount** is shown<br>- **$5**, **$10**, **$20**, and **$30** are shown and each can be selected<br>- Text "or enter custom amount" is shown<br>- **Enter recharge amount** is shown, is a number field, and is empty<br>- Text "Minimum recharge amount is $5" is shown<br>- **Recharge** is shown and can be selected |
| AC-02 | The Recharge screen is shown                                        | The user selects **$5**, **$10**, **$20**, or **$30**  | - That amount is selected<br>- **Enter recharge amount** shows that amount with a **$** sign                                                                                                                                                                                                                                                               |
| AC-03 | The Recharge screen is shown                                        | The user enters an amount in **Enter recharge amount** | **Enter recharge amount** shows that amount with a **$** sign                                                                                                                                                                                                                                                                                             |
| AC-04 | The Recharge screen is shown and all recharge validation has passed | The user selects **Recharge**                          | The user is taken to Payment (LF-J-014)                                                                                                                                                                                                                                                                                                                                                                |


## 6. Edge cases & error cases


| ID    | Case (category)                | Trigger / entry                                                                       | Expected behavior (observable)                                                      | Exit / recovery                                                                           |
| ----- | ------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| EC-01 | Error — below minimum recharge | The user leaves **Enter recharge amount** and the recharge amount is less than **$5** | - Message "Minimum recharge amount is $5" is shown<br>- **Recharge** does not continue | The user stays on Recharge. The user corrects **Enter recharge amount** and can try again |


## 7. Data Mapping

N / A