# Example: publish-prd run

## Catalog (no path)

User:

```text
publish-prd
```

Agent:

1. Loads every AIDR PRD under `prebuilt_prds/` (not only the last file in chat).
2. Asks once: run `review-prd`? User says **No** → skip review for **all** files. Writes Header Figma / API Spec `TBD` → `N / A` on each file that needs it. Does not ask again.
3. For each PRD, in filename order: readiness gate → find Confluence page → compare (Change Log / Last updated: most latest without asking; or first publish) → write only if still different → fill Header → Confluence.
4. First create in the run: asks destination once; reuses it. Existing pages: update without per-page confirm.
5. Leaves Header → Jira as `—` unless the user gave a ticket.
6. After the last PRD: commits the PRD files this run changed and pushes to `origin`.

## Named file

User:

```text
publish-prd prebuilt_prds/LF-S-055-my-account-home.md
```

Agent:

1. Asks once: run `review-prd`? User says **No** → skip review; auto-fill Header Figma / API Spec `TBD` → `N / A` if needed.
2. Readiness gate on that file.
3. Finds the Confluence page (Header → Confluence URL, or search for `LF-S-055` / the PRD title; no mapping file).
4. If a page exists: if Change Log or Last updated differs, uses the most latest without asking; walks each other content gap and each **open** page-level and inline comment one by one; writes accepted wiki edits into the local file; **Resolve** closes the comment on Confluence. Confirm update of that page.
5. If local still differs: Change Log row, then create or update Confluence. If it matches: skip the content write.
6. Fills Header → Confluence with this PRD’s page URL on local and wiki if empty/`TBD`/missing/wrong page id (create → fill → update on first publish). Does not finish until that field is a real URL.
7. Leaves Header → Jira as `—` unless the user gave a ticket. Does not fill PRD / Design / Implementation from the AIDR board.
8. Commits only `prebuilt_prds/LF-S-055-my-account-home.md` (if it changed) and pushes to `origin`.
