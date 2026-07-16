# 05 — Execution Phases

Conductor: Claude (orchestrator, this session). Executors: **Opus 4.8 agents**, one per phase
scope, each receiving `03-design-concept.md` as binding spec + only the constraints relevant
to its files. Phases 2a/2b/2c run in parallel (disjoint files). The orchestrator reviews
every phase output before the next dependent phase starts.

```
P0 Documentation (orchestrator)  ──►  P1 Foundation + Home (Opus)
                                          │ site.css frozen after P1
                        ┌─────────────────┼──────────────────┐
                        ▼                 ▼                  ▼
              P2a Marketing (Opus)  P2b Docs+404 (Opus)  P2c Legal restyle (Opus)
                        └─────────────────┼──────────────────┘
                                          ▼
                              P3 Orchestrator review + gap patching
                                          ▼
                              P4 Assets & SEO (orchestrator or Opus)
                                          ▼
                              P5 QA gates + fix pass (orchestrator)
```

## P0 — Documentation package ✅ (this folder)

## P1 — Foundation + homepage — **Opus agent "Foundation"**
**Writes:** `assets/css/site.css`, `assets/js/site.js`, `favicon.svg`, `index.html`.
**Must not touch:** any other page.
**Acceptance:**
- Every §3 component exists in site.css (1–23), tokens exactly per §2.
- index.html follows blueprint §4.1: all 10 sections, values/use-cases/why-you-need-it
  present; all URLs & stats preserved; `.product-visual` renders the doc→backlog vignette;
  valid HTML5; head per §6 (JSON-LD included); a11y bar §7.
- No external requests (fonts/CDNs/images) introduced anywhere.

## P2a — Marketing pages — **Opus agent "Marketing"**
**Writes:** `how-it-works/`, `pricing/`, `about/`, `get-api-key/` index.html files.
**Must not touch:** `site.css` (report missing styles back instead), homepage, legal.
**Acceptance:** blueprints §4.2–4.5; pricing facts + Q&A text verbatim (E1-checked);
Managed-Pro HTML comment block carried over byte-identical; about values/contacts/hours
intact; get-api-key steps/URLs intact; shared nav/footer markup identical to index.html.

## P2b — Docs + 404 — **Opus agent "Docs"**
**Writes:** `docs/index.html`, `404.html`.
**Acceptance:** §4.6/§4.8; sidebar sticky + mobile accordion; every step/table/callout/
troubleshooting row text preserved; `sk-ant-api03-…`, `SCRUM`, "Claude Sonnet 4.6",
pricing table numbers untouched; 404 keeps noindex + minimal head.

## P2c — Legal restyle — **Opus agent "Legal"**
**Writes:** `privacy/`, `dpa/`, `subprocessors/` index.html files.
**Hard rule:** visible text nodes byte-identical after whitespace normalization; ids
(incl. `#managed`) and all HTML comments preserved; only shell/wrapper/classes change.
**Acceptance:** E1 diff gate passes on all three; new nav/footer present; `.prose-legal`
styling applied; meta lines ("Last updated …") rendered verbatim.

## P3 — Orchestrator review
Read every changed file (structure-level), check against blueprints, patch `site.css` for
any gaps agents reported, enforce nav/footer parity byte-identically across all 10 pages.

## P4 — Assets & SEO
og-image.png (D1), sitemap.xml (D2), JSON-LD spot-check (D3), robots unchanged.

## P5 — QA gates (E1–E4) + fix pass
Automated: legal/pricing text diff vs `git show HEAD:`; internal link resolution; external
URL inventory match. Manual: local serve + browser pass at 375/768/1280; nav toggle; focus
ring walk; reduced-motion. Everything fails → fix → re-run. Session ends with a status
report to the owner (incl. open items from 04) — **no commit/push unless the owner asks**.

## Agent prompt contract (applied to every executor)
Each Opus agent prompt includes: (1) role + exact file whitelist, (2) the binding concept
doc path, (3) its blueprint sections pasted, (4) frozen-content rules for its files,
(5) "no new external requests; no frameworks; no build tools", (6) requirement to return
a gap report (missing styles / ambiguities / anything it had to decide) instead of
improvising outside the spec.
