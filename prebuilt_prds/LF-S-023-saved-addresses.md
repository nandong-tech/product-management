# PRD: LF-S-023 - Saved Addresses

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Saved Addresses                                                                  |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-21                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Confluence           | [PRD: LF-S-023 - Saved Addresses](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7747829825/PRD+LF-S-023+-+Saved+Addresses) |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The saved-addresses screen is where the logged-in user reviews saved delivery addresses and chooses one for delivery.

### b. Goals

- Review saved delivery addresses
- Choose a saved address for delivery
- Set a saved address as the default address
- Add or edit a saved address

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
| AC-01 | The saved-addresses screen is shown, the user is logged in, and this account has at least one saved address | The user views the screen | - Page title "Saved addresses" is shown<br>- The saved addresses are shown<br>- **Add a new address** is shown and can be selected |
| AC-02 | The saved-addresses screen is shown, the user is logged in, and a saved address is shown | The user views that saved address | - The name is shown<br>- The phone number is shown; the number uses the shared MSISDN format<br>- The address is shown<br>- If that saved address is the default address, **Default** is shown<br>- **Set as default address** is shown and can be selected<br>- That saved address can be selected<br>- **Edit** is shown and can be selected |
| AC-03 | The saved-addresses screen is shown, the user is logged in, a saved address is shown, and that saved address is not the default address | The user selects **Set as default address** on that saved address | - That saved address is saved as the default address on the account. If another saved address was the default, that address is no longer the default. The account has only one default address<br>- Message "Address set as the default address" is shown<br>- **Default** is shown on that saved address<br>- The user stays on the saved-addresses screen |
| AC-04 | The saved-addresses screen is shown, the user is logged in, and a saved address is shown | The user selects that saved address | - That saved address is selected for this purchase<br>- The user is taken to Checkout (LF-S-021) |
| AC-05 | The saved-addresses screen is shown, the user is logged in, and a saved address is shown | The user selects **Edit** on that saved address | The user is taken to Add or edit address (LF-S-022) |
| AC-06 | The saved-addresses screen is shown and the user is logged in | The user selects **Add a new address** | The user is taken to Add or edit address (LF-S-022) |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Edge — no saved addresses | The saved-addresses screen is shown, the user is logged in, and this account has no saved address | - Page title "Saved addresses" is shown<br>- An empty address state is shown with the message "No saved addresses yet."<br>- **Add a new address** is shown at the bottom and can be selected | The user selects **Add a new address**. The user is taken to Add or edit address (LF-S-022) |
| EC-02 | Edge — default address turned off | The saved-addresses screen is shown, the user is logged in, a saved address is shown, that saved address is the default address, and the user selects **Set as default address** on that saved address | - That saved address is not the default address on the account<br>- The account has no default address<br>- Message "Address is no longer the default address" is shown<br>- The selected address on Checkout is cleared | The user stays on the saved-addresses screen |

## 7. Data Mapping

N / A
