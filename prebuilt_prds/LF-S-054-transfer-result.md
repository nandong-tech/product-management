# PRD: LF-S-054 - Transfer Result

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Transfer Result                                                                                    |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-07                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-054 - Transfer Result](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791902751/PRD+LF-S-054+-+Transfer+Result) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Transfer Result screen is where the logged-in user sees that remaining service balances or wallet balance were transferred.

### b. Goals

- See that remaining balances were transferred

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                      | When                                      | Then                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----- | ------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Transfer Result screen is shown        | The user views the screen                 | - Heading "Successful transfer" is shown<br>- **Transfer summary** is shown<br>- **Back to Home** is shown and can be selected                                                                                                                                                                                                                                                                                                                                       |
| AC-02 | The Transfer Result screen is shown        | The user views **Transfer summary**       | - The transfer date is shown and uses the shared date format<br>- The transfer time is shown<br>- Text "Transferred **x** **unit** to first name last name (mobile number)." is shown, where **x** is the transferred amount, **unit** is GB, calls, texts, or the shared project currency for the transferred unit, and first name, last name, and mobile number are the line that received the transfer<br>- The mobile number uses the shared MSISDN format<br>- The transaction number is shown<br>- **Balance transferred** is the transferred amount and unit<br>- **Remaining balance** is the logged-in user’s remaining balance for that unit after the transfer |
| AC-03 | The Transfer Result screen is shown        | The user selects **Back to Home**         | The user is taken to Dashboard (LF-S-033)                                                                                                                                                                                                                                                                                                                                                                                                                            |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
