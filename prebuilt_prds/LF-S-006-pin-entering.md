# PRD: LF-S-006 - PIN Entering

## 1. Change Log


| Date       | Change                | Owner    | Rationale                                         |
| ---------- | --------------------- | -------- | ------------------------------------------------- |
| 2026-09-11 | Updated on Confluence | Nan Dong | Design and handoff walkthrough updates |
| 2026-09-11 | Updated from design | Nan Dong | PIN field errors run when the user leaves the field |
| 2026-09-11 | Updated from design | Nan Dong | Create-account Next continues to account details |
| 2026-09-11 | Updated from design | Nan Dong | Create-account Set PIN has no Clear all |
| 2026-09-11 | Updated from design | Nan Dong | Create-account Set PIN title and field copy |
| 2026-09-10 | Updated from design | Nan Dong | Split weak PIN into three errors; PIN error copy from design |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | PIN Entering                                                                     |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-07-30                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | [Prebuilt Page Templates — PIN Entering](https://www.figma.com/design/X3GsrESJS5Ygq67qI0GJ8D/Prebuilt-Page-Templates?node-id=63-11023&m=dev) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The PIN entering screen is a reusable screen where the user creates or updates a 6-digit login PIN. This screen is used in create account, Forgot PIN, and Reset PIN.

### b. Goals

- Create or update a 6-digit login PIN
- Confirm the PIN



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                      | When                                                                                                    | Then                                                                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The PIN entering screen is shown and this is create account (LF-J-001) | The user views the screen | - Title "Set PIN" is shown<br>- Text "Enter your 6 digit PIN for" is shown with the mobile number<br>- **PIN** field is shown with placeholder "Enter 6-digit PIN"<br>- **Confirm PIN** field is shown with placeholder "Re-enter 6-digit PIN"<br>- A control to show or hide the PIN is shown and can be selected. This control applies to both PIN fields<br>- **Next** is shown and can be selected |
| AC-02 | The PIN entering screen is shown, this is create account (LF-J-001), and all PIN validation has passed | The user selects **Next** | The user is taken to Activation — account details (LF-S-007) |
| AC-03 | The PIN entering screen is shown and this is Reset PIN (LF-J-007) | The user views the screen | - Title "Enter your new 6-digit PIN" is shown<br>- Text showing the mobile number the PIN is for is shown<br>- **Enter your PIN** is shown<br>- **Confirm PIN** is shown<br>- A control to show or hide the PIN is shown and can be selected. This control applies to both PIN fields<br>- **Clear all** is shown for each PIN field and can be selected<br>- **Next** is shown and can be selected |
| AC-04 | The PIN entering screen is shown and this is Forgot PIN (LF-J-006) | The user views the screen | - Title "Enter your new 6-digit PIN" is shown<br>- **Enter your PIN** is shown<br>- **Confirm PIN** is shown<br>- A control to show or hide the PIN is shown and can be selected. This control applies to both PIN fields<br>- **Clear all** is shown for each PIN field and can be selected<br>- **Next** is shown and can be selected |
| AC-05 | The PIN entering screen is shown | The user enters a value in a PIN field | Only numbers can be entered. Non-number characters are not accepted. Each field accepts at most 6 digits |
| AC-06 | The PIN entering screen is shown and the PIN values are hidden | The user selects the show/hide control | The values in both PIN fields are shown |
| AC-07 | The PIN entering screen is shown and the PIN values are shown | The user selects the show/hide control | The values in both PIN fields are hidden |
| AC-08 | The PIN entering screen is shown, this is Forgot PIN (LF-J-006) or Reset PIN (LF-J-007), and a PIN field has an entered value | The user selects **Clear all** on that field | The entered value in that field is cleared |
| AC-09 | The PIN entering screen is shown, this is Forgot PIN (LF-J-006) or Reset PIN (LF-J-007), and all PIN validation has passed | The user selects **Next** | The user is logged out |




## 6. Edge cases & error cases


| ID    | Case (category)                      | Trigger / entry                                                                                                                                                                                                 | Expected behavior (observable)                                                                                          | Exit / recovery                                                |
| ----- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| EC-01 | Error — weak PIN, sequential         | The user leaves the **PIN** field when the PIN is sequential                                                                                                                                                     | - The inline message "Choose a stronger PIN. Sequential (e.g., 123456) numbers aren't allowed." is shown<br>- On **Next**, the user does not continue while this error remains                  | The user can nominate a strong PIN and select **Next** again   |
| EC-02 | Error — weak PIN, identical digits   | The user leaves the **PIN** field when all six digits are identical                                                                                                                                              | - The inline message "Choose a stronger PIN. All six digits can't be identical (e.g., 111111)." is shown<br>- On **Next**, the user does not continue while this error remains                  | The user can nominate a strong PIN and select **Next** again   |
| EC-03 | Error — weak PIN, double-repeating   | The user leaves the **PIN** field when the PIN is double-repeating                                                                                                                                               | - The inline message "Choose a stronger PIN. Double-repeating (e.g., 121212) numbers aren't allowed." is shown<br>- On **Next**, the user does not continue while this error remains            | The user can nominate a strong PIN and select **Next** again   |
| EC-04 | Error — PINs do not match            | The user leaves **PIN** or **Confirm PIN** when both fields have a value and they do not match                                                                                                                    | - The inline message "PINs don't match. Try again." is shown<br>- On **Next**, the user does not continue while this error remains                                                              | The user can correct the PIN fields and select **Next** again  |
| EC-05 | Error — same as existing PIN         | The PIN entering screen is shown and this is Forgot PIN (LF-J-006) or Reset PIN (LF-J-007). The user selects **Next** when **Enter your PIN** and **Confirm PIN** match and that PIN is the same as the existing PIN | The inline message "The new PIN entered can't be the same as your current PIN. Enter another one." is shown             | The user can nominate a different PIN and select **Next** again |




## 7. Data Mapping

N / A