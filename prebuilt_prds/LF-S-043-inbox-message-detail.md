# PRD: LF-S-043 - Inbox Message Detail

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Inbox Message Detail                                                             |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-043 - Inbox Message Detail](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7792033848/PRD+LF-S-043+-+Inbox+Message+Detail) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Inbox message detail screen is where the logged-in user reviews one message.

### b. Goals

- Review a message

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                 | When                      | Then                                                                                                                      |
| ----- | ----------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Inbox message detail screen is shown                                                              | The user views the screen | - The message date is shown and uses the shared date format<br>- The message time is shown<br>- The message body is shown |
| AC-02 | The Inbox message detail screen is shown and the message body has a link to another screen            | The user clicks that link | The user is taken to that screen                                                                                          |
| AC-03 | The Inbox message detail screen is shown and the message body has a link to an external destination   | The user clicks that link | The user is taken to that destination                                                                                     |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
