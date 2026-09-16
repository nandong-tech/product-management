# PRD: LF-S-053 - Balance Transfer

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Balance Transfer                                                                 |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-07                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Balance Transfer screen is where the logged-in user transfers remaining service balances or wallet balance to the line selected on Line Management.

### b. Goals

- Transfer remaining balances to a selected line

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                                                  | When                                                                      | Then                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Balance Transfer screen is shown                                                                                                   | The user views the screen                                                 | - Page title "Balance transfer" is shown<br>- **Transfer to** is shown<br>- **Transfer Amount** is shown<br>- **Balance before transfer** is shown<br>- **Balance after transfer** is shown<br>- **Transfer** is shown and can be selected                                                                                                                                                                           |
| AC-02 | The Balance Transfer screen is shown. **Transfer to** is the line selected on Line Management (LF-S-045)                               | The user views **Transfer to**                                            | - The first name and last name of that line are shown<br>- The mobile number of that line is shown and uses the shared MSISDN format<br>- The user cannot enter a mobile number in **Transfer to**                                                                                                                                                                                                          |
| AC-03 | The Balance Transfer screen is shown after the user selected **Transfer balance** on Dashboard (LF-S-033)                                | The user views **Transfer Amount**                                        | - The transfer amount is a number input with increase and decrease<br>- The transfer amount is **1** by default<br>- **GB**, **Calls**, and **Texts** are shown and can be selected<br>- **GB** is selected                                                                                                                                                                                         |
| AC-04 | The Balance Transfer screen is shown after the user selected **Transfer** on Wallet (LF-S-050)                                          | The user views **Transfer Amount**                                        | - The transfer amount is a number input with increase and decrease<br>- The transfer amount is **1** by default<br>- The shared project currency is shown and is selected<br>- **GB**, **Calls**, and **Texts** are not shown                                                                                                                         |
| AC-05 | The Balance Transfer screen is shown and a unit is selected                                                                             | The user views **Balance before transfer** and **Balance after transfer** | - **Balance before transfer** is the logged-in user’s remaining balance for the selected unit<br>- **Balance after transfer** is that remaining balance minus the transfer amount                                                                                                                                                                                                                     |
| AC-06 | The Balance Transfer screen is shown and the transfer amount is less than the logged-in user’s remaining balance for the selected unit  | The user selects increase                                                 | - The transfer amount increases by **1**<br>- **Balance after transfer** updates accordingly                                                                                                                                                                                                                                                                                                          |
| AC-07 | The Balance Transfer screen is shown and the transfer amount is greater than **1**                                                      | The user selects decrease                                                 | - The transfer amount decreases by **1**<br>- **Balance after transfer** updates accordingly                                                                                                                                                                                                                                                                                                          |
| AC-08 | The Balance Transfer screen is shown after the user selected **Transfer balance** on Dashboard (LF-S-033) and **GB**, **Calls**, or **Texts** is selected | The user selects a different unit                                         | - The newly selected unit is selected<br>- **Balance before transfer** and **Balance after transfer** are shown for the newly selected unit                                                                                                                                                                                                                                                           |
| AC-09 | The Balance Transfer screen is shown and all transfer validation has passed                                                             | The user selects **Transfer**                                             | - A confirmation is shown<br>- Message "Are you sure you want to transfer **x** **unit** to first name last name (mobile number)?" is shown, where **x** is the transfer amount, **unit** is GB, calls, texts, or the configured currency for the selected unit, and first name, last name, and mobile number are the **Transfer to** line<br>- **Confirm** is shown and can be selected<br>- **Cancel** is shown and can be selected |
| AC-10 | The Balance Transfer screen is shown and the transfer confirmation is shown                                                             | The user selects **Cancel**                                               | - The confirmation is closed<br>- Remaining balances are not transferred<br>- The user stays on Balance Transfer                                                                                                                                                                                                                                                                                      |
| AC-11 | The Balance Transfer screen is shown and the transfer confirmation is shown                                                             | The user selects **Confirm** and the transfer succeeds                    | - That transfer amount of the selected unit is transferred from the logged-in user to the **Transfer to** line<br>- The user is taken to Transfer Result (LF-S-054)                                                                                                                                                                                                                                  |


## 6. Edge cases & error cases


| ID    | Case (category)                    | Trigger / entry                                                                                                                                                | Expected behavior (observable)                                                                                                                                                                                                                                                                                                   | Exit / recovery                                                                     |
| ----- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| EC-01 | Error — decrease at minimum        | The transfer amount is **1** and the user selects decrease                                                                                                     | - Message "The minimum allowed transfer amount is 1 **unit**." is shown, where **unit** is GB, calls, texts, or the configured currency for the selected unit<br>- **Got it** is shown and can be selected<br>- The transfer amount stays **1**                                                                                                                                                                                  | The user selects **Got it**. The message closes. The user stays on Balance Transfer |
| EC-02 | Error — increase with not enough balance | The transfer amount equals the logged-in user’s remaining balance for the selected unit and the user selects increase | - Message "You don't have enough **unit** to make this transfer." is shown, where **unit** is GB, calls, texts, or the configured currency for the selected unit<br>- **Got it** is shown and can be selected<br>- The transfer amount does not increase | The user selects **Got it**. The message closes. The user stays on Balance Transfer |
| EC-03 | Error — typed amount over remaining | The user leaves **Transfer Amount** and the transfer amount is greater than the logged-in user’s remaining balance for the selected unit | - Message "You don't have enough **unit** to make this transfer." is shown, where **unit** is GB, calls, texts, or the configured currency for the selected unit<br>- **Got it** is shown and can be selected<br>- The transfer amount stays as entered<br>- **Transfer** does not continue | The user selects **Got it**. The message closes. The user stays on Balance Transfer. The user corrects the transfer amount and can try again |
| EC-04 | Error — not enough balance         | The user selects **Transfer** and the logged-in user’s remaining balance for the selected unit is less than the transfer amount                                | - Message "You don't have enough **unit** to make this transfer." is shown, where **unit** is GB, calls, texts, or the configured currency for the selected unit<br>- **Got it** is shown and can be selected<br>- Remaining balances are not transferred                                                                                               | The user selects **Got it**. The message closes. The user stays on Balance Transfer |
| EC-05 | Error — transfer limit reached     | The user selects **Transfer** and the logged-in user has reached the configured maximum that can be transferred in the configured period for the selected unit | - Message "You reached the max **x** **unit** that can be transferred within **y** period." is shown, where **x** is the configured maximum, **unit** is GB, calls, texts, or the configured currency for the selected unit, and **y** is the configured period<br>- **Got it** is shown and can be selected<br>- Remaining balances are not transferred | The user selects **Got it**. The message closes. The user stays on Balance Transfer |
| EC-06 | Edge — return while transfer limit applies | The logged-in user has reached the configured maximum that can be transferred in the configured period for the selected unit, leaves the flow, comes back to Balance Transfer while that period has not ended, and selects **Transfer** | - Message "You reached the max **x** **unit** that can be transferred within **y** period." is shown, where **x** is the configured maximum, **unit** is GB, calls, texts, or the configured currency for the selected unit, and **y** is the configured period<br>- **Got it** is shown and can be selected<br>- Remaining balances are not transferred | The user selects **Got it**. The message closes. The user stays on Balance Transfer. After the configured period ends, the user can transfer again |
| EC-07 | Error — maintaining balance        | The user selects **Transfer** and the logged-in user’s remaining **GB** after the transfer would be less than **1** GB                                         | - Message "You can't proceed with the transfer as you need to have a maintaining balance of 1GB." is shown<br>- **Got it** is shown and can be selected<br>- Remaining balances are not transferred                                                                                                                              | The user selects **Got it**. The message closes. The user stays on Balance Transfer |


## 7. Data Mapping

N / A