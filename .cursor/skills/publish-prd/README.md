# Publish PRD

**Main entry:** start with **`publish-prd`**.

With **no path**, walks **every** AIDR PRD under `prebuilt_prds/` against Confluence, one by one. Named files publish only those. Does not generate PRDs (`generate-prd` does that).

**Review:** the agent **asks once** whether to run `review-prd`. If the user says **no**, skip review for **every** PRD in the run; write Header Figma / API Spec `TBD` as `N / A` without asking again. If **yes**, continue each PRD only when Verdict is **Ready** (no open Critical).

**Compare:** load the Confluence page (Header → Confluence URL, search by title / PRD id, or a pasted URL). If Change Log or Last updated differs, use the **most latest** without asking. Walk other content gaps and **open** comments one by one — **page-level** and **inline**. Apply accepted wiki edits to **local**. **Resolve** closes the comment on Confluence (does not delete it). Then write local to Confluence **only if it still differs**. Always fill Header → **Confluence** with this PRD’s page URL on local and wiki (skip only when both already have this page’s URL). Do **not** fill Header → **Jira** from the AIDR board (`—` unless the user gave a ticket). Do not use `confluence-mapping.json`. Do not publish from git.

**Readiness gate:** `N / A` is accepted. Product `TBD` or empty required sections block **that** PRD (catalog run continues with the next). Header → Confluence (`TBD` / empty is filled on publish). Header → Jira is not filled. After skip-review, Header Figma / API Spec `TBD` is already `N / A`.

**Destination:** ask **once** when the first create needs a space/parent; reuse for later creates. Catalog run updates existing pages without per-page confirm. Named single file: confirm update.

**Git (same run, after Confluence):** commit only the PRD files this run touched; push to `origin` (`https://github.com/nandong-tech/product-management.git`). If there is no origin, ask for the remote URL.

Config suggestions: [`config/confluence-projects.md`](config/confluence-projects.md)

Example run: [`examples/publish-run.md`](examples/publish-run.md)
