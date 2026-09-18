# Generate-PRD authoring rules (mandatory)

**This file is the product.** Rules below must live in the skill and be followed on every `generate-prd` run. Files under `prebuilt_prds/` are the **prebuilt catalog** (current authoring focus); `project_prds/` holds project PRDs later — do not treat refining one sample as completing skill work unless the user asks to re-run generation to verify.

**Required read:** Parent and both children must follow this file plus [section-instructions.md](section-instructions.md).

---

## 1. Section instructions are part of the skill

- Per-section AIDR rules live in [section-instructions.md](section-instructions.md) (extracted from the PRD template).
- Parent owns Title + §2–4 and the empty §1 Change Log table; child `write-ac-and-edge-cases` owns §5–6; child `write-data-mapping` owns §7. **§1 Change Log rows** are added only by **`publish-prd`** (Confluence publish) or **`design-prd-consistency`** (accepted design update) — never during `generate-prd`.
- Saved PRDs follow [../templates/prd-output.md](../templates/prd-output.md) only — **no** instruction blockquotes or authoring notes in `prebuilt_prds/`.
- **TBD placeholders** in the PRD must be neutral product text only (e.g. `TBD — confirm with PM`). Never put agent instructions in the PRD body or table Note cells (forbidden examples: “Do not assume…”, “list confirmed entries only”, “ask the user”).

---

## 2. Brandless by default (writing style — not a Non-Goal)

- Do not bind requirements to a consumer brand, logo, or marketing visual from the mock.
- Prefer generic product language (“the app”, “Welcome page”, “tenant-configured background”).
- **Do not** auto-add brand / logo / marketing visual system to **§3c Non-Goals**. Non-Goals come only from the user’s brief, design notes, or confirmation — same as every other Non-Goal.
- Ignoring brand artwork in the design means: omit it from Goals/ACs (unless the user asks for brand-specific requirements) — **not** invent a Non-Goal for it.
- Feature IDs use **`<PROJECT>-<TYPE>-<NNN>`**, not brand names.

---

## 2b. Channels — App vs App + Web

**LF project default (through September 2026):** For any new PRD with project prefix **`LF`**, Header → **Channels** is **`App + Web`**. Do **not** ask the Channels question for `LF-*` PRDs during this period unless the user explicitly overrides.

**Before drafting** any new PRD that is **not** covered by the LF default above (or when the user has not already stated Channels), ask once:

> Is this PRD for **App only**, or for **both App and Web**?

| Answer | How to write the PRD |
|--------|----------------------|
| **App only** | Requirements, ACs, and ECs cover the mobile app surface only. Do not invent web-only behavior. |
| **App + Web** | Requirements, ACs, and ECs must **cover** both surfaces. Write what the user sees; name platforms in §5–6 **only when App and Web differ**. Child `write-ac-and-edge-cases` audits coverage before emit (without stamping every row). |

- Record the answer in Header → **Channels** as `App` or `App + Web`.
- If unclear from the brief/design and the LF default does not apply, **ask and wait before generating** — same gate spirit as entry/exit.
- Pass Channels to children so §5–6 cover the right surfaces. Children write user-visible ACs/ECs; platform names appear only when behavior differs.

---

## 2c. Change Log (§1) — publish and design update only

- `generate-prd` leaves §1 as an **empty** table (headers only).
- Do **not** append rows for initial draft, local edits, regenerations, or Mode C conversion.
- `publish-prd` appends one row per successful Confluence publish (create or update) — Change = `First publish to Confluence` or `Updated on Confluence`.
- `design-prd-consistency` appends one row after accepted design edits are applied — Change = `Updated from design`. Also one row if this run only wrote or corrected Header Figma. No row if nothing was accepted and Figma was already correct.

---

## 2d. Everyday product language (mandatory)

Readers are **designers, clients, and engineers**. Write plain product language everywhere (§2–7).

- Prefer words the team already uses in briefs and UI: **user**, **guest**, **button**, **shown**, **logged in / not logged in**, **log out**, **page**, **opens**.
- Avoid UX/engineering jargon when a plain phrase works, e.g.:
  - ~~actionable control~~ → **button** / **is shown and can be selected**
  - ~~active session / unauthenticated~~ → **logged in / not logged in**
  - ~~customer~~ → **user** (unless the brief says customer)
  - ~~home surface / authenticated landing~~ → **signed-in home** / **home after login**
- Say what the **user sees or does**, not how the system implements it.
- **Be concise.** Cut filler. Prefer short sentences.
- **Professional catalog tone.** Everyday language is still PRD language. Match existing catalog ACs: **the user is taken to** a named **screen** or **destination**. Do not use casual fillers such as **place**, **in the app / outside the app**, or “go to the right place”. For App + Web, an in-product link target is **another screen**; an off-product link target is an **external destination**. Do not use implementation terms such as deep link, URL, URI, or webview.
- **Do not use parentheses** for asides, examples, or extra explanation. Put that wording in the sentence.
- Parentheses are allowed only for required ID forms: `Welcome (LF-S-001)`, `(PRD TBD)`, and Header field labels that already use that template shape.
- Children (`write-ac-and-edge-cases`, `write-data-mapping`) must follow this for §5–7 too.

---

## 2e. No design designations by default

PRDs describe **business rules**, not visual design specs and not how UI controls look.

- **Do not** include by default (from Figma/screenshots or inference): layout order/stacking, spacing, alignment, chevrons/icons as decoration, colors, typography, component variants, exact viewport breakpoints, “looks like the mock”, or other visual design details.
- Use design input only to discover **what exists and what it does** (labels, CTAs, navigation, empty states) — not to lock visual treatment into Goals/ACs/ECs.
- Include a design designation **only when done purposely**: the brief states it, the PM asks for it, or it is required for a confirmed product rule (rare).
- Header → Figma remains the place for the design link; do not duplicate design specs into §3–6.

**UI control visual effects are not PRD scope.** Standard control appearance is a UI/design decision. Write only the business rule.

Do **not** specify how a control looks in each state, for example:

- Checkbox / **Select All**: checked, empty, or partial/indeterminate (dash in the box)
- Hover, focus, pressed, selected highlight, fill vs outline
- Animation, toast style, or a disabled *look* (greyed out)

Do write the business rule, for example:

- On Shopping Cart arrival, no items are selected and **Total** is **0**
- Selecting **Select All** selects every item; selecting it when every item is selected clears all
- Quantity cannot go above **99**; decrease at **1** on cart confirms delete

Canonical miss: **Select All** is selected when every item is selected; not selected when any item is not selected; dash when some are selected. That is checkbox appearance, not a product rule.

---

## 2f. §5–6 self-contained — this page / journey only

§5 Acceptance Criteria and §6 Edge cases must stay **inside this PRD’s scope**. The PRD is **self-contained**: a reader should not need another PRD to understand what is required here, and this PRD must not write requirements for other pages/flows.

## 2g. Screen PRDs that use a page template (type P)

When a screen PRD (**S**) **uses** a page template PRD (**P**) (user-stated or confirmed):

- Header → **Links (optional)** may contain **only**:
  - **shared context** — always a **Confluence** link (never a local `.md` path): `shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules)`
  - **page template** — when the screen uses a page template: a **Confluence** link to that template PRD — e.g. `page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)` or `page template: [Basic page template (no back) (LF-P-002)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back)`
- Canonical URLs live in [publish-prd confluence-projects.md](../../publish-prd/config/confluence-projects.md). Do **not** use local file paths (`.md`, `.cursor/`) in Header Links.
- Do **not** add other Header Links — not this PRD’s own Confluence URL, related screen/journey PRDs, destination hand-offs, tickets, or “see also”. Destination IDs belong in §5–6 hand-offs only. Do **not** offer or ask to add extra Header Links. Do **not** put `pending-prd-links.md` or “Pending destinations” in Header Links — that file is an author/agent reminder only.
- Do **not** mention the page template anywhere else in the screen PRD (§3a, Goals, Non-Goals, entry/exit notes, ACs, ECs, etc.). No “Uses … page template” and no “covered by … page template”.
- Do **not** restate template ACs in the screen PRD — including **back** (shown, selected, or destination). Back is owned only by the page template PRD; do **not** add a screen AC for go back / previous page.
- Do **not** restate template Goals (e.g. “Go back…”) in the screen PRD.
- Do **not** invent Non-Goals for chrome the template already excludes (e.g. “logo and menu chrome on this screen”, header/footer) — those belong only in the template PRD when user-confirmed there.
- Screen-specific title text in the screen AC is allowed when that page has a title. Page title is **optional** on Basic page template (LF-P-001) and Basic page template (no back) (LF-P-002). If the screen has a title, write that title in the screen AC in **sentence case** (§2o). If it does not, do **not** add a title AC.

## 2h. Shopping Cart — decrease at quantity 1

When writing **Shopping Cart**:

- Quantity **1**: the decrease icon stays available. Do **not** disable it.
- The user selects decrease at quantity **1**: show confirmation **"Are you sure to delete this item from cart?"**
- The user confirms: remove that item. If the cart is then empty, show the empty-cart state.
- The user cancels: close the confirmation. The item stays at quantity **1**.

Write this in that cart PRD’s §5. Do **not** apply it to Offer detail or other non-cart quantity steppers. There, decrease is disabled at **1** unless the user says otherwise.

Canonical product copy also lives in [general-context.md](../../shared/general-context.md).

## 2i. Quantity and amount number input

How the user changes a quantity or amount with increase and decrease in steps of **1**, entering a number directly, and integer-only entry, live in [general-context.md](../../shared/general-context.md). Do **not** repeat them in PRD §5 or §6.

When a PRD has a **quantity** or **amount** number input, including **Transfer Amount** on Balance Transfer:

- Range rules such as greater than **99** stay in that PRD. Those errors trigger **immediately after the user leaves the field**. Do not wait for **Buy now**, **Add to cart**, **Checkout**, or **Transfer**.
- Whether decrease is disabled at **1** stays in that PRD. Shopping Cart decrease at **1** is §2h.

Offer list and Offer search have no quantity field. Add to cart from those tiles adds quantity **1**. Write that in those PRDs.

See [general-context.md](../../shared/general-context.md).

## 2j. Shopping Cart is universal

There is **one** Shopping Cart for the product. Do **not** give each offer category or purchase flow its own cart.

- The control that **opens** Shopping Cart is the Header cart icon, next to the menu control. Write that only in the **Header** PRD.
- Do **not** add a page-level cart icon or “open Cart” control on Offer list, Offer detail, or other screen PRDs.
- Offer tiles and **Add to cart** still add items; they do not open Shopping Cart.
- Add to cart adds to that same cart.
- **Clear Cart** clears the whole cart.

Write cart contents and checkout in the Shopping Cart PRD §5.

See [general-context.md](../../shared/general-context.md).

## 2k. Checkout mix — Physical SIM and eSIM

Cart can hold mixed offer types. **Checkout** of the selected items must follow these mix rules:

- **Physical SIM** cannot be checked out with other offer types. A Physical SIM checkout has only Physical SIM offers.
- **eSIM** checkout has only eSIM, only **one** eSIM, and quantity **1**.
- A **data** checkout has only data offers. Data offers cannot be checked out with SIM offers.

**Checkout** does not continue when the selection breaks a mix rule. Message: **"The offers you selected cannot be checked out together."**

An eSIM cart line uses the same quantity range as other offers. Mix is blocked on **Checkout** from Shopping Cart, including when eSIM quantity is greater than **1**. Mix is also blocked on Offer detail **Buy now** when this offer cannot be checked out on its own, including when eSIM quantity is greater than **1**. An offer that is no longer available is blocked on Shopping Cart **Checkout** and on Offer detail **Buy now**. Checkout only receives a purchase that can be checked out.

Write the cart **Checkout** blocks in the Shopping Cart PRD §5–6. Write the purchase mix in the Checkout PRD §5.

**Checkout voucher Apply** does not depend on eSIM purchase details being filled or on a delivery address being added. Do **not** block **Apply** because fill details / **Send to** is empty, or because delivery details are not present. Those checks are only on **Proceed to payment**.

See [general-context.md](../../shared/general-context.md).

## 2l. Complex pages — split what the user will see

On a **simple** page, one “views the screen” AC can list what is shown.

On a **complex** page, do **not** put every visible field into one long AC. Split **what the user will see** as follows:

1. **Skeleton first.** One AC for the page regions / sections the user will see. Name the sections only. Do **not** list field-level detail in this AC.
2. **Then one AC per section** for what the user will see in that section.
3. If a section Then is still long, split that section into **one AC per field or control** in the section.

A page is complex when it has several distinct sections, or when a single “views the screen” Then would mix page chrome with repeating-item or multi-block field detail.

A page that is **one form** is a **simple** page. Do **not** write a skeleton AC. List the shared fields on the form see AC. Split only when logged-in vs not-logged-in, add vs edit, or another confirmed branch changes what is shown.

Do **not** add a per-section see AC that only restates fields the skeleton already named. If a section is just those fields, put the fields on the views-the-screen AC and skip the extra row. Canonical miss: skeleton says “first name and mobile number section”, then a second AC that only says first name and mobile number are shown.

**Order in §5:** see §2n. Skeleton → per-section see ACs → what the user can do → what happens on those actions. Skip the skeleton on a simple or one-form page.

## 2m. §5 is happy path only; §6 is edges and errors

**Never mix.** Re-read every AC Then before saving. If it describes missing data, a placeholder for a missing field, an error message, or an action that does not continue, it belongs in **§6**, not §5.

**§5 Acceptance Criteria** — happy cases only:

1. What the user will see when the page is complete
2. What the user can do
3. What happens when an action succeeds

**§6 Edge cases & error cases** — all extremes and failures for this feature, including:

- Empty lists or empty sections, such as no add-ons or no usage records
- A feature-specific fallback when a named API fails, such as placeholder "--" for balances
- Wrong input, over-max quantity, blocked add or checkout, mix errors, empty search results

**Do not** write a missing-field EC for each field when those fields come from one API. If that API fails, they all use the same behavior. Generic API failure stays in shared general context unless this feature has a defined fallback.

**Do not write in §5:** “if X is missing”, “when present”, “placeholder if missing”, error copy, “does not continue”, “is not added”. Do **not** write a see AC whose only Then is that a control **is not shown**. List what that audience **does** see. If **Set as default address** is shown when logged in, do not add a row that it is not shown when the user is not logged in.

Logged-in vs not-logged-in that change what is on the page, such as a cart icon on SIM offers only, stay in **§5**. Those are happy-path branches, not errors.

**Happy-path continue / submit:** When several checks must pass before a continue action succeeds, and those failures already have §6 rows, do **not** re-list every check in the §5 Given. Write that **all purchase validation has passed** (or the equivalent for that screen). Use **one** success AC for that action across purchase types. Type-specific blockers stay in §6.

**Leave and return:** Entered values still shown after the user leaves the screen and comes back is a **§6 Edge**, not a §5 AC, unless the user says that return path is the usual flow. Do **not** add ECs for app killed, cache cleared, browser closed, or site cache cleared — those live in [shared general context](../../shared/general-context.md). The leave-and-return row is only for coming back while the app is still running and the cache has not been cleared.

Shared generic errors stay out of both §5 and §6. See [general-context.md](../../shared/general-context.md).

See [section-instructions.md](section-instructions.md) §5–6.

**Do not** use this split on a simple page. **Do not** use this split to break sibling outcomes of one **action** (same click / same state change). Those still merge into one AC.

Canonical product example: Shopping Cart — skeleton, then each cart-item field, then quantity rules, then actions.

## 2n. Keep §5 and §6 in an order a human can scan

Row order and IDs must match. A reader should understand the page by reading **AC-01** downward. Do not scatter related rows.

**§5 order:**

1. **What is shown** — keep related fields and controls together. One field set stays as consecutive rows. Do not split name fields from other form fields with title or button ACs in between.
2. **What varies by who the user is or how they arrived** — title and primary button after the shared fields.
3. **Field behavior** — empty vs filled, and select options that depend on another field.
4. **Successful actions** — Save, Use this address, continue.
5. **Leave-and-return** only when it is happy path (§2m).

Complex pages still follow §2l: skeleton, then per-section see ACs, then the rest of this order.

**When adding or updating ACs or ECs:**

- Insert the new or changed row **next to related rows**. Do **not** append at the bottom unless it belongs last.
- Then **renumber** so IDs are sequential and match table order (`AC-01`, `AC-02`, … / `EC-01`, `EC-02`, …).
- Same for §6: keep related edges and errors together.
- **No duplicate Then content.** Be concise. If a see AC already says values are shown **for the selected option**, do not add another bullet that selecting each option shows those same values.

### Page PRD

- **In scope:** what is shown on **this** page; selecting CTAs on **this** page; hand-off = the guest **leaves this page** for the named next step (name the destination only as the navigation target — e.g. “Log in opens” / “the guest is taken to Log in”).
- **How the user arrives / leaves the broader path** is owned by the **journey PRD** (§4 mermaid) — page PRDs do **not** require §3d Entry / §3e Exit (use **`N / A`**). Do **not** add §5 ACs that only describe arrival on this page.
- **Out of scope:** anything that happens **on** destination pages; back from destinations; steps, fields, OTP, errors, or recovery **inside** other flows; re-open/resume after leaving for another flow; inventing requirements that belong in Non-Goals.
- Do **not** expand Non-Goals into AC/EC detail. Other pages are not Non-Goals; naming a hand-off destination does **not** authorize writing that destination’s ACs here.

### Journey PRD

- **The journey PRD stitches page PRDs together.** The §4 mermaid is the happy-path order of **page PRDs (type S)** and **nested journey PRDs (type J)**. Name each stop with its PRD ID.
- **Do not** put sheets, dialogs, confirmations, popups, or other in-page UI in the mermaid. Those stay on the **page PRD** that owns them.
- **In scope:** only those page and nested-journey PRDs in **this** journey (§4 mermaid / confirmed journey).
- **Out of scope:** pages or flows outside that journey; do not borrow or invent adjacent-product requirements.
- **§4 mermaid owns the happy-path step order and transitions** — including where the journey **starts** and **ends**. Do **not** duplicate those same transitions as §5 ACs (e.g. “on screen A, **Next** → screen B” when the mermaid already shows that edge).
- When the mermaid clearly defines the path, §3d / §3e are **`N / A`** (see §6) — do not restate the same path as entry/exit tables.
- **§5 on a journey PRD** covers only what is **not** already in the mermaid **and not** already owned by linked screen (**S**) PRDs. If nothing beyond the mermaid + screen PRDs remains, §5 is **`N / A`**.
- **§6 on a journey PRD** covers only feature-related edges/negatives **not** already in the mermaid (mermaid is happy path — do not restate chart edges as ECs).
- Step-level field rules and per-screen UI stay on screen (**S**) PRDs unless the user asks the journey to own them.

### Hand-off wording

- Allowed: Then names where this page/journey sends the user (navigation contract of a CTA on this page).
- Forbidden: Then/Expected/Recovery that describe UI or behavior **after** arrival on another page (except the bare fact of leaving / destination name).
- When the destination is a **journey**, name the **journey PRD** only. Do **not** name a screen inside that journey. Canonical: **Update PIN** → Reset PIN (LF-J-007), not Enter Existing PIN (LF-S-032). **Saved Addresses** → Saved Address Management (LF-J-004), not Saved Addresses (LF-S-023). Same pattern: **Recharge** → Payment (LF-J-014). When the destination is a **screen** with no owning journey, name that screen PRD.

### Page PRD — primary forward CTA destination is always out of scope

For a **page / screen PRD (type S or P)**:

- The **primary forward CTA** that takes the user to the **next page** is an **in-scope exit hand-off** only: Then may say the user is taken to the next step / named destination **with PRD ID or `(PRD TBD)`**. Label that CTA per **CTA labels** below.
- The **destination page’s content and behavior** are **always out of scope** for the current page PRD. Name the destination in the **AC hand-off** (and in **§3e** only when that section is filled — page PRDs usually use §3e **`N / A`**) — do **not** list other pages in §3c Non-Goals.
- Do **not** ask whether the next page is in scope for a page PRD; default is out of scope for destination content.

**Exception — reusable screen used in more than one journey:** Do **not** put flow-specific primary-forward destinations on the page PRD. The **journey PRD** mermaid owns where that CTA goes in that flow. On the page PRD, keep the CTA as shown and selectable, plus any validation or error that happens on this page before the user leaves. Do **not** duplicate that mermaid edge as a journey §5 AC.

Canonical: PIN Entering (LF-S-006) is used in create account, Forgot PIN, and Reset PIN. Create account **Next** is `pin -->|Matching strong PIN + Next| details` on Create Account (LF-J-001). Forgot PIN **Next** is `pin -->|Matching strong PIN + Next| success` on Forgot PIN (LF-J-006). Reset PIN **Next** is `pin -->|Matching strong PIN + Next| success` on Reset PIN (LF-J-007). Both Forgot PIN and Reset PIN continue to PIN Successfully Updated (LF-S-031).

### CTA labels (progress vs action)

Use a consistent primary CTA pattern. This is an **authoring** rule for `generate-prd` (and `design-prd-consistency` when it applies generate-prd rules). It is **not** a shared-context product rule.

- **Next** when the tap only progresses to the next step
- An **action-specific** label when the tap performs a meaningful action (e.g. **Pay**, **Redeem**, **Transfer**, **Buy now**, **Proceed to payment**, **Apply**, **Add**, **Log in**, **Submit**, **Save**)

Do not force **Next** onto a button that pays, redeems, saves, or otherwise completes a named action.

**When input disagrees:** If the brief, design, or author uses a label that conflicts with this pattern or with sibling screens in `prebuilt_prds/` (e.g. **Continue** on a progress step that other flow screens call **Next**, or **Next** on a tap that pays), **stop and ask** before writing §5–6. Keep their label as intentional, or align to this pattern. Do **not** silently rewrite. Do **not** invent a third label.

Same ask-before-rewrite for other repeated CTAs when the new screen invents inconsistent copy for an established control (e.g. **Back** vs **Previous**).

### Cross-PRD references (include the PRD ID)

Whenever this PRD **names another screen, page, or journey** (entry, exit, AC/EC hand-off, Goals, Non-Goals, Links, pending links):

- Include the destination’s **PRD identifier** next to the name: e.g. `Welcome (LF-S-001)`, `Activation — enter number (LF-S-005)`.
- If the destination PRD **does not exist yet**, write the name plus `(PRD TBD)` (and list it in `prebuilt_prds/pending-prd-links.md` when appropriate): e.g. `Login (PRD TBD)`, `Offer list (PRD TBD)`.
- Do **not** invent a fake ID. Do **not** leave bare names like “taken to Welcome” when a known ID exists.

### When a PRD ID changes (rename / renumber)

If the user changes a PRD’s identifier (file rename, title ID, or sequence number):

1. Update **this** PRD’s title, filename, and review record path as needed.
2. **Search `prebuilt_prds/`** (and `prebuilt_prds/pending-prd-links.md`, `prebuilt_prds/reviews/`) for the old ID and for the feature name used as a hand-off target.
3. **Remind the author** in chat to update every cross-reference (and offer to patch them). Do not silently leave stale IDs.
4. Prefer updating those references in the same session when the author confirms.

## 2o. Page title (authoring)

This is an **authoring** rule for `generate-prd` (and `design-prd-consistency` / `api-mapping` when they apply generate-prd rules). It is **not** a shared-context product rule.

Page titles use **sentence case**. Capitalize the first word. Keep later words lowercase except proper nouns and acronyms such as **PIN**, **OTP**, **SIM**, **eSIM**, and **ID**.

Examples: **Enter mobile number**, **Set PIN**, **Take a selfie**, **Registration complete**.

Page title is **not from an API** unless the PRD **specifically** says the page title comes from an API.

**Category name** is **front-end code**. It is **not from the API**. Offer list page title that is the current category name uses that front-end name.

**Rules:**

- Do **not** restate sentence-case as a product rule in each PRD.
- When a screen has a page title, write that title in **sentence case** in the screen AC.
- Do **not** map page title in `api-mapping` / §7 unless the PRD specifically says the page title comes from an API.
- Do **not** map **category name** (page title, **Filter by category** option labels, or other category labels) — it is front-end code, not an API field.

---

## 3. Header → Figma (attached separately)

- Header **Figma** is a **separately attached** team-viewable design link.
- **Never** copy the Figma URL, screenshot, or export the user used as **generation input** into Header → Figma.
- Leave empty / `TBD` until they attach a dedicated Header Figma.
- Generation design input may still be used to inspect UI and build inventory / journey (journey PRDs only).

---

## 3a. Header → Confluence (this PRD’s page)

- Header **Confluence** sits **below Figma**. It is **this PRD’s** Confluence page URL.
- `generate-prd` leaves `TBD`.
- `publish-prd` writes `[PRD: <H1 title>](<webUrl>)` after the page exists (create, then update so the wiki body has the link). If the cell already has the same page id, leave it. If empty/`TBD`/`N / A`/missing, or the page id changed, write the current URL.
- Do **not** put this PRD’s own page URL in Header → Links.

## 3aa. Header → Jira

- Header **Jira** sits **below Confluence**.
- `generate-prd` writes `—` unless the user gives a ticket.
- Do **not** write a PRD / Design / Implementation list. Ticket linking by slot can be added later.
- `publish-prd` does **not** fill this field from the AIDR board.
- Do **not** put tickets in Header → Links.

---

## 3b. Header → Contributors (PRD authors only)

**Contributors** = who has **authored or edited this PRD document**, not who worked on design/eng for the feature.

- List **PM name(s)** who contributed to writing or updating **this** PRD file.
- On first `generate-prd` create: set Contributors to the PM who ran/owns the authoring (usually the same person as Owner (PM) when that person drafted it — e.g. if Nan Dong works on the PRD, Contributors includes **Nan Dong**).
- When **another PM** later modifies the PRD: **add** their name to Contributors (do not remove prior names).
- Do **not** put Design, Engineering, Legal, or other role labels here (those are not PRD-doc contributors).
- Do **not** invent extra contributor names; only people who actually worked on the doc.

---

## 3c. Header → Links (optional) — page template and shared context only

- Always include **shared context** in Header → **Links (optional)** on `generate-prd` as a **Confluence** URL: `shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules)`.
- Also include `page template: <Confluence link>` when the screen uses a page template (§2g). Use the canonical URLs in [publish-prd confluence-projects.md](../../publish-prd/config/confluence-projects.md).
- Header Links must **never** point at local files (`.md`, `.cursor/`, relative repo paths).
- **Do not** include any other Header Links — not this PRD’s own Confluence URL, tickets, related PRDs, or “see also”. Do **not** copy AC/EC hand-off destinations into Header Links. Do **not** ask the user whether to add those.
- Do **not** put `pending-prd-links.md` / “Pending destinations” in Header Links. Track unfinished hand-offs only in `prebuilt_prds/pending-prd-links.md` (writer reminder); in the PRD body use `(PRD TBD)` on the named destination where needed (AC / EC hand-off; §3e only when filled).
- `publish-prd` writes this PRD’s Confluence URL into Header → **Confluence** and returns it in chat. Do **not** write this PRD’s own page URL into Header Links. Find an existing Confluence page from Header → Confluence, §1 Change Log, or title / PRD id search. Before writing the body, rewrite any leftover local-file Header Links to the canonical Confluence URLs.

---

## 4. Ignore-as-absent controls

- If the user says to ignore a control on the design (e.g. unclear eye / utility icon), **pretend it is not on the screen**.
- Omit from journey, UI inventory, Non-Goals, ACs, ECs, and data mapping.
- Do **not** list it as an out-of-scope / Non-Goal item.

---

## 5. §3a–c — do not repeat scope; do not invent Non-Goals

| Subsection | Job only | Forbidden |
|------------|----------|-----------|
| **§3a Central requirement** | **High-level requirement summary** — what this feature must deliver | Mix/validation rules, field lists, button sequences, In/Out lists, “this PRD covers only…” |
| **§3b Goals** | **High-level** — what the user will **accomplish** on this screen | Restating Non-Goals or entry/exit; **listing buttons/actions**; **expanding** beyond on-page elements |
| **§3c Non-Goals** | **On this page/journey** but **out of scope** for this PRD (user-stated or confirmed) | Restating Goals; listing **other pages** / destination journeys; inventing out-of-scope items |

In/Out for how users arrive/leave belongs in §3d–e **only when those sections are filled** (see §6). Page PRDs and mermaid-covered journeys use **`N / A`**.

### Central requirement — high-level summary only

- §3a is a **high-level requirement summary**: what this page/feature must deliver, in one short sentence (a second sentence only if it stays high-level).
- **Do not** use §3a to dump detailed product rules (offer mix, which extra info is required, field lists, validation, rate limits). Put those in **§5–6** or in [general-context.md](../../shared/general-context.md) when they are product-wide.
- §3a must stay distinct from Goals: the summary is the requirement; Goals are what the user **accomplishes** on the screen.

### Goals & Non-Goals — on-page / this-journey only (do not expand)

- §3b and §3c cover **only** elements that exist **on this page** (or steps **in this journey** for a journey PRD).
- **Do not expand** Goals or Non-Goals into other pages, destination journeys, catalogs, or product areas that are not on this page/journey.
- If there is no on-page (or in-journey) element for a topic, it does **not** belong in Goals or Non-Goals.

### Goals — what the user accomplishes on the screen (not each button)

- §3b states **what the user will accomplish** on this screen at a high level — not what each action button or control does.
- Keep Goals **short**. **One bullet is enough** when the screen has one accomplishment. Do **not** pad Goals to 2–5, and do **not** turn every on-page control into its own Goal.
- **Put in §5, not Goals:** per-button behavior (**Log in**, **Next**, menu items), sort / open / delete as separate Goals, open/close toggles, confirm/cancel branches, per-control visibility, tap/click sequences, validation rules, error recovery steps.
- If a bullet names a specific button and what happens when it is selected, move that to §5 and rewrite the Goal as the underlying accomplishment (e.g. “Log in” not “Select **Log in** and go to Dashboard”).
- If a bullet reads like an AC Given/When/Then, move it to §5 and rewrite the Goal as the underlying user accomplishment.
- Canonical: Inbox Goal is **Review their messages**. Do **not** list Sort messages by time, Open a message, or Delete a message as Goals. My Vouchers Goal is **Review their vouchers**, not search, tabs, or redeem. Dashboard Goals are **Check their balances** and **Redirect to other account management sections**. Do **not** list first name, each balance type, buy add-on, or each named entry point as Goals.

### Non-Goals — on this page/journey, out of scope; never other pages

- **Do not invent** Non-Goals. Only list items the user **stated or confirmed**.
- Each Non-Goal must be something **present on this page** (or in this journey) that is **explicitly not in scope** for this PRD (e.g. an on-page control or section the PRD does not cover).
- **Do not** put **other pages** in Non-Goals — not destination content after **Next** / **Log in** / **Submit**, not “Login flow”, not “Edit email page”, not “what happens after the user leaves”. Hand-offs name the destination in **ACs** (and §3e only when filled) only; destination behavior is simply out of scope by authoring-rules §2f without a Non-Goal bullet.
- **Do not** flesh out adjacent flows or other PRDs in Non-Goals.
- If nothing on this page/journey is out of scope, §3c is **`N / A`**.
- If Non-Goals are unclear, **ask** what on-page/journey items are out of scope. Until then: `TBD — confirm with PM` or `N / A` — never invent other pages.
- There is **no** default Non-Goal for brand/logo/marketing visuals — brandless (§2) is writing style only; add brand to Non-Goals only if the user stated it as an on-page out-of-scope item.
- There is **no** default Non-Goal for “logo and menu chrome”, header, or footer on a screen — do not invent these; if the screen uses a page template, see §2g.
- Ignore-as-absent controls still must **not** appear in Non-Goals (see §4).

---

## 6. §3d Entry points & §3e Exit points — optional

Per [PRD Template](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7539851327/PRD+Template): entry points and exit points are **optional**. Headings **§3d** and **§3e** always stay in the PRD; body is often **`N / A`**.

### Page / screen / template PRD (type S or P)

- Not needed when a **journey PRD** defines the path.
- Write **`N / A`** under both §3d and §3e. Do **not** ask for entry/exit.
- Still name on-page CTA hand-off destinations in **§5 / §6** with PRD IDs (or `(PRD TBD)`). Do **not** invent arrival-only ACs.

### Journey PRD (type J)

- Not needed when the §4 **mermaid clearly defines the path** — §3d and §3e are **`N / A`**. Do **not** duplicate the chart as entry/exit tables, and do **not** ask for them.
- Fill §3d and/or §3e **only when**:
  - the mermaid does **not** clearly define the path (start/end/entries), or
  - the user/brief needs In|Out rows for paths **beyond** what the mermaid shows, or
  - the user explicitly asks for entry/exit tables
- When filling §3d–e: use what is clear from the brief/design; if still unclear, **ask before generating** — never invent (no guessed deep links, resume, QR, marketing CTAs, etc.).
- AC child must **not** stop for missing entry/exit when §3d–e are correctly **`N / A`**. Stop only if the parent marked entry/exit as required and they are still missing/TBD without user confirmation.

---

## 7. §4 User Journey — always present; auto `N / A` for page PRDs

- **Always** include the `## 4. User Journey` heading in every PRD.
- **Once the PRD is classified as a page PRD** (single screen / landing / page-local behavior), **automatically** set §4 body to exactly **`N / A`** — do not ask again about journey content, do not invent a mermaid.
- **Journey PRD:** happy-path mermaid only. The chart **stitches page PRDs (and nested journey PRDs) together** — each stop is a type **S** or type **J** with its PRD ID. No error paths. No sheets, dialogs, or other in-page UI (those stay on the page PRD).
- Journey mermaid transitions are the source of truth for happy-path navigation — do not restate them in §5 (see §2f Journey PRD).
- Ask once **only if page vs journey is unclear**. After the type is known, apply the rule above without further prompts for §4.

---

## 8. PRD ID — `<PROJECT>-<TYPE>-<NNN>`

### Project prefix (PROJECT)

- Ask at start if missing; default **`LF`** (uppercase).
- Examples: `LF`, `PNCC`, `AIDR`.

### PRD type prefix (TYPE)

| Prefix | Meaning |
|--------|---------|
| **J** | Journey — multi-step flow; §4 mermaid |
| **S** | Screen — single screen or persistent UI surface (welcome page, header, one screen) |
| **P** | Page template — reusable page template pattern |

- **Infer** when clear (journey → J; one screen/surface → S; user says template → P).
- **Ask** if unsure between J / S / P (especially S vs P).

### Sequential number (NNN)

- Three digits: `001`, `002`, …
- Next number = highest existing `<PROJECT>-<TYPE>-*` in the **target folder** (`prebuilt_prds/` or `project_prds/`) + 1.

### Files and title

- **Title:** `PRD: LF-S-001 - Feature name`
- **File (prebuilt):** `prebuilt_prds/LF-S-001-short-slug.md`
- **File (project):** `project_prds/<PROJECT>-S-001-short-slug.md`
- **Review record (review-prd):** `prebuilt_prds/reviews/LF-S-001-review.md` (prebuilt) or `project_prds/reviews/…` (project, when used)

### Renaming or renumbering an ID

If PROJECT, TYPE, or NNN changes after references already exist: update the file/title, then **remind the author** to update all cross-references under `prebuilt_prds/` and `project_prds/` (and pending-prd-links / reviews). Search for the old ID and patch or list remaining hits — see §2f Cross-PRD references.

---

## 8b. Generation target + prebuilt check

**Targets:** **prebuilt** (catalog → `prebuilt_prds/`) vs **project** (implementation → `project_prds/`). **Current default: prebuilt.** Ask only if unclear.

### Prebuilt target (current work)

1. Search `prebuilt_prds/` for the same/similar feature.
2. If match: offer **update that prebuilt** or **new catalog ID** — do not Mode D into `project_prds/`.
3. Save under `prebuilt_prds/`.

### Project target (later / when asked)

1. **Check** `prebuilt_prds/` for a matching catalog PRD (e.g. **`LF-S-001`**).
2. **If match:** ask **generate from this prebuilt** (Mode D) or **draft from scratch**.
3. **Mode D:** new file under **`project_prds/`** with the **user’s project prefix**; seed content from the prebuilt; leave the prebuilt unchanged.
4. **If none / from scratch:** write Mode A/B into `project_prds/`.

Full steps: [entry-modes.md](entry-modes.md) + parent SKILL generation-target section.

---

## 9. Publishing

- `generate-prd` saves to `prebuilt_prds/` (prebuilt) or `project_prds/` (project) only.
- Do **not** publish to Confluence and do **not** ask to publish after generation (`publish-prd` is separate).

---

## 10. Children must honor parent scope rules

**write-ac-and-edge-cases (§5–6):**

- **§5 = happy path only:** (1) what the user will see on the page, (2) what the user can do on the page, (3) what happens when the user performs an action (successful outcome). Never put negatives in §5. See §2m.
- **§6 = all extreme cases and negative scenarios** for this feature (missing data, placeholders for missing fields, wrong input, lockouts, rate limits, feature-specific resource fallbacks, blocked actions, error messages). Never put those in §5.
- **Do not** put in any PRD: unhandled API error codes, API failure, timeout, network/slow network, empty or incomplete required fields, incorrect number format, image load failure (shared placeholder), quantity field input, app killed / cache cleared, loading while an API is in progress (whole page on arrival, or on the existing page after an action button), or a second tap of that action while its call is in progress — those live only in [shared general context](../shared/general-context.md). A PRD specifies loading only when that page or action is different from the shared default.
- Front-end field validation: do **not** add an EC that only restates timing. Feature field-error ECs use **the user leaves the field** as the trigger. Do **not** use **Submit** / **Next** / **Checkout** / **Buy now** / **Add to cart** as the only trigger. Submit still does not continue while the error remains.
- One observable Then per AC; no “successfully”.
- Feature-level abstract ECs only — not happy-path success. No mechanism / HTTP codes.
- Use confirmed Non-Goals only; never invent them or invent details inside out-of-scope flows. Entry/exit: only when §3d–e are filled (not when correctly `N / A`).
- Page / journey: §5–6 only this page or journey — hand-off names destination only; never write destination-page behavior (authoring-rules §2f). PRD must be self-contained.
- **Journey:** §5 and §6 only cover what is **not** already in the §4 mermaid.
- Ignore-as-absent: do not write ACs/ECs for ignored controls.

**write-data-mapping (§7):**

- Map **dynamic** UI fields → Swagger/OpenAPI only (not static copy, fixed CTAs, or client-only navigation)
- Swagger/OpenAPI required when there is at least one dynamic field; never fabricate
- One row per dynamic field; if none → §7 body is `N / A`
- Surface unmatched dynamic UI; empty/fallback TBD only for real dynamic fields awaiting confirm

---

## Quick checklist (agent)

- [ ] Read this file + section-instructions before drafting
- [ ] Channels resolved (App / App + Web) before drafting
- [ ] PRD ID resolved: `<PROJECT>-<TYPE>-<NNN>` (project prefix; type J/S/P inferred or asked; next seq number)
- [ ] Page vs journey decided; if screen/template → §4 automatically `N / A`; if journey → §4 mermaid
- [ ] Entry/exit optional: page → `N / A` when journey owns path; journey → `N / A` when mermaid clearly defines the path; else from brief/design or ask — never invent
- [ ] Non-Goals stated/confirmed only; **on this page/journey** out-of-scope items only — **no other pages** in Non-Goals (`N / A` if none)
- [ ] §3a / §3b / §3c distinct; no scope repetition; §3a is a high-level requirement summary only
- [ ] §3b Goals high-level — what the user **accomplishes** on the screen; one Goal is enough; not per-button / per-control actions such as sort, open, delete (those belong in §5)
- [ ] §3b / §3c only cover logic/function of **on-page** elements — no expansion beyond the page
- [ ] §5 happy path only (§2m): what user sees / can do / successful action; no missing data, placeholders for missing fields, error copy, or blocked actions
- [ ] §6 = all feature-related edges and errors (missing fields, over-max, blocked add/checkout); technical → shared general-context; journey §6 only what is **not** in the mermaid
- [ ] §5 does not restate arrival / §3d Entry points (when §3d is filled)
- [ ] Journey mermaid stitches **page PRDs** and nested **journey PRDs** only — no sheets, dialogs, or other in-page UI
- [ ] Journey PRD: §5 does not duplicate §4 mermaid transitions (mermaid owns happy-path navigation)
- [ ] Happy-path continue/submit: Given is **all purchase validation has passed** (or equivalent); do not re-list §6 checks; one success AC for that action (§2m)
- [ ] Leave-and-return with entered values still shown is a **§6 Edge**, unless the user says that return is the usual flow (§2m). Do **not** add app-killed or cache-cleared ECs (general-context)
- [ ] §5 / §6: one **action** → one row (sibling outcomes of the same click / state change are merged)
- [ ] Complex pages: split **what the user will see** — skeleton AC first, then per-section see ACs; do not write one very long “views the screen” AC (§2l)
- [ ] §5 / §6 rows are in a human-readable order; new or updated ACs/ECs are inserted next to related rows and then renumbered (§2n)
- [ ] Long multi-outcome Then / Expected behavior use bullets when hard to read as one sentence — each bullet on its own line (`- …<br>- …`, never jammed `- … - …`)
- [ ] Header Figma not copied from generation input
- [ ] Header Confluence is `TBD` on generate; `publish-prd` fills the page URL after the page exists
- [ ] Header Jira is `—` on generate unless the user gave a ticket
- [ ] Contributors = PM(s) who authored/edited this PRD (append on later PM edits; not Design/Eng roles)
- [ ] Header Links always include shared context; plus page template when used (§2g); extra Header Links only if the user explicitly asked
- [ ] Ignore-as-absent controls truly absent (not in Non-Goals)
- [ ] Brandless writing style (no invented brand Non-Goals)
- [ ] Everyday product language (§2d) — no UX/engineering jargon; concise; no parenthetical asides
- [ ] Page titles in sentence case (§2o)
- [ ] Shopping Cart: one universal cart, not per offer category or purchase flow; open-cart lives in Header only (§2j)
- [ ] Checkout mix: Physical SIM not with other types; eSIM checkout is one eSIM at quantity 1; data not with SIM offers (§2k)
- [ ] Shopping Cart: decrease stays available at quantity 1; decrease at 1 confirms delete (§2h)
- [ ] Quantity fields: stepper, direct edit, and integers-only are shared context only; range such as **99** and decrease at **1** stay in the feature PRD (§2i)
- [ ] No design designations unless purposely included (§2e) — business rules only; no UI control visual effects (checkbox checked / empty / dash, hover, highlight)
- [ ] Cross-PRD hand-offs include PRD IDs (`Welcome (LF-S-001)`) or `(PRD TBD)` when the destination is not written yet. Journey destinations name the **journey PRD** only, not a screen inside that journey
- [ ] Page PRD: ACs/ECs self-contained on this page/journey (§2f) — no other-page expansion
- [ ] Header Links contain **only** shared context and, when used, `page template: <link>` — both as **Confluence** URLs, never local files; this PRD’s own page URL is Header → Confluence, not Links; no extra links
- [ ] If screen uses a page template (§2g): template **only** in Header Links as `page template: <link>` (nowhere else); no restated back ACs; no invented chrome Non-Goals
- [ ] Generation target resolved — prebuilt (default now) vs project (§8b); Mode D only for project
- [ ] §1 Change Log empty on generate-prd; rows only via publish-prd or design-prd-consistency
- [ ] Children follow §5–7 rules; no invented entry/exit (when required) or Swagger
- [ ] Clean `prd-output.md` shape; no Confluence offer; no agent instructions in TBD/Note cells
