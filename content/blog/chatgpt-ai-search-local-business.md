---
title: How to Show Up in ChatGPT and AI Search as a Local Business
description: Want ChatGPT and Google's AI answers to mention your business? What Google and OpenAI actually say, what to fix on your site, and what to ignore.
date: 2026-11-25
category: SEO
image: /blog/img/elite-electric-faq-areas-covered.webp
imageAlt: The FAQ list on our Elite Electric concept site's contact page, with questions such as Are you fully insured and certified, How quickly can you attend an emergency and Do you provide a written quote before starting, and the What areas do you cover answer open, listing Manchester, Salford, Stockport, Trafford, Bolton and other towns
ctaTitle: Is your site readable by AI search?
ctaText: Send us your website and we'll check the basics: crawler access, your details, your answers. The audit is free and we'll tell you plainly what matters.
---

A customer opens ChatGPT and types "emergency electrician near Stockport who does EICRs". She gets a tidy answer with three names in it. She rings the first one.

You're the best sparky in Stockport. You weren't one of the three names. And you have no idea why, because nobody ever told you that a chatbot was now handing out recommendations.

Here's what actually gets a local business into AI answers, based on what Google and OpenAI have published themselves, not on what someone selling "AI SEO packages" told you on LinkedIn.

## Start with the bit nobody wants to hear: it's mostly normal SEO

Google is surprisingly blunt about this. Its page on [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) says: "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."

The one technical requirement is that your page is indexed and eligible to show in normal Google results with a snippet. If Google can't find and read your site, its AI can't quote it either.

So the boring stuff still wins. A page that clearly says what you do, where you do it and how to book is what a search engine reads, whether a person or a robot is asking the question. Our guide to [local SEO basics](local-seo-leicester.html) covers the foundations, and every one of them applies here.

## Make sure the robots are allowed in

Every website has a small file called robots.txt that tells crawlers what they can and can't read. If it blocks the wrong one, you're invisible no matter how good your pages are.

For ChatGPT, the one that matters is called **OAI-SearchBot**. OpenAI's [crawler documentation](https://developers.openai.com/api/docs/bots) says sites that opt out of it will not be shown in ChatGPT search answers. It's a separate bot from **GPTBot**, which OpenAI uses to collect content that may be used to train its models.

That means you can choose. Block GPTBot if you don't want your words used for training, and still allow OAI-SearchBot so ChatGPT can find and link to you when someone asks.

Here's ours. We let them all in, because we'd quite like to be recommended:

![The robots.txt file on the YRB Nova website, allowing all crawlers, with a comment saying AI search crawlers are welcome so ChatGPT, Perplexity, Claude, Gemini and Copilot can find and cite YRB Nova, followed by a list of user agents including GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended and Bingbot](/blog/img/yrb-nova-robots-txt-ai-crawlers.webp "Our own robots.txt. Not the most glamorous screenshot on this blog, but it's the door, and the door has to be open.")

Google's page also says to check that crawling is allowed "by any CDN or hosting infrastructure", not only robots.txt. Some hosting and security settings block bots on your behalf. If you didn't build your site yourself, ask whoever did.

## Write down the answers people ask out loud

People type short searches into Google ("electrician Stockport"). They ask AI tools full questions ("can an electrician fix a failed EICR before my letting agent's deadline?"). The pages that do well are the ones that already answer those questions in plain words.

The quickest way to do that is a proper FAQ section, written from the questions customers really ask you. Our Elite Electric concept site (a demo, not a real company) has eight of them on its contact page, including insurance, emergency call-out times, written quotes, areas covered, guarantees, failed EICRs.

Look at the "What areas do you cover?" answer in the cover picture above. It names twelve actual places, from Salford to Warrington. "We cover the North West" is useless to a robot trying to answer a question about Bury. "We cover Bury" is not.

A few rules for answers that get used:

- **Put the answer in the first sentence.** "Yes, we do", "From £60", "Within the hour for emergencies". Then explain.
- **Use real names and numbers.** Towns, prices, opening hours, certifications.
- **Keep it on the page as text.** Google's guidance specifically says to make important content available "in textual form". A price list that only exists as a photo of a laminated sheet doesn't count.

:::case Styled By KY | Afro and black hair specialist, Derby
The FAQ on Deborah's site came straight from her Instagram inbox. Where she's based, how much braids cost in Derby, how to pay the deposit, whether you need to bring your own hair. Those were the questions clients asked her by message, so they're also the questions people ask Google and AI tools. The site is recent, so we don't have search figures to share yet, and we're not going to make any up. The full build is in our [case study](case-studies-otr-detailing-styled-by-ky.html).
:::

## Keep your details identical everywhere

An AI answer about a local business is pieced together from whatever it can find: your site, your Google listing, directories, reviews. If those sources disagree, you've made its job harder.

Google's AI features page tells businesses to check that their Business Profile information is up to date, and its [AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says Business Profiles can help your services be visible in AI responses as well as normal results. If you haven't claimed yours, our [step-by-step Google Business Profile guide](google-business-profile-setup.html) takes you through it.

Then make your website match it exactly. Same business name, same phone number, same address, same hours.

![The opening hours and directions section of our Halden Physio concept site's Leicester page, with a day-by-day hours table from Monday to Sunday, a drawn map pinned at 12 Oriel Court, Leicester LE1, and ticks for 5 minutes' walk from Leicester station, step-free access and a lift, pay-and-display parking next door, and changing room and showers](/blog/img/halden-physio-leicester-hours-map-directions.webp "A concept clinic, so don't book in. But the hours on screen match the hours in the code behind the page, minute for minute.")

That Halden Physio page (another concept site) also carries structured data, a bit of hidden code that spells out the clinic's name, address, phone number and opening hours for machines. Google's advice is that structured data should match the visible text on the page. Ours says 7:30 to 20:00 on a Monday because the table on screen says 7:30am to 8pm.

Google also says no special structured data is needed for its AI features. Useful, yes. Secret password, no.

## Don't pay for AI magic files

You may have been sold, or offered, something called an llms.txt file. It's a plain text summary of your site meant for AI tools.

We have one on yrbnova.com. It's harmless and it's free to write. But be clear about what it does in Google: its AI optimisation guide says llms.txt files "will neither harm nor help your site's visibility or rankings in Google Search, as Google Search ignores them."

So if someone is charging you hundreds of pounds for an llms.txt file and an "AI visibility guarantee", keep your wallet in your pocket. Nobody can guarantee what an AI tool says. Ask the same question twice and you can get two different answers.

## Do this today

1. **Ask ChatGPT and Google** the question your customers would ask, with your town in it. Note who comes up, and what those businesses' websites say that yours doesn't.
2. **Check your robots.txt** by typing yourwebsite.co.uk/robots.txt into a browser. If you see "Disallow: /" under OAI-SearchBot, Googlebot or "*", that's a problem.
3. **Claim or update your Google Business Profile.** Hours, phone, services, photos.
4. **Make your website details match it** word for word, especially your name and number.
5. **Write five FAQ answers** to questions customers really ask you, starting each with the actual answer.
6. **List the towns you cover by name** on your site, as text.
7. **Put your prices on the page** if you can. "From £X" is still an answer. Our post on [why "DM for price" costs you customers](dm-for-price.html) explains why.

## Where we come in

Every website we build includes on-page SEO: crawlable pages, proper headings, matching contact details and FAQ content written in plain English. Our fixed prices are £350, £600 or £800, paid once, with optional hosting and support at £10 a month or £100 a year.

Our Black Friday offer is on right now: 30% off any website, with 5 spots only, ending Cyber Monday. Details are on our [services and prices page](../services.html).

Already have a site and want to know if it's readable by AI search? Get a [free website audit](../free-website-audit.html) and we'll check the basics for you.

## FAQ

### How do I get my business recommended by ChatGPT?

There's no form to fill in. Make sure OpenAI's OAI-SearchBot isn't blocked in your robots.txt, then make your website clearly answer what you do, where, for how much and how to book. Consistent details on your Google Business Profile and directories help too.

### Do I need special SEO for Google AI Overviews?

No. Google says there are no additional requirements to appear in AI Overviews or AI Mode. If your page is indexed and can show in normal results with a snippet, it's eligible, so good normal SEO is the job.

### Does llms.txt help with AI search?

Not in Google. Google's own guide says it ignores llms.txt files, so they neither help nor harm your rankings there. It's free to add one, but don't pay extra for it.

### Should I block AI bots from my website?

Only block the ones you don't want. You can block GPTBot, which collects content for training, and still allow OAI-SearchBot, which is what lets ChatGPT show and link to your site in search answers.
