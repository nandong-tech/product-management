# AIDR section instructions (authoring rules)

Extracted from the PRD template. **Follow these when generating.** Deliverable files under `prebuilt_prds/` must **not** include this help text — only content matching `prd-output.md`.

Also follow [authoring-rules.md](authoring-rules.md) for cross-cutting constraints (Figma, §3d–e when required / `N / A` otherwise, §3a–c split, §4 `N / A`, ignore-as-absent, brandless, **everyday product language**, **no design designations by default**, **§5–6 self-contained on this page/journey**).

**Owner:** Parent `generate-prd` → §1–4 · Child `write-ac-and-edge-cases` → §5–6 · Child `write-data-mapping` → §7

---

## Title

Replace with `PRD: <PROJECT>-<TYPE>-<NNN> - Feature name` (e.g. `PRD: LF-S-001 - Welcome page (guest landing)`).

**ID format:** `<PROJECT>-<TYPE>-<NNN>` — project prefix (ask; default `LF`), type **J** / **S** / **P** (infer or ask), sequential number. See [authoring-rules.md](authoring-rules.md) §8.

This ID is permanent and used to reference the feature across linked docs, tickets, and future PRDs.

---

## 1. Change Log

§1 records **published** revisions and **accepted design updates**.

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|

**Rules:**

- During **`generate-prd`** (create or local edit): keep the table **empty** (headers only). Do **not** add rows for drafts, regenerations, Mode C conversion, or local edits.
- **`publish-prd`** appends one row after a successful Confluence create/update — Change = `First publish to Confluence` or `Updated on Confluence`.
- **`design-prd-consistency`** appends one row after the accept/reject walkthrough when at least one design edit was applied, or when Header Figma was written or corrected — Change = `Updated from design`.
- Do not invent draft history in §1. Do not add rows for rejected design items or an empty comparison.

---

## 2. Header

Fill metadata for ownership, status, and links. Status should reflect the **owning team** stage:

- `PM — drafting`
- `Design — in design`
- `Engineering — in build`
- `Shipped`

| Field | Guidance |
|-------|----------|
| Feature | One short name |
| Channels | `App` or `App + Web` — **ask before generating** if not stated (see [authoring-rules.md](authoring-rules.md) §2b) |
| Status (owning team) | One of the stages above |
| Owner (PM) | Name — accountable for product decisions in this doc |
| Contributors | **PRD authors only** — PM name(s) who wrote or edited **this** PRD doc. On create: same as the PM who authored it (often same as Owner). On later edits by another PM: **append** that name (do not remove prior contributors). Not Design/Eng/Legal roles. |
| Created / Last updated | `YYYY-MM-DD` |
| Figma | Team-viewable design link **attached separately** for the PRD. Do **not** auto-fill from the URL/screenshot/export the user used as generation input; leave empty / `TBD` until they attach a dedicated Header Figma |
| Jira | Tickets |
| API Spec | Operation YAML attached by **`api-mapping`** only when that YAML is the correct API (match) — markdown link relative to the PRD, e.g. `[catalog-get-offers.yaml](../data_mappings/catalog-get-offers.yaml)`. Leave `N / A` until then. Not a Swagger UI URL. |
| Links (optional) | **Only** these: always `shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules)`; plus `page template: [Name (ID)](Confluence URL)` when the screen uses a page template (authoring-rules §2g). Use canonical Confluence URLs from publish-prd config — **never** local `.md` paths. Do **not** put this PRD’s own page URL, `pending-prd-links.md` / Pending destinations, or other links here. Do not copy §5–6 hand-off destinations into this field. |

---

## 3. Central requirement + Scope

Do **not** repeat the same in-scope / out-of-scope story across §3a–c. Each subsection has one job:

| Subsection | Job | Do not |
|------------|-----|--------|
| **a. Central requirement** | A **high-level requirement summary** — what this feature must deliver | Mix/validation rules, field lists, button sequences, In/Out, or “this PRD covers only…” |
| **b. Goals** | **High-level** — what the user will **accomplish** on this screen | Restate Non-Goals or entry/exit; list **buttons/actions**; walk through controls; **expand** beyond this page |
| **c. Non-Goals** | Items **on this page/journey** that are **out of scope** for this PRD | Restate Goals; list **other pages** / destination journeys; invent out-of-scope items |

Entry/exit are **optional** — page PRDs and journeys whose mermaid clearly defines the path use **`N / A`** (see [authoring-rules.md](authoring-rules.md) §6).

### a. Central requirement

A **high-level requirement summary** of this page or feature: the core need and what the product must deliver here.

- Write it as a short summary, typically **one sentence**. A second sentence is allowed only if it still stays high-level.
- **Do not** put mix rules, field lists, validation, extra-info branches, button sequences, or other AC-level detail in §3a. Those belong in **§5–6** or shared context.
- **Do not** restate Goals, Non-Goals, or In/Out.

Example shape: “The Checkout screen is where the user reviews this purchase and continues to payment.”

Bad: listing which offer types can be checked out together, or that Physical SIM needs delivery details and eSIM needs send-to — those are detailed requirements, not the summary.

### b. Goals

**High-level only** — what the user will **accomplish** on this screen (outcomes), **not** what each button or control does.

- Write **one or a few** bullets at accomplishment level (e.g. “Review their messages”, “Log in with mobile number and PIN”). **One Goal is enough.** Do not pad to 2–5.
- Ask: “What does the user get done on this page?” — not “What does **Log in** / **Next** / each menu item / sort / delete do?”
- **Do not** list per-button or per-control behavior (**Log in** takes the user to…, open/close menu, expand **Settings**, confirm/cancel, sort, open a row, delete). That belongs in **§5 Acceptance Criteria**.
- **Do not expand** Goals to other pages, journeys, or product areas that have no element on this page.
- **Do not** duplicate §5 row-by-row or walk through happy-path steps.

**Good vs bad**

| Good (Goals — accomplish on screen) | Bad (belongs in §5 — button/action detail) |
|-------------------------------------|--------------------------------------------|
| Review their messages | Sort messages by time; Open a message; Delete a message |
| Review their vouchers | Search; Switch tabs; Redeem a voucher |
| Check their balances; Redirect to other account management sections | See first name; See each balance type; Buy add-ons; Open each named entry point |
| Choose how to continue from Welcome | User taps **Log in** and is taken to Log in |
| Log in with number and PIN | User selects **Log in** after entering number and PIN |
| Manage account from the header when logged in | User opens the menu and selects **My Account** / **Settings** / **Log out** |
| See a tenant or default Welcome background | Background fails → show default |

| Good (on-page accomplishment) | Bad (expanded beyond the page) |
|-------------------------------|--------------------------------|
| Enter a mobile number to continue | Complete the full activation journey |
| See pSIM / eSIM find-number help | Browse Help & Support articles |

### c. Non-Goals

Items that appear **on this page** (or **in this journey**) but are **explicitly out of scope** for this PRD.

**Do not invent Non-Goals.** Only include what the user stated or confirmed.

**Do not list other pages** — not “Login after **Log in**”, not “next step after **Next**”, not destination content/behavior. Those hand-offs belong in **ACs** (name only; §3e only when filled). If nothing on this page/journey is out of scope → **`N / A`**.

| Good (on this page, out of scope) | Bad (other page — do not put in Non-Goals) |
|-----------------------------------|--------------------------------------------|
| A control on this header that the PM confirmed is out of scope | Login flow / Login page content |
| Footer blocks other than logo + social + legal on this footer | Privacy Policy page content after the link |
| Field-level rules owned by screen PRDs (journey PRD) | Edit email page after **Not your email?** |

### d. Entry points

**Optional** ([PRD Template](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7539851327/PRD+Template)).

- **Page / screen / template (S or P):** not needed when a **journey PRD** defines the path — write **`N / A`**; do not ask.
- **Journey (J):** not needed when the §4 **mermaid clearly defines the path** — write **`N / A`**; do not ask or duplicate the chart.

Fill the In|Out table only when the path is **not** already covered (or the user explicitly wants entry rows). From brief/design or ask — **never invent**.

| Entry point | In or out of scope? | Note |

### e. Exit points

**Optional** (same rules as entry points).

- **Page / screen / template (S or P):** not needed when a journey PRD defines the path — **`N / A`**; do not ask.
- **Journey (J):** not needed when the mermaid clearly defines the path — **`N / A`**.

Fill the In|Out table only when needed. On-page CTA destinations still appear in **§5** hand-offs with PRD IDs when §3e is `N / A`. Never invent exits.

| Exit point | In or out of scope? | Note |

---

## 4. User Journey

**Always include the §4 heading** in every PRD. Per PRD Template, journey content **applies to journey PRDs**; page PRDs use **`N / A`**.

| PRD type | §4 content |
|----------|------------|
| **Journey PRD** | Happy-path mermaid that stitches **page PRDs** and nested **journey PRDs** together |
| **Page PRD** (or other non-journey) | **Automatically** write **`N / A`** — no mermaid, no invented multi-step flow, no second ask for journey content |

If unclear whether the feature is a page or a journey, **ask once**. As soon as it is a **page PRD**, set §4 to `N / A` automatically.

### When filled (journey PRD)

Define the **happy case** only:

- What the user will see
- What actions the user can perform
- What happens on those actions

Use a mermaid flowchart. Stops in the chart are **page PRDs (type S)** or **nested journey PRDs (type J)**, each with its PRD ID. Do **not** add sheets, dialogs, confirmations, popups, or other in-page UI — those belong on the page PRD. Do **not** encode every error path here — negatives belong in §6.

**Journey PRD — no §5 duplication:** Happy-path steps and transitions in the mermaid are **not** repeated as Acceptance Criteria. §5 only adds journey rules the chart does not already state (or is `N / A`).

### Ignore-as-absent (design controls)

If the user says to ignore a control, treat it as **not present**. Do not put it in Non-Goals, journey, inventory, ACs, or ECs. See [authoring-rules.md](authoring-rules.md) §4.

---

## 5. Acceptance Criteria

**Owned by** internal child `write-ac-and-edge-cases`. Parent does not author this section.

Per [PRD Template](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7539851327/PRD+Template):

1. **Only define the happy case**
2. Cover **what the user will see**, **what actions the user can perform**, and **what happens on those actions**
3. **Journey PRD:** acceptance criteria **only** define what is **not** already included in the §4 mermaid chart (or §5 is `N / A`)

| ID | Given | When | Then (one observable outcome) |

**§5 is happy path only.** Cover:

1. **What the user will see** on the page
2. **What the user can do** on the page
3. **What happens when the user performs an action** (successful outcome)

Rules:

- Do **not** put extremes, missing data, placeholders for missing fields, wrong input, lockouts, rate limits, error messages, blocked actions, or other negatives in §5 — those belong in **§6**. See [authoring-rules.md](authoring-rules.md) §2m.
- **Do not write in §5:** “if X is missing”, “when present”, “placeholder if missing”, “does not continue”, “is not added”. Happy-path see ACs list the complete fields. Missing image, name, price, or details are **§6**. Do **not** write a see AC whose only Then is that a control **is not shown**. List what that audience sees.
- **Do not restate §3d Entry points / arrival** — if how the user arrives is already in a journey mermaid or in §3d (when filled), do **not** write an AC whose only Then is “this page/screen/component is shown” from that entry. Start §5 from what is on the page once the user is here. (Guards like “when logged in, Welcome is not shown” may stay in §5/§6 when they are not the entry row itself.)
- **Journey PRD — do not restate §4 mermaid transitions** — if a happy-path step or hand-off is already an edge/node in the mermaid, do **not** add an AC that only repeats it. §5 is for journey rules beyond the chart; use `N / A` when the mermaid is enough.
- **Business rules, not test cases.** Each AC states a product rule the team must build. Do **not** add ACs that only restate how to test a rule already covered by another AC
- **Happy-path continue / submit:** If several checks must pass before continue succeeds, and those failures are already in §6, do **not** re-list them in the Given. Write **all purchase validation has passed** (or the equivalent). One success AC for that action; do not split it by purchase type when the Then is the same. See [authoring-rules.md](authoring-rules.md) §2m.
- **Business rules, not UI visual effects.** Do **not** specify how a control looks (checkbox checked / empty / dash, hover, highlight). Write the business rule only. See [authoring-rules.md](authoring-rules.md) §2e.
- **One interaction → one AC.** If several outcomes share the same Given + When (same **action**: same click, same state change), merge them into **one** Then. Do **not** split “countdown ended → timer hidden” and “countdown ended → Resend clickable” into two ACs.
- **Complex pages — split what the user will see.** Do **not** dump every visible field into one long “views the screen” AC. First write a **skeleton** AC that names the page sections only. Then write **one AC per section** for what the user will see in that section. If a section Then is still long, split it into one AC per field or control in that section. Keep simple pages as one see AC. Do **not** use this split on sibling outcomes of one action. See [authoring-rules.md](authoring-rules.md) §2l.
- **Readable AC/EC order.** Keep related rows together so a human can scan top to bottom. When adding or updating ACs or ECs, insert next to related rows, then renumber. Do not append at the bottom unless the row belongs last. See [authoring-rules.md](authoring-rules.md) §2n.
- **Then readability — bullets when long:** If the merged Then (or §6 Expected behavior) is short and easy to scan, keep it as one sentence. If it is long or hard to read, break it into **bullet points** grouped by logic/relation (e.g. what is shown vs what closes the help). In the markdown table cell, **each bullet starts on a new line**: use `<br>` before every bullet after the first (e.g. `- Item A<br>- Item B`). Do **not** write jammed one-line lists like `- Item A - Item B`.
- Different user actions stay separate ACs (e.g. selects **Log in** vs selects **Activate your SIM**).
- Avoid vague words like “successfully”, “works”
- IDs: `AC-01`, `AC-02`, …
- Given = precondition; When = trigger action
- For **links**, use **clicks**; for buttons/controls prefer **selects** when App + Web
- Match Header → **Channels** for coverage scope. Write user-visible outcomes; name App/Web **only when they differ**. Do not invent web ACs when Channels is App.
- **Product language:** Follow [authoring-rules.md](authoring-rules.md) §2d. Prefer logged in / not logged in / guest / button / shown; prefer **user** over **customer**; avoid “actionable control”, “active session”. Be concise. Do not use parentheses for asides; put the meaning in the sentence.
- **Shopping Cart:** If this PRD is Shopping Cart, there is one universal cart, not a cart per offer category or purchase flow, per [authoring-rules.md](authoring-rules.md) §2j. Physical SIM cannot be checked out with other offer types. eSIM checkout is only one eSIM at quantity **1**. Data offers cannot be checked out with SIM offers, per [authoring-rules.md](authoring-rules.md) §2k. An eSIM cart line uses the same quantity range as other offers; **Checkout** is blocked when eSIM quantity is greater than **1**. Decrease at quantity **1** stays available and confirms delete per [authoring-rules.md](authoring-rules.md) §2h. Do not disable that icon on cart.
- **Open cart:** The Header owns the cart icon that opens Shopping Cart. Do **not** add that entry point to other screen PRDs. Offer-tile cart icons and **Add to cart** add items only.
- **Quantity fields:** Stepper in steps of **1**, editing quantity directly, and integer-only entry live in [general-context.md](../../shared/general-context.md). Do **not** write them in §5 or §6. List/search add to cart with quantity **1**. Range such as **99**, and whether decrease is disabled at **1**, stay in the feature PRD. See [authoring-rules.md](authoring-rules.md) §2i.
- **Page / journey:** §5–6 only this page or journey (authoring-rules §2f). Hand-off may name the destination; do not write other-page behavior. PRD must be self-contained.
- **Cross-PRD hand-offs:** When naming another screen/journey, include its PRD ID — `Welcome (LF-S-001)` — or `(PRD TBD)` if not written yet (authoring-rules §2f). If the destination is a **journey**, name the **journey PRD** only — do not name a screen inside that journey.
- **Help / modal / popup:** Prefer **one AC** for open + in-surface content (tabs, key copy) + dismiss — do **not** give every control inside that surface its own AC unless the user asks for that detail
- **CTA labels:** **Next** for progress-only; action-specific when the tap does a named action ([authoring-rules.md](authoring-rules.md) §2f). If brief/design conflicts with that pattern or sibling screens, **ask the user to confirm** before writing §5–6. Do not silently normalize.
- **§6 same rule:** Same trigger / entry → merge related expected behaviors into one EC row (e.g. max requests message + no new code sent). Use bullets when the Expected behavior or Exit / recovery cell is long.

---

## 6. Edge cases & error cases

**Owned by** internal child `write-ac-and-edge-cases`.

Per [PRD Template](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7539851327/PRD+Template):

- **Technical** edge cases live in the **shared context** doc — this section only has **feature-related** edge cases and negative scenarios.
- Keep outcomes **abstract**: describe the **situation** and the **intended outcome**, not the mechanism. PM decides what the user should experience; Engineering decides how to deliver it.
- **Journey PRD:** edge cases & error cases **only** define what is **not** already included in the §4 mermaid chart.

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |

**§6 lists feature-related extreme cases and negative scenarios** for this page/feature.

| Kind | Meaning | Examples |
|------|---------|----------|
| **Edge** | Extreme / rare cases on this page/journey | Input at max+1; rare extreme combos the product must still handle |
| **Error / negative** | Feature-specific failures and negatives | Wrong OTP; max attempts / lockout; rate limits; resource fails to load → default |

**Put in §6 (not §5):** invalid input, exceeded attempts, lockouts, request caps, expired codes, feature-specific resource failures, and other feature-specific negatives.

**Do not put in any PRD §5 or §6** — use [shared general context](../shared/general-context.md) only:

- Unhandled API error codes
- API failure
- Timeout (generic timeout)
- Network error / slow network (generic network error)
- Required field empty or incomplete (inline **"This is required"**)
- Incorrect number format (inline **"The number format is incorrect"**)
- Image load failure (shared **placeholder image**)
- Quantity field input
- When front-end field validation runs (leave field, then again on submit)
- Loading while an API is in progress — whole page on arrival, or on the existing page after an action button, including that the action cannot be selected again until that call finishes (a PRD specifies loading only when that page or action is different)

**Do not put in §6:** happy-path success flow (that is **§5**); journey mermaid happy-path edges (already in §4); “CTA cannot open” when that path should always work (that is a **bug**, not a product negative).

Keep outcomes **abstract** (user-visible), not mechanism/HTTP. Stay on this page/journey (§2f). IDs: `EC-01`, `EC-02`, …

---

## 7. Data Mapping

**Owned by** internal child `write-data-mapping`. Parent does not author this section.

Maps **dynamic** UI fields (values loaded or submitted via API) to the Swagger/OpenAPI field that backs them. **One row per dynamic field.**

| UI element / label | Endpoint | Field | Empty / fallback | Notes |

**Include:** displayed values from API responses; form inputs bound to request fields; config-driven content (e.g. remote background URL, offer name, balance).

**Do not include:** static copy; fixed CTA labels; pure client navigation (no API field); decorative/theme-only chrome; ignore-as-absent controls; **page title** unless the PRD specifically says the page title comes from an API; **category name** (front-end code, not from the API). See [authoring-rules.md](authoring-rules.md) §2o.

If this PRD has **no** dynamic API-bound fields, §7 body is **`N / A`**.

Examples of Notes: transform / truncation · i18n currency · enum → badge/label  
Empty/fallback examples: show “—” / hide field · “Free” when 0/null · default to “Unknown”
