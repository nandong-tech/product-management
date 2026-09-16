# PRD: LF-S-018 - Offer Search

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Offer Search                                                                     |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-17                                                                       |
| Last updated         | 2026-09-10 |
| Figma                | N / A                                                                            |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Offer search screen is where the user searches offers within the offer category they came from on Offer list.

### b. Goals

- Search offers in the current offer category by offer name

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
| AC-01 | The Offer search screen is shown and there is at least one offer available under the current offer category | The user views the screen | - A search field is shown with placeholder "What are you looking for?"<br>- **Search** is shown and can be selected<br>- All available offers under the current offer category are shown as offer tiles |
| AC-02 | The Offer search screen is shown and at least one offer tile is shown | The user views an offer tile | The offer tile shows the offer image, offer name, offer start and end time, and offer price |
| AC-03 | The Offer search screen is shown, the user is logged in, and at least one offer tile is shown | The user views an offer tile | A cart icon is shown on every offer tile |
| AC-04 | The Offer search screen is shown, the user is not logged in, and at least one offer tile is shown | The user views an offer tile | A cart icon is shown on SIM offers only |
| AC-05 | The Offer search screen is shown and the user has entered search text that is not only spaces and is at most 100 characters | The user selects **Search** | The offer list shows only available offers under the current offer category whose offer name contains the search text (not case-sensitive) |
| AC-06 | The Offer search screen is shown and the search field is empty or contains only spaces | The user selects **Search** | The offer list shows all available offers under the current offer category |
| AC-07 | The Offer search screen is shown and at least one offer is shown | The user selects the offer | The user is taken to Offer detail (LF-S-019) for that offer |
| AC-08 | The Offer search screen is shown and a cart icon is shown on an offer tile | The user selects the cart icon on that offer tile | - That offer is added to cart<br>- Toast "added to cart successfully" is shown |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — no matching offers | The user selects **Search** and no available offers under the current offer category have an offer name that contains the search text (not case-sensitive) | - Empty-list message "No matching offers" is shown<br>- Offer tiles are not shown<br>- The search field and **Search** remain shown | The user stays on the Offer search screen |
| EC-02 | Edge — missing offer tile field | An offer is shown and offer name, offer start and end time, or offer price is missing | That field is not shown; the offer tile remains shown | N / A |
| EC-03 | Edge — missing offer image | An offer is shown and the offer image is missing | A placeholder image is shown on the offer tile | N / A |
| EC-04 | Edge — offer has no name | An offer under the current offer category has no offer name | - The offer is still shown in the default offer list (offer name field omitted)<br>- That offer is never included when **Search** returns name matches | N / A |
| EC-05 | Error — search text too long | The search field contains more than 100 characters and the user selects **Search** | - Inline error "Enter up to 100 characters" is shown on the search field<br>- The offer list is unchanged<br>- **Search** does not run a new search | The user shortens the text and can select **Search** again |
| EC-06 | Error — add to cart would exceed maximum quantity | The Offer search screen is shown, a cart icon is shown on an offer tile, adding that offer would make that cart item’s quantity greater than **99**, and the user selects the cart icon on that offer tile | - The offer is not added to cart<br>- That cart item’s quantity is unchanged<br>- A second cart item is not added for that offer<br>- Message "Sorry, the quantity exceeds the maximum allowed." is shown | The user lowers that cart item’s quantity so adding that offer would not exceed **99**, then can try again |


## 7. Data Mapping

N / A
