# Launch-Blocking Placeholders

Everything in this table is a placeholder that must be swapped with a real,
verified value before the site goes live. Damean Callum provides each value.
The single source of truth for text-based facts is `content/business.json`.
Never hard-code any of these values in copy or components: always render from
`business.json` through the loaders in `lib/content.ts`.

| Item | Where it lives now | Real value needed | Provided by | Consumed where |
| --- | --- | --- | --- | --- |
| Founder name spelling | `business.json` -> `founder.name` ("Damean Callum") and `founder.note` | Confirmed legal spelling from the license record. Do not invent an alternative. | Damean (license verification) | Header/footer brand context, About page, service and city copy that name the owner |
| Phone number | `business.json` -> `phoneDisplay` "(954) 555-0100", `phoneTel` "+19545550100", flag `phoneIsPlaceholder: true` | Real business phone in display and tel formats | Damean | Header phone link, StickyCallBar "Call Now", Footer contact block, every call CTA |
| Email address | `business.json` -> `email` "office@ghostcrownelectric-placeholder.com", flag `emailIsPlaceholder: true` | Real inbox that is monitored | Damean | Footer contact block, Contact page |
| Street address | `business.json` -> `address` (only `locality`, `region`, `country` are set; `streetIsPlaceholder: true`) | Full street address if a public storefront is listed, or confirmation to stay locality-only | Damean | Footer, Contact page, LocalBusiness schema (worker W2) |
| Florida license number | `business.json` -> `licenses[0].number` = "PLACEHOLDER" | Florida Certified Electrical Contractor license number | Damean | Footer license line (renders "License number available on request" while PLACEHOLDER), About/trust sections, schema |
| Broward license number | `business.json` -> `licenses[1].number` = "PLACEHOLDER" | Broward County Master Electrician license number | Damean | Footer license line (renders "License number available on request" while PLACEHOLDER), About/trust sections, schema |
| Logo artwork | Inline placeholder crown SVG in `components/layout/Header.tsx` and `components/layout/Footer.tsx` | Final Ghost Crown Electric logo (SVG preferred, plus favicon set) | Damean / designer | Header brand mark, Footer brand mark, favicon and app icons |
| Open Graph / social share image | Generated placeholder at `public/og-default.png` (1200x630, brand colors and site name), referenced by `lib/seo.ts` as `/og-default.png` | Final branded 1200x630 OG image from the designer | Damean / designer | Social link previews across the site (metadata layer) |
| Canonical site URL | `NEXT_PUBLIC_SITE_URL` env var; fallback constant `SITE_URL` in `lib/content.ts` | Real production domain (for absolute URLs in sitemap, robots, canonical tags, OG) | Damean | `app/sitemap.ts`, `app/robots.ts`, metadata base |
| Lead webhook destination | `LEAD_WEBHOOK_URL` env var (unset); `app/api/lead/route.ts` logs to the server console while it is unset | Lead destination is undecided (email, CRM, or GHL). Set the env var to the chosen endpoint. | Damean | `app/api/lead/route.ts`, the lead form on the home, `/book`, and `/contact` pages |

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

Service content JSON with the first name in prose (the four pool pages):

- `content/services/pool-electrical-repair.json`
- `content/services/pool-electrical-service-rebuild.json`
- `content/services/pool-gfci-breaker-replacement.json`
- `content/services/pool-grounding-bonding-inspection.json`

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
