# PRD: LF-S-007 - Activation — Account Details

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | Name and email errors run when the user leaves the field |
| 2026-09-11 | Updated from design | Nan Dong | Leave-and-return keeps values only in the same create-account attempt |
| 2026-09-11 | Updated from design | Nan Dong | Enter account details title and email error copy |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Activation — Account Details |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-07-30 |
| Last updated | 2026-09-11 |
| Figma | [Prebuilt Page Templates — Account Details](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=63-14550&m=dev) |
| Confluence| [PRD: LF-S-007 - Activation — Account Details](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676526666/PRD+LF-S-007+-+Activation+Account+Details) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The account-details screen is where the user enters their personal information during activation.

### b. Goals

- Enter first name, last name, gender, birthday, and email
- Continue to the next activation step with **Next**

### c. Non-Goals

N / A

### d. Entry points

| Entry point | In or out of scope? | Note |
|-------------|---------------------|------|
| User enters the same strong 6-digit PIN in **PIN** and **Confirm PIN** and selects **Next** on PIN Entering (LF-S-006) | In | From LF-S-006 in create account (LF-J-001) |

### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User enters first name, last name, gender, birthday, and email and selects **Next** | In | Activation — account address (LF-S-008) |

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The account-details screen is shown | The user views the screen | - Title "Enter account details" is shown<br>- **First name** field is shown with placeholder "Enter first name"<br>- **Last name** field is shown with placeholder "Enter last name"<br>- **Gender** field is shown with placeholder "Select gender"<br>- **Birthday** field is shown with placeholder "YYYY-MM-DD" (selected only — not typed; the date uses the shared date format)<br>- **Email** field is shown with placeholder "Enter email"<br>- **Next** is shown and can be selected |
| AC-02 | The account-details screen is shown | The user enters first name, last name, gender, a valid birthday, and a correctly formatted email (at most 254 characters) and selects **Next** | - Leading and trailing spaces on **First name** and **Last name** are trimmed silently<br>- The user is taken to Activation — account address (LF-S-008) |
| AC-03 | The user has entered values on the account-details screen, left the screen, and has not started create account again | The user returns to the account-details screen | The previously entered values are still shown |
| AC-04 | The account-details screen is shown | The user opens the **Birthday** date control | Dates after today are not selectable |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — special characters in name | The user leaves **First name** or **Last name** when the trimmed value contains anything other than letters or spaces | - The inline message "Special characters are not allowed" is shown on the affected field<br>- On **Next**, the user does not continue while this error remains | The user can correct the name and select **Next** again |
| EC-02 | Error — name exceeds maximum length | The user leaves **First name** or **Last name** when the trimmed value has more than 50 characters | - The inline message "The maximum length for this field is 50 characters" is shown on the affected field<br>- On **Next**, the user does not continue while this error remains | The user can shorten the name and select **Next** again |
| EC-03 | Error — incorrect email format | The user leaves **Email** when it is filled but not in a correct email format | - The inline message "Email format is incorrect. Try name@email.com" is shown on **Email**<br>- On **Next**, the user does not continue while this error remains | The user can correct the email and select **Next** again |
| EC-04 | Error — email exceeds maximum length | The user leaves **Email** when it has more than 254 characters | - The inline message "The maximum length for this field is 254 characters" is shown on **Email**<br>- On **Next**, the user does not continue while this error remains | The user can shorten the email and select **Next** again |

## 7. Data Mapping

N / A
