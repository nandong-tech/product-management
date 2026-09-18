# PRD: LF-S-045 - Line Management

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Line Management                                                                  |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-04                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-045 - Line Management](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791378519/PRD+LF-S-045+-+Line+Management) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Line Management screen is where the logged-in user reviews their lines or selects a line to transfer. The group admin is the user who invited the others to the group.

### b. Goals

- Review and manage their lines
- Select a line to transfer

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                          | When                                      | Then                                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Line Management screen is shown                                                            | The user views the screen                 | The line list is shown and does not include the user's own line |
| AC-02 | The Line Management screen is shown in Line Management (LF-J-011)                              | The user views the screen                 | Page title "Line management" is shown |
| AC-03 | The Line Management screen is shown in Balance Transfer (LF-J-013) | The user views the screen                 | Page title "Select a line" is shown |
| AC-04 | The Line Management screen is shown and a line is shown                                        | The user views that line                  | - The first name and last name are shown<br>- The mobile number is shown and uses the shared MSISDN format |
| AC-05 | The Line Management screen is shown, a line was added, the invitation has not been accepted, and 24 hours have not ended | The user views that line                  | - That line is shown<br>- The pending state is shown                                                                                                          |
| AC-06 | The Line Management screen is shown, the group admin's line is shown, and the user is not the group admin | The user views the group admin's line     | A group admin indicator is shown on that line                                                                                                                 |
| AC-07 | The Line Management screen is shown in Line Management (LF-J-011), and the user is the group admin or the user does not belong to a group yet | The user views the screen                 | **Add a new line** is shown and can be selected                                                                                                               |
| AC-08 | The Line Management screen is shown and **Add a new line** is shown                            | The user selects **Add a new line**       | The user is taken to Add a New Line (LF-S-046)                                                                                                                 |
| AC-09 | The Line Management screen is shown in Line Management (LF-J-011), a line is shown whose invitation has been accepted, the user is the group admin, and this is the app | The user swipes that line                 | - **Delete** is shown and can be selected<br>- **Transfer admin** is shown and can be selected |
| AC-10 | The Line Management screen is shown in Line Management (LF-J-011), a line is shown whose invitation has been accepted, the user is the group admin, and this is web | The user hovers that line                 | - A trash control is shown and can be selected<br>- **Transfer admin** is shown and can be selected |
| AC-11 | The Line Management screen is shown and **Delete** or the trash control is shown               | The user selects **Delete** or the trash control | - A confirmation is shown<br>- Message "Are you sure you want to remove first name last name (mobile number)?" is shown, using that line’s first name, last name, and mobile number<br>- **Confirm** is shown and can be selected<br>- **Cancel** is shown and can be selected |
| AC-12 | The Line Management screen is shown and the remove confirmation is shown                       | The user selects **Cancel**               | - The confirmation is closed<br>- The line remains<br>- The user stays on Line Management                                                                     |
| AC-13 | The Line Management screen is shown and the remove confirmation is shown                       | The user selects **Confirm**              | - The confirmation is closed<br>- The line is removed<br>- The user stays on Line Management                                                                   |
| AC-14 | The Line Management screen is shown and **Transfer admin** is shown                            | The user selects **Transfer admin**       | - A confirmation is shown<br>- Message "Are you sure you want to transfer the group admin to first name last name (mobile number)?" is shown, using that line’s first name, last name, and mobile number<br>- **Confirm** is shown and can be selected<br>- **Cancel** is shown and can be selected |
| AC-15 | The Line Management screen is shown and the transfer admin confirmation is shown               | The user selects **Cancel**               | - The confirmation is closed<br>- The group admin does not change<br>- The user stays on Line Management                                                       |
| AC-16 | The Line Management screen is shown and the transfer admin confirmation is shown               | The user selects **Confirm**              | - The confirmation is closed<br>- That line is the group admin<br>- A group admin indicator is shown on that line<br>- The user stays on Line Management         |
| AC-17 | The Line Management screen is shown in Line Management (LF-J-011), a line is shown whose invitation has been accepted, and the user is the group admin | The user selects that line                | The user is taken to Line Details (LF-S-047)                                                                                                                  |
| AC-18 | The Line Management screen is shown in Line Management (LF-J-011), a line is shown whose invitation has not been accepted and 24 hours have not ended, and the user is the group admin | The user selects that line                | The user stays on Line Management                                                                                                                             |
| AC-19 | The Line Management screen is shown in Line Management (LF-J-011), a line is shown, and the user is not the group admin | The user selects that line                | The user stays on Line Management                                                                                                                             |
| AC-20 | The Line Management screen is shown in Balance Transfer (LF-J-013), and a line is shown whose invitation has been accepted | The user selects that line                | The user is taken to Balance Transfer (LF-S-053)                                                                                                               |
| AC-21 | The Line Management screen is shown in Balance Transfer (LF-J-013), and a line is shown whose invitation has not been accepted and 24 hours have not ended | The user selects that line                | The user stays on Line Management                                                                                                                             |


## 6. Edge cases & error cases


| ID    | Case (category)              | Trigger / entry                                                          | Expected behavior (observable)                                              | Exit / recovery           |
| ----- | ---------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------- |
| EC-01 | Edge — missing line field    | A line is shown and the first name, last name, or mobile number is missing | That field is not shown. The line remains shown                             | The user stays on Line Management |
| EC-02 | Edge — invitation expired    | A line was added, the invitation was not accepted, and 24 hours have ended | That line is not shown                                                                                            | The user stays on Line Management |
| EC-03 | Edge — no lines              | The user has no lines other than their own line, and the Line Management screen is shown in Line Management (LF-J-011) | - Page title "Line management" is shown<br>- No lines are shown<br>- **Add a new line** is shown and can be selected | The user stays on Line Management |
| EC-04 | Edge — no lines from transfer | The user has no lines other than their own line, and the Line Management screen is shown in Balance Transfer (LF-J-013) | - Page title "Select a line" is shown<br>- No lines are shown | The user stays on Line Management |
| EC-05 | Error — pending line cannot be deleted or transfer admin | A line is shown whose invitation has not been accepted and 24 hours have not ended, and the user swipes that line or hovers that line | - The line remains<br>- The group admin does not change<br>- The user stays on Line Management | The user stays on Line Management |


## 7. Data Mapping

N / A
