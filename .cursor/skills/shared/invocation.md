# How to invoke skills

## Parent skills only (user-facing)

Users start the message with the **parent skill name**, then the request:

```text
generate-prd …
design-prd-consistency …
publish-prd …
review-prd …
relate-prds …
api-mapping …
```

Examples:

- `generate-prd project LF type S — from this screenshot — feature is …`
- `generate-prd …` (default target **prebuilt** → `prebuilt_prds/`; later also **project** → `project_prds/`. If project prefix missing on prebuilt work: default `LF`; if type J/S/P unclear: agent asks. For **project** PRDs, agent may seed from a matching `LF-*` prebuilt)
- `design-prd-consistency` (agent asks which journey / screen, and the Figma if Header Figma is missing; writes or corrects Header Figma to the journey canvas or this screen’s section)
- `design-prd-consistency LF-S-017` (compare that PRD to design; ask Figma if the link does not exist; write or correct Header Figma; accept/reject each gap, then §1 Change Log)
- `publish-prd` (no path — walks every `prebuilt_prds/` AIDR PRD vs Confluence, one by one; asks `review-prd` once; No skips all reviews and fills Header Figma / API Spec `TBD` with `N / A`)
- `publish-prd prebuilt_prds/LF-S-001-welcome-page.md` (same review ask; then that file only)
- `review-prd prebuilt_prds/LF-S-001-welcome-page.md` (includes cross-PRD conflict check)
- `relate-prds for everything under prebuilt_prds/` (and `project_prds/` when in use)
- `api-mapping` with a Swagger UI link and **get offers** (operation YAML only, e.g. `data_mappings/catalog-get-offers.yaml`)
- `api-mapping prebuilt_prds/LF-S-004-otp-verification.md data_mappings/catalog-get-offers.yaml` (compare PRD to operation YAML; if they match, mapping YAML + PRD §7 + Header API Spec link to that YAML; if not, raise and write nothing)

## Child skills (internal only)

Child skills under `generate-prd/children/` and `publish-prd/children/` are **not** user entry points.

- Do **not** tell users to invoke `write-ac-and-edge-cases`, `write-data-mapping`, `compare-confluence`, or `commit-and-push` by name
- The parent `generate-prd` loads and runs children by reading their nested `SKILL.md`
- The parent `publish-prd` loads `compare-confluence` and `commit-and-push` the same way
- If a user asks only for ACs, still use **`generate-prd`** and limit the pipeline to that section
- If a user asks for **YAML** data mapping (and filling §7) on an existing PRD plus operation YAML, use **`api-mapping`**

Child `SKILL.md` files use `disable-model-invocation: true` so they are not offered as standalone skills.

## Publish vs generate vs design consistency

- `generate-prd` — create/update local files under `prebuilt_prds/` (prebuilt) or `project_prds/` (project); **do not ask to publish** afterward; leaves §1 Change Log empty
- `design-prd-consistency` — update an existing PRD from design (write or correct Header Figma; list gaps, accept/reject one by one, apply with generate-prd rules, then one §1 `Updated from design` row); **do not ask to publish** afterward
- `publish-prd` — with **no path**, walk **every** AIDR PRD under `prebuilt_prds/` against Confluence, one by one. Named files only those files. **Only when the user asks.** Asks **once** whether to run `review-prd` (No → skip review for the whole run; Header Figma / API Spec `TBD` → `N / A` without asking again). Compares to Confluence; writes local only when still different; always fills Header → Confluence with this PRD’s page URL; does **not** fill Header → Jira from the AIDR board (`—` unless the user gave a ticket); then commits those files and pushes if origin exists. Does not use `confluence-mapping.json`. Does not publish from git.
- `api-mapping` — from a Swagger link, write operation YAML; from a PRD + operation YAML, compare then fill mapping YAML, §7, and Header API Spec (YAML file link) only if they match; **only when the user asks**
