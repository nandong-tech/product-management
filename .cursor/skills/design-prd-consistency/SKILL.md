---
name: design-prd-consistency
description: >-
  Parent skill (user entry). Type "design-prd-consistency" at the start of the
  message. Updates an existing AIDR PRD from Figma/design: writes or corrects
  Header Figma to the journey canvas or this screen’s section, lists design vs
  PRD inconsistencies and design updates, walks through accept/reject one by
  one, applies accepted changes using generate-prd authoring rules, then
  appends a §1 Change Log row. Does not create a new PRD — use generate-prd.
  Does not publish — use publish-prd.
---

# Design PRD consistency (parent)

**How to invoke:** User types `design-prd-consistency` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md)

**Shared general context:** [../shared/general-context.md](../shared/general-context.md)

Updates an **existing** PRD under `prebuilt_prds/` or `project_prds/` from the current design. Does **not** create a new PRD — that is `generate-prd`. Does **not** publish, review, or run `api-mapping` unless the user typed those skills.

## When to use

- User starts with `design-prd-consistency …`
- Design changed and an existing journey / screen PRD needs to catch up
- User wants a design-vs-PRD gap list, then accept or reject each item

## Mandatory reads (before any PRD edit)

Accepted edits must follow the same generation rules as `generate-prd`:

1. [../generate-prd/reference/authoring-rules.md](../generate-prd/reference/authoring-rules.md)
2. [../generate-prd/reference/section-instructions.md](../generate-prd/reference/section-instructions.md)
3. [../shared/telecom-domain.md](../shared/telecom-domain.md)
4. [../shared/general-context.md](../shared/general-context.md)

When an accepted item changes §5–6, also follow [../generate-prd/children/write-ac-and-edge-cases/SKILL.md](../generate-prd/children/write-ac-and-edge-cases/SKILL.md). When it changes §7, follow those §7 rules — do **not** invent API fields; if dynamic fields changed, tell the user to run `api-mapping` (do not run it here).

Saved files must stay [../generate-prd/templates/prd-output.md](../generate-prd/templates/prd-output.md) shape — no instruction text.

## Workflow

```
Design-PRD consistency progress:
- [ ] 1. Resolve journey / screen (ask if missing)
- [ ] 2. Resolve Figma (ask if no usable link); write or correct Header Figma
- [ ] 3. Read PRD + inspect design
- [ ] 4. List every inconsistency / design update
- [ ] 5. Walk through items one by one (accept or reject)
- [ ] 6. Apply accepted edits using generate-prd rules
- [ ] 7. Append §1 Change Log (accepted edits, or Header Figma written/corrected)
- [ ] 8. Consistency check + summarize
```

### 1. Ask journey / screen (required when missing)

On invoke, identify **which PRD** to update.

**Ask** (unless the user already named an ID, path, or unique feature):

> Which journey or screen should I update? Give the PRD ID (e.g. `LF-S-017`), file path, or the journey / screen name.

Resolve to one file under `prebuilt_prds/` or `project_prds/`. Search by ID, Feature, title, or slug. If several match, list `ID — Feature` and ask. If none exist, stop and point them to `generate-prd`.

**Journey (J):** this file is in scope. If the design also changes a child **screen** PRD, include those as items tagged with that screen ID — ask whether to edit those files too when that item comes up.

**Screen / template (S / P):** only that page PRD.

Do not start the comparison until the PRD file is known.

### 2. Resolve Figma and write Header Figma (required)

A usable Figma link is a `figma.com` URL on this run **or** in Header → **Figma**.

**Does not exist** (ask): Header Figma is empty, `TBD`, `N / A`, `N/A`, `—`, or not a Figma URL — **and** the user did not paste a Figma URL in this message — **and** no in-scope sibling PRD (journey or screen in this run) has a usable Figma URL to the same file.

**Ask:**

> What is the Figma for this journey / screen? Paste the file or frame link.

Wait. Screenshots / exports are allowed only if the user has no link; do not put those in Header Figma.

**Exists:** use Header Figma, a URL they pasted, or the file from an in-scope sibling PRD. If they pasted a different URL than Header Figma, ask which one to use.

Parse URLs like `generate-prd` Mode B: `figma.com/design/:fileKey/:fileName?node-id=1-2` → fileKey + nodeId `1:2`. Prefer the frame they point to.

**Write or correct Header Figma on this run** — do this as soon as the file and the correct node are known. Do **not** wait for accept/reject. Do **not** list a missing or wrong Figma link as a walkthrough item.

Point each in-scope PRD at the **most specific node that is still the right surface**:

| PRD type | Header Figma should be |
|----------|-------------------------|
| Journey (J) | The journey canvas or flow node |
| Screen / template (S / P) | That screen’s **section** (or primary frame) in the file — not the whole file, and not the parent journey canvas when a dedicated section exists |

When this run is a **journey**, also write or correct Header Figma on each **child screen PRD** you inspect, using that screen’s section.

**Update when necessary:**

- Header Figma is empty, `TBD`, `N / A`, `N/A`, or `—`
- The link is file-level only, or points at the journey canvas on a **page** PRD that has its own section
- The node is the wrong screen, a superseded frame, or no longer resolves

Write a markdown link. URL `node-id` uses hyphens (`45-2547`). Link text names the file and the surface (e.g. `Prebuilt Page Templates — Enter Number`). Set Header **Last updated** to today when you change Figma.

If Header Figma already points at the correct node, leave it.

### 3. Read PRD + inspect design

1. Read the **full** PRD.
2. Inspect the design: Figma MCP `get_design_context` and `get_screenshot` when available; otherwise the screenshots/exports they gave.
3. Inventory **business-rule** signals only — labels, fields, CTAs, states, destinations, empty/error components, journey order. See [reference/compare-design.md](reference/compare-design.md).

Do **not** treat layout, color, type, spacing, chevrons-as-decoration, or control look as updates unless the user already made them product rules (authoring-rules §2e).

### 4. List every inconsistency / design update

Build one numbered list **before** asking accept/reject. Include both:

| Type | Meaning |
|------|---------|
| **Inconsistency** | Design and PRD disagree on an in-scope business rule |
| **Design update** | Design added, removed, or changed something the PRD should reflect |

Skip visual-only diffs and items already owned by [shared general context](../shared/general-context.md).

If the list is empty: say the PRD matches the design for in-scope rules. Stop. Add a §1 `Updated from design` row **only** if you wrote or corrected Header Figma on this run (rationale: pointed Header Figma at this screen or journey). Otherwise do **not** add a Change Log row.

Otherwise show the full list, then start item 1 in the **same** turn. Comparison categories: [reference/compare-design.md](reference/compare-design.md).

**List format:**

```markdown
# Design vs PRD: [ID] — [Feature]

Design: [Figma URL or “screenshots provided”]
PRD: `[path]`

Found N items.

1. **[Type]** [short name] — one line
2. **[Type]** [short name] — one line
…
```

### 5. Walk through one by one (required)

Do **not** ask every item in one question. Do **not** apply an item until the user accepts it.

**Each turn, do exactly one item:**

1. Name the item. Say what the **design** shows and what the **PRD does today**.
2. Propose the PRD edit in everyday product language (section + what would change). If applying it needs a product choice (e.g. **Continue** vs **Next**), ask that choice here — do not silently rewrite.
3. Ask: **Accept this update?** Yes / No.
4. **Wait.** Do not start the next item in the same message.
5. **Yes:** apply to the saved PRD (step 6), confirm in one or two sentences, then start the next item.
6. **No:** do not edit. Do not invent a Non-Goal for the rejected design. Confirm skipped, then start the next item.

**Stop the walkthrough** when every listed item has Yes or No.

If the user says **accept all** / **reject all** (or a range), honor that and apply in one pass, then go to step 7.

### 6. Apply accepted edits (generation rules)

Edit the **existing** file. Do not create a new ID or a parallel draft.

Apply only what was accepted. Follow authoring-rules in particular:

- Everyday product language (§2d); no parenthetical asides
- No design designations unless they accepted a purposeful visual/product rule (§2e)
- §5–6 only this page / journey (§2f); hand-off names include PRD ID or `(PRD TBD)`
- Goals stay high-level; button behavior stays in §5
- Never invent Non-Goals
- Ignore-as-absent if they say to ignore a control
- Insert new ACs/ECs next to related rows, then renumber (§2n)
- §5 happy path only; edges/errors in §6 (§2m)
- Header **Last updated** = today (`YYYY-MM-DD`)
- **Contributors:** append the PM who ran this update if they are not already listed

Do **not** offer `publish-prd` or `review-prd` when you finish.

### 7. Change Log (required when the update is done)

After the last item is decided, if **at least one** accepted edit was written to the file, append **one** §1 row (not one row per item):

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| YYYY-MM-DD (today) | Updated from design | Header → Owner (PM) | Short why (accepted items, one clause) |

- Keep existing publish rows (`First publish to Confluence` / `Updated on Confluence`).
- Do **not** add a row when every item was rejected or the list was empty **unless** Header Figma was written or corrected on this run (then one row for that).
- Do **not** add a row from `generate-prd`. This skill and `publish-prd` are the only writers of §1 rows.

### 8. Consistency check + summarize

Run the `generate-prd` consistency checks that apply to the sections you changed (journey/page ↔ AC, §5 vs §6, design designations, everyday language, ID hygiene).

Then tell the user: file path, accepted count, skipped count, whether Header Figma was written or corrected, and that §1 has an `Updated from design` row (or why it does not).

## Do not

- Create a new PRD or new catalog ID
- Apply a design change the user rejected
- Copy visual design into ACs (layout, color, type, control look) unless they accepted it as a product rule
- Auto-run `publish-prd`, `review-prd`, or `api-mapping`
- Invent Non-Goals, entry/exit, or API fields
- Ask to publish when done

## Additional resources

- What to compare: [reference/compare-design.md](reference/compare-design.md)
- Authoring rules: [../generate-prd/reference/authoring-rules.md](../generate-prd/reference/authoring-rules.md)
- Section instructions: [../generate-prd/reference/section-instructions.md](../generate-prd/reference/section-instructions.md)
- Output shape: [../generate-prd/templates/prd-output.md](../generate-prd/templates/prd-output.md)
- Invocation: [../shared/invocation.md](../shared/invocation.md)
- Create new PRDs: sibling `generate-prd`
- Publish: sibling `publish-prd`
