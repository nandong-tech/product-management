# PRD: LF-S-073 - Port out confirmation

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |


## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Port out confirmation                                                                                                                                                                                                                                                                                         |
| Channels             | App + Web                                                                                                                                                                                                                                                                                                     |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                                 |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Created              | 2026-10-13                                                                                                                                                                                                                                                                                                    |
| Last updated         | 2026-10-13                                                                                                                                                                                                                                                                                                    |
| Figma                | N / A                                                                                                                                                                                                                                                                                                         |
| Confluence           | [PRD: LF-S-073 - Port out confirmation](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7921795159/PRD+LF-S-073+-+Port+out+confirmation)                                                                                                                                                              |
| Jira                 | —                                                                                                                                                                                                                                                                                                             |
| API Spec             | N / A                                                                                                                                                                                                                                                                                                         |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The port-out confirmation screen is where the logged-in user confirms that their number will leave this operator.

### b. Goals

- Confirm that their number will leave this operator

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                            | When                         | Then                                                                                                                                                                                                                                                                                                                                                                          |
| ----- | -------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The port-out confirmation screen is shown                                                     | The user views the screen    | - Page title "Port out confirmation" is shown - The text "Your number will move to another operator." is shown - The text "Service on this number will end here." is shown - The text "Any remaining balance and add-ons on this number will no longer be available." is shown - A **Terms & Conditions** checkbox is shown and can be selected - **Confirm** is shown and can be selected |
| AC-02 | The port-out confirmation screen is shown and the **Terms & Conditions** checkbox is selected | The user selects **Confirm** | The user is taken to Port out result (LF-S-074)                                                                                                                                                                                                                                                                                                                                |




## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A