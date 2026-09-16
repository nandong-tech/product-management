# Entry modes (agent)

## Mode A — From brief

Use when the user provides problem statements, goals, tickets, or meeting notes without a full prior PRD or design source of truth.

**First:** resolve generation target (**prebuilt** default now, or **project**). Run the Similar / prebuilt gate for that target. Project + chosen seed → Mode D.

Ask only for missing critical fields: **project prefix** (default `LF`), **PRD type** J/S/P (infer or ask), next sequential number, feature title, central requirement, goals/non-goals, owner.

## Mode B — From design

Use when the source of truth is UI: Figma link, design file, or screenshots.

**After intent is clear** (including after thin-input answers): resolve generation target (**prebuilt** default), then run the Similar / prebuilt gate. Project + chosen seed → Mode D.

### Thin-input gate (one screen / insufficient context)

If the user shares **only one screenshot** or **only one Figma frame** without enough accompanying product context:

1. **Do not** draft the full PRD yet
2. Ask them to briefly:
   - Describe the feature (what problem it solves / what the user can do)
   - Define **scope** (in this PRD vs out of scope / later flows)
   - List **Non-Goals** if not clear from the brief — only items **on this page/journey** that are out of scope; never other pages; do not invent
   - Clarify ambiguous controls (icon-only buttons, “See All”, etc.) when needed
   - Do **not** require entry/exit lists for page PRDs. For journey PRDs, only ask if the mermaid will not show start/end
3. Proceed only after they answer, or if they explicitly allow assumptions

A single marketing/welcome/entry screen is almost always “thin input” unless they already provided a brief or multi-screen flow.

### Figma URL parsing

- `figma.com/design/:fileKey/:fileName?node-id=1-2` → fileKey + nodeId (`1:2`)
- Prefer the specific frame/flow node the user points to; otherwise start from the page they name

### Extract for §1–4

| Design signal | PRD target |
|---------------|------------|
| Frame / flow order | §4 User Journey mermaid (**journey PRD only**) |
| Single screen / landing | **Page PRD** — **automatically** set §4 to `N / A`; UI inventory → children |
| Screen titles, CTAs, fields | UI inventory → children |
| Login gates, branches | Journey diamonds (**journey only**) |
| Error / empty components | Hints for §6 (child still owns authoring) |
| File URL / export path | Use for UI inventory / journey only — **do not** put generation input into Header → Figma (attach separately or leave TBD) |
| CTAs / navigation targets | Hand-off destinations in **ACs** with PRD IDs; §3d–e only when required (page → `N / A`; journey → `N / A` if mermaid shows start/end) |

**Page vs journey:** One screen (e.g. Welcome landing) → **page PRD** unless the user says multi-step journey. Ask once if unclear. **If page PRD → automatically put `N / A` under §4** (do not invent a journey mermaid).

### Brandless / ignore-as-absent

**Brandless (writing style):** Do not turn logo/brand artwork or marketing visuals from the design into product requirements unless the user asks. Name the feature functionally (e.g. Welcome page), not by the brand on the mock. **Do not** invent a Non-Goal for brand/marketing — Non-Goals come only from user input (brief/design/confirmation).

**Ignore-as-absent:** If the user says to ignore a control on the design (e.g. an unclear eye / utility icon), pretend it is not on the screenshot. Omit it entirely from Non-Goals, journey, inventory, ACs, and ECs — do **not** list it as out of scope. See [authoring-rules.md](authoring-rules.md).

### Confirm with user when unclear

- **Project prefix** (ask at start; default `LF`); **PRD type** J / S / P (infer or ask); next `<NNN>`
- Feature number / naming
- **Channels** — ask before generating if unclear: **App only** or **App + Web**; record in Header
- **Page vs journey** — ask if unclear; if **page PRD**, automatically set §4 to `N / A` and §3d–e to `N / A`
- **Entry / exit** — page PRD: always `N / A` (do not ask). Journey: `N / A` when mermaid shows start/end; otherwise from brief/design or ask (do not invent)
- **Non-Goals** — always ask / use only what the user stated; items **on this page/journey** that are out of scope; **never** list other pages or destination flows
- Central requirement one-liner if multiple flows are in the file
- Unclear icon-only or unlabeled controls

## Mode C — Convert existing PRD

Use when reformatting Confluence, Google Doc, Notion, PDF, Markdown, or an older template into AIDR.

### Source → AIDR mapping

| Source-ish content | AIDR section |
|--------------------|--------------|
| Title / feature name / ID | Title + Header → Feature |
| Status, owners, dates, links | §2 Header |
| Revision history | Do **not** copy into §1 by default; §1 stays empty until `publish-prd` |
| Problem / overview / one-liner | §3a Central requirement |
| Goals / success / non-goals | §3b–c |
| Entry, channels, surfaces | §3d–e when required (`N / A` for page / mermaid-covered journey); Channels in Header |
| Flow, steps, screens | §4 User Journey (`N / A` if page / non-journey PRD) |
| Acceptance / scenarios / Gherkin | §5 (normalize; child gap-fills) |
| Errors, edge cases, negatives | §6 (child gap-fills) |
| Field list, API table, schema | §7 (child re-validates via Swagger) |
| Misc risks / open questions | Fold into Header Links, Non-goals, or chat gaps — do not invent new AIDR sections |

### Conversion rules

1. **Do not silently drop** in-scope requirements from the source
2. **Do normalize** wording into AIDR tables and one-observable Then
3. **Do re-run** specialist children when §5–7 are missing, narrative-only, or not Swagger-backed
4. If the source already has strong ACs, pass them to the AC child as input to refine/gap-fill — not as untouchable final text if they violate AIDR rules
5. Keep §1 Change Log empty (rows only via `publish-prd` or `design-prd-consistency`)

### Ambiguity

If source conflicts with itself, keep both interpretations out of the PRD body; ask the user or list as open questions in chat (not as instruction blockquotes in the file). Prefer a short “Open questions” bullet list only if the AIDR template gains that later — for now, report in chat and Header Links note if needed.

## Mode D — Generate project PRD from prebuilt content

**Project target only.** Use when a catalog PRD under `prebuilt_prds/` (e.g. **`LF-S-001`**) matches a **project** generation request, or when the user names that prebuilt to seed from.

**Not for prebuilt authoring:** When building the catalog itself, update or add files under `prebuilt_prds/` via Modes A/B/C — do not Mode D.

**Not the same as Mode C:** Mode C reformats an external/old source into AIDR. Mode D creates a **new project PRD** under `project_prds/`, seeded from a prebuilt, using the **user’s project prefix and requirements**.

### Gates

**Prebuilt target:** if a similar catalog file exists → update it or create next catalog ID under `prebuilt_prds/`.

**Project target:** before drafting from scratch:

1. Infer intent; search `prebuilt_prds/*.md` (skip reviews / pending-prd-links).
2. If match: ask **generate from this prebuilt** vs **draft from scratch**.
3. If none: Mode A/B into `project_prds/`.

### Generation rules (project + seed)

1. New ID: user’s `<PROJECT>-<TYPE>-<NNN>` under **`project_prds/`**. Do not reuse the prebuilt ID. Do not overwrite the prebuilt.
2. Seed content from the prebuilt; apply user’s requirements on top.
3. §1 Change Log empty; invite edits on the new project file.
