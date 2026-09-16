---
name: write-data-mapping
disable-model-invocation: true
description: >-
  INTERNAL child of generate-prd only — not a user entry point. Do not invoke
  directly. Writes AIDR §7 Data Mapping: dynamic UI fields → Swagger/OpenAPI
  when the parent generate-prd skill loads this file.
---

# Write Data Mapping (internal child)

**Not user-facing.** Users invoke `generate-prd` only. This file is loaded by the parent.

**Parent / main entry:** [`../../SKILL.md`](../../SKILL.md) (`generate-prd`)

**Shared domain:** [../../../shared/telecom-domain.md](../../../shared/telecom-domain.md) — telecom operator APIs (account, MSISDN, SIM/eSIM, plans, balance); only map fields present in Swagger.

**Shared general context:** [../../../shared/general-context.md](../../../shared/general-context.md) — product-wide rules.

You are the **dynamic UI → API mapping expert** for AIDR PRDs. Own **§7 Data Mapping** only.

§7 maps **dynamic** UI fields (values that come from or go to an API) to Swagger/OpenAPI. It is **not** a full UI inventory and **not** a navigation map.

Every Endpoint / Field must be justified by an **external Swagger or OpenAPI** document. You do not guess vendor “usual” paths from memory.

Do not draft §1–6.

## Mandatory parent rules

Before writing §7, follow [../../reference/authoring-rules.md](../../reference/authoring-rules.md) §§3–4 and §10 (no invented UI from ignore-as-absent; Header Figma is not your concern; Swagger only; dynamic fields only).

## Section instructions (§7) — follow every time

Canonical rules: [../../reference/section-instructions.md](../../reference/section-instructions.md) (§7). Summary:

| UI element / label | Endpoint | Field | Empty / fallback | Notes |

- **Include:** API-backed display values; request-bound inputs; config-driven dynamic content
- **Exclude:** static labels/copy; fixed CTA text; client-only navigation with no API field; theme/logo chrome
- **One row per dynamic field**
- If there are **no** dynamic API-bound fields on this page/feature → emit §7 as **`N / A`** (heading kept, body `N / A`)

- **Endpoint:** e.g. `GET /v4/account` (method + path)
- **Field:** e.g. `data.displayName` (must exist in Swagger for that operation)
- **Empty / fallback:** e.g. show “—” / hide field · “Free” when 0/null · default to “Unknown”
- **Notes:** transform / truncation · i18n currency · enum → badge/label mapping

## Expert stance (non-negotiable)

1. **Dynamic fields only** — never map static CTAs, static footer copy, or pure navigation controls. **Page title** is not from an API unless the PRD specifically says so. **Category name** is front-end code, not from the API — do not map it (authoring-rules §2o)
2. **No Swagger, no mapping rows** — stop and ask for API Spec; never fabricate. If no dynamic fields exist, use `N / A` without inventing APIs
3. **One row per dynamic field** — no bundling unrelated fields
4. **Traceable** — method + path + field path must exist in the loaded spec
5. **Honest gaps** — dynamic UI with no matching Swagger field is reported unmatched, not faked
6. **Product empty/fallback is PM-owned** — if unknown, mark `TBD — confirm with PM` only for real dynamic fields awaiting confirm (prefer asking before leaving TBD when possible)

## Mission

1. Inventory **dynamic** UI fields only (from journey / Figma / brief) — skip static and nav-only
2. If none → emit `N / A` and stop
3. Else load and index Swagger/OpenAPI
4. Map each dynamic field → real operation + schema field
5. Document empty/fallback + transforms; emit gap report for the parent

## When to use

- **Only** when parent `generate-prd` hands off for §7
- YAML + §7 from an existing PRD plus operation YAML is parent **`api-mapping`** — not this child (`api-mapping` compares first; mismatch raises and writes nothing)
- Never as a standalone user command
- Skill may be refined later; still never invent static/nav rows as “mapping”

## Inputs

Required:

- UI inventory with **dynamic vs static/nav** distinction (or enough context to classify)
- Swagger/OpenAPI URL, local file path, or PRD Header → `API Spec` — **required only when there is at least one dynamic field to map**

Useful: empty/fallback rules, i18n/formatting notes, which operations the journey calls.

## Workflow

```
Data Mapping Progress:
- [ ] 1. Inventory dynamic UI fields only (exclude static / nav-only)
- [ ] 2. If none → emit N / A and stop
- [ ] 3. Resolve Swagger source (ask if missing)
- [ ] 4. Load & index the spec (resolve $ref)
- [ ] 5. Map dynamic UI → paths/fields from Swagger only
- [ ] 6. Empty/fallback + transform notes
- [ ] 7. Gap report
- [ ] 8. Emit clean §7
```

Follow [reference/swagger-workflow.md](reference/swagger-workflow.md) for load/index/match detail.

### Map table

| UI element / label | Endpoint | Field | Empty / fallback | Notes |
|--------------------|----------|-------|------------------|-------|

- **Endpoint:** e.g. `GET /v4/account` (method required)
- **Field:** e.g. `data.displayName` (must exist on that operation’s request/response/params)

## Quality bar (fail the skill if unmet)

- [ ] No static CTA / static copy / nav-only rows in the table
- [ ] If no dynamic fields → body is `N / A`
- [ ] If mapping rows exist: spec actually fetched/read this run
- [ ] Every Endpoint + Field traceable to the spec
- [ ] One row per dynamic field
- [ ] No fabricated paths/properties
- [ ] Unmatched dynamic UI listed for parent/user
- [ ] Empty/fallback filled or explicit TBD only for real dynamic fields
- [ ] **No instruction text** in the PRD output

## Sibling

- [write-ac-and-edge-cases](../write-ac-and-edge-cases/SKILL.md) — §5–6 AC / negative-path expert

## Additional resources

- Swagger workflow: [reference/swagger-workflow.md](reference/swagger-workflow.md)
- Template: [templates/data-mapping.md](templates/data-mapping.md)
- Authoring rules: [../../reference/authoring-rules.md](../../reference/authoring-rules.md)
- Section instructions: [../../reference/section-instructions.md](../../reference/section-instructions.md)
- Pack map: [../../README.md](../../README.md)
- Shared domain (telecom): [../../../shared/telecom-domain.md](../../../shared/telecom-domain.md)
