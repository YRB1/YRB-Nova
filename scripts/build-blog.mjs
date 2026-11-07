#!/usr/bin/env node
// Builds YRB Nova blog posts from /content/blog/*.md into /blog/<slug>.html,
// using an existing hand-made post as the page shell, then updates the blog index,
// sitemap.xml and llms.txt. Run: node scripts/build-blog.mjs
//
// Front matter:
// ---
// title: ...
// description: ...            (meta description, ~150 chars)
// date: 2026-11-07            (posts dated in the future are skipped until that day)
// category: Case Study
// image: /blog/img/x.webp    (cover; site path or https URL)
// imageAlt: what the photo shows
// ctaTitle: optional        ctaText: optional
// ---
// Markdown: ## / ###, paragraphs, - and 1. lists, **bold**, *italic*, [links](url),
// > quotes, ![alt](src "caption"), and case-study boxes:
// :::case OTR Detailing | Mobile car detailing, Coventry
// body markdown
// :::
// A "## FAQ" section with "### Question" headings becomes FAQPage schema.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "content", "blog");
const OUT = path.join(ROOT, "blog");
const SHELL = path.join(OUT, "see-your-website-before-you-pay.html");
const BASE = "https://yrbnova.com";
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const absUrl = (src) => (/^https?:\/\//.test(src) ? src : BASE + (src.startsWith("/") ? src : "/" + src));
const relUrl = (src) => (/^https?:\/\//.test(src) ? src : ".." + (src.startsWith("/") ? src : "/" + src));

function inline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    let h = href;
    if (h.startsWith("/")) h = ".." + h; // site-relative -> from /blog/
    const ext = /^https?:\/\//.test(h) && !h.includes("yrbnova.com");
    return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
  });
  return out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function render(md) {
  const html = [];
  let para = [], list = null;
  const flushP = () => { if (para.length) { html.push(`    <p>${inline(para.join(" "))}</p>`); para = []; } };
  const flushL = () => { if (list) { html.push(`    <${list.t}>\n${list.items.map((i) => `        <li>${inline(i)}</li>`).join("\n")}\n    </${list.t}>`); list = null; } };
  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    let m;
    if (!t) { flushP(); flushL(); continue; }
    if ((m = t.match(/^:::case\s+(.+)$/))) {
      flushP(); flushL();
      const [name, sub] = m[1].split("|").map((x) => x.trim());
      const inner = [];
      while (++i < lines.length && lines[i].trim() !== ":::") inner.push(lines[i]);
      html.push(`    <aside class="case-study">\n        <p class="case-study-label">Case study</p>\n        <h3>${inline(name)}</h3>${sub ? `\n        <p class="case-study-sub">${inline(sub)}</p>` : ""}\n${render(inner.join("\n"))}\n    </aside>`);
      continue;
    }
    if ((m = t.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/))) {
      flushP(); flushL();
      html.push(`    <figure class="article-figure"><img src="${esc(relUrl(m[2]))}" alt="${esc(m[1])}" loading="lazy" decoding="async">${m[3] ? `<figcaption>${inline(m[3])}</figcaption>` : ""}</figure>`);
    } else if ((m = t.match(/^(#{2,3})\s+(.*)$/))) {
      flushP(); flushL();
      html.push(`    <h${m[1].length} id="${slugify(m[2])}">${inline(m[2])}</h${m[1].length}>`);
    } else if ((m = t.match(/^[-*]\s+(.*)$/))) {
      flushP(); if (list?.t !== "ul") { flushL(); list = { t: "ul", items: [] }; } list.items.push(m[1]);
    } else if ((m = t.match(/^\d+\.\s+(.*)$/))) {
      flushP(); if (list?.t !== "ol") { flushL(); list = { t: "ol", items: [] }; } list.items.push(m[1]);
    } else if ((m = t.match(/^>\s?(.*)$/))) {
      flushP(); flushL(); html.push(`    <blockquote>${inline(m[1])}</blockquote>`);
    } else { flushL(); para.push(t); }
  }
  flushP(); flushL();
  return html.join("\n\n");
}

function faqOf(md) {
  const m = md.match(/^##\s+(FAQ|FAQs|Frequently asked questions)\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/im);
  if (!m) return [];
  const out = [];
  const re = /^###\s+(.+)$([\s\S]*?)(?=^###\s|(?![\s\S]))/gm;
  let x;
  while ((x = re.exec(m[2]))) {
    const a = x[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*+/g, "").replace(/\s+/g, " ");
    if (a) out.push({ q: x[1].trim(), a });
  }
  return out;
}

function parse(file) {
  const raw = fs.readFileSync(path.join(SRC, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  for (const k of ["title", "description", "date", "image", "imageAlt"]) if (!meta[k]) throw new Error(`${file}: missing ${k}`);
  return { slug: file.replace(/\.md$/, ""), ...meta, category: meta.category || "Guides", body: m[2].trim() };
}

const shell = fs.readFileSync(SHELL, "utf8");
const bodyStart = shell.indexOf("<body>");
const artStart = shell.indexOf('<article class="article">');
const artEnd = shell.indexOf("</article>") + "</article>".length;
const headTop = shell.slice(0, shell.indexOf("<title>"));
const chrome = shell.slice(bodyStart, artStart);
const tail = shell.slice(artEnd);

const posts = fs.existsSync(SRC)
  ? fs.readdirSync(SRC).filter((f) => f.endsWith(".md") && !["STYLE.md", "topics.md"].includes(f)).map(parse).filter((p) => p.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1))
  : [];

for (const p of posts) {
  const url = `${BASE}/blog/${p.slug}.html`;
  const faq = faqOf(p.body);
  const ld = [
    { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, image: absUrl(p.image),
      author: { "@type": "Person", name: "Ben", worksFor: { "@type": "Organization", name: "YRB Nova", url: BASE } },
      publisher: { "@type": "Organization", name: "YRB Nova", url: BASE }, mainEntityOfPage: url, datePublished: p.date, dateModified: p.date },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog/index.html` },
      { "@type": "ListItem", position: 3, name: p.title, item: url } ] },
    ...(faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
  ];
  const head = `${headTop}<title>${esc(p.title)} | YRB Nova Blog</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" href="../favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../styles.css">

<meta property="og:type" content="article">
<meta property="article:published_time" content="${p.date}">
<meta property="article:author" content="Ben, YRB Nova">
<meta property="article:section" content="${esc(p.category)}">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="YRB Nova">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(absUrl(p.image))}">
<meta property="og:image:alt" content="${esc(p.imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(absUrl(p.image))}">

${ld.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n")}
</head>

`;
  const article = `<article class="article">
    <a href="index.html" style="color:var(--accent); text-decoration:none; font-size:0.9rem; font-weight:600;">&larr; Back to Blog</a>
    <p class="post-meta" style="margin-top:24px;">${esc(p.category)} &middot; ${new Date(p.date + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
    <h1>${esc(p.title)}</h1>

    <div class="article-cover">
        <img src="${esc(relUrl(p.image))}" alt="${esc(p.imageAlt)}" fetchpriority="high">
    </div>

${render(p.body)}

    <div class="article-cta">
        <h3>${esc(p.ctaTitle || "Want a website that actually brings in work?")}</h3>
        <p>${esc(p.ctaText || "Get a free audit of your current site, or see our live demo sites before you spend a penny.")}</p>
        <div class="btn-row"><a href="../free-website-audit.html" class="btn btn-primary">Get a Free Website Audit</a> <a href="../work.html" class="btn btn-outline">View Live Demos</a></div>
    </div>
</article>`;
  fs.writeFileSync(path.join(OUT, `${p.slug}.html`), head + chrome + article + tail);
}

// ---- blog index cards (between markers) ----
const replaceBetween = (s, start, end, inner) => {
  const a = s.indexOf(start), b = s.indexOf(end);
  if (a === -1 || b === -1) throw new Error(`markers ${start} missing`);
  return s.slice(0, a + start.length) + inner + s.slice(b);
};
const idxPath = path.join(OUT, "index.html");
let idx = fs.readFileSync(idxPath, "utf8");
if (!idx.includes("<!-- AUTO-POSTS:START -->")) {
  idx = idx.replace('<div class="post-grid">', '<div class="post-grid">\n<!-- AUTO-POSTS:START --><!-- AUTO-POSTS:END -->');
}
idx = replaceBetween(idx, "<!-- AUTO-POSTS:START -->", "<!-- AUTO-POSTS:END -->",
  "\n" + posts.map((p) => `            <a href="${p.slug}.html" class="post-card">
                <img class="post-cover" src="${esc(relUrl(p.image))}" alt="${esc(p.imageAlt)}" loading="lazy">
                <div class="post-card-body">
                    <span class="post-meta">${esc(p.category)}</span>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.description)}</p>
                    <span class="read-more">Read the post →</span>
                </div>
            </a>`).join("\n") + "\n");
fs.writeFileSync(idxPath, idx);

// ---- sitemap ----
const smPath = path.join(ROOT, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
if (!sm.includes("<!-- AUTO-BLOG:START -->")) sm = sm.replace("</urlset>", "<!-- AUTO-BLOG:START --><!-- AUTO-BLOG:END -->\n</urlset>");
sm = replaceBetween(sm, "<!-- AUTO-BLOG:START -->", "<!-- AUTO-BLOG:END -->",
  "\n" + posts.map((p) => `  <url>\n    <loc>${BASE}/blog/${p.slug}.html</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`).join("\n") + "\n");
sm = sm.replace(/(<loc>https:\/\/yrbnova\.com\/blog\/index\.html<\/loc>\s*<lastmod>)[^<]*/, `$1${posts[0]?.date ?? today}`);
fs.writeFileSync(smPath, sm);

// ---- llms.txt ----
const llmsPath = path.join(ROOT, "llms.txt");
if (fs.existsSync(llmsPath)) {
  let l = fs.readFileSync(llmsPath, "utf8");
  if (l.includes("<!-- AUTO-POSTS:START -->")) {
    l = replaceBetween(l, "<!-- AUTO-POSTS:START -->", "<!-- AUTO-POSTS:END -->",
      "\n" + posts.map((p) => `- [${p.title}](${BASE}/blog/${p.slug}.html): ${p.description}`).join("\n") + "\n");
    fs.writeFileSync(llmsPath, l);
  }
}
console.log(`Built ${posts.length} post(s): ${posts.map((p) => p.slug).join(", ") || "none"}`);
