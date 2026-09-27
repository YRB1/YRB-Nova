// YRB Nova shared site behaviour

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
