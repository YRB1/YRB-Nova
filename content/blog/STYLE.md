# YRB Nova blog: how every post is written

Read this in full before writing a post. Posts go live automatically, so the rules here are the quality control.

## Who we're writing for
UK small business owners: tradespeople, salons, barbers, detailers, cafés, cleaners, clinics. Busy, practical, allergic to jargon. They read on their phone between jobs.

## Voice: fun but serious
- Write like Ben talking to a mate who runs a business: direct, warm, a bit cheeky, never smug.
- One or two genuinely funny lines per section at most. Humour comes from real situations (replying to DMs with one hand while holding a pressure washer), never from puns for the sake of it.
- Serious where money is involved. Prices, contracts and legal points are stated plainly.
- British English (colour, optimise, £). Short sentences. Short paragraphs (1 to 3 sentences).
- Use "we" for YRB Nova and "you" for the reader.

## Banned (this is what "AI slop" looks like)
Never use: delve, dive in, in today's digital landscape, in today's fast-paced world, unlock, unleash, elevate, game-changer, seamless, robust, leverage, tapestry, navigate the complexities, it's important to note, in conclusion, ever-evolving, embark, realm, harness, cutting-edge, take it to the next level, look no further, whether you're a X or a Y.
Also never: em dashes (use commas, full stops or brackets), rhetorical-question openers ("Have you ever wondered...?"), "Let's" section intros, lists of exactly three adjectives, a closing paragraph that summarises the post.

## Truth rules (non-negotiable)
- Never invent statistics, results, quotes, clients or reviews. No "studies show" without a real, named source you have actually checked.
- Real clients you may write about: **OTR Detailing** (Gideon, mobile valeting, Coventry) and **Styled By KY** (Deborah, afro hair stylist, Derby). Only describe what was really built (see blog/case-studies-otr-detailing-styled-by-ky.html). No results numbers exist yet. Do not claim any.
- The sites in /demos are fictional concept sites. Always call them "concept" or "demo" sites, never clients.
- Prices and offers must match the live site: read offers.json and services.html before mentioning any price or discount. Do not mention a promo that has ended.
- If you're not sure something is true, leave it out.

## Structure
- 900 to 1,500 words.
- Open with a relatable, specific situation in 2 to 4 sentences. No throat-clearing.
- `##` section headings that say something ("Put your prices on the page"), not labels ("Pricing").
- At least one practical "do this today" list.
- A real example in every post: a case study box (`:::case Name | subtitle` ... `:::`) about OTR Detailing or Styled By KY when relevant, or a walkthrough of one of our demo sites (clearly labelled as a concept).
- End with `## FAQ` and 3 or 4 `###` questions people actually type into Google, each answered in 1 to 3 sentences.
- Link to 1 or 2 relevant YRB Nova pages (services, a "websites for..." page, the free audit, work) and to one older blog post.

## Pictures (every post needs a cover + at least 2 inline)
- Use real screenshots only: the client screenshots in blog/img/, or new screenshots of our /demos sites (run a local server and screenshot them with Playwright at 1440x900, mobile at 390x844 scale 2; convert to .webp under 1400px wide into blog/img/).
- Name files descriptively (elite-electric-pricing-section.webp). Write real alt text describing what's in the shot.
- Every image gets a caption with a bit of personality.
- No AI-generated images. No stock photos of people shaking hands.

## Front matter template
```
---
title: (under 65 characters, includes the main search phrase)
description: (140 to 160 characters, says what the reader gets)
date: YYYY-MM-DD
category: Case Study | Pricing | Local Business | Conversion | SEO | Our Process | AI Receptionist
image: /blog/img/....webp
imageAlt: ...
ctaTitle: (optional, matches the post)
ctaText: (optional)
---
```

## Publishing
1. Write content/blog/<slug>.md (slug = short, keyword-led, hyphenated).
2. Run `node scripts/build-blog.mjs`.
3. Open the generated page in Playwright, screenshot it, and check it renders, the images load, and there are no console errors.
4. Tick the topic off in content/blog/topics.md (move it to "Done" with the date and slug).
5. Commit "Blog: <title>" and push to main.
