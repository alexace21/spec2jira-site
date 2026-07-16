# spec2jira.com Redesign Package — July 2026

Full documentation for the "Structured Confidence" redesign. Folder starts with `_` so
GitHub Pages (default Jekyll build) never publishes it.

| Doc | Contents |
|---|---|
| [01-current-state-analysis.md](01-current-state-analysis.md) | Site audit: page inventory, design-system problems, content gaps, defects D1–D8, hard constraints |
| [02-reference-analysis.md](02-reference-analysis.md) | Toptal & Twine pattern extraction → design principles |
| [03-design-concept.md](03-design-concept.md) | **Binding spec**: brand direction, design tokens, 23-component library, per-page blueprints, JS, head template, a11y bar |
| [04-action-plan.md](04-action-plan.md) | Workstreams A–E, risks, open items for the owner |
| [05-execution-phases.md](05-execution-phases.md) | Phase graph P0–P5, Opus agent assignments, acceptance criteria, QA gates |

Conductor/orchestrator: Claude (Fable). Executors: Opus 4.8 agents (P1, P2a–P2c).
Goal set by the owner: every visitor immediately sees **company values**, **use cases**,
and **why they need Spec2Tickets** — see 03 §4.1 blueprint sections 3, 5, 8.

> **AMENDMENT — 2026-07-16 pricing pivot (v7 FLAT-FREEMIUM).** After launch the owner
> changed the pricing model. Anywhere these docs cite the old facts ($0/30-day trial,
> BYOK Pro $6.70/user/mo, flat $57/mo ≤10 users, Advanced $13.40 "coming soon"), the
> **current** facts are: **free for teams up to 10 users; flat $67/month for teams of
> 11+; every feature — breakdowns, AI test-case generation (Gherkin/CSV), sprint
> planning — included and unlimited in all plans; always BYOK.** The Advanced edition
> was merged into BYOK Pro; its card is preserved commented-out in pricing/index.html.
> Do NOT restore the pre-pivot numbers from these docs.
