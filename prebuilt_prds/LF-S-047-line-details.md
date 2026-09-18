# PRD: LF-S-047 - Line Details

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Line Details                                                                     |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-04                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-047 - Line Details](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791378539/PRD+LF-S-047+-+Line+Details) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Line Details screen is where the group admin reviews a selected line. The group admin is the user who invited the others to the group.

### b. Goals

- Review a selected line

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
| AC-01 | The Line Details screen is shown                                                               | The user views the screen                 | - Page title "Line details" is shown<br>- Name is shown<br>- Number is shown<br>- Plans, Balances, and Usage History are shown as collapsible sections |
| AC-02 | The Line Details screen is shown and the Plans section is open. A base plan is the plan and the data sold together with that line’s SIM | The user views the base plan              | - The name of that line’s base plan is shown<br>- **Change plan** is shown next to the base plan and can be selected |
| AC-03 | The Line Details screen is shown and the Plans section is open                                 | The user views the add-ons                | - Each add-on name of that line is shown<br>- **Buy add-ons** is shown next to the add-ons and can be selected |
| AC-04 | The Line Details screen is shown and the Balances section is open                              | The user views the Balances section       | - **Local** and **Roaming** are shown and can be selected<br>- **Local** is selected by default<br>- **Data**, **Call**, and **SMS** are shown for the selected option |
| AC-05 | The Line Details screen is shown, the Balances section is open, **Local** or **Roaming** is selected, and a balance type has at least one remaining balance for the selected option | The user views that balance type          | Each remaining balance is shown with the original offer name, how much is left, and the original quota                                                              |
| AC-06 | The Line Details screen is shown, the Balances section is open, and **Local** or **Roaming** is selected | The user selects the other option         | Remaining balances for the newly selected option are shown                                                                                                               |
| AC-07 | The Line Details screen is shown and the Usage History section is open                         | The user views the Usage History section  | - **Data** is shown and can be selected<br>- **Call** is shown and can be selected<br>- **SMS** is shown and can be selected<br>- **Data** is selected by default |
| AC-08 | The Line Details screen is shown, the Usage History section is open, **Data** is selected, and usage records are shown | The user views a usage record             | "**x** GB used" is shown, where **x** is the usage with 2 decimal points, and the date when the usage happened is shown                                       |
| AC-09 | The Line Details screen is shown, the Usage History section is open, **Call** is selected, and usage records are shown | The user views a usage record             | "**x** MIN used" is shown, where **x** is the usage, and the date when the usage happened is shown                                                            |
| AC-10 | The Line Details screen is shown, the Usage History section is open, **SMS** is selected, and usage records are shown | The user views a usage record             | "**x** SMS used" is shown, where **x** is the usage, and the date when the usage happened is shown                                                            |
| AC-11 | A usage record is shown                                                                        | The user views the record date            | The date uses the shared date format                                                                                                                          |
| AC-12 | The Line Details screen is shown, the Usage History section is open, and usage records are shown | The user views the usage records          | Usage records are shown, newest first                                                                                                                         |
| AC-13 | The Line Details screen is shown and the Usage History section is open                         | The user selects a different tab          | Usage records for that line on the newly selected tab are shown                                                                                               |
| AC-14 | The Line Details screen is shown, the Plans section is open, and **Buy add-ons** is shown  | The user selects **Buy add-ons**      | The user is taken to Offer list (LF-S-017) for data offers and starts Shop Purchase (LF-J-003) |
| AC-15 | The Line Details screen is shown, the Plans section is open, and **Change plan** is shown | The user selects **Change plan**     | The user is taken to Base Plans (LF-S-035) and starts Base Plan Management (LF-J-010) |


## 6. Edge cases & error cases


| ID    | Case (category)                      | Trigger / entry                                                          | Expected behavior (observable)                                              | Exit / recovery           |
| ----- | ------------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------- |
| EC-01 | Error — get base plan fails          | The Plans section is open and get base plan fails | The base plan name is not shown. **Change plan** is not shown. The Plans section remains open | The user stays on Line Details |
| EC-02 | Edge — no add-ons                    | The Plans section is open and that line has no add-ons                   | No add-ons are shown. **Buy add-ons** remains shown and can be selected. The Plans section remains open | The user stays on Line Details |
| EC-03 | Edge — no remaining balances for a balance type | The Balances section is open, **Local** or **Roaming** is selected, and a balance type has no remaining balances for the selected option | No remaining balances are shown for that balance type                                  | The user stays on Line Details |
| EC-04 | Error — get balance API fails        | The Balances section is open and the get balance API fails               | Placeholder "--" is shown for how much is left and original quota          | The user stays on Line Details |
| EC-05 | Edge — no records for the selected tab | The Usage History section is open and the selected tab has no usage records | - **Data:** "No data usage found." is shown<br>- **Call:** "No call usage found." is shown<br>- **SMS:** "No SMS usage found." is shown | The user stays on Line Details |
| EC-06 | Edge — no usage history              | The Usage History section is open and that line has no usage records     | Tabs are not shown. "No usage history found." is shown                      | The user stays on Line Details |


## 7. Data Mapping

N / A
