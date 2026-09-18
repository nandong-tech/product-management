# PRD: LF-S-031 - PIN Successfully Updated

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | PIN Successfully Updated                                                                           |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-08-31                                                                                         |
| Last updated         | 2026-09-10 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-031 - PIN Successfully Updated](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747666028/PRD+LF-S-031+-+PIN+Successfully+Updated) |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The PIN successfully updated screen is where the user sees that their login PIN was reset and can go to log in.

### b. Goals

- See that the PIN was reset
- Go to log in

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                      | When                          | Then                                                                                                                                          |
| ----- | ------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The PIN successfully updated screen is shown | The user views the screen     | - A success confirmation is shown<br>- Text "Your PIN was successfully reset" is shown<br>- **Log in** is shown and can be selected |
| AC-02 | The PIN successfully updated screen is shown | The user selects **Log in**   | The user is taken to Login (LF-S-016)                                                                                                         |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
