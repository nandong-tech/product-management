# Edge cases & error / negative scenarios (agent)

Use this for **§6 only**. Do **not** put happy-path success flow here — that belongs in **§5**.

## What goes where

| Put in… | Meaning | Examples |
|---------|---------|----------|
| **§5 Acceptance Criteria** | **Happy path only** — (1) what the user will see, (2) what the user can do, (3) what happens when the user performs an action | Guest sees CTAs; clicks **Resend OTP** → new OTP sent; user enters OTP correctly → next step |
| **§6 Edge cases** | **All extreme / rare** situations on this page/journey | Missing offer image / name / price; input at max+1; unusual but valid combinations the product must still handle |
| **§6 Error / negative** | **All feature-specific** failures and negatives | Wrong OTP; max attempts; add would exceed **99**; checkout mix; empty search results |

**Not §5:** missing data (“if X is missing”, “when present”, placeholder if missing), error messages, blocked actions, wrong OTP, lockouts, rate limits — those are **§6**. See parent authoring-rules §2m.

**Not in any PRD §5 or §6** — use [shared general context](../../../../shared/general-context.md) only:

- Unhandled API error codes
- API failure
- Timeout (generic timeout)
- Network error / slow network (generic network error)
- Required field empty or incomplete (inline **"This is required"**)
- Incorrect number format (inline **"The number format is incorrect"**)
- Quantity field input
- When front-end field validation runs (leave field, then again on submit)

**Not §6:** happy-path success (correct CTA, successful verify) — those are **§5**.

Stay on **this** page/journey (authoring-rules §2f). Keep outcomes user-visible and abstract (no HTTP codes / mechanism).

Walk applicable groups below. Mark N/A with a reason when the feature has no input, no remote resources, etc.

---

## A. Error / negative scenarios (failures)

### A1. Resource & media load failure

- [ ] Remote image / background / asset fails to load → what is shown instead (e.g. default background); primary actions still usable
- [ ] Partial asset failure (one of several resources) → what remains usable

### A2. API / config / data failure (designed product response)

**Shared generic errors — do not write a §6 EC** for:

- Unhandled API error codes
- API failure
- Timeout (usually > 1 minute unless the PRD specifies otherwise)
- Network error / slow network
- Required field empty or incomplete (inline "This is required")
- Incorrect number format (inline "The number format is incorrect")
- Quantity field input

Behavior and copy live only in [shared general context](../../../../shared/general-context.md).

Only when the PM/brief **specifies a feature-specific** fallback, handled error code, or empty state. Do **not** invent:

- “CTA / destination cannot open” when that path should always work → **bug**
- “Destination not configured” / hide CTA unless the PM defined that empty state → otherwise **bug / ops misconfig**, not a §6 row

Allowed examples when purposely specified:

- [ ] Required API for **content on this page** fails with a **feature-specific** message / fallback on this page
- [ ] Save/submit fails with a **specified** product error path → error shown; data not treated as saved

### A3. Invalid input (when this page collects input)

- [ ] Empty required field on submit
- [ ] Whitespace-only / wrong format / disallowed characters
- [ ] Paste of oversized text
- [ ] Leading/trailing spaces (trim vs reject — observable rule)

### A4. Messaging quality (every failure EC)

- [ ] User sees a specific, actionable message or fallback state (not a blank failure)
- [ ] Recovery path is explicit (retry, dismiss, choose another action on **this** page)

---

## B. Edge cases (extremes)

Use only when something is **extreme / rare**, not everyday flow.

### B1. Boundaries (input)

- [ ] Min length − 1 / at min / at max / max + 1
- [ ] Numeric min/max / zero / negative if numeric input exists
- [ ] Date/time at constraint edges

### B2. Extreme interaction (only if product-relevant)

- [ ] Rapid repeated select that could open duplicate destinations — **only** if specifying failure/guard behavior; otherwise skip
- [ ] Two tabs conflicting on the same edit (last-write or conflict message) — only if this page edits shared data

### B3. Telecom extremes (when in scope on **this** page)

See [../../../../shared/telecom-domain.md](../../../../shared/telecom-domain.md).

- [ ] Offline / no connectivity when this page needs network → **do not** invent a PRD EC; use shared generic network error in general-context
- [ ] Extreme account/SIM states **only if this page** must behave differently (otherwise leave to the owning flow’s PRD)

---

## C. Do **not** put these in §6 (use §5, or omit)

- [ ] Happy-path: what is shown, what user can do, successful action outcomes → **§5**
- [ ] Correct CTA routing when all systems work → **§5**
- [ ] Unhandled API error codes / API failure / timeout / network or slow network / empty or incomplete required field / incorrect number format → **general-context only**, not this PRD
- [ ] A timing-only EC for leave-field + submit → omit; feature field-error ECs use **leaves the field**, not submit-only
- [ ] “Log in / destination cannot be opened” or “destination not configured” when that path should always work → **bug / misconfig**, not a product negative (omit unless PM specifies a designed degraded mode)
- [ ] Localization / larger text as default quality (unless PM purposely asks for an extreme/failure case)
- [ ] Anything that happens on another page after hand-off

---

## Writing pattern

Bad EC (happy path misplaced): “User enters OTP correctly → next step.” → **§5 AC** instead.

Bad EC: “Invalid input shows an error.”  
Good EC (failure): “User enters a wrong OTP → message "Invalid OTP entered" is shown → user can enter the code again.”

Good EC (extreme, when relevant): “Name at max length + 1 on Save → inline error; last saved name remains → user shortens and saves.”
