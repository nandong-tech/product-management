# PRD: LF-S-012 - Activation — Success

## 1. Change Log


| Date       | Change                | Owner    | Rationale                                                          |
| ---------- | --------------------- | -------- | ------------------------------------------------------------------ |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-10 | Updated from design   | Nan Dong | Entry from review uses Create account                              |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog                  |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog                  |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog                  |




## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Activation — Success                                                                                                                                                                                                                                                                                                            |
| Channels             | App + Web                                                                                                                                                                                                                                                                                                                       |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                                                   |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                                                        |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                                                        |
| Created              | 2026-08-10                                                                                                                                                                                                                                                                                                                      |
| Last updated         | 2026-09-11 |
| Figma                | [Prebuilt Page Templates — Activation Success](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=63-12072&m=dev)                                                                                                                                                                              |
| Jira                 | —                                                                                                                                                                                                                                                                                                                               |
| API Spec             | N / A                                                                                                                                                                                                                                                                                                                           |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The activation success screen is where the user sees that SIM registration is complete.

### b. Goals

- See that registration is complete
- Continue to the next step with **Next**



### c. Non-Goals

N / A

### d. Entry points


| Entry point                                                                                              | In or out of scope? | Note          |
| -------------------------------------------------------------------------------------------------------- | ------------------- | ------------- |
| User selects **Create account** on Activation — registration review (LF-S-011) and registration succeeds | In                  | From LF-S-011 |




### e. Exit points


| Exit point            | In or out of scope? | Note                                                            |
| --------------------- | ------------------- | --------------------------------------------------------------- |
| User selects **Next** | In                  | Starts email verification (LF-J-002) at Verify email (LF-S-013) |




## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                  | When                      | Then                                                                                                                                                                                 |
| ----- | -------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The activation success screen is shown | The user views the screen | - A success confirmation is shown - Title "Registration complete" is shown - Text "Thank you for completing your SIM registration." is shown - **Next** is shown and can be selected |
| AC-02 | The activation success screen is shown | The user selects **Next** | The user is taken to Verify email (LF-S-013) and starts email verification (LF-J-002)                                                                                                |




## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A