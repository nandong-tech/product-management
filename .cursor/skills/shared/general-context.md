# Shared general context — product-wide rules

**Applies to every skill in this workspace**, in addition to [telecom-domain.md](telecom-domain.md). Read before drafting, reviewing, relating, or publishing PRDs.

This file holds **shared product rules** that are true for the product as a whole. A rule lives here so it is defined **once** — it is **not** repeated in each PRD.

Authoring-only rules live in [generate-prd authoring-rules](../generate-prd/reference/authoring-rules.md), not here: CTA labels (§2f), page title (§2o).

## Shopping Cart — one cart for the product (product-wide authoring)

There is **one** Shopping Cart. Do not give each offer category or purchase flow its own cart.

The control that **opens** Shopping Cart is the **cart icon in the Header**, next to the control that opens the menu. Opening it shows all cart items. Add to cart adds to that same cart. **Clear Cart** clears the whole cart.

Author the open-cart control **only** in the Header PRD. Do **not** add a page-level cart icon or “open Cart” control in other screen PRDs. Offer tiles and **Add to cart** still add items; they do not open Shopping Cart.

Author the cart contents and checkout in the Shopping Cart PRD §5.

## Checkout mix — Physical SIM and eSIM (product-wide authoring)

Cart can hold mixed offer types. **Checkout** of the selected items must follow these mix rules:

- **Physical SIM** cannot be checked out with other offer types. A Physical SIM checkout has only Physical SIM offers.
- **eSIM** checkout has only eSIM, only **one** eSIM, and quantity **1**.
- A **data** checkout has only data offers. Data offers cannot be checked out with SIM offers.

**Checkout** does not continue when the selection breaks a mix rule. Message: **"The offers you selected cannot be checked out together."**

eSIM can still be added to cart. An eSIM cart line uses the same quantity range as other offers. Mix is blocked on **Checkout** from Shopping Cart, including when eSIM quantity is greater than **1**. Mix is also blocked on Offer detail **Buy now** when this offer cannot be checked out on its own, including when eSIM quantity is greater than **1**. An offer that is no longer available is blocked on Shopping Cart **Checkout** and on Offer detail **Buy now**, with message **"[offer name] is no longer available."** Checkout only receives a purchase that can be checked out. Decrease at **1** still confirms delete.

Author the cart **Checkout** blocks in the Shopping Cart PRD. Author the purchase mix in the Checkout PRD.

**Checkout voucher Apply** does not depend on eSIM purchase details being filled or on a delivery address being added. Do not block **Apply** because fill details / **Send to** is empty, or because delivery details are not present. Those checks are only on **Proceed to payment**.

## Shopping Cart — decrease at quantity 1 (product-wide authoring)

On **Shopping Cart**, when an item’s quantity is **1**, the decrease icon stays available. Do not disable it.

Selecting decrease at quantity **1** shows confirmation **"Are you sure to delete this item from cart?"**

- Confirm: remove that item. If no items remain, show the empty-cart state.
- Cancel: close the confirmation. The item stays at quantity **1**.

**Rules:**

- Author this in the Shopping Cart PRD §5. It is not a shared error to omit from that PRD.
- Do **not** use this on Offer detail or other non-cart quantity steppers. There, decrease is disabled at **1** unless the user says otherwise.

## Quantity and amount number input (product-wide)

The user can change the value with **increase** and **decrease** in steps of **1**, or by entering a number directly.

These fields accept **integers only**. Only integers can be entered. Letters, decimal points, and other non-digit characters are not accepted.

Then, when the user tries to enter a letter, decimal point, or other non-digit character:

- The character is not accepted
- The value stays an integer

**Rules:**

- This behavior is defined **once** here and is **not** written as §5 ACs or §6 ECs in each PRD.
- It applies to quantity fields and to **Transfer Amount** on Balance Transfer.
- Offer list and Offer search have no quantity field. Add to cart from those tiles adds quantity **1**. Author that in those PRDs.
- Range rules such as **1** to **99**, and whether decrease is disabled at **1**, stay in the feature PRD. Range field errors show **immediately after the user leaves the field**, not only on **Buy now**, **Add to cart**, **Checkout**, or **Transfer**.

| Case | Message |
|------|---------|
| Generic error | "Something went wrong. Please try again." |
| Generic network error | "There is something wrong with your network connection. Check your connection and try again." |
| Generic timeout | "Time out" |
| Required field empty or incomplete | "This is required" |
| Incorrect number format | "The number format is incorrect" |

## Front-end field validation timing (product-wide)

For **field validations that run on the front end** and do **not** call an API:

1. Run the validation **right after the user leaves the field**
2. Run the same validation **again** when the user submits the form (**Submit** / **Next** / **Checkout** / **Redeem** / equivalent)

Then:

- Show the inline error on that field when the value is invalid
- Keep the user on the current screen / in the current flow
- Let the user correct the field and try again
- On submit, do not continue while any of those field errors remain

**Rules:**

- Run the check **immediately after the user leaves the field**, then again on submit. Do not wait for **Submit** / **Next** / **Checkout** / **Buy now** / **Add to cart** / **Redeem** before showing the field error.
- Do **not** add a separate PRD EC whose only job is to restate this timing.
- Feature ECs for an invalid field value use this trigger: **the user leaves the field** with that invalid value. Do **not** use a submit action as the only trigger.
- On submit, do not continue while any of those field errors remain. That may appear in the same EC Expected behavior.
- Input that is **blocked while typing**, such as integers only, is not this rule. That is an entry restriction.

## When a field is required (product-wide authoring)

A field is **required** when the user cannot complete this screen’s **primary action** without a value in that field.

Examples:

- Redeem a voucher cannot complete without **Voucher Code** → **Voucher Code** is required
- Login cannot complete without mobile number and PIN → those fields are required

A field is **not** required when the user can still complete this screen’s primary action without it.

Example: Checkout **Voucher code** is optional because **Proceed to payment** can continue without applying a code. Empty behavior for that field stays in the Checkout PRD.

**Rules:**

- When the field is required, the shared **Required field empty or incomplete** rule applies. Do **not** restate “this field is required” and do **not** add a per-PRD empty-field EC.
- When the field is optional, say so in that PRD if empty behavior is not the shared required-field message.

## Required field empty or incomplete (product-wide)

When a **required** field is **empty** or **incomplete** (e.g. a fixed-length field such as a 6-digit PIN that is not fully filled), show an **inline** error on that field with the required-field message **"This is required"**. Use the shared **Front-end field validation timing** above.

Then:

- Keep the user on the current screen / in the current flow
- Let the user fill the field and try again

## Incorrect number format (product-wide)

When a mobile number (MSISDN) does **not** match the shared MSISDN format (`xxx-xxx-xxxx`), show an **inline** error on that field with **"The number format is incorrect"**. Use the shared **Front-end field validation timing** above.

Then:

- Keep the user on the current screen / in the current flow
- Let the user correct the number and try again

## Loading while an API is in progress (product-wide)

**When the user comes to a page** and an API call for that page is in progress, the **whole page** is in a loading state.

Then:

- The page content is not shown and cannot be used until that call finishes
- When the call succeeds, the page is shown as specified in that PRD
- When the call fails, the shared network, timeout, or generic error rules apply

**When the user selects an action button** that calls an API (**Next**, **Submit**, **Create account**, **Resend code**, or equivalent), the loading effect is shown **on the existing page**. The user stays on that page until the call finishes.

Then:

- The user cannot select that action again until the call finishes. A second request is not sent
- When the call succeeds, continue as specified in that PRD
- When the call fails, the shared network, timeout, or generic error rules apply (the user stays on the current page)

A PRD specifies loading **only** when that page or action is different from these defaults (for example only part of the page loads, or a control shows loading while the rest of the page stays usable).

**Rules:**

- This behavior is defined **once** here and is **not** written as a §5 AC or §6 EC in each PRD.
- Do **not** add a per-PRD loading row that only restates whole-page loading on arrival, loading on the existing page after an action button, or blocking a second tap while that call is in progress.
- Do **not** invent a spinner, skeleton, or loading message unless that PRD’s special treatment includes it.

## Generic network error (product-wide)

Show the generic network error message when **slow network** or **no network** is detected.

Then:

- Keep the user on the current screen / in the current flow
- Let the user try the action again when connectivity allows (e.g. select **Submit** / **Next** again on a registration or activation form)

## Generic timeout (product-wide)

Show the generic timeout message when an API call takes longer than expected — usually **more than 1 minute**, unless a different timeout is specified in the PRD.

Then:

- Keep the user on the current screen / in the current flow
- Let the user try the action again (e.g. select **Submit** / **Next** again)

## Generic error (product-wide)

Show the generic error message when:

1. The API **fails** for a reason other than the network or timeout cases above, or
2. The API returns an **error code that is not handled** by a feature-specific rule

Then:

- Keep the user on the current screen / in the current flow
- Let the user try the action again (e.g. resubmit a registration form with **Submit**, or continue using the app)

**Rules (all shared errors):**

- Do **not** use **Oops** in error copy. Start with what is wrong, then a short next step when the user can do something.
- This behavior and copy are defined **once** here and are **not** written as §6 EC rows in each PRD.
- Do **not** quote these messages in PRDs and do **not** add per-PRD ECs for network detection, timeout, unhandled API error codes, generic API failures, **empty or incomplete required fields**, **incorrect MSISDN / number format**, **image load failure** (shared placeholder), **when** front-end field validation runs (leave field and submit again), **quantity field input**, **app killed / cache cleared** (entered values not shown), **loading while an API is in progress** (whole page on arrival, or on the existing page after an action button), or **a second tap of that action while its call is in progress**.
- **Feature-specific** errors (handled error codes or defined product messages such as wrong OTP, lockout, max requests, or a resource fallback) still belong in that PRD’s §6.
- On registration / activation **Submit** failure for any of the shared cases above, the user stays on the form (e.g. registration review) and can **resubmit**.

## Image load failure (product-wide)

When an **image** fails to load (offer image, content image, or other product image), show a **placeholder image** in its place.

**Rules:**

- This behavior is defined **once** here and is **not** written as a §6 EC row in each PRD.
- Do **not** invent per-PRD ECs for image load failure when the fallback is the shared placeholder.
- **Exceptions** still belong in the feature PRD when the product uses a **different** fallback (e.g. Welcome background → product default background; header/footer logo → default text logo).

## Entered values after leave-and-return (product-wide)

When the user leaves a screen and returns, previously entered values are still shown.

Entered values are **not** shown when:

- The app has been killed by the user or by the system
- The app cache has been cleared
- On web, the browser has been closed or the site cache has been cleared

This is the general app experience.

**Rules:**

- This behavior is defined **once** here and is **not** written as a §6 EC row in each PRD.
- Feature leave-and-return rows cover only leaving the screen and coming back while the app is still running and the cache has not been cleared. On web, they cover the same visit while the browser is still open and the site cache has not been cleared.
- Do **not** add per-PRD ECs for app killed, cache cleared, browser closed, or site cache cleared.

## MSISDN format (product-wide)

Mobile numbers (MSISDN) use this display / entry format:

| Rule | Value |
|------|--------|
| Format | `xxx-xxx-xxxx` |

**Rules:**

- This format is defined **once** here and is **not** restated as a format rule in each PRD.
- PRDs that collect or show a mobile number refer to **the shared MSISDN format**.
- Validation when the entered number does not match this format uses the shared **Incorrect number format** message above — do **not** restate that EC in each PRD.

## Date format (product-wide)

Dates use this display / entry format:

| Rule | Value |
|------|--------|
| Format | `YYYY-MM-DD` |

**Rules:**

- This format is defined **once** here and is **not** restated as a format rule in each PRD.
- PRDs that collect or show a date refer to **the shared date format**.
- Screen-specific date rules stay in that PRD, such as birthday selected only and not typed, or dates after today not selectable.

## Address format (product-wide)

Postal / street address collection uses this field set:

| Field | Required | Notes |
|-------|----------|-------|
| Address line 1 | Yes | |
| Address line 2 | No | |
| City | No | |
| Country | Yes | Select; options = ISO 3166-1 English short country names |
| State / Province | Yes | Select; options depend on the selected **Country**; empty list when no country is selected (field is not disabled) |
| Postal code | No | Numbers only |

**Rules:**

- This field set is defined **once** here. PRDs that collect an address refer to **the shared address format**.
- **Country** is a **select** field. Options use the common standard list: **ISO 3166-1** English short country names (do not invent a custom country list in each PRD).
- **State / Province** is a **select** field. Options use **ISO 3166-2** subdivisions for the selected country. When no **Country** is selected, the options list is **empty** (the field is **not** disabled).
- **Postal code** accepts **numbers only**; non-number characters are not accepted.
- Empty required address fields use the shared **Required field empty or incomplete** message above — do **not** restate those as §6 ECs in each PRD.
- Screen PRDs may still list the shared fields in §5 so the page is testable.
