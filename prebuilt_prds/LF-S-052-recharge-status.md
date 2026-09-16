# PRD: LF-S-052 - Recharge Status

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Recharge Status                                                                                    |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-08                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Recharge Status screen is where the logged-in user sees whether the recharge succeeded or failed.

### b. Goals

- See whether the recharge went through

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                          | When                          | Then                                                                                          |
| ----- | ------------------------------------------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------- |
| AC-01 | The Recharge Status screen is shown and the recharge succeeded                 | The user views the screen     | - A success message is shown<br>- **Back to Home** is shown and can be selected               |
| AC-02 | The Recharge Status screen is shown, the recharge succeeded, and **Back to Home** is shown | The user selects **Back to Home** | The user is taken to Dashboard (LF-S-033)                                                 |


## 6. Edge cases & error cases


| ID    | Case (category)        | Trigger / entry                                          | Expected behavior (observable)                                                      | Exit / recovery                                                                                      |
| ----- | ---------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| EC-01 | Error — recharge failed | The Recharge Status screen is shown and the recharge failed | - A recharge failed message is shown<br>- **Try again** is shown and can be selected | The user selects **Try again**. The user is taken to Recharge (LF-S-051) |


## 7. Data Mapping

N / A
