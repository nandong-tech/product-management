# PRD review checklist

## Telecom domain fit

See [../../shared/telecom-domain.md](../../shared/telecom-domain.md) and [../../shared/general-context.md](../../shared/general-context.md) (product-wide rules — e.g. the generic error message is defined there, not in each PRD).

- [ ] Uses telecom-appropriate journeys/language (not generic SaaS patterns)
- [ ] Acquisition / activation / login separated when relevant
- [ ] SIM/eSIM, MSISDN, plan/pack concepts used correctly if in scope
- [ ] Brand visuals not mistaken for product requirements (unless requested)

## Clarity

- [ ] Wording is concise. Asides are in the sentence, not in parentheses, except required ID forms such as `Welcome (LF-S-001)` and `(PRD TBD)`.
- [ ] §3a Central requirement is a **high-level requirement summary** (not mix rules, field lists, or AC-level detail)
- [ ] Problem is specific and evidence-backed (or assumptions labeled)
- [ ] Goals are outcome-oriented — what the user **accomplishes** on the screen, not what each button does
- [ ] Goals cover on-page accomplishments only; Non-Goals are items **on this page/journey** that are out of scope — **no other pages** in Non-Goals (`N / A` if none)
- [ ] Non-goals prevent scope creep

## Completeness

- [ ] Primary users and use cases defined
- [ ] Functional requirements cover the happy path and key edges
- [ ] Non-functional needs covered (perf, security, a11y, i18n as relevant)
- [ ] Success metrics are measurable
- [ ] Dependencies and risks listed
- [ ] Open questions are explicit

## Quality of requirements

- [ ] Requirements are testable (pass/fail clear)
- [ ] Priorities are set (Must / Should / Could)
- [ ] No conflicting requirements
- [ ] Acceptance criteria implied or stated
- [ ] Header **Channels** is `App` or `App + Web`; §5–6 cover those platforms without redundant platform stamps; platforms named only when App and Web differ
- [ ] Everyday product language (no UX/engineering jargon)
- [ ] No design designations (layout, chevron, colors, breakpoints, UI control look) unless purposely included. **Fail** if an AC specifies checkbox checked / empty / dash, hover, or highlight instead of the business rule
- [ ] Page PRD ACs stop at this page / hand-off (no other-page actions)
- [ ] §5–6 self-contained on this page/journey only (no other-page expansion)
- [ ] §5 is happy path only — what user sees, what user can do, successful action outcomes. **Fail** if an AC Then has missing data, “when present”, placeholder if missing, error copy, or a blocked action. Those belong in §6.
- [ ] Journey PRD: §5 and §6 only cover what is **not** already in the §4 mermaid
- [ ] §5 does **not** restate arrival / §3d Entry points (no “takes entry → this screen is shown” ACs)
- [ ] §5 / §6: one **action** (same Given+When click / state change) → one row; sibling action outcomes merged. Complex pages split see-ACs: skeleton first, then per-section
- [ ] Long multi-outcome Then / Expected behavior cells use bullet points (`<br>`-separated) when a single sentence would be hard to read
- [ ] §6 lists extreme cases and feature-specific negatives — not happy-path success
- [ ] Unhandled API error codes, API failure, timeout, network/slow network, empty or incomplete required fields, incorrect number format, image load failure (placeholder), and loading while an API is in progress (whole page on arrival, or on the existing page after an action button, including that the action cannot be selected again until that call finishes) are **not** in PRD §5/§6 (live only in [general-context.md](../../shared/general-context.md)), unless that page or action’s loading is different from the shared default
- [ ] Front-end field errors trigger when the user **leaves the field**, not only on submit / Checkout / Buy now / Add to cart
- [ ] **Leave and return (when needed):** If the feature has time-bound or attempt-bound state (lockout, rate limit, in-progress verification, etc.), remind the writer to cover what happens when the user **leaves the flow and comes back** — or confirm it is not needed. Do not invent leave/return for every PRD.

## Alignment

- [ ] Scope matches stated goals
- [ ] Related PRDs referenced where relevant
- [ ] Cross-screen / journey hand-offs include PRD IDs (or `(PRD TBD)`); no bare destination names when an ID is known
- [ ] Ownership and status fields filled
- [ ] **Pending PRD links:** Checked [`prebuilt_prds/pending-prd-links.md`](../../../../prebuilt_prds/pending-prd-links.md) for this PRD — open pending rows noted in the review; if a destination PRD now exists, Links / pending table updated (or flagged); §3e hand-offs to missing PRDs appear in the pending table

## Cross-PRD conflicts (required)

See [../reference/cross-prd-conflicts.md](../reference/cross-prd-conflicts.md). Compare against other `prebuilt_prds/*.md` (same PROJECT preferred).

- [ ] **Already covered:** No unjustified duplicate of another PRD’s in-scope screen, journey step, or AC/EC; hand-offs name destinations only (no other-page behavior restated)
- [ ] **Contradictions:** No conflicting outcomes, error copy, lock/rate-limit rules, entry/exit pairs, In vs Non-Goal for the same concern, Channels, or auth assumptions vs peers
- [ ] **Journey ↔ screen:** Parent journey mermaid agrees with child screen primary CTA / hand-offs where both exist (page §3d–e may be `N / A`)
- [ ] **§3d–e discipline:** Page PRD uses `N / A` for entry/exit; journey uses `N / A` when mermaid already shows start/end (do not flag missing tables in those cases)
- [ ] **References:** Cited PRD IDs exist (or are pending); no stale renamed IDs. Header **Links** is shared context + page template only (Confluence URLs, never local `.md` paths) unless the user asked to add more — do **not** flag missing related-PRD Header Links; **do** flag local-file Header Links
- [ ] **General context:** Does not contradict [general-context.md](../../shared/general-context.md) or re-own product-wide generic errors, quantity input, or app-killed / cache-cleared entered-values cases in §6
- [ ] **Conventions:** CTA labels follow generate-prd authoring-rules §2f (**Next** for progress-only; action-specific when the tap does a named action) and align with peers unless a confirmed exception. Shopping Cart is one universal cart, not per offer category or purchase flow. The Header owns the cart icon that opens Shopping Cart; do not flag missing open-cart controls on other screens. Physical SIM cannot be checked out with other offer types. An eSIM checkout is only one eSIM at quantity **1**. Data offers cannot be checked out with SIM offers. Shopping Cart decrease at quantity 1 stays available and confirms delete; do not flag that as a clash with Offer detail, where decrease is disabled at 1. Quantity field input is shared context; do not flag a missing stepper, direct-edit, or integers-only AC or EC.
- [ ] **Template / §7:** Page-template link matches back behavior; data mappings do not clash with a peer for the same field/action
- [ ] Findings written under **Cross-PRD conflicts** in the review (or **None found** after search)

## Readiness for kickoff

- [ ] Enough detail for engineering estimation
- [ ] Design / research gaps flagged
- [ ] Launch / rollout considerations noted if relevant
- [ ] Critical cross-PRD conflicts resolved (or Verdict is not Ready)
- [ ] If Verdict is not Ready (or Open questions remain): walk through open items **one by one** after the review write-up — one item per turn, apply the confirmed fix, then the next item