# LotusFlare Swagger UI → OpenAPI file

The UI URL is **not** the spec. Resolve it before fetch.

## UI URL shape

```
https://swagger.mgmt.lotusflare.info/?urls.primaryName=<encoded name>#/
```

`urls.primaryName` is URL-decoded, e.g. `[lua] catalog — CatalogClient`.

## Resolve steps

1. Fetch `https://swagger.mgmt.lotusflare.info/config/api-map.json`
2. Section = text inside `[…]` at the start of the name (`lua`, `lua-odyssey`, `ts-polaris`, `lfscala`)
3. Remainder after `] ` is `service — fileStem` when one service has several YAML files, or just `service`
4. In `api-map.json` → that section → that service’s `urls` list, pick the path whose file stem matches (e.g. `CatalogClient.yaml`)
5. Fetch `https://swagger.mgmt.lotusflare.info/` + that relative path (resolve `./`)

Example: `[lua] catalog — CatalogClient` → `https://swagger.mgmt.lotusflare.info/swaggers/catalog/swagger/CatalogClient.yaml`

## Other hosts

If the user pastes a raw `.yaml` / `.json` / OpenAPI URL, fetch that URL directly. If fetch fails (auth, 404), stop and ask for a reachable spec.

## Match a named API

User wording like **get offers** matches, in order:

1. Path segment or full path (`/api/v3/catalog/get_offers`)
2. `operationId`
3. `summary` / `description`

Prefer the **client** catalog operation when the spec is Catalog Client. If **get offers** matches more than one path, list `METHOD path` and ask.
