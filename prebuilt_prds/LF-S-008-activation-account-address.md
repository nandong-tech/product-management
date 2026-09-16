# PRD: LF-S-008 - Activation — Account Address

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Leave-and-return keeps values only in the same create-account attempt |
| 2026-09-11 | Updated from design | Nan Dong | Enter address title, optional labels, and placeholders |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Activation — Account Address |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-08-10 |
| Last updated | 2026-09-11 |
| Figma | [Prebuilt Page Templates — Account Address](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=76-21244&m=dev) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The account-address screen is where the user enters their address during activation.

### b. Goals

- Enter an address using the shared address format
- Continue to the next activation step with **Next**

### c. Non-Goals

N / A

### d. Entry points

| Entry point | In or out of scope? | Note |
|-------------|---------------------|------|
| User enters first name, last name, gender, birthday, and email and selects **Next** on Activation — account details (LF-S-007) | In | From LF-S-007 |

### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User enters the required shared address fields (**Address line 1**, **Country**, **State / Province**) and selects **Next** | In | Activation — ID upload (LF-S-009) |
| User selects the back arrow | In | User is taken to Activation — account details (LF-S-007); values on this screen are kept |

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The account-address screen is shown | The user views the screen | - Title "Enter address" is shown<br>- Shared address fields are shown in order: **Address line 1**, **Address line 2 (optional)**, **City (optional)**, **Country**, **State / Province**, **Postal code (optional)**<br>- Required: **Address line 1**, **Country**, **State / Province**<br>- Optional: **Address line 2**, **City**, **Postal code**<br>- **Address line 1** placeholder is "Enter address line 1"<br>- **Address line 2** placeholder is "Enter address line 2"<br>- **City** placeholder is "Enter city"<br>- **Country** is a select field with placeholder "Select country" and options from the shared country list (ISO 3166-1 English short country names)<br>- **State / Province** is a select field with placeholder "Select state / province"<br>- **Postal code** placeholder is "Enter postal code"<br>- **Next** is shown and can be selected |
| AC-02 | The account-address screen is shown | The user enters a value in **Postal code** | Only numbers can be entered; non-number characters are not accepted |
| AC-03 | The account-address screen is shown and no **Country** is selected | The user views **State / Province** | The options list is empty; the field is not disabled |
| AC-04 | The account-address screen is shown | The user selects a **Country** | **State / Province** options are the ISO 3166-2 subdivisions for that country |
| AC-05 | The account-address screen is shown and a **State / Province** is selected | The user selects a different **Country** | The previous **State / Province** value is cleared; **State / Province** options update for the new **Country** |
| AC-06 | The account-address screen is shown | The user enters the required shared address fields (**Address line 1**, **Country**, **State / Province**) and selects **Next** | The user is taken to Activation — ID upload (LF-S-009) |
| AC-07 | The user has entered values on the account-address screen, left the screen, and has not started create account again | The user returns to the account-address screen | The previously entered values are still shown |

## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
