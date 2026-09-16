# PRD: LF-S-036 - Referral

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-10 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Feature              | Referral                                                                                           |
| Channels             | App + Web                                                                                          |
| Status (owning team) | PM — drafting                                                                                      |
| Owner (PM)           | Nan Dong                                                                                           |
| Contributors         | Nan Dong                                                                                           |
| Created              | 2026-09-02                                                                                         |
| Last updated         | 2026-09-10                                                                                          |
| Figma                | TBD                                                                                                |
| Jira                 | —                                                                                                  |
| API Spec             | N / A                                                                                              |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The Referral screen is where the logged-in user sees their referral code, how they can refer new users and what they will get for a successful referral, how many people they have referred, and the rewards they have earned.

### b. Goals

- See the referral code and share it via social media
- See how they can refer new users and what they will get for a successful referral
- See how many people they have referred
- See each reward earned from referring new users

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID    | Given                                                                                          | When                                                              | Then                                                                                                                                                                                                 |
| ----- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | The Referral screen is shown                                                                   | The user views the screen                                         | - Page title "Referral" is shown<br>- The referral code section is shown<br>- The referral description section is shown<br>- The referred users section is shown<br>- The reward history section is shown |
| AC-02 | The Referral screen is shown                                                                   | The user views the referral code section                          | - The user's referral code is shown<br>- **Copy** is shown and can be selected<br>- **Share** is shown and can be selected                                                               |
| AC-03 | The Referral screen is shown                                                                   | The user views the referral description section                   | The configured description is shown. It includes how they can refer new users and what the user will get if they successfully refer new users                                                          |
| AC-04 | The Referral screen is shown                                                                   | The user views the referred users section                         | The number of people the user has referred is shown                                                                                                                                                   |
| AC-05 | The Referral screen is shown and the user has earned at least one referral reward              | The user views the reward history section                         | Each reward returned for referring a new user is shown                                                                          |
| AC-06 | The Referral screen is shown                                                                   | The user selects **Copy**                                         | The referral code is copied                                                                                                                                                                           |
| AC-07 | The Referral screen is shown                                                                   | The user selects **Share**                           | The referral code can be shared via social media                                                                                                                                                          |


## 6. Edge cases & error cases


| ID    | Case (category)                         | Trigger / entry                                                                                         | Expected behavior (observable)                                                                                          | Exit / recovery                                      |
| ----- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| EC-01 | Error — referral data fails to load     | The Referral screen is shown and the referral code, referred users, or reward history fails to load     | Placeholder "--" is shown for the referral code, the number of people the user has referred, and the reward history. The configured description remains shown | The user stays on Referral                     |
| EC-02 | Edge — no referral records              | The Referral screen is shown and there are no referral records                                          | **0** is shown for the number of people the user has referred. No records are shown in the reward history               | The user stays on Referral                     |


## 7. Data Mapping

N / A
