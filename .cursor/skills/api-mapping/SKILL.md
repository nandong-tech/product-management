---
name: api-mapping
description: >-
  Parent skill (user entry). Type "api-mapping" at the start of the message. From a
  Swagger/OpenAPI link, generates YAML for a named operation (e.g. get
  offers). From an existing AIDR PRD plus that operation YAML, compares them:
  if they match, writes mapping YAML, fills PRD §7, and attaches that YAML in
  Header API Spec; if they do not, stops and raises the mismatch. Does not
  generate PRDs — use generate-prd. Does not publish — use publish-prd.
---

# API mapping (parent)

**How to invoke:** User types `api-mapping` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md)

**Shared general context:** [../shared/general-context.md](../shared/general-context.md)

Two modes. Pick one from the message:

| Mode | When | Writes |
|------|------|--------|
| **From spec** | Swagger UI or OpenAPI URL **and** a named API (e.g. get offers) | Operation YAML only |
| **From PRD** | Existing PRD path **and** operation YAML | Mapping YAML + PRD §7 + Header **API Spec** (YAML file) **only if they match** |

Never invent paths or fields. Never guess LotusFlare operations from memory.

## Mode 1 — From spec (do this first when a Swagger link is given)

Example: user attaches `https://swagger.mgmt.lotusflare.info/?urls.primaryName=%5Blua%5D%20catalog%20%E2%80%94%20CatalogClient#/` and asks for **get offers** YAML.

```
From-spec progress:
- [ ] 1. Resolve the OpenAPI document URL (see reference/swagger-ui.md)
- [ ] 2. Fetch and parse the spec this run
- [ ] 3. Match the named API to one operation (path + method + operationId)
- [ ] 4. If several matches, list them and ask — do not pick silently
- [ ] 5. Write operation YAML under data_mappings/
- [ ] 6. Do not change any PRD
```

If the user says **GET** offers but the spec operation is **POST**, use the spec method and say so. Do not invent a GET.

YAML shape: [templates/operation.yaml](templates/operation.yaml). Schema: [reference/yaml-schema.md](reference/yaml-schema.md) (`kind: operation`). Swagger UI URL resolution: [reference/swagger-ui.md](reference/swagger-ui.md).

**Filename:** `data_mappings/<service>-<operation-slug>.yaml`  
Example: Catalog Client `get_offers` → `data_mappings/catalog-get-offers.yaml`

Overwrite on re-run of the same operation.

## Mode 2 — From PRD + operation YAML

Maps **dynamic** UI fields on an existing PRD to a **provided** operation YAML. Compare first. Write **mapping YAML**, **PRD §7**, and attach that YAML in Header **API Spec** only when they match (it is the correct API). If they do not match, **stop** and raise — do not map a subset and do **not** attach the YAML.

Does **not** draft §1–6. Does **not** map static copy, fixed CTAs, or nav-only controls.

| Artifact | Location |
|----------|----------|
| YAML (input) | `data_mappings/<service>-<operation-slug>.yaml` (`kind: operation`) — user provides or names the file |
| YAML (output) | `data_mappings/<PRD-filename-without-md>.yaml` (`kind: mapping`) |
| PRD §7 | Source PRD in `prebuilt_prds/` or `project_prds/` |
| Header API Spec | Markdown link to the operation YAML — **only on match** |

Example: `api-mapping prebuilt_prds/LF-S-004-otp-verification.md data_mappings/catalog-get-offers.yaml`

If the PRD or the operation YAML is missing, ask. Do not fetch a spec and map as a stand-in for the YAML.

Match rules: [reference/prd-yaml-match.md](reference/prd-yaml-match.md).

### Journey vs page

| PRD type | What to do |
|----------|------------|
| **Page (S / P)** | Inventory dynamic fields on **this** screen. Compare to the YAML. Match → write YAML + §7 + attach the YAML in Header API Spec. Mismatch → raise; write nothing (do not attach). |
| **Journey (J)** | Field mapping lives on **page** PRDs. Write YAML with `kind: mapping` and `mappings: []`, keep §7 **`N / A`**, tell the user which child screens to run `api-mapping` on. |

```
From-PRD progress:
- [ ] 1. Resolve PRD path and operation YAML path(s) (ask if either is missing)
- [ ] 2. Read PRD + shared context
- [ ] 3. Inventory dynamic UI fields only (page title only if the PRD specifically says it comes from an API; category name is front-end, skip it)
- [ ] 4. If none → mappings: [] and §7 N / A; stop
- [ ] 5. Read provided operation YAML (kind: operation)
- [ ] 6. Compare PRD dynamic fields vs YAML (reference/prd-yaml-match.md)
- [ ] 7. If mismatch → stop; tell the user what is wrong; do not write mapping YAML, §7, or Header API Spec
- [ ] 8. If match → write mapping YAML
- [ ] 9. Write the same rows into PRD §7
- [ ] 10. Attach the operation YAML file(s) in Header API Spec (markdown link; not spec_ui / spec_url)
```

**Header API Spec — only when the YAML is the correct API (match):** markdown link to each operation YAML used, relative to the PRD. Overwrite Swagger URLs or `N / A`.

Example from `prebuilt_prds/` or `project_prds/`:

`[catalog-get-offers.yaml](../data_mappings/catalog-get-offers.yaml)`

Several YAMLs: one link each, separated by `<br>`. Mapping YAML `api_spec` uses the same repo-relative path(s).

Do **not** change Header API Spec on mismatch, on empty mappings, or on journey PRDs.

§7 table rules: [../generate-prd/reference/section-instructions.md](../generate-prd/reference/section-instructions.md) (§7).

Each `mappings[]` item = one §7 row (`ui`, `endpoint`, `field`, `empty_fallback`, `notes`). Empty `mappings` ↔ §7 **`N / A`**.

Overwrite mapping YAML and §7 on re-run **only after a match**.

## Quality bar

**Both modes**

- [ ] Spec or operation YAML read this run
- [ ] Every path, method, and field exists in that spec or YAML
- [ ] Did **not** offer `publish-prd`

**From spec**

- [ ] YAML `kind: operation`
- [ ] One file per operation; filename matches the slug rule
- [ ] Method/path/operationId copied from the spec

**From PRD**

- [ ] Compared PRD dynamic fields to the provided operation YAML before writing
- [ ] On mismatch: raised to the user; did **not** write mapping YAML, §7, or Header API Spec
- [ ] On match: YAML `kind: mapping`; PRD §7 matches the YAML; Header **API Spec** links to the operation YAML file(s)
- [ ] No static CTA / copy / nav-only rows
- [ ] Did **not** invent unmatched fields

## Do not

- Run after `generate-prd` unless the user typed `api-mapping`
- Map journey PRDs as if they owned screen fields
- Finish mapping when the PRD and operation YAML do not match
- Invent Empty / fallback product rules; ask or TBD
- Attach an operation YAML in Header **API Spec** when it is not the correct API (mismatch)
- Put a Swagger UI / OpenAPI URL in Header **API Spec** — that field is the operation YAML file
- Write Confluence URLs into YAML, or extra Header Links beyond shared context and page template (those two Header Links are Confluence URLs owned by generate-prd / publish-prd)
- Dump the full Swagger file into YAML — only the matched operation, top-level request/response fields, and `$ref` schema names
