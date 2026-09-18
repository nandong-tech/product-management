# PRD: LF-S-026 - Payment Method

## 1. Change Log


| Date       | Change                      | Owner    | Rationale                               |
| ---------- | --------------------------- | -------- | --------------------------------------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature              | Payment Method                                                                                                                                                                                                                                                                                    |
| Channels             | App + Web                                                                                                                                                                                                                                                                                         |
| Status (owning team) | PM — drafting                                                                                                                                                                                                                                                                                     |
| Owner (PM)           | Nan Dong                                                                                                                                                                                                                                                                                          |
| Contributors         | Nan Dong                                                                                                                                                                                                                                                                                          |
| Created              | 2026-08-24                                                                                                                                                                                                                                                                                        |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-026 - Payment Method](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747240017/PRD+LF-S-026+-+Payment+Method) |
| Jira                 | —                                                                                                                                                                                                                                                                                                 |
| API Spec             | N / A                                                                                                                                                                                                                                                                                             |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The payment method screen is where the user pays for this purchase. The user can pay with a credit or debit card. A logged-in user can also pay with wallet, and can save a card for future purchases, choose a saved card, or enter another card.

### b. Goals

- Choose credit or debit card as the payment method
- Choose wallet as the payment method while logged in
- Pay the amount for this purchase
- Enter credit card details
- Save a card for future purchases while logged in
- Choose a saved card or enter another card while logged in when saved cards exist

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                                                                              | When                                     | Then                                                                                                                                                                                                                                                                                       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The payment method screen is shown                                                                                                                                 | The user views the screen                | - Page title "Payment method" is shown<br>- Helper text "How do you want to pay?" is shown<br>- **Credit / Debit Card** is shown and can be selected<br>- **Credit / Debit Card** is selected<br>- **Pay** is shown and can be selected<br>- **Pay** shows **$** followed by this purchase’s total amount |
| AC-02 | The payment method screen is shown and the user is logged in                                                                                                       | The user views the screen                | - **Wallet** is shown and can be selected<br>- The balance in wallet is shown with a **$** sign                                                                                                                                                                                            |
| AC-03 | The payment method screen is shown, the user is logged in, **Credit / Debit Card** is selected, and the user has at least one saved card                           | The user views the screen                | - The saved cards are shown and each can be selected<br>- A saved card is selected<br>- **Enter another card** is shown and can be selected                                                                                                                                                                                 |
| AC-04 | The payment method screen is shown and the user is logged in                                                                                                       | The user selects **Wallet**              | **Wallet** is selected                                                                                                                                                                                                                                                                     |
| AC-05 | The payment method screen is shown and **Wallet** is selected                                                                                                      | The user selects **Credit / Debit Card** | **Credit / Debit Card** is selected                                                                                                                                                                                                                                                        |
| AC-06 | The payment method screen is shown, the user is logged in, **Credit / Debit Card** is selected, and the user has at least one saved card                           | The user selects **Enter another card**  | A card details sheet is shown                                                                                                                                                                                                                                                              |
| AC-07 | The payment method screen is shown, **Credit / Debit Card** is selected, and the user has no saved cards                                                           | The user selects **Pay**                 | A card details sheet is shown                                                                                                                                                                                                                                                              |
| AC-08 | The card details sheet is shown                                                                                                                                    | The user views the sheet                 | - **Card number** is shown and is required<br>- **Name on card** is shown and is required<br>- **Expiry date** is shown and is required<br>- **CVV** is shown and is required<br>- **Pay** is shown and can be selected<br>- **Pay** shows **$** followed by this purchase’s total amount                 |
| AC-09 | The card details sheet is shown and the user is logged in                                                                                                          | The user views the sheet                 | **Save card** is shown and can be selected                                                                                                                                                                                                                                                 |
| AC-10 | The card details sheet is shown, all payment validation has passed, the user is logged in, and **Save card** is selected                                           | The user selects **Pay**                 | That card is saved on the account for future purchases                                                                                                                                                                                                                                     |
| AC-11 | The card details sheet is shown                                                                                                                                    | The user closes the sheet                | The sheet is not shown. The user stays on the payment method screen                                                                                                                                                                                                                        |


## 6. Edge cases & error cases


| ID    | Case (category)                     | Trigger / entry                                                                                                             | Expected behavior (observable)                                                                                                                                | Exit / recovery                                                                   |
| ----- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| EC-01 | Edge — Checkout total is FREE       | This purchase’s **Total** on Checkout is **FREE**                                                                           | **Pay** shows **$0.00**                                                                                                                                       | N / A                                                                             |
| EC-02 | Error — not enough balance in wallet | **Wallet** is selected, the user selects **Pay**, and the user’s balance in wallet is less than this purchase’s total amount | - Message "You don't have enough balance in wallet to make this payment." is shown<br>- **Got it** is shown and can be selected<br>- The purchase is not paid | The user selects **Got it**. The message closes. The user stays on Payment Method |


## 7. Data Mapping

N / A
