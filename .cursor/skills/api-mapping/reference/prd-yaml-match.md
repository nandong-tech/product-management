# PRD vs operation YAML — match gate

Used by **Mode 2**. Compare the page PRD to the **provided** `kind: operation` YAML before writing any mapping.

Do **not** invent fields. Do **not** finish mapping on a partial match.

## Inputs

| Input | Required |
|-------|----------|
| Page PRD | yes |
| Operation YAML (`kind: operation`) | yes — path in the message, attached file, or `data_mappings/<service>-<operation-slug>.yaml` the user names |

If either is missing, ask. Do not fetch a spec and map as a substitute for the YAML.

## Inventory (PRD side)

List **dynamic** UI fields only (API-backed display, request-bound inputs, config-driven content). Skip static copy, fixed CTAs, nav-only controls.

**Page title:** not from an API unless the PRD **specifically** says the page title comes from an API. Skip it in this inventory unless that is stated.

**Category name:** front-end code, not from the API. Skip page title that is a category name, **Filter by category** option labels, and other category-name labels. See [generate-prd authoring-rules](../../generate-prd/reference/authoring-rules.md) §2o.

If that list is empty → not a mismatch. Write `mappings: []` and §7 `N / A`.

## Compare (YAML side)

For each dynamic UI field, find a counterpart in the YAML:

- `parameters[]` (`name`, `in`)
- `request.fields[]` (`name`)
- `response_fields[]` (`name`)

Match by (in order): exact name, label/AC wording vs field `name`, then `description`.

**Unused YAML fields are OK.** The API may expose more than this screen uses.

**Nested UI:** a dotted child path is allowed only when the parent object/array is in the YAML **and** the child exists on the schema named there. If the YAML only names a `$ref` (e.g. `schema: GetOffersResponse` / field type `object`), load `spec_url` from the YAML **this run** and confirm the child on that schema. If the child is not in the YAML **and** not on that schema → **mismatch**. Do not guess nested names.

Several operation YAMLs: a field may match any one of them. Record which file.

## Verdict

| Result | When | What to do |
|--------|------|------------|
| **Match** | Every dynamic UI field has exactly one justified YAML (or spec-child) field — this YAML is the correct API | Write mapping YAML + PRD §7 + attach that YAML in Header **API Spec** |
| **Mismatch** | Any dynamic UI field has no counterpart; YAML is not `kind: operation`; YAML is the wrong operation for this screen; or two YAML fields fit and you cannot tell | **Stop.** Do not write mapping YAML. Do not change §7. Do not attach the YAML in Header API Spec. Tell the user what is wrong |

Wrong operation: most dynamic fields on the screen cannot be justified from this YAML (e.g. OTP PRD + `catalog-get-offers.yaml`).

## Mismatch message (required)

Raise in everyday language. Include:

1. PRD path and YAML path
2. Each unmatched UI field (or why the YAML is the wrong API)
3. Ambiguous pairs, if any (UI field → candidate YAML fields) — ask; do not pick
4. That mapping was **not** written and Header API Spec was **not** changed

Do not write “not shown” rows. Do not map a subset and call it done.

## After a match

Same rows in mapping YAML and §7. `endpoint` = `METHOD /path` from the YAML. `field` = dotted path that exists on that operation.

Because this YAML is the correct API, set PRD Header **API Spec** to a markdown link to that file (relative to the PRD), e.g. `[catalog-get-offers.yaml](../data_mappings/catalog-get-offers.yaml)`. Several files: one link each, `<br>` between them. Mapping YAML `api_spec` = the same repo-relative path(s). Do not put `spec_ui` or `spec_url` in Header API Spec.
