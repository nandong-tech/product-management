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
- `publish-prd prebuilt_prds/LF-S-001-welcome-page.md` (agent asks which Confluence space; project files under `project_prds/` also supported)
- `review-prd prebuilt_prds/LF-S-001-welcome-page.md` (includes cross-PRD conflict check)
- `relate-prds for everything under prebuilt_prds/` (and `project_prds/` when in use)
- `api-mapping` with a Swagger UI link and **get offers** (operation YAML only, e.g. `data_mappings/catalog-get-offers.yaml`)
- `api-mapping prebuilt_prds/LF-S-004-otp-verification.md data_mappings/catalog-get-offers.yaml` (compare PRD to operation YAML; if they match, mapping YAML + PRD §7 + Header API Spec link to that YAML; if not, raise and write nothing)

## Child skills (internal only)

Child skills under `generate-prd/children/` are **not** user entry points.

- Do **not** tell users to invoke `write-ac-and-edge-cases` or `write-data-mapping` by name
- The parent `generate-prd` loads and runs children by reading their nested `SKILL.md`
- If a user asks only for ACs, still use **`generate-prd`** and limit the pipeline to that section
- If a user asks for **YAML** data mapping (and filling §7) on an existing PRD plus operation YAML, use **`api-mapping`**

Child `SKILL.md` files use `disable-model-invocation: true` so they are not offered as standalone skills.

## Publish vs generate vs design consistency

- `generate-prd` — create/update local files under `prebuilt_prds/` (prebuilt) or `project_prds/` (project); **do not ask to publish** afterward; leaves §1 Change Log empty
- `design-prd-consistency` — update an existing PRD from design (write or correct Header Figma; list gaps, accept/reject one by one, apply with generate-prd rules, then one §1 `Updated from design` row); **do not ask to publish** afterward
- `publish-prd` — publish an existing `prebuilt_prds/….md` or `project_prds/….md` to Confluence **only when the user asks**
- `api-mapping` — from a Swagger link, write operation YAML; from a PRD + operation YAML, compare then fill mapping YAML, §7, and Header API Spec (YAML file link) only if they match; **only when the user asks**
