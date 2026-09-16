# YAML schema

Files live under `data_mappings/`. Two kinds. Set `kind` on every file.

## `kind: operation` (from Swagger)

Filename: `<service>-<operation-slug>.yaml` (e.g. `catalog-get-offers.yaml`).

| Key | Required | Meaning |
|-----|----------|---------|
| `kind` | yes | `operation` |
| `name` | yes | Short name, e.g. `get_offers` |
| `spec_ui` | no | Swagger UI URL the user gave |
| `spec_url` | yes | OpenAPI file actually fetched |
| `spec_title` | yes | Spec `info.title` |
| `generated` | yes | `YYYY-MM-DD` |
| `operation_id` | yes | From spec |
| `method` | yes | `GET` / `POST` / … as in the spec |
| `path` | yes | Path string from spec |
| `summary` | no | Spec summary, one paragraph |
| `parameters` | no | Header/query/path params (`name`, `in`, `required`) |
| `request` | no | Body: `required`, `schema`, `fields[]` |
| `responses` | yes | List of `{status, description, schema}` for documented statuses |
| `response_fields` | no | Top-level success body fields (`name`, `type`, `description`) |

Each `request.fields[]` / `response_fields[]` item: `name`, `type`, `description` (one line). Add `deprecated: true` only when the spec says so. Omit unused keys.

Do **not** expand nested objects past one level. Name the `$ref` schema instead of inlining the whole tree.

Do **not** copy error HTTP handling into PRD §6 from this file.

## `kind: mapping` (from PRD + operation YAML)

Written only after Mode 2 **match**. Filename = PRD markdown filename with `.yaml`.

| Key | Required | Meaning |
|-----|----------|---------|
| `kind` | yes | `mapping` |
| `prd_id` | yes | e.g. `LF-S-004` |
| `prd_path` | yes | Repo-relative PRD path |
| `feature` | yes | Header Feature |
| `channels` | yes | `App` or `App + Web` |
| `api_spec` | yes | Repo-relative operation YAML path(s) used (same file attached in Header API Spec), or `N / A` when `mappings` is empty |
| `generated` | yes | `YYYY-MM-DD` |
| `mappings` | yes | List; `[]` when no dynamic fields |

Each `mappings[]` item:

| Key | Required | Meaning |
|-----|----------|---------|
| `ui` | yes | UI element / label |
| `endpoint` | yes | `METHOD /path` |
| `field` | yes | Dotted JSON path |
| `empty_fallback` | yes | Empty/null UI rule, or `TBD — confirm with PM` |
| `notes` | no | Transform / format / enum → label |
