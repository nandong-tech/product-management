# PRD: LF-S-055 - My Account Home

## Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## Header

| Field | Value |
| --- | --- |
| Feature | My Account Home |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-09-15 |
| Last updated | 2026-10-13 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | N / A |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-055 - My Account Home](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7810941054/PRD+LF-S-055+-+My+Account+Home) |
| Links (optional) | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The My Account Home screen is where the logged-in user sees their first name and mobile number and can open account management sections.

### Goals

- See their name and mobile number
- Open account management sections

### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria

| ID    | Given                               | When                                     | Then                                                                                                                                                                                                 |
| ----- | ----------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The My Account Home screen is shown | The user views the screen                | - The user's first name is shown<br>- The user's mobile number is shown<br>- The account menus section is shown                                                                                     |
| AC-02 | The My Account Home screen is shown | The user views the account menus section | - **User Profile** is shown and can be selected<br>- **Update PIN** is shown and can be selected<br>- **Saved Addresses** is shown and can be selected<br>- **Transaction History** is shown and can be selected<br>- **SIM swap** is shown and can be selected<br>- **Port in** is shown and can be selected<br>- **Port out** is shown and can be selected<br>- **Delete account** is shown and can be selected |
| AC-03 | The My Account Home screen is shown | The user selects **User Profile**        | The user is taken to User profile editing (LF-J-018)                                                                                                                                                 |
| AC-04 | The My Account Home screen is shown | The user selects **Update PIN**          | The user is taken to Reset PIN (LF-J-007)                                                                                                                                                            |
| AC-05 | The My Account Home screen is shown | The user selects **Saved Addresses**     | The user is taken to Saved Address Management (LF-J-004)                                                                                                                                             |
| AC-06 | The My Account Home screen is shown | The user selects **Transaction History** | The user is taken to Transaction History (LF-J-015)                                                                                                                                                  |
| AC-07 | The My Account Home screen is shown | The user selects **SIM swap**     | The user is taken to SIM Swap (LF-J-024)                                                                                                                                                      |
| AC-08 | The My Account Home screen is shown | The user selects **Port in**             | The user is taken to Port-in (LF-J-030)                                                                                                                                                 |
| AC-09 | The My Account Home screen is shown | The user selects **Port out**            | The user is taken to Port out (LF-J-034)                                                                                                                                                |
| AC-10 | The My Account Home screen is shown | The user selects **Delete account**      | The user is taken to Delete account (LF-J-019)                                                                                                                                                        |

## Edge cases & error cases

| ID    | Case (category)                              | Trigger / entry                                                                 | Expected behavior (observable)                                                                 | Exit / recovery                    |
| ----- | -------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------- |
| EC-01 | Edge — missing first name or mobile number   | The My Account Home screen is shown and the first name or the mobile number is missing | That field is not shown. The rest of My Account Home remains shown.                            | The user stays on My Account Home |

## Data Mapping

N / A
