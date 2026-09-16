# Design vs PRD comparison (design-prd-consistency)

Use after the PRD file and design source are known. List **business-rule** gaps only. Skip visual-only diffs unless the PM already made them product rules (authoring-rules §2e).

## What to inspect

From the design (Figma inventory / screenshot):

- Screen or journey name
- Visible sections and fields (labels, required/optional if shown)
- Buttons and other actions, including icon-only controls
- Empty, success, and error components that imply a product rule
- Destinations implied by CTAs (name only — do not spec the other page)
- For **journey** frames: step order and branches that belong in §4 mermaid

From the PRD:

- §3a–c (and §3d–e only if not `N / A`)
- §4 mermaid (journey) or `N / A` (page)
- §5–6 coverage for this page / journey
- §7 dynamic fields (flag only; do not invent mappings)

## Item types

| Type | When to log |
|------|-------------|
| **Inconsistency** | Same control/rule exists in both, but they disagree (label, destination, state, who sees it, happy-path outcome) |
| **Design update** | Design added, removed, or changed a control/rule the PRD does not yet reflect |

Tag the **PRD ID** on the item when the change belongs to a child screen, not the journey file.

## Categories (scan all)

1. **Added in design** — control, field, state, or step the PRD omits
2. **Removed in design** — still required or described in the PRD
3. **Changed copy / CTA** — visible label that the PRD names (ask before rewriting a convention such as **Continue** vs **Next**)
4. **Changed destination** — CTA hand-off target differs; keep `(PRD TBD)` if the destination PRD does not exist
5. **Changed fields / data** — dynamic or user-entered fields added/removed/renamed
6. **Changed who sees what** — logged in vs guest, cohort, empty vs populated
7. **Journey path** — mermaid steps/order/branches vs design flow (journey PRDs only)
8. **Scope** — design shows something on this page that §3c already marks out of scope, or the reverse if the user previously confirmed it

## Do not list

- Layout, stacking, spacing, alignment, color, typography, breakpoints
- Chevrons or icons used only as decoration
- Checkbox / toggle / hover / highlight **look**
- API failure, timeout, network, empty required field, bad number format, quantity-input mechanics, app killed / cache cleared, loading while an API is in progress (whole page on arrival, or on the existing page after an action button), a second tap of that action while its call is in progress — those stay in shared general context unless the design shows a different loading treatment for that page or action
- Other-page behavior (name the hand-off only)
- Brand / marketing artwork unless the user asked for brand-specific rules

## Item write-up (for the walkthrough)

For each listed item, be ready to say:

- **Design:** what is on the frame
- **PRD today:** section + current wording (or “not specified”)
- **Proposed edit:** which section(s) and the product-rule change — not how it looks
