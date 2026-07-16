# 01 — Current State Analysis (spec2jira.com)

> Part of the 2026-07 redesign package. Folder is `_redesign-docs/` (leading underscore) so
> GitHub Pages' default Jekyll build **excludes it from the published site**.

## 1. What the site is

Static HTML marketing + docs site for **Spec2Tickets** (vendor brand **Spec2JIRA**), an Atlassian
Forge app that turns Confluence pages into Jira backlogs. Hosted on **GitHub Pages** with custom
domain `spec2jira.com` (CNAME). No build system, no framework, no analytics. 10 HTML pages, each
fully self-contained.

## 2. Page inventory

| Page | Lines | Template style | Notes |
|---|---|---|---|
| `index.html` | 281 | Marketing (hero, stats, features, roles, trust, CTA) | Homepage |
| `how-it-works/` | 195 | Marketing (hero + dark steps band + card grid) | 4-step workflow, 6 "what lands in Jira" cards |
| `pricing/` | 228 | Marketing (plan cards + Q&A) | **Billing facts must stay verbatim.** Contains commented-out "Managed Pro" card (keep in source) |
| `about/` | 165 | Prose article 740px | Contains the 4 **company values** + Sofia origin + support hours |
| `docs/` | 304 | Two-column, sticky sidebar 1080px | Setup steps 1–6, pricing table, troubleshooting |
| `get-api-key/` | 240 | Numbered-step article 760px | **Orphan: in no nav/footer anywhere** |
| `privacy/` | 249 | Prose article 740px | **LEGAL — restyle only, copy verbatim.** Keep anchor `id="managed"` |
| `dpa/` | 426 | Prose article 740px | **LEGAL — restyle only, copy verbatim** |
| `subprocessors/` | 209 | Prose article 740px | **LEGAL — restyle only, copy verbatim** |
| `404.html` | 86 | Minimal centered | `noindex`, no OG meta (intentional) |

Assets: `favicon.svg` (360 B), `og-image.svg`, `robots.txt`, `sitemap.xml`, `CNAME`, `README.md`.

## 3. Current design system (the problem)

- **No shared stylesheet.** Every page inlines a near-identical ~80–125 line `<style>` block.
  Hand-copied → drift (nav spacing 28 vs 32px, footer 22 vs 24px, `--accent` defined on 4 pages
  but used on 1).
- Palette (identical on all pages): `--navy #1B2A4A`, `--blue #2684FF`, `--blue-light #4C9AFF`,
  `--slate #505F79`, `--gray #6B778C`, `--bg #FAFBFC`, `--link #0B5CD7`, `--accent #8B5CF6`,
  `--radius 8px`.
- Typography: raw system stack, 15–18px body, clamp() hero. Competent but generic — reads as
  "developer-made landing page", not a designed product site.
- Components in use: `.callout` (+ `.warn`, `.ok`), tables (+ `.table-wrap`), dark code blocks
  (docs), `.step` circles (get-api-key), `.steps` counter band (how-it-works), plan cards
  (pricing), sticky sidebar (docs), `.btn` primary/secondary.
- Accessibility basics present and worth keeping: skip-link, `:focus-visible` outlines,
  `.sr-only`, semantic landmarks.

## 4. Content strengths (keep / promote)

- Clear value prop: Confluence page → Epic/stories/subtasks/AC/dependency links, in minutes.
- Honest, specific stats: **~70% less hand-work · minutes not 2–3 days · 100% human-reviewed**.
- **Company values** exist but are buried on /about: *AI assists, humans decide · Privacy by
  architecture, not by promise · Work at the altitude of the page · Least privilege, always.*
- Strong privacy story (BYOK, no vendor backend, Forge-only, egress only to api.anthropic.com).
- Role framing (BA / PO / Developers) already exists on the homepage.
- Real pricing: trial $0/30d · BYOK Pro $6.70/user/mo (flat $57/mo ≤10 users) · Advanced
  $13.40/user/mo "coming soon".

## 5. Content gaps (vs. business goal)

The owner's brief: a visitor must immediately see **(a) company values, (b) use cases the
product solves, (c) why they need it**. Today:

- Values: only on /about, below the fold.
- Use cases: **nowhere presented as scenarios** — features are listed, but not "you have X
  situation → this is how Spec2Tickets solves it".
- "Why you need it": pain is implied ("stops hand-writing tickets") but never dramatized
  (no before/after, no cost-of-status-quo framing).
- No social proof of any kind (no testimonials/logos — none exist yet; do **not** fabricate.
  Platform trust must carry: Atlassian Forge, Atlassian Marketplace listing, Anthropic Claude).

## 6. Technical/SEO defects found

| # | Defect | Severity | Fix in phase |
|---|---|---|---|
| D1 | `og:image` on every page points to `https://spec2jira.com/og-image.png` — **only `og-image.svg` exists**. Social previews are broken (platforms don't render SVG) | High | P4 |
| D2 | `/get-api-key` orphaned — in no nav or footer, missing from `sitemap.xml` | High | P1–P3 |
| D3 | `sitemap.xml` `lastmod` stale (all `2026-06-04`; DPA/Subprocessors say "July 12, 2026") | Med | P4 |
| D4 | 10× duplicated inline CSS, hand-drift between pages | High | P1 |
| D5 | DPA internal date conflict: header meta "Last updated: **July 12, 2026**" vs Document control "**June 14, 2026**" | Med | **Owner decision — legal copy; do not silently edit. Flagged in final report** |
| D6 | No structured data (JSON-LD) at all | Low | P4 |
| D7 | Editorial HTML comments (v5.5.0/v6 history, commented "Managed Pro" card) embedded in shipped pages | Low | Keep as-is (owner's source-of-truth history), carry over verbatim |
| D8 | Favicon is minimal placeholder | Low | P1 |

## 7. Hard constraints for the redesign

1. **Platform:** stays static HTML on GitHub Pages. No frameworks, no build step, no npm.
   One shared CSS file + one small vanilla JS file.
2. **Legal pages** (`privacy`, `dpa`, `subprocessors`): body copy, headings text, table contents,
   dates, anchors (`id="managed"`), and editorial HTML comments are **verbatim-frozen**.
   Only wrapper markup/classes/typography may change. Verified by text-diff in QA.
3. **Pricing facts verbatim-frozen:** $0/30 days · $6.70/user/mo · flat $57/mo ≤10 users ·
   volume discounts >100 users · Advanced $13.40/user/mo · "Paid via Atlassian", USD ·
   early-access grandfathering. Commented-out Managed Pro block carries over.
4. **All URLs preserved:** page paths, Marketplace URL
   (`https://marketplace.atlassian.com/apps/1475765564/spec2tickets-for-confluence-and-jira`),
   `console.anthropic.com` links, `trust.anthropic.com`, mailto addresses, cross-links.
5. **No fabricated social proof** — no invented testimonials, client logos, review scores.
6. Keep a11y baseline (skip-link, focus-visible, sr-only, contrast ≥ WCAG AA) and improve it.
7. Existing real claims may be re-worded on marketing pages but **never inflated** (e.g. "~70%"
   stays "~70%", "100% human-reviewed" keeps its meaning).
