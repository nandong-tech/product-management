---
name: compare-confluence
disable-model-invocation: true
description: >-
  INTERNAL child of publish-prd. Compares a local AIDR PRD to its Confluence
  page body, page-level comments, and inline comments. Change Log and Last
  updated use the most latest without asking; other gaps walk one by one.
  Not a user entry — do not invoke directly.
---

# Compare local PRD to Confluence (internal child)

**Not user-facing.** Users invoke `publish-prd`. This file is loaded by that parent.

Compare **this** local PRD to the Confluence page found by search or a pasted URL. People can edit Confluence and leave **page-level** (footer) comments and **inline** (anchored) comments. The point is to take wiki updates into the local file **before** local is written back to Confluence.

Do **not** use `prebuilt_prds/confluence-mapping.json`. Do **not** compare to git. Do **not** publish. Do **not** run design compare.

## When there is no Confluence page

Skip compare. Tell the parent this is a first publish. The parent creates the page later.

## Fetch

1. Load the Confluence page body (prefer HTML if **inline** comments may exist)
2. Load **open** comments of **both** kinds via `executeRead` → `listConfluenceComments` (paginate until done):
   - Page-level: `comment-type: "footer"`
   - Inline: `comment-type: "inline"`
   - Both calls: `resolution-status: "open"`, `include-replies: true`, `body-format: "markdown"`, `content-type: "page"`, `content-id` = page id
3. Read the local markdown file

Do **not** skip footer comments. Do **not** walk already **resolved** comments.

`getConfluencePageInlineComments` is not enough — it misses page-level comments.

## What to compare

Compare AIDR **content**, not markup.

**In scope:** title; Header fields other than Last updated; §3a–e; §4 mermaid or `N / A`; §5 ACs; §6 ECs; §7 mapping or `N / A`.

**Auto-resolve (do not ask):** §1 Change Log and Header → Last updated. If local and Confluence differ, use the **most latest** and write it into **local**. Do **not** walk these as keep-local / take-Confluence / edit.

- **Last updated:** use the later `YYYY-MM-DD`. If only one side has a date, use that. If the dates are equal, keep local.
- **Change Log:** use the table whose newest row **Date** is later. If those newest Dates are equal, keep local’s rows and add any Confluence row that local does not already have (same Date + Change + Owner + Rationale counts as already have). Sort by Date. Ignore a §1 row this publish would add.

**Out of scope (do not walk these as gaps):**

- HTML vs markdown, tables vs wiki tables, spacing, macros, info banners
- §1 Change Log and Header → Last updated (auto-resolve above)
- A §1 Change Log row this publish would add
- Header → Confluence (this PRD’s own page URL; filled by the parent)
- Header → Jira (leave `—` unless the user gave a ticket; parent does **not** fill from the AIDR board)
- Header → Figma / API Spec after skip-review auto-fill (`TBD` → `N / A` on local; do not walk that as a gap — parent writes `N / A` to wiki on content write)
- This PRD’s own Confluence URL in Header Links (it is not stored there)

## What to list

Two lists:

1. **Content gaps** — local says X, Confluence says Y (section + short quote)
2. **Open comments** — kind (**page-level** or **inline**), author, quote (inline only), comment text, replies if any, where it sits

If both lists are empty (after auto-resolving Change Log / Last updated), tell the parent: **content match**. Say whether wiki Change Log or Last updated is still older than local (parent writes those to wiki with **no** extra Change Log row). The parent **must not** rewrite other PRD content, **except** it still fills Header → Confluence if local or wiki is empty / `TBD` / missing / wrong page id. Do **not** fill Header → Jira from the AIDR board.

## Walk one by one

Do **not** batch decisions. Show **one** item, wait, then the next. Do **not** ask about §1 Change Log or Header → Last updated.

For each **content gap**, ask:

> Keep **local** / take **Confluence** / **edit** (user supplies the wording)

For each **open comment** (page-level and inline), ask:

> **Resolve** (change the local PRD if needed, then **close** the comment on Confluence) / **leave** open

Treat **resolve**, **address now**, and **close** as **Resolve**. Treat **leave** as leave open.

Apply immediately:

- Take Confluence or an edit → write that into the **local** file
- **Resolve** → write any local PRD change the comment requires; then **close** the comment on Confluence with `executeWrite` → `updateConfluenceCommentResolution` (`resolved: true`, `commentId` of the top-level comment, `commentType: "footer"` or `"inline"`). The comment stays on the page as **resolved**. It is **not** deleted. If no PRD change is needed, still close it.
- **Leave** → no local change; comment stays **open**
- **Delete** the comment only if the user explicitly says to delete it (not the same as resolve)

Then continue to the next item.

## After the walkthrough

Return to the parent:

- Local file path (updated if anything was taken from wiki, including auto-resolved Change Log / Last updated)
- Whether Confluence **content** still differs from local (excluding auto-resolved Change Log / Last updated until wiki is written)
- Whether wiki Change Log or Last updated is still older than local (parent syncs those without asking and without an extra Change Log row if that is the only remaining difference)
- Whether Header → Confluence still needs a fill (local or wiki empty / `TBD` / missing / wrong page id)
- Comments still **open** on the page, split by **page-level** vs **inline** (so the parent preserves remaining **open inline** anchors on update)

If local now matches Confluence **content** (after auto-resolve), the parent **must not** rewrite that content. The parent **must** still fill Header → Confluence when local or wiki is empty / `TBD` / missing / wrong page id, and **must** still write local’s later Change Log / Last updated to wiki when wiki is older. Do **not** fill Header → Jira from the AIDR board.
