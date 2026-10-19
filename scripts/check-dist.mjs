// Build-time sanity checks on dist/. Exits 1 on any problem so a broken deploy never ships.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const pages = new Map();

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html') {
      const rel = relative(DIST, dir).split(sep).join('/');
      pages.set(rel ? `/${rel}/` : '/', readFileSync(full, 'utf8'));
    }
  }
}
walk(DIST);

const errors = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

for (const [page, html] of pages) {
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(page, `${h1s} <h1> tags, expected 1`);

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail(page, 'invalid JSON-LD');
    }
  }

  for (const [, href] of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    if (/^(https?:|tel:|mailto:|#)/.test(href)) continue;
    const path = href.split('#')[0].split('?')[0];
    if (!path) continue;
    if (/\.\w+$/.test(path)) {
      if (!existsSync(join(DIST, path))) fail(page, `missing file ${path}`);
    } else if (!path.endsWith('/')) {
      fail(page, `internal link without trailing slash: ${path}`);
    } else if (!pages.has(path)) {
      fail(page, `broken internal link: ${path}`);
    }
  }

  for (const [, img] of html.matchAll(/(?:og:image|twitter:image)" content="https:\/\/cargotopakistan\.ae(\/[^"]+)"/g)) {
    if (!existsSync(join(DIST, img))) fail(page, `social image not built: ${img}`);
  }
}

if (errors.length) {
  console.error(`check-dist: ${errors.length} problem(s)\n` + [...new Set(errors)].slice(0, 40).join('\n'));
  process.exit(1);
}
console.log(`check-dist: ${pages.size} pages OK`);
