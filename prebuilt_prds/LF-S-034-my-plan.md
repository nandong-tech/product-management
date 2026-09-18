# PRD: LF-S-034 - My Plan

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | My Plan                                                                          |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-04                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-034 - My Plan](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7792295937/PRD+LF-S-034+-+My+Plan) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The My Plan screen is where the logged-in user sees their base plan and can change plan. A base plan is the plan and the data sold together with their SIM.

### b. Goals

- View their base plan

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                              | When                                      | Then                                                                                                                                                          |
| ----- | -------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The My Plan screen is shown                        | The user views the screen                 | - Page title "My plan" is shown<br>- The name of the user's base plan is shown<br>- **Change plan** is shown and can be selected |
| AC-02 | The My Plan screen is shown and **Change plan** is shown | The user selects **Change plan**          | The user is taken to Base Plans (LF-S-035)                                                                                                                    |


## 6. Edge cases & error cases


| ID    | Case (category)          | Trigger / entry                                      | Expected behavior (observable)                                                                                      | Exit / recovery        |
| ----- | ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| EC-01 | Edge — missing base plan | The My Plan screen is shown and the user's base plan is missing | The base plan name is not shown. **Change plan** remains shown and can be selected | The user stays on My Plan |


## 7. Data Mapping

N / A
