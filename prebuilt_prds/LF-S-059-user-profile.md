# PRD: LF-S-059 - User Profile

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |


## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | User Profile                                                                                                                                                                                                                                                                                                  |
| Channels             | App + Web                                                                                                                                                                                                                                                                                                     |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                                 |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                                      |
| Created              | 2026-09-24                                                                                                                                                                                                                                                                                                    |
| Last updated         | 2026-10-15                                                                                                                                                                                                                                                                                                    |
| Figma                | N / A                                                                                                                                                                                                                                                                                                           |
| Confluence           | [PRD: LF-S-059 - User Profile](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7874805872/PRD+LF-S-059+-+User+Profile)                                                                                                                                                                                                                                                                                                           |
| Jira                 | —                                                                                                                                                                                                                                                                                                             |
| API Spec             | N / A                                                                                                                                                                                                                                                                                                         |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The User Profile screen is where the logged-in user reviews their personal information.

### b. Goals

- Review their personal information



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                            | When                                        | Then                                                                                                                                                   |
| ----- | -------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The User Profile screen is shown | The user views the screen                   | - Page title "User profile" is shown<br>- The personal info section is shown with its own **Edit**<br>- The email section is shown with its own **Edit**<br>- The user's email is shown |
| AC-02 | The User Profile screen is shown | The user views the personal info section    | - The user's first name is shown<br>- The user's last name is shown<br>- The user's gender is shown<br>- The user's birthday is shown in the shared date format |
| AC-03 | The User Profile screen is shown | The user selects **Edit** on the personal info section | The user is taken to Edit profile (LF-S-060)                                                                                                            |
| AC-04 | The User Profile screen is shown | The user selects **Edit** on the email section | - A verification code is sent to the user's mobile number<br>- The user is taken to Enter verification code (LF-S-004)                                                                                                             |




## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A