# PRD: LF-S-029 - Install eSIM

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value           |
| -------------------- | --------------- |
| Feature              | Install eSIM    |
| Channels             | App             |
| Status (owning team) | PM — drafting   |
| Owner (PM)           | Nan Dong        |
| Contributors         | Nan Dong        |
| Created              | 2026-08-28      |
| Last updated         | 2026-09-10 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-029 - Install eSIM](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747502143/PRD+LF-S-029+-+Install+eSIM) |
| Jira                 | —               |
| API Spec             | N / A           |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The install eSIM screen is where the native system eSIM installation flow is triggered using the Activation Code and ICCID.

### b. Goals

- Install the purchased eSIM on this device

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The install eSIM screen is shown and the Activation Code and ICCID are available | The user views the screen | - Heading "Downloading..." is shown<br>- Text "Hang in there! Don't close the app while we're downloading your eSIM." is shown<br>- The native system eSIM installation flow is triggered using the Activation Code and ICCID |
| AC-02 | The install eSIM screen is shown | The native system eSIM installation flow has ended | The user is taken to eSIM Installation Result (LF-S-030) |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
