// YRB Nova shared site behaviour

// Vercel Web Analytics (cookieless, served from our own domain)
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
(function () {
    const s = document.createElement('script');
    s.defer = true;
    s.src = '/_vercel/insights/script.js';
    document.head.appendChild(s);
})();

document.addEventListener('DOMContentLoaded', () => {

    // Mobile nav: close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const toggle = document.getElementById('menu-toggle');
            if (toggle) toggle.checked = false;
        });
    });

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Cal.com booking popup - only loaded on pages with a [data-cal-link] button.
    // The buttons are real links to cal.com, so they still work if the embed fails to load.
    const calButtons = document.querySelectorAll('[data-cal-link]');
    if (calButtons.length) {
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "15min", { origin: "https://app.cal.com" });
        Cal.config = Cal.config || {};
        Cal.config.forwardQueryParams = true;
        Cal.ns["15min"]("ui", {
            hideEventTypeDetails: false,
            layout: "month_view",
            theme: "dark",
            cssVarsPerTheme: { dark: { "cal-brand": "#4fc9ab" } }
        });

        // Open the popup instead of following the fallback link once the embed has loaded
        calButtons.forEach(btn => btn.addEventListener('click', (e) => {
            if (window.Cal && window.Cal.loaded) e.preventDefault();
        }));
    }

    // Animated stat counters
    const statEls = document.querySelectorAll('.stat-value[data-count]');
    if (statEls.length) {
        const animateCount = (el) => {
            const target = parseFloat(el.dataset.count);
            const decimals = el.dataset.count.includes('.') ? el.dataset.count.split('.')[1].length : 0;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duration = 1400;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = target * eased;
                el.textContent = prefix + value.toFixed(decimals) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCount(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        statEls.forEach(el => statObserver.observe(el));
    }

    // Back to top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = (window.scrollY > 400) ? 'block' : 'none';
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hero background slideshow
    const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
    if (heroSlides.length) {
        let heroIndex = 0;
        setInterval(() => {
            heroSlides[heroIndex].classList.remove('active');
            heroIndex = (heroIndex + 1) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
        }, 3500);
    }

    // Testimonial carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.children;
        const total = slides.length;
        let index = 0;
        const dotsWrap = document.querySelector('.carousel-dots');

        if (dotsWrap) {
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => showSlide(i));
                dotsWrap.appendChild(dot);
            }
        }

        function showSlide(i) {
            index = (i + total) % total;
            carousel.style.transform = `translateX(-${index * 100}%)`;
            if (dotsWrap) {
                Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle('active', di === index));
            }
        }

        setInterval(() => showSlide(index + 1), 5000);
    }

    // Offers (offers.json): seasonal banner + email-capture popup.
    // Pricing pages never trust this for charging - the server applies the same file at checkout.
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
    };
    const path = location.pathname.toLowerCase();
    const isTransactionalPage = /(checkout|payment-|admin|pdf)/.test(path);
    const rootPrefix = path.includes('/blog/') ? '../' : '';
    let offersPromise = null;
    const getOffers = () => offersPromise || (offersPromise = fetch('/offers.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).catch(() => null));

    function seasonalActive(o) {
        const s = o && o.seasonal;
        if (!s || !s.enabled || !s.endsAt) return null;
        const now = Date.now();
        if (s.startsAt && now < Date.parse(s.startsAt)) return null;
        if (now >= Date.parse(s.endsAt)) return null;
        return s;
    }

    function showSeasonalBanner(s) {
        const bar = document.createElement('div');
        bar.className = 'offer-banner';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', s.label || 'Offer');
        bar.innerHTML = '<a href="' + rootPrefix + 'services.html#pricing"><span class="offer-text"></span> <span class="offer-countdown" aria-live="off"></span></a>';
        bar.querySelector('.offer-text').textContent = s.bannerText;
        document.body.prepend(bar);
        document.body.classList.add('has-offer-banner');
        const cd = bar.querySelector('.offer-countdown');
        const end = Date.parse(s.endsAt);
        const tick = () => {
            const left = end - Date.now();
            if (left <= 0) { bar.remove(); document.body.classList.remove('has-offer-banner'); clearInterval(timer); return; }
            const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60, sec = Math.floor(left / 1e3) % 60;
            cd.textContent = 'Ends in ' + (d ? d + 'd ' : '') + h + 'h ' + String(m).padStart(2, '0') + 'm ' + String(sec).padStart(2, '0') + 's';
        };
        const timer = setInterval(tick, 1000);
        tick();
    }

    // Email popup rules: once per visitor, after ~10s of total time on the site (across pages),
    // only after cookie consent, never on checkout/payment/admin pages.
    const POPUP_SECONDS = 10;
    const hasConsent = () => store.get('cookieChoice') === 'accepted' || !!store.get('cookiesPreferences');

    function showLeadPopup(p) {
        store.set('yn_popup_shown', '1');
        const wrap = document.createElement('div');
        wrap.className = 'lead-popup';
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-modal', 'true');
        wrap.setAttribute('aria-labelledby', 'lead-popup-title');
        wrap.innerHTML =
            '<div class="lead-popup-card">' +
                '<button type="button" class="lead-popup-close" aria-label="Close">&times;</button>' +
                '<p class="eyebrow">Before you go</p>' +
                '<h2 id="lead-popup-title">Get ' + p.percentOff + '% off your website</h2>' +
                '<p class="lead-popup-sub">Pop your email in and we\'ll show you a code for ' + p.percentOff + '% off any package. Fixed prices from £350, built from scratch and live in 2-5 days.</p>' +
                '<form class="lead-popup-form" novalidate>' +
                    '<label class="sr-only" for="lead-popup-email">Email address</label>' +
                    '<input type="email" id="lead-popup-email" name="email" placeholder="you@business.co.uk" autocomplete="email" required>' +
                    '<input type="text" name="company" tabindex="-1" autocomplete="off" class="lead-hp" aria-hidden="true">' +
                    '<button type="submit" class="btn btn-primary">Get my code</button>' +
                '</form>' +
                '<p class="lead-popup-error" role="alert"></p>' +
                '<p class="lead-popup-fine">We\'ll only use your email to send your code and follow up about your website. See our <a href="' + rootPrefix + 'privacy-policy.html">privacy policy</a>.</p>' +
            '</div>';
        document.body.appendChild(wrap);
        const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey); };
        const onKey = e => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
        wrap.querySelector('.lead-popup-close').addEventListener('click', close);
        const form = wrap.querySelector('form');
        const err = wrap.querySelector('.lead-popup-error');
        const input = wrap.querySelector('#lead-popup-email');
        setTimeout(() => input.focus(), 50);
        form.addEventListener('submit', e => {
            e.preventDefault();
            const email = input.value.trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email address.'; return; }
            const btn = form.querySelector('button');
            btn.disabled = true; btn.textContent = 'Sending…'; err.textContent = '';
            fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, company: form.company.value, page: location.pathname })
            })
            .then(r => r.json().then(d => ({ ok: r.ok, d })))
            .then(({ ok, d }) => {
                if (!ok || !d.code) throw new Error(d.error || 'Something went wrong.');
                store.set('yn_discount_code', d.code);
                const card = wrap.querySelector('.lead-popup-card');
                card.innerHTML =
                    '<button type="button" class="lead-popup-close" aria-label="Close">&times;</button>' +
                    '<p class="eyebrow">Your code</p>' +
                    '<h2 id="lead-popup-title">' + p.percentOff + '% off is yours</h2>' +
                    '<p class="lead-popup-code"></p>' +
                    '<p class="lead-popup-sub">It\'s applied automatically when you book on this device, or enter it at checkout.</p>' +
                    '<a class="btn btn-primary" href="' + rootPrefix + 'services.html#pricing">See packages</a>';
                card.querySelector('.lead-popup-code').textContent = d.code;
                card.querySelector('.lead-popup-close').addEventListener('click', close);
            })
            .catch(ex => { err.textContent = ex.message; btn.disabled = false; btn.textContent = 'Get my code'; });
        });
    }

    function startPopupTimer(p) {
        if (store.get('yn_popup_shown')) return;
        let shown = false;
        setInterval(() => {
            if (shown || document.hidden || !hasConsent()) return;
            const t = (parseInt(store.get('yn_time_on_site') || '0', 10) || 0) + 1;
            store.set('yn_time_on_site', String(t));
            if (t >= POPUP_SECONDS && !store.get('yn_popup_shown') && !document.querySelector('.lead-popup')) {
                shown = true;
                showLeadPopup(p);
            }
        }, 1000);
    }

    // Sticky call-to-action bar on phones (CSS only shows it under 760px wide)
    if (!isTransactionalPage && !path.includes('free-website-audit')) {
        const bar = document.createElement('nav');
        bar.className = 'mobile-cta';
        bar.setAttribute('aria-label', 'Quick actions');
        bar.innerHTML = '<a class="primary" href="' + rootPrefix + 'free-website-audit.html">Free Website Audit</a>' +
            '<a class="secondary" href="https://cal.com/yrb-nova-a1ionp/15min" target="_blank" rel="noopener">Book a Call</a>';
        document.body.appendChild(bar);
        document.body.classList.add('has-mobile-cta');
        const cookieBanner = document.getElementById('cookie-consent-popup');
        const update = () => {
            const bannerOpen = cookieBanner && getComputedStyle(cookieBanner).display !== 'none';
            bar.classList.toggle('show', window.scrollY > 350 && !bannerOpen && !document.querySelector('.lead-popup'));
        };
        window.addEventListener('scroll', update, { passive: true });
        document.addEventListener('click', () => setTimeout(update, 50));
        update();
    }

    if (!isTransactionalPage) {
        getOffers().then(o => {
            if (!o) return;
            const s = seasonalActive(o);
            if (s) showSeasonalBanner(s);
            // Pause the popup while a seasonal offer beats it (e.g. 20% Christmas vs 10% code), so visitors aren't offered the smaller deal
            const p = o.popupDiscount;
            const seasonalBeatsPopup = s && p && ((s.percentOff || 0) >= (p.percentOff || 0) || !!s.amountOffPence);
            if (p && p.enabled && !seasonalBeatsPopup) startPopupTimer(p);
        });
    }

    // Cookie Consent
    const popup = document.getElementById('cookie-consent-popup');
    const modal = document.getElementById('cookie-preferences-modal');

    if (popup) {
        if (!localStorage.getItem('cookieChoice') && !localStorage.getItem('cookiesPreferences')) {
            popup.style.display = 'flex';
        }

        document.getElementById('accept-cookies').onclick = () => {
            localStorage.setItem('cookieChoice', 'accepted');
            popup.style.display = 'none';
        };

        document.getElementById('deny-cookies').onclick = () => {
            localStorage.setItem('cookieChoice', 'denied');
            popup.style.display = 'none';
        };

        document.getElementById('view-preferences').onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        };

        document.getElementById('close-modal').onclick = () => {
            modal.style.display = 'none';
        };

        document.getElementById('save-preferences').onclick = () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            localStorage.setItem('cookiesPreferences', JSON.stringify({ analytics, marketing }));
            popup.style.display = 'none';
            modal.style.display = 'none';
        };
    }
});
