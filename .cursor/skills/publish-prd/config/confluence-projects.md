# Project → Confluence space mapping

Edit this file so **`publish-prd`** can suggest Confluence spaces. Suggestions only — always ask the user where to publish.

| project_key | project_name | confluence_space_key | confluence_space_id | prd_parent_page_id | notes |
|-------------|--------------|----------------------|---------------------|--------------------|-------|
| EXAMPLE | Example Product | EXAMPLE | | | Replace with real space; leave space_id blank to resolve via `getConfluenceSpaces` |
| LF | LotusFlare AIDR PRDs | AIDR | 7282327742 | 7593787469 | Prebuilt PRDs folder — default for LF-* publish |
| TEST | Flow-test PRDs | ~62c27c6c5f45f3d3b7b5ec9d | 3906764803 | | Nan Dong personal space — smoke tests only; do not use for real PRDs |
| | | | | | |

## Published PRD page ids

Catalog PRD → Confluence page id: [`../../../prebuilt_prds/confluence-mapping.json`](../../../prebuilt_prds/confluence-mapping.json). `publish-prd` reads this when resolving an existing page. After publish it adds a key if missing, or updates the key if the page id changed. If the page id is already correct, it does not write the file.

## Header Links (canonical Confluence URLs)

`generate-prd` and `publish-prd` must use these **Confluence** URLs in Header → Links — **never** local `.md` / `.cursor/` paths. `publish-prd` rewrites any leftover local-file Header Links to these URLs before writing the body. Do **not** put a PRD’s **own** page URL into that PRD’s Header Links.

| artifact | confluence_page_id | url |
|----------|--------------------|-----|
| Shared general context | 7693467649 | https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules |
| LF-P-001 Basic page template | 7676821534 | https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template |
| LF-P-002 Basic page template (no back) | 7676592216 | https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676592216/PRD+LF-P-002+-+Basic+Page+Template+No+Back |

After first publish of a **new** page template, add a row here and use that URL in later screen PRDs.

## Field meanings

| Field | Required | Description |
|-------|----------|-------------|
| `project_key` | Yes | Short key used in chat / PRD Header (e.g. `PNCC`, `AIDR`) |
| `project_name` | No | Human label |
| `confluence_space_key` | Yes | Confluence space key (e.g. `PNCC`) |
| `confluence_space_id` | Preferred | Numeric space ID for `createConfluencePage` — fill once known |
| `prd_parent_page_id` | Recommended | Parent page under which PRDs are nested (e.g. a “PRDs” page) |
| `notes` | No | Anything useful for PMs |

## Defaults

Config rows are **suggestions only**. On every publish, the agent must ask the user which Confluence space (and optional parent page) to use, then wait for confirmation. Never auto-publish to a mapped or personal space without that answer.

If the user’s project is not in this table:

1. Ask which Confluence space to use
2. Optionally offer to append a row here after they confirm
3. Do **not** publish until they choose a destination

## Site

Atlassian site / cloudId is resolved at publish time via Atlassian MCP (`getAccessibleAtlassianResources` or the site URL the user provides), unless your team pins one below:

| Setting | Value |
|---------|-------|
| `atlassian_site_url` | https://lotusflare.atlassian.net |
| `cloudId` | e91ffda2-253d-436c-84e1-bdf5229fbbca |
