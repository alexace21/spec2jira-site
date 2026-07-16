# 04 — Action Plan

Workstreams, tasks, risks, and open items for the redesign. Execution order & agent
assignments live in `05-execution-phases.md`.

## Workstream A — Foundation (design system)
- A1. Create `assets/css/site.css` implementing **every token and component** in
  `03-design-concept.md` §2–§3 (including components used only by later pages).
- A2. Create `assets/js/site.js` per concept §5.
- A3. Redraw `favicon.svg` to match new brand (gradient "S2" or bracket mark, 32-grid).
- A4. Rebuild `index.html` per blueprint §4.1 (proof that the system works).

## Workstream B — Marketing pages
- B1. `how-it-works/index.html` per §4.2.
- B2. `pricing/index.html` per §4.3 (facts verbatim; Managed-Pro comment carried over).
- B3. `about/index.html` per §4.4.
- B4. `get-api-key/index.html` per §4.5.

## Workstream C — Functional & legal pages
- C1. `docs/index.html` per §4.6 (instructional copy verbatim).
- C2. `privacy/index.html` per §4.7 (text-node-identical).
- C3. `dpa/index.html` per §4.7 (text-node-identical).
- C4. `subprocessors/index.html` per §4.7 (text-node-identical).
- C5. `404.html` per §4.8.

## Workstream D — Assets, SEO, integrity
- D1. Generate real `og-image.png` 1200×630 (navy bg, wordmark, tagline, product-visual
  motif) — PowerShell/.NET System.Drawing, no external downloads. Fixes defect D1.
- D2. `sitemap.xml`: add `/get-api-key`, refresh `lastmod` values to redesign date.
- D3. JSON-LD: Organization + SoftwareApplication (home), FAQPage (pricing).
- D4. Nav/footer parity sweep: identical header/footer markup on all 10 pages;
  `/get-api-key` present in footer everywhere (fixes D2).
- D5. Head hygiene: theme-color, css preload, canonical/OG intact per page.

## Workstream E — QA & verification
- E1. **Legal text integrity gate:** script extracts visible text (tags stripped,
  whitespace-normalized) from `git show HEAD:<page>` vs working tree for privacy/dpa/
  subprocessors → must be byte-identical; same check for pricing numbers & Q&A text.
- E2. Link check: every internal href resolves to an existing page/anchor; external URLs
  unchanged vs. inventory (Marketplace, console.anthropic.com, trust.anthropic.com, mailtos).
- E3. Visual QA: serve locally, inspect every page at 375px / 768px / 1280px; nav toggle,
  focus states, reduced-motion, contrast spot-checks.
- E4. Fix pass for everything E1–E3 surfaces.

## Risks & mitigations
| Risk | Mitigation |
|---|---|
| Agent rewords frozen legal/pricing copy | Hard constraint in every agent prompt + E1 automated diff gate blocks completion |
| CSS merge conflicts between parallel agents | Only Phase 1 agent ever writes `site.css`; later agents are HTML-only and report gaps |
| Design drift between agents | All agents receive `03-design-concept.md` as binding; orchestrator reviews each output against blueprints |
| GitHub Pages/Jekyll quirks | `_redesign-docs/` underscore-excluded; no other underscore paths introduced; assets are plain files |
| Broken social previews persist | D1 creates the PNG the meta already points to (no meta churn) |
| Screenshot tooling flaky in this environment | QA falls back to DOM/a11y-tree + computed-style checks via browser JS |

## Open items (owner decisions — flagged, not blocking)
1. ~~**DPA date conflict**~~ — **RESOLVED 2026-07-16**: owner confirmed July 12; Document
   control line updated to match the header.
2. ~~**Self-hosted webfonts**~~ — **DONE 2026-07-16**: owner approved; Inter + Space Grotesk
   variable woff2 (latin subsets, 69 KB total) self-hosted in `assets/fonts/` with
   `--font-display` token, display applied to h1/h2/wordmark/numerals, preloads on all pages.
   Zero external requests preserved. License: `assets/fonts/OFL-NOTICE.txt`.
3. **Real social proof** — when first testimonials/case studies exist, slots are reserved
   (home §5 after use cases; footer column 2).
4. ~~Deploy~~ — **owner requested deploy 2026-07-16** after items 1–2.
