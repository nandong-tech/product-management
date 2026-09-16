# PRD: LF-S-001 - Welcome Page (Guest Landing)

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Welcome Page (Guest Landing)                                                                                               |
| Channels             | App + Web                                                                                                                  |
| Status (owning team) | PM — drafting                                                                                                              |
| Owner (PM)           | Nan Dong                                                                                                                   |
| Contributors         | Nan Dong                                                                                                                   |
| Created              | 2026-07-21                                                                                                                 |
| Last updated         | 2026-09-10  |
| Figma                | N / A                                                                                                                      |
| Jira                 | —                                                                                                                          |
| API Spec             | N / A                                                                                                                      |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope



### a. Central requirement

The Welcome page is the landing screen for guests who are not logged in, where they choose how to continue.

### b. Goals

- Show **Log in**, **Activate your SIM**, and **Shop now** as the guest’s primary next-step choices
- On tap or click, take the guest to the matching next flow or page
- Show the tenant-configured Welcome background, or the product default if none is configured

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
| AC-01 | The user is logged in | The user loads the app or comes to the web homepage | Welcome is not shown |
| AC-02 | The Welcome page is shown | The guest views the page | - **Log in** and **Activate your SIM** are shown and can be selected<br>- “Don’t have a SIM yet?” and **Shop now** are shown<br>- **Shop now** can be selected |
| AC-03 | A tenant Welcome background is configured | The Welcome page is shown | That configured background is displayed behind the content |
| AC-04 | No custom background is configured for the tenant | The Welcome page is shown | The product default background is displayed |
| AC-05 | The Welcome page is shown | The guest selects **Log in** | The guest is taken to Login (LF-S-016) |
| AC-06 | The Welcome page is shown | The guest selects **Activate your SIM** | The guest is taken to Activation — enter number (LF-S-005) |
| AC-07 | The Welcome page is shown | The guest selects **Shop now** | The guest is taken to Offer list (LF-S-017) for SIM offers |




## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — resource load | Configured Welcome background fails to load | The product default background is shown; **Log in**, **Activate your SIM**, and **Shop now** remain usable | Guest continues on Welcome |




## 7. Data Mapping

N / A