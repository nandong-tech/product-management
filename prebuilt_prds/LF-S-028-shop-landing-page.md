# PRD: LF-S-028 - Shop Landing Page

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Shop Landing Page                                                                |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-26                                                                       |
| Last updated         | 2026-09-10 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-028 - Shop Landing Page](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747633660/PRD+LF-S-028+-+Shop+Landing+Page) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Shop landing page is where the user browses SIM offers and data offers categories, each with its own featured offers, before opening an offer list or an offer detail.

### b. Goals

- Browse the SIM offers category and its featured offers
- Browse the data offers category and its featured offers

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
| AC-01 | The Shop landing page is shown | The user views the screen | - Page title "Shop" is shown<br>- The **SIM offers** category is shown<br>- The **Data offers** category is shown |
| AC-02 | The Shop landing page is shown and at least one featured offer is configured for SIM offers on the DNO portal | The user views the **SIM offers** category | Featured offers for SIM offers are shown under **SIM offers**, as configured on the DNO portal |
| AC-03 | The Shop landing page is shown and at least one featured offer is configured for data offers on the DNO portal | The user views the **Data offers** category | Featured offers for data offers are shown under **Data offers**, as configured on the DNO portal |
| AC-04 | The Shop landing page is shown and a featured offer is shown under a category | The user views that featured offer | The featured offer shows the offer image, offer name, offer start and end time, and offer price |
| AC-05 | The Shop landing page is shown | The user selects **SIM offers** | The user is taken to Offer list (LF-S-017) for SIM offers |
| AC-06 | The Shop landing page is shown | The user selects **Data offers** | The user is taken to Offer list (LF-S-017) for data offers |
| AC-07 | The Shop landing page is shown and a featured offer is shown under a category | The user selects that featured offer | The user is taken to Offer detail (LF-S-019) for that offer |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — no featured offers for a category | The Shop landing page is shown and no featured offers are configured for a category on the DNO portal | That category remains shown; featured offers are not shown under that category | The user stays on the Shop landing page |
| EC-02 | Edge — missing featured offer image | A featured offer is shown and the offer image is missing | A placeholder image is shown on that featured offer | N / A |
| EC-03 | Edge — missing featured offer field | A featured offer is shown and offer name, offer start and end time, or offer price is missing | That field is not shown; the featured offer remains shown | N / A |


## 7. Data Mapping

N / A
