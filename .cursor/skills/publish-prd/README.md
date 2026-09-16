# Publish PRD

**Main entry:** start with **`publish-prd`**.

Publishes an existing file under `prebuilt_prds/` to Confluence. Does not generate PRDs (`generate-prd` does that).

**Review gate:** `review-prd` must have passed with Verdict **Ready** (no open Critical) before publish — even while `review-prd` is still being refined.

**Readiness gate:** `N / A` is accepted. Any `TBD` or empty required section blocks publish — ask the user to finish those parts or set intentional gaps to `N / A`.

Always asks **which Confluence space** (and optional parent) before creating/updating a page (after review + readiness pass).

Page ids for published PRDs live in [`../../prebuilt_prds/confluence-mapping.json`](../../prebuilt_prds/confluence-mapping.json). Publish reads that file first. It writes a key only when the page is new or the mapped id changed — unchanged mappings are left as-is.

Config suggestions: [`config/confluence-projects.md`](config/confluence-projects.md)
