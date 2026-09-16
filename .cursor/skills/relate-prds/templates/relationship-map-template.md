# PRD relationship map

Generated: YYYY-MM-DD

## Index

| PRD | Status | Summary |
|-----|--------|---------|
| [title](../path.md) | Draft | One line |

## Relationships

| From | Type | To | Notes |
|------|------|----|-------|
| prd-a | depends-on | prd-b | Why |

## Graph (Mermaid)

```mermaid
flowchart LR
  A[PRD A] -->|depends-on| B[PRD B]
  C[PRD C] -->|parent-of| A
  A -.->|related| D[PRD D]
```

## Gaps & risks

- Missing parent for …
- Duplicate scope between …
- Circular dependency: …
