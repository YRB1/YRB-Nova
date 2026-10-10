#!/usr/bin/env node
/* =====================================================================
   YRB Nova healthcare demo generator.
   Usage:  node demos/_kit/build.js brightwell-dental   (or "all")
   Each brand lives in demos/_kit/sites/<id>.js. This script writes plain
   static HTML into demos/<id>/ and copies the shared kit into
   demos/<id>/assets/kit/ so every demo folder is fully self-contained.
   To turn a demo into a real client site: copy a site config, change the
   data (practices, treatments, team, copy) and run this again.
   ===================================================================== */
const fs = require('fs');
const path = require('path');

const KIT = __dirname;
const DEMOS = path.resolve(KIT, '..');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const img = (id, w, h, q = 70) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=${q}`;
const tel = p => p.replace(/\s/g, '');

function build(id) {
    const S = require(path.join(KIT, 'sites', id + '.js'));
    const OUT = path.join(DEMOS, S.id);
    fs.mkdirSync(path.join(OUT, 'assets', 'kit'), { recursive: true });
    for (const f of ['kit.css', 'kit.js']) fs.copyFileSync(path.join(KIT, f), path.join(OUT, 'assets', 'kit', f));

    const I = window_icons();
    const BASE = `https://yrbnova.com/demos/${S.id}/`;
    const flagship = S.practices.find(p => p.page) || S.practices[0];

    /* ---------- data.js for the browser ---------- */
    const data = {
        id: S.id, name: S.name, shortName: S.shortName, region: S.region, refPrefix: S.refPrefix,
        bookUrl: 'book.html', homeUrl: 'index.html',
        practices: S.practices.map(p => ({ id: p.id, name: p.name, town: p.town, address: p.address, phone: p.phone, lat: p.lat, lng: p.lng, hours: p.hours, page: p.page || null, tags: p.tags || [] })),
        treatments: S.treatments.map(t => ({ id: t.id, name: t.name, from: t.from, duration: t.duration, nhs: !!t.nhs })),
        calls: S.calls
    };
    fs.writeFileSync(path.join(OUT, 'assets', 'data.js'), `/* ${S.name} demo data. Edit this file to change practices, treatments and the AI call examples. */\nwindow.SITE = ${JSON.stringify(data, null, 2)};\n`);

    /* ---------- shared layout ---------- */
    const navItems = [['index.html', 'Home'], ['locations.html', S.copy.navLocations || 'Locations'], ['treatments.html', S.copy.navTreatments || 'Treatments'], ['fees.html', S.copy.navFees || 'Prices'], ['team.html', S.copy.navTeam || 'Our team'], ['offers.html', S.copy.navOffers || 'New patients']];
    const head = (page) => `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${BASE}${page.file === 'index.html' ? '' : page.file}">
<meta name="theme-color" content="${S.themeColor}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(S.favicon)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(S.name)} (demo)">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${BASE}${page.file === 'index.html' ? '' : page.file}">
<meta property="og:image" content="${img(S.ogImage, 1200, 630, 75)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="${S.fontsUrl}">
<link rel="stylesheet" href="assets/kit/kit.css">
<link rel="stylesheet" href="assets/brand.css">
${(page.schema || []).map(j => `<script type="application/ld+json">\n${JSON.stringify(j, null, 2)}\n</script>`).join('\n')}
</head>
<body class="page-${page.file.replace('.html', '')}">
<a class="k-skip" href="#main">Skip to content</a>
`;
    const urgent = () => `<div class="k-urgent" role="region" aria-label="${esc(S.urgent.label)}">
    <div class="k-container"><span class="k-dot" aria-hidden="true"></span><span>${S.urgent.html}</span></div>
</div>`;
    const header = (file) => `${urgent()}
<header class="k-header">
    <div class="k-bar k-glass">
        <a class="k-logo" href="index.html" aria-label="${esc(S.name)} home">${S.logo}<span>${S.logoText}</span></a>
        <nav class="k-nav" aria-label="Main">
            <ul>${navItems.map(([h, l]) => `<li><a href="${h}"${h === file ? ' aria-current="page"' : ''}>${esc(l)}</a></li>`).join('')}</ul>
        </nav>
        <a class="k-btn k-btn-primary k-header-cta" href="book.html" data-sales="${esc(S.sales.headerBook)}">${esc(S.copy.bookLabel)}</a>
        <button class="k-menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
    </div>
</header>
<div class="k-mobile-nav" id="mobile-nav" aria-label="Menu">
    <button class="k-menu-btn k-close" type="button" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <ul>${navItems.map(([h, l]) => `<li><a href="${h}"${h === file ? ' aria-current="page"' : ''}>${esc(l)}</a></li>`).join('')}</ul>
    <div class="k-btn-row"><a class="k-btn k-btn-primary" href="book.html">${esc(S.copy.bookLabel)}</a><a class="k-btn k-btn-ghost" href="tel:${tel(S.phone)}">${I.phone} Call ${esc(S.phone)}</a></div>
</div>`;
    const footer = () => `
<footer class="k-footer">
    <div class="k-container">
        <div class="k-footer-grid">
            <div>
                <a class="k-logo" href="index.html">${S.logo}<span>${S.logoText}</span></a>
                <p style="margin-top:14px">${esc(S.copy.footerAbout)}</p>
                <p><a href="tel:${tel(S.phone)}"><strong>${esc(S.phone)}</strong></a><br><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>
                <p class="k-badge-247"><i aria-hidden="true"></i>24/7 calls answered</p>
            </div>
            <div>
                <h2>Our ${esc(S.copy.unitPlural)}</h2>
                <ul class="k-footer-locations">${S.practices.map(p => `<li><a href="${p.page || 'locations.html'}">${esc(p.name)}</a></li>`).join('')}</ul>
                <p style="margin-top:14px;font-size:.9rem">${esc(S.copy.hoursNote)}</p>
            </div>
            <div>
                <h2>Help</h2>
                <ul>
                    <li><a href="book.html">${esc(S.copy.bookLabel)}</a></li>
                    <li><a href="fees.html">${esc(S.copy.navFees || 'Prices')}</a></li>
                    <li><a href="offers.html">${esc(S.copy.navOffers || 'New patients')}</a></li>
                    <li><a href="accessibility.html">Accessibility statement</a></li>
                    <li><a href="privacy.html">Privacy policy</a></li>
                    <li><a href="#" data-open-cookies>Cookie settings</a></li>
                </ul>
            </div>
        </div>
        <div class="k-footer-bottom">
            <span>&copy; <span data-year>2026</span> ${esc(S.name)}. ${esc(S.copy.regLine)}</span>
            <span class="k-demo-note">Demo website by <a href="https://yrbnova.com/healthcare.html">YRB Nova</a>, fictional brand. Practices, people and reviews are illustrative.</span>
        </div>
    </div>
</footer>
<div class="k-mobile-bar" aria-label="Quick actions"><a class="k-btn k-btn-primary" href="book.html">${esc(S.copy.bookLabel)}</a><a class="k-btn k-btn-ghost" href="tel:${tel(S.phone)}">${I.phone} Call</a></div>
<div class="k-cookie k-glass" role="dialog" aria-labelledby="cookie-title" aria-live="polite">
    <h2 id="cookie-title">Your privacy</h2>
    <p>We use essential cookies to make this site work. With your permission we'd also like to use analytics cookies to understand how people use it. <a href="privacy.html">Privacy policy</a></p>
    <div class="k-cookie-prefs"><label><input type="checkbox" checked disabled> Essential (always on)</label><label><input type="checkbox" name="analytics"> Analytics</label><label><input type="checkbox" name="marketing"> Marketing</label></div>
    <div class="k-btn-row"><button type="button" class="k-btn k-btn-primary" data-cookie="accept">Accept all</button><button type="button" class="k-btn k-btn-ghost" data-cookie="reject">Essential only</button><button type="button" class="k-btn k-btn-ghost" data-cookie="manage">Manage</button></div>
</div>
<script src="assets/data.js"></script>
<script src="assets/kit/kit.js" defer></script>
</body>
</html>
`;
    const page = (p, body) => {
        fs.writeFileSync(path.join(OUT, p.file), head(p) + header(p.file) + `\n<main id="main">\n${body}\n</main>\n` + footer());
        written.push(p.file);
    };
    const written = [];
    const glow = () => `<div class="k-glow" aria-hidden="true">${S.glows.map(g => `<span style="${g}"></span>`).join('')}</div>`;
    const crumbs = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', BASE], ...items].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: u })) });

    /* ---------- schema ---------- */
    const practiceSchema = p => ({
        '@type': S.schemaType, name: p.name, telephone: p.phone, url: BASE + (p.page || 'locations.html'),
        address: { '@type': 'PostalAddress', streetAddress: p.street, addressLocality: p.town, postalCode: p.postcode, addressCountry: 'GB' },
        geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng },
        openingHoursSpecification: Object.entries(p.hours).filter(([, h]) => h).map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d], opens: h[0], closes: h[1] }))
    });
    const orgSchema = { '@context': 'https://schema.org', '@type': 'Organization', name: S.name, url: BASE, telephone: S.phone, email: S.email, description: S.copy.metaHome, logo: BASE + 'assets/logo.svg', department: S.practices.map(practiceSchema) };

    /* ---------- reusable sections ---------- */
    const reviewCard = r => `<article class="k-review k-glass">
        <div class="k-stars" aria-label="${r.stars} out of 5 stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <blockquote><p>${esc(r.text)}</p></blockquote>
        <footer><span><strong>${esc(r.name)}</strong> · ${esc(r.where)}</span><span class="k-sample-tag">Sample review</span></footer>
    </article>`;
    const reviews = (title = S.copy.reviewsTitle) => `<section class="k-section" aria-labelledby="reviews-h">
    <div class="k-container">
        <div class="k-center k-reveal"><p class="k-eyebrow">${esc(S.copy.reviewsEyebrow)}</p><h2 id="reviews-h">${esc(title)}</h2><p class="k-lede">${esc(S.copy.reviewsLede)}</p></div>
        <div class="k-carousel k-reveal" data-carousel aria-label="Patient reviews" data-sales="${esc(S.sales.reviews)}">
            <div class="k-carousel-track" tabindex="0">${S.reviews.map(reviewCard).join('')}</div>
            <div class="k-carousel-controls"><button type="button" class="k-carousel-btn" data-prev aria-label="Previous review">${I.left}</button><div class="k-carousel-dots"></div><button type="button" class="k-carousel-btn" data-next aria-label="Next review">${I.right}</button></div>
        </div>
    </div>
</section>`;
    const finder = (limit, heading = true) => `<section class="k-section" aria-labelledby="finder-h">${glow()}
    <div class="k-container">
        ${heading ? `<div class="k-reveal"><p class="k-eyebrow">${esc(S.copy.finderEyebrow)}</p><h2 id="finder-h">${esc(S.copy.finderTitle)}</h2><p class="k-lede">${esc(S.copy.finderLede)}</p></div>` : `<h2 id="finder-h" class="k-sr">Find a ${esc(S.copy.unit)}</h2>`}
        <div data-finder data-limit="${limit || 0}" data-sales="${esc(S.sales.finder)}">
            <form class="k-finder-search k-glass" role="search" aria-label="Find a ${esc(S.copy.unit)}">
                <label for="finder-${limit || 'all'}" class="k-sr">Postcode or town</label>
                <input id="finder-${limit || 'all'}" type="search" inputmode="search" autocomplete="postal-code" placeholder="Enter your postcode or town, e.g. ${esc(S.copy.finderExample)}">
                <button type="submit" class="k-btn k-btn-primary">${I.search} Search</button>
                <button type="button" class="k-btn k-btn-ghost" data-nearest>${I.pin} Nearest to me</button>
            </form>
            <p class="k-finder-status" role="status" aria-live="polite"></p>
            <div class="k-practices${limit ? '' : ' cols-3'}"></div>
        </div>
        ${limit ? `<p class="k-center" style="margin-top:22px"><a class="k-btn k-btn-ghost" href="locations.html">See all ${S.practices.length} ${esc(S.copy.unitPlural)}</a></p>` : ''}
    </div>
</section>`;
    const aiCall = (ids = S.callIds) => `<section class="k-section" id="ai-receptionist" aria-labelledby="ai-h">${glow()}
    <div class="k-container">
        <div class="k-center k-reveal"><p class="k-eyebrow">${esc(S.copy.aiEyebrow)}</p><h2 id="ai-h">${esc(S.copy.aiTitle)}</h2><p class="k-lede">${esc(S.copy.aiLede)}</p>
            <p><span class="k-badge-247"><i aria-hidden="true"></i>24/7 calls answered</span></p>
            <div class="k-btn-row" style="justify-content:center;margin:6px 0 26px"><button type="button" class="k-btn k-btn-primary" data-play-call="0">${I.play} Hear how our AI receptionist handles a call</button></div>
        </div>
        <div data-call="${ids.join(',')}" class="k-reveal" data-sales="${esc(S.sales.ai)}"></div>
        <p class="k-center" style="margin-top:16px;font-size:.88rem;color:var(--k-ink-soft)">${esc(S.copy.aiFoot)}</p>
    </div>
</section>`;
    const treatmentCards = (list = S.treatments.filter(t => t.page)) => `<div class="k-grid-4">${list.map(t => `<a class="k-service k-glass k-reveal" href="${t.page}">
            <img src="${img(t.img, 640, 400)}" width="640" height="400" alt="${esc(t.imgAlt)}" loading="lazy" decoding="async">
            <div class="k-body"><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="k-from">From ${esc(t.from.replace(/^from /i, ''))}</span></div>
        </a>`).join('')}</div>`;
    const teamCards = (list) => `<div class="k-grid-3">${list.map(m => `<article class="k-service k-glass k-reveal team-card">
            <img src="${img(m.img, 600, 600)}" width="600" height="600" alt="${esc(m.alt)}" loading="lazy" decoding="async" style="aspect-ratio:1/1">
            <div class="k-body"><h3>${esc(m.name)}</h3><p style="margin:0;font-weight:700;color:var(--k-accent-text)">${esc(m.role)}</p><p style="margin:6px 0 0;color:var(--k-ink-soft)">${esc(m.bio)}</p><p style="margin:8px 0 0;font-size:.85rem;color:var(--k-ink-soft)">${esc(m.creds)} · ${esc(m.practice)}</p></div>
        </article>`).join('')}</div>`;
    const ctaBand = (title = S.copy.ctaTitle, text = S.copy.ctaText) => `<section class="k-section tight">
    <div class="k-container"><div class="cta-band k-glass k-reveal">
        <h2>${esc(title)}</h2><p>${esc(text)}</p>
        <div class="k-btn-row" style="justify-content:center"><a class="k-btn k-btn-primary" href="book.html">${esc(S.copy.bookLabel)}</a><a class="k-btn k-btn-ghost" href="tel:${tel(S.phone)}">${I.phone} ${esc(S.phone)}</a></div>
    </div></div>
</section>`;

    /* ---------- index ---------- */
    page({ file: 'index.html', title: S.copy.titleHome, desc: S.copy.metaHome, schema: [orgSchema] }, `
<section class="k-hero" aria-labelledby="hero-h">${glow()}
    <div class="k-container k-hero-grid">
        <div>
            <span class="k-pill">${S.copy.heroPill}</span>
            <h1 id="hero-h" style="margin-top:16px">${S.copy.heroTitle}</h1>
            <p class="k-lede">${esc(S.copy.heroLede)}</p>
            <div class="k-btn-row" data-sales="${esc(S.sales.heroButtons)}">
                <a class="k-btn k-btn-primary" href="book.html">${I.cal} ${esc(S.copy.bookLabel)}</a>
                <a class="k-btn k-btn-ghost" href="tel:${tel(S.phone)}">${I.phone} Call ${esc(S.phone)}</a>
            </div>
            <div class="k-trust-row">${S.copy.heroTrust.map(t => `<span>${I.check} ${esc(t)}</span>`).join('')}</div>
        </div>
        <div class="k-hero-media">
            <img src="${img(S.heroImg, 900, 990, 72)}" width="900" height="990" alt="${esc(S.heroAlt)}" fetchpriority="high" decoding="async">
            <div class="k-hero-float k-glass" style="${S.heroFloat1Pos}">${S.copy.heroFloat1}</div>
            <div class="k-hero-float k-glass" style="${S.heroFloat2Pos}">${S.copy.heroFloat2}</div>
        </div>
    </div>
</section>

<section class="k-section tight" aria-labelledby="why-h">
    <div class="k-container">
        <h2 id="why-h" class="k-sr">Why choose ${esc(S.name)}</h2>
        <div class="k-grid-4">${S.copy.whys.map(w => `<div class="k-card k-glass k-reveal"><span class="k-icon">${I[w.icon] || I.check}</span><h3>${esc(w.title)}</h3><p style="margin:0;color:var(--k-ink-soft)">${esc(w.text)}</p></div>`).join('')}</div>
    </div>
</section>

${finder(4)}

<section class="k-section" aria-labelledby="tr-h">
    <div class="k-container">
        <div class="k-reveal"><p class="k-eyebrow">${esc(S.copy.treatEyebrow)}</p><h2 id="tr-h">${esc(S.copy.treatTitle)}</h2><p class="k-lede">${esc(S.copy.treatLede)}</p></div>
        <div data-sales="${esc(S.sales.prices)}">${treatmentCards()}</div>
        <p style="margin-top:24px"><a class="k-btn k-btn-ghost" href="fees.html">See our full price list</a></p>
    </div>
</section>

${S.copy.urgentSection ? `<section class="k-section tight" aria-labelledby="urgent-h"><div class="k-container"><div class="urgent-card k-glass k-reveal" data-sales="${esc(S.sales.urgent)}">
    <div><p class="k-eyebrow">${esc(S.copy.urgentSection.eyebrow)}</p><h2 id="urgent-h">${esc(S.copy.urgentSection.title)}</h2><p>${esc(S.copy.urgentSection.text)}</p></div>
    <div class="k-btn-row"><a class="k-btn k-btn-primary" href="tel:${tel(S.urgentPhone)}">${I.phone} ${esc(S.urgentPhone)}</a><a class="k-btn k-btn-ghost" href="book.html?treatment=${esc(S.urgentTreatment)}">Book urgent appointment</a></div>
</div></div></section>` : ''}

${aiCall()}

${reviews()}

<section class="k-section" aria-labelledby="team-h">
    <div class="k-container">
        <div class="k-reveal"><p class="k-eyebrow">${esc(S.copy.teamEyebrow)}</p><h2 id="team-h">${esc(S.copy.teamTitle)}</h2><p class="k-lede">${esc(S.copy.teamLede)}</p></div>
        ${teamCards(S.team.slice(0, 3))}
        <p style="margin-top:24px"><a class="k-btn k-btn-ghost" href="team.html">Meet the whole team</a></p>
    </div>
</section>

<section class="k-section tight" aria-labelledby="offer-h">${glow()}
    <div class="k-container"><div class="offer-band k-glass k-reveal" data-sales="${esc(S.sales.offer)}">
        <div><p class="k-eyebrow">${esc(S.copy.offerEyebrow)}</p><h2 id="offer-h">${esc(S.copy.offerTitle)}</h2><p>${esc(S.copy.offerText)}</p></div>
        <a class="k-btn k-btn-primary" href="offers.html">${esc(S.copy.offerCta)}</a>
    </div></div>
</section>
`);

    /* ---------- locations ---------- */
    page({ file: 'locations.html', title: S.copy.titleLocations, desc: S.copy.metaLocations, schema: [crumbs([['Locations', BASE + 'locations.html']])] }, `
<section class="k-hero" style="padding-bottom:0">${glow()}
    <div class="k-container"><p class="k-eyebrow">${esc(S.copy.finderEyebrow)}</p><h1>${esc(S.copy.locationsTitle)}</h1><p class="k-lede">${esc(S.copy.locationsLede)}</p></div>
</section>
${finder(0, false)}
${ctaBand()}`);

    /* ---------- example location page ---------- */
    const L = flagship, LX = S.locationExtra;
    page({ file: L.page, title: `${L.name} | ${S.copy.unitTitle} in ${L.town} | ${S.shortName}`, desc: LX.meta, schema: [{ '@context': 'https://schema.org', ...practiceSchema(L), parentOrganization: { '@type': 'Organization', name: S.name, url: BASE } }, crumbs([['Locations', BASE + 'locations.html'], [L.name, BASE + L.page]])] }, `
<section class="k-hero">${glow()}
    <div class="k-container k-hero-grid">
        <div>
            <nav aria-label="Breadcrumb" style="font-size:.9rem;margin-bottom:10px"><a href="locations.html">All ${esc(S.copy.unitPlural)}</a> / ${esc(L.town)}</nav>
            <span class="k-open" data-open-now="${L.id}"></span>
            <h1 style="margin-top:14px">${esc(L.name)}</h1>
            <p class="k-lede">${esc(LX.intro)}</p>
            <p><strong>${esc(L.address)}</strong><br><a href="tel:${tel(L.phone)}">${esc(L.phone)}</a></p>
            <div class="k-btn-row"><a class="k-btn k-btn-primary" href="book.html?location=${L.id}">${I.cal} Book at ${esc(L.town)}</a><a class="k-btn k-btn-ghost" href="tel:${tel(L.phone)}">${I.phone} Call the ${esc(S.copy.unit)}</a></div>
        </div>
        <div class="k-hero-media" style="aspect-ratio:4/3.4"><img src="${img(LX.img, 900, 760)}" width="900" height="760" alt="${esc(LX.imgAlt)}" fetchpriority="high"></div>
    </div>
</section>
<section class="k-section tight">
    <div class="k-container k-grid-2">
        <div class="k-card k-glass k-reveal"><h2 style="font-size:1.5rem">Opening hours</h2><table class="k-hours" data-hours="${L.id}"></table><p style="margin-top:12px;font-size:.9rem;color:var(--k-ink-soft)">${esc(S.copy.hoursNote)}</p></div>
        <div class="k-reveal">
            <div class="k-map" role="img" aria-label="Map showing ${esc(L.name)}">${mapSvg(S)}<div class="k-map-label k-glass"><strong>${esc(L.name)}</strong><br>${esc(L.address)}</div></div>
            <ul class="k-list" style="margin-top:18px">${LX.access.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
        </div>
    </div>
</section>
<section class="k-section">
    <div class="k-container">
        <div class="k-reveal"><p class="k-eyebrow">Your ${esc(L.town)} team</p><h2>${esc(LX.teamTitle)}</h2></div>
        ${teamCards(S.team.filter(m => m.practice === L.name).concat(S.team).slice(0, 3))}
    </div>
</section>
<section class="k-section tight"><div class="k-container"><div class="k-reveal"><h2>Treatments at ${esc(L.town)}</h2></div>${treatmentCards()}</div></section>
${reviews(`What ${L.town} ${S.copy.patientsWord} say`)}
${ctaBand(`Book at ${S.shortName} ${L.town}`, LX.cta)}`);

    /* ---------- treatments index ---------- */
    page({ file: 'treatments.html', title: S.copy.titleTreatments, desc: S.copy.metaTreatments, schema: [crumbs([['Treatments', BASE + 'treatments.html']])] }, `
<section class="k-hero" style="padding-bottom:20px">${glow()}<div class="k-container"><p class="k-eyebrow">${esc(S.copy.treatEyebrow)}</p><h1>${esc(S.copy.treatmentsTitle)}</h1><p class="k-lede">${esc(S.copy.treatLede)}</p></div></section>
<section class="k-section" style="padding-top:20px"><div class="k-container">${treatmentCards()}
    <div class="k-grid-3" style="margin-top:28px">${S.treatments.filter(t => !t.page).map(t => `<div class="k-card k-glass k-reveal"><h3>${esc(t.name)}</h3><p style="color:var(--k-ink-soft)">${esc(t.short)}</p><p style="font-weight:800;color:var(--k-accent-text)">From ${esc(t.from.replace(/^from /i, ''))}</p><a class="k-btn k-btn-ghost" href="book.html?treatment=${t.id}">Book</a></div>`).join('')}</div>
</div></section>
${ctaBand()}`);

    /* ---------- treatment pages ---------- */
    for (const t of S.treatments.filter(x => x.page)) {
        const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
        const svc = { '@context': 'https://schema.org', '@type': 'Service', name: t.name, provider: { '@type': 'Organization', name: S.name, url: BASE }, areaServed: S.region, offers: { '@type': 'Offer', priceCurrency: 'GBP', price: String(t.fromNum), description: 'From price' } };
        page({ file: t.page, title: `${t.name} | ${t.titleTail} | ${S.shortName}`, desc: t.meta, schema: [svc, faqSchema, crumbs([['Treatments', BASE + 'treatments.html'], [t.name, BASE + t.page]])] }, `
<section class="k-hero">${glow()}
    <div class="k-container k-hero-grid">
        <div>
            <nav aria-label="Breadcrumb" style="font-size:.9rem;margin-bottom:10px"><a href="treatments.html">${esc(S.copy.navTreatments || 'Treatments')}</a> / ${esc(t.name)}</nav>
            <h1>${esc(t.headline)}</h1>
            <p class="k-lede">${esc(t.intro)}</p>
            <p class="from-big">From <strong>${esc(t.from.replace(/^from /i, ''))}</strong>${t.priceNote ? ` <small>${esc(t.priceNote)}</small>` : ''}</p>
            <div class="k-btn-row"><a class="k-btn k-btn-primary" href="book.html?treatment=${t.id}">${I.cal} Book ${esc(t.bookLabel || t.name.toLowerCase())}</a><a class="k-btn k-btn-ghost" href="tel:${tel(S.phone)}">${I.phone} Ask a question</a></div>
        </div>
        <div class="k-hero-media" style="aspect-ratio:4/3.6"><img src="${img(t.img, 900, 810)}" width="900" height="810" alt="${esc(t.imgAlt)}" fetchpriority="high"></div>
    </div>
</section>
<section class="k-section tight"><div class="k-container k-grid-2">
    <div class="k-card k-glass k-reveal"><h2 style="font-size:1.5rem">What it is</h2><p>${esc(t.what)}</p></div>
    <div class="k-card k-glass k-reveal"><h2 style="font-size:1.5rem">Who it's for</h2><ul class="k-list">${t.who.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
</div></section>
<section class="k-section"><div class="k-container">
    <div class="k-reveal"><p class="k-eyebrow">The process</p><h2>What happens, step by step</h2></div>
    <ol class="k-steps horizontal">${t.steps.map(([h, p]) => `<li class="k-glass k-reveal"><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
</div></section>
<section class="k-section tight"><div class="k-container">
    <div class="k-card k-glass k-reveal"><h2 style="font-size:1.5rem">${esc(t.name)} prices</h2>
    <table class="k-price-table"><thead><tr><th scope="col">Treatment</th><th scope="col">Price</th></tr></thead><tbody>${t.prices.map(([n, d, p]) => `<tr><td>${esc(n)}${d ? `<small>${esc(d)}</small>` : ''}</td><td>${esc(p)}</td></tr>`).join('')}</tbody></table>
    ${t.financeNote ? `<p style="margin-top:12px;color:var(--k-ink-soft);font-size:.92rem">${esc(t.financeNote)}</p>` : ''}</div>
</div></section>
<section class="k-section"><div class="k-container">
    <div class="k-center k-reveal"><p class="k-eyebrow">FAQs</p><h2>Your questions, answered</h2></div>
    <div class="k-faq">${t.faqs.map(([q, a]) => `<details class="k-glass"><summary>${esc(q)}</summary><div><p>${esc(a)}</p></div></details>`).join('')}</div>
</div></section>
${ctaBand(`Ready to book ${t.bookLabel || t.name.toLowerCase()}?`, t.cta)}`);
    }

    /* ---------- fees ---------- */
    page({ file: 'fees.html', title: S.copy.titleFees, desc: S.copy.metaFees, schema: [crumbs([[S.copy.navFees || 'Prices', BASE + 'fees.html']])] }, `
<section class="k-hero" style="padding-bottom:20px">${glow()}<div class="k-container">
    <p class="k-eyebrow">${esc(S.copy.feesEyebrow)}</p><h1>${esc(S.copy.feesTitle)}</h1><p class="k-lede">${esc(S.copy.feesLede)}</p>
    ${S.copy.feesNotice ? `<div class="fees-notice k-glass" data-sales="${esc(S.sales.fees)}">${S.copy.feesNotice}</div>` : ''}
</div></section>
<section class="k-section" style="padding-top:20px"><div class="k-container">
    <div class="k-card k-glass" ${S.copy.feesNotice ? '' : `data-sales="${esc(S.sales.fees)}"`}>
    ${S.fees.map(g => `<div class="k-price-group"><h2 style="font-size:1.4rem">${esc(g.group)}</h2>${g.note ? `<p style="color:var(--k-ink-soft);font-size:.95rem">${g.note}</p>` : ''}<table class="k-price-table"><thead><tr><th scope="col">Treatment</th><th scope="col">Price</th></tr></thead><tbody>${g.items.map(([n, d, p]) => `<tr><td>${esc(n)}${d ? `<small>${esc(d)}</small>` : ''}</td><td>${esc(p)}</td></tr>`).join('')}</tbody></table></div>`).join('')}
    <p style="font-size:.9rem;color:var(--k-ink-soft)">${esc(S.copy.feesFoot)}</p>
    </div>
</div></section>
${ctaBand()}`);

    /* ---------- booking ---------- */
    page({ file: 'book.html', title: S.copy.titleBook, desc: S.copy.metaBook, schema: [crumbs([['Book', BASE + 'book.html']])] }, `
<section class="k-hero" style="padding-bottom:10px">${glow()}<div class="k-container"><p class="k-eyebrow">Online booking</p><h1>${esc(S.copy.bookTitle)}</h1><p class="k-lede">${esc(S.copy.bookLede)}</p></div></section>
<section class="k-section" style="padding-top:20px"><div class="k-container" style="max-width:860px">
<div class="k-booking k-glass" data-booking data-sales="${esc(S.sales.booking)}">
    <ol class="k-progress" aria-label="Booking progress">${['Location', S.copy.stepTreatment || 'Treatment', 'Date & time', 'Your details', 'Confirmed'].map(s => `<li><span>${s}</span></li>`).join('')}</ol>
    <div class="k-step"><h2>Which ${esc(S.copy.unit)} suits you?</h2><p>${esc(S.copy.bookStep1)}</p><div class="k-options" data-list="location"></div><div class="k-step-nav"><span></span><button type="button" class="k-btn k-btn-primary" data-next-step disabled>Continue</button></div></div>
    <div class="k-step"><h2>${esc(S.copy.bookStep2Title)}</h2><p>${esc(S.copy.bookStep2)}</p><div class="k-options two" data-list="treatment"></div><div class="k-step-nav"><button type="button" class="k-btn k-btn-ghost" data-prev-step>Back</button><button type="button" class="k-btn k-btn-primary" data-next-step disabled>Continue</button></div></div>
    <div class="k-step"><h2>Pick a date and time</h2><p>Greyed-out times are already booked.</p><div class="k-days" data-list="date" aria-label="Available days"></div><div class="k-slots" data-list="time" aria-label="Available times"></div><div class="k-step-nav"><button type="button" class="k-btn k-btn-ghost" data-prev-step>Back</button><button type="button" class="k-btn k-btn-primary" data-next-step disabled>Continue</button></div></div>
    <div class="k-step"><h2>Your details</h2><div class="k-summary" data-summary></div>
        <form novalidate>
            <div class="k-grid-2" style="gap:0 16px"><div class="k-field"><label for="bf-first">First name</label><input id="bf-first" name="firstname" autocomplete="given-name" required><div class="k-err"></div></div><div class="k-field"><label for="bf-last">Last name</label><input id="bf-last" name="lastname" autocomplete="family-name" required><div class="k-err"></div></div></div>
            <div class="k-grid-2" style="gap:0 16px"><div class="k-field"><label for="bf-email">Email</label><input id="bf-email" type="email" name="email" autocomplete="email" required><div class="k-err"></div></div><div class="k-field"><label for="bf-tel">Mobile (for your text confirmation)</label><input id="bf-tel" type="tel" name="tel" autocomplete="tel" required><div class="k-err"></div></div></div>
            ${S.copy.bookExtraField || ''}
            <div class="k-field"><label for="bf-notes">Anything we should know? (optional)</label><textarea id="bf-notes" name="notes" placeholder="${esc(S.copy.bookNotesPh)}"></textarea></div>
            <label class="k-check"><input type="checkbox" name="consent" required><span>I agree to ${esc(S.shortName)} contacting me about this appointment, as described in the <a href="privacy.html">privacy policy</a>.<span class="k-err" style="display:block;color:var(--k-error)"></span></span></label>
            <div class="k-step-nav"><button type="button" class="k-btn k-btn-ghost" data-prev-step>Back</button><button type="submit" class="k-btn k-btn-primary">Confirm booking</button></div>
        </form>
    </div>
    <div class="k-step" data-confirmation></div>
</div>
<p class="k-center" style="margin-top:16px;color:var(--k-ink-soft)">${esc(S.copy.bookFoot)} <a href="tel:${tel(S.phone)}">${esc(S.phone)}</a></p>
</div></section>`);

    /* ---------- team ---------- */
    page({ file: 'team.html', title: S.copy.titleTeam, desc: S.copy.metaTeam, schema: [crumbs([['Our team', BASE + 'team.html']])] }, `
<section class="k-hero" style="padding-bottom:20px">${glow()}<div class="k-container"><p class="k-eyebrow">${esc(S.copy.teamEyebrow)}</p><h1>${esc(S.copy.teamPageTitle)}</h1><p class="k-lede">${esc(S.copy.teamLede)}</p></div></section>
<section class="k-section" style="padding-top:20px"><div class="k-container">${teamCards(S.team)}</div></section>
${reviews()}
${ctaBand()}`);

    /* ---------- offers / new patients ---------- */
    page({ file: 'offers.html', title: S.copy.titleOffers, desc: S.copy.metaOffers, schema: [crumbs([[S.copy.navOffers || 'New patients', BASE + 'offers.html']])] }, `
<section class="k-hero">${glow()}
    <div class="k-container k-hero-grid">
        <div><p class="k-eyebrow">${esc(S.copy.offerEyebrow)}</p><h1>${esc(S.copy.offersTitle)}</h1><p class="k-lede">${esc(S.copy.offersLede)}</p>
            <ul class="k-list">${S.copy.offersPoints.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
            <p style="font-size:.88rem;color:var(--k-ink-soft)">${esc(S.copy.offersSmall)}</p></div>
        <div class="k-card k-glass" data-sales="${esc(S.sales.lead)}">
            <form data-lead novalidate>
                <h2 style="font-size:1.5rem">${esc(S.copy.offersFormTitle)}</h2>
                <div class="k-field"><label for="lf-name">Name</label><input id="lf-name" name="name" autocomplete="name" required><div class="k-err"></div></div>
                <div class="k-field"><label for="lf-email">Email</label><input id="lf-email" type="email" name="email" autocomplete="email" required><div class="k-err"></div></div>
                <div class="k-field"><label for="lf-tel">Phone (optional)</label><input id="lf-tel" type="tel" name="tel" autocomplete="tel"></div>
                <div class="k-field"><label for="lf-loc">Nearest ${esc(S.copy.unit)}</label><select id="lf-loc" name="location">${S.practices.map(p => `<option>${esc(p.name)}</option>`).join('')}</select></div>
                ${S.copy.offersExtraField || ''}
                <label class="k-check"><input type="checkbox" name="consent" required><span>Yes, send me my offer and occasional updates. I can unsubscribe at any time.<span class="k-err" style="display:block;color:var(--k-error)"></span></span></label>
                <button type="submit" class="k-btn k-btn-primary" style="width:100%">${esc(S.copy.offersButton)}</button>
            </form>
            <div class="k-form-success"><div class="k-success"><div class="k-tick">${I.check}</div><h2>${esc(S.copy.offersSuccessTitle)}</h2><p>${esc(S.copy.offersSuccess)}</p><a class="k-btn k-btn-primary" href="book.html">${esc(S.copy.bookLabel)}</a></div></div>
        </div>
    </div>
</section>
${reviews()}`);

    /* ---------- accessibility & privacy ---------- */
    page({ file: 'accessibility.html', title: `Accessibility statement | ${S.shortName}`, desc: `How ${S.name} makes its website and ${S.copy.unitPlural} accessible to everyone.` }, `
<section class="k-section"><div class="k-container" style="max-width:820px">
<h1>Accessibility statement</h1>
<p class="k-lede">We want everyone to be able to use this website and visit our ${esc(S.copy.unitPlural)}, whatever their needs.</p>
<h2 style="font-size:1.4rem">This website</h2>
<ul class="k-list"><li>Works with screen readers, keyboard-only navigation and browser zoom up to 400%.</li><li>Uses clear headings, labelled forms, visible focus outlines and good colour contrast.</li><li>Respects your device's reduced-motion setting.</li><li>Every image has a text description.</li></ul>
<h2 style="font-size:1.4rem">Our ${esc(S.copy.unitPlural)}</h2>
<p>${esc(S.copy.accessPractices)}</p>
<h2 style="font-size:1.4rem">Tell us if something isn't working</h2>
<p>If you have trouble using this site or need information in a different format, call <a href="tel:${tel(S.phone)}">${esc(S.phone)}</a> or email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>. We aim to reply within two working days.</p>
<p style="font-size:.88rem;color:var(--k-ink-soft)">This statement is part of a demo website for a fictional brand.</p>
</div></section>`);
    page({ file: 'privacy.html', title: `Privacy policy | ${S.shortName}`, desc: `How ${S.name} collects, uses and protects your personal information.` }, `
<section class="k-section"><div class="k-container" style="max-width:820px">
<h1>Privacy policy</h1>
<p class="k-lede">Your privacy matters to us. This page explains what we collect and why, in plain English.</p>
<h2 style="font-size:1.4rem">What we collect</h2>
<ul class="k-list"><li>Details you give us when you book or sign up: name, contact details and appointment information.</li><li>${esc(S.copy.privacyHealth)}</li><li>Call recordings and transcripts when you phone us, including calls answered by our AI receptionist, to manage your booking and improve our service.</li></ul>
<h2 style="font-size:1.4rem">How we use it</h2>
<p>To book and manage your appointments, send reminders and provide care. We never sell your information. Health information is handled as special category data under UK GDPR.</p>
<h2 style="font-size:1.4rem">Your rights</h2>
<p>You can ask to see, correct or delete your information, or object to how we use it, by contacting <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>. You can also complain to the Information Commissioner's Office.</p>
<h2 style="font-size:1.4rem">Cookies</h2>
<p>We use essential cookies to make this site work, and analytics cookies only with your permission. <a href="#" data-open-cookies>Change your cookie settings</a>.</p>
<p style="font-size:.88rem;color:var(--k-ink-soft)">This policy is part of a demo website for a fictional brand.</p>
</div></section>`);

    fs.writeFileSync(path.join(OUT, 'assets', 'logo.svg'), S.logo.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'));
    console.log(`${S.id}: ${written.length} pages -> ${written.join(', ')}`);
}

/* Stylised map placeholder in brand colours (no third-party map, no tracking) */
function mapSvg(S) {
    return `<svg viewBox="0 0 400 275" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><rect width="400" height="275" fill="var(--k-map-bg)"/>
<path d="M-10 190 C80 160 140 210 220 170 S360 120 420 150" stroke="var(--k-map-road)" stroke-width="14" fill="none"/>
<path d="M120 -10 C140 80 110 150 160 290" stroke="var(--k-map-road)" stroke-width="10" fill="none"/>
<path d="M260 -10 L300 290" stroke="var(--k-map-road)" stroke-width="7" fill="none"/>
<path d="M-10 70 L410 100" stroke="var(--k-map-road)" stroke-width="6" fill="none"/>
<rect x="30" y="20" width="70" height="40" rx="6" fill="var(--k-map-block)"/><rect x="180" y="20" width="60" height="55" rx="6" fill="var(--k-map-block)"/><rect x="310" y="25" width="70" height="50" rx="6" fill="var(--k-map-block)"/>
<rect x="20" y="215" width="80" height="45" rx="6" fill="var(--k-map-block)"/><rect x="320" y="190" width="65" height="70" rx="6" fill="var(--k-map-block)"/><circle cx="70" cy="125" r="28" fill="var(--k-map-park)"/>
<g transform="translate(200 128)"><circle r="26" fill="var(--k-primary)" opacity=".18"/><path d="M0 -24c-9 0-16 7-16 16 0 12 16 26 16 26s16-14 16-26c0-9-7-16-16-16z" fill="var(--k-primary)"/><circle cy="-8" r="6" fill="var(--k-on-primary)"/></g></svg>`;
}

function window_icons() {
    // Same icon set as kit.js, for server-rendered markup
    return {
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
        cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
        left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
        right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
        heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        pound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 6.5A4.5 4.5 0 0 0 8.5 8.6V20H18M6 13h8"/></svg>',
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
        paw: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="6" cy="10" r="2.2"/><circle cx="10" cy="5.5" r="2.2"/><circle cx="14" cy="5.5" r="2.2"/><circle cx="18" cy="10" r="2.2"/><path d="M12 11c-3 0-6 4.5-6 7 0 1.7 1.3 2.5 3 2.5 1.3 0 2-.6 3-.6s1.7.6 3 .6c1.7 0 3-.8 3-2.5 0-2.5-3-7-6-7z"/></svg>',
        sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
    };
}

const which = process.argv[2] || 'all';
const ids = which === 'all' ? fs.readdirSync(path.join(KIT, 'sites')).filter(f => f.endsWith('.js')).map(f => f.replace('.js', '')) : [which];
ids.forEach(build);
