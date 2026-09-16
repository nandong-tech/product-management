# PRD: LF-S-030 - eSIM Installation Result

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                      |
| -------------------- | -------------------------- |
| Feature              | eSIM Installation Result   |
| Channels             | App                        |
| Status (owning team) | PM — drafting              |
| Owner (PM)           | Nan Dong                   |
| Contributors         | Nan Dong                   |
| Created              | 2026-08-28                 |
| Last updated         | 2026-09-10 |
| Figma                | TBD                        |
| Jira                 | —                          |
| API Spec             | N / A                      |
| Links (optional)     | shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The eSIM installation result screen is where the user sees whether eSIM set-up on this device completed. This screen is used in shop purchase, eSIM port-in, and eSIM swap.

### b. Goals

- See whether eSIM set-up completed
- Continue from this screen

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
| AC-01 | The eSIM installation result screen is shown, eSIM set-up completed, and this is shop purchase (LF-J-003) | The user views the screen | - Heading "Successful eSIM Set-up" is shown<br>- Text "Yayyy, your eSIM has been set-up! You'll need to register your eSIM first to enjoy our services. Welcome to the fam!" is shown<br>- **Log out & activate your new SIM** is shown and can be selected<br>- **Back to Shop** is shown and can be selected |
| AC-02 | The eSIM installation result screen is shown, eSIM set-up completed, and this is shop purchase (LF-J-003) | The user selects **Log out & activate your new SIM** | - The user is logged out<br>- The user is taken to Activation — Enter Number (LF-S-005) |
| AC-03 | The eSIM installation result screen is shown, eSIM set-up completed, and this is shop purchase (LF-J-003) | The user selects **Back to Shop** | The user is taken to Shop landing page (LF-S-028) |
| AC-04 | The eSIM installation result screen is shown, eSIM set-up completed, and this is eSIM port-in or eSIM swap | The user views the screen | - Heading "Successful eSIM Set-up" is shown<br>- Text "Yayyy, your eSIM has been set-up! You'll need to register your eSIM first to enjoy our services. Welcome to the fam!" is shown<br>- The CTAs for this flow are TBD — confirm with PM |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — eSIM set-up failed in shop purchase | The eSIM installation result screen is shown, eSIM set-up did not complete, and this is shop purchase (LF-J-003) | - Heading "eSIM Set-up Failed" is shown<br>- Text "Sorry, it seems like we encountered issues setting-up your eSIM. Don't worry! Simply scan the QR code or click the link in your email to try again." is shown<br>- **Back to Shop** is shown and can be selected | The user selects **Back to Shop**. The user is taken to Shop landing page (LF-S-028) |
| EC-02 | Error — eSIM set-up failed in eSIM port-in or eSIM swap | The eSIM installation result screen is shown, eSIM set-up did not complete, and this is eSIM port-in or eSIM swap | - Heading "eSIM Set-up Failed" is shown<br>- Text "Sorry, it seems like we encountered issues setting-up your eSIM. Don't worry! Simply scan the QR code or click the link in your email to try again." is shown<br>- The CTAs for this flow are TBD — confirm with PM | TBD — confirm with PM |


## 7. Data Mapping

N / A
