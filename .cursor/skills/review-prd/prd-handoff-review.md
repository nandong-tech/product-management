---
name: prd-handoff-review
description: Use before a PRD and its design are handed to engineering — audits the pair against the intake bar engineering will apply, and returns a per-document READY / NOT READY verdict with a defect list. Run it on a single screen PRD, a journey PRD, or a whole release scope.
---

# PRD handoff review

Audit a PRD and its linked design **before** they reach engineering, and return a verdict that is
defensible line by line.

Engineering does not start from a PRD. It starts by converting the PRD into a build contract, and that
conversion refuses to proceed while anything load-bearing is undefined. Every question it cannot answer
from the PRD becomes a blocking question back to the author — after the work was scheduled, not before.
This skill applies the same bar early, while the document is still cheap to change.

The reviewer is not the author. Someone who did not write the PRD runs this, because the defects this
catches are precisely the ones an author's own knowledge silently fills in.

## What you need before starting

| Input | Required | If missing |
| --- | --- | --- |
| The PRD(s) in scope | Yes | Cannot proceed — record and stop |
| The design file, current version | Yes | Every design gate fails; record and continue on the rest |
| The list of documents that share a decision with these (upstream and downstream) | Yes | Cross-document gates cannot run; treat as NOT READY |
| The API or service contract the PRD depends on | No | Gate 5 fails; that is itself the finding |

You do not need access to the codebase to run this. Every gate is answerable from the documents and the
design alone. That is deliberate: the bar engineering applies is mostly a bar on **the document's own
internal completeness**, not on implementation knowledge.

## Severity

Apply one of three levels to every finding. The verdict is derived mechanically from them.

- **Blocker** — engineering cannot write a build contract for this. Work will stop and return a question.
- **Major** — engineering can start, but a wrong or reversed decision is likely. Rework is probable.
- **Minor** — noise, stale text, or a cosmetic inconsistency. Does not stop work.

**Verdict:** any Blocker → NOT READY. No Blocker but three or more Majors → NOT READY. Otherwise READY,
with the Majors listed as conditions.

---

## Gate 0 — Coverage

Before judging quality, establish that the scope is actually documented.

- [ ] Every flow in the release scope has a document describing the flow end to end — not only documents
      for its individual screens. A set of complete screen documents with no flow document above them
      leaves the sequencing, the resumption rules, and the cross-screen state undefined. This is the most
      commonly missed gap because the screen documents look finished.
- [ ] Every screen the flow documents reference has its own document.
- [ ] No document in scope is a placeholder — a title with one or two sentences of intent is not a
      specification, and counting it as one inflates the readiness picture.
- [ ] Every destination named as an exit exists as a real document somewhere. A document that routes the
      user to a named screen with no specification behind it has an undefined edge.

Record the count both ways: documents that exist, and documents that are referenced but do not.

**Blocker** if any flow in scope has no flow-level document, or if a referenced destination does not exist.

## Gate 1 — Scope and terminology

- [ ] The central requirement is stated in one or two sentences and names a concrete outcome.
- [ ] Every load-bearing noun is defined. If a term could denote more than one thing to a reader outside
      the authoring team, it is undefined until the document says which. An undefined central term is not
      a detail to settle later — it is the thing that makes the requirement unbuildable.
- [ ] Terms are used consistently across every document in scope. The same concept must not appear under
      two names, and one name must not cover two concepts.
- [ ] In scope and out of scope are both stated. "Not mentioned" is not "out of scope" — engineering reads
      silence as an open question and will ask.

**Blocker** if a load-bearing term in the central requirement is undefined.

## Gate 2 — Acceptance criteria

- [ ] Every requirement has at least one acceptance criterion.
- [ ] Each criterion is **observable** — it names a condition, an action, and an outcome someone could
      check without knowing how the feature is built.
- [ ] Each criterion **stands alone**. Apply this test: give the criterion to someone who has never seen
      the PRD, the design, or the discussion behind it. Can they tell whether the built thing satisfies
      it? If they need the surrounding prose, it is too vague.
- [ ] Criteria cover the happy path **only**. Error and edge behaviour belongs in the edge-case section;
      mixing them hides gaps in both.
- [ ] No criterion describes something still undecided. A criterion for an open question is a false
      signal of readiness and is worse than an admitted gap.

**Blocker** if a requirement has no criterion, or a criterion asserts undecided behaviour.

## Gate 3 — State and case coverage

Most handoff failures are not wrong requirements. They are unlisted states. Sweep every surface in the
document against this list, and for each either specify the behaviour or record it explicitly as not
applicable with a reason. A silent omission is a finding; "not applicable — reason" is not.

- [ ] **Empty** — no data yet, or the user has none
- [ ] **Loading** — the wait between request and response
- [ ] **Error** — the request failed, and what the user does next
- [ ] **Offline or interrupted** — connection lost mid-action; app backgrounded mid-action
- [ ] **Partial** — some data present, some missing
- [ ] **Boundary** — minimum, maximum, zero, first, last, and one-past-each
- [ ] **Invalid input** — per field, including what the message says and when it appears
- [ ] **Permission or eligibility** — the user is not entitled to this
- [ ] **Repeat or duplicate action** — double submission, re-entry, back-then-forward
- [ ] **Concurrent conditions** — two states that can be true at once, and which wins
- [ ] **Interrupted flow** — the user abandons partway and returns; what is preserved and what is lost
- [ ] **Timing** — anything with a countdown, expiry, cooldown, or auto-advance has its duration stated

For every state that produces user-visible text, the actual copy is written. "An error is shown" is not a
specification — someone will invent the words, and it will be engineering.

**Blocker** if a state is unlisted on a surface where it can occur. **Major** if the state is listed but
its behaviour or copy is unspecified.

## Gate 4 — Design evidence

- [ ] Every design reference resolves to a specific frame or node, not a file-level link. A link to the
      whole file leaves the reader guessing which frame is authoritative.
- [ ] Every referenced frame is in the **current** version of the design. A resolving link to a superseded
      frame is more dangerous than a missing link, because it reads as complete.
- [ ] No document is sourced from screenshots pasted into a conversation. A screenshot has no version and
      cannot be re-checked; content derived from one cannot be trusted after the design moves.
- [ ] Every state named in Gate 3 has a frame, or is explicitly recorded as intentionally undesigned with
      the fallback stated. A design that covers only the happy path is a partial design regardless of how
      finished it looks.
- [ ] The document and the frame **agree**. Where the document describes behaviour the frame does not show,
      or the frame shows an element the document does not describe, that is a finding, not a detail.
- [ ] Where the design was used to **overturn a previously agreed decision**, the reversal is recorded and
      re-confirmed by the decision's original owner. A design detail silently overriding an agreed decision
      is how a settled question gets re-opened after build starts.
- [ ] Sample content in frames is marked as sample. Placeholder names, dates, and values that look like
      specification get implemented as specification.

**Blocker** if a referenced frame is superseded or does not resolve. **Major** if a Gate 3 state has no
frame and no recorded fallback.

## Gate 5 — Data and integration

This gate fails most often and costs the most, because it is invisible in a document review that only
reads the prose.

- [ ] Every value on screen that is not static copy is traced to a **named source** — the service or
      endpoint it comes from, and the specific field within it.
- [ ] That source **exists and is documented**. A named endpoint with no published contract is not a
      resolved dependency; it is an assumed one.
- [ ] Every value has a stated **fallback** for when the source returns nothing.
- [ ] Every value has a stated **format** — units, precision, date and time format, truncation rule,
      and what happens when the value is longer than its space.
- [ ] Every action that changes data states what is sent, what comes back, and what the user sees for
      each outcome including failure.
- [ ] Any capability the flow depends on that **does not yet exist** is named, with its owner and its
      status. A dependency on unbuilt infrastructure is a schedule risk, and it belongs in the document
      rather than being discovered during build.
- [ ] Where a value is derived rather than fetched, the derivation rule is stated.

**Blocker** if a dynamic value has no named source, or a named dependency does not exist. **Major** if a
source is named but has no published contract.

## Gate 6 — Decisions and deferrals

The distinction this gate enforces is the one engineering's intake makes, and getting it wrong in either
direction is costly.

- [ ] **Stop items and deferred items are not the same thing.** A gap in the *core requirement* — you
      cannot say what "done" means — must block the handoff. A *bounded, separable* decision that does not
      prevent stating the core requirement may be deferred. Filing the first as the second sends
      unbuildable work forward.
- [ ] Every deferred item has a **named owner** and a **date it is needed by**. "To be confirmed" with no
      owner is not a deferral; it is an unassigned blocker.
- [ ] **No value is invented for a deferred item, anywhere in the document.** If a duration, a limit, or a
      policy is genuinely undecided, no number for it may appear in any criterion, table, or note. A number
      that appears once gets built, and the deferral becomes decorative.
- [ ] **Nothing clear and decidable was deferred defensively.** Parking a settled requirement to look
      cautious makes the document useless downstream, and it is as much a defect as an unmarked gap.
- [ ] Every decision that was **made** carries a one-line reason. A decision without a reason gets
      re-litigated the first time someone disagrees.
- [ ] Deferred items are counted and the count is stated. An unquantified "some open items" hides scale.

**Blocker** if a core-requirement gap is filed as a deferral, or a value is baked in for a deferred item.

## Gate 7 — Cross-document consistency

Documents drift against each other, and each one reads as correct in isolation. These checks only work
when run across the set.

- [ ] **Bidirectional references agree.** Where document A names document B as its next step, B names A as
      its entry. A one-way reference means one of them is wrong.
- [ ] **No document describes another as missing when it exists.** These stale references accumulate and
      make the coverage picture unreliable.
- [ ] **Every reversed decision propagated.** When a decision changed, every document that stated the old
      position was updated. Find these by listing changed decisions and searching the set for the old
      position — the changed document usually knows it left others stale and says so.
- [ ] **No unresolved conflict markers.** A document flagging a contradiction with another and deferring
      the fix is an open defect regardless of how clearly it is flagged. Flagged is not resolved.
- [ ] **Shared surfaces have one owner.** Where a screen or component is reused across flows, one document
      is authoritative and the others reference it. Two documents specifying the same surface will diverge.
- [ ] **Sequence agrees between levels.** The step order in the flow document matches the entry and exit
      points in each screen document.

**Blocker** for an unresolved conflict between documents. **Major** for a stale or one-way reference.

## Gate 8 — Traceability

Run this in both directions. Each direction catches a different defect.

- [ ] **Forward** — every requirement in the source material (the brief, the ticket, the stakeholder
      request) appears in the document as a criterion, or as an explicit recorded decision to exclude it.
      A requirement that appears in neither was silently dropped.
- [ ] **Backward** — every criterion in the document traces to a source requirement or a recorded
      decision. A criterion that traces to neither was invented, and nobody has agreed to it.

**Blocker** for a silently dropped requirement. **Major** for an untraceable criterion.

## Gate 9 — Release boundary

Run this when the scope is a release rather than a single document. It catches the class of defect that is
invisible at document level because each document is individually correct.

- [ ] Every exit from an in-scope screen leads to another in-scope screen, or has a defined behaviour for
      the release. A screen inside the release that routes into a flow outside it has an undefined edge on
      launch day.
- [ ] Terminal screens are checked specifically. The screen a flow lands on typically offers onward actions,
      and those actions frequently belong to later scope.
- [ ] Every dependency of an in-scope flow is itself in scope, or is confirmed available.
- [ ] Shared surfaces used by both in-scope and out-of-scope flows are specified for the in-scope use, with
      the out-of-scope behaviour stated.

**Blocker** for an in-scope exit with no defined behaviour.

## Gate 10 — Evidence integrity

Documents that tag their claims by source are more auditable than those that do not, but only if the tags
are honest. If the documents in scope use source tags, audit them; if they do not, recommend adopting them.

- [ ] Anything marked as confirmed names **who** confirmed it and **when**. Confirmation without an owner
      is an assumption in better clothing.
- [ ] Anything marked as an assumption is genuinely low-impact and reversible. A load-bearing assumption
      is an undecided item and belongs in Gate 6.
- [ ] Nothing that drives a criterion is left untagged. Untagged content reads as confirmed by default.
- [ ] The ratio is sane. A document whose acceptance criteria are mostly assumptions is a draft, whatever
      its status field says.
- [ ] Status fields reflect reality. A status set at creation and never revised misreports the document.

**Major** for an assumption presented as confirmed. **Minor** for untagged supporting content.

---

## Anchor questions

Before writing the report, answer these from the documents alone. Each is about what would be observably
true once the thing is built. If you cannot answer one from the documents, that is a finding in itself,
and it is usually a Blocker.

Write at least five, specific to the scope under review. Every set includes these three:

1. When this is built and someone uses it end to end, what exactly do they see at each step, and what does
   the document say happens if any step fails?
2. Which values on screen change per user, where does each come from, and what is shown when the source
   returns nothing?
3. What is the single most likely question engineering asks first, and does the document answer it?

An anchor that restates the requirement is not an anchor. Frame each as something a fresh checker could
observe after the work is done.

---

## The report

Produce this. It is the deliverable, and it is what makes the verdict defensible when challenged.

```
# PRD handoff review — <scope>

**Verdict:** READY | NOT READY
**Reviewed:** <documents, by name>
**Design version checked:** <version or date>
**Reviewer:** <name — must not be the author>

## Summary
<Two or three sentences. Lead with the verdict and the single biggest reason for it.>

## Counts
- Documents in scope: <n>
- Documents complete: <n>   Placeholder: <n>   Referenced but missing: <n>
- Open items: <n>
- Findings: <n> Blocker, <n> Major, <n> Minor

## Blockers
| # | Gate | Finding | Where | Owner |
|---|------|---------|-------|-------|

## Majors
| # | Gate | Finding | Where | Owner |
|---|------|---------|-------|-------|

## Minors
| # | Gate | Finding | Where |
|---|------|---------|-------|

## Anchor questions
| Question | Answerable from the documents? | Where, or what is missing |
|----------|-------------------------------|---------------------------|

## Gates not run
<Any gate skipped, and why. A skipped gate is never silently omitted.>
```

Rules for the report:

- **Every finding quotes or cites the exact text that produced it.** A finding without a citation cannot be
  defended when the author disagrees, and it will be disputed.
- **Count what you counted, and say what the count excludes.** State the unit — "open items" means
  something specific in these documents, and a reader will assume a different scope unless told.
- **Separate what you verified from what you assumed.** If a design version could not be checked, or a
  dependency could not be confirmed, say so in the report rather than letting the verdict imply it was.
- **Do not soften a Blocker into a Major to reach READY.** The verdict follows the findings.

## Using the result

- **NOT READY** — the Blockers are the work. Assign each to its owner with the date it is needed by, then
  re-run this review before handoff rather than assuming the fixes landed.
- **READY with Majors** — hand off, and attach the Majors as conditions with named owners. A Major that
  travels with the handoff untracked becomes rework.
- **READY** — hand off. Note the review date and the design version checked, so the next change to either
  is visible as a change.

## Never

- Never review a document you authored. Author review does not catch these defects.
- Never accept "not mentioned" as "out of scope."
- Never accept a resolving design link as a current design link. Check the version.
- Never treat a flagged-but-unresolved conflict as resolved.
- Never let a deferred item carry a value anywhere in the document.
- Never report a verdict without the finding list that produces it.
