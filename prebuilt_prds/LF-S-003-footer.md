# PRD: LF-S-003 - Footer

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |

## 2. Header


| Field                | Value                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| Feature              | Footer                                                                            |
| Channels             | App + Web                                                                         |
| Status (owning team) | PM — drafting                                                                     |
| Owner (PM)           | Nan Dong                                                                          |
| Contributors         | Nan Dong                                                                          |
| Created              | 2026-07-28                                                                        |
| Last updated         | 2026-09-10  |
| Figma                | N / A                                                                             |
| Jira                 | —                                                                                 |
| API Spec             | N / A                                                                             |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The footer is the persistent bottom bar on pages that include it, showing the operator logo, the operator’s social profile links, and links to **Privacy Policy** and **Terms & Conditions**.

### b. Goals

- See the operator logo in the footer
- Open the operator’s social profiles from the footer
- Open Privacy Policy and Terms & Conditions from the footer

### c. Non-Goals

- Footer content other than the operator logo, social links, **Privacy Policy**, and **Terms & Conditions** (e.g. contact blocks, payment badges)

### d. Entry points


| Entry point                                | In or out of scope? | Note                                        |
| ------------------------------------------ | ------------------- | ------------------------------------------- |
| User views a page that includes the footer | In                  | Footer is shown as part of that page layout |


### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The footer is shown | The user views the footer | - The operator logo is shown<br>- Configured social links among **Facebook**, **Instagram**, **YouTube**, and **LinkedIn** are shown and can be selected<br>- **Privacy Policy** and **Terms & Conditions** are shown and can be selected |
| AC-02 | A configured social link is shown | The user selects that social link | The user is taken to the operator’s matching external social profile (confirm exact tenant URLs) |
| AC-03 | The footer is shown | The user selects **Privacy Policy** | The user is taken to Privacy Policy |
| AC-04 | The footer is shown | The user selects **Terms & Conditions** | The user is taken to Terms & Conditions |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — resource load | Operator logo fails to load | A default operator logo is shown; configured social links remain usable | User continues on the page |


## 7. Data Mapping

N / A