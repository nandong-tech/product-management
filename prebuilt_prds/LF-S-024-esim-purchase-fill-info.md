# PRD: LF-S-024 - eSIM Purchase Fill Info

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | eSIM Purchase Fill Info                                                          |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-21                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-024 - eSIM Purchase Fill Info](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747993662/PRD+LF-S-024+-+eSIM+Purchase+Fill+Info) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The eSIM purchase fill-info screen is where a user who is not logged in enters the name, email, and mobile number needed to continue an eSIM purchase.

### b. Goals

- Enter first name, last name, email, and mobile number
- Continue the eSIM purchase

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
| AC-01 | The eSIM purchase fill-info screen is shown and the user is not logged in | The user views the screen | - Page title "Fill in your details" is shown<br>- Helper text "All fields with * are required." is shown<br>- **First Name** is shown and is required<br>- **Last Name** is shown and is required<br>- **Email** is shown and is required<br>- **Mobile Number** is shown and is required; the number uses the shared MSISDN format<br>- **Next** is shown and can be selected |
| AC-02 | The eSIM purchase fill-info screen is shown, the user is not logged in, and the user selected **Fill in your details** on Checkout (LF-S-021) | The user views the screen | The shown **First Name**, **Last Name**, **Email**, and **Mobile Number** fields are shown empty |
| AC-03 | The eSIM purchase fill-info screen is shown, the user is not logged in, and the user selected **Edit** on **Send to** on Checkout (LF-S-021) | The user views the screen | The shown **First Name**, **Last Name**, **Email**, and **Mobile Number** fields are filled from the eSIM purchase details. The user can change them |
| AC-04 | The eSIM purchase fill-info screen is shown, the user is not logged in, and all details validation has passed | The user selects **Next** | - Leading and trailing spaces on **First Name** and **Last Name** are trimmed silently<br>- An OTP is sent to the **Email** the user entered<br>- The user is taken to OTP verification (LF-S-004) |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — special characters in name | The user leaves **First Name** or **Last Name** with a value that, after trim, contains anything other than letters or spaces | - The inline message "Special characters are not allowed" is shown on the affected field<br>- **Next** does not continue | The user corrects the name and can try again |
| EC-02 | Error — name exceeds maximum length | The user leaves **First Name** or **Last Name** with a value that, after trim, has more than 50 characters | - The inline message "The maximum length for this field is 50 characters" is shown on the affected field<br>- **Next** does not continue | The user shortens the name and can try again |
| EC-03 | Error — incorrect email format | The user leaves **Email** with a value that is filled and not in a correct email format | - The inline message "Invalid email format" is shown on **Email**<br>- **Next** does not continue | The user corrects the email and can try again |
| EC-04 | Error — email exceeds maximum length | The user leaves **Email** with a value that has more than 254 characters | - The inline message "The maximum length for this field is 254 characters" is shown on **Email**<br>- **Next** does not continue | The user shortens the email and can try again |
| EC-05 | Edge — return with entered values | The user has entered values on the eSIM purchase fill-info screen, left the screen, and returns to the eSIM purchase fill-info screen | The previously entered values are still shown | N / A |


## 7. Data Mapping

N / A
