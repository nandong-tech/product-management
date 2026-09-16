# PRD: LF-S-025 - eSIM Capability Check

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | eSIM Capability Check                                                            |
| Channels             | App                                                                              |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-25                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |




## 3. Central requirement + Scope



### a. Central requirement

The eSIM capability-check screen is where a logged-in user chooses how to set up an eSIM on this device before checkout.

### b. Goals

- Choose to download the eSIM to this device or display a QR code
- Continue to checkout



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
| AC-01 | The eSIM capability-check screen is shown | The user views the screen | - Page title "Setting up your eSIM" is shown<br>- Text "Choose how you want to set-up your eSIM" is shown<br>- **Download eSIM to this device** is shown<br>- **Display eSIM QR Code** is shown<br>- Text "**Display eSIM QR Code** is best used for adding the eSIM to a different device." is shown<br>- **Next** is shown and can be selected |
| AC-02 | The eSIM capability-check screen is shown and this device supports eSIM | The user views the set-up options | - **Download eSIM to this device** and **Display eSIM QR Code** can be selected<br>- **Download eSIM to this device** is the selected set-up option |
| AC-03 | The eSIM capability-check screen is shown, this device supports eSIM, and **Download eSIM to this device** can be selected | The user selects **Download eSIM to this device** | **Download eSIM to this device** is the selected set-up option |
| AC-04 | The eSIM capability-check screen is shown and **Display eSIM QR Code** can be selected | The user selects **Display eSIM QR Code** | **Display eSIM QR Code** is the selected set-up option |
| AC-05 | The eSIM capability-check screen is shown | The user selects **Next** | - The selected set-up option is kept for this purchase<br>- The user is taken to Checkout (LF-S-021) |




## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — device is not eSIM-capable | The eSIM capability-check screen is shown and this device does not support eSIM | - **Download eSIM to this device** cannot be selected<br>- Message "Sorry, your device is not eSIM-capable." is shown<br>- **Display eSIM QR Code** can be selected<br>- **Display eSIM QR Code** is the selected set-up option | The user can continue with **Display eSIM QR Code** |




## 7. Data Mapping

N / A