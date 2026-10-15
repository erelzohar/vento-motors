// One-off snapshot of the Facebook reviews into the repo (run: node scripts/fetch-reviews.mjs).
// Source: the data service behind the Elfsight widget, which still answers after the
// widget itself hit its paid view limit. The site reads only the snapshot, never this
// service, so it keeps working whatever happens to Elfsight. Re-run to refresh.
//
// Reviewer pictures are not kept: the service stores Facebook image URLs whose
// signatures expire (54 of 60 had on 2026-10-16), so the cards show initials instead.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const PAGE = 'https://www.facebook.com/ventomotors';
const ENDPOINT =
  'https://service-reviews-ultimate.elfsight.com/data/reviews' +
  `?uris%5B%5D=${encodeURIComponent(PAGE)}&filter_content=text_required&page_length=100`;

const dataFile = resolve(process.cwd(), 'src/data/reviews.json');

const response = await fetch(ENDPOINT, {
  headers: { Origin: 'https://vento-motors.com', Referer: 'https://vento-motors.com/' },
});
const body = await response.json();
const items = body?.result?.data;
if (!response.ok || body?.status !== 'success' || !Array.isArray(items) || items.length === 0) {
  console.error(`fetch-reviews: no reviews (HTTP ${response.status}); keeping the current snapshot`);
  process.exit(1);
}

const reviews = items
  .filter((item) => item.supplier === 'facebook' && (item.text || '').trim())
  .map((item) => ({
    id: item.id,
    name: item.reviewer_name || null,
    rating: typeof item.rating === 'number' ? item.rating : null,
    text: item.text.trim(),
    url: item.url || PAGE,
    createdTime: new Date(item.published_at * 1000).toISOString(),
  }))
  .sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime));

await mkdir(resolve(process.cwd(), 'src/data'), { recursive: true });
await writeFile(dataFile, `${JSON.stringify(reviews, null, 2)}\n`);
console.log(`fetch-reviews: ${reviews.length} reviews`);
