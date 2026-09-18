# PRD: LF-J-009 - Inbox Management

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value              |
| -------------------- | ------------------ |
| Feature              | Inbox Management   |
| Channels             | App + Web          |
| Status (owning team) | PM — drafting      |
| Owner (PM)           | Nan Dong           |
| Contributors         | Nan Dong           |
| Created              | 2026-09-03         |
| Last updated         | 2026-09-10          |
| Figma                | N / A              |
| Confluence           | [PRD: LF-J-009 - Inbox Management](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791313016/PRD+LF-J-009+-+Inbox+Management) |
| Jira                 | —                  |
| API Spec             | N / A              |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Inbox Management journey is where the logged-in user reviews their messages and reviews one message.

### b. Goals

- Review their messages
- Review a message

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  start([User selects Inbox on Dashboard LF-S-033]) --> list[Inbox LF-S-042]
  list -->|Selects a message| detail[Inbox Message Detail LF-S-043]
  list -->|Search| search[Inbox Search LF-S-044]
  search -->|Selects a message| detail
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
