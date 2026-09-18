# PRD: LF-S-014 - Edit Email

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-11 | Updated from design | Nan Dong | OTP continues with Next |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Edit Email |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-08-11 |
| Last updated | 2026-09-11 |
| Figma | N / A |
| Confluence| [PRD: LF-S-014 - Edit Email](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821556/PRD+LF-S-014+-+Edit+Email) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The edit-email screen is where the user enters a new email address and saves it, which sends a new verification email when allowed, or cancels and returns to verify email.

### b. Goals

- Enter a new email address
- Save the new email address and send a new verification email when allowed
- Cancel and go back to verify email with **Cancel**

### c. Non-Goals

- Verify email after **Save** or **Cancel** (destination content and behavior)

### d. Entry points

| Entry point | In or out of scope? | Note |
|-------------|---------------------|------|
| User selects **Next** after entering the correct code on OTP verification (LF-S-004) after **Not your email?** on Verify email (LF-S-013) | In | From LF-S-004 in email verification (LF-J-002) |

### e. Exit points

| Exit point | In or out of scope? | Note |
|------------|---------------------|------|
| User selects **Save** and a new verification email can be sent | In | Verify email (LF-S-013). Uses the same five-minute window and 3-sends-in-24-hours limit as Verify email (LF-S-013) and Email verification result (LF-S-015) — expired link. |
| User selects **Cancel** | In | Verify email (LF-S-013) — the screen before OTP verification in this journey |

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The edit-email screen is shown | The user views the screen | - Title "Edit email" is shown<br>- **Email** field is shown empty with placeholder "Email"<br>- **Save** is shown and can be selected<br>- **Cancel** is shown below **Save** and can be selected |
| AC-02 | The edit-email screen is shown, the five-minute countdown has ended, and the user has been sent fewer than 3 verification emails | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** | - The user's email is updated to the entered email<br>- A new verification link is sent to the entered email<br>- The user is taken to Verify email (LF-S-013) |
| AC-03 | The edit-email screen is shown | The user selects **Cancel** | - The email is not updated<br>- The user is taken to Verify email (LF-S-013) |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — same as current email | The user selects **Save** when the entered email is the same as their current email | The message "Sorry, the new email entered cannot be the same as your current email." is shown | The user can enter a different email and select **Save** again, or select **Cancel** |
| EC-02 | Error — incorrect email format | The user selects **Save** when **Email** is filled but not in a correct email format | The inline message "Invalid email format" is shown on **Email** | The user can correct the email and select **Save** again, or select **Cancel** |
| EC-03 | Error — email exceeds maximum length | The user selects **Save** when **Email** has more than 254 characters | The inline message "The maximum length for this field is 254 characters" is shown on **Email** | The user can shorten the email and select **Save** again, or select **Cancel** |
| EC-04 | Error — verification email within five-minute window | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** while a verification email was already requested within the last five minutes | - The user's email is updated to the entered email<br>- A new verification link is not sent<br>- Message "Sorry, you've already requested a verification email. Please request again in 5 minutes." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the edit-email screen. The user can select **Cancel** to go to Verify email (LF-S-013) |
| EC-05 | Error — max verification email requests | The user enters a correctly formatted email that is different from their current email (at most 254 characters) and selects **Save** when the user has already been sent a verification email 3 times | - The user's email is updated to the entered email<br>- A new verification link is not sent<br>- Message "Sorry, you've reached the maximum number of requests. You can request a new one again tomorrow or after 24 hours." is shown<br>- **Got it** is shown | **Got it** closes the message and the user stays on the edit-email screen. The user can select **Cancel** to go to Verify email (LF-S-013) |

## 7. Data Mapping

N / A
