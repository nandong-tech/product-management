# PRD: LF-S-019 - Offer Detail

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Offer Detail                                                                     |
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

The Offer detail screen is where the user reviews one offer and can buy it now or add it to cart. Guests can purchase SIM offers. Other offer types require the user to log in.

### b. Goals

- Review offer image, name, price, and offer details
- Choose quantity
- Buy now or add to cart
- Log in to purchase when the offer is not a SIM offer and the user is not logged in

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
| AC-01 | The Offer detail screen is shown for an offer | The user views the screen | - The offer image is shown<br>- The offer name is shown<br>- The current offer price is shown<br>- **Offer Details** is shown with the offer details content<br>- A quantity control is shown with value **1** by default<br>- Maximum quantity is **99** |
| AC-02 | The Offer detail screen is shown and the user is logged in, or this offer is a SIM offer | The user views the screen | - **Buy now** is shown and can be selected<br>- **Add to cart** is shown and can be selected |
| AC-03 | The Offer detail screen is shown for an offer that is not a SIM offer, and the user is not logged in | The user views the screen | **Log in to purchase** is shown and can be selected |
| AC-04 | The Offer detail screen is shown for an offer that is not a SIM offer, and the user is not logged in | The user selects **Log in to purchase** | The user is taken to Login (LF-S-016) |
| AC-05 | The Offer detail screen is shown, this is the app, the user is logged in, this offer is still available, this offer is an eSIM, and the quantity is **1** | The user selects **Buy now** | The user is taken to eSIM capability check (LF-S-025) with that offer and its quantity |
| AC-06 | The Offer detail screen is shown, the user is logged in or this offer is a SIM offer, this offer is still available, this is web or this offer is not an eSIM or the user is not logged in, and if this offer is an eSIM the quantity is **1** | The user selects **Buy now** | The user is taken to Checkout (LF-S-021) with that offer and its quantity |
| AC-07 | The Offer detail screen is shown and the user is logged in, or this offer is a SIM offer | The user selects **Add to cart** | - If that offer is not in the cart, it is added as one cart item with its quantity<br>- If that offer is already in the cart, that cart item’s quantity increases by that quantity<br>- Toast "added to cart successfully" is shown |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — missing offer image | The offer image is missing | A placeholder image is shown | N / A |
| EC-02 | Edge — missing offer name | The offer name is missing | The offer name is not shown; the rest of the Offer detail screen remains shown | N / A |
| EC-03 | Edge — missing offer price | The offer price is missing | The offer price is not shown; the rest of the Offer detail screen remains shown | N / A |
| EC-04 | Edge — missing offer details | Offer details content is missing | **Offer Details** content is not shown; the rest of the Offer detail screen remains shown | N / A |
| EC-05 | Error — quantity above maximum | The Offer detail screen is shown and the user leaves the quantity field with a value greater than **99** | - An inline error is shown on the quantity field immediately<br>- **Buy now** / **Add to cart** does not continue | The user corrects the quantity to **99** or less and can try again |
| EC-06 | Edge — quantity stepper at minimum | The Offer detail screen is shown and quantity is **1** | The decrease icon is disabled | N / A |
| EC-07 | Edge — quantity stepper at maximum | The Offer detail screen is shown and quantity is **99** | The increase icon is disabled | N / A |
| EC-08 | Error — add to cart would exceed maximum quantity | The Offer detail screen is shown, the user is logged in or this offer is a SIM offer, adding that offer would make that cart item’s quantity greater than **99**, and the user selects **Add to cart** | - The offer is not added to cart<br>- That cart item’s quantity is unchanged<br>- A second cart item is not added for that offer<br>- Message "Sorry, the quantity exceeds the maximum allowed." is shown | The user lowers the quantity on this screen, or that cart item’s quantity in the cart, so adding that offer would not exceed **99**, then can try again |
| EC-09 | Error — Buy now when offer is no longer available | The Offer detail screen is shown, **Buy now** is shown, this offer is no longer available, and the user selects **Buy now** | - Message "[offer name] is no longer available." is shown, using this offer’s name<br>- The user stays on Offer detail | N / A |
| EC-10 | Error — Buy now eSIM quantity greater than 1 | The Offer detail screen is shown for an eSIM offer, **Buy now** is shown, quantity is greater than **1**, and the user selects **Buy now** | - Message "The offers you selected cannot be checked out together." is shown<br>- The user stays on Offer detail | The user sets quantity to **1** and can try again |


## 7. Data Mapping

N / A
