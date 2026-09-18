---
name: publish-prd
description: >-
  Parent skill (user entry). Type "publish-prd" at the start of the message.
  With no file named, walks every AIDR PRD under prebuilt_prds/ against
  Confluence, one by one. Named paths publish only those files. Asks once
  whether to run review-prd; No skips review for every PRD in the run and
  fills Header Figma / API Spec TBD with N / A without asking again.
  Compares each PRD to the Confluence page, walks content gaps and comments
  (page-level and inline) one by one, applies accepted wiki edits to local,
  and Resolve closes the comment on Confluence. If Change Log or Last updated
  differs, uses the most latest without asking. Then writes local to
  Confluence only when still different. Then commits those local PRD files
  and pushes if origin exists. Fills Header → Confluence with this PRD’s page
  URL on first publish, and updates that field only when the page id changed.
  Does not fill Header → Jira from the AIDR board.
  Does not use confluence-mapping.json. Does not publish from git. Does not run
  after generate-prd unless the user typed publish-prd. Blocks on product TBD
  or empty required sections (N / A is accepted; Header Confluence TBD is
  filled here).
---

# Publish PRD (parent)

**How to invoke:** User types `publish-prd` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md)

**Shared general context:** [../shared/general-context.md](../shared/general-context.md) — product-wide rules.

Publish existing PRDs under `prebuilt_prds/` or `project_prds/` to Confluence. Confluence is updated **from local PRDs** after the user has taken wiki edits and comments they want. Do **not** invent a new PRD here — use `generate-prd`.

**Never** publish unless the user invoked this skill (or explicitly asked to publish in a way that clearly means this skill). Do **not** offer publish as a follow-up after `generate-prd`.

**Do not** read or write `prebuilt_prds/confluence-mapping.json`. **Do not** publish because of a git commit or push. **Do not** update Confluence from git. After Confluence work in this same run, **do** commit the touched local PRDs and push if `origin` exists.

**Always required:** readiness gate — no product `TBD` and no empty required sections (`N / A` is valid and does **not** block). Header → Confluence `TBD` / empty does **not** block — this skill fills it. Header → Jira `—` / `TBD` / empty does **not** block and is **not** filled from the AIDR board. After skip-review, Header Figma / API Spec `TBD` are filled with `N / A` (do not ask).

**Review is optional:** ask **once** per run whether to run `review-prd`. If the user says no, skip review for **every** PRD in the run. Do **not** ask again.

## When to use

- User starts with `publish-prd` and no path — **catalog run**: every AIDR PRD under `prebuilt_prds/`
- User names one or more files under `prebuilt_prds/` or `project_prds/` — publish **only** those
- User names `project_prds/` — every AIDR PRD in that folder

## Workflow

```
Publish Progress:
- [ ] 1. Identify local PRD file(s) — no path → all `prebuilt_prds/` AIDR PRDs; named paths → those files only
- [ ] 2. Ask review-prd **once** — Yes: review each PRD (Ready, no open Critical) before that PRD continues; No: skip review for **all** PRDs in the run; auto-fill Header Figma / API Spec `TBD` → `N / A`; do not ask again
- [ ] 3. Readiness gate per PRD — no product TBD / no empty required sections (`N / A` OK; empty Change Log OK until first publish; Header Confluence TBD OK; Header Jira `—` / TBD OK; after skip-review, Header Figma / API Spec `N / A` is already written)
- [ ] 4. Authenticate Atlassian MCP if needed
- [ ] 5. Resolve existing Confluence page (Header → Confluence URL, search title / PRD id, or URL the user pastes) — do not use confluence-mapping.json
- [ ] 6. Child: compare local vs Confluence (body + page-level and inline comments); Change Log / Last updated → most latest without asking; walk other gaps one by one; apply accepted wiki edits to local; resolve closes the comment on Confluence
- [ ] 7. Destination: catalog / multi-file run — ask **once** when the first create needs a space/parent; reuse for later creates. Existing page → update (no per-page confirm on a catalog run). Named single file, first create → ask; existing page → confirm update
- [ ] 8. If local still differs from Confluence: append §1 Change Log row, rewrite Header Links, create or update the page, then fill Header → Confluence
- [ ] 9. If local matches Confluence: skip the content write — still fill Header → Confluence on local **and** wiki if empty, TBD, missing, or the page id changed
- [ ] 10. Header → Confluence must be a real URL for this page on local and wiki before finishing that PRD. Header → Jira stays `—` unless the user gave a ticket. Return the Confluence URL in chat. Do not write this PRD’s own page URL into Header Links
- [ ] 11. Child: commit the local PRD files this run touched; push if origin exists (do not publish from git)
```

Finish one PRD (steps 3–10) before the next. Do **not** republish content that matches Confluence after the compare, except a Header → Confluence fill when that cell is empty/`TBD`/missing on local **or wiki**, or the page id changed. Step 11 runs **once** at the end of the run, in the same `publish-prd` invocation.

### 1. Identify local PRD

**No path** (`publish-prd` alone): **catalog run**. Load **every** AIDR PRD under `prebuilt_prds/` — files matching `<PROJECT>-<TYPE>-<NNN>-*.md` (e.g. `LF-S-001-welcome-page.md`). Sort by filename. Do **not** limit to the last PRD in the conversation.

**Exclude:** `pending-prd-links.md`, `reviews/`, `README.md`, `confluence-mapping.json`, and any non-PRD markdown.

**Named path(s):** only those files (or every AIDR PRD under `project_prds/` if they named that folder).

Treat each file on its own through compare and publish. Read the file; body must be clean AIDR markdown (no instruction blockquotes).

### 2. Ask review-prd (required ask; review itself is optional)

Ask **once per publish run** (not once per file):

> Do you want to run `review-prd` before publishing?
> - **Yes** — run review first for each PRD; continue that PRD only if Verdict is **Ready** and there are no open Critical findings
> - **No** — skip review for **every** PRD in this run and continue publish

Wait for the answer. **Do not** ask this again later in the run.

**If Yes:**

Run [../review-prd/SKILL.md](../review-prd/SKILL.md) for each PRD in this run.

Pass only when all are true:

| Check | Pass |
|-------|------|
| Review exists | Evidence of `review-prd` for **this** file (see Evidence below) |
| Verdict | **Ready** (not Needs revision / Blocked) |
| Critical | No open Critical findings (all fixed or explicitly closed in the review) |

**Evidence (any one):**

1. A review record file: `prebuilt_prds/reviews/<PROJECT>-<TYPE>-<NNN>-review.md` with Verdict **Ready** and date ≥ last material PRD edit, **or**
2. In **this** conversation: a full `review-prd` output for this file with Verdict **Ready** and empty/resolved Critical, **or**
3. User pastes a prior Ready review for this file and confirms nothing material changed since

If the user chose Yes and review is missing, not Ready, or has open Critical:

1. **Stop** — do not publish
2. Ask them to fix the PRD and re-review
3. Only continue publish after a new **Ready** result

**If No:** skip review for **all** PRDs in this run. Do **not** stop. Do **not** ask again. Then auto-fill Header placeholders (below) and continue at the readiness gate.

**Skip-review auto-fill (do not ask):** On each PRD, write these before the gate. Do **not** add a Change Log row for this fill alone.

| Field | If | Write |
|-------|-----|-------|
| Header → **Figma** | empty, `TBD`, or missing | `N / A` |
| Header → **API Spec** | empty, `TBD`, or missing | `N / A` |

Leave a real Figma URL or an attached API Spec YAML link unchanged. Do **not** auto-fill product body `TBD` (e.g. `TBD — confirm with PM`, `(PRD TBD)` hand-offs). Those still block.

Do **not** treat “looks fine to me” as a passed review when the user chose **Yes**.

### 3. Readiness gate (required — before Confluence)

Scan the full PRD. **Do not publish** if any required content is still unfinished.

**Accepted (does not block):**

- **`N / A`** (also `N/A`) anywhere a field or section is intentionally not applicable — e.g. Header Figma, API Spec, §4 User Journey for page PRDs, **§3d Entry / §3e Exit** for page PRDs or journeys whose mermaid already shows start/end, a mapping row, or an exit that does not apply
- **Header → Confluence** empty, `TBD`, `N / A`, or missing — this skill fills that field on publish
- **Header → Jira** empty, `TBD`, `—`, `N / A`, or missing — leave as-is (`—` is the default). Do **not** fill from the AIDR board. Ticket linking by slot can be added later.
- After skip-review: Header → **Figma** and Header → **API Spec** that this skill already set to `N / A`
- Filled tables / mermaid / concrete values

**Blocks publish:**

| Signal | Examples |
|--------|----------|
| Explicit TBD | `TBD`, `TBD — confirm with PM`, `TODO`, `?` used as a placeholder |
| Empty required sections | Blank §3d/§3e tables; blank §4 (neither mermaid nor `N / A`); empty §5 / §6 / §7 tables |
| Empty required Header cells | Feature, Status, Owner, Created, Last updated left blank (Header Confluence and Header Jira may be empty/`TBD`/`—`) |
| Empty required row cells | Entry/exit name or In/Out blank; AC Given/When/Then blank; EC columns blank |

**Does not block:** empty §1 Change Log (headers only, no rows) — publish rows are added in step 8. Existing `Updated from design` rows from `design-prd-consistency` do not block.

If the gate fails:

1. **Stop** — do not create/update the page
2. List each blocking item (section + what’s wrong: TBD vs empty)
3. Ask the user to **finish** those parts or replace intentional gaps with **`N / A`**
4. Only continue after the file no longer contains blocking TBD/empty items

Do **not** publish while any **product** `TBD` remains. **Except:** Header → Confluence (this skill fills that cell); Header → Jira (`—` / `TBD` / empty does not block; this skill does **not** fill it); after skip-review, Header Figma / API Spec already written as `N / A`. Prefer **`N / A`** over TBD when something is intentionally out of scope — after skip-review, write those Header cells yourself; do **not** ask.

A skipped review does **not** waive leftover **product** TBD or empty-section readiness. It **does** waive asking about Header Figma / API Spec.

### 4–6. Find page, then compare

Authenticate Atlassian MCP if needed (`mcp_auth`).

Find the Confluence page in this order; stop at the first usable match:

1. **URL the user pastes**
2. **Header → Confluence** when it is a real page URL (not empty / `TBD` / `N / A`)
3. **Search** (PRD title and/or PRD id such as `LF-S-055`) in the space the user is using

Change Log rows that say First publish / Updated on Confluence only mean it was published before — still **search** if Header → Confluence is empty; do not invent a page id.

**Do not** open or update `prebuilt_prds/confluence-mapping.json`.

Then follow the internal child [children/compare-confluence/SKILL.md](children/compare-confluence/SKILL.md):

- Fetch body, **page-level** comments, and **inline** comments
- Compare AIDR **content**, not HTML vs markdown markup
- If §1 Change Log or Header → Last updated differs: use the **most latest** on local **without asking** (later Last updated date; Change Log table with the later newest row Date; equal newest Date → keep local rows and add any extra Confluence rows)
- Walk each **other** content gap and each **open** comment **one by one** (both kinds)
- Apply **take Confluence** / **Resolve** to the **local** file first; **Resolve** also **closes** the comment on Confluence (does not delete it)
- If there is no Confluence page, skip compare (first publish)

### 7. Ask where to publish

**First publish (no page found):**

- **Catalog / multi-file run:** ask **once** the first time a create needs a destination. Reuse that space/parent for every later create in this run. Do **not** ask again per file.
- **Named single file:** ask before creating.

> Where should I publish this PRD on Confluence?
> - Space name or key
> - Optional: parent page title or URL
> - Or paste a Confluence space / parent link

Suggest rows from [config/confluence-projects.md](config/confluence-projects.md) if helpful. Wait for the user’s choice — never default to personal space or auto-pick.

**Page already found:**

- **Catalog / multi-file run:** update that existing page as a new version. Do **not** confirm each page.
- **Named single file:** confirm **update of that existing page** (space/parent only if moving).

Do **not** offer creating a separate page unless the user explicitly wants a fork.

### 8–10. Write Confluence only if still different

After compare (Change Log / Last updated already auto-resolved to the most latest on local), if local content matches the Confluence PRD content (ignoring wiki chrome, the Change Log row this publish would add, Header → Confluence, Header → Jira, and skip-review Header Figma / API Spec `N / A` vs wiki `TBD`): **skip** the content write except (1) a Header Figma / API Spec `N / A` write when wiki is still `TBD` and (2) a Change Log / Last updated write when wiki is still older than local after auto-resolve (no extra ask; **no** Change Log row if that is the only body change besides Header → Confluence). Tell the user it already matches. **Still run Header → Confluence fill** (below). If that fill changes local or the wiki is missing the row / has the wrong id: update the page; **no** Change Log row for a URL-only fill. Do **not** fill Header → Jira from the AIDR board.

If it still differs, or there is no page yet, follow [reference/publish-to-confluence.md](reference/publish-to-confluence.md):

- Rewrite Header Links to Confluence URLs (never local files)
- Append **one** §1 Change Log row, then publish that body
- Create **or** update (never duplicate)
- **Always** run Header → Confluence fill after the page exists (required — do not skip). Do **not** fill Header → Jira from the AIDR board.
- First publish: create the page, then fill Header → Confluence from the new `webUrl` / page id, then **update** the page so the wiki body has the link
- Preserve remaining **open inline** comments (HTML update, not a markdown overwrite that drops them). Page-level comments are not body-anchored.
- Return this PRD’s URL in chat

Do **not** return success while Header → Confluence is empty, `TBD`, `N / A`, or missing on the **local** file or the **wiki** body.

**Change Log (required before Confluence write when writing):**

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| YYYY-MM-DD (today) | First publish to Confluence **or** Updated on Confluence | Header → Owner (PM) | Short why (e.g. initial publish; material AC/scope update) |

- First time §1 has no rows → Change = `First publish to Confluence`
- Later publishes → Change = `Updated on Confluence` (plus brief note if useful)
- Do **not** add Change Log rows from `generate-prd` or other local-only edits. `design-prd-consistency` may already have added `Updated from design` rows — keep those.

**Republish rule:** If search finds the same PRD title/id, use **`updateConfluencePage`**. Never create a duplicate page for the same PRD.

**Header → Confluence (required — local and wiki, after the page exists):**

Shape: `[PRD: <H1 title>](<webUrl>)`. Row sits **below Figma**. Add the row if missing.

This is a **post-condition**, not optional. Run it on every PRD in the run, including skip-if-match.

| Situation | Action |
|-----------|--------|
| First publish (new page) | After `createConfluencePage`, write the URL into **local** Header → Confluence, then `updateConfluencePage` so the wiki body has the same link |
| Local cell empty / `TBD` / `N / A` / missing row | Write the current page URL into **local**, then update the wiki body |
| Wiki body missing the row, or wiki cell empty / `TBD` / `N / A` | Update the wiki body with the current page URL (write local first if needed) |
| Page id in the cell ≠ current page id | Replace local and wiki with the current page URL |
| Local and wiki both already have this page’s URL (same page id) | Leave the cell unchanged |

Do **not** put this PRD’s own page URL in Header → Links.

**Done check:** local Header → Confluence is a real page URL for **this** page, and the wiki Header shows the same. If not: fill and update; do not finish.

**Header → Jira (not filled — local and wiki):**

Leave `—` unless the user gave a ticket. Do **not** write a PRD / Design / Implementation list. Do **not** search the AIDR board to populate this field. Ticket linking by slot can be added later. See [reference/fill-header-jira.md](reference/fill-header-jira.md).

If the row is missing, add it below Confluence with `—`. Do **not** treat an existing three-line wiki cell as something this skill must keep or rewrite on skip-if-match. A normal content write uses the local cell as-is.

**Comments:** Before updating an existing page, check **open** page-level and inline comments (compare child already walked them). If any **open inline** comments remain, **do not** overwrite the body with markdown. Prefer HTML fetch → edit → update with `contentFormat="html"`, or ask the user first. **Resolve** during compare closes the comment on Confluence; it does not delete it.

### 11. Commit and push (same `publish-prd` run)

After all PRDs in this run have finished Confluence work, follow [children/commit-and-push/SKILL.md](children/commit-and-push/SKILL.md).

- Confluence first, git second
- Commit only the PRD files this run changed
- Push to `origin` (`https://github.com/nandong-tech/product-management.git`). If origin is missing, ask for the remote URL
- Do **not** skip git because Confluence was skipped as a match, if local still changed from the compare or from a Header → Confluence fill
- Do **not** commit if Confluence write failed
- Git never writes Confluence

**Catalog summary (required when more than one PRD):** before git, list each file as created / updated / matched / blocked (product TBD) with the Confluence URL when a page exists.

## Related parent skills

- `generate-prd` — create/update local PRDs (does not publish; leaves §1 Change Log empty)
- `design-prd-consistency` — design-driven local update; may add an `Updated from design` §1 row (does not publish)
- `review-prd` — optional during publish; run only when the user says Yes at the review ask
- `relate-prds` — map PRD links

## Additional resources

- Compare child (internal): [children/compare-confluence/SKILL.md](children/compare-confluence/SKILL.md)
- Commit/push child (internal): [children/commit-and-push/SKILL.md](children/commit-and-push/SKILL.md)
- Publish steps: [reference/publish-to-confluence.md](reference/publish-to-confluence.md)
- Header Jira (deferred): [reference/fill-header-jira.md](reference/fill-header-jira.md)
- Space / Jira board: [config/confluence-projects.md](config/confluence-projects.md)
- Review skill: [../review-prd/SKILL.md](../review-prd/SKILL.md)
- Invocation: [../shared/invocation.md](../shared/invocation.md)
- Example run: [examples/publish-run.md](examples/publish-run.md)
