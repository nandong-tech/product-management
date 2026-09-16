# Cross-PRD conflict checks (review-prd)

**Required** on every `review-prd` run. Compare the PRD under review against other AIDR PRDs under `prebuilt_prds/` and `project_prds/` when present (exclude `*/reviews/` and `pending-prd-links.md`). Prefer same **PROJECT** prefix; still note cross-project clashes when hand-offs name them.

Do **not** invent conflicts. Cite the other PRD as **`ID — Feature`** and the section/AC/EC that clashes.

---

## How to search

1. Read the PRD under review (central requirement, Goals, Non-Goals, entry/exit, §4, §5–6).
2. Scan `prebuilt_prds/*.md` for: same or near Feature name/slug; shared screens or CTAs; overlapping journey steps; matching error copy; hand-off IDs named in §3d–e / §5–6.
3. Deep-read any likely peers (same journey, adjacent screens, shared error/lockout rules, parent **J** vs child **S**).
4. Optionally use `relate-prds` relationship types (`conflicts-with`, `related`) if a map already exists — still verify from source text.

---

## 1. Already covered (duplicate / overlapping scope)

Flag when this PRD restates behavior that another PRD **already owns**.

| Signal | What to look for |
|--------|------------------|
| Same screen | Two **S** PRDs describe the same UI surface as in-scope |
| Same journey step | Two **J** PRDs (or J + S) own the same happy-path step |
| Same AC/EC | Identical or near-identical Given/When/Then or error popup already specified elsewhere |
| Scope swallow | This PRD expands into another page’s Goals / ACs that belong only on that page |
| Template chrome | Screen PRD restates page-template (**P**) back/chrome rules that Header Links already own |

**Severity**

- **Critical** — full duplicate of another in-scope PRD (same feature restated as a second owner), or overlapping ACs that would double-implement
- **Important** — partial overlap; clarify ownership / trim / link instead of re-specifying
- **Nice-to-have** — intentional brief hand-off naming that could be tightened

**Not a conflict:** Naming a hand-off destination with ID only (no destination behavior) — that is correct per authoring rules.

---

## 2. Direct conflicts (contradictions)

Flag when two PRDs cannot both be true.

| Signal | What to look for |
|--------|------------------|
| Opposite outcomes | Same trigger → different Then / exit (e.g. verified login → Dashboard vs Verify email) |
| Different copy | Same error/status case, different user-facing message or buttons |
| Different rules | Lock duration, attempt counts, rate limits, OTP length, PIN rules disagree |
| Entry/exit fight | A says exit to B; B denies that entry (or sends users elsewhere for the same action) |
| In vs out of scope | One PRD’s Goal/AC is another’s Non-Goal for the **same** on-page concern |
| Channels | Same surface required as App-only in one PRD and App + Web in another without an explicit split |
| Auth assumption | One PRD requires logged in; peer treats the same step as logged out (or opposite logout rules) |
| Journey vs screen | Parent **J** mermaid order/labels disagree with child **S** primary CTA / hand-offs (page §3d–e may be `N / A`) |

**Severity**

- **Critical** — engineers cannot implement both; user-visible outcome or shared business rule conflicts
- **Important** — soft inconsistency (wording, incomplete reciprocal links) that will confuse delivery
- **Nice-to-have** — minor naming drift with same meaning

---

## 3. Other conflicting scenarios

Check these whenever peers exist:

| Scenario | Why it matters |
|----------|----------------|
| **Broken or one-way references** | A cites B; B missing, wrong ID. Do **not** require reciprocal Header Links — Header Links is shared context + page template only (Confluence URLs, never local files) unless the user asked to add more |
| **Pending vs exists** | Hand-off still `(PRD TBD)` / pending table while destination file exists (or reverse: cites ID that does not exist and is not pending) |
| **Orphan / double parent** | Screen claimed by two journeys, or by none when a journey mermaid includes it |
| **ID / rename drift** | Old ID or feature title still used after rename |
| **Shared rule vs PRD** | PRD contradicts [general-context.md](../../shared/general-context.md) or invents a per-PRD EC for a product-wide rule |
| **Primary CTA convention** | Peer PRDs use **Next** for the same role while this one uses **Continue** / **Submit** without confirmed exception |
| **Success vs error ownership** | Same post-submit result specified as AC in one PRD and EC in another with different recovery |
| **Ported / locked / not registered style status gates** | Login (or similar) status popups disagree on trigger (e.g. correct PIN required vs not) or recovery |
| **Data mapping clash** | §7 maps the same UI field to different API fields than a peer for the same screen/action |
| **Template mismatch** | Screen Header Links template **P** disagrees with actual back/no-back behavior in ACs |

---

## Review write-up

Under **Cross-PRD conflicts** in the review output:

- **Overlap** — already covered elsewhere (list peers + what to trim or which PRD owns it)
- **Contradictions** — cannot both be true (list peers + conflicting statements)
- **Other** — reference / ownership / convention / general-context issues
- **None found** — say so explicitly after searching

Suggest a concrete fix per finding (edit this PRD, edit the peer, or split ownership). Do not silently rewrite other PRDs unless the user asks.
