# PRD: LF-S-001 - Welcome page (guest landing)

**Source:** [Confluence](https://lotusflare.atlassian.net/wiki/spaces/~62c27c6c5f45f3d3b7b5ec9d/pages/7604371676/PRD+LF-001+-+Welcome+page+guest+landing)  
**Page ID:** `7604371676`  
**Space:** `~62c27c6c5f45f3d3b7b5ec9d` (personal)  
**Parent ID:** `3906764969`  
**Pulled:** 2026-07-23  
**Confluence version:** 1 (2026-07-23)

## 1. Change Log

| Date | Change | Owner | Rationale |
| --- | --- | --- | --- |
| 2026-07-23 | First publish to Confluence | Nan Dong | <a id="sel-changelog-globegomo"></a>Experiment publish under GlobeGoMo PRD parent · [comment →](#comment-1) |
| 2026-07-23 | Published experiment copy to personal space | Nan Dong | <a id="sel-changelog-personal"></a>Experiment fork under Nan Dong personal space · [comment →](#comment-2) |

## 2. Header

| Field | Value |
| --- | --- |
| Feature | Welcome page (guest landing) |
| Channels | App + Web |
| Status (owning team) | PM — drafting |
| Owner (PM) | Nan Dong |
| Contributors | Design |
| Created | 2026-07-21 |
| Last updated | 2026-07-23 |
| Figma | N / A |
| Jira | — |
| API Spec | N / A |
| Links (optional) | [https://lotusflare.atlassian.net/wiki/spaces/GlobeGoMo/pages/7603650572/PRD+LF-001+-+Welcome+page+guest+landing](https://lotusflare.atlassian.net/wiki/spaces/GlobeGoMo/pages/7603650572) |

## 3. Central requirement + Scope

### a. Central requirement

The Welcome page is the landing screen for guests who are not logged in, where they choose how to continue.
Nan test delta PRD push


### b. Goals

* Show **Log in**, **Activate your SIM**, and **See All** as the guest’s primary next-step choices
* On tap or click, take the guest to the matching next flow or page
* Show the tenant-configured Welcome background, or the product default if none is configured

### c. Non-Goals

* Login flow (after hand-off from Welcome)
* SIM / eSIM activation flow (after hand-off)
* Shop SIM / plan catalog / purchase journey (after See All)
* Home / self-care after login

### d. Entry points

| Entry point | In or out of scope? | Note |
| --- | --- | --- |
| Load the app while not logged in | In | Guest sees Welcome |
| Come to the web homepage while not logged in | In | Guest sees Welcome |

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria

| ID | Given | When | Then (ONE observable outcome) |
| --- | --- | --- | --- |
| AC-01 | The user is not logged in | The user loads the app | The Welcome landing page is shown |
| AC-02 | The user is not logged in | The user comes to the web homepage | The Welcome landing page is shown |
| AC-03 | The user is logged in | The user loads the app or comes to the web homepage | Welcome is not shown |
| AC-04 | The Welcome page is shown | The guest views primary actions | **Log in** is shown and can be selected |
| AC-05 | The Welcome page is shown | The guest views primary actions | **Activate your SIM** is shown and can be selected |
| AC-06 | The Welcome page is shown | The guest views the footer | The text “Don’t have a SIM yet?” is visible |
| AC-07 | The Welcome page is shown | The guest views the footer | **See All** is shown and can be selected |
| AC-08 | A tenant Welcome background is configured | The Welcome page is shown | That configured background is displayed behind the content |
| AC-09 | No custom background is configured for the tenant | The Welcome page is shown | The product default background is displayed |
| AC-10 | The Welcome page is shown | The guest selects **Log in** | The guest is taken to Log in |
| AC-11 | The Welcome page is shown | The guest selects **Activate your SIM** | The guest is taken to Activate your SIM |
| AC-12 | The Welcome page is shown | The guest selects **See All** | The guest is taken to Shop SIM |

## 6. Edge cases & error cases

| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — resource load | Configured Welcome background fails to load | Default background is shown; **Log in**, **Activate your SIM**, and **See All** remain usable | Guest continues on Welcome |

## 7. Data Mapping

N / A

---

## Inline comments (from Confluence)

Footer comments: none.  
Includes **open** and **resolved**.

### <a id="comment-1"></a>Inline 1 — open

- **On text:** [“Experiment publish under GlobeGoMo PRD parent”](#sel-changelog-globegomo)
- **Author:** `62c27c6c5f45f3d3b7b5ec9d`
- **When:** 2026-07-23
- **Comment:** test inline comment
- **Reply** — `62c27c6c5f45f3d3b7b5ec9d`, 2026-07-23: test inline comment reply
- **Confluence ID:** `7604830213` (reply `7604306129`)
- **Marker ref:** `32a9dfc5-c804-4014-be17-7391688ff938`
- **Confluence:** [focused comment](https://lotusflare.atlassian.net/wiki/spaces/~62c27c6c5f45f3d3b7b5ec9d/pages/7604371676/PRD+LF-001+-+Welcome+page+guest+landing?focusedCommentId=7604830213)

### <a id="comment-2"></a>Inline 2 — resolved

- **On text:** [“Experiment fork under Nan Dong personal space”](#sel-changelog-personal)
- **Author:** `62c27c6c5f45f3d3b7b5ec9d`
- **When:** 2026-07-23
- **Comment:** test closed comment
- **Confluence ID:** `7604338817`
- **Marker ref:** `ed6fe82c-e839-4085-b706-02465d5e898c`
- **Confluence:** [focused comment](https://lotusflare.atlassian.net/wiki/spaces/~62c27c6c5f45f3d3b7b5ec9d/pages/7604371676/PRD+LF-001+-+Welcome+page+guest+landing?focusedCommentId=7604338817)
