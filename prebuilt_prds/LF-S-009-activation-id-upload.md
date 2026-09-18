# PRD: LF-S-009 - Activation — ID Upload

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Unsupported file type copy matches design |
| 2026-09-11 | Updated from design | Nan Dong | Leave-and-return keeps the file only in the same create-account attempt |
| 2026-09-11 | Updated from design | Nan Dong | Verify identity title and upload copy |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Activation — ID Upload |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-08-10 |
| Last updated | 2026-09-11 |
| Figma | [Prebuilt Page Templates — ID Upload](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=80-24931&m=dev) |
| Confluence| [PRD: LF-S-009 - Activation — ID Upload](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676756040/PRD+LF-S-009+-+Activation+ID+Upload) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The ID upload screen is where the user uploads a photo of their valid ID during activation.

### b. Goals

- Upload a photo of a valid ID
- Continue to the next activation step with **Next**

### c. Non-Goals

N / A

### d. Entry points

| Entry point | In or out of scope? | Note |
|-------------|---------------------|------|
| User enters the required shared address fields (**Address line 1**, **Country**, **State / Province**) and selects **Next** on Activation — account address (LF-S-008) | In | From LF-S-008 |

### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User uploads a valid ID file and selects **Next** | In | Activation — take selfie (LF-S-010) |
| User selects the back arrow | In | User is taken to Activation — account address (LF-S-008); values on this screen are kept |

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The ID upload screen is shown | The user views the screen | - Title "Verify identity" is shown<br>- Helper text "Only JPEG, JPG, PDF, PNG and HEIC files with max size of 4MB." is shown<br>- **Photo of your valid ID** upload field is shown with **Upload** and "No file selected"<br>- **Next** is shown and can be selected |
| AC-02 | The ID upload screen is shown | The user selects the **Photo of your valid ID** upload control and chooses a file that is JPEG, JPG, PDF, PNG, or HEIC and less than 4MB | The selected file is shown on the upload field |
| AC-03 | The ID upload screen is shown and a valid ID file is selected | The user selects **Next** | The user is taken to Activation — take selfie (LF-S-010) |
| AC-04 | The user has selected an ID file on the ID upload screen, left the screen, and has not started create account again | The user returns to the ID upload screen | The previously selected file is still shown |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — unsupported file type | The user selects a file for **Photo of your valid ID** that is not JPEG, JPG, PDF, PNG, or HEIC | The inline message "This file type is not supported. Please upload a JPEG, JPG, PDF, PNG or HEIC file." is shown; the unsupported file is not accepted | The user can select a supported file again |
| EC-02 | Error — file too large | The user selects a file for **Photo of your valid ID** that is 4MB or larger | The inline message "This file is too large. Please upload a file smaller than 4MB." is shown; the file is not accepted | The user can select a smaller file again |

## 7. Data Mapping

N / A
