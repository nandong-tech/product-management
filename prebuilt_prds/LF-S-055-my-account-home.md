# PRD: LF-S-055 - My Account Home

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field                | Value          |
| -------------------- | -------------- |
| Feature              | My Account Home |
| Channels             | App + Web      |
| Status (owning team) | PM — drafting  |
| Owner (PM)           | Nan Dong       |
| Contributors         | Nan Dong       |
| Created              | 2026-09-15     |
| Last updated         | 2026-09-15     |
| Figma                | TBD            |
| Jira                 | —              |
| API Spec             | N / A          |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The My Account Home screen is where the logged-in user sees their first name and mobile number and can open account management sections.

### b. Goals

- See their name and mobile number
- Open account management sections

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID    | Given                               | When                                     | Then                                                                                                                                                                                                 |
| ----- | ----------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The My Account Home screen is shown | The user views the screen                | - The user's first name is shown<br>- The user's mobile number is shown<br>- The account menus section is shown                                                                                     |
| AC-02 | The My Account Home screen is shown | The user views the account menus section | - **User Profile** is shown and can be selected<br>- **Update PIN** is shown and can be selected<br>- **Saved Addresses** is shown and can be selected<br>- **Transaction History** is shown and can be selected<br>- **SIM Swap** is shown and can be selected<br>- **Port in** is shown and can be selected |
| AC-03 | The My Account Home screen is shown | The user selects **User Profile**        | The user is taken to User Profile (PRD TBD)                                                                                                                                                          |
| AC-04 | The My Account Home screen is shown | The user selects **Update PIN**          | The user is taken to Reset PIN (LF-J-007)                                                                                                                                                            |
| AC-05 | The My Account Home screen is shown | The user selects **Saved Addresses**     | The user is taken to Saved Address Management (LF-J-004)                                                                                                                                             |
| AC-06 | The My Account Home screen is shown | The user selects **Transaction History** | The user is taken to Transaction History (PRD TBD)                                                                                                                                                   |
| AC-07 | The My Account Home screen is shown | The user selects **SIM Swap**            | The user is taken to SIM Swap (PRD TBD)                                                                                                                                                              |
| AC-08 | The My Account Home screen is shown | The user selects **Port in**             | The user is taken to Port in (PRD TBD)                                                                                                                                                               |

## 6. Edge cases & error cases

| ID    | Case (category)                              | Trigger / entry                                                                 | Expected behavior (observable)                                                                 | Exit / recovery                    |
| ----- | -------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------- |
| EC-01 | Edge — missing first name or mobile number   | The My Account Home screen is shown and the first name or the mobile number is missing | That field is not shown. The rest of My Account Home remains shown.                            | The user stays on My Account Home |

## 7. Data Mapping

N / A
