# PRD: LF-P-002 - Basic Page Template (No Back)

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-17 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Basic Page Template (No Back)                                                                                                 |
| Channels             | App + Web                                                                                                                     |
| Status (owning team) | PM — drafting                                                                                                                 |
| Owner (PM)           | Nan Dong                                                                                                                      |
| Contributors         | Nan Dong                                                                                                                      |
| Created              | 2026-08-11                                                                                                                    |
| Last updated         | 2026-09-10  |
| Figma                | N / A                                                                                                                           |
| Jira                 | —                                                                                                                             |
| API Spec             | N / A                                                                                                                         |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |
## 3. Central requirement + Scope

### a. Central requirement

The basic page template (no back) is the reusable page layout with Header (LF-S-002), an optional page title, page content, and Footer (LF-S-003), and no back control.

### b. Goals

- See a page with header, content, and footer
- See a page title when the page has one

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
| AC-01 | A page that uses the basic page template (no back) is shown | The user views the page | - Header (LF-S-002) is shown<br>- The page content area is shown<br>- A back arrow is not shown<br>- Footer (LF-S-003) is shown |
| AC-02 | A page that uses the basic page template (no back) is shown and that page has a page title | The user views the page | The page title is shown |


## 6. Edge cases & error cases

N / A

## 7. Data Mapping

N / A
