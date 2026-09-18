# PRD: LF-S-002 - Header

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value         |
| -------------------- | ------------- |
| Feature              | Header        |
| Channels             | App + Web     |
| Status (owning team) | PM — drafting |
| Owner (PM)           | Nan Dong      |
| Contributors         | Nan Dong      |
| Created              | 2026-07-23    |
| Last updated         | 2026-09-10  |
| Figma                | N / A         |
| Confluence           | [PRD: LF-S-002 - Header](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7629832492/PRD+LF-S-002+-+Header) |
| Jira                 | —             |
| API Spec             | N / A         |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The header is the persistent top bar shown on pages for logged-in and not-logged-in users, with the product logo, a cart icon next to the menu control, and an expandable navigation menu. When logged in, the menu shows account menu items and Log out. When not logged in, the menu shows **Log in** and **Activate your SIM**.

### b. Goals

- See a header on pages (logged in or not logged in)
- Expand and collapse the navigation menu
- Open Shopping Cart

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
| AC-01 | The header is shown and the menu is closed | The user views the header | - The product logo is shown<br>- A cart icon is shown next to the control to open the menu and can be selected<br>- A control to open the menu is shown and can be selected |
| AC-02 | The user is logged in, the header is shown, and the menu is closed | The user selects the control to open the menu | - The menu is shown<br>- **My Account**, **Settings**, **Shop Plans**, **Line management**, **Help & Support**, and **Log out** are shown<br>- **Log out** can be selected<br>- **Shop Plans** can be selected<br>- **Line management** can be selected |
| AC-03 | The user is logged in and the menu is shown | The user selects **Shop Plans** | The user is taken to Shop landing page (LF-S-028) |
| AC-04 | The user is logged in and the menu is shown | The user selects **Line management** | The user is taken to Line Management (LF-S-045) |
| AC-05 | The user is logged in and the menu is shown | The user expands **Settings** | **My Profile**, **Manage Users**, and **Preferences** are shown |
| AC-06 | The user is logged in and **Settings** is expanded | The user collapses **Settings** | **My Profile**, **Manage Users**, and **Preferences** are not shown |
| AC-07 | The user is logged in and the menu is shown | The user expands **My Account** | **Reset PIN** is shown and can be selected |
| AC-08 | The user is logged in and **My Account** is expanded | The user collapses **My Account** | **Reset PIN** is not shown |
| AC-09 | The user is logged in, the menu is shown, and **Reset PIN** is shown | The user selects **Reset PIN** | The user is taken to Enter Existing PIN (LF-S-032) and starts Reset PIN (LF-J-007) |
| AC-10 | The user is logged in and the menu is shown | The user selects the control to close the menu | The menu is closed |
| AC-11 | The user is logged in and the menu is shown | The user selects **Log out** | A prompt asks the user to confirm log out |
| AC-12 | The log-out prompt is shown | The user selects **No** (or cancel) | - The prompt is closed<br>- The user is still logged in and the header is still shown |
| AC-13 | The log-out prompt is shown | The user selects **Yes** (or confirm) | - The user is logged out<br>- The user is taken to Welcome (LF-S-001) |
| AC-14 | The user is not logged in, the header is shown, and the menu is closed | The user selects the control to open the menu | - The menu is shown<br>- **Log in** and **Activate your SIM** are shown<br>- **My Account**, **Settings**, **Shop Plans**, **Line management**, **Help & Support**, and **Log out** are not shown |
| AC-15 | The user is not logged in and the menu is shown | The user selects **Log in** | The user is taken to Login (LF-S-016) |
| AC-16 | The user is not logged in and the menu is shown | The user selects **Activate your SIM** | The user is taken to Create account (LF-J-001), starting at Activation — enter number (LF-S-005) |
| AC-17 | The user is not logged in and the menu is shown | The user selects the control to close the menu | The menu is closed |
| AC-18 | The header is shown | The user selects the cart icon | The user is taken to Shopping Cart (LF-S-020) |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
