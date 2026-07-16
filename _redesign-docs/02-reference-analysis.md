# 02 — Reference Analysis: Toptal & Twine

What we take (and deliberately don't take) from the two reference sites.

## 1. Toptal (toptal.com) — "enterprise gravitas"

**Observed structure (2026-07):** dark confident hero → third-party trust badge (Newsweek) →
client logo grid → category cards → benefit cards ("Build Amazing Teams") → 3-step process →
video testimonials → stats (140+ countries · 35 000+ clients · 4.9/5) → deep directory footer.

**Verbatim headline style:** "Hire the Top 3% of the World's Talent™", "High-impact Solutions
Executed by World-class Leadership", "The Right Fit, Guaranteed".

### Patterns worth stealing
| Pattern | How Toptal does it | Translation for Spec2Tickets |
|---|---|---|
| **Confidence-first headline** | Superlative + specific number ("Top 3%") | Specific, measurable promise: "minutes, not days", "~70% less hand-work" |
| **Trust immediately under hero** | Newsweek badge, client logos | We have no clients to show → **platform trust bar**: Atlassian Forge · Atlassian Marketplace · Anthropic Claude · BYOK |
| **Dark, weighty hero** | Navy/near-black, high contrast, minimal decoration | Dark ink-navy hero band with product visual; light sections after |
| **Persona segmentation** | Role cards (Developers, Designers, …) | Keep & upgrade existing BA / PO / Developer band |
| **Numbered process** | "Hiring Made Easy" 3 steps | 4-step workflow (already exists on /how-it-works — promote a compact version to home) |
| **Stats band** | 140+ countries etc., big numerals | Existing ~70% / minutes / 100% stats, styled as a proper stat band |
| **Guarantee/risk-reversal** | Trial basis, "pay only if satisfied" | 30-day free trial + "nothing reaches Jira until you push it" |
| **Deep multi-column footer** | Directory-style footer | Proper 4-column footer (Product / Resources / Legal / Contact) — also fixes the `/get-api-key` orphan |

### What we do NOT take
- Sales-contact funnel (Toptal sells via call; we sell via Marketplace self-serve).
- Fake-able trust (no invented awards/logos/testimonials).
- Their sheer page length (16+ sections) — we cap home at ~9 focused sections.

## 2. Twine (twine.net) — "product-forward warmth"

**Observed structure (2026-07):** hero with animated typing headline ("Hire expert consultan_")
+ live talent profile cards inside the hero → logo bar ("Trusted by leading companies") →
segment cards (Marketing / Developers / AI-ML) → giant skills directory → testimonials with
names/roles → numbered "How we work" (3 steps, big numerals) → "Why Twine" value cards →
case studies → blog → rich footer with comparison pages.

### Patterns worth stealing
| Pattern | How Twine does it | Translation for Spec2Tickets |
|---|---|---|
| **Product inside the hero** | Real freelancer cards with ratings floating in hero | **CSS-built product vignette**: Confluence doc card → pipeline arrow → Jira backlog tree (Epic/Stories/Subtasks with AC pills). Shows the transformation in 3 seconds, no screenshots needed |
| **Segment cards with "browse X" links** | Marketing / Developers / AI-ML cards | **Use-case cards** (PRD → backlog, tech design → tasks with dependencies, workshop notes → first-cut backlog, …) each linking deeper |
| **Big-numeral steps** | 1 / 2 / 3 with one-liners | Same treatment for our 4 steps |
| **Named testimonials** | Real quotes w/ name + company | **Skip for now** (none exist; no fabrication). Slot reserved in design for future |
| **Friendly microcopy** | "This only takes 3-5 minutes" | Reassurance notes under CTAs: "Free 30-day trial · Your key, your data" |
| **Accent gradients on light UI** | Colorful but controlled | One brand gradient (blue→violet) used sparingly: hero glow, icon chips, section eyebrows |

### What we do NOT take
- Marketplace-style skills mega-directory (irrelevant for a single product).
- Two-sided audience toggle (hire/work) — we have one audience.
- Blog/case-study sections (no content exists yet; design leaves room later).

## 3. Shared conclusions → design principles

1. **Show, don't claim.** Both sites put *the thing itself* (talent) on screen instantly.
   Our equivalent is the spec→backlog transformation, drawn in pure HTML/CSS in the hero.
2. **Trust is a layer, not a page.** Trust signals recur under hero, mid-page, pre-CTA.
   Ours: Forge (no vendor servers), BYOK, human-in-the-loop, EU/GDPR posture, Sofia origin.
3. **Rhythm: dark → light → dark.** Alternating bands create scan-stopping structure;
   both references end sections with a single unmistakable CTA.
4. **One primary action everywhere:** Toptal "Hire Top Talent" ~10×. Ours: **"Start free trial"**
   (→ Marketplace listing) repeated in nav, hero, mid-page, final band.
5. **Persona + use-case + values** is exactly the Toptal/Twine mid-page playbook — and exactly
   what the owner asked to surface. The content already exists in the repo; the redesign's job
   is promotion and dramatization, not invention.
