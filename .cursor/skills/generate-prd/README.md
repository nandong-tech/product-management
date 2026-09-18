# Generate PRD — skill pack

**Main entry:** start with **`generate-prd`**.

See [../shared/invocation.md](../shared/invocation.md). **Domain:** [`../shared/telecom-domain.md`](../shared/telecom-domain.md).

```
.cursor/skills/
├── shared/
├── generate-prd/          ← create local PRDs (no Confluence)
│   ├── SKILL.md
│   ├── reference/
│   │   ├── authoring-rules.md      ← mandatory cross-cutting rules
│   │   ├── section-instructions.md ← per-section AIDR rules
│   │   └── entry-modes.md
│   ├── children/                   ← INTERNAL (§5–6, §7)
│   └── templates/
├── design-prd-consistency/            ← existing PRD vs design; accept/reject; §1 row
├── publish-prd/           ← publish to Confluence when asked
├── review-prd/
├── relate-prds/
└── api-mapping/           ← operation YAML from Swagger; mapping YAML + §7 from PRD + YAML if they match
```

## Skill is the product; catalogs live in `prebuilt_prds/` (+ later `project_prds/`)

When giving feedback on how PRDs should be written, **update the skill files** (`authoring-rules.md`, `section-instructions.md`, parent/child `SKILL.md`). Do not treat editing a single test PRD as finishing the skill change.

**Targets:** **prebuilt** (default now → `prebuilt_prds/`) and **project** (later → `project_prds/`, often seeded from a prebuilt).

Re-run `generate-prd` against a test case (e.g. Welcome page) only when you want to **verify** the skill.

## Who does what

| Role | Skill | Owns |
|------|-------|------|
| Parent | `generate-prd` | Draft §1–4, stitch, save to `prebuilt_prds/` (prebuilt) or `project_prds/` (project) |
| Internal children | under `generate-prd/children/` | §5–6 and §7 |
| Parent | `design-prd-consistency` | Existing PRD vs Figma/design; write or correct Header Figma; accept/reject one by one; apply with these authoring rules; one §1 `Updated from design` row |
| Parent | `publish-prd` | No path: every `prebuilt_prds/` AIDR PRD vs Confluence, one by one. Named files only those. Asks `review-prd` once (No → skip all reviews; Header Figma / API Spec TBD → N / A). Writes local only if still different; fills Header → Confluence; does not fill Header → Jira; then commits and pushes. Product TBD still blocks that PRD (`N / A` OK; Header Confluence TBD filled here) |

## Mandatory rules (start here)

1. [reference/authoring-rules.md](reference/authoring-rules.md) — Figma separate, §3a–c split, ask Non-Goals (never invent), §3d–e `N / A` for page PRDs and mermaid-covered journeys, §4 `N / A`, ignore-as-absent, brandless, **everyday product language** (concise; no parenthetical asides), **§5 happy path only / §6 all edges and errors (§2m)**, **Shopping Cart decrease at quantity 1 confirms delete**, **no design designations by default** (business rules only; no UI control visual effects), children constraints
2. [reference/section-instructions.md](reference/section-instructions.md) — Title + §1–7 AIDR section rules

**Ask before generating when unclear:** Generation target — **prebuilt** (default now) vs **project**; project prefix (prebuilt catalog default `LF`; project prefix required for project target); PRD type **J / S / P** (infer or ask); Channels — **`LF-*` through Sep 2026 = App + Web (no ask)**; otherwise App vs App + Web; **CTA labels** that conflict with authoring-rules §2f (**Next** for progress-only; action-specific for a named action) or sibling screens — ask before writing §5–6, do not silently rewrite. **Do not ask entry/exit for page PRDs** (§3d–e = `N / A`). **Journey:** §3d–e = `N / A` when mermaid shows start/end. **Project + matching prebuilt:** seed new file under `project_prds/` from `prebuilt_prds/` (Mode D). **Never invent:** §3c Non-Goals details; entry/exit when those tables are required. **Page PRD:** next page after the primary forward CTA is always out of scope for destination content (name in AC hand-off only — **not** in Non-Goals). **§3c Non-Goals:** only items **on this page/journey** that are out of scope — **never other pages**. **§3b Goals:** high-level on-page capabilities only — not page interactions (§5). **ID format:** `<PROJECT>-<TYPE>-<NNN>`.

## How to ask

| Goal | Start with |
|------|------------|
| Create prebuilt (current) / project (later) / convert | `generate-prd …` |
| Update an existing PRD from design | `design-prd-consistency …` |
| Publish to Confluence | `publish-prd …` |
| Review | `review-prd …` |
| Relate | `relate-prds …` |
| Map PRD fields to an operation YAML | `api-mapping …` |

`generate-prd` does **not** ask to publish after saving.
