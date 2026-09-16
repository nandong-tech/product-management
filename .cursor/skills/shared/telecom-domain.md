# Shared domain context — Telecom operators

**Applies to every skill in this workspace.** Read this before drafting, reviewing, or relating PRDs.

## Who we build for

We build **apps and websites for telecom operators** (MVNOs and MNOs) and their end customers (subscribers).

This is **not** a generic consumer app domain. Prefer telecom industry language, journeys, and conventions over generic SaaS / social / e-commerce patterns unless the user explicitly asks otherwise.

## Product surfaces (typical)

- Consumer mobile app and/or responsive web self-care
- Onboarding: welcome, registration, **SIM / eSIM activation**, number portability (MNP) where relevant
- Authentication: MSISDN / account login, OTP, existing-session resume
- Self-care: balance, plans/packs, usage, billing, top-up / reload, SIM management
- Acquisition: get a SIM, plan catalog, eligibility — often separate from activation
- Support: FAQs, chat, store locator — only when in scope

## Language & conventions

| Prefer | Avoid (unless user insists) |
|--------|------------------------------|
| User / guest | Customer (ok if the brief uses it; default to **user**) |
| Not logged in / logged in / log out | “No active session”, “unauthenticated”, “session expired” in PRD body |
| MSISDN / mobile number | “username” as primary identity |
| SIM / eSIM / ICCID / IMSI (when relevant) | Generic “device token” framing |
| Plan, pack, bundle, allowance, remaining balance, validity | Generic “subscription tier” only; **bucket** |
| Activate / provision / port-in | Generic “sign up” for SIM journeys |
| Self-care / My Account | Generic “dashboard settings” |
| Prepaid / postpaid (when known) | Ignoring account type differences |

Keep PRDs in **everyday product language** (designers, clients, engineers). Prefer **user** / **guest**; logged in / not logged in. Do not use UX/engineering jargon (“actionable control”, “active session”) when a plain phrase works. Brandless / tenant-agnostic wording by default (do not invent brand Non-Goals).

## Scope habits for PRDs

- Separate **acquisition** (get a SIM / choose a plan) from **activation** (bring SIM/eSIM online) from **login** (returning subscriber)
- Welcome / landing screens are **routing hubs**, not the full auth or activation PRD
- Call out prepaid vs postpaid only when behavior differs
- Network/connectivity and OSS/BSS failures matter as **user-visible** outcomes (no signal to activate, provisioning delay) — still no raw protocol/implementation detail in AIDR §6
- Regulatory / KYC / age checks: include only when in scope; do not invent local law — ask

## For specialist children

- **AC / edge cases:** Prefer telecom-missed cases: no SIM yet vs SIM not activated vs already activated; wrong account type; OTP to MSISDN; session bound to number; activation blocked offline; double-submit on activate
- **Data mapping:** Expect operator APIs around account, MSISDN, SIM/eSIM, plans, balance, usage — map only what Swagger contains; do not invent TM Forum IDs without the spec

## When unsure

Ask the PM whether the journey is prepaid/postpaid, physical SIM vs eSIM, and which operator channel (app vs web) — do not assume a generic retail app.
