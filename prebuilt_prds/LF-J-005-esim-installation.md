# PRD: LF-J-005 - eSIM Installation

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value              |
| -------------------- | ------------------ |
| Feature              | eSIM Installation  |
| Channels             | App                |
| Status (owning team) | PM — drafting      |
| Owner (PM)           | Nan Dong           |
| Contributors         | Nan Dong           |
| Created              | 2026-08-28         |
| Last updated         | 2026-09-10  |
| Figma                | N / A              |
| Confluence           | [PRD: LF-J-005 - eSIM Installation](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747469416/PRD+LF-J-005+-+eSIM+Installation) |
| Jira                 | —                  |
| API Spec             | N / A              |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The eSIM installation journey is a reusable flow where the user installs an eSIM on this device, using Install eSIM and eSIM installation result.

### b. Goals

- Install the eSIM on this device
- See whether eSIM set-up completed

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

```mermaid
flowchart TD
  start([User is taken to Install eSIM]) --> install[Install eSIM LF-S-029]
  install -->|Native system eSIM installation flow has ended| result([eSIM installation result LF-S-030])
```

## 5. Acceptance Criteria

N / A

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
