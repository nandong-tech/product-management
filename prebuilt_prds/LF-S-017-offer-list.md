# PRD: LF-S-017 - Offer List

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Offer List                                                                       |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-17                                                                       |
| Last updated         | 2026-09-10 |
| Figma                | N / A                                                                            |
| Jira                 | —                                                                                |
| API Spec             | [catalog-get-offers.yaml](../data_mappings/catalog-get-offers.yaml)               |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The Offer list screen is where the user browses offers for the offer category they selected in the previous step. The list shows only offers in that category that are available to this user. Some offers apply only to certain cohorts.

### b. Goals

- Browse offers that are available to this user for the selected offer category



### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                                                    | When                                                           | Then                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Offer list screen is shown and there is at least one offer available to this user under the offer category the user selected in the previous step | The user views the screen | - The current offer category is the offer category the user selected in the previous step<br>- The page title is the name of that offer category<br>- Only offers under that offer category that are available to this user are shown as offer tiles<br>- A search icon is shown and can be selected<br>- A filter icon is shown and can be selected<br>- Quick links are shown with **All** selected by default |
| AC-02 | The Offer list screen is shown and there is at least one offer available to this user under the current offer category                                | The user views the quick links                                 | - Quick links for the current offer category come from remote config<br>- **All** is shown as the first quick link<br>- Other quick links are remote-config entries whose names exactly match a level 1 child category of the current offer category, matching is case-sensitive, and that category has at least one offer available to this user under it, including offers in its subcategories<br>- After **All**, quick links follow remote-config order |
| AC-03 | The Offer list screen is shown and at least one offer tile is shown                                                                      | The user views an offer tile                                   | The offer tile shows the offer image, offer name, offer start and end time, and offer price |
| AC-04 | The Offer list screen is shown, the user is logged in, and at least one offer tile is shown | The user views an offer tile | A cart icon is shown on every offer tile |
| AC-05 | The Offer list screen is shown, the user is not logged in, and at least one offer tile is shown | The user views an offer tile | A cart icon is shown on SIM offers only |
| AC-06 | The Offer list screen is shown and the user has not applied a **Sort by** option                                                         | The user views the offer list                                  | Offer tiles are ordered by sort priority from the DNO portal, where a smaller number is higher in the list; when sort priority is the same, tiles are ordered by start time from the DNO portal with the latest first |
| AC-07 | The Offer list screen is shown                                                                                                           | The user selects a quick link                                  | - If the quick link is **All**, the offer list shows all offers available to this user under the current offer category, including offers in subcategories, and **Filter by category** has nothing selected<br>- If the quick link is not **All**, the offer list shows only offers available to this user under that quick link’s category, including offers in its subcategories<br>- If that category is a **Filter by category** option, it is selected in **Filter by category**<br>- The selected quick link and **Filter by category** stay aligned |
| AC-08 | The Offer list screen is shown                                                                                                           | The user selects the filter icon                               | - The Filter sheet is shown with title "Filter & sort" and a control to close it<br>- The sheet has **Filter by category** and **Sort by**<br>- **Filter by category** options are only level 1 child categories of the current offer category that have at least one approved and running offer available to this user under them, including in subcategories<br>- The user can select one **Filter by category** option or none<br>- The selected **Filter by category** option matches the selected quick link when that quick link’s category is among the options; when **All** is selected, nothing is selected in **Filter by category**<br>- **Sort by** options are **Price: High to Low**, **Price: Low to High**, and **Newest first**<br>- **Apply** is shown and can be selected |
| AC-09 | The Filter sheet is shown and the user has selected filter or sort options                                                               | The user selects **Apply**                                     | - The Filter sheet is closed<br>- If a **Filter by category** option is selected, the offer list shows only offers available to this user under that category<br>- If a **Sort by** option is selected, the offers are ordered based on the selected **Sort by** option<br>- If no **Filter by category** option is selected, the offer list shows all offers available to this user under the current offer category, including subcategories, and **All** is shown as selected in the quick links<br>- If the applied **Filter by category** option exists as a quick link with the exact same name and case-sensitive match, that quick link is shown as selected so Filter by category and quick links stay aligned |
| AC-10 | The Filter sheet is shown                                                                                                                | The user selects the control to close the sheet                | - The Filter sheet is closed<br>- The offer list is unchanged from before the sheet was opened |
| AC-11 | The Offer list screen is shown and the search icon is shown                                                                              | The user selects the search icon                               | The user is taken to Offer search (LF-S-018)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| AC-12 | The Offer list screen is shown and at least one offer is shown                                                                           | The user selects the offer                                     | The user is taken to Offer detail (LF-S-019) for that offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| AC-13 | The Offer list screen is shown and a cart icon is shown on an offer tile | The user selects the cart icon on that offer tile | - That offer is added to cart<br>- Toast "added to cart successfully" is shown |




## 6. Edge cases & error cases


| ID    | Case (category)                               | Trigger / entry                                                                                                                                                                                                         | Expected behavior (observable)                                                                                                                                                                                         | Exit / recovery                         |
| ----- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| EC-01 | Edge — no offers available                    | The Offer list screen is shown and no offers available to this user are returned under the current offer category                                                                                   | - Page title is the name of the current offer category<br>- Empty-list message "No offers available" is shown<br>- The offer list, filter icon, and quick links are not shown<br>- The search icon is not shown | The user stays on the Offer list screen |
| EC-02 | Edge — category has no offers                 | A level 1 child category under the current offer category has no approved and running offers available to this user under it, including in its subcategories                                        | - That category is not shown in **Filter by category**<br>- A configured quick link whose name matches that category is not shown                                                                                         | N / A                                   |
| EC-03 | Error — remote config unavailable or empty    | There is at least one offer available to this user under the current offer category, and the remote config API fails or no quick links are configured for the current offer category                 | Only **All** is shown as a quick link                                                                                                                                                                                  | N / A                                   |
| EC-04 | Edge — configured quick link does not qualify | A quick link other than **All** is in remote config but its name is not an exact case-sensitive match to a level 1 child under the current offer category, or that category has no approved and running offers available to this user under it | That quick link is not shown, even though it is in the configuration; **All** remains shown                                                                                                                            | N / A                                   |
| EC-05 | Edge — no level 1 categories with offers      | There is at least one offer available to this user under the current offer category, and no level 1 child category under the current offer category has approved and running offers available to this user under it, including in its subcategories | **Filter by category** is not shown; **Sort by** and **Apply** remain available                                                                                                                                        | N / A                                   |
| EC-06 | Edge — missing offer tile field               | An offer is shown and offer name, offer start and end time, or offer price is missing                                                                                                                                   | That field is not shown; the offer tile remains shown                                                                                                                                                                  | N / A                                   |
| EC-07 | Edge — missing offer image                    | An offer is shown and the offer image is missing                                                                                                                                                                        | A placeholder image is shown on the offer tile                                                                                                                                                                         | N / A                                   |
| EC-08 | Error — add to cart would exceed maximum quantity | The Offer list screen is shown, a cart icon is shown on an offer tile, adding that offer would make that cart item’s quantity greater than **99**, and the user selects the cart icon on that offer tile | - The offer is not added to cart<br>- That cart item’s quantity is unchanged<br>- A second cart item is not added for that offer<br>- Message "Sorry, the quantity exceeds the maximum allowed." is shown | The user lowers that cart item’s quantity so adding that offer would not exceed **99**, then can try again |
| EC-09 | Edge — empty sort priority | An offer’s sort priority from the DNO portal is empty | That offer is ordered as if it had the largest sort priority number | N / A |
| EC-10 | Edge — applied filter has no matching quick link | The user applies a **Filter by category** option that does not exist as a quick link with the exact same name and case-sensitive match | No quick link is shown as selected | N / A |




## 7. Data Mapping

| UI element / label | Endpoint | Field | Empty / fallback | Notes |
| ---- | ---- | ---- | ---- | ---- |
| Offer list | POST /api/v3/catalog/get_offers | offer_by_id | Show "No offers available". Offer list, filter icon, quick links, and search icon are not shown. | Map of offer ID to offer entity. Only offers available to this user are returned. |
| Filter by category / quick link (not All) | POST /api/v3/catalog/get_offers | category_ids | Offer list shows all offers available to this user under the current offer category, including subcategories. All is selected in the quick links. | Category IDs to filter offers by. Category names are front-end code, not this field. |
| Offer category IDs | POST /api/v3/catalog/get_offers | offer_by_id.{id}.categories | Offer tile remains shown when the offer is in the list. | IDs of the categories this offer belongs to. Used to decide which Filter by category options have offers. Labels are front-end. |