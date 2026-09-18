# PRD: LF-S-042 - Inbox

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Inbox                                                                            |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-042 - Inbox](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791509678/PRD+LF-S-042+-+Inbox) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Inbox screen is where the logged-in user reviews their messages.

### b. Goals

- Review their messages

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                 | When                                      | Then                                                                                                                                                          |
| ----- | --------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Inbox screen is shown                                             | The user views the screen                 | - Page title "Inbox" is shown<br>- The message list is shown<br>- The search control is shown and can be selected<br>- The sorting control is shown and can be selected<br>- The mark all as read control is shown and can be selected |
| AC-02 | The Inbox screen is shown and a message is shown                      | The user views that message               | - The message title is shown<br>- The message date is shown and uses the shared date format<br>- The message time is shown                                    |
| AC-03 | The Inbox screen is shown and a message is unread                     | The user views that message               | An indicator is shown that this message is unread                                                                                                              |
| AC-04 | The Inbox screen is shown and at least one message is unread          | The user selects the mark all as read control | All unread messages are marked as read                                                                                                                    |
| AC-05 | The Inbox screen is shown                                             | The user views the message list           | Messages are shown by time, newest first                                                                                                                      |
| AC-06 | The Inbox screen is shown                                             | The user selects the sorting control      | - **Newest first** is shown and can be selected<br>- **Unread first** is shown and can be selected                                                           |
| AC-07 | The Inbox screen is shown and sorting options are shown               | The user selects **Newest first**         | Messages are shown by time, newest first                                                                                                                      |
| AC-08 | The Inbox screen is shown and sorting options are shown               | The user selects **Unread first**         | - Unread messages are shown first, by time, newest first<br>- Then read messages are shown, by time, newest first                                              |
| AC-09 | The Inbox screen is shown                                             | The user selects the search control       | The user is taken to Inbox Search (LF-S-044)                                                                                                                   |
| AC-10 | The Inbox screen is shown and a message is shown                      | The user selects that message             | The user is taken to Inbox Message Detail (LF-S-043)                                                                                                           |
| AC-11 | The Inbox screen is shown, a message is shown, and this is the app    | The user swipes that message              | **Delete** is shown and can be selected                                                                                                                       |
| AC-12 | The Inbox screen is shown, a message is shown, and this is web        | The user hovers that message              | A trash control is shown and can be selected                                                                                                                  |
| AC-13 | The Inbox screen is shown and **Delete** is shown                     | The user selects **Delete**               | The message is deleted                                                                                                                                        |
| AC-14 | The Inbox screen is shown and the trash control is shown              | The user selects the trash control        | The message is deleted                                                                                                                                        |


## 6. Edge cases & error cases


| ID    | Case (category)              | Trigger / entry                                                          | Expected behavior (observable)                                              | Exit / recovery           |
| ----- | ---------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------- |
| EC-01 | Edge — no messages           | The user has no messages                                                 | No messages are shown                                                       | The user stays on Inbox   |


## 7. Data Mapping

N / A
