# PRD: LF-S-074 - Port out result

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Port out result |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-10-13 |
| Last updated | 2026-10-13 |
| Figma | N / A |
| Confluence | [PRD: LF-S-074 - Port out result](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7920713890/PRD+LF-S-074+-+Port+out+result) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The port-out result screen is where the user sees whether the port-out succeeded or failed.

### b. Goals

- See whether the port-out succeeded

### c. Non-Goals

- API calling failure
- API timeout
- Network error

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The port-out result screen is shown and the port-out succeeded | The user views the screen | - The user is no longer logged in<br>- Heading "Port-out successful" is shown<br>- Text "Your number will leave this operator." is shown<br>- **Back to Home** is shown and can be selected |
| AC-02 | The port-out result screen is shown and the port-out succeeded | The user selects **Back to Home** | The user is taken to Welcome (LF-S-001) |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — port-out failed for a listed reason | The port-out result screen is shown and the port-out failed because the number is not in the right state, the user is locked by contract, or the user has an outstanding balance | - Heading "Port-out failed" is shown<br>- The failure reason shown is "The number is not in the right state.", "The user is locked by contract.", or "The user has an outstanding balance."<br>- **Back to My Account** is shown and can be selected | The user selects **Back to My Account**.<br>The user is taken to My Account Home (LF-S-055) |
| EC-02 | Error — port-out failed for another reason | The port-out result screen is shown and the port-out failed for a reason other than the number state, the contract lock, or an outstanding balance | - Heading "Port-out failed" is shown<br>- Text "Something went wrong. Please try again." is shown<br>- **Back to My Account** is shown and can be selected | The user selects **Back to My Account**.<br>The user is taken to My Account Home (LF-S-055) |

## 7. Data Mapping

N / A
