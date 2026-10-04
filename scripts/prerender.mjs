// Runs after `vite build`. The app is client-rendered, so the built index.html
// ships an empty <div id="root"></div> — crawlers that do not run JavaScript
// (most AI crawlers) see nothing. This fills it with the real page content and
// adds JSON-LD, then React replaces it on mount.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildBody, buildHead, buildHideScript } from './seo-content.mjs';

const dist = resolve(process.cwd(), 'dist');
const indexPath = resolve(dist, 'index.html');
const sitemapPath = resolve(dist, 'sitemap.xml');

const fail = (message) => {
  console.error(`prerender: ${message}`);
  process.exit(1);
};

const html = await readFile(indexPath, 'utf8');

if (!html.includes('<div id="root"></div>')) {
  fail('no empty <div id="root"></div> in dist/index.html — did the markup change?');
}
if (!html.includes('</head>')) {
  fail('no </head> in dist/index.html');
}

const prerendered = html
  .replace('<div id="root"></div>', `<div id="root">\n${buildBody()}\n    </div>`)
  .replace('</head>', `  ${buildHead()}\n  ${buildHideScript()}\n</head>`);

await writeFile(indexPath, prerendered);

// Keep <lastmod> honest: the content ships with this build
const today = new Date().toISOString().slice(0, 10);
try {
  const sitemap = await readFile(sitemapPath, 'utf8');
  await writeFile(sitemapPath, sitemap.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  console.warn('prerender: no dist/sitemap.xml, skipping lastmod');
}

const added = prerendered.length - html.length;
console.log(`prerender: index.html +${added} bytes, sitemap lastmod ${today}`);
