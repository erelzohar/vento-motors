// Single source of truth for the pre-rendered HTML (see scripts/prerender.mjs).
// Everything here must match what the React components actually say — the point
// is to show crawlers the real page, not a separate marketing text.

export const site = {
  url: 'https://vento-motors.com',
  name: 'ונטו מוטורס',
  nameEn: 'Vento Motors',
  phone: '052-9100123',
  phoneIntl: '+972529100123',
  email: 'ventomotorsil@walla.com',
  logo: '/logo500.png',
  hours: 'ראשון - שישי: 8:00 - 18:00, שבת: סגור',
  social: [
    'https://www.facebook.com/ventomotors',
    'https://instagram.com/ventomotors_il',
    'https://www.tiktok.com/@ventomotors1'
  ]
};

const hero = {
  title: 'ונטו מוטורס - קנייה מיידית וללא כאב ראש!',
  lines: [
    'קבל הצעת מחיר לרכב שלך תוך דקות',
    'אנחנו מטפלים בכל הניירת ומשלמים במקום.',
    'ונטו - ככה מוכרים היום רכב'
  ],
  cta: 'קבל הצעה עכשיו'
};

const features = [
  ['אמינות מוכחת', '15 שנות ניסיון בשוק הרכב עם אלפי לקוחות מרוצים'],
  ['תשלום מיידי', 'קבל את הכסף לחשבון הבנק שלך ביום המכירה'],
  ['שירות מקיף', 'איסוף הרכב מהבית וטיפול בכל הניירת עבורך'],
  ['ליווי אישי', 'מומחה אישי שילווה אותך לאורך כל התהליך'],
  ['הצעה תוך דקות', 'קבל הצעת מחיר מיידית ללא המתנה מיותרת'],
  ['שקיפות מלאה', 'תהליך ברור ושקוף ללא עמלות נסתרות']
];

const process = [
  ['הזן את פרטי הרכב', 'מלא טופס פשוט עם מידע על הרכב שלך'],
  ['קבל הצעה מיידית', 'קבל הצעה משתלמת תוך דקות'],
  ['קבל תשלום היום', 'קבל תשלום מיידי במקום']
];

const stats = [
  ['+5000', 'רכבים נרכשו'],
  ['100%', 'שביעות רצון'],
  ['+15', 'שנות ניסיון']
];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]
  );

// Neither "</script" nor "<!--" can appear in the output, and it stays valid JSON
// (the separators are built by code point so this file never holds them literally)
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);
const SCRIPT_UNSAFE = new RegExp(`[<>${LINE_SEPARATOR}${PARAGRAPH_SEPARATOR}]`, "g");
const SCRIPT_ESCAPES = {
  "<": "\\u003c",
  ">": "\\u003e",
  [LINE_SEPARATOR]: "\\u2028",
  [PARAGRAPH_SEPARATOR]: "\\u2029"
};
const jsonForScript = (value) =>
  JSON.stringify(value, null, 2).replace(SCRIPT_UNSAFE, (ch) => SCRIPT_ESCAPES[ch] ?? ch);

const list = (items) =>
  items
    .map(([title, text]) => `<li><strong>${escapeHtml(title)}</strong> — ${escapeHtml(text)}</li>`)
    .join('\n        ');

// Hides the block below before the first paint when JS is available, so users
// never see it; crawlers without JS still get plain, visible markup.
// Must go in <head>, above the block it hides.
export function buildHideScript() {
  return [
    '<style>.js #seo-prerender{display:none}</style>',
    '<script>document.documentElement.className+=" js"</script>'
  ].join('\n  ');
}

// Rendered into #root. React replaces it on mount, so it only ever reaches
// crawlers and anyone whose JavaScript has not loaded yet.
export function buildBody() {
  return `
      <div id="seo-prerender" class="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 class="text-4xl font-bold">${escapeHtml(hero.title)}</h1>
        ${hero.lines.map((line) => `<p class="mt-4 text-lg">${escapeHtml(line)}</p>`).join('\n        ')}
        <p class="mt-6"><a href="#contact-form" class="font-semibold text-sunset">${escapeHtml(hero.cta)}</a></p>

        <h2 class="mt-12 text-2xl font-bold">למה ונטו מוטורס</h2>
        <ul class="mt-4 space-y-2 text-right">
        ${list(features)}
        </ul>

        <h2 class="mt-12 text-2xl font-bold">איך מתחילים ?</h2>
        <ol class="mt-4 space-y-2 text-right">
        ${list(process)}
        </ol>

        <ul class="mt-12 flex flex-wrap justify-center gap-8">
        ${stats.map(([n, label]) => `<li><strong>${escapeHtml(n)}</strong> ${escapeHtml(label)}</li>`).join('\n        ')}
        </ul>

        <h2 class="mt-12 text-2xl font-bold">צור קשר</h2>
        <p class="mt-4">
          טלפון: <a href="tel:${escapeHtml(site.phone.replace('-', ''))}">${escapeHtml(site.phone)}</a><br />
          דוא"ל: <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a><br />
          שעות פעילות: ${escapeHtml(site.hours)}
        </p>
      </div>
  `.trim();
}

const jsonLd = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: site.name,
    alternateName: site.nameEn,
    description: 'ונטו מוטורס קונה רכבים במחיר הוגן: הצעת מחיר תוך דקות, טיפול בכל הניירת ותשלום מיידי במקום.',
    url: `${site.url}/`,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.logo}`,
    telephone: site.phoneIntl,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'Israel' },
    availableLanguage: 'he',
    sameAs: site.social,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${site.url}/`,
    inLanguage: 'he-IL'
  }
];

// Added to <head>; index.html already carries title, description, OG and canonical
export function buildHead() {
  return [
    `<meta property="og:locale" content="he_IL" />`,
    `<meta property="og:image" content="${site.url}${site.logo}" />`,
    `<meta property="twitter:image" content="${site.url}${site.logo}" />`,
    ...jsonLd().map(
      (schema) => `<script type="application/ld+json">\n${jsonForScript(schema)}\n</script>`
    )
  ].join('\n  ');
}
