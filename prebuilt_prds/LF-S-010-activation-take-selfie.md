# PRD: LF-S-010 - Activation — Take Selfie

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-10 | Updated from design | Nan Dong | Selfie helper, Take selfie / Retake selfie, camera-unavailable copy |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Activation — Take Selfie |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-08-10 |
| Last updated | 2026-09-11 |
| Figma | [Prebuilt Page Templates — Take Selfie](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=84-28988&m=dev) |
| Confluence| [PRD: LF-S-010 - Activation — Take Selfie](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592282/PRD+LF-S-010+-+Activation+Take+Selfie) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The take-selfie screen is where the user takes a selfie with the device camera during activation.

### b. Goals

- Take a selfie with the camera
- Continue to the next activation step with **Next**

### c. Non-Goals

N / A

### d. Entry points

| Entry point | In or out of scope? | Note |
|-------------|---------------------|------|
| User uploads a valid ID file and selects **Next** on Activation — ID upload (LF-S-009) | In | From LF-S-009 |

### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User takes a selfie and selects **Next** | In | Activation — registration review (LF-S-011) |
| User selects the back arrow | In | User is taken to Activation — ID upload (LF-S-009); the selfie is not kept |

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The take-selfie screen is shown | The user views the screen | - Title "Take a selfie" is shown<br>- Helper text "Take a clear selfie to verify your identity" is shown<br>- Camera capture for the selfie is shown<br>- **Take selfie** is shown and can be selected<br>- **Next** is shown and is not available until a selfie is captured |
| AC-02 | The take-selfie screen is shown | The user selects **Take selfie** | - The captured selfie is shown<br>- **Retake selfie** is shown and can be selected<br>- **Next** is shown and can be selected |
| AC-03 | The take-selfie screen is shown and a selfie is captured | The user selects **Retake selfie** | Camera capture for the selfie is shown again |
| AC-04 | The take-selfie screen is shown and a selfie is captured | The user selects **Next** | The user is taken to Activation — registration review (LF-S-011) |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — camera not available | The user tries to take a selfie when the camera cannot be used | - Message "Camera not available. Allow camera access in your device settings, then try again." is shown<br>- The camera area shows that the camera is unavailable<br>- A selfie cannot be captured | The user can allow camera access in device settings, try again, or leave the screen |

## 7. Data Mapping

N / A
