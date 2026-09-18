# Publish PRD to Confluence (agent)

Used only by the **`publish-prd`** parent skill when the user asks to publish.

## When to publish

Only when the user invoked `publish-prd` (or an explicit publish request handled by that skill).

Do **not** publish as a side effect of `generate-prd`.

Do **not** publish from git (commit or push). Do **not** read or write `prebuilt_prds/confluence-mapping.json`. After a successful Confluence write (or skip-if-match with local edits), the parent runs the commit-and-push child.

**Never** publish a **new** page without an explicit destination from the user (asked **once** per run when the first create needs it). **Catalog run:** update existing pages without per-page confirm. **Named single file:** confirm update of the existing page.

Do **not** default to personal space, favorites, or a config row without confirmation.

Write Confluence **from the local PRD** after compare. **Skip** the write when local already matches Confluence content.

**Catalog run** (`publish-prd` with no path): every AIDR PRD under `prebuilt_prds/`, one by one. Ask destination **once** for creates. Update existing pages without per-page confirm.

## Ask the user (first create)

> Where should I publish this PRD on Confluence?
> - Space name or key (e.g. `LPR`, `LF Product`)
> - Optional: parent page title or URL (e.g. under a “PRDs” page)
> - Or paste a Confluence space / parent page link

You may **suggest** options from [../config/confluence-projects.md](../config/confluence-projects.md) or `getConfluenceSpaces`, but the user must choose.

Wait for their answer. Only then create. On a catalog / multi-file run, reuse that answer for later creates. Do **not** ask again.

If a page already exists for this PRD: **catalog run** — update without confirm. **Named single file** — confirm update instead of asking for a new space.

## Prerequisites

1. User invoked publish
2. Review ask answered — **Yes** and Ready with no open Critical, **or** **No** (skip review)
3. **Readiness gate passed** — no **product** `TBD` and no empty required sections (`N / A` is valid and does not block; after skip-review Header Figma / API Spec are `N / A`)
4. Compare child finished (or first publish: no page)
5. Local still differs from Confluence, or there is no page yet, **or** Header → Confluence still needs a fill (empty/`TBD`/missing/wrong page id on local or wiki)
6. Atlassian MCP authenticated (`mcp_auth` if needed)
7. Local PRD markdown ready under `prebuilt_prds/` or `project_prds/`

## Review ask (before readiness / destination / publish)

Ask whether to run `review-prd` **once**. **If No, skip review for every PRD in the run.** Auto-fill Header Figma / API Spec `TBD` → `N / A` without asking. If Yes, do not publish a PRD until that review is **Ready** with no open Critical. See [../SKILL.md](../SKILL.md) step 2.

Skip-review auto-fill does not bypass leftover **product** TBD in the body. It **does** fill Header Figma / API Spec.

## Readiness gate (before destination / publish)

Read the full local PRD. **Do not publish** if unfinished.

**Accepted (does not block):** `N / A` / `N/A` for intentionally non-applicable fields or sections (including §4 for page PRDs, Header Figma/API Spec, mapping cells, etc.). **Header → Confluence** empty / `TBD` / `N / A` / missing does **not** block — fill it after the page exists. **Header → Jira** empty / `TBD` / `—` / missing does **not** block — leave as-is; do **not** fill from the AIDR board. After skip-review, Header Figma / API Spec `TBD` are already `N / A`.

**Blocks publish:**

- Any **product** `TBD`, `TBD — confirm with PM`, `TODO`, or `?` placeholder (**except** Header → Confluence; Header → Jira; and after skip-review Header Figma / API Spec already set to `N / A`)
- Empty required sections (blank entry/exit tables; blank §4 without `N / A`; empty §5–7 tables)
- Empty required Header or table cells (Feature, Owner, In/Out, Given/When/Then, etc. — Header Confluence and Header Jira may be empty/`TBD`/`—`)

**Does not block:** empty §1 Change Log (no data rows yet).

On failure: list each leftover **product** TBD or empty item; do **not** publish that PRD; continue the catalog with the next file after listing blockers. After skip-review, do **not** ask the user to set Header Figma / API Spec to `N / A` — already written. Do not publish a PRD while product TBD remains.

## Resolve destination (after user answers, first create)

1. Parse their answer: space key/name/URL and optional parent page id/URL/title
2. Resolve `cloudId`:
   - Pinned value in `confluence-projects.md` if set
   - Else `getAccessibleAtlassianResources`
3. Resolve `spaceId` / space key via `getConfluenceSpaces` or the URL they pasted
4. Resolve `parentId` if they named a parent; omit if they want space root
5. Optionally offer to save their choice into `confluence-projects.md` — only after they agree

If still ambiguous, ask a follow-up — **do not guess**.

## Create vs update (never duplicate)

**If this PRD was published before, always update that Confluence page as a new version.** Do **not** create a second page for the same PRD.

### Resolve existing page (required before create)

Check in order; stop at the first **usable** match. **Do not** use `confluence-mapping.json`.

1. **URL the user pasted**
2. **Header → Confluence** when it is a real page URL (not empty / `TBD` / `N / A`)
3. **§1 Change Log** — if any row says First publish / Updated on Confluence, treat as previously published; find the page via title / PRD id **search** (do not create a duplicate)
4. **Search** in the chosen space for the same title (e.g. `PRD: LF-S-001 - Welcome page (guest landing)`) and/or PRD id (`LF-S-001`) via CQL / search

Header → **Links** is **not** used to store or find **this PRD’s** Confluence URL. Links stay page template + shared context only, as **Confluence page URLs** (never local files).

| Result | Action |
|--------|--------|
| Existing page found | **`updateConfluencePage`** — Confluence stores a **new version** of the same page. Do **not** call `createConfluencePage`. |
| No existing page | **`createConfluencePage`** (first publish only) |
| Local matches Confluence after compare | **Skip write** |
| Wiki Change Log / Last updated older than local after auto-resolve; rest matches | Update wiki to that local Change Log / Last updated; **no** extra Change Log row |

**Forbidden:** creating a new page when search finds the same PRD title/id in the target space.

If multiple matches: ask which page to update — never create another.

When republishing, **catalog run** updates the existing page without confirm. **Named single file** may confirm update of the existing URL / space (not “create new”).

### Change Log before write (required when writing)

Publish rows are added **only on publish**, never by `generate-prd`. Keep any existing `Updated from design` rows from `design-prd-consistency`.

Do **not** add a Change Log row if this PRD is skipped because it already matches Confluence, **except** a Header → Confluence fill still updates the page with **no** Change Log row. Same for a Change Log / Last updated sync when wiki is older than local after auto-resolve and nothing else differs.

Before `createConfluencePage` / `updateConfluencePage`:

1. Append one row to local `prebuilt_prds/….md` or `project_prds/….md` §1:

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| today’s date | `First publish to Confluence` (if first create) **or** `Updated on Confluence` (+ brief note) | Header Owner (PM) | Short rationale |

2. Update Header → Last updated to today (content publish only — not for a Header → Confluence URL-only fill, and not for a Change Log / Last updated sync when nothing else differs)
3. Use this updated markdown as the Confluence `body` (or the matching HTML when preserving comments). After the page exists, Header → Confluence **must** already be the real page URL (first publish: create, fill the cell, then update). Header → Jira stays `—` unless the user gave a ticket — do **not** fill PRD / Design / Implementation from the AIDR board.

### Create (first publish only)

```
createConfluencePage(
  cloudId="...",
  spaceId="[user-chosen space]",
  title="PRD: <PROJECT>-<TYPE>-<NNN> - Feature name>",
  body="[full PRD markdown from prebuilt_prds/*.md or project_prds/*.md]",
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
  body="[full PRD markdown or HTML]",
  contentFormat="markdown",
  versionMessage="Updated AIDR PRD from publish-prd (new version)"
)
```

`updateConfluencePage` increments the page version in Confluence — that is the required republish behavior.

Use `contentFormat="html"` when the page has remaining **open inline** comments (see Body rules). Page-level comments are not body-anchored.

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
4. If a template PRD id is not in the table yet, search Confluence for that PRD id, use that page’s `webUrl`, and add a row to the Header Links table in `confluence-projects.md`
5. Write the rewritten Header Links back into the local PRD so repo and Confluence match
6. If any Header Links href still points at a local file after rewrite: **stop** — do not publish

Return **this PRD’s** Confluence URL in chat. Write it into Header → **Confluence** (not Header Links) on **local and wiki**. Do **not** add it to Header Links.

## Header → Confluence (required — local and wiki, after the page exists)

Shape: `[PRD: <H1 title>](<webUrl>)`. Row sits **below Figma**. Add the row if missing.

**Required post-condition.** Do not finish a PRD in this run while Header → Confluence is empty, `TBD`, `N / A`, or missing on the local file **or** the wiki body.

| Situation | Action |
|-----------|--------|
| First publish (new page) | After `createConfluencePage`, write the URL into **local** Header → Confluence, then `updateConfluencePage` so the wiki body has the same link |
| Local cell empty / `TBD` / `N / A` / missing row | Write the current page URL into **local**, then update the wiki body |
| Wiki body missing the row, or wiki cell empty / `TBD` / `N / A` | Update the wiki body with the current page URL (write local first if needed). Do this even when other content already matches. **No** Change Log row for a URL-only fill |
| Page id in the cell ≠ current page id | Replace local and wiki with the current page URL |
| Local and wiki both already have this page’s URL (same page id) | Leave the cell unchanged |

Do **not** put this PRD’s own page URL in Header → Links.

## Header → Jira (not filled)

Leave `—` unless the user gave a ticket. Do **not** write a PRD / Design / Implementation list. Do **not** search the AIDR board. Ticket linking by slot can be added later. See [fill-header-jira.md](fill-header-jira.md).

If the row is missing, add it below Confluence with `—`. A normal content write uses the local cell as-is.

## Body rules

- Prefer **`contentFormat="html"`** when updating an **existing** page that has remaining **open inline** comments — HTML round-trip can preserve comment markers / `data-local-id` if you edit the fetched HTML instead of rebuilding from markdown
- **Do not** full-replace an existing page body with **markdown** if the page has remaining **open inline** comments — Confluence treats that as deleting the anchored text and shows “content was deleted” / orphaned comments
- Safe markdown full replace: **first publish only** (new page), when **no open inline** comments remain, or when the user explicitly accepts losing inline comment anchors. Remaining **page-level** comments survive a markdown replace; remaining **open inline** comments do not
- Before updating an existing page: the compare child has already listed open page-level and inline comments. If any **open inline** comments remain, warn the user and use HTML fetch → edit → `updateConfluencePage` with `contentFormat="html"`, or ask before proceeding
- **Resolve** during compare **closes** the comment on Confluence (`updateConfluenceCommentResolution`, `resolved: true`). It does **not** delete the comment. **Leave** keeps it open.
- Keep mermaid in fenced ` ```mermaid ` blocks when using markdown
- Do not add “Published by agent” banners unless the user asks

## After publish

1. Return the Confluence page URL to the user
2. Do **not** write `confluence-mapping.json`
3. Header → **Confluence** on local **and** wiki must already be this PRD’s page URL (see Header → Confluence above). Header → **Jira** stays `—` unless the user gave a ticket (see Header → Jira above). Do **not** write that URL into Header → Links. Shared context and page template links **must** already be Confluence URLs (see Header Links rewrite above). Change Log row should already be present from the pre-write step (not for a URL-only fill).
4. After all PRDs in this run: parent runs [../children/commit-and-push/SKILL.md](../children/commit-and-push/SKILL.md) — commit touched local PRDs, then push if origin exists
5. Offer to remember space/parent in `config/confluence-projects.md` for that project_key

## Failure handling

| Issue | Action |
|-------|--------|
| User chose review Yes and review failed | Stop; do **not** publish until Ready |
| User chose review No | Skip review for **all** PRDs; auto-fill Header Figma / API Spec `TBD` → `N / A`; do not ask again; do not stop for missing review |
| Readiness gate failed (product TBD or empty section) | List items; do **not** publish **that** PRD; on a catalog run continue with the next file |
| Local matches Confluence after compare | Skip **content** write; still fill Header → Confluence on local and wiki if empty/`TBD`/missing/wrong page id; if wiki Change Log / Last updated is still older than local, write those without asking and **without** an extra Change Log row; do **not** fill Header → Jira from the AIDR board |
| Header → Confluence still TBD/empty after create | Write the URL locally, update the page, then finish — do not return success until filled |
| MCP needs auth | Run `mcp_auth`, then retry |
| User has not chosen a space (first create) | Ask again; do not publish |
| Permission denied | Report; leave local PRD as source of truth |
| Duplicate unclear titles | Ask which page to **update**; do **not** create a new page |
| Confluence write failed | Do not commit or push |
