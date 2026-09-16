---
name: relate-prds
description: >-
  Parent skill (user entry). Type "relate-prds" at the start of the message.
  Map relationships between PRDs (depends-on, blocks, parent/child, related).
---

# Relate PRDs

**How to invoke:** User types `relate-prds` at the **beginning** of the message. See [../shared/invocation.md](../shared/invocation.md).

**Shared domain:** [../shared/telecom-domain.md](../shared/telecom-domain.md) — telecom operator product domain when linking journeys (activation, login, self-care, etc.).

**Shared general context:** [../shared/general-context.md](../shared/general-context.md) — product-wide rules.

## When to use

- User has multiple PRDs and wants dependency / relationship mapping
- User asks how initiatives overlap, block, or compose each other
- User wants a living index of PRD links

## Instructions

1. Collect PRDs from `prebuilt_prds/` and `project_prds/` (or paths the user provides)
2. For each pair that interacts, classify the relationship type
3. Update each PRD's "Related PRDs" field when appropriate
4. Produce a relationship map using [templates/relationship-map-template.md](templates/relationship-map-template.md)
5. Call out conflicts, duplicate scope, and missing parent epics

## Relationship types

| Type | Meaning |
|------|---------|
| `parent-of` | Broader initiative that contains this PRD |
| `child-of` | Sub-initiative of a parent PRD |
| `depends-on` | Needs the other PRD delivered first (or in parallel with sync) |
| `blocks` | Prevents the other PRD from shipping until done |
| `related` | Shared context; no hard dependency |
| `conflicts-with` | Overlapping or incompatible scope |

## Additional resources

- Template: [templates/relationship-map-template.md](templates/relationship-map-template.md)
- Shared domain (telecom): [../shared/telecom-domain.md](../shared/telecom-domain.md)
- Examples: [examples/](examples/)
