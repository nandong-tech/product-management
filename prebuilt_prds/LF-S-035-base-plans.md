# PRD: LF-S-035 - Base Plans

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Base Plans                                                                       |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-04                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Base Plans screen is where the user reviews base plans and can select a different plan. A base plan is the plan and the data sold together with a SIM.

### b. Goals

- Choose a base plan

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                | When                            | Then                                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Base Plans screen is shown and there is at least one base plan                   | The user views the screen       | - Page title "Base plans" is shown<br>- Base plans are shown                                                                                                                                         |
| AC-02 | The Base Plans screen is shown and a base plan is shown                              | The user views that plan        | - The plan image is shown<br>- The plan name is shown<br>- The renewal period configured on the offer is shown<br>- "**x** GB data" is shown, where **x** is the data amount<br>- "**y** mins" is shown, where **y** is the minutes amount<br>- "**z** SMS" is shown, where **z** is the SMS amount |
| AC-03 | The Base Plans screen is shown and a base plan that is not the current plan is shown | The user views that plan        | **Select** is shown and can be selected                                                                                                                                                              |
| AC-04 | The Base Plans screen is shown and the current plan is shown. The current plan is the base plan for the SIM being changed. When the user arrived from My Plan (LF-S-034), that SIM is the user's SIM. When the user arrived from Line Details (LF-S-047), that SIM is that line’s SIM | The user views the current plan | **current plan** is shown and cannot be selected                                                                                                                                                |
| AC-05 | The Base Plans screen is shown and **Select** is shown on a plan                     | The user selects **Select**     | The user is taken to Checkout (LF-S-021) with that plan                                                                                                                                              |


## 6. Edge cases & error cases


| ID    | Case (category)                        | Trigger / entry                                                                               | Expected behavior (observable)                                                                 | Exit / recovery              |
| ----- | -------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| EC-01 | Edge — no base plans                   | The Base Plans screen is shown and there are no base plans                                    | - Page title "Base plans" is shown<br>- No base plans are shown                                | The user stays on Base Plans |
| EC-02 | Edge — missing plan image              | A base plan is shown and the plan image is missing                                            | A placeholder image is shown. The rest of that plan remains shown                              | The user stays on Base Plans |
| EC-03 | Edge — missing plan name               | A base plan is shown and the plan name is missing                                             | The plan name is not shown. The rest of that plan remains shown                                | The user stays on Base Plans |
| EC-04 | Edge — missing renewal period          | A base plan is shown and the renewal period is not configured on the offer                    | The renewal period is not shown. The rest of that plan remains shown                           | The user stays on Base Plans |


## 7. Data Mapping

N / A
