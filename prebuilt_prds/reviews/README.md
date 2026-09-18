# PRD review records

`review-prd` writes Ready reviews here. `publish-prd` uses them only when the user chose **Yes** at the review ask:

```
prebuilt_prds/reviews/<PROJECT>-<TYPE>-<NNN>-review.md
```

Example: `prebuilt_prds/reviews/LF-S-001-review.md`

Only **Ready** reviews (no open Critical) should be saved here. If the user skipped review during publish, a file here is not required.
