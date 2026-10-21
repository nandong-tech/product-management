# PRD: LF-S-060 - Edit personal info

## Change Log

| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |

## Header

| Field | Value |
| --- | --- |
| Feature | Edit profile |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-09-28 |
| Last updated | 2026-10-21 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | [Prebuilt Page Templates — Edit personal info](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=516-29158) |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-060 - Edit personal info](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7876509714/PRD+LF-S-060+-+Edit+profile) |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template) shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The edit-profile screen is where the logged-in user updates their personal information.

### Goals

- Update their first name, last name, gender, and birthday

### Non-Goals

N / A

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria

| ID    | Given                                                                  | When                                         | Then                                                                                                                                                                                                                                                                                                                                                                                              |
| ----- | ---------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The edit-profile screen is shown                                       | The user views the screen                    | - Page title "Edit personal info" is shown - **First name** is shown with the user's first name - **Last name** is shown with the user's last name - **Gender** is shown with the user's gender - **Birthday** is shown with the user's birthday in the shared date format. Birthday is selected only and is not typed - The user can change these fields - **Save** is shown and can be selected |
| AC-02 | The edit-profile screen is shown                                       | The user opens the **Birthday** date control | - Title **Set birthday** is shown<br>- **Save** is shown and can be selected<br>- **Cancel** is shown and can be selected<br>- Dates after today are not selectable |
| AC-03 | **Set birthday** is shown                                              | The user selects a date and selects **Save** | - **Birthday** shows the selected date<br>- **Set birthday** is closed |
| AC-04 | **Set birthday** is shown                                              | The user selects **Cancel**                  | - **Set birthday** is closed<br>- **Birthday** is unchanged |
| AC-05 | The edit-profile screen is shown and all profile validation has passed | The user selects **Save**                    | - Leading and trailing spaces on **First name** and **Last name** are trimmed silently - The user's first name, last name, gender, and birthday are updated to the entered values - Toast "Personal info updated successfully!" is shown - The user is taken to User Profile (LF-S-059)                                                                                                           |

## Edge cases & error cases

| ID    | Case (category)                     | Trigger / entry                                                                                                       | Expected behavior (observable)                                                                                                                                              | Exit / recovery                                         |
| ----- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| EC-01 | Error — special characters in name  | The user leaves **First name** or **Last name** when the trimmed value contains anything other than letters or spaces | - The inline message "Special characters are not allowed." is shown on the affected field - On **Save**, the user does not continue while this error remains                 | The user can correct the name and select **Save** again |
| EC-02 | Error — name exceeds maximum length | The user leaves **First name** or **Last name** when the trimmed value has more than 50 characters                    | - The inline message "The maximum length for this field is 50 characters." is shown on the affected field - On **Save**, the user does not continue while this error remains | The user can shorten the name and select **Save** again |

## Data Mapping

N / A