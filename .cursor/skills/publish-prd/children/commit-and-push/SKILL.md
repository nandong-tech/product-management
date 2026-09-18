---
name: commit-and-push
disable-model-invocation: true
description: >-
  INTERNAL child of publish-prd. After Confluence write (or skip-if-match),
  commits only the PRD files this run touched and pushes if origin exists.
  Does not publish to Confluence. Not a user entry.
---

# Commit and push (internal child)

**Not user-facing.** Users invoke `publish-prd`. This file is loaded by that parent **after** Confluence work for this run.

Git saves the **local** PRDs that this publish run already wrote or updated. Git does **not** update Confluence. Do **not** run this child because of a manual commit. Do **not** start publish from git.

## When to run

Run once at the end of the `publish-prd` run (after all PRDs in the run have been compared and Confluence writes attempted).

**Run when** at least one of these is true:

- A Confluence create/update **succeeded**
- Compare wrote accepted wiki edits into a local PRD (even if Confluence content write was skipped because it then matched)
- Header → Confluence was filled or corrected on a local PRD

**Do not run when:**

- Confluence write **failed** (leave the working tree; do not commit as published)
- Nothing in this run changed a local PRD file

## What to commit

Only files this publish run changed, typically:

- The `prebuilt_prds/….md` or `project_prds/….md` file(s) this run published or auto-filled
- Header Links rewrites and Header → Confluence fills in those same files

Do **not** `git add` the whole repo. Do **not** add unrelated staged files, `.env`, credentials, or `confluence-mapping.json` as part of this child.

## Commit

1. `git status` and `git diff` for the files above
2. Stage **only** those files
3. Commit with a short message that says why (publish to Confluence / take wiki edits). Use a HEREDOC. Example:

```
git commit -m "$(cat <<'EOF'
Publish prebuilt PRDs to Confluence.

EOF
)"
```

4. Do **not** skip hooks. Do **not** amend unless the parent skill’s git safety rules allow it. Do **not** force push. Do **not** change git config.

If there is nothing to commit after staging, stop. No empty commit.

## Push

Confirm remotes with `git remote -v`. This project’s origin is `https://github.com/nandong-tech/product-management.git`.

1. If `origin` exists: `git push -u origin HEAD` when this branch has no upstream; otherwise `git push`
2. If **no origin**: ask for the remote URL. If the user gives one, `git remote add origin <url>` then push. If they do not, leave the commit local and say so
3. Do **not** invent a remote. Do **not** force push. Do **not** push to another project’s repo

## Return to parent

- Commit hash (or “nothing to commit”)
- Pushed: yes / no / no origin
- Confluence URLs already returned by the parent stay in chat
