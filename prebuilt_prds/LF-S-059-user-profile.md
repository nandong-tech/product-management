# PRD: LF-S-059 - User Profile

## Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |


## Header

| Field | Value |
| --- | --- |
| Feature | User Profile |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-09-24 |
| Last updated | 2026-10-21 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | [Prebuilt Page Templates — User Profile](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=516-27512) |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-059 - User Profile](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7874805872/PRD+LF-S-059+-+User+Profile) |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope



### Central requirement

The User Profile screen is where the logged-in user reviews their personal information.

### Goals

- Review their personal information



### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria


| ID    | Given                            | When                                        | Then                                                                                                                                                   |
| ----- | -------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The User Profile screen is shown | The user views the screen                   | - Page title "User profile" is shown<br>- Text "View and manage your info." is shown<br>- The personal info section is shown with its own **Edit**<br>- The email section is shown with its own **Edit**<br>- The user's email is shown |
| AC-02 | The User Profile screen is shown | The user views the personal info section    | - The user's first name is shown<br>- The user's last name is shown<br>- The user's gender is shown<br>- The user's birthday is shown in the shared date format |
| AC-03 | The User Profile screen is shown | The user selects **Edit** on the personal info section | The user is taken to Edit personal info (LF-S-060)                                                                                                      |
| AC-04 | The User Profile screen is shown | The user selects **Edit** on the email section | - A verification code is sent to the user's mobile number<br>- The user is taken to Enter verification code (LF-S-004)                                                                                                             |




## Edge cases & error cases

N / A

## Data Mapping

N / A