# AC / EC coverage checklist (agent)

Use after drafting initial happy-path ACs **and** after mining Stated / Implied / Missed. For each applicable row, ensure §5 or §6 covers it. Skip only if truly N/A for this feature.

**Hard split:** §5 = happy path only. §6 = all edges and errors. Do **not** put missing fields, “when present”, placeholders for missing images, error messages, or blocked actions in an AC. See parent authoring-rules §2m.

Also complete [negative-scenarios.md](negative-scenarios.md) — this file alone is not enough for negatives.

## Journey completeness

- [ ] Happy-path steps / branches / hand-offs are in the **§4 mermaid** — do **not** duplicate those edges as §5 ACs
- [ ] §5 covers only what is **not** in the mermaid (or §5 is `N / A`)
- [ ] §6 covers only feature-related edges/negatives **not** in the mermaid (technical → shared general context)
- [ ] §3d–e are `N / A` when mermaid clearly defines the path (page PRDs: `N / A` when journey owns path); if §3d is filled, entries are not restated as §5-only landing ACs
- [ ] Every step’s **primary CTA** transition is in the mermaid (page PRDs still need a §5 AC for that CTA, except a reusable screen used in more than one journey — flow-specific primary-forward destinations stay on the journey mermaid only)
- [ ] CTA labels follow authoring-rules §2f (**Next** for progress-only; action-specific when the tap does a named action); if brief/design used a conflicting label, user confirmed before drafting — do not silently rewrite
- [ ] Every **secondary** action that changes state has mermaid coverage (journey) or an AC/EC (page)
- [ ] Every **branch** in the mermaid journey has both arms in the **mermaid**
- [ ] Journey start/end are in the mermaid (or in §3d–e when those tables are used); page PRD exits are AC hand-offs
- [ ] Cancel / close / “Back” (if offered in UI) has mermaid, AC, or EC as appropriate
- [ ] Every editable field on the happy path has at least display + change coverage on the owning **screen** PRD (not re-copied into the journey PRD unless asked)

## Missed-information hunt

- [ ] Implied preconditions turned into Givens (logged in, on correct page, prior value exists)
- [ ] Unstated but necessary validations added
- [ ] Unstated persistence after leave / refresh / re-open added as a **§6 Edge**, unless the user says that return path is the usual flow
- [ ] Unstated enable/disable rules for primary CTA added
- [ ] Silent Non-goals not accidentally required

## Display & empty states

- [ ] First load with empty / missing optional data
- [ ] Zero, null, and placeholder (“—”, “Free”, “Unknown”) if product defines them
- [ ] Loading vs ready (only if user-visible and product-specified)
- [ ] Read-only vs editable presentation if both exist
- [ ] **Complex page see-ACs:** skeleton AC names sections only; then one see AC per section; if a section Then is still long, one AC per field or control. Do not keep one very long “views the screen” AC. Simple pages stay one see AC.

## Input & validation

- [ ] Required field left empty when the user leaves the field → **do not** invent a PRD EC; use shared required-field message and leave-field timing in general-context
- [ ] Incorrect MSISDN / number format when the user leaves the field → **do not** invent a PRD EC; use shared incorrect-number-format message and leave-field timing in general-context
- [ ] Do **not** add an AC/EC that only restates leave-field + submit timing
- [ ] Feature field errors: Trigger is **the user leaves the field** with that invalid value. Do **not** use Submit / Next / Checkout / Buy now / Add to cart as the only trigger
- [ ] Invalid format for other field types such as email or ID when not covered by shared number-format rules: **what** is invalid and the **message** in this PRD; trigger is leave-field
- [ ] Boundary values (min/max length) if the journey collects input
- [ ] **Shopping Cart:** one universal cart, not a cart per offer category or purchase flow. The Header owns the cart icon that opens Shopping Cart; do **not** add that entry point on other screens. Physical SIM cannot be checked out with other offer types. eSIM checkout is only eSIM, only one eSIM, and quantity **1**. Data offers cannot be checked out with SIM offers. An eSIM cart line uses the same quantity range as other offers; **Checkout** is blocked when eSIM quantity is greater than **1**. Decrease stays available at quantity **1**; selecting decrease at **1** shows delete confirmation, confirm removes the item, cancel keeps quantity **1**. Do **not** disable decrease at 1 on cart. Other quantity steppers disable decrease at **1** unless the user says otherwise.
- [ ] **Quantity fields:** stepper, direct edit, and integer-only entry are **not** in the PRD; they live in general-context. Offer list / Offer search have no quantity field; add to cart uses quantity **1**. Range such as **99**, and whether decrease is disabled at **1**, stay in this PRD.
- [ ] Paste / autofill of unexpected characters (hostile input → EC)
- [ ] Multiple fields invalid in one submit (if multi-field forms)

## Auth & permission

- [ ] Logged-out vs logged-in when journey branches on it → **§5** (normal flow), not §6
- [ ] Wrong role / no ownership when it is expected product behavior → §5; when it is a failure/deny path → §6 Error

## Continuity & navigation

- [ ] Refresh / back / leave-and-return with values still shown → **§6 Edge** unless the user says that return path is the usual flow; then §5. Do **not** add app-killed or cache-cleared rows (general-context)
- [ ] Deep link / QR / secondary entry that skips earlier steps (if In scope) → usually §5
- [ ] Dirty-form navigate away → §5 or §6 Error only if discard/fail behavior is a failure path

## Channels / platforms

Read Header → **Channels** first (agent coverage gate). Skip the other channel’s checklist rows when **App** only.

**PRD writing:** describe what the user sees. Do **not** stamp `(App or Web)` on shared rows. Name a channel or app/browser situation only when the observable differs.

### Always (match Channels)

- [ ] Landing / entry covered for every in-scope channel (one shared “opens Welcome” row is OK if outcome is the same)
- [ ] Primary CTAs use channel-neutral wording when both are in scope (`selects` for buttons/controls; **clicks** for links — not App-only `taps`)
- [ ] Session / auth branching covered when auth matters (user-visible; no platform stamp if same on both)

### When Channels = App + Web

- [ ] Shared happy-path outcomes covered once (apply on both surfaces in testing — not restated per platform in the PRD)
- [ ] Do **not** add layout / viewport / visual stacking ACs, or UI control visual effects (checkbox checked / empty / dash), unless purposely included (parent §2e). Write business rules only.
- [ ] Resume / leave-and-return covered in user terms; split only if App vs Web product situation differs
- [ ] First-screen back covered; split only if system back vs browser back produce different user-visible product rules
- [ ] No redundant platform labels on rows that are identical across channels
- [ ] Agent confirmed both surfaces are still covered (Gaps filled / checklist) even when PRD text is platform-light

### When Channels = App

- [ ] No browser-only, desktop-viewport-only, or “open in new tab” requirements invented

## Concurrency & repeats

- [ ] Double-click / repeat submit on primary CTA
- [ ] Re-entry after success (idempotent user experience)

## Messaging

- [ ] Error copy is user-visible and actionable (EC recovery column)
- [ ] Success confirmation only if the journey shows one (single Then)
- [ ] No vague Then (“shows an appropriate message”)

## Scope discipline

- [ ] Nothing asserts a **Non-goal**
- [ ] Nothing requires an **Out** entry/exit point
- [ ] Inferred atoms do not expand into a different product
- [ ] **Page / journey:** §5–6 only this page or this journey — hand-off names destination only; no destination-page behavior; PRD self-contained

## Thoroughness gate

- [ ] §5 count reflects journey complexity (not a handful of paraphrase ACs)
- [ ] §6 covers multiple taxonomy groups when input/auth/persist apply
- [ ] Gaps filled note lists what was added beyond the PM draft
