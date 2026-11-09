# Implementation Kickstart: Dolly's Tax & Advisory CPA, LLC (spec concept)

Concept website by Lee Enterprises Unlimited, built to win Dolly Suarez, CPA, CFP®, as a client.
Front-end only. Next.js App Router + TypeScript + Tailwind v4. Motion (motion/react) for animation, Lenis for smooth scroll.

## North star

"Quiet clarity": taxes and money, finally clear. Warm stone, ivory paper, brushed brass, eucalyptus sage, deep evergreen ink.
Signature shape: the arch. One CTA everywhere: **Book an intro call** (multi-step modal).

## Guardrails (check every phase)

- Only facts from the brief. No invented reviews, client counts, prices, awards, guarantees.
- Placeholders read `[Confirm ...]`. Sample reviews are labelled as samples.
- No em dashes or "--" in rendered copy. "CFP®" always with ®, used as an adjective.
- Never say "free" intro call. Never say "Lexington Park" (town unconfirmed): use "Southern Maryland".
- `noindex, nofollow` until she buys.
- Reduced motion: final states instantly.

## Tokens

| Token | Value |
|---|---|
| ivory | `#F4EFE7` |
| stone | `#EBE4D8` |
| ink | `#1E2622` |
| brass | `#A8834A` (hover `#8F6E3B`; small text on brass uses ink) |
| sage | `#8A9A86` |

Type: Fraunces (display, soft italic for one word) + Inter (body/UI), via `next/font`.

## Phase 0: assets

- [x] Download the three Drive photos into `public/images/raw/`
- [x] Background-removed headshot cutout (rembg), original kept as fallback
- [x] Certificate: crop off Facebook UI, blur license number, cap at 360px display
- [x] Desk cover: blurred texture crop for backgrounds, palette reference only
- [ ] Optimized AVIF/WebP via `next/image`

## Phase 1: hero + nav

- [x] Project scaffold, tokens, fonts, paper grain, focus rings
- [x] Concept mark (SVG monogram "D" in brass arch + wordmark), labelled as concept
- [x] Nav: transparent over hero, ivory blur + hairline on scroll, full-screen mobile menu
- [x] Hero: eyebrow, headline "Taxes, finally *clear*.", subhead, CTA, call link, arch cutout, eucalyptus line art, credential chip, arch mask reveal + staggered fade-up
- [x] Booking modal (4 steps, progress bar, focus trap, Esc, console payload + TODO)

## Phase 2: story + services

- [x] Credential strip (4 verified facts)
- [x] "Two disciplines. One clear picture." scroll-linked circle merge (reduced motion: merged)
- [x] Services bento (4 cards, planning card large, `[Confirm pricing]`)
- [x] "Flat fee. Your investments stay put." dark ink section + CTA
- [x] Who I help (4 cards incl. federal employees & military families)

## Phase 3: timeline + fit check

- [x] "The tax year, mapped." pinned horizontal scroll on desktop, vertical stack on mobile, weekend/holiday footnote
- [x] "Which service fits you?" 3-question fit check, recommendation card, CTA pre-selects modal answer

## Phase 4: About / FAQ / CTA / footer / contact

- [x] How it works: 3 steps, brass line drawn on scroll, `[Confirm her portal]`
- [x] Meet Dolly: arch portrait, framed certificate, draft first-person note, SVG signature
- [x] Kind words: 3 labelled sample reviews + "Leave a Google review" placeholder
- [x] FAQ accordion (8 questions, aria-expanded, keyboard accessible)
- [x] Final CTA band
- [x] Footer (both pages) with disclaimer + "Concept preview by Lee Enterprises Unlimited."
- [x] `/contact` page with inline booking form

## Phase 5: polish + SEO

- [ ] Metadata: title, description, canonical, OG/Twitter, noindex
- [ ] Favicon, apple-touch icon, 1200x630 OG image
- [ ] JSON-LD `AccountingService`
- [ ] QA: em dash grep, CFP® grep, anchors, reduced motion, 375/768/1280/1600 widths, no horizontal scroll
- [ ] Lighthouse mobile (target 95+ all four)
- [ ] Screenshots at 375 and 1440
- [ ] Push + deploy
