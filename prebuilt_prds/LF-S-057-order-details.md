# PRD: LF-S-057 - Order Details

## 1. Change Log

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| 2026-09-18 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |

## 2. Header

| Field | Value |
|-------|-------|
| Feature | Order Details |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Nan Dong |
| Created | 2026-09-18 |
| Last updated | 2026-09-18 |
| Figma | N / A |
| Confluence | [PRD: LF-S-057 - Order Details](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7828111758/PRD+LF-S-057+-+Order+Details) |
| Jira | — |
| API Spec | N / A |
| Links (optional) | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |

## 3. Central requirement + Scope

### a. Central requirement

The Order Details screen is where the logged-in user reviews one shop order.

### b. Goals

- Review a shop order

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
|----|-------|------|------|
| AC-01 | The Order Details screen is shown and this order is a shop purchase | The user views the screen | - Page title "Order details" is shown<br>- **Order Number** is shown<br>- **Order Time** is shown and uses the shared date format<br>- The order time is shown<br>- **Order summary** is shown |
| AC-02 | The Order Details screen is shown and this order is a shop purchase | The user views **Order summary** | - Each offer in this order is shown with offer name, quantity, and line total<br>- Amounts use the shared project currency<br>- **Discount** is shown<br>- Each applied voucher code is shown with that voucher’s amount off<br>- **Total** is the sum of the line totals of the offers in this order, minus the discounts that apply |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
|----|-----------------|-----------------|--------------------------------|-----------------|
| EC-01 | Edge — no voucher applied | This order has no applied voucher code | - No applied voucher code is shown<br>- **Discount** is not shown<br>- **Total** is the sum of the line totals of the offers in this order | The user stays on Order Details |
| EC-02 | Edge — order is free | The discounts that apply are greater than or equal to the sum of the line totals | **Total** shows **FREE** | The user stays on Order Details |

## 7. Data Mapping

N / A
