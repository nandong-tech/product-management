# PRD: LF-S-020 - Shopping Cart

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Shopping Cart                                                                    |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-17                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-020 - Shopping Cart](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747698743/PRD+LF-S-020+-+Shopping+Cart) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Shopping Cart screen is where the user reviews and manages one shared cart for all offers they can add to cart, then checks out the selected items. Selected items can be checked out together only when they are only Physical SIM offers, or only one eSIM at quantity **1**, or only data offers.

### b. Goals

- Review all cart items in one cart
- Manage what they will buy
- Check out selected items

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
| AC-01 | The Shopping Cart screen is shown and the cart has at least one item | The user views the screen | - Page title "Shopping cart" is shown<br>- **Your Items** is shown with the count of items in the cart<br>- **Clear Cart** is shown and can be selected<br>- **Select All** is shown and can be selected<br>- No items are selected<br>- **Total** shows **0**<br>- **Checkout** is shown and can be selected |
| AC-02 | The Shopping Cart screen is shown and the cart has at least one item | The user views a cart item | - A select checkbox is shown<br>- The offer image is shown<br>- The offer name is shown<br>- The offer price is shown<br>- A quantity control is shown |
| AC-03 | The Shopping Cart screen is shown and the cart has at least one item | The user views a cart item | Quantity is from **1** to **99** |
| AC-04 | The Shopping Cart screen is shown and the cart has no items | The user views the screen | - Message "There is no items in your cart." is shown<br>- **Go to shop** is shown and can be selected |
| AC-05 | The Shopping Cart screen is shown and the cart is not empty | The user selects or clears an item’s select checkbox | - That item’s selected state updates<br>- **Total** updates to the sum of the prices of the selected items, using each item’s quantity |
| AC-06 | The Shopping Cart screen is shown and the cart is not empty | The user selects **Select All** when not all items are selected | All items become selected; **Total** updates to the sum of the prices of all items, using each item’s quantity |
| AC-07 | The Shopping Cart screen is shown and every item is selected | The user selects **Select All** | All items become not selected; **Total** shows **0** |
| AC-08 | The Shopping Cart screen is shown, the cart is not empty, and an item’s quantity is from **1** to **99** | The user changes that item’s quantity | - The item quantity updates<br>- If the item is selected, **Total** updates using the new quantity |
| AC-09 | The Shopping Cart screen is shown and an item’s quantity is **1** | The user selects the decrease icon for that item | A confirmation is shown with the message "Are you sure to delete this item from cart?" |
| AC-10 | The delete-item confirmation is shown | The user confirms | - That item is removed from the cart<br>- **Your Items** count updates<br>- If that item was selected, **Total** updates to the sum of the prices of the remaining selected items, using each item’s quantity<br>- If no items remain, the empty-cart state from AC-04 is shown |
| AC-11 | The delete-item confirmation is shown | The user cancels | The confirmation closes; that item stays in the cart with quantity **1** |
| AC-12 | The Shopping Cart screen is shown and the cart is not empty | The user selects **Clear Cart** | A confirmation is shown with the message "Are you sure to clear all the items in cart?" |
| AC-13 | The Clear Cart confirmation is shown | The user confirms | - All items in the cart are removed<br>- The empty-cart state from AC-04 is shown |
| AC-14 | The Clear Cart confirmation is shown | The user cancels | The confirmation closes; cart items are unchanged |
| AC-15 | The Shopping Cart screen is shown, this is the app, the user is logged in, and the user is checking out an eSIM offer | The user selects **Checkout** | The user is taken to eSIM capability check (LF-S-025) with the selected items and quantities |
| AC-16 | The Shopping Cart screen is shown, at least one item is selected, each selected item has a valid quantity, each selected item is still available, the selected items can be checked out together, and this is web or this purchase is not for an eSIM offer or the user is not logged in | The user selects **Checkout** | The user is taken to Checkout (LF-S-021) with the selected items and quantities |
| AC-17 | The Shopping Cart screen is shown, the cart has no items, and the user is logged in | The user selects **Go to shop** | The user is taken to Shop landing page (LF-S-028) |
| AC-18 | The Shopping Cart screen is shown, the cart has no items, and the user is not logged in | The user selects **Go to shop** | The user is taken to Offer list (LF-S-017) for SIM offers |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — missing offer image | A cart item’s offer image is missing | A placeholder image is shown for that item | N / A |
| EC-02 | Edge — missing offer name | A cart item’s offer name is missing | The offer name is not shown; the rest of the cart item remains shown | N / A |
| EC-03 | Edge — missing offer price | A cart item’s offer price is missing | The offer price is not shown; that item contributes **0** to **Total** when selected; the rest of the cart item remains shown | N / A |
| EC-04 | Error — quantity outside allowed range | The user leaves an item’s quantity field with a value less than **1** or greater than **99** | - An inline error is shown on the quantity field immediately<br>- **Checkout** does not continue | The user corrects the quantity to a value from **1** to **99** and can try again |
| EC-05 | Edge — quantity stepper at maximum | Quantity is **99** | The increase icon is disabled | N / A |
| EC-06 | Error — no items selected | At least one cart item is shown, no items are selected, and the user selects **Checkout** | - Message "You have no items selected to check out." is shown<br>- **Checkout** does not continue<br>- The user stays on Shopping Cart | The user selects at least one item and can try again |
| EC-07 | Error — selected items cannot be checked out together | The selected items cannot be checked out together, and the user selects **Checkout** | - Message "The offers you selected cannot be checked out together." is shown<br>- **Checkout** does not continue<br>- The user stays on Shopping Cart | The user changes the selection so the selected items can be checked out together, then can try again |
| EC-08 | Error — selected item no longer available | A selected item is no longer available, and the user selects **Checkout** | - That item stays in the cart<br>- Message "[offer name] is no longer available." is shown, using that item’s offer name<br>- **Checkout** does not continue<br>- The user stays on Shopping Cart | The user clears that item from the selection or removes it from the cart, then can try again |
| EC-09 | Edge — cart after login | The user added items to cart while not logged in, then logs in | The cart items remain | N / A |
| EC-10 | Edge — cart after logout | The user is logged in, has items in cart, then logs out | The cart items are no longer in the cart | N / A |
| EC-11 | Edge — guest cart when browser cache remains | The user is not logged in, has items in cart, and the browser cache remains | The cart items remain; the user can see those items in the cart | N / A |
| EC-12 | Edge — guest cart when browser cache is gone | The user is not logged in, had items in cart, and the browser cache is gone | The cart items are no longer in the cart | N / A |


## 7. Data Mapping

N / A
