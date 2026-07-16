# 03 — Design Concept: "Structured Confidence"

The new visual identity for spec2jira.com. This document is the **binding spec** for all
implementation agents. Where an agent must improvise, it improvises *within* these tokens.

## 1. Brand direction

**Concept name:** *Structured Confidence* — the product turns messy prose into clean structure;
the site must embody that same transformation. Toptal's gravitas (dark, assured, specific
numbers) + Twine's product-forwardness (the thing itself visible in the hero), on an
Atlassian-adjacent color world so Jira/Confluence users feel instantly at home.

**Personality:** precise, calm, senior. No hype adjectives ("revolutionary", "magical").
Numbers and mechanisms instead of superlatives. The site of a vendor you'd let near your Jira.

**Tone of voice rules (all marketing copy):**
- Verbs over adjectives. "Reads your page. Writes your backlog." not "Powerful AI automation".
- Every claim measurable or mechanical (~70%, minutes, 100% human-reviewed, runs on Forge).
- Address the reader's time: what they stop doing (transcribing) and start doing (deciding).
- British-neutral English, sentence case everywhere (incl. buttons: "Start free trial").

## 2. Design tokens (single source of truth → `assets/css/site.css` `:root`)

### 2.1 Color
```css
/* Ink scale (dark surfaces) */
--ink-900: #0B1526;   /* darkest hero/footer background */
--ink-800: #0F1D33;   /* dark band background */
--ink-700: #16263F;   /* dark card surface */
--ink-600: #23364F;   /* dark card border/hover */

/* Brand */
--blue-600: #1D6FE0;  /* primary buttons, links on light */
--blue-500: #2684FF;  /* brand blue (kept from v1), icons, accents */
--blue-300: #7DB3FF;  /* links/accents on dark */
--violet-500: #7C5CFC;/* secondary accent (kept ~v1 --accent) */
--grad-brand: linear-gradient(135deg, #2684FF 0%, #7C5CFC 100%);

/* Light surfaces */
--paper: #FFFFFF;
--mist-50: #F6F8FB;   /* section alt background */
--mist-100: #EDF1F7;  /* chips, wells */
--line-200: #DDE3EC;  /* borders on light */

/* Text */
--text-900: #101B2C;  /* headings on light */
--text-700: #3E4C61;  /* body on light */
--text-500: #64748B;  /* muted on light */
--text-inv: #F2F6FC;  /* headings on dark */
--text-inv-muted: #A8B6CC; /* body on dark */

/* Semantic */
--ok-600: #0E8A5F; --ok-bg: #E7F6EF;
--warn-600: #B25E09; --warn-bg: #FDF1E2;
--info-bg: #EAF2FF;
--danger-600:#C4322E;
```
Contrast duties: body on light = `--text-700` on `--paper`/`--mist-50` (≥7:1). Body on dark =
`--text-inv-muted` on `--ink-800/900` (≥4.5:1). Primary button `#fff` on `--blue-600` (≥4.5:1).
**Never** put `--blue-500` text smaller than 18px on white; use `--blue-600` for text links.

### 2.2 Typography
Self-hosting webfonts is deferred (owner decision, see 04 §Open items). Until then the system
stack must be *designed*, not defaulted:
```css
--font-sans: "Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system,
             "Helvetica Neue", Arial, sans-serif;
--font-mono: "Cascadia Code", ui-monospace, "SF Mono", Consolas, monospace;
```
Type scale (fluid, rem-based; html 100%):
```
--fs-hero:  clamp(2.5rem, 5.5vw + 0.5rem, 4.25rem);  /* w800, lh 1.05, ls -0.02em */
--fs-h1:    clamp(2.2rem, 4vw + 0.4rem, 3.25rem);     /* page headers */
--fs-h2:    clamp(1.7rem, 2.5vw + 0.4rem, 2.35rem);   /* w800, lh 1.15, ls -0.015em */
--fs-h3:    1.25rem;                                   /* w700 */
--fs-body-l: 1.155rem;  /* leads, lh 1.65 */
--fs-body:  1rem;       /* lh 1.7 */
--fs-small: 0.9rem;
--fs-eyebrow: 0.8rem;   /* w700, uppercase, ls 0.12em, gradient or blue text */
```
Every H2 section heading is preceded by an **eyebrow label** (uppercase micro-heading) — this is
the signature typographic move of the redesign.

### 2.3 Space, radius, elevation, motion
```
--space unit: 4px grid; sections pad clamp(4.5rem, 9vw, 7.5rem) top/bottom
--container: 1140px max, 24px side padding (nav/footer align to same container)
--radius-s: 10px; --radius-m: 14px; --radius-l: 20px; --radius-pill: 999px
--shadow-s: 0 1px 2px rgb(16 27 44 / .06), 0 1px 3px rgb(16 27 44 / .10);
--shadow-m: 0 6px 24px -8px rgb(16 27 44 / .18);
--shadow-l: 0 24px 64px -24px rgb(16 27 44 / .28);
Motion: 160ms ease-out hovers; 500ms ease-out reveal-on-scroll (opacity+12px translateY),
IntersectionObserver, threshold .15, **disabled under prefers-reduced-motion**.
```

## 3. Component library (all live in `assets/css/site.css`)

Phase-1 agent builds ALL of these (even ones only used by later pages), so Phase-2/3 agents
never edit the CSS file. Class prefix: none (site is small); BEM-ish naming.

1. **`.nav`** — sticky top, `backdrop-filter: blur(12px)`, translucent `--paper` at 88%,
   bottom 1px `--line-200`. Logo left (wordmark "Spec2JIRA" — "Spec" ink / "2" gradient /
   "JIRA" blue, or refined equivalent). Links center-right; **CTA button "Start free trial"**
   (btn-primary, small) always visible. Mobile ≤860px: hamburger (`button[aria-expanded]`)
   opening a full-width dropdown panel; JS in `site.js`. On dark hero pages the nav stays
   light-on-scroll (same component everywhere — simplicity wins).
   Nav links: How it works · Use cases (→ /#use-cases) · Pricing · Docs · About + CTA.
2. **`.btn`** — `--radius-pill`, w600. Variants: `.btn-primary` (bg `--blue-600`, hover
   translateY(-1px) + shadow-m + bg #1B64C9), `.btn-ghost` (1px border `--line-200`, ink text;
   on dark: border `--ink-600`, `--text-inv`), `.btn-lg` (17px/28px pad), `.btn-sm` (nav).
   Focus: 2px outline `--blue-500` offset 2.
3. **`.hero-dark`** — bg `--ink-900` with two radial glows (blue 8% top-left, violet 6% right),
   subtle grid-line pattern via CSS gradient (1px `rgb(255 255 255 / .04)` every 56px).
   Contains eyebrow, `--fs-hero` headline (key phrase wrapped in `.grad-text` =
   background-clip gradient text), lead, CTA row, `.hero-note` (13.5px, muted, separators "·").
4. **`.product-visual`** — the flagship: pure-CSS vignette of the transformation.
   Left card = Confluence doc (title bar dot trio, grey text-lines of varying width, small
   Confluence-ish page icon); center = `.pipeline` (gradient arrow / chevron with pulsing dot
   animation, label chip "Spec2Tickets"); right card = Jira backlog tree: 1 Epic row (violet
   chip "EPIC"), 3 story rows (blue chip "STORY", text line, small pills "AC ✓" "3 SP"),
   2 indented subtask rows, one dashed "blocks →" dependency line. Cards: `--paper`,
   radius-l, shadow-l, slight rotate (-1.5deg / +1.5deg) straightening on hover. Must be
   decorative-safe: `aria-hidden="true"` + preceded by sr-only text description. Responsive:
   stacks vertically <900px with arrow rotated 90°.
5. **`.logo-strip`** — "platform trust bar": bordered pill row with 4 items (text-based,
   no fake logos): "Runs on Atlassian Forge" · "Available on Atlassian Marketplace" ·
   "Powered by Anthropic Claude" · "Bring-your-own-key". Muted, uppercase-small.
6. **`.card`** — paper, 1px `--line-200`, radius-m, 28–32px pad, hover: shadow-m +
   border-color blue-300 + translateY(-2px). `.card .icon-chip` 44px rounded square,
   gradient or tinted bg, emoji/inline-SVG glyph.
7. **`.usecase-card`** — card variant with eyebrow tag (e.g. "PRODUCT TEAMS"), h3, body,
   "→" affordance. Grid 3×2 desktop / 1-col mobile.
8. **`.band-dark`** — full-bleed `--ink-800` section for roles/values; inherits dark text vars
   via `.on-dark` scope class.
9. **`.stat`** — big numeral (`clamp(2.6rem,4vw,3.6rem)` w800, `.grad-text`), caption below.
   Used in `.stats-band` (3-up, dividers 1px `--line-200`/`--ink-600`).
10. **`.step-row`** — horizontal steps: big outlined numeral (72px, w800, color
    `--mist-100`-on-light stroke effect or solid `--blue-300`/12% opacity), h3 + p. 4-up →
    stacks. Replaces old `.steps`.
11. **`.value-item`** — for company values: left gradient rule (3px), h3 (the value), p.
12. **`.plan`** — pricing card: radius-l, pad 36px; `.plan-featured` = 2px gradient border
    (border-image or wrapper trick), "Early access" pill, shadow-l, scale(1.02) desktop;
    `.plan-soon` = dashed border + muted + "Coming soon" pill. Price row: `.price` 44px w800 +
    `.per` muted small. Feature list with inline-SVG check (blue) / muted dash.
13. **`.callout`** — info well: radius-m, bg `--info-bg`, 4px left rule `--blue-500`, 20px pad.
    Variants `.warn` (`--warn-bg`/`--warn-600`), `.ok` (`--ok-bg`/`--ok-600`). Dark-band variant.
14. **`.prose`** — long-form article scope (legal + about): max-width 72ch, h2 mt 2.5em with
    eyebrow-less style, `ul` marker color blue, `a` underlined `--blue-600`,
    tables inherit `.table`, hr as 48px gradient rule. Legal pages get `.prose-legal`:
    slightly smaller (15.5px), numbered-heading friendly, `#toc`-less (keep as-is).
15. **`.table`** — full-width, 1px `--line-200` rows, th uppercase-small muted, zebra
    `--mist-50`, wrapped in `.table-wrap` (overflow-x auto, radius-m border).
16. **`.docs-layout`** — grid `260px 1fr` gap 48; `.docs-sidebar` sticky top 88px, group
    labels uppercase-small, active link blue w600 with 2px left rule; collapses to top
    accordion <960px (details/summary).
17. **`code` / `pre`** — inline: `--mist-100` bg, 4px radius, mono 0.9em, ink text.
    Block: `--ink-900` bg, `--text-inv` text, radius-m, 20px pad, overflow-x auto.
18. **`.step-card`** — get-api-key big numbered cards: 40px gradient numeral circle, h3, body.
19. **`.faq-item`** — pricing Q&A: `<details>` disclosure, summary w600 with plus/minus
    (CSS), border-bottom `--line-200`. (JS-free.)
20. **`.cta-final`** — pre-footer band: `--ink-900` bg + glows (like hero), centered h2 +
    lead + button row + note. One per page max.
21. **`.footer`** — `--ink-900`, 4 columns: (1) wordmark + one-liner + "Made in Sofia,
    Bulgaria 🇧🇬" + support-hours line; (2) Product: How it works / Use cases / Pricing /
    Docs / Get your API key / Marketplace ↗; (3) Company: About / Support (mailto) /
    security@ / privacy@; (4) Legal: Privacy / DPA / Sub-processors. Bottom bar: © 2026
    Spec2JIRA · All rights reserved · sitemap-ish links. **`/get-api-key` becomes linked
    site-wide here → orphan fixed.**
22. **`.skip-link`, `.sr-only`, focus-visible rules** — carried over, upgraded to tokens.
23. **`.reveal`** — scroll-reveal utility (see motion tokens); `site.js` adds `.reveal-in`.

## 4. Page blueprints

### 4.1 `index.html` — the flagship (full rebuild)
Order (9 sections; each = eyebrow + h2 unless noted):
1. **Hero (dark)** — eyebrow "SPEC2TICKETS — FOR CONFLUENCE + JIRA"; H1
   "Your Confluence page is already a backlog. *Let it write itself.*" → agent may refine
   phrasing but must keep the transformation promise + a `.grad-text` key phrase; lead =
   current lead copy (reads page → Epic, stories, subtasks, AC, dependency links, minutes,
   team stops hand-writing tickets); CTAs: "Start free trial" (Marketplace URL) +
   "See how it works" (ghost, /how-it-works); note: "Free 30-day trial · Bring your own
   Anthropic key · Your content stays under your own Anthropic agreement". Right/below:
   `.product-visual`.
2. **Platform trust strip** (`.logo-strip`).
3. **Why you need it** — eyebrow "THE PROBLEM"; h2 "The transcription tax"; two-column
   before/after: left card "Today" (2–3 days per spec, copy-paste, inconsistent tickets,
   analysts transcribing instead of analyzing), right card "With Spec2Tickets" (minutes,
   consistent AC on every story, dependencies linked, humans review & decide). Pull stats
   from existing site only.
4. **Stats band** — ~70% less hand-work · Minutes, not 2–3 days · 100% human-reviewed.
5. **Use cases** — `id="use-cases"`; eyebrow "USE CASES"; h2 "One capability, many Mondays";
   6 `.usecase-card`: PRD → sprint-ready backlog (Product teams) · Tech design → tasks with
   dependency links (Engineering) · Client requirements → structured workplan (Agencies &
   consultancies) · Workshop/discovery notes → first-cut backlog (Discovery) · Migration
   spec → phased breakdown (Platform teams) · Acceptance criteria on every story, Gherkin
   test cases in Advanced, coming soon (QA & BA). Copy grounded in real capability only.
6. **How it works (compact)** — 4 `.step-row` (Install & configure → Generate → Review in
   the editor → Push to Jira) + ghost link "See the full workflow →" (/how-it-works).
7. **Roles (dark band)** — existing BA / PO / Developers copy, upgraded cards.
8. **Values** — eyebrow "WHAT WE BELIEVE"; h2 "Principles we won't trade"; 4 `.value-item`
   from /about: AI assists, humans decide · Privacy by architecture, not by promise ·
   Work at the altitude of the page · Least privilege, always — each with its /about
   one-line explanation, + link "More about us →".
9. **Privacy/trust** — keep current 3 items (Bring your own key / No vendor backend /
   You stay in control) as cards + "Read our privacy approach →".
10. **Final CTA** (`.cta-final`) + **footer**.
(3+4 may merge visually; agent's call. Everything else is fixed order.)

### 4.2 `how-it-works/` — light page-header (eyebrow + h1 + lead), steps as large
alternating rows (numeral + text left/right), "What lands in Jira" 6 cards (existing copy),
mini privacy note, `.cta-final`.

### 4.3 `pricing/` — page-header; 3 `.plan` cards (facts verbatim; Pro featured); billing
Q&A as `.faq-item` disclosures (**question/answer text verbatim**); fine-print note verbatim;
commented Managed-Pro block carried over inside an HTML comment exactly as-is; `.cta-final`.

### 4.4 `about/` — page-header; "Why we built it" prose; values as 4 `.value-item`
(same component as home); "Built on a solid foundation" + "Two names, one product" callout;
"Who we are" with Sofia + support hours + 3 contact emails. Copy: keep current text
substantively verbatim (it's good); allowed: headings/eyebrows restructure.

### 4.5 `get-api-key/` — page-header; "What you'll need" table; 4 `.step-card`;
cost section; troubleshooting table; all copy/URLs preserved; added to footer site-wide.

### 4.6 `docs/` — `.docs-layout` with sticky sidebar (same section list), content
restyled with new tables/callouts/code blocks; **all instructional copy verbatim**;
"Claude Sonnet 4.6" reference untouched.

### 4.7 Legal (`privacy/`, `dpa/`, `subprocessors/`) — `.prose-legal` template:
page-header (title + meta line verbatim), body **text-node-identical** to current
(wrapper tags/classes may change; heading/paragraph/table/list text, ids incl. `#managed`,
HTML comments preserved exactly). New shell = new nav/footer only.

### 4.8 `404.html` — dark full-viewport: giant gradient "404", "This page took an
unplanned detour." (keep), btn home + btn docs, minimal footer line, keep `noindex`,
keep stripped-meta approach.

## 5. `assets/js/site.js` (≤ ~80 lines, vanilla, defer)
1. Mobile nav toggle (aria-expanded sync, Esc closes, click-outside closes).
2. IntersectionObserver `.reveal` → `.reveal-in` (skip entirely under
   `prefers-reduced-motion: reduce`).
3. Footer year auto (`new Date().getFullYear()`) — optional; static "2026" acceptable.
Nothing else. No dependencies, no trackers.

## 6. Head template (every page)
Keep per-page: title, meta description, canonical, OG/Twitter (og:image →
`https://spec2jira.com/og-image.png` — the PNG becomes real in Phase 4), favicon links.
Add: `<meta name="theme-color" content="#0B1526">`, preload of `site.css`.
Add JSON-LD: Organization + SoftwareApplication on `index.html`; FAQPage on `pricing/`
(from the 5 Q&A, answers verbatim). `404.html` keeps its minimal head + noindex.

## 7. Accessibility bar (QA-enforced)
Skip-link first element · one h1/page · landmarks (`header nav main footer`) · focus-visible
on all interactive · contrast AA everywhere (checked against tokens above) · hamburger is a
`<button>` with label · `.product-visual` aria-hidden with sr-only alternative ·
`prefers-reduced-motion` respected · tables keep `<th scope>` where present.
