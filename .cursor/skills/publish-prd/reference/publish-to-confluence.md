# Publish PRD to Confluence (agent)

Used only by the **`publish-prd`** parent skill when the user asks to publish.

## When to publish

Only when the user invoked `publish-prd` (or an explicit publish request handled by that skill).

Do **not** publish as a side effect of `generate-prd`.

**Never** publish to a space without an explicit destination from the user.

Do **not** default to personal space, favorites, or a config mapping without confirmation.

## Ask the user (required)

> Where should I publish this PRD on Confluence?
> - Space name or key (e.g. `LPR`, `LF Product`)
> - Optional: parent page title or URL (e.g. under a “PRDs” page)
> - Or paste a Confluence space / parent page link

You may **suggest** options from [../config/confluence-projects.md](../config/confluence-projects.md) or `getConfluenceSpaces`, but the user must choose.

Wait for their answer. Only then continue.

## Prerequisites

1. User invoked publish and specified (or will specify) destination
2. **Review gate passed** — `review-prd` completed for this file with Verdict **Ready** and no open Critical (see [../review-prd/SKILL.md](../review-prd/SKILL.md); record under `prebuilt_prds/reviews/` when Ready)
3. **Readiness gate passed** — no `TBD` and no empty required sections (`N / A` is valid and does not block)
4. Atlassian MCP authenticated (`mcp_auth` if needed)
5. Local PRD markdown ready under `prebuilt_prds/`

## Review gate (before readiness / destination / publish)

**Do not publish** without a successful `review-prd`.

Pass only if:

- Evidence of review for **this** PRD file exists (conversation output, or `prebuilt_prds/reviews/<PROJECT>-<TYPE>-<NNN>-review.md`)
- Verdict is **Ready**
- No open Critical findings

If missing or not Ready: stop, tell the user to run `review-prd <path>` (or offer to run it), and only resume publish after **Ready**.

A Ready review does not bypass the readiness gate.

## Readiness gate (before destination / publish)

Read the full local PRD. **Do not publish** if unfinished.

**Accepted (does not block):** `N / A` / `N/A` for intentionally non-applicable fields or sections (including §4 for page PRDs, Header Figma/API Spec, mapping cells, etc.).

**Blocks publish:**

- Any `TBD`, `TBD — confirm with PM`, `TODO`, or `?` placeholder
- Empty required sections (blank entry/exit tables; blank §4 without `N / A`; empty §5–7 tables)
- Empty required Header or table cells (Feature, Owner, In/Out, Given/When/Then, etc.)

**Does not block:** empty §1 Change Log (no data rows yet).

On failure: list each TBD or empty item; ask the user to finish them or set intentional gaps to **`N / A`**. Do not publish while any TBD remains.

## Resolve destination (after user answers)

1. Parse their answer: space key/name/URL and optional parent page id/URL/title
2. Resolve `cloudId`:
   - Pinned value in `confluence-projects.md` if set
   - Else `getAccessibleAtlassianResources`
3. Resolve `spaceId` / space key via `getConfluenceSpaces` or the URL they pasted
4. Resolve `parentId` if they named a parent; omit if they want space root
5. Optionally offer to save their choice into `confluence-projects.md` — only after they agree

If still ambiguous, ask a follow-up — **do not guess**.

## Confluence mapping (`prebuilt_prds/confluence-mapping.json`)

One JSON object. Keys are `prebuilt-prds/<filename>.md` (hyphen folder, matching the framework library). Values are Confluence page id strings.

Example:

```json
{
    "prebuilt-prds/LF-J-001-create-account.md": "7676592193"
}
```

When publishing `prebuilt_prds/LF-J-001-create-account.md`, the key is `prebuilt-prds/LF-J-001-create-account.md`. For a project PRD under `project_prds/`, use key `project_prds/<filename>.md` in the same file.

**Read** this file when resolving the page. **Write** it only after the Confluence create/update succeeds, and only if a record must be added or corrected.

| Situation | Mapping file |
|-----------|----------------|
| Page exists and the mapped id is already this page | **No update** — leave the file as-is |
| Page exists but the mapped id is different, or the mapped id does not resolve | **Update** that key to the page id just used |
| No key for this PRD | **Add** one record (do not replace the rest of the file) |

Do **not** rewrite unchanged keys. Do **not** delete other PRDs’ records. Do **not** put this PRD’s URL in Header Links because it is now in the mapping file.

## Create vs update (never duplicate)

**If this PRD was published before, always update that Confluence page as a new version.** Do **not** create a second page for the same PRD.

### Resolve existing page (required before create)

Check in order; stop at the first **usable** match:

1. **`prebuilt_prds/confluence-mapping.json`** — look up this PRD’s key. If the page id is present, fetch that page. If it exists, that is the page. If it 404s, ignore the stale id and continue.
2. **§1 Change Log** — if any row says First publish / Updated on Confluence, treat as previously published; find the page via title / PRD id search (do not create a duplicate)
3. Header → **Links** is **not** used to store or find **this PRD’s** Confluence URL. Links stay page template + shared context only, as **Confluence page URLs** (never local files).
4. **Search** in the chosen space for the same title (e.g. `PRD: LF-S-001 - Welcome page (guest landing)`) and/or PRD id (`LF-S-001`) via CQL / search

| Result | Action |
|--------|--------|
| Existing page found | **`updateConfluencePage`** — Confluence stores a **new version** of the same page. Do **not** call `createConfluencePage`. |
| No existing page | **`createConfluencePage`** (first publish only) |

**Forbidden:** creating a new page when search finds the same PRD title/id in the target space.

If multiple matches: ask which page to update — never create another.

When republishing, destination ask may be: confirm update of the existing URL / space (not “create new”).

### Change Log before write (required)

Publish rows are added **only on publish**, never by `generate-prd`. Keep any existing `Updated from design` rows from `design-prd-consistency`.

Before `createConfluencePage` / `updateConfluencePage`:

1. Append one row to local `prebuilt_prds/….md` §1:

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| today’s date | `First publish to Confluence` (if first create) **or** `Updated on Confluence` (+ brief note) | Header Owner (PM) | Short rationale |

2. Update Header → Last updated to today
3. Use this updated markdown as the Confluence `body`

### Create (first publish only)

```
createConfluencePage(
  cloudId="...",
  spaceId="[user-chosen space]",
  title="PRD: <PROJECT>-<TYPE>-<NNN> - Feature name>",
  body="[full PRD markdown from prebuilt_prds/*.md]",
  contentFormat="markdown",
  parentId="[user-chosen parent if any]"
)
```

### Update (republish — new Confluence version)

```
updateConfluencePage(
  cloudId="...",
  pageId="[existing page id from title / PRD id search]",
  title="PRD: <PROJECT>-<TYPE>-<NNN> - Feature name>",
  body="[full PRD markdown]",
  contentFormat="markdown",
  versionMessage="Updated AIDR PRD from publish-prd (new version)"
)
```

`updateConfluencePage` increments the page version in Confluence — that is the required republish behavior.

## Header Links — Confluence URLs only (required before write)

Header → **Links (optional)** on the published body (and in the local file) must be **Confluence page URLs**. Do **not** publish local file links.

**Forbidden in Header Links:**

- Local / relative paths: `*.md`, `.cursor/`, `../`, repo file hrefs
- This PRD’s **own** Confluence page URL
- Tickets, related screen/journey PRDs, destination hand-offs, `pending-prd-links.md`

**Required rewrite** before `createConfluencePage` / `updateConfluencePage`:

1. Read canonical URLs from [../config/confluence-projects.md](../config/confluence-projects.md) (Header Links table)
2. Replace any local shared-context path with the Shared general context Confluence URL
3. Replace any local page-template `.md` path (`LF-P-001-…`, `LF-P-002-…`, or another template file) with that template’s Confluence URL
4. If a template PRD id is not in the table yet, search Confluence for that PRD id, use that page’s `webUrl`, and add a mapping row
5. Write the rewritten Header Links back into the local PRD so repo and Confluence match
6. If any Header Links href still points at a local file after rewrite: **stop** — do not publish

Return **this PRD’s** Confluence URL in chat only. Do **not** add it to Header Links.

## Body rules

- Prefer **`contentFormat="html"`** when updating an **existing** page that may have inline comments — HTML round-trip can preserve comment markers / `data-local-id` if you edit the fetched HTML instead of rebuilding from markdown
- **Do not** full-replace an existing page body with **markdown** if the page has (or may have) inline comments — Confluence treats that as deleting the anchored text and shows “content was deleted” / orphaned comments ([known MCP limitation](https://github.com/atlassian/atlassian-mcp-server/issues/54))
- Safe markdown full replace: **first publish only** (new page), or when the user explicitly accepts losing inline comment anchors
- Before updating an existing page: call `getConfluencePageInlineComments`; if any exist, warn the user and use HTML fetch → edit → `updateConfluencePage` with `contentFormat="html"`, or ask before proceeding
- Keep mermaid in fenced ` ```mermaid ` blocks when using markdown
- Do not add “Published by agent” banners unless the user asks

## After publish

1. Return the Confluence page URL to the user
2. **Sync `prebuilt_prds/confluence-mapping.json`** (see Confluence mapping above):
   - Mapped id already equals the page just published → do not touch the file
   - Mapped id differs, or the key is missing → set that one key to the page id; keep every other key
3. Do **not** write **this PRD’s** Confluence URL into Header → Links. Shared context and page template links **must** already be Confluence URLs (see Header Links rewrite above). Change Log row should already be present from the pre-write step.
4. Offer to remember space/parent in `config/confluence-projects.md` for that project_key

## Failure handling

| Issue | Action |
|-------|--------|
| Review gate failed (no review / not Ready / open Critical) | Stop; ask user to run `review-prd`; do **not** publish |
| Readiness gate failed (TBD or empty section) | List items; do **not** publish; ask user to finish or set `N / A` |
| MCP needs auth | Run `mcp_auth`, then retry |
| User has not chosen a space | Ask again; do not publish |
| Permission denied | Report; leave local `prebuilt_prds/` as source of truth |
| Duplicate unclear titles | Ask which page to **update**; do **not** create a new page |
| Same PRD already in the space | Always **update** that page (new version); never create a second page |
| Mapping id 404s | Continue resolve (Change Log / search); after publish, **update** that mapping key |
| Mapping key missing after a successful publish | **Add** the record; do not leave the new page unmapped |
