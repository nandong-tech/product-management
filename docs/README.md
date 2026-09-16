# Product Management workspace

## Domain

Telecom operator apps/websites (MNOs/MVNOs).  
Shared context: [`.cursor/skills/shared/telecom-domain.md`](../.cursor/skills/shared/telecom-domain.md)

## How to invoke skills

Start the message with the **parent skill name** only:

| Type at start | Skill |
|---------------|--------|
| `generate-prd` | Create prebuilt PRDs → `prebuilt_prds/` (default now); later also project PRDs → `project_prds/` |
| `publish-prd` | Publish an existing PRD to Confluence |
| `review-prd` | Review a PRD (**required** before `publish-prd`) |
| `relate-prds` | Map PRD relationships |

Child skills are **internal**. Details: [`.cursor/skills/shared/invocation.md`](../.cursor/skills/shared/invocation.md)

## Layout

| Path | Purpose |
|------|---------|
| `.cursor/skills/` | Agent skills |
| `.cursor/skills/shared/` | Shared domain + invocation |
| `.cursor/skills/publish-prd/` | Confluence publish |
| `prebuilt_prds/` | Prebuilt catalog PRDs (current authoring focus, e.g. `LF-*`) |
| `project_prds/` | Project / tenant PRDs (later; often seeded from prebuilts) |
| `docs/` | Supporting PM notes |

## Parent skills

| Skill | Role |
|-------|------|
| **`generate-prd`** | Full local PRD pipeline |
| **`publish-prd`** | Confluence publish (ask where each time) |
| `review-prd` | Critique / QA |
| `relate-prds` | Dependency map |

Example generate: `generate-prd project LF type S — …` (default project **`LF`**; type **J** / **S** / **P** inferred or asked)  
Example publish: `publish-prd prebuilt_prds/LF-S-001-welcome-page.md`
