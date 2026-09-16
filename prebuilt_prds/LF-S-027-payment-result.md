# PRD: LF-S-027 - Payment Result

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Payment Result                                                                                     |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-08-24                                                                                         |
| Last updated         | 2026-09-10 |
| Figma                | TBD                                                                                                |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The payment result screen is where the user sees whether payment for this purchase completed and offer provisioning succeeded.

### b. Goals

- Confirm whether this purchase went through
- See what was purchased
- Get purchased eSIM info

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                                                                                | When                                                                  | Then                                                                                                                                                                                                                                       |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | The payment result screen is shown and payment for this purchase completed and offer provisioning succeeded                                          | The user views the screen                                             | - Heading "Successful Purchase!" is shown<br>- **Order summary** is shown<br>- **Back to Shop** is shown                                                                                                                                         |
| AC-02 | The payment result screen is shown, payment for this purchase completed and offer provisioning succeeded, and this purchase is not for an eSIM offer | The user views the screen                                             | Text "We sent an email with the confirmation of your purchase." is shown                                                                                                                                                                   |
| AC-03 | The payment result screen is shown, payment for this purchase completed and offer provisioning succeeded, and this purchase is for an eSIM offer     | The user views the screen                                             | Text "We sent an email confirmation of your purchase with your eSIM QR code." is shown                                                                                                                                                     |
| AC-04 | The payment result screen is shown and payment for this purchase completed and offer provisioning succeeded                                          | The user views **Order summary**                                      | - The purchase date and time are shown<br>- Each offer in this purchase is shown with offer name and quantity<br>- The transaction number is shown<br>- The total amount is shown with a **$** sign<br>- Payment method **Credit / Debit Card** or **Wallet** is shown for the method used for this purchase |
| AC-05 | An eSIM success result is shown, and this is web or the user is not logged in or **Display eSIM QR Code** is selected                                | The user views the screen                                             | - Text "Your new eSIM is now ready!" is shown<br>- Manual set-up instructions are shown<br>- The eSIM QR code is shown<br>- **Back to Shop** can be selected                                                                                        |
| AC-06 | An eSIM success result is shown on the app, the user is logged in, and **Download eSIM to this device** is selected                                  | The user views the screen                                             | - Text "Your eSIM is downloading! Don't close the app until it's done." is shown<br>- A **10**-second countdown is shown with "We'll be ready in" and the remaining time                                                                      |
| AC-07 | An eSIM success result is shown on the app, the user is logged in, and **Download eSIM to this device** is selected                                  | The eSIM activation code and ICCID are returned within **10** seconds | The user is taken to Install eSIM (LF-S-029)                                                                                                                                                                                                |
| AC-08 | The payment result screen is shown, payment for this purchase completed and offer provisioning succeeded, and the user is logged in                  | The user selects **Back to Shop**                                     | The user is taken to Shop landing page (LF-S-028)                                                                                                                                                                                          |
| AC-09 | The payment result screen is shown, payment for this purchase completed and offer provisioning succeeded, and the user is not logged in              | The user selects **Back to Shop**                                     | The user is taken to Offer list (LF-S-017) for SIM offers                                                                                                                                                                                  |


## 6. Edge cases & error cases


| ID    | Case (category)                                             | Trigger / entry                                                                                                                                                                                                                                                                                                         | Expected behavior (observable)                                                                                                                                                                                                                                                                                  | Exit / recovery                                                                |
| ----- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| EC-01 | Error — payment completed and offer provisioning failed     | Payment for this purchase completed and offer provisioning failed                                                                                                                                                                                                                                                       | - Heading "Offer provisioning failed" is shown<br>- Text "Sorry, we've encountered a delay in delivering your promo." is shown<br>- **Chat with us** is shown and can be selected                                                                                                                                     | The user selects **Chat with us**. The user is taken to Chat with us (PRD TBD) |
| EC-02 | Error — payment failed with a returned error message        | Payment for this purchase did not complete and an error message is returned for this payment                                                                                                                                                                                                                            | - Heading "Something went wrong" is shown<br>- The error message returned for this payment is shown<br>- **Try again** is shown and can be selected                                                                                                                                                                   | The user selects **Try again**. The user is taken to Payment method (LF-S-026) |
| EC-03 | Error — payment failed with no returned error message       | Payment for this purchase did not complete and no error message is returned for this payment                                                                                                                                                                                                                            | - Heading "Something went wrong" is shown<br>- Text "Please check if your transaction already pushed through in your transaction history or email before trying again." is shown<br>- **Try again** is shown and can be selected                                                                                      | The user selects **Try again**. The user is taken to Payment method (LF-S-026) |
| EC-04 | Error — eSIM QR code not ready                              | Payment for this purchase completed, offer provisioning succeeded, this purchase is for an eSIM offer, this is web or the user is not logged in or the eSIM set-up option for this purchase is **Display eSIM QR Code**, and the eSIM QR code is not generated or the eSIM QR code is generated but failed to load      | - Text "Looks like it's taking longer to process your eSIM. We'll email your eSIM QR code" is shown<br>- The eSIM QR code is not shown<br>- **Order summary** and **Back to Shop** remain shown                                                                                                                 | N / A                                                                          |
| EC-05 | Error — eSIM activation code and ICCID not returned in time | Payment for this purchase completed, offer provisioning succeeded, this purchase is for an eSIM offer, this is the app, the user is logged in, the eSIM set-up option for this purchase is **Download eSIM to this device**, and the eSIM activation code and ICCID are not returned successfully within **10** seconds | - Text "Your eSIM is downloading! Don't close the app until it's done." is no longer shown<br>- The countdown timer is no longer shown<br>- Text "Sorry! Seems like we're having some issues. Don't worry, we'll send your eSIM QR code to your email" is shown<br>- **Order summary** and **Back to Shop** remain shown | N / A                                                                          |
| EC-06 | Edge — missing offer name                                   | An offer in this purchase has no offer name                                                                                                                                                                                                                                                                             | The offer name is not shown; the rest of that offer remains shown in **Order summary**                                                                                                                                                                                                                          | N / A                                                                          |
| EC-07 | Edge — missing quantity                                     | An offer in this purchase has no quantity                                                                                                                                                                                                                                                                               | The quantity is not shown; the rest of that offer remains shown in **Order summary**                                                                                                                                                                                                                            | N / A                                                                          |
| EC-08 | Edge — missing purchase date and time                       | The purchase date and time are missing                                                                                                                                                                                                                                                                                  | The purchase date and time are not shown; the rest of **Order summary** remains shown                                                                                                                                                                                                                           | N / A                                                                          |
| EC-09 | Edge — missing transaction number                           | The transaction number is missing                                                                                                                                                                                                                                                                                       | The transaction number is not shown; the rest of **Order summary** remains shown                                                                                                                                                                                                                                | N / A                                                                          |
| EC-10 | Edge — missing total amount                                 | The total amount is missing                                                                                                                                                                                                                                                                                             | The total amount is not shown; the rest of **Order summary** remains shown                                                                                                                                                                                                                                      | N / A                                                                          |


## 7. Data Mapping

N / A
