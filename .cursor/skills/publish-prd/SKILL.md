---
name: publish-prd
description: >-
  Parent skill (user entry). Type "publish-prd" at the start of the message.
  Publish an existing local AIDR PRD from prebuilt_prds/ or project_prds/ to
  Confluence. Only runs when
  the user asks — does not run after generate-prd. Requires a prior successful
  review-prd (Ready, no open Critical). Also blocks publish if TBD or empty
  required sections remain (`N / A` is accepted). Always ask which Confluence
  space (and optional parent) before creating or updating a page. If already
  published, updates that page as a new Confluence version (never a duplicate).
---

# Publish PRD (parent)

**How to invoke:** User types `publish-prd` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md)

**Shared general context:** [../shared/general-context.md](../shared/general-context.md) — product-wide rules.

Publish an existing PRD under `prebuilt_prds/` or `project_prds/` to Confluence. Do **not** invent a new PRD here — use `generate-prd` for that.

**Never** publish unless the user invoked this skill (or explicitly asked to publish in a way that clearly means this skill). Do **not** offer publish as a follow-up after `generate-prd`.

**Prerequisites (both required):**

1. **`review-prd` passed** for this file — Verdict **Ready**, no open Critical findings (see Review gate below)
2. **Readiness gate** — no `TBD` and no empty required sections (`N / A` is valid and does **not** block)

## When to use

- User starts with `publish-prd …`
- User names a file under `prebuilt_prds/` (or the latest PRD in the conversation) and wants it on Confluence

## Workflow

```
Publish Progress:
- [ ] 1. Identify local PRD file
- [ ] 2. Review gate — review-prd Ready (block if missing / not Ready)
- [ ] 3. Readiness gate — no TBD / no empty required sections (`N / A` OK; empty Change Log OK until first publish)
- [ ] 4. Ask where to publish (space + optional parent) — required; if already published, confirm **update** of existing page
- [ ] 5. Authenticate Atlassian MCP if needed
- [ ] 6. Resolve existing Confluence page (mapping file → Change Log / title / PRD id) — update version if found; create only if none
- [ ] 7. Append §1 Change Log row for this publish (local file)
- [ ] 8. Create **or update** Confluence page (never duplicate)
- [ ] 9. Sync `prebuilt_prds/confluence-mapping.json` (add or correct page id only; skip if unchanged)
- [ ] 10. Rewrite Header Links to Confluence URLs (never local files); return this PRD’s URL in chat — do **not** write this PRD’s own page URL into Header Links
```

### 1. Identify local PRD

- Use the path the user gave, or the PRD just discussed
- If unclear, ask which `prebuilt_prds/….md` file
- Read the file; body must be clean AIDR markdown (no instruction blockquotes)

### 2. Review gate (required — before readiness / Confluence)

Publishing requires a completed **`review-prd`** for this PRD.

**Pass when all are true:**

| Check | Pass |
|-------|------|
| Review exists | Evidence of `review-prd` for **this** file (see Evidence below) |
| Verdict | **Ready** (not Needs revision / Blocked) |
| Critical | No open Critical findings (all fixed or explicitly closed in the review) |

**Evidence (any one):**

1. A review record file: `prebuilt_prds/reviews/<PROJECT>-<TYPE>-<NNN>-review.md` with Verdict **Ready** and date ≥ last material PRD edit, **or**
2. In **this** conversation: a full `review-prd` output for this file with Verdict **Ready** and empty/resolved Critical, **or**
3. User pastes a prior Ready review for this file and confirms nothing material changed since

**If the gate fails:**

1. **Stop** — do not publish and do not ask for Confluence space yet
2. Tell the user review is a prerequisite of publish
3. Ask them to run `review-prd <path>` (or offer to run the review skill now)
4. If review returns Needs revision / Blocked / open Critical: ask them to fix the PRD and re-review; only continue publish after a new **Ready** result

Do **not** treat “looks fine to me” or an unverified claim as a passed review. Do **not** skip this gate because `review-prd` is still being refined — run whatever checklist that skill currently has.

Note: `review-prd` may still be evolving; the publish gate still requires invoking it and getting **Ready**.

### 3. Readiness gate (required — before Confluence)

Scan the full PRD. **Do not publish** if any required content is still unfinished.

**Accepted (does not block):**

- **`N / A`** (also `N/A`) anywhere a field or section is intentionally not applicable — e.g. Header Figma, API Spec, §4 User Journey for page PRDs, **§3d Entry / §3e Exit** for page PRDs or journeys whose mermaid already shows start/end, a mapping row, or an exit that does not apply
- Filled tables / mermaid / concrete values

**Blocks publish:**

| Signal | Examples |
|--------|----------|
| Explicit TBD | `TBD`, `TBD — confirm with PM`, `TODO`, `?` used as a placeholder |
| Empty required sections | Blank §3d/§3e tables; blank §4 (neither mermaid nor `N / A`); empty §5 / §6 / §7 tables |
| Empty required Header cells | Feature, Status, Owner, Created, Last updated left blank |
| Empty required row cells | Entry/exit name or In/Out blank; AC Given/When/Then blank; EC columns blank |

**Does not block:** empty §1 Change Log (headers only, no rows) — publish rows are added in step 7. Existing `Updated from design` rows from `design-prd-consistency` do not block.

If the gate fails:

1. **Stop** — do not ask for Confluence space yet (or do not create/update the page)
2. List each blocking item (section + what’s wrong: TBD vs empty)
3. Ask the user to **finish** those parts or replace intentional gaps with **`N / A`**
4. Only continue after the file no longer contains blocking TBD/empty items

Do **not** publish while any `TBD` remains. Prefer **`N / A`** over TBD when something is intentionally out of scope or not applicable.

**Order:** Review gate → Readiness gate → destination ask. A Ready review does **not** waive TBD or empty-section readiness.

### 4. Ask where to publish (required)

Always ask before writing to Confluence (even if config has a mapping) — **only after** review + readiness gates pass.

**If Change Log shows a prior publish** (or search finds the same PRD title/id): ask to **confirm updating that page as a new version** (space/parent only if moving). Do **not** offer creating a separate page unless the user explicitly wants a fork.

Otherwise ask:

> Where should I publish this PRD on Confluence?
> - Space name or key
> - Optional: parent page title or URL
> - Or paste a Confluence space / parent link

Suggest rows from [config/confluence-projects.md](config/confluence-projects.md) if helpful. Wait for the user’s choice — never default to personal space or auto-pick.

### 5–10. Publish

Follow [reference/publish-to-confluence.md](reference/publish-to-confluence.md). Re-check review + readiness if the file changed since the gates.

**Republish rule:** If the PRD was published before (mapping file, prior Change Log publish row, or same title/PRD id in the space), use **`updateConfluencePage`** so Confluence keeps **one page with a new version**. Never create a duplicate page for the same PRD. Header Links stay page template + shared context only, and those links must be **Confluence page URLs** — never local `.md` / `.cursor/` paths. Rewrite any leftover local-file Header Links using [config/confluence-projects.md](config/confluence-projects.md) before writing the body. Do **not** put this PRD’s own Confluence URL into Header Links.

**Confluence mapping file** (`prebuilt_prds/confluence-mapping.json`) — after the page exists, keep the record in sync. Do **not** rewrite the file on every publish.

| Situation | Mapping file |
|-----------|----------------|
| Page exists and the mapped page id is already this page | Leave the file unchanged |
| Page exists but the mapped id is different (or the mapped id 404s) | Update that key to the page id just published |
| No record for this PRD | Add one key after create (or after first find) |

Key format: `prebuilt-prds/<filename>.md` → Confluence page id string. See [publish-to-confluence.md](reference/publish-to-confluence.md) Confluence mapping.

**Inline comments:** Before updating an existing page, check `getConfluencePageInlineComments`. If any exist, **do not** overwrite the body with markdown (that orphans comments as “content was deleted”). Prefer HTML fetch → edit → update with `contentFormat="html"`, or ask the user first. See [publish-to-confluence.md](reference/publish-to-confluence.md) Body rules.

**Change Log (required before Confluence write):** After destination is known and gates still pass, append **one** §1 row to the local PRD, then publish that body:

| Date | Change | Owner | Rationale |
|------|--------|-------|-----------|
| YYYY-MM-DD (today) | First publish to Confluence **or** Updated on Confluence | Header → Owner (PM) | Short why (e.g. initial publish; material AC/scope update) |

- First time §1 has no rows → Change = `First publish to Confluence`
- Later publishes → Change = `Updated on Confluence` (plus brief note if useful)
- Do **not** add Change Log rows from `generate-prd` or other local-only edits. `design-prd-consistency` may already have added `Updated from design` rows — keep those.

## Related parent skills

- `generate-prd` — create/update local PRDs (does not publish; leaves §1 Change Log empty)
- `design-prd-consistency` — design-driven local update; may add an `Updated from design` §1 row (does not publish)
- `review-prd` — **required** before publish
- `relate-prds` — map PRD links

## Additional resources

- Publish steps: [reference/publish-to-confluence.md](reference/publish-to-confluence.md)
- Page ids: [../../prebuilt_prds/confluence-mapping.json](../../prebuilt_prds/confluence-mapping.json)
- Space suggestions: [config/confluence-projects.md](config/confluence-projects.md)
- Review skill: [../review-prd/SKILL.md](../review-prd/SKILL.md)
- Invocation: [../shared/invocation.md](../shared/invocation.md)
