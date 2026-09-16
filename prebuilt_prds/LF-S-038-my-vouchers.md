# PRD: LF-S-038 - My Vouchers

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | My Vouchers                                                                      |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The My Vouchers screen is where the logged-in user reviews their vouchers.

### b. Goals

- Review their vouchers

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                              | When                                      | Then                                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The My Vouchers screen is shown                                                                                    | The user views the screen                 | - Page title "My vouchers" is shown<br>- The search section is shown<br>- The tabs section is shown<br>- The voucher list section is shown<br>- **Redeem a voucher** is shown and can be selected |
| AC-02 | The My Vouchers screen is shown                                                                                    | The user views the search section         | - A search field is shown with placeholder "What are you looking for?"<br>- **Search** is shown and can be selected                                                                                   |
| AC-03 | The My Vouchers screen is shown                                                                                    | The user views the tabs                   | - **Active** is shown and can be selected<br>- **Expired** is shown and can be selected<br>- **Used** is shown and can be selected<br>- **Active** is selected by default |
| AC-04 | The My Vouchers screen is shown and a voucher is shown                                                             | The user views a voucher                  | - The voucher state is shown<br>- Validity is shown as **No Expiry**, or as **Valid until** and the end date using the shared date format<br>- The voucher name is shown<br>- A short description is shown |
| AC-05 | The My Vouchers screen is shown and a voucher is not used and has not expired                                      | The user views that voucher               | The active state is shown                                                                                                                                                                             |
| AC-06 | The My Vouchers screen is shown and a voucher expires in **3** days or less, has not expired, and has not been used | The user views that voucher               | - The active state is shown<br>- Expiring special labeling is shown                                                                                                                                   |
| AC-07 | The My Vouchers screen is shown and a used voucher is shown                                                        | The user views that voucher               | The used state is shown                                                                                                                                                                               |
| AC-08 | The My Vouchers screen is shown and an expired voucher is shown                                                    | The user views that voucher               | The expired state is shown                                                                                                                                                                            |
| AC-09 | The My Vouchers screen is shown                                                                                    | The user views the voucher list           | - **Active** shows vouchers that are not used and have not expired<br>- **Expired** shows expired vouchers only when they expired less than **90** days ago<br>- On **Expired**, "We only show expired vouchers in the past 90 days." is shown<br>- **Used** shows used vouchers only when they were used less than **90** days ago<br>- On **Used**, "We only show used vouchers in the past 90 days." is shown<br>- Vouchers are shown by the time they were obtained, newest first |
| AC-10 | The My Vouchers screen is shown                                                                                    | The user selects a different tab          | - Vouchers for that tab that can be shown are shown<br>- The search text remains<br>- **Search** is not run again until the user selects **Search** |
| AC-11 | The My Vouchers screen is shown and the user has entered search text that is not only spaces                       | The user selects **Search**               | The voucher list shows vouchers on the selected tab that can be shown and whose voucher name or short description contains the search text. Matching is not case-sensitive                            |
| AC-12 | The My Vouchers screen is shown and a voucher is shown                                                             | The user selects that voucher             | The user is taken to Voucher Detail (LF-S-039)                                                                                                                                                        |
| AC-13 | The My Vouchers screen is shown                                                                                    | The user selects **Redeem a voucher**     | The user is taken to Redeem a Voucher (LF-S-040)                                                                                                                                                      |


## 6. Edge cases & error cases


| ID    | Case (category)                  | Trigger / entry                                                                                         | Expected behavior (observable)                                                                                          | Exit / recovery                                      |
| ----- | -------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| EC-01 | Edge — no vouchers               | The user has no vouchers                                                                                | - Tabs remain shown<br>- "No vouchers found." is shown<br>- **Redeem a voucher** remains shown and can be selected      | The user stays on My Vouchers                        |
| EC-02 | Edge — no vouchers on the selected tab | The selected tab has no vouchers that can be shown                                                | - "No vouchers found." is shown<br>- **Redeem a voucher** remains shown and can be selected<br>- On **Expired**, "We only show expired vouchers in the past 90 days." is shown<br>- On **Used**, "We only show used vouchers in the past 90 days." is shown | The user stays on My Vouchers                        |
| EC-03 | Edge — no matching vouchers      | The user selects **Search** and no voucher on the selected tab has a voucher name or short description that contains the search text, not case-sensitive | - "No matching vouchers." is shown<br>- The search field and **Search** remain shown                      | The user stays on My Vouchers                        |
| EC-04 | Edge — empty search              | The search field is empty or contains only spaces and the user selects **Search**                       | Vouchers on the selected tab that can be shown are shown                                                                | The user stays on My Vouchers                        |
| EC-05 | Edge — missing voucher field     | A voucher is shown and the voucher state, validity, voucher name, or short description is missing       | That field is not shown. The voucher remains shown                                                                      | The user stays on My Vouchers                        |
| EC-06 | Edge — voucher has no name       | A voucher has no name                                                                                   | - The voucher is still shown in the list<br>- **Search** can still include that voucher when the short description contains the search text, not case-sensitive | The user stays on My Vouchers                        |


## 7. Data Mapping

N / A
