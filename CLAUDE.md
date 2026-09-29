# cargotopakistan.ae — project context

Live production site + Google Ads account for a UAE→Pakistan cargo shipping
business. This file is a handoff for starting a fresh chat session with full
context — read it before doing anything else in this repo.

## Repo / deploy

- **Active repo:** `ameercho/cargo-to-pakistan-ae-87` — this folder. Deployed
  via Netlify to `cargotopakistan.ae`.
- **Stack:** Astro, `output: 'static'`. Migrated off a broken Vite/React SPA
  (the old build had a `prerender.js` SSR step that silently failed and
  served empty `<!--app-html-->` shells to crawlers — that's why organic
  search was dead for a long time). Migration shipped ~2026-09-22 and is
  confirmed live: homepage and sampled pages return real rendered HTML and
  are being indexed by Google (verified via GSC URL Inspection).
- **A second, unrelated repo** (`ameercho/cargotopakistan-v3`, a Sanity CMS
  rebuild) was explored and then dropped 2026-09-29. Do not reference it or
  resume that plan — it's closed.
- **Do not make website code changes without the user's explicit,
  per-instance permission.** Standing rule from early in this project.

## Google Ads account

- **Account:** "Mars Express", customer ID `9956184880`, under Manager
  Account `1249216033`. This is a **shared/multi-tenant MCC** — also serves
  sibling businesses (pakistancargo.org, Technical Services, postadrop.com,
  and others). Always double-check which child account you're actually
  operating in before making changes; a past mistake built a conversion
  action under the wrong account (the Manager Account) instead of Mars
  Express.
- **Live campaign:** `DXB-Max-Conv`.
- **Hard rule: never delete a Google Ads keyword without the user's explicit
  per-instance approval.** Keywords carry long Quality Score/performance
  history. Pause instead of delete when a keyword needs to stop serving.
  This caution is specific to keywords — ad groups/ads can be handled more
  freely if the user says so.
- **HubSpot → Ads conversion import** is live: Contacts, filtered on
  "Lifecycle Stage becomes Customer", event source = Phone (static),
  conversion value = WeightedDealAmount, conversion action name "HubSpot
  Close Win" (category: Converted lead, Count: Every). Runs nightly
  ~22:00–23:00 GMT+4. Confirmed created under the correct account
  (`9956184880`), not the Manager Account.

## Tracking stack (GA4 / GTM / GSC)

- **GA4 property:** `489873880`.
- **GTM container:** account `6101753969`, container `117655646`
  (`GTM-TCDZPFK`).
- **Shared "Google tag" entity** (a gtag.js-level construct, separate from
  GTM) named "Cargo to Pakistan" — was previously bundling a sibling
  business's measurement ID (`G-BS06Q55ZGP`, belongs to pakistancargo.org)
  into this site's tag. Fully separated out via "Assign to a new Google
  tag" (not just removing it as a destination — that only stops reporting,
  it doesn't un-bundle the ID). If similar cross-contamination shows up
  again, that's the fix pattern.
- **2026-09-23 fix:** GTM triggers for phone-call-click and WhatsApp-click
  (triggers 30 and 32) were matching by CSS selector on the button element,
  which had silently broken (likely a site markup change) — real clicks had
  stopped registering in GA4 and Ads entirely for a few days
  (~Sep 20–22). Rebuilt both triggers to match by **Click URL** containing
  `tel:` / `wa.me` instead — robust against future markup changes, won't
  break the same way again. Published and confirmed firing correctly in
  both GA4's event log and Ads' conversion data since.
- **GA4 → Ads link:** pakistancargo.org's GA4 property (`374094225`) was
  previously linked into this same Ads account, inflating DXB-Max-Conv's
  conversion count with a sibling business's website clicks
  (~Sep 21–23, ~14 fake conversions/day). Unlinked; confirmed zero ghost
  conversions since Sep 24. Do not relink it.

## GSC status (as of 2026-09-29)

- Migration is live and Google has started reindexing (homepage and
  `/dubai-to-pakistan/` both confirmed "Submitted and indexed" with recent
  crawl dates), but it's **incomplete** — e.g. `/pakistan-cargo-to-karachi/`
  (a top Quality-Score page in Ads) came back "URL is unknown to Google."
- There's a **stale old sitemap submission** in GSC (`sitemap.xml`, last
  submitted March, 54 URLs, the live site now 404s that exact path) still
  registered alongside the correct new one (`sitemap-index.xml`, 44 URLs).
  Worth removing the stale one and requesting indexing for the
  not-yet-crawled high-value pages to speed up recovery.
- Click/impression numbers in GSC haven't moved yet — expected, since most
  of the 44 pages haven't been individually recrawled. Give it 1–4 weeks
  post-migration before treating flat GSC numbers as a real problem again.

## API access / credentials (for scratchpad scripts)

- **Google Ads API:** OAuth client credentials + refresh token, currently
  sitting in `D:\Claude Projects\cargo-to-pakistan-ae\` (the now-closed v3
  repo's folder — unrelated to v3, just parked there):
  `env.google-ads-oauth.back`, `refresh-token.google-ads.back.json`,
  `google-ads-developer-token.back`. Login customer ID for API calls is the
  Manager Account `1249216033`; target customer ID is `9956184880`.
- **GA4 / GSC (Search Console):** service account JSON at
  `D:\Claude Projects\Pakistan-cargo-express\GoogleAPI\ervice_account.json`
  (`pce-seo-tools@pakistan-cargo-express-509511.iam.gserviceaccount.com`).
  Scopes used: `analytics.readonly`, `webmasters.readonly`. This account has
  read access; some GTM/Google-tag edits needed the user's own Google login
  done live in-browser instead (the service account was read-only there).
- These paths move around between sessions (the whole project got
  reorganized once already) — if a script fails with ENOENT on one of these
  paths, search for the file by name under `D:\Claude Projects\` before
  assuming credentials are gone.

## Working style notes

- The user drives Google Ads/GTM/GA4 UI changes themselves via
  screen-share/browser control as much as via direct API mutation — expect
  a mix of "do it via the Ads API" and "log in and click through it with
  me" depending on what needs a real user login (shared/cross-account
  Google tag edits require the user's own full-access login; the service
  account and embedded views are read-only there).
- Be precise about which of the two historical repos ("v3" vs the active
  "-87" repo) and which Ads account/child customer you're touching —
  several past mistakes here came from operating in the wrong one.
