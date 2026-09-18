# PRD: LF-S-037 - Usage History

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Usage History                                                                    |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-02                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-037 - Usage History](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7786037366/PRD+LF-S-037+-+Usage+History) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Usage History screen is where the logged-in user reviews historical data, call, and SMS usage.

### b. Goals

- Review historical usage by Data, Call, and SMS
- Review usage by month and year

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                       | When                                      | Then                                                                                                                                                                                                                                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The Usage History screen is shown                                                                           | The user views the screen                 | - Page title "Usage history" is shown<br>- The tabs section is shown<br>- The year and month filters section is shown<br>- The usage records section is shown                                                                                                                                 |
| AC-02 | The Usage History screen is shown                                                                           | The user views the tabs                   | - **Data** is shown and can be selected<br>- **Call** is shown and can be selected<br>- **SMS** is shown and can be selected<br>- **Data** is selected by default                                                                                                                                        |
| AC-03 | The Usage History screen is shown                                                                           | The user views the year and month filters | - The current year and the current month are selected<br>- This filter filters results for all balance types                                                                                                                                                                |
| AC-04 | The Usage History screen is shown, **Data** is selected, and usage records are shown for the selected month | The user views a usage record             | "**x** GB used" is shown, where **x** is the usage with 2 decimal points, and the date when the usage happened is shown                                                                                                                                                              |
| AC-05 | The Usage History screen is shown, **Call** is selected, and usage records are shown for the selected month | The user views a usage record             | "**x** MIN used" is shown, where **x** is the usage, and the date when the usage happened is shown                                                                                                                                                                                   |
| AC-06 | The Usage History screen is shown, **SMS** is selected, and usage records are shown for the selected month  | The user views a usage record             | "**x** SMS used" is shown, where **x** is the usage, and the date when the usage happened is shown                                                                                                                                                                                   |
| AC-07 | A usage record is shown                                                                                     | The user views the record date            | The date uses the shared date format                                                                                                                                                                                                                                                 |
| AC-08 | The Usage History screen is shown and usage records are shown for the selected month                        | The user views the usage records          | Usage records are shown, newest first                                                                                                                                                                                                                                                |
| AC-09 | The Usage History screen is shown                                                                           | The user selects a different tab          | - The selected year and month remain<br>- Usage records for that year and month on the newly selected tab are shown                                                                                                                                                                     |
| AC-10 | The Usage History screen is shown                                                                           | The user views the year options           | The year options start from the year the user finished account registration through the current year                                                                                                                                                                                 |
| AC-11 | The Usage History screen is shown and a year is selected                                                    | The user views the month options          | - Months before the month the user finished account registration cannot be selected<br>- When the selected year is the current year, months after the current month cannot be selected<br>- When the selected year is not the current year, months after the current month can be selected |


## 6. Edge cases & error cases


| ID    | Case (category)                          | Trigger / entry                                                        | Expected behavior (observable)                                                                                                                                                                                                                                                       | Exit / recovery                                                                                   |
| ----- | ---------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| EC-01 | Edge — no records for the selected month | The selected tab has no usage records for the selected month           | - **Data:** "No data usage found." is shown, with helper text "Try selecting another month."<br>- **Call:** "No call usage found." is shown, with helper text "Try selecting another month."<br>- **SMS:** "No SMS usage found." is shown, with helper text "Try selecting another month." | The user selects a different month that has records. The user stays on Usage History              |
| EC-02 | Edge — no usage history                  | The user has no usage records and no active Data, Call, or SMS service | Tabs are not shown. "No usage history found." is shown                                                                                                                                                                                                                               | The user stays on Usage History                                                                   |
| EC-03 | Error — get usage history fails          | The Usage History screen is shown and get usage history fails          | Message "Something went wrong. Please try again later" is shown. **Try Again** is shown and can be selected                                                                                                                                                                          | The user selects **Try Again**. Usage history is requested again. The user stays on Usage History |


## 7. Data Mapping

N / A