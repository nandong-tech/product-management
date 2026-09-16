# PRD: LF-S-021 - Checkout

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Checkout                                                                         |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-18                                                                       |
| Last updated         | 2026-09-10 |
| Figma                | TBD                                                                              |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Checkout screen is where the user reviews the offers they are buying and continues the purchase.

### b. Goals

- Review the offers and total for this purchase
- Enter a referral code for a SIM offer purchase
- Apply a voucher code
- Review or add delivery details for a Physical SIM purchase
- Review eSIM send-to details
- Continue to payment

### c. Non-Goals

- Applying a referral code as a discount or voucher on Checkout. A valid referral emails a voucher outside app and web.

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The Checkout screen is shown and this purchase has at least one offer | The user views the screen | - Page title "Checkout" is shown<br>- **Order summary** is shown<br>- **Voucher code** is shown<br>- **Voucher code** is optional<br>- **Apply** is shown<br>- **Proceed to payment** is shown and can be selected |
| AC-02 | The Checkout screen is shown and this purchase has at least one offer | The user views **Order summary** | - Each offer in this purchase is shown with offer name, quantity, and line total<br>- **Total** shows the sum of the line totals of the offers in this purchase |
| AC-03 | The Checkout screen is shown and this purchase includes a Physical SIM offer or an eSIM offer | The user views the screen | - **Referral code** is shown<br>- **Referral code** is optional<br>- **Order summary** and **Total** are not changed by the referral code |
| AC-04 | The Checkout screen is shown, this purchase has only Physical SIM offers, the user is logged in, and this account has a default address in Saved addresses (LF-S-023) | The user comes to the Checkout screen for the first time this purchase | - **Deliver to** is shown<br>- The default address is shown as the delivery address, including its name, phone number, and address<br>- The email is the current account’s email<br>- **Edit** is shown and can be selected |
| AC-05 | The Checkout screen is shown, this purchase has only Physical SIM offers, the user is logged in, and **Deliver to** is shown | The user selects **Edit** | The user is taken to Saved addresses (LF-S-023) |
| AC-06 | The Checkout screen is shown, this purchase has only Physical SIM offers, and the user is not logged in | The user views the screen | **add your address** is shown and can be clicked |
| AC-07 | The Checkout screen is shown, this purchase has only Physical SIM offers, the user is not logged in, and **add your address** is shown | The user clicks **add your address** | The user is taken to Add or edit address (LF-S-022) |
| AC-08 | The user has added, edited, or selected the delivery details and returns to Checkout, and delivery details are present | The user views the screen | - **Deliver to** is shown<br>- The user’s name is shown<br>- The user’s phone number is shown<br>- The address is shown<br>- If the user is logged in, the email is the current account’s email<br>- If the user is not logged in, the email from the delivery details is shown<br>- **Edit** is shown and can be selected |
| AC-09 | The Checkout screen is shown, this purchase has only Physical SIM offers, the user is not logged in, and **Deliver to** is shown | The user selects **Edit** | The user is taken to Add or edit address (LF-S-022) |
| AC-10 | The Checkout screen is shown, this purchase is for an eSIM offer, the user is not logged in, and eSIM purchase details are not filled | The user views the screen | - **Send to** is shown<br>- **Fill in your details** is shown and can be clicked |
| AC-11 | The Checkout screen is shown, this purchase is for an eSIM offer, the user is not logged in, and **Fill in your details** is shown | The user clicks **Fill in your details** | The user is taken to eSIM purchase fill info (LF-S-024) |
| AC-12 | The user is not logged in, has verified the OTP for the eSIM purchase details, and returns to Checkout | The user views the screen | - **Send to** is shown<br>- The name, phone number, and email from the eSIM purchase details are shown<br>- **Edit** is shown and can be selected |
| AC-13 | The Checkout screen is shown, this purchase is for an eSIM offer, the user is not logged in, and **Send to** shows the name, phone number, and email | The user selects **Edit** | The user is taken to eSIM purchase fill info (LF-S-024) |
| AC-14 | The Checkout screen is shown, this purchase is for an eSIM offer, and the user is logged in | The user views the screen | - **Send to** is shown<br>- The name, phone number, and email from the current account are shown<br>- The name, phone number, and email cannot be changed |
| AC-15 | The Checkout screen is shown and all purchase validation has passed | The user selects **Proceed to payment** | The user is taken to Payment (LF-J-014) |
| AC-16 | The Checkout screen is shown, this purchase has at least one offer, and **Voucher code** is empty | The user views **Apply** | **Apply** cannot be selected |
| AC-17 | The Checkout screen is shown and **Voucher code** is filled | The user views **Apply** | **Apply** is shown and can be selected |
| AC-18 | The Checkout screen is shown, **Voucher code** has a valid voucher code that can be applied to this purchase, and the discount is less than **Total** | The user selects **Apply** | - The discount is shown in **Order summary**<br>- The applied voucher code is shown in **Order summary** and can be removed<br>- A question icon is shown next to the applied voucher code<br>- **Total** updates to the sum of the line totals of the offers in this purchase, minus the discounts that apply |
| AC-19 | The Checkout screen is shown, **Voucher code** has a valid voucher code that can be applied to this purchase, and the discount is greater than or equal to **Total** | The user selects **Apply** | - The discount is shown in **Order summary**<br>- The applied voucher code is shown in **Order summary** and can be removed<br>- A question icon is shown next to the applied voucher code<br>- **Total** shows **FREE** |
| AC-20 | The Checkout screen is shown, an applied voucher code is shown, **Voucher code** has a valid voucher code that can be applied to this purchase, that voucher code does not conflict with an already applied voucher code, and the discount is less than **Total** | The user selects **Apply** | - That voucher code is applied<br>- Already applied voucher codes stay applied<br>- The discounts are shown in **Order summary** in the order they were applied<br>- A question icon is shown next to each applied voucher code<br>- **Total** updates to the sum of the line totals of the offers in this purchase, minus the discounts that apply |
| AC-21 | The Checkout screen is shown, an applied voucher code is shown in **Order summary**, and this is web | The user hovers the question icon next to that applied voucher code | A tooltip is shown with that voucher code’s description |
| AC-22 | The Checkout screen is shown, an applied voucher code is shown in **Order summary**, and this is the app | The user selects the question icon next to that applied voucher code | A popup is shown with that voucher code’s description |
| AC-23 | The Checkout screen is shown, this is the app, and the voucher description popup is shown | The user closes the popup | The popup is not shown |
| AC-24 | The Checkout screen is shown and an applied voucher code is shown | The user removes that applied voucher code | - That voucher code is no longer applied<br>- That discount is not shown in **Order summary**<br>- **Total** updates |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — missing offer name | An offer in this purchase has no offer name | The offer name is not shown; the rest of that offer remains shown in **Order summary** | N / A |
| EC-02 | Edge — missing line total | An offer in this purchase has no line total | The line total is not shown; that offer contributes **0** to **Total**; the rest of that offer remains shown in **Order summary** | N / A |
| EC-03 | Edge — logged in with no default address | The Checkout screen is shown, this purchase has only Physical SIM offers, the user is logged in, and this account has no default address | **add your address** is shown and can be clicked | The user clicks **add your address**. The user is taken to Saved addresses (LF-S-023) |
| EC-04 | Error — invalid referral code | The user selects **Proceed to payment** with a **Referral code** that is filled and is not a valid referral code | - Message "Sorry, the referral code you entered is invalid. Please double check and reenter." is shown<br>- **Got it** is shown and can be selected<br>- **Proceed to payment** does not continue | The user selects **Got it**. The message closes. The user stays on Checkout. If the referral code is still filled and is not valid, selecting **Proceed to payment** shows this message again. **Proceed to payment** continues only after the referral code is corrected to a valid referral code or is removed |
| EC-05 | Error — purchase limit reached | The user selects **Proceed to payment** and at least one offer in this purchase has reached its purchase limit | - Message "You've reached the maximum purchase limit for offer [offer name]! Try again next time." is shown, using the offer name of each offer in this purchase that has reached its purchase limit<br>- If more than one of those offers has reached its purchase limit, those offer names are listed with a comma as the delimiter<br>- **Back** is shown and can be selected<br>- **Proceed to payment** does not continue | The user selects **Back**. The message closes. The user stays on Checkout |
| EC-06 | Error — eSIM purchase details not filled | The Checkout screen is shown, this purchase is for an eSIM offer, the user is not logged in, eSIM purchase details are not filled, and the user selects **Proceed to payment** | - Message "You need to fill in your details first." is shown<br>- **Got it** is shown and can be selected<br>- **Proceed to payment** does not continue | The user selects **Got it**. The message closes. The user clicks **Fill in your details** and can try again |
| EC-07 | Error — delivery address not added | The Checkout screen is shown, this purchase has only Physical SIM offers, delivery details are not present, and the user selects **Proceed to payment** | - Message "You need to add your address first." is shown<br>- **Got it** is shown and can be selected<br>- **Proceed to payment** does not continue | The user selects **Got it**. The message closes. The user adds a delivery address and can try again |
| EC-08 | Error — invalid voucher code | The user selects **Apply** with a **Voucher code** that is filled and is not a valid voucher code | - Message "Sorry, the discount code "[voucher code]" you entered is invalid. Please double-check to make sure it is correct." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-09 | Error — voucher code already used | The user selects **Apply** with a voucher code that has already been used | - Message "It looks like this code "[voucher code]" has already been used." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-10 | Error — voucher code usage cap reached | The user selects **Apply** with a voucher code that has reached the maximum times it can be used | - Message "The code "[voucher code]" you entered has already reached the maximum times it can be used." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-11 | Error — voucher code not applicable | The user selects **Apply** with a voucher code that is not applicable to this purchase | - Message "Sorry, the discount code "[voucher code]" you entered is not applicable." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-12 | Error — voucher code expired | The user selects **Apply** with a voucher code that is expired | - Message "Sorry, the discount code "[voucher code]" you entered is expired." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-13 | Error — voucher code conflict | The user selects **Apply** with a voucher code that conflicts with an already applied voucher code | - Message "The voucher code you entered conflicts with an existing code, "[voucher code]". Choose which code you prefer to use." is shown, using the already applied voucher code<br>- **Apply new code** is shown and can be selected<br>- **Use existing code** is shown and can be selected<br>- The new voucher code is not applied yet | The user selects **Apply new code**: the new voucher code is applied, the previous voucher code is removed, **Order summary** and **Total** update. The user selects **Use existing code**: the message closes, the previous voucher code stays applied, the new voucher code is not applied |
| EC-14 | Error — order already free | The user selects **Apply** when **Total** is **FREE** | - Message "This order is already free. Additional voucher codes cannot be applied." is shown<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes |
| EC-15 | Error — voucher code not applicable to this user | The user selects **Apply** with a voucher code that is assigned to a different user | - Message "It looks like the code "[voucher code]" you entered isn't applicable to you. Please enter a different code." is shown, using the entered voucher code<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied | The user selects **Got it**. The message closes. The user can enter a different voucher code and try **Apply** again |
| EC-16 | Error — Apply too many times | The user selects **Apply** for the **11th** time within **1** minute, or selects **Apply** again before that **1** minute has ended, including after leaving Checkout and returning within that **1** minute | - Message "It looks like you've clicked the button too many times in a short period. Please wait a moment and try again." is shown<br>- **Got it** is shown and can be selected<br>- The voucher code is not applied<br>- **Apply** remains shown and can be selected | The user selects **Got it**. The message closes. The user can apply a voucher successfully after **1** minute |
| EC-17 | Error — Proceed to payment during Apply wait | The user has selected **Apply** for the **11th** time within **1** minute, and selects **Proceed to payment** before **1** minute has ended, including after leaving Checkout and returning within that **1** minute | - Message "It looks like you've clicked the button too many times in a short period. Please wait a moment and try again." is shown<br>- **Got it** is shown and can be selected<br>- **Proceed to payment** does not continue<br>- **Apply** remains shown and can be selected | The user selects **Got it**. The message closes. The user stays on Checkout. **Proceed to payment** can continue after the **1** minute wait has ended |
| EC-18 | Edge — voucher entered but not applied | The user has entered a **Voucher code**, has not selected **Apply**, and selects **Proceed to payment** | - The voucher code is not applied<br>- **Order summary** and **Total** are not changed by that code<br>- If all purchase validation has passed, the user is taken to Payment (LF-J-014) | N / A |
| EC-19 | Edge — return with entered values | The user has entered values on the Checkout screen, left the screen, and returns to the Checkout screen | The previously entered values are still shown | N / A |


## 7. Data Mapping

N / A