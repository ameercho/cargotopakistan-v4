# Cargo to Pakistan (cargotopakistan.ae)

Static marketing site for a UAE-based cargo and relocation business shipping household
goods, personal effects, and commercial cargo from the UAE to Pakistan (full container,
sea freight, courier, packing, and home moving services).

**Live site:** https://cargotopakistan.ae

## Stack

- **[Astro](https://astro.build) 7** — static site generation (`output: 'static'`), no
  server runtime, no database
- **Tailwind CSS 4** — CSS-native config via `@theme` in `src/styles/global.css`
- **Astro Content Collections** — all destination/service/location content lives as
  Markdown in `src/content/`, typed and validated via `src/content.config.ts`
- **[Netlify](https://netlify.com)** — hosting, forms (native Netlify Forms, no custom
  backend), and redirects (`netlify.toml`)

There is no CMS and no database by design — all content is git-based Markdown, editable
directly in this repo.

## Project structure

```
src/
  content/
    destinations/     16 Pakistan-city pages   (/pakistan-cargo-to-{city}/)
    uaeLocations/      8 UAE origin/area pages  (/{city}-to-pakistan/, /areas/{area}/)
    services/         12 service entries used by the shared services/[slug].astro
                       template and by listings (homepage, /services/)
  pages/
    services/
      [slug].astro           shared template for most services
      full-container.astro   dedicated page (real photos, relocation-focused rates)
      packaging.astro        dedicated page (real per-item packing rates)
      courier-service.astro  dedicated page (real carrier rates, DHL/FedEx/UPS/Aramex)
      moving-home.astro      dedicated page (UAE-local moving rates + vehicle fleet)
    pakistan-cargo-to-[slug].astro   destination page template
    [slug]-to-pakistan.astro        UAE origin page template
    areas/[slug].astro             UAE area page template
    index.astro, about.astro, contact.astro, faq.astro, get-a-quote.astro, ... static pages
  layouts/Layout.astro    shared <head>, canonical/OG/Twitter tags, sitewide JSON-LD,
                          GTM, and the hidden Netlify Forms registrations
  components/             shared UI (Header, Footer, PricingTable, FloatingActions, ...)
  lib/                    site config, pricing/rate data, small typed helpers
  assets/                 real photos, processed through Astro's image pipeline
                          (astro:assets) — resized/optimized/converted to WebP at build
public/                  files served as-is (favicon, manifest, courier partner SVG logos)
```

Four services (Full Container, Packaging, Courier Service, Moving Home) have their own
dedicated page instead of the shared `[slug].astro` template, because each needed a
genuinely different content shape (real per-item or per-carrier rates, real photos,
service-specific FAQs) rather than the generic per-kg pricing table used elsewhere.

## Getting started

```sh
npm install
npm run dev       # http://localhost:4321, hot-reloading
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Content & pricing

- Per-kg pricing data lives in `src/lib/pricing.ts`.
- Service-specific rate tables (packing, courier, moving) live alongside the pages that
  use them in `src/lib/*Rates.ts`.
- To add or edit a destination/service/location page, edit or add a Markdown file under
  `src/content/` — schemas are enforced in `src/content.config.ts`.

## Deployment

Netlify builds from `main` via `npm run build` (see `netlify.toml` for redirects,
security headers, and cache rules). Auto-publish is currently **disabled** — deploys are
triggered manually from the Netlify dashboard after a merge to `main`.

## History

This site was rebuilt from a Vite + React + Supabase SPA to static Astro in 2026, after
the previous stack's client-side prerendering silently served empty content to search
crawlers, blocking organic indexing entirely. The rebuild prioritizes genuinely static,
crawlable HTML with no server-side rendering step to fail. The old source tree, Supabase
project, and build tooling have all been removed — nothing from that stack remains.
