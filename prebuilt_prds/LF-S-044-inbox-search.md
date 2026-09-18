# PRD: LF-S-044 - Inbox Search

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Inbox Search                                                                     |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-044 - Inbox Search](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7792001202/PRD+LF-S-044+-+Inbox+Search) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Inbox search screen is where the logged-in user searches their messages.

### b. Goals

- Search their messages

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
| AC-01 | The Inbox search screen is shown                                                               | The user views the screen                 | - A search field is shown with placeholder "What are you looking for?"<br>- **Search** is shown and can be selected<br>- Messages are shown                   |
| AC-02 | The Inbox search screen is shown and a message is shown                                        | The user views that message               | - The message title is shown<br>- The message date is shown and uses the shared date format<br>- The message time is shown                                    |
| AC-03 | The Inbox search screen is shown and a message is unread                                       | The user views that message               | An indicator is shown that this message is unread                                                                                                              |
| AC-04 | The Inbox search screen is shown                                                               | The user views the message list           | Messages are shown by time, newest first                                                                                                                      |
| AC-05 | The Inbox search screen is shown and the user has entered search text that is not only spaces  | The user selects **Search**               | The list shows messages whose message title or message body contains the search text. Matching is not case-sensitive                                          |
| AC-06 | The Inbox search screen is shown and a message is shown                                        | The user selects that message             | The user is taken to Inbox Message Detail (LF-S-043)                                                                                                           |


## 6. Edge cases & error cases


| ID    | Case (category)              | Trigger / entry                                                                                         | Expected behavior (observable)                                                                                          | Exit / recovery                |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| EC-01 | Edge — no matching messages  | The user selects **Search** and no message has a message title or message body that contains the search text, not case-sensitive | - "No matching messages." is shown<br>- The search field and **Search** remain shown                            | The user stays on Inbox search |


## 7. Data Mapping

N / A
