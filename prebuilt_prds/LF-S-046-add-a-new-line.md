# PRD: LF-S-046 - Add a New Line

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Add a New Line                                                                   |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-04                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The Add a new line screen is where the group admin adds a line, or a user who does not belong to a group yet adds a line. The group admin is the user who invited the others to the group.

### b. Goals

- Add a new line



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A



## 5. Acceptance Criteria


| ID    | Given                                                                                                                                                                                                                                                  | When                         | Then                                                                                                                                                                                                                                                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Add a new line screen is shown                                                                                                                                                                                                                     | The user views the screen    | - Page title "Add a new line" is shown<br>- Helper text "You can add up to X lines to your account." is shown. X is the configured maximum of other lines that can be added and does not include the user's own line<br>- The **Mobile Number** field is shown and uses the shared MSISDN format<br>- **Add** is shown and can be selected |
| AC-02 | The Add a new line screen is shown, the user is the group admin or the user does not belong to a group yet, **Mobile Number** is filled, the invited user is not in a group yet, and there is no pending invitation for that number | The user selects **Add**     | - An invitation email is sent to the email on the account for that mobile number<br>- Message "Invitation sent." is shown<br>- The user is taken to Line Management (LF-S-045) |
| AC-03 | The Add a new line screen is shown and **Mobile Number** is a number whose invitation has not been accepted and 24 hours have not ended                                                                                                                | The user selects **Add**     | - A confirmation is shown<br>- Message "The invitation was already sent. Do you want to send again?" is shown<br>- **Confirm** is shown and can be selected<br>- **Cancel** is shown and can be selected                                                                                                                                   |
| AC-04 | The Add a new line screen is shown and the send-again confirmation is shown                                                                                                                                                                            | The user selects **Cancel**  | - The confirmation is closed<br>- The invitation is not sent again<br>- The user stays on Add a new line                                                                                                                                                                                                                                |
| AC-05 | The Add a new line screen is shown and the send-again confirmation is shown                                                                                                                                                                            | The user selects **Confirm** | - An invitation email is sent to the email on the account for that mobile number<br>- Message "Invitation sent." is shown<br>- The 24 hours start again<br>- The user is taken to Line Management (LF-S-045)                                                                                                                               |




## 6. Edge cases & error cases


| ID    | Case (category)                                 | Trigger / entry                                                                                                            | Expected behavior (observable)                                                                                                                                                                     | Exit / recovery                                                                   |
| ----- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| EC-01 | Error — own number                              | The user selects **Add** with the user's own mobile number                                                                 | - Message "You can't add your own number." is shown<br>- **Got it** is shown and can be selected<br>- The line is not added                                                                        | The user selects **Got it**. The message closes. The user stays on Add a new line |
| EC-02 | Error — number already added to this account    | The user selects **Add** with a mobile number that is already added to this account and whose invitation has been accepted | - Message "This number is already added to your account." is shown<br>- **Got it** is shown and can be selected<br>- The line is not added                                                               | The user selects **Got it**. The message closes. The user stays on Add a new line |
| EC-03 | Error — number already added to another account | The user selects **Add** with a mobile number that is already added to another account                                     | - Message "This number is already added to another account. A number can only be added to one account at a time." is shown<br>- **Got it** is shown and can be selected<br>- The line is not added | The user selects **Got it**. The message closes. The user stays on Add a new line |
| EC-04 | Error — not a valid number                      | The user selects **Add** with a mobile number that is not a valid number                                                   | - Message "The number you have entered is not a valid number." is shown<br>- **Got it** is shown and can be selected<br>- The line is not added                                                          | The user selects **Got it**. The message closes. The user stays on Add a new line |
| EC-05 | Error — maximum lines reached                   | The user selects **Add** when this account has reached the configured maximum of other lines that can be added             | - Message "The maximum number of lines has been reached for this account." is shown<br>- **Got it** is shown and can be selected<br>- The line is not added                                        | The user selects **Got it**. The message closes. The user stays on Add a new line |




## 7. Data Mapping

N / A
