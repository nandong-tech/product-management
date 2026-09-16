# Swagger / OpenAPI workflow (agent)

## Scope

Only map **dynamic** UI fields (API-backed values / request-bound inputs). Do not create rows for static labels, fixed CTAs, or client-only navigation.

1. If URL: fetch the document (json or yaml)
2. If file path: read from workspace
3. Parse as Swagger 2 or OpenAPI 3
4. On failure (404, auth, parse error): stop mapping and ask for a reachable spec

## Index what you need

For each relevant `path` + HTTP method:

- `operationId` (if any)
- Path/query/header parameters (name, `in`, required, schema)
- Request body schema (for inputs the UI submits)
- Success response schema (commonly `200` / `201`) — primary source for **read-only UI**
- Error responses: do **not** put status codes in the PRD mapping table; they inform EC work in the sibling skill, not §7 rows

Follow `$ref` to `definitions` / `components.schemas` until you reach scalar/array/object properties.

## Field path convention

Use a dotted path from the payload root the client binds to, e.g.:

- `data.displayName`
- `data.price.amount`
- `data.status`

If the spec wraps in an envelope, include the envelope segments that appear in the actual JSON.

## Matching UI → fields

| UI kind | Prefer |
|---------|--------|
| Read-only label / badge | Success response property |
| Input / select | Request body or writable property; else query param |
| Computed display (e.g. formatted price) | Source amount/currency fields + Notes for formatter |

Match by (in order): exact name hints in label, Figma layer names, semantic similarity to `description` / property name. If two properties fit, keep one row and note the alternate in Notes.

## What not to do

- Do not use remembered “usual” LotusFlare or vendor paths without confirming in **this** spec
- Do not map to deprecated operations if a non-deprecated twin exists — prefer current; note deprecation if unavoidable
- Do not collapse multiple UI elements into one row
