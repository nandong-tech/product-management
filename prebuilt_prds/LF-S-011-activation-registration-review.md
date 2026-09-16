# PRD: LF-S-011 - Activation — Registration Review

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Review section labels Personal info and ID upload |
| 2026-09-10 | Updated from design | Nan Dong | Create account CTA; review title and helper from design |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Activation — Registration Review                                                 |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-10                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | [Prebuilt Page Templates — Registration Review](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=84-30101&m=dev) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope



### a. Central requirement

The registration review screen is where the user reviews the information they entered and uploaded during activation before continuing.

### b. Goals

- Review entered and uploaded activation details
- Edit a section to go back to the corresponding step
- Create the account to complete registration

### c. Non-Goals

N / A

### d. Entry points


| Entry point                                                                     | In or out of scope? | Note          |
| ------------------------------------------------------------------------------- | ------------------- | ------------- |
| User takes a selfie and selects **Next** on Activation — take selfie (LF-S-010) | In                  | From LF-S-010 |




### e. Exit points


| Exit point                             | In or out of scope? | Note                                                                                                                            |
| -------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| User selects **Create account**        | In                  | Activation — success (LF-S-012)                                                                                                 |
| User selects **Edit** on Personal info | In                  | Activation — account details (LF-S-007); user continues the activation flow from that step (does not return directly to review) |
| User selects **Edit** on Address       | In                  | Activation — account address (LF-S-008); user continues the activation flow from that step (does not return directly to review) |
| User selects **Edit** on ID upload     | In                  | Activation — ID upload (LF-S-009); user continues the activation flow from that step (does not return directly to review)       |
| User selects **Edit** on Selfie        | In                  | Activation — take selfie (LF-S-010); user continues the activation flow from that step (does not return directly to review)     |




## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The registration review screen is shown | The user views the screen | - Title "Review account details" is shown<br>- Helper text "Check everything is correct before we create your account" is shown<br>- **Personal info** section is shown with **Edit**, and the mobile number from enter number (LF-S-005) plus first name, last name, gender, birthday, and email from account details (LF-S-007)<br>- **Address** section is shown with **Edit**, and the shared address fields from account address (LF-S-008)<br>- **ID upload** section is shown with **Edit**, and the ID file from ID upload (LF-S-009)<br>- **Selfie** section is shown with **Edit**, and the selfie from take selfie (LF-S-010)<br>- **Create account** is shown and can be selected |
| AC-02 | The registration review screen is shown | The user selects **Edit** on **Personal info** | The user is taken to Activation — account details (LF-S-007) |
| AC-03 | The registration review screen is shown | The user selects **Edit** on **Address** | The user is taken to Activation — account address (LF-S-008) |
| AC-04 | The registration review screen is shown | The user selects **Edit** on **ID upload** | The user is taken to Activation — ID upload (LF-S-009) |
| AC-05 | The registration review screen is shown | The user selects **Edit** on **Selfie** | The user is taken to Activation — take selfie (LF-S-010) |
| AC-06 | The registration review screen is shown | The user selects **Create account** | The user is taken to Activation — success (LF-S-012) |




## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A