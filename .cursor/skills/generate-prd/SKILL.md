---
name: generate-prd
description: >-
  Parent skill (user entry). Type "generate-prd" at the start of the message.
  AIDR PRD generation for prebuilt catalog PRDs and (later) project PRDs — from
  brief, Figma/design, convert existing, or seed from a prebuilt. Prebuilts save
  to prebuilt_prds/; project PRDs save to project_prds/. Current day-to-day work
  is prebuilt-only. Does not publish to Confluence — use publish-prd when asked.
  Runs internal child skills for AC/edge cases and data mapping. Mandatory
  rules: reference/authoring-rules.md and reference/section-instructions.md.
---

# Generate PRD (main entry / parent)

**How to invoke:** User types `generate-prd` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md) — telecom operators (not generic apps). Read before drafting.

**Shared general context:** [../shared/general-context.md](../shared/general-context.md) — product-wide rules (e.g. generic error for API failure or unhandled error code). Read before drafting.

**This is the only user-facing entry** for PRD *generation*. Child skills under [`children/`](children/) are **internal**.

## Generation target — prebuilt vs project

This skill supports **both** targets. Resolve the target early (infer when clear; ask if unclear).

| Target | What it is | Save to | ID / prefix | Current use |
|--------|------------|---------|-------------|-------------|
| **Prebuilt** | Reusable catalog PRD (content source for later projects) | `prebuilt_prds/` | Catalog prefix (today: **`LF`**) | **Default — this is what the team is generating now** |
| **Project** | Tenant / operator implementation PRD | `project_prds/` | User’s **project** prefix (e.g. `PNCC`) | Later — same skill; often seeded from a prebuilt (Mode D) |

**Current phase:** Assume **prebuilt** unless the user explicitly asks for a **project** PRD (or names a non-catalog project prefix and says it is for a project).

- **Prebuilt:** draft from brief/design (Modes A/B/C). If a similar file already exists in `prebuilt_prds/`, offer to **update that prebuilt** or create the **next** catalog ID — do **not** run Mode D (project seed).
- **Project:** run the Similar / prebuilt gate; if a catalog match exists, Mode D seeds content from `prebuilt_prds/` into a **new** file under `project_prds/` with the user’s project prefix and requirements.

**Skill vs catalog files:** Improving this skill pack is the goal when the user gives authoring feedback. Put every rule into [reference/authoring-rules.md](reference/authoring-rules.md) (and section-instructions / children as needed). Files under `prebuilt_prds/` are the **prebuilt catalog** (and test bed) — update them when generating/editing prebuilts. Files under `project_prds/` are project outputs.

**Publishing:** Do **not** publish to Confluence and do **not** ask to publish after generation. If the user wants Confluence, they use **`publish-prd`**.

**API YAML / §7:** Do **not** run **`api-mapping`** after generation unless the user typed `api-mapping`. `generate-prd` may still write §7 as `N / A` when there is no spec.

| Owner | Sections |
|-------|----------|
| **This skill** | §2 Header, §3 Central requirement + Scope, §4 User Journey (always present; `N / A` if not a journey PRD); §1 Change Log table left **empty** (rows only via `publish-prd` or `design-prd-consistency`) |
| Internal child [write-ac-and-edge-cases](children/write-ac-and-edge-cases/SKILL.md) | §5–6 — **expert** ACs; mines missed info; thorough edges/negatives |
| Internal child [write-data-mapping](children/write-data-mapping/SKILL.md) | §7 — **dynamic** UI fields → Swagger/OpenAPI (or `N / A`) |
| **This skill** | Stitch + consistency check + save to `prebuilt_prds/` (prebuilt) or `project_prds/` (project) |

See [README.md](README.md) for the folder map for other PMs.

## Mandatory reads (before drafting)

1. [reference/authoring-rules.md](reference/authoring-rules.md) — all PM authoring constraints (Figma, §3a–c, §3d–e when required / `N / A` for page PRDs and mermaid-covered journeys, §4 `N / A`, ignore-as-absent, brandless, everyday product language, no design designations by default, …)
2. [reference/section-instructions.md](reference/section-instructions.md) — per-section AIDR template rules
3. [../shared/telecom-domain.md](../shared/telecom-domain.md)
4. [../shared/general-context.md](../shared/general-context.md) — product-wide rules (e.g. generic error for API failure or unhandled error code — defined once, not as §6 ECs in each PRD)

## Output rule (critical)

**Saved PRDs must follow [templates/prd-output.md](templates/prd-output.md) — structure and content only, no instruction text.**

### Everyday product language

See [authoring-rules.md](reference/authoring-rules.md) §2d. Summary: plain product words for designers, clients, and engineers. Avoid jargon such as “actionable control” or “active session”. Be concise. Do not use parentheses for asides; put the meaning in the sentence. Parentheses only for required ID forms such as `Welcome (LF-S-001)` and `(PRD TBD)`. ACs stay professional catalog language: **taken to** a **screen** or **destination**, not casual “place in the app / outside the app”.

### No design designations by default

See [authoring-rules.md](reference/authoring-rules.md) §2e. Summary: do not put layout, chevrons, colors, typography, breakpoints, or **UI control visual effects** (checkbox checked / empty / dash, hover, highlight) into the PRD unless the PM purposely includes them. Write **business rules** only. Design input → what the page **does**, not how controls look.

### Page / journey — §5–6 self-contained

See [authoring-rules.md](reference/authoring-rules.md) §2f. Summary: ACs/ECs only for **this** page or journey. Name destinations as hand-off targets only — include the **PRD ID** (or `PRD TBD`); never write other-page behavior. If the destination is a **journey**, name the **journey PRD** only — do not also name a screen inside that journey. For **page PRDs**, the next page after the primary forward CTA is always out of scope for destination content. Use **Next** when the tap only progresses; use an action-specific label when the tap does a named action. If the screen is **reusable across journeys**, do **not** put flow-specific primary-forward destinations on the page PRD — the journey mermaid owns them. PRD must be self-contained. If a PRD ID is renamed, remind the author to update all cross-references. If brief/design CTA copy conflicts with this pattern or sibling screens, **ask the user to confirm** before writing §5–6 — do not silently rewrite.

### Complex pages — split what the user will see

See [authoring-rules.md](reference/authoring-rules.md) §2l. Summary: on a complex page, do not write one long “views the screen” AC. First a **skeleton** AC (sections only), then **one AC per section** for what the user sees there. If a section is still long, one AC per field or control. Simple pages stay one see AC. Do not split sibling outcomes of one action.

### Keep AC/EC order readable

See [authoring-rules.md](reference/authoring-rules.md) §2n. Summary: related ACs stay together so a human can scan top to bottom. When adding or updating ACs or ECs, insert next to related rows, then renumber. Do not append at the bottom unless the row belongs last.

### Page title

See [authoring-rules.md](reference/authoring-rules.md) §2o. Summary: write page titles in **sentence case** in the screen AC when the page has one. Page title is not from an API unless the PRD says so. Category name is front-end code — do not map it.

### Brandless by default

See [authoring-rules.md](reference/authoring-rules.md) §2. Summary: no brand binding; tenant theme; use `<PROJECT>-<TYPE>-<NNN>` IDs not brand names.

### Channels — App vs App + Web

See [authoring-rules.md](reference/authoring-rules.md) §2b. Summary: **`LF-*` through September 2026 → always `App + Web` (do not ask)**; otherwise ask **App only** vs **App + Web** unless already clear; record in Header → Channels.

### Header `Figma` (do not auto-fill from input)

See [authoring-rules.md](reference/authoring-rules.md) §3. Summary: Header Figma is attached **separately**; never copy generation input URL/screenshot/export; leave `TBD` until attached.

### Header `Confluence`

See [authoring-rules.md](reference/authoring-rules.md) §3a. Summary: row **below Figma**; this PRD’s Confluence page. Leave `TBD` on generate. `publish-prd` writes the URL after the page exists.

### Header `Jira`

See [authoring-rules.md](reference/authoring-rules.md) §3aa. Summary: row **below Confluence**; leave `—` unless the user gives a ticket. Do not split into PRD / Design / Implementation.

### Entry points & Exit points (§3d–e)

See [authoring-rules.md](reference/authoring-rules.md) §6. Summary (aligned with [PRD Template](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7539851327/PRD+Template)):

- Entry/exit are **optional**.
- **Page / S / P:** not needed when a journey PRD defines the path → §3d–e **`N / A`** (do not ask).
- **Journey (J):** not needed when the mermaid clearly defines the path → §3d–e **`N / A`**. Fill tables only when the path is not in the chart or the user needs extra In|Out — never invent.

### §3a–c (no scope repetition; no invented Non-Goals; on-page only)

See [authoring-rules.md](reference/authoring-rules.md) §5. Summary: central = what it is about; Goals = high-level what the user **accomplishes** on the screen (not what each button does — that is §5); **Non-Goals = on this page/journey but out of scope — never other pages** (destinations in AC hand-offs; §3e only when filled); never invent Non-Goals.

### Page PRD vs Journey PRD (§4)

See [authoring-rules.md](reference/authoring-rules.md) §7. Summary: always keep §4 heading; **if page PRD → automatically write `N / A`** (no mermaid, no extra ask); journey PRD → happy-path mermaid that stitches page PRDs and nested journey PRDs together. Ask only when page vs journey is unclear.

### Ignore-as-absent controls

See [authoring-rules.md](reference/authoring-rules.md) §4. Summary: ignored controls are absent — not Non-Goals.

## PRD ID (ask at the beginning)

Resolve the **project prefix** and **PRD type** before assigning the feature ID and sequential number.

### Format

`<PROJECT>-<TYPE>-<NNN>`

| Part | Meaning | How to resolve |
|------|---------|----------------|
| **PROJECT** | Project / product prefix (e.g. `LF`, `PNCC`) | **Prebuilt:** catalog prefix (today default **`LF`**). **Project:** ask for the user’s project prefix (required). |
| **TYPE** | PRD type prefix | Infer when clear; **ask if unsure** (see below) |
| **NNN** | Sequential number | `001`, `002`, … — next free number for that PROJECT+TYPE in the **target folder** (`prebuilt_prds/` or `project_prds/`) |

**Examples:** `LF-S-001` (prebuilt), `LF-J-002` (prebuilt), `PNCC-S-001` (project)

**Title:** `PRD: LF-S-001 - Welcome page (guest landing)`  
**File (prebuilt):** `prebuilt_prds/LF-S-001-welcome-page.md`  
**File (project):** `project_prds/PNCC-S-001-welcome-page.md`

### PRD type prefixes

| Type | Prefix | When to use |
|------|--------|-------------|
| **Journey** | **J** | Multi-step user journey; §4 has happy-path mermaid |
| **Screen** | **S** | Single screen, overlay, or persistent UI surface (welcome page, header, login screen) — includes what we call a **page PRD** when it is one screen/surface |
| **Page template** | **P** | Reusable page **template** pattern (shell/layout reused across pages), not a one-off screen spec |

**Infer TYPE (do not ask) when:**

- User describes a journey / flow across steps → **J**
- Brief or design is clearly one screen or one UI surface (landing, header, modal) → **S**
- User explicitly says page template / reusable template → **P**

**Ask TYPE when unsure** — e.g. could be a one-off screen (**S**) vs a reusable template (**P**), or screen vs journey:

> Is this PRD a **Journey** (J), **Screen** (S), or **Page template** (P)?

After TYPE is known, apply §4 rules: **J** → mermaid; **S** / **P** → §4 body **`N / A`**.

### Sequential number

- Scan the **target folder** (`prebuilt_prds/` or `project_prds/`) for existing files matching `<PROJECT>-<TYPE>-*`
- Assign the next three-digit number (`001`, `002`, …)
- Do not reuse numbers for different features

Do **not** include in saved PRD files or the Confluence body:

- Blockquote help lines (`> …`)
- Authoring guidance or “Filled by …” notes
- Agent instructions in TBD / Note cells (e.g. “Do not assume…”, “list confirmed entries only”)
- Unfilled example placeholder rows
- Agent-only commentary

**Writing guide for every section:** [reference/section-instructions.md](reference/section-instructions.md) (Title + §1–4 here; §5–7 via children). Structure sketch = [templates/prd-template.md](templates/prd-template.md). Deliverable shape = `prd-output.md`.

## Entry modes

Pick **one** mode first, then continue with the shared pipeline below.

| Mode | When | Primary input |
|------|------|----------------|
| **A. From brief** | New PRD from notes, goals, or stakeholder input (no matching prebuilt) | Problem / central requirement text |
| **B. From design** | New PRD inferred from UI (no matching prebuilt) | Figma URL (or design screenshots / exports) |
| **C. Convert existing** | Reformat an old PRD into AIDR | Existing PRD path, paste, Confluence/doc, or PDF |
| **D. From prebuilt content** | **Project** target only — intent matches a catalog PRD under `prebuilt_prds/` | Prebuilt content + user’s project prefix + requirements → save under `project_prds/` |

Details: [reference/entry-modes.md](reference/entry-modes.md).

### Resolve generation target (first)

1. Infer **prebuilt** vs **project** (see table above). **Default now: prebuilt.**
2. Ask only if unclear: “Is this a **prebuilt** catalog PRD or a **project** PRD?”

### Similar / prebuilt gate

#### When target is **prebuilt** (current day-to-day)

1. Infer intent; search `prebuilt_prds/*.md` for the same/similar feature.
2. **If a match exists:** offer to **update that existing prebuilt** or **create a new prebuilt** (next `LF-*` / catalog ID). Do **not** Mode D into `project_prds/`.
3. **If none:** continue Mode A or B and save the new prebuilt under `prebuilt_prds/`.

#### When target is **project** (later / when user asks)

**Required** before Modes A or B (skip if Mode C, or user already names the prebuilt seed → Mode D).

1. Infer intent from the brief/design.
2. Search **`prebuilt_prds/*.md`** for a matching catalog PRD (Feature, title, §3a, slug). Prefer `LF-*`.
3. **If matches found:** list as **`ID — Feature`**. Ask: **Generate from this prebuilt** (Mode D) or **Draft from scratch**.
4. **Mode D:** new file under **`project_prds/`** with the **user’s project prefix**; seed body from the prebuilt; leave the prebuilt untouched.
5. **If none / from scratch:** Mode A or B → save under `project_prds/`.

### Mode A — From brief

0. Resolve **generation target** (prebuilt default). Run the Similar / prebuilt gate for that target. Project + chosen seed → Mode D.
1. Resolve **prefix** (prebuilt: catalog/`LF`; project: user’s project prefix — ask) and **PRD type** J/S/P, then next **`<NNN>`** in the target folder and feature title
2. **Channels gate:** For **`LF-*` through September 2026**, set Header → Channels to **`App + Web`** without asking. Otherwise ask **App only** vs **App + Web** before drafting unless already clear; set Header → Channels
3. Resolve **page vs journey** (ask if unclear). Draft §3a–c per authoring-rules (no scope repetition; **ask** for Non-Goals if not clear from brief — do not invent)
4. **§3d–e:** Page PRD → **`N / A`** (do not ask). Journey PRD → **`N / A`** when mermaid will show start/end; otherwise entry/exit from brief or **ask** (never invent)
5. Draft §1–4 (§4 mermaid or `N / A`) only after channels are known, Non-Goals are confirmed or clearly stated, and §3d–e rules above are applied
6. Continue at **Shared pipeline** step 3

### Mode B — From design

1. Obtain Figma URL (file + node if possible) or use the provided screenshot/export
2. Inspect design: use Figma MCP (`get_design_context`, `get_screenshot`) when available; otherwise use provided screenshots/exports
3. **Thin-input gate (required):** If the user provided only **one screenshot** or **one Figma frame/screen** and there is not enough context to define the feature confidently (no brief, no multi-screen flow, unclear purpose of controls, unclear In/Out scope), **stop and ask** before drafting §1–4. Ask them to briefly:
   - **Channels:** App only or App + Web (required if not already stated)
   - Describe what the feature is for (1–3 sentences)
   - Define **scope**: what this PRD covers
   - **Non-Goals** — if not clear from the brief/design, ask; do **not** invent details of other flows
   - Optional but useful: who the user is, and what each unclear control does (e.g. icon-only buttons)
   - Feature ID after project prefix + type (J/S/P) + next number are resolved
   - **Do not** ask for entry/exit on page PRDs. For journey PRDs, only ask if the mermaid will not show start/end (or extra In|Out beyond the chart is needed)
   
   Do **not** invent a full product story from a single screen. Wait for their reply (unless they explicitly say “assume and draft”).
4. Resolve **generation target** (prebuilt default). Run the Similar / prebuilt gate for that target. Project + chosen seed → Mode D.
5. Resolve **prefix** if not already set (prebuilt: catalog/`LF`; project: ask). Resolve **PRD type** J/S/P (infer or ask). **Channels gate** if not yet resolved (App vs App + Web). Classify **journey vs screen/template** for §4 (ask if unclear). Then derive from screens + their description:
   - **Journey PRD:** stitch page PRDs and nested journey PRDs → §4 User Journey mermaid (happy path)
   - **Page PRD:** **automatically** set §4 body to **`N / A`** (no mermaid); capture UI inventory for children from the screen
   - Visible labels, inputs, CTAs, empty states → UI inventory
   - One-sentence central requirement
6. **§3d–e:** Page PRD → **`N / A`**. Journey PRD → **`N / A`** when mermaid shows start/end; otherwise from brief/design or ask — never invent from CTAs alone.
7. **Ignore-as-absent controls:** If the user says to ignore a control (e.g. an unclear icon-only button), treat it as **not on the screen** — omit from journey, UI inventory, Non-Goals, ACs, and edge cases. Do **not** list it as out of scope.
8. **Header `Figma`:** Do **not** copy the user’s generation input (Figma URL, screenshot, or export used for Mode B) into Header → Figma. That field is for a **separately attached** team-viewable design link. Leave it empty / `TBD` unless the user explicitly provides a distinct Header Figma attachment. **Header `Confluence`:** leave `TBD`.
9. Draft §1–4 after §3d–e rules are applied; mark remaining assumptions clearly where still ambiguous
10. Continue at **Shared pipeline** step 3 (pass full UI inventory to children; generation design input is for inventory only, not Header Figma)

### Mode C — Convert existing PRD

1. Resolve **project prefix** and **PRD type** for the new AIDR id (ask if missing; default project `LF`) unless the source ID’s format should be preserved (ask if unclear)
2. Read the source PRD fully (file, paste, or exported doc)
3. Map source content → AIDR sections (see [reference/entry-modes.md](reference/entry-modes.md) mapping table)
4. **Preserve** decisions, requirements, and ACs already stated; do not drop scope silently
5. **Normalize** into AIDR shape:
   - Rewrite messy ACs into Given / When / Then (one AC per interaction; merge sibling outcomes)
   - Move negatives into §6 if they were mixed into requirements
   - Rebuild journey as happy-path mermaid when it is a journey PRD; otherwise §4 body = **`N / A`**
6. Keep §1 Change Log **empty** (do not add a conversion row — Change Log rows are added only by `publish-prd` or `design-prd-consistency`). If the source had a revision history, do not copy it into §1 unless the user asks to preserve published history.
7. Flag source gaps (missing central requirement, no API Spec, etc.). For **journey** PRDs only: if mermaid does not show start/end and §3d–e are needed but missing, **ask**. Page PRDs: set §3d–e to **`N / A`**. Then run children to **fill** §5–6 / §7 where thin
8. Continue at **Shared pipeline** step 3 (or step 5 if §5–7 are already complete and only need re-stitch + consistency)

When converting, prefer improving coverage via children over leaving empty §5–7.

### Mode D — Generate project PRD from prebuilt content

**Project target only.** Use when a catalog PRD under `prebuilt_prds/` matches and the user confirms seeding, or when they name a prebuilt (e.g. `LF-S-016 — Login`).

1. Confirm which **prebuilt** to seed from if more than one candidate.
2. Resolve the **user’s project prefix** (required), **PRD type** J/S/P (usually same as prebuilt), next free **`<NNN>`** under **`project_prds/`**, and feature title from the user’s requirement.
3. Read the prebuilt fully. **Seed** the new PRD body from it.
4. Apply the **user’s project requirements** on top; rewrite cross-refs to project IDs when known (else `(PRD TBD)`).
5. Header for the **new** project PRD. Keep §1 Change Log **empty**. Do **not** overwrite the prebuilt.
6. Apply §3d–e rules for the new PRD type.
7. Run children to gap-fill / adapt §5–7 as needed.
8. Save: `project_prds/<USER-PROJECT>-<TYPE>-<NNN>-<slug>.md`.
9. Tell the user which prebuilt was used and invite edits. Do **not** offer Confluence publish.

Details: [reference/entry-modes.md](reference/entry-modes.md).

## Shared pipeline

```
PRD Progress:
- [ ] 0. Generation target — prebuilt (default now) or project
- [ ] 0b. PRD ID resolved — `<PROJECT>-<TYPE>-<NNN>` in the target folder
- [ ] 0c. Channels resolved — App only vs App + Web (ask before generating if unclear)
- [ ] 1. Mode selected + inputs gathered
- [ ] 1a. Similar / prebuilt gate — prebuilt: update vs new catalog ID; project: Mode D seed vs from scratch
- [ ] 1b. §3d–e applied — page: `N / A`; journey: `N / A` if mermaid shows start/end, else from brief/design or asked — never invented
- [ ] 1b2. Non-Goals confirmed with user — never invented
- [ ] 1c. Page vs Journey decided (§4 always present; `N / A` if not journey)
- [ ] 2. Draft parent sections (§1–4)
- [ ] 3. Child: write-ac-and-edge-cases (§5–6)
- [ ] 4. Child: write-data-mapping (§7)
- [ ] 5. Stitch into clean PRD
- [ ] 6. Consistency check
- [ ] 7. Save — `prebuilt_prds/` or `project_prds/`
- [ ] 8. Invite user changes — iterate until they are done
```

### 1–2. Gather + draft §1–4

**Required:** Read [reference/authoring-rules.md](reference/authoring-rules.md) and [reference/section-instructions.md](reference/section-instructions.md) for **Title + §1–4** before writing.

Apply in particular: §3a–c split, §3d–e per §6 (`N / A` for page / mermaid-covered journey), §4 mermaid or `N / A`, Header Figma separately, ignore-as-absent, brandless, everyday product language (§2d), no design designations unless purposeful (§2e — business rules only, no UI visual effects), §5–6 self-contained this page/journey only (§2f).

Follow [templates/prd-template.md](templates/prd-template.md) as structure reference; emit content shaped like [templates/prd-output.md](templates/prd-output.md) (no help text in the file).

Do **not** author §5–7 here — children own those (except Mode C may temporarily carry over source §5–7 for the child to refine). Children must follow §5–6 / §7 in the same section-instructions file.

Also collect **PRD ID parts** (project prefix, type J/S/P, sequential number) for children and file naming.

Pass to children: feature ID/title, **Channels (App / App + Web)**, **page vs journey**, central requirement, non-goals, §3d–e status (`N / A` or confirmed In|Out), user journey **if journey PRD** (else UI inventory for the page), design/UI source used for generation (for inventory — not Header Figma), **Swagger/OpenAPI URL or path**, UI inventory (especially in Mode B).

If API Spec is empty, obtain a Swagger URL/path before step 4 — the data-mapping child will refuse to invent fields.

### 3. Child — AC & edge cases (§5–6)

Read and follow [children/write-ac-and-edge-cases/SKILL.md](children/write-ac-and-edge-cases/SKILL.md).

Expect an **expert gap-fill**: mine stated/implied/missed behaviors; thorough §6 via negative taxonomy. The child **must** apply §5–6 rules from [reference/section-instructions.md](reference/section-instructions.md) (one interaction → one AC; merge sibling outcomes; abstract feature-level edges). Insert clean §5–6 only. Keep the child’s “Gaps filled” chat notes for the consistency check.

### 4. Child — data mapping (§7)

Read and follow [children/write-data-mapping/SKILL.md](children/write-data-mapping/SKILL.md).

Must load Swagger/OpenAPI when there are dynamic fields; map **dynamic UI fields only** to spec fields (not static CTAs / nav). The child **must** apply §7 rules from [reference/section-instructions.md](reference/section-instructions.md). If no dynamic fields → §7 is `N / A`. Insert clean §7 only. Surface unmatched dynamic UI.

### 5. Stitch

Assemble using [templates/prd-output.md](templates/prd-output.md):

1. Parent §1–4 (§4 body is `N / A` if not a journey PRD)
2. Child §5–6
3. Child §7
4. Strip instruction lines
5. Title: `PRD: <PROJECT>-<TYPE>-<NNN> - Feature name>` (e.g. `PRD: LF-S-001 - Welcome page`)
6. Non-journey / page PRDs: §4 heading present; body **automatically** **`N / A`** (no mermaid)

### 6. Consistency check

| Check | Pass criteria |
|-------|----------------|
| Journey/page ↔ AC | **Journey:** happy-path steps/transitions live in §4 mermaid — do **not** duplicate them in §5; §5 only for what is **not** in the chart (or `N / A`). **Page:** every in-scope page action / visible control (goals + UI inventory) has AC coverage — no journey required. **Do not** add ACs that only restate arrival or filled §3d In entry points |
| §5 vs §6 | **§5 happy path only. §6 all edges and errors.** No AC Then with missing data, “when present”, placeholder if missing, error copy, or “does not continue”. Those are ECs (authoring-rules §2m) |
| Entry vs §5 | No AC whose only Then is “this page/screen/component is shown” from arrival / an In-scope §3d entry |
| Journey/page ↔ edge cases | **Journey:** failure modes at decision points have EC rows (or deferral). **Page:** page-level failure modes for in-scope actions |
| Scope ↔ AC/EC | Out-of-scope entries not required by ACs; non-goals not contradicted |
| UI ↔ data mapping | Every **dynamic** API-bound UI field has a Swagger-backed mapping row (or §7 is `N / A` if none). Static CTAs / nav-only controls are **not** mapped |
| Swagger gaps | Unmatched UI or missing API Spec reported, not ignored |
| Design ↔ PRD (Mode B) | Screens/CTAs appear in journey (**journey**) or page UI inventory + ACs (**page**) |
| §3a–c discipline | Central ≠ goals ≠ non-goals; no repeated In/Out story across a–c; Non-Goals not invented; **Goals = what user accomplishes on screen** (not per-button actions — those in §5); **Non-Goals = on this page/journey out-of-scope only — no other pages** |
| Header Figma | Not filled from generation input |
| Header Confluence | `TBD` until `publish-prd` |
| Ignore-as-absent | Ignored controls absent from Non-Goals, ACs, ECs, mapping |
| Publish readiness | No `TBD` / empty required cells; `N / A` OK; Header includes Channels |
| Channels | Header → Channels is `App` or `App + Web`; ACs/ECs cover that scope; platforms named in §5–6 only when they differ |
| Page vs journey | §4 heading always present; page PRD → automatic `N / A`; journey → happy-path mermaid |
| Source ↔ AIDR (Mode C) | No silent loss of in-scope requirements from the source |
| Prebuilt seed (Mode D) | **Project** only: new file under `project_prds/`; prebuilt in `prebuilt_prds/` untouched; body seeded; user requirements applied |
| Central requirement ↔ all | AC, EC, and mapping support the high-level requirement summary |
| ID hygiene | `AC-01`… / `EC-01`… ; no duplicates |
| Then quality | One **action** → one AC (merge sibling outcomes of the same click / state change). Complex pages split see-ACs: skeleton first, then per-section (authoring-rules §2l). Related ACs/ECs stay together; insert then renumber (authoring-rules §2n). ECs merge same-trigger outcomes; abstract |
| §6 quality | Edges = extremes; errors = resource/API/input failures; normal flow (e.g. logged in) is in §5 |
| Everyday product language | Plain product words; no jargon (e.g. no “actionable control”, “active session”); **user** not **customer** |
| Design designations | No layout/visual/chevron/breakpoint ACs, and no UI control look (checked / empty / dash), unless purposely included. Business rules only. |
| Page / journey scope | §5–6 only this page or this journey; hand-off names destination **with PRD ID** (or `PRD TBD`) only; no other-page behavior; PRD self-contained |

### 7. Save locally

**Prebuilt:**

```
prebuilt_prds/<PROJECT>-<TYPE>-<NNN>-<short-slug>.md
```

Example: `prebuilt_prds/LF-S-001-welcome-page.md`

**Project:**

```
project_prds/<PROJECT>-<TYPE>-<NNN>-<short-slug>.md
```

Example: `project_prds/PNCC-S-001-welcome-page.md`

Stop after local save. Do **not** ask about Confluence. Point the user to `publish-prd` only if they ask how to publish.

### 8. Invite user changes (especially Mode D)

After saving a new PRD (required for **Mode D**; recommended for A/B/C drafts):

1. Name the saved file. For Mode D, name the **prebuilt seed** used (`LF-… — Feature`) and the **new** project ID.
2. Ask the user what to change next.
3. Apply requested edits to the **saved** file (under `prebuilt_prds/` or `project_prds/`) until they say they are done.
4. Still do **not** offer Confluence publish.

## Final checklist

- [ ] [authoring-rules.md](reference/authoring-rules.md) quick checklist passed
- [ ] Matches `prd-output.md` (no instruction blockquotes)
- [ ] Section instructions followed for every section (§1–7)
- [ ] Channels resolved (App / App + Web) before generate
- [ ] §3d–e correct: page → `N / A`; journey → `N / A` when mermaid shows start/end; else from input or asked (not invented)
- [ ] Non-Goals confirmed with user (not invented; no invented flow details)
- [ ] §3b Goals high-level — what the user accomplishes on the screen; one Goal is enough; not per-button actions such as sort, open, delete (§5 owns those)
- [ ] §3b / §3c tied to on-page elements only — do not expand beyond the page
- [ ] Page vs Journey correct (§4 always present; `N / A` if not journey)
- [ ] Parent §1–4 complete (§4 is `N / A` when not a journey PRD)
- [ ] Child §5–6 and §7 present
- [ ] §5 happy path only; §6 all edges and errors — no missing-field / “when present” / error / blocked-action lines in ACs (§2m)
- [ ] §5 / §6 in a human-readable order; new or updated ACs/ECs inserted next to related rows and renumbered (§2n)
- [ ] Everyday product language throughout (§2d): concise; no parenthetical asides
- [ ] No design designations unless purposely included (§2e) — business rules only; no UI control visual effects
- [ ] §5–6 self-contained: this page/journey only (§2f) — no other-page expansion
- [ ] Consistency check passed or gaps reported
- [ ] Generation target resolved (prebuilt default now; project when asked)
- [ ] Saved under `prebuilt_prds/` (prebuilt) or `project_prds/` (project)
- [ ] Mode B: Header `Figma` is empty/TBD or a **separately attached** link — not the same URL/file used only as generation input
- [ ] Header `Confluence` is `TBD` (filled later by `publish-prd`)
- [ ] Mode C: §1 Change Log left empty (publish-prd and design-prd-consistency own Change Log rows)
- [ ] Mode D (project only): seeded from `prebuilt_prds/`; new file under `project_prds/`; prebuilt untouched; invited further changes
- [ ] Did **not** offer or run Confluence publish (that is `publish-prd`)

## Child skills (internal)

Loaded by this parent (and by `design-prd-consistency` when refreshing §5–6) — **not** typed by users.

| Path | Responsibility |
|------|----------------|
| [children/write-ac-and-edge-cases](children/write-ac-and-edge-cases/SKILL.md) | §5 + §6 |
| [children/write-data-mapping](children/write-data-mapping/SKILL.md) | §7 |

If the user wants only ACs, still run under **`generate-prd`** and limit work to those sections. If they want **YAML + §7** from an existing PRD plus operation YAML, that is **`api-mapping`** — do **not** run `api-mapping` unless they typed it.

## Additional resources

- PM map: [README.md](README.md)
- **Authoring rules (mandatory):** [reference/authoring-rules.md](reference/authoring-rules.md)
- Entry modes: [reference/entry-modes.md](reference/entry-modes.md)
- Section instructions (AIDR template rules): [reference/section-instructions.md](reference/section-instructions.md)
- Output format: [templates/prd-output.md](templates/prd-output.md)
- Parent writing guide (§1–4): [templates/prd-template.md](templates/prd-template.md)
- Shared domain (telecom): [../shared/telecom-domain.md](../shared/telecom-domain.md)
- Invocation (parents only): [../shared/invocation.md](../shared/invocation.md)
- Publish to Confluence: sibling skill `publish-prd`
- Update existing PRD from design: sibling skill `design-prd-consistency`
- Examples: [examples/](examples/)
