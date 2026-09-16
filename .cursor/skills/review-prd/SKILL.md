---
name: review-prd
description: >-
  Parent skill (user entry). Type "review-prd" at the start of the message.
  Review AIDR PRDs for clarity, completeness, testability, telecom-domain
  alignment, and conflicts with other existing PRDs (duplicate coverage,
  contradictions, and related clash scenarios). Required before publish-prd
  (Verdict Ready, no open Critical).
---

# Review PRD

**How to invoke:** User types `review-prd` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md) — review against telecom operator conventions (not generic app patterns).

**Shared general context:** [../shared/general-context.md](../shared/general-context.md) — product-wide rules; do not flag missing generic-error ECs in a PRD (API failure / unhandled error code belong only in general context).

**Publish prerequisite:** `publish-prd` will **not** publish to Confluence unless this skill has completed for that PRD with Verdict **Ready** and no open Critical findings. Keep improving this skill’s checklist over time; the publish gate still requires running the current review.

## When to use

- User shares a PRD path or paste and asks for review
- User wants a gap analysis or readiness check before engineering kickoff
- User is preparing to `publish-prd` (review must pass first)

## Instructions

1. Read the full PRD (and linked related PRDs if present)
2. Score and comment using [checklists/review-checklist.md](checklists/review-checklist.md)
3. Also check against `generate-prd` authoring rules when reviewing AIDR files: [../generate-prd/reference/authoring-rules.md](../generate-prd/reference/authoring-rules.md) (TBD placeholders, §3a–c split, §3d–e when required / `N / A` for page and mermaid-covered journeys, §4 `N / A`, etc.)
4. **Cross-PRD conflicts (required):** Compare this PRD to other files under `prebuilt_prds/` and `project_prds/` (when present) using [reference/cross-prd-conflicts.md](reference/cross-prd-conflicts.md). Check at least:
   1. **Already covered** — content already owned by another PRD (duplicate / overlapping scope)
   2. **Conflicts** — statements that contradict another PRD (outcomes, copy, rules, entry/exit, scope, channels, auth)
   3. **Other clash scenarios** — broken/one-way references, pending vs exists, journey↔screen mismatch, general-context violations, CTA convention drift, template mismatch, §7 mapping clashes, orphan/double parent, ID rename drift
   - Cite peers as **`ID — Feature`**. Put Critical conflicts in Critical; Important overlaps/soft clashes in Important. If none after a real search, write **None found** under Cross-PRD conflicts.
5. **Pending PRD links:** Read [`prebuilt_prds/pending-prd-links.md`](../../../prebuilt_prds/pending-prd-links.md). For the PRD under review:
   - List any **pending** rows where this PRD is the **source** (destination not written yet) — note them under Nice-to-have or Open questions; do **not** block Ready solely because a destination PRD is still TBD
   - If a destination that was pending **now exists** under `prebuilt_prds/` but the pending table was not updated, flag as **Important** and tell the writer to clear/update the pending row and name the destination **ID in §5–6**. Do **not** ask to add that destination to Header **Links**. Header Links stay **shared context + page template only** (Confluence URLs, never local files) unless the user explicitly asks to add more.
   - If §3e names a hand-off whose destination PRD does not exist and the hand-off is **missing** from `pending-prd-links.md`, flag as **Important** and ask to add a pending row
6. **Leave and return:** Remind the writer to consider whether the PRD needs to cover what happens if the user **leaves the flow and comes back** (e.g. lockouts, rate limits, in-progress state). Flag as Important when the feature has time-bound or attempt-bound state and §6 is silent on return. Only require it when it matters for this feature — do not invent leave/return for every screen.
7. Separate findings into: Critical / Important / Nice-to-have
8. Suggest concrete edits (do not only list problems). Prefer fixing **this** PRD; only edit peers when the user asks.
9. Optionally apply fixes if the user asks to update the PRD
10. **Walk through open items one by one** when the review is **not Ready**, or when **Open questions** remain. After the written review, start the walkthrough in the **same turn**. Do **not** leave the user with only a list of questions.
11. **If Verdict is Ready:** save a short review record for publish evidence:

```
prebuilt_prds/reviews/<PROJECT>-<TYPE>-<NNN>-review.md
```

Include: PRD path, review date, Verdict **Ready**, empty Critical (or “none”), cross-PRD conflict result (**None found** or resolved), pending-link note if any rows still open for this PRD, and a one-line summary. Overwrite on re-review.

**If Verdict is Needs revision or Blocked:** do **not** write a Ready record; tell the user publish is blocked until Critical items are fixed and review is re-run. Then **walk through open items one by one** (see below).

**Critical cross-PRD conflicts block Ready** the same as other Critical findings.

## Walk through open items one by one (required when not Ready)

After the review write-up, if anything still needs a PM decision or a PRD edit, **go through those items one at a time**. Do not ask every open question in one message.

**Open items** (in this order):

1. **Critical** findings that need a decision or a confirmed fix
2. **Important** findings that need a decision or a confirmed fix
3. **Open questions to resolve**
4. **Nice-to-have** only if they need a decision; otherwise skip or mention once at the end

**Each turn, do exactly one item:**

1. Name the item (short). Say what the PRD does today.
2. Ask one clear question, with options when the choice is bounded.
3. **Wait** for the user’s answer. Do not start the next item in the same message.
4. When they answer: apply the edit to **this** PRD if it is decided (peers only if they ask). Confirm in one or two sentences.
5. Then start the **next** open item the same way.

**Stop the walkthrough** when Critical and Important are resolved and no Open questions remain. Then say what is left (e.g. Nice-to-have, pending Payment PRD) and that a re-review is needed before `publish-prd`.

## Review output format

```markdown
# PRD review: [title]

## Verdict
Ready / Needs revision / Blocked — one sentence why.

## Critical
- …

## Important
- …

## Nice-to-have
- …

## Cross-PRD conflicts
### Overlap (already covered)
- … / None found

### Contradictions
- … / None found

### Other
- … / None found

## Pending PRD links
- Rows from `prebuilt_prds/pending-prd-links.md` for this PRD (or “none”)
- Any hand-off that should be added / cleared

## Suggested edits
- …

## Open questions to resolve
- …
```

### Verdict meanings (for publish)

| Verdict | May `publish-prd`? |
|---------|-------------------|
| **Ready** | Yes — after readiness gate also passes (no TBD / empty sections; `N / A` OK) |
| **Needs revision** | No — fix and re-review |
| **Blocked** | No — resolve blockers and re-review |

## Additional resources

- Checklist: [checklists/review-checklist.md](checklists/review-checklist.md)
- Cross-PRD conflicts: [reference/cross-prd-conflicts.md](reference/cross-prd-conflicts.md)
- Pending PRD links: [`prebuilt_prds/pending-prd-links.md`](../../../prebuilt_prds/pending-prd-links.md)
- Authoring rules (AIDR): [../generate-prd/reference/authoring-rules.md](../generate-prd/reference/authoring-rules.md)
- Relate map (optional aid): [../relate-prds/SKILL.md](../relate-prds/SKILL.md)
- Publish skill (requires this review): [../publish-prd/SKILL.md](../publish-prd/SKILL.md)
- Shared domain (telecom): [../shared/telecom-domain.md](../shared/telecom-domain.md)
- Examples: [examples/](examples/)
