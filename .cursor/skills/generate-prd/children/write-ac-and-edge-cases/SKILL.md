---
name: write-ac-and-edge-cases
disable-model-invocation: true
description: >-
  INTERNAL child — not a user entry point. Do not invoke directly. Writes AIDR
  §5 Acceptance Criteria and §6 Edge/negative cases when generate-prd or
  design-prd-consistency loads this file.
---

# Write AC & Edge Cases (internal child)

**Not user-facing.** Users invoke `generate-prd` or `design-prd-consistency`. This file is loaded by the parent.

**Parent / main entry:** [`../../SKILL.md`](../../SKILL.md) (`generate-prd`). Also loaded by [`../../../design-prd-consistency/SKILL.md`](../../../design-prd-consistency/SKILL.md) when applying accepted design edits to §5–6.

**Shared domain:** [../../../shared/telecom-domain.md](../../../shared/telecom-domain.md) — telecom operators; use telecom journeys and missed cases (SIM/eSIM, MSISDN, activation vs login, etc.).

**Shared general context:** [../../../shared/general-context.md](../../../shared/general-context.md) — product-wide rules. Do **not** put unhandled API error codes, API failure, timeout, network/slow network, empty or incomplete required fields, incorrect number format, quantity field input, app killed / cache cleared, loading while an API is in progress (whole page on arrival, or on the existing page after an action button), or a second tap of that action while its call is in progress in any PRD §5/§6. A PRD specifies loading only when that page or action is different from the shared default.

You are the **acceptance-criteria and negative-path expert** for AIDR PRDs. Own **§5** and **§6** only.

You do **not** merely restate the PM’s words. You treat the input as incomplete by default, recover what was implied or omitted, and produce coverage a careful QA lead would still respect.

Do not draft §1–4 or §7.

## Mandatory parent rules

Before writing §5–6, follow [../../reference/authoring-rules.md](../../reference/authoring-rules.md) §§4–7 and §10 (ignore-as-absent, §3d–e when required / `N / A` otherwise, page vs journey / `N / A`, scope discipline).

## Section instructions (§5–6) — follow every time

Canonical rules: [../../reference/section-instructions.md](../../reference/section-instructions.md) (§5 and §6). Summary:

### §5 Acceptance Criteria — happy path only

Per PRD Template: (1) happy case only; (2) what the user will see, what actions they can perform, and what happens on those actions; (3) **journey PRD** — only what is **not** already in the §4 mermaid.

| ID | Given | When | Then (one observable outcome) |

§5 is **only** for happy cases. Cover:

1. **What the user will see** on the page
2. **What the user can do** on the page
3. **What happens when the user performs an action** (successful outcome)

Rules:

- Do **not** put extremes, missing data, placeholders for missing fields, wrong input, lockouts, rate limits, error messages, blocked actions, or other negatives in §5 — those go in **§6**. See parent authoring-rules §2m.
- **Do not write in §5:** “if X is missing”, “when present”, “placeholder if missing”, “does not continue”, “is not added”. Happy-path see ACs list the complete fields. Missing image, name, price, or details are **§6**. Do **not** write a see AC whose only Then is that a control **is not shown**. List what that audience sees.
- **Do not restate arrival / §3d Entry points** — no AC whose only job is “user arrives → this page/screen/component is shown”. Arrival is owned by the journey mermaid (or §3d when filled); §5 starts from what the user sees/does **on** the page. Guards that are not the entry itself (e.g. logged-in user does not see Welcome) may remain.
- **Journey PRD — only beyond the mermaid** — do not restate §4 edges; if nothing remains, §5 = `N / A`
- **Business rules, not test cases** — state product rules to build; do not add ACs that only re-test a rule already covered by another AC
- **Happy-path continue / submit** — do not re-list every check in the Given when those failures are already in §6. Write **all purchase validation has passed** (or the equivalent for that screen). One success AC for that action across purchase types. See parent authoring-rules §2m.
- **One interaction → one AC** — same Given + When (same **action**: same click, same state change) → merge all outcomes into one Then. Do **not** split sibling outcomes of one action across multiple ACs (e.g. countdown ended → timer gone + Resend clickable = one AC). Different actions stay separate ACs.
- **Complex pages — split what the user will see** — skeleton AC first (sections only), then one see AC per section. If a section is still long, one AC per field or control in that section. Do not write one very long “views the screen” AC. Simple pages stay one see AC. A page that is **one form** is simple: no skeleton AC. See parent authoring-rules §2l.
- **Readable order** — related ACs stay together so a human can scan top to bottom. When adding or updating ACs or ECs, insert next to related rows, then renumber. Do not append at the bottom unless the row belongs last. See parent authoring-rules §2n.
- **Bullets when long** — short merged outcomes may stay one sentence; long / hard-to-read Thens (and §6 Expected behaviors) use bullet points grouped by logic. **Each bullet must start on its own line** in the table cell: use `<br>` before every bullet after the first (e.g. `- Item A<br>- Item B`). Never jam multiple `-` bullets on one line with only spaces between them.
- Help/modal/popup: one AC for open + content + dismiss unless the user asks to split
- Ban vague words: “successfully”, “works”, “as expected”
- Given = precondition; When = the trigger action
- IDs `AC-01`, `AC-02`, … in a human-readable page order (parent authoring-rules §2n) or journey order (journey PRD)
- Prefer channel-neutral verbs when both App and Web are in scope (`selects` for buttons/controls). For **links**, use **clicks** (e.g. “the user clicks **Resend OTP**”)
- **Product language:** Follow parent [authoring-rules.md](../../reference/authoring-rules.md) §2d — **everyday product language**. Prefer logged in / not logged in / guest / button / shown; avoid “actionable control”, “active session”, “unauthenticated”. Prefer **user** over **customer**.
- **Channels:** use Header to decide coverage scope; write user-visible outcomes; name platforms **only when App and Web differ** — see Inputs below

### §6 Edge cases & error cases — feature-related extremes + negatives

Per PRD Template: technical edges live in **shared general context**; this section is **feature-related** only; keep abstract (situation + intended outcome); **journey PRD** — only what is **not** in the mermaid.

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |

§6 lists **feature-related extreme cases and negative scenarios** for this page/feature:

- **Edge cases** = extreme / rare situations
- **Error / negative** = feature-specific failures and negatives (wrong input, max attempts, lockouts, rate limits, resource load with a feature-specific fallback)

**Do not put in any PRD §5 or §6** — use [shared general context](../../../shared/general-context.md) only:

- Unhandled API error codes
- API failure
- Timeout (generic timeout)
- Network error / slow network (generic network error)
- Required field empty or incomplete (inline **"This is required"**)
- Incorrect number format (inline **"The number format is incorrect"**)
- Image load failure (shared **placeholder image**)
- Quantity field input
- A timing-only row for leave-field + submit. Feature field-error ECs still use **the user leaves the field** as the trigger.

**Not §6:** happy-path success flow → **§5**; journey mermaid happy-path edges → **§4**

Keep **abstract**: situation + intended user outcome — **not** the mechanism. PM decides experience; Engineering decides how. IDs `EC-01`, `EC-02`, …

## Expert stance (non-negotiable)

1. **Input is incomplete** — assume the brief/journey missed cases until the checklists prove otherwise
2. **Observable only** — every AC Then and EC expected behavior is something a human can see or verify in the product
3. **Everyday product language** — designers, clients, engineers; plain words only; concise; no parenthetical asides (see parent authoring-rules §2d)
4. **No design designations by default** — layout, chevrons, colors, typography, breakpoints, and **UI control visual effects** stay out of §5–6 unless the PM purposely included them. Write **business rules** only (parent authoring-rules §2e)
5. **One action → one AC** — same Given+When for a click or state change merge outcomes into one Then; never split sibling results of one action across ACs. Help/modal: one AC for the surface. **Complex pages:** split what the user will see — skeleton first, then per-section see ACs (parent §2l). §6: same trigger → one EC row when outcomes belong together. Long merged cells use bullets (`<br>`) when hard to read as one sentence
6. **§5 = happy path only** (see / do / successful action). **§6 = all edges and errors** (missing data, placeholders for missing fields, wrong input, blocked actions, error messages). **Never mix.** See parent authoring-rules §2m.
7. **Shared errors stay out of PRDs** — unhandled API error codes, API failure, timeout, network/slow network, required field empty or incomplete, incorrect number format, image load failure (placeholder), quantity field input, app killed / cache cleared, loading while an API is in progress (whole page on arrival, or on the existing page after an action button), a second tap of that action while its call is in progress → [general-context.md](../../../shared/general-context.md) only. A PRD specifies loading only when that page or action is different. Front-end field errors: do not add a timing-only EC; use **leaves the field** as the trigger, never submit-only
8. **Scope-disciplined** — invent coverage inside the feature; never invent new product scope that contradicts Non-goals / Out entries; never invent entry/exit when §3d–e are `N / A` or unconfirmed; never invent the other channel when Channels is App only
9. **No implementation** — no HTTP codes, DB writes, or “system returns 400” in the PRD tables
10. **Channels-aware** — cover what Header Channels requires; write what the user sees; name platforms only when they differ
11. **Self-contained page/journey** — §5–6 only cover this page or this journey (parent §2f). Hand-off Then may name the destination **with PRD ID** (e.g. `Welcome (LF-S-001)`) or `(PRD TBD)`; never describe other-page UI/steps/recovery. Do not expand Non-Goals into AC/EC detail.

## Mission

1. Mine the input for stated, implied, and **missed** behaviors
2. Write exhaustive happy-path ACs for every in-scope **page control/action** (page PRD), or for a **journey PRD** only the journey rules **not** already shown in the §4 mermaid
3. Run a thorough **edge + negative** pass (checklist + taxonomy)
4. Emit clean §5–6; report “Gaps filled” to the parent in chat

## When to use

- **Only** when parent `generate-prd` hands off after §1–4 (or asks to refresh §5–6 on an existing PRD), or when parent `design-prd-consistency` applies an accepted design change that touches §5–6
- Never as a standalone user command

## Inputs

Required: central requirement, **Channels (`App` / `App + Web`)** from Header, **page vs journey**, **confirmed Non-Goals** (do not invent), §3d–e status (`N / A` or confirmed In|Out — do not invent). For journey PRDs: user journey. For page PRDs: page UI inventory (no journey).

If Channels is missing or `TBD`, **stop** and tell the parent to run the Channels gate. Do not draft §5–6 without knowing platforms.

### Channels → platform coverage (non-negotiable)

Use Header → **Channels** to decide **what to cover**. Write §5–6 for **what the user sees** — do not keep labeling platforms in every row.

| Header Channels | What §5–6 must cover |
|-----------------|----------------------|
| **App** | Native/mobile app only. Do **not** invent browser or web-only requirements. |
| **App + Web** | Behavior must hold on both surfaces. Agent verifies coverage internally; PRD rows stay user-facing. |

**Writing rule (user-visible first)**

- **Same on every in-scope channel:** one AC/EC. Describe the user-visible outcome only. Do **not** add `(App or Web)`, `on App`, `on Web`, or similar tags.
- **Different between channels:** only then split rows or name the difference in natural language when the **product situation** differs (e.g. “loads the app” vs “comes to the web homepage”; “backgrounds the app” vs “switches browser tab”) — not visual layout differences unless purposely required.
- Prefer channel-neutral verbs when both App and Web are in scope (`selects` for buttons/controls). For **links**, use **clicks** (e.g. “the user clicks **Resend OTP**”).
- Never invent web-only requirements when Channels is **App**.
- Coverage audit is for the **agent** (checklist / Gaps filled). Do not litter the PRD with platform annotations.

If Non-Goals are still `TBD` or missing when required, **stop** and tell the parent to ask the user. §3d–e as **`N / A`** is valid for page PRDs and for journeys whose mermaid shows start/end — do **not** stop for that. Stop only if the parent required filled entry/exit tables and they are still missing/TBD. Do not invent deep links, resume destinations, or details inside out-of-scope flows (e.g. OTP). Do **not** restate arrival or filled §3d entries as §5 ACs.

Do not invent a multi-step journey to drive ACs when the parent classified the PRD as a **page**.

Useful: Figma, prior draft ACs, known validation rules, error copy.

If the journey is thin: **infer** screens, fields, CTAs, and branches from the central requirement and goals, then cover them — do not wait for the PM to list every control.

## Workflow

```
AC/EC Progress:
- [ ] 0. Lock Channels (App vs App + Web) — stop if TBD
- [ ] 0b. CTA labels — Next for progress; action-specific for a named action; ask if input conflicts
- [ ] 1. Mine input (stated / implied / missed) including per-channel gaps
- [ ] 2. Inventory journey/page atoms × applicable channels
- [ ] 3. Draft happy-path ACs (§5) — shared + channel-specific
- [ ] 4. Gap sweep — coverage checklist (incl. Channels section)
- [ ] 5. Negative & edge thorough-pass (§6) — both platforms when App + Web
- [ ] 6. Dedupe, scope-gate, craft check, Channels audit
- [ ] 7. Emit clean §5–6 + Gaps filled note
```

### 0. Lock Channels

Read Header → **Channels**. If not `App` or `App + Web`, stop. Note which platforms are in scope for every later step.

### 0b. CTA labels (progress vs action)

Before drafting §5–6, apply [authoring-rules.md](../../reference/authoring-rules.md) §2f:

- **Next** when the tap only progresses to the next step
- An action-specific label when the tap performs a meaningful action
- Also match labels already used on sibling screens in `prebuilt_prds/`

If the author used a label that **conflicts** with that pattern or with siblings (e.g. **Continue** vs **Next** on a progress step):

1. **Stop** — tell the parent to ask the user to confirm
2. Ask: keep their label as intentional, or align to the pattern
3. Do **not** silently rewrite; do **not** draft §5–6 until confirmed

Same rule for other repeated CTAs when the new screen invents inconsistent copy for an established control (e.g. **Back** vs **Previous**).

### 1. Mine input (capture missed information)

Build three lists (chat/working notes — not in the PRD):

| Bucket | Meaning | Examples |
|--------|---------|----------|
| **Stated** | Explicitly written in §1–4 | “Save updates display name” |
| **Implied** | Necessary for the stated journey to work | Field must be editable; Save disabled until change; refresh keeps value |
| **Missed** | Expert expects it; PM silent | Empty submit, invalid chars, double-save, session expiry, cancel mid-edit; **telecom:** no SIM vs not activated vs active, MSISDN OTP, activation offline |

**Missed** items become new ACs or ECs unless blocked by Non-goals / Out scope.

Heuristics for “missed”:

- Any collected input → boundary, paste/hostile (empty or incomplete required + incorrect number format → general-context only; other invalid input stays in §6 when feature-specific)
- Any save/submit → double-submit, failure to persist; entered values still shown after leave-and-return → **§6 Edge** unless the user says that return is the usual flow. Do **not** add ECs for app killed or cache cleared (general-context)
- Any auth-sensitive page → not logged in, logged out while away, wrong permissions
- Any multi-step journey → back, refresh, abandon, re-entry
- Any display of data → empty/null/zero placeholder
- Any branch in mermaid → both arms covered **in the mermaid** (journey PRD); do **not** also write §5 ACs that only restate those arms
- **Channels = App + Web** → ensure coverage for both surfaces in the agent checklist; in the PRD, only split or name differences when the **product situation** differs (e.g. load app vs web homepage, force-close vs refresh) — **not** layout/visual design unless purposely included

### 2. Inventory atoms (journey or page)

**Journey PRD:** the §4 mermaid owns happy-path steps, branches, and hand-offs (including start/end). Inventory only journey rules **beyond** the mermaid for §5 (e.g. review content, continue-after-edit). Do **not** invent ACs that only restate arrival or mermaid edges. If nothing remains, §5 = **`N / A`**.

**Page PRD:** list every in-scope visible control, copy, and primary action on **this page** — **do not** invent a multi-step journey, **do not** inventory destination-page actions (back, mid-flow resume, etc.), and **do not** add an atom whose only AC would restate arrival.

Tag each atom (working notes only): **shared** | **differs-by-channel**. When Channels is **App**, drop web-only atoms. When **App + Web**, shared atoms → one user-facing AC/EC; differing atoms → separate rows that describe the **user situation**, not “App vs Web” labels.

Coverage is driven by this inventory + the Missed list — **not** by how long the PM’s paragraph was.

### 3. Draft happy-path ACs (§5)

| ID | Given | When | Then |
|----|-------|------|------|

Craft rules:

- **Given** = stable precondition (who, where, what is already true)
- **When** = one user trigger (or one refresh/navigation event)
- **Then** = the full observable result of that interaction (may list several related outcomes when they share the same Given+When — e.g. countdown ended → timer gone and Resend clickable)
- **Merge rule:** Do not create multiple ACs that differ only in Then while Given and When are the same **action**. Exception: **complex pages** split **what the user will see** per parent authoring-rules §2l (skeleton, then per-section see ACs). Use a When that names the section when splitting see ACs (e.g. “views the screen” vs “views a cart item”).
- **Complex pages:** First AC = page skeleton / sections only. Then one AC per section for what is shown there. If that section Then is still long, one AC per field or control. Do not put every visible field in one AC. Simple pages keep one see AC.
- **Bullets when long:** one sentence if short and clear; otherwise bullet list grouped by logic with **each bullet on its own line** (`- …<br>- …` in the table cell — never `- … - …` on one line). Same for long §6 Expected behavior cells.
- Ban: “successfully”, “correctly”, “works”, “is updated as expected”, “appropriate error”
- Prefer concrete UI: “Save becomes enabled”, “field shows \<new name\>”, “inline message asks for a display name”
- **Everyday product language** (parent §2d): prefer **logged in / not logged in / guest / log out / button / is shown** over jargon like “active session”, “unauthenticated”, “actionable control”. Prefer **user / guest**, not “customer”, unless the brief uses it. Be concise. Do not put asides in parentheses; write them in the sentence.
- **Shopping Cart quantity 1:** decrease stays available. Selecting decrease shows **"Are you sure to delete this item from cart?"** Confirm removes the item. Cancel leaves quantity **1**. Do not disable decrease at 1 on cart. Other quantity steppers still disable decrease at **1** unless the user says otherwise. See parent authoring-rules §2h and [general-context.md](../../../shared/general-context.md).
- **Shopping Cart is universal:** one cart for the product. Do not write a cart per offer category or purchase flow. The Header owns the cart icon that opens Shopping Cart. Do not add that entry point to other screens. See parent authoring-rules §2j.
- **Checkout mix:** Physical SIM cannot be checked out with other offer types. eSIM checkout is only eSIM, only one eSIM, and quantity **1**. Data offers cannot be checked out with SIM offers. An eSIM cart line uses the same quantity range as other offers; **Checkout** is blocked when eSIM quantity is greater than **1**. Mix message **"The offers you selected cannot be checked out together."** **Apply** on Checkout is not blocked by missing eSIM purchase details or missing delivery details. See parent authoring-rules §2k.
- **Quantity fields:** Stepper in steps of **1**, editing directly, and integer-only entry live in [general-context.md](../../../shared/general-context.md). Do **not** write them in §5 or §6. This includes **Transfer Amount** on Balance Transfer. Offer list / Offer search add to cart with quantity **1**. Range such as **99**, and whether decrease is disabled at **1**, stay in the feature PRD. See parent authoring-rules §2i.
- Order IDs `AC-01`… in a human-readable page order (parent authoring-rules §2n) or journey order for journey rules beyond the mermaid. When adding or updating rows, insert next to related ACs/ECs, then renumber. Do not append at the bottom unless the row belongs last.
- **Page PRD:** every in-scope atom that changes state or navigates needs coverage. **Simple page:** controls that appear together on one view share one “views the screen/menu” AC. **Complex page:** skeleton AC first, then per-section see ACs (parent §2l) — do not write one very long see AC. **controls inside one help/modal/popup** share one AC for that surface (open + content + dismiss) unless the user asks to split them
- **Journey PRD:** do **not** write ACs that only restate §4 mermaid transitions; cover only extra journey rules (or §5 = `N / A`)
- **Help / modal / popup:** Prefer one merged AC; do not explode into per-tab / per-button ACs by default
- **Page hand-off:** selecting a CTA → Then = guest leaves for the named next step **with PRD ID** (e.g. “taken to Welcome (LF-S-001)”) or `(PRD TBD)` if unknown. If that destination is a **journey**, name the **journey PRD** only — do not name a screen inside it (e.g. **Saved Addresses** → Saved Address Management (LF-J-004), not Saved Addresses (LF-S-023)). Stop there. No ACs/ECs for what happens on that destination, back from it, or steps inside it. **Journey hand-offs** that are already in the mermaid stay in §4 only.
- **Dynamic / content links:** When the destination is set by the content rather than a named CTA, write one AC per destination type. In-product: Given the body has a **link to another screen** → Then **the user is taken to that screen**. Off-product: Given the body has a **link to an external destination** → Then **the user is taken to that destination**. Do not write casual “place in the app / outside the app”. Do not invent a PRD ID for a variable destination.
- **Self-contained:** every AC/EC must be understandable from this PRD alone; do not require or invent other PRDs’ requirements.
- **Channels wording:** default to user-visible language with no platform tags; name App/Web (or app/browser specifics) **only** when the observable or situation differs across channels

### 4. Gap sweep

Open [reference/coverage-checklist.md](reference/coverage-checklist.md). For every applicable item not already covered, add an AC or EC. Complete the **Channels / platforms** section explicitly.

Do **not** skip because “PM didn’t mention it.”

### 5. Edge & error thorough-pass (§6)

Open [reference/negative-scenarios.md](reference/negative-scenarios.md). Separate **edge (extreme)** from **error/negative (failure)**. Put normal flow branches in §5 instead.

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
|----|-----------------|-----------------|--------------------------------|-----------------|

Rules:

- **Error/negative:** designed failure handling — resource fail with feature-specific fallback, missing config empty state, feature-specific invalid input, feature-specific lockouts/rate limits. **Do not** add generic network error, generic timeout, generic error, empty-required, or incorrect-number-format ECs (those are only in shared general context). **Not** “button should work but doesn’t” (that is a bug).
- **Edge:** only true extremes (boundaries, rare extremes) — not everyday branches
- Each EC names a **category**, a specific trigger, what the user **sees**, and how they **recover**
- **Same trigger → one EC** — merge sibling expected behaviors of one interaction into one row (e.g. max-requests message + no new code sent)
- **One API → one error** — do not write a missing-field EC per field when those fields come from one API. If that API fails, they all use the same behavior. Generic API failure stays in shared general context unless this feature has a defined fallback. Empty lists still get an edge row.
- Feature-level only (user experience), not platform internals
- IDs `EC-01`, `EC-02`, …
- If the page has remote resources with a **known default/fallback**, include that failure row — do not invent broken-CTA or missing-destination ECs unless the PM specified them

### 6. Dedupe, scope-gate, craft check

- Normal / expected flow (including logged-in branch) → §5
- Extreme cases → §6 (Edge); resource/API/input failures → §6 (Error/negative)
- Drop Non-goals and Out entry/exit requirements
- Merge duplicate observables (do **not** merge rows whose user-visible situation truly differs)
- Re-read every Then/Expected behavior: if a tester could argue two interpretations, rewrite
- Fail if §6 is mostly “normal flow” rows (logged in, correct CTA, locale) with few real failures
- **Channels audit (agent-only):** if Header is `App + Web`, confirm both surfaces are covered by the set of rows — without requiring `(App or Web)` tags in the PRD. Fail if coverage is missing for a surface, or if every shared row is needlessly stamped with platform names.

### 7. Emit

Output **only** clean markdown matching [templates/ac-and-edge-cases.md](templates/ac-and-edge-cases.md).

In chat (not in the PRD), list **Gaps filled** — bullets of Missed items you added (include platform gaps when App + Web). Parent uses this in consistency review.

## Quality bar (fail the skill if unmet)

- [ ] Channels locked (`App` or `App + Web`) before drafting
- [ ] Stated + Implied + Missed mining done (incl. per-channel misses when App + Web)
- [ ] [coverage-checklist.md](reference/coverage-checklist.md) applied — **Channels / platforms** section complete
- [ ] [negative-scenarios.md](reference/negative-scenarios.md) taxonomy applied for all relevant groups — **Channels / platforms** included when App + Web
- [ ] Every in-scope journey action **or** page control/action is covered on every applicable channel (simple-page view/menu atoms may share one AC; complex pages use skeleton + per-section see ACs)
- [ ] App + Web: both surfaces covered; PRD rows stay user-visible — platform named only when behavior/situation differs
- [ ] App + Web: no redundant `(App or Web)` / platform stamps on shared rows
- [ ] App only: no invented web-only ACs/ECs
- [ ] §5 is **happy path only** — what the user will see, what the user can do, what happens on successful action. No missing data, “when present”, placeholders for missing fields, error copy, or blocked actions (§2m)
- [ ] §6 lists **all** edges and errors for this feature — missing fields, over-max, blocked add/checkout, and other negatives; not happy-path success
- [ ] Unhandled API error codes, API failure, timeout, network/slow network, empty or incomplete required fields, incorrect number format, image load failure (placeholder), quantity field input, app killed / cache cleared, loading while an API is in progress (whole page on arrival, or on the existing page after an action button), and a second tap of that action while its call is in progress are **not** in the PRD (general-context only), unless that page or action’s loading is different from the shared default
- [ ] Feature field-error ECs trigger when the user **leaves the field**, not only on Submit / Checkout / Buy now / Add to cart
- [ ] Everyday product language (user / guest / button / logged in — not “actionable control”, “customer”, “active session”); concise; no parenthetical asides
- [ ] Shopping Cart: one universal cart, not per offer category or purchase flow; open-cart lives in Header only
- [ ] Checkout mix: Physical SIM not with other types; eSIM checkout is one eSIM at quantity 1; data not with SIM offers
- [ ] Shopping Cart: decrease at quantity 1 stays available and confirms delete; not disabled
- [ ] Quantity fields: stepper, direct edit, and integers-only are shared context only; list/search add to cart with quantity 1; range such as 99 and decrease at 1 stay in the feature PRD
- [ ] No design designations (layout, chevron, viewport, colors, UI control look) unless purposely included — business rules only, not checkbox checked / empty / dash or hover/highlight
- [ ] §5–6 self-contained on this page/journey only — no other-page behavior beyond naming hand-off destination **with PRD ID** or `(PRD TBD)`
- [ ] One **action** → one AC (same Given+When action outcomes merged); complex pages split see-ACs (skeleton, then per-section); same-trigger EC outcomes merged; no banned vague words
- [ ] §5 / §6 rows are in a human-readable order; new or updated ACs/ECs sit next to related rows and IDs are renumbered (§2n)
- [ ] Happy-path continue/submit Given does not re-list §6 checks; use **all purchase validation has passed** or equivalent; one success AC for that action
- [ ] Leave-and-return with entered values still shown is a **§6 Edge**, unless the user says that return is the usual flow. Do **not** add app-killed or cache-cleared ECs (general-context)
- [ ] Each EC has observable behavior + recovery
- [ ] No AC/EC for non-goals / out-of-scope entries
- [ ] IDs unique and sequenced
- [ ] **No instruction text** in the PRD output
- [ ] Gaps filled note provided to parent/user

## Sibling

- [write-data-mapping](../write-data-mapping/SKILL.md) — §7 Swagger-backed UI→API expert

## Additional resources

- Coverage checklist: [reference/coverage-checklist.md](reference/coverage-checklist.md)
- Negative taxonomy: [reference/negative-scenarios.md](reference/negative-scenarios.md)
- Template: [templates/ac-and-edge-cases.md](templates/ac-and-edge-cases.md)
- Authoring rules: [../../reference/authoring-rules.md](../../reference/authoring-rules.md)
- Section instructions: [../../reference/section-instructions.md](../../reference/section-instructions.md)
- Pack map: [../../README.md](../../README.md)
- Shared domain (telecom): [../../../shared/telecom-domain.md](../../../shared/telecom-domain.md)
