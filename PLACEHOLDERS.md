# Launch-Blocking Placeholders

Everything in this table is a placeholder that must be swapped with a real,
verified value before the site goes live. Damean Callum provides each value.
The single source of truth for text-based facts is `content/business.json`.
Never hard-code any of these values in copy or components: always render from
`business.json` through the loaders in `lib/content.ts`.

| Item | Where it lives now | Real value needed | Provided by | Consumed where |
| --- | --- | --- | --- | --- |
| Founder name spelling | `business.json` -> `founder.name` ("Damean Callum") and `founder.note` | Confirmed legal spelling from the license record. Do not invent an alternative. | Damean (license verification) | Header/footer brand context, About page, service and city copy that name the owner |
| ~~Phone number~~ RESOLVED | `business.json` -> `phoneDisplay` "(754) 213-2747", `phoneTel` "+17542132747", flag `phoneIsPlaceholder: false` | Done. Real number supplied by Damean on 2026-07-28. | Damean | Header phone link, StickyCallBar "Call Now", Footer contact block, every call CTA |
| Email address | `business.json` -> `email` "office@ghostcrownelectric-placeholder.com", flag `emailIsPlaceholder: true` | Real inbox that is monitored | Damean | Footer contact block, Contact page |
| Street address | `business.json` -> `address` (only `locality`, `region`, `country` are set; `streetIsPlaceholder: true`) | Full street address if a public storefront is listed, or confirmation to stay locality-only | Damean | Footer, Contact page, LocalBusiness schema (worker W2) |
| Florida license number | `business.json` -> `licenses[0].number` = "PLACEHOLDER" | Florida Certified Electrical Contractor license number | Damean | Footer license line (renders "License number available on request" while PLACEHOLDER), About/trust sections, schema |
| Broward license number | `business.json` -> `licenses[1].number` = "PLACEHOLDER" | Broward County Master Electrician license number | Damean | Footer license line (renders "License number available on request" while PLACEHOLDER), About/trust sections, schema |
| ~~Logo artwork~~ RESOLVED | Real logo wired in: crown+bolt icon at `public/brand/crown-icon.png` (rendered by `components/layout/CrownMark.tsx` in header/footer); full lockup at `public/brand/logo-full.png`; favicons at `app/icon.png` and `app/apple-icon.png` | Done. Generated (Nano Banana Pro, concept D: gold crown + electric-blue bolt) on 2026-08-07. Source + all sizes (4K, transparent, web, favicon) in `Files/Generated Content/logos/final/`. | Damean (approved concept D) | Header brand mark, Footer brand mark, favicon and app icons |
| ~~Open Graph / social share image~~ RESOLVED | Branded OG image wired in: `public/og-ghost-crown.png` (1200x630, dark crown lockup on navy + tagline), referenced by `lib/seo.ts` as `/og-ghost-crown.png` | Done. Built 2026-08-07 from the dark logo lockup. Source in `Files/Generated Content/logos/final/og-share-navy.png`. Old `og-default.png` placeholder retired. | Damean (approved) | Social link previews across the site (metadata layer) |
| Canonical site URL | `NEXT_PUBLIC_SITE_URL` env var; fallback constant `SITE_URL` in `lib/content.ts` | Real production domain (for absolute URLs in sitemap, robots, canonical tags, OG) | Damean | `app/sitemap.ts`, `app/robots.ts`, metadata base |
| ~~Lead delivery email~~ RESOLVED | Lead form now submits **client-side to Web3Forms** (`components/forms/LeadForm.tsx`), which emails each submission to **andres@mycreativestrategist.com** (recipient set on the "Ghost Crown Electric" form in the Web3Forms Pro dashboard; access key `103f77bc-91ed-4a7d-9b1b-01ee9e773092`, a public key, hardcoded with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` override). Verified end-to-end 2026-08-13 (200 success + submission in the Web3Forms Inbox). The `app/api/lead/route.ts` Resend/webhook/console path remains as an unused fallback. | Optional: verify `ghostcrownelectric.com` in Web3Forms and add more recipient emails (Pro allows up to 5), or forward leads to Damean. | Andres (owns the Web3Forms account) | `components/forms/LeadForm.tsx`; lead form on home, `/book`, `/contact` |

## Founder name: files to update in one sweep

The working spelling is "Damean" everywhere. No variant spelling (Damian, Damien,
Damion, Damon) exists in the tree. Once the legal spelling is confirmed from the
license record, update `content/business.json` first, then apply the same change
across every file below in a single sweep. The name is the owner's first name used
in warm, personal prose, so it is written into copy rather than rendered from
`business.json` in most places; that is intentional and acceptable per the run
contract (only phone, email, and license numbers must render from
`business.json`).

Source of truth (change this first):

- `content/business.json` (`founder.name`)

Service content JSON with the first name in prose:

- `content/services/pool-electrical.json` (the four granular pool pages
  consolidated here on 2026-08-07)

Page and component copy with the first name:

- `app/page.tsx`
- `app/book/page.tsx`
- `app/contact/page.tsx`
- `components/forms/LeadForm.tsx`
- `components/ui/CTABand.tsx`

Code comment only (not user facing, update for consistency):

- `components/layout/ExitIntentPopup.tsx`

## How placeholder flags work

`business.json` carries explicit boolean flags (`phoneIsPlaceholder`,
`emailIsPlaceholder`, `address.streetIsPlaceholder`) and the string sentinel
`"PLACEHOLDER"` on license numbers and the founder note. Components check these
so the site degrades gracefully:

- License numbers render a calm "License number available on request" line while
  the value is still `"PLACEHOLDER"`, and switch to the real number once set.
- Phone and email still render (the placeholder values are valid formats) so the
  layout is complete, but the flags let a pre-launch check catch them.

## Launch checklist

1. Replace every value above in `content/business.json`.
2. Drop the real logo into the header and footer and add favicon/OG assets.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Flip each `*IsPlaceholder` flag to `false` and remove the `"PLACEHOLDER"`
   sentinels once the real values are in place.
5. Search the repo for the word "PLACEHOLDER" and confirm zero remain.

## Legal pages

The Privacy Policy and Terms of Use pages are templates pending attorney review before launch.
