# PRD: LF-S-039 - Voucher Detail

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Voucher Detail                                                                   |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-09-03                                                                       |
| Last updated         | 2026-09-10                                                                        |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-039 - Voucher Detail](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7791411244/PRD+LF-S-039+-+Voucher+Detail) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Voucher detail screen is where the logged-in user reviews one voucher.

### b. Goals

- Review a voucher

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                      | When                      | Then                                                                                                                                                    |
| ----- | ------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Voucher detail screen is shown         | The user views the screen | - The voucher name is shown<br>- The detailed voucher description is shown<br>- The voucher code is shown<br>- **Copy** is shown and can be selected |
| AC-02 | The Voucher detail screen is shown and the voucher code is shown | The user selects **Copy** | The voucher code is copied |


## 6. Edge cases & error cases


| ID    | Case (category)              | Trigger / entry                                                                                  | Expected behavior (observable)                         | Exit / recovery                   |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | --------------------------------- |
| EC-01 | Edge — missing voucher field | A voucher name or detailed voucher description is missing                                        | That field is not shown. The other fields remain shown | The user stays on Voucher detail |
| EC-02 | Error — voucher code fails   | The Voucher detail screen is shown and the voucher code fails                                    | Placeholder "--" is shown for the voucher code. **Copy** is shown and can be selected | The user stays on Voucher detail |
| EC-03 | Error — copy when voucher code failed | The voucher code failed and placeholder "--" is shown, and the user selects **Copy**      | Nothing is copied                                      | The user stays on Voucher detail |


## 7. Data Mapping

N / A
