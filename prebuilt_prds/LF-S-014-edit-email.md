# PRD: LF-S-014 - Edit Email

## Change Log

| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |

## Header

| Field | Value |
| --- | --- |
| Feature | Edit Email |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Gaps | none |
| Version | 1 |
| Created | 2026-08-11 |
| Last updated | 2026-10-15 |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Figma | [Prebuilt Page Templates — Edit Email](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=322-14886) |
| API Spec(s) | N / A |
| Jira | — |
| Confluence | [PRD: LF-S-014 - Edit Email](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821556/PRD+LF-S-014+-+Edit+Email) |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## Central requirement + Scope

### Central requirement

The edit-email screen is where the user enters a new email address and saves it, which sends a new verification email when allowed.

### Goals

- Enter a new email address
- Save the new email address and send a new verification email when allowed

### Non-Goals

- Verify email after **Save** (destination content and behavior)

### Entry points

N / A

### Exit points

N / A

## User Journey

N / A

## Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The edit-email screen is shown | The user views the screen | - Title "Edit email" is shown<br>- **Email** is shown, prepopulated with the email from the previous step<br>- **Save** is shown and can be selected |
| AC-02 | The edit-email screen is shown, the five-minute countdown has ended, and the user has been sent fewer than 3 verification emails | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** | - The user's email is updated to the entered email<br>- A new verification link is sent to the entered email<br>- The user is taken to Verify email (LF-S-013) |

## Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — same as current email | The user selects **Save** when the entered email is the same as their current email | The inline message "Sorry, the new email entered cannot be the same as your current email." is shown on **Email** | The user can enter a different email and select **Save** again |
| EC-02 | Error — incorrect email format | The user selects **Save** when **Email** is filled but not in a correct email format | The inline message "Invalid email format." is shown on **Email** | The user can correct the email and select **Save** again |
| EC-03 | Error — email exceeds maximum length | The user selects **Save** when **Email** has more than 254 characters | The inline message "The maximum length for this field is 254 characters." is shown on **Email** | The user can shorten the email and select **Save** again |
| EC-04 | Error — verification email within five-minute window | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** while a verification email was already requested within the last five minutes | - The user's email is updated to the entered email<br>- A new verification link is not sent<br>- Title "Verification email already requested" is shown<br>- Message "Sorry, you've already requested a verification email. Please request again in 5 minutes." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the edit-email screen |
| EC-05 | Error — max verification email requests | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** when the user has already been sent a verification email 3 times | - The user's email is updated to the entered email<br>- A new verification link is not sent<br>- Title "Maximum requests reached" is shown<br>- Message "Sorry, you've reached the maximum number of requests. You can request a new one again tomorrow or after 24 hours." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the edit-email screen |

## Data Mapping

N / A
