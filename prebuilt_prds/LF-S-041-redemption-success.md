# PRD: LF-S-041 - Redemption Success

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Redemption Success                                                                                 |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-09-03                                                                                         |
| Last updated         | 2026-09-10                                                                                          |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-041 - Redemption Success](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791509658/PRD+LF-S-041+-+Redemption+Success) |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Redemption success screen is where the logged-in user sees that a voucher was redeemed.

### b. Goals

- See that the voucher was redeemed

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                  | When                                    | Then                                                                                                                                                                                                 |
| ----- | -------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Redemption success screen is shown | The user views the screen               | - "Successful redemption!" is shown<br>- The redemption date is shown and uses the shared date format<br>- The redemption time is shown<br>- The redeemed item name is shown<br>- **Redeem another one** is shown and can be selected |
| AC-02 | The Redemption success screen is shown | The user selects **Redeem another one** | The user is taken to Redeem a Voucher (LF-S-040)                                                                                                                                                     |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
