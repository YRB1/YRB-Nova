// YRB Nova: site-wide motion + interaction layer.
// Progressive: with JS off or "reduce motion" on, pages stay normal and static.
(function () {
    'use strict';

    var root = document.documentElement;
    var motion = root.classList.contains('ix-js');
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var vw = window.innerWidth, vh = window.innerHeight;
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    var header = document.querySelector('.site-header');
    var frameFns = [];

    var YN = window.YN = {
        motion: motion,
        fine: fine,
        lenis: null,
        onFrame: function (fn) { frameFns.push(fn); },
        scrollTo: function (y) {
            if (YN.lenis) YN.lenis.scrollTo(y, { duration: 1.3 });
            else window.scrollTo({ top: y, behavior: motion ? 'smooth' : 'auto' });
        },
        dirty: true
    };

    function setHeaderVar() { if (header) root.style.setProperty('--hdr', header.offsetHeight + 'px'); }
    setHeaderVar();

    // ---------- Split headings into words ----------
    function splitWords(el) {
        var i = 0;
        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) return;
                        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
                        var w = document.createElement('span'); w.className = 'w';
                        var wi = document.createElement('span'); wi.className = 'wi'; wi.style.setProperty('--i', i++);
                        wi.textContent = part; w.appendChild(wi); frag.appendChild(w);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1 && !/^(BR|SVG|IMG)$/.test(child.tagName)) {
                    walk(child);
                }
            });
        })(el);
    }
    YN.splitWords = splitWords;

    // ---------- Text scramble for small labels ----------
    var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function scramble(el) {
        if (el.dataset.scrambled) return;
        el.dataset.scrambled = '1';
        var node = null;
        for (var k = 0; k < el.childNodes.length; k++) if (el.childNodes[k].nodeType === 3 && el.childNodes[k].textContent.trim()) { node = el.childNodes[k]; break; }
        if (!node) return;
        var final = node.textContent, start = performance.now(), dur = 650;
        el.setAttribute('aria-label', final.trim());
        (function step(now) {
            var t = clamp((now - start) / dur, 0, 1), out = '';
            for (var i = 0; i < final.length; i++) {
                var ch = final[i];
                out += (ch === ' ' || i / final.length < t) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            node.textContent = out;
            if (t < 1) requestAnimationFrame(step); else { node.textContent = final; el.removeAttribute('aria-label'); }
        })(start);
    }

    // ---------- Auto-tag content for reveals ----------
    var inView = function (el) { var r = el.getBoundingClientRect(); return r.top < vh * 0.92 && r.bottom > 0; };
    if (motion) {
        var autoSel = [
            '.section .eyebrow', '.section h2', '.section .lede', '.section-tight .stats-row',
            '.card', '.work-card', '.post-card', '.live-card:not(.ix-track .live-card)', '.price-card', '.case-study',
            '.process-step', '.accordion-container', '.cta-band', '.timeline li', '.compare-wrap',
            '.hosting-plan', '.article > p', '.article > h2', '.article > ul', '.article > blockquote', '.article-cta', '.article-cover',
            '.vd-live-card', '.vd-calc', '.vd-list'
        ].join(',');
        document.querySelectorAll(autoSel).forEach(function (el) {
            if (el.closest('.page-hero, .ix-hero, [data-no-reveal], .lead-popup, #cookie-consent-popup, #cookie-preferences-modal')) return;
            if (el.matches('h2') && !el.hasAttribute('data-split') && el.textContent.trim().split(/\s+/).length <= 16) el.setAttribute('data-split', '');
            else if (!el.hasAttribute('data-split') && !el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
        });
        // Stagger siblings inside the same grid
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            if (el.style.getPropertyValue('--d')) return;
            var p = el.parentElement; if (!p) return;
            var sibs = Array.prototype.filter.call(p.children, function (c) { return c.hasAttribute('data-reveal'); });
            if (sibs.length > 1) el.style.setProperty('--d', (Math.min(sibs.indexOf(el), 5) * 0.07).toFixed(2) + 's');
        });
    }

    var revealEls = document.querySelectorAll('[data-reveal], [data-split]');
    if (motion && 'IntersectionObserver' in window) {
        document.querySelectorAll('[data-split]').forEach(function (el) {
            splitWords(el);
            if (inView(el) && !el.closest('.ix-hero')) { el.classList.add('fx-now', 'is-in'); }
        });
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            if (inView(el) && !el.closest('.ix-founder-photo')) { el.style.transition = 'none'; el.classList.add('is-in'); requestAnimationFrame(function () { el.style.transition = ''; }); }
        });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add('is-in');
                if (e.target.classList.contains('eyebrow')) scramble(e.target);
                e.target.querySelectorAll && e.target.querySelectorAll('.eyebrow').forEach(scramble);
                io.unobserve(e.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
        revealEls.forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
        // Eyebrows that aren't reveal targets still get the decode effect when seen
        var eio = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { scramble(e.target); eio.unobserve(e.target); } });
        }, { threshold: 0.6 });
        document.querySelectorAll('.eyebrow, .ix-kicker').forEach(function (el) { eio.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-in'); });
    }

    // ---------- Cursor glow + tilt on cards ----------
    if (motion && fine) {
        document.querySelectorAll('.card, .work-card, .post-card, .live-card, .price-card, .hosting-plan, .vd-live-card').forEach(function (el) { el.setAttribute('data-glow', ''); });
        document.querySelectorAll('.work-card, .post-card, .price-card, .case-media, [data-tilt]').forEach(function (el) {
            if (el.closest('.ix-track')) return;
            el.setAttribute('data-tilt', '');
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
                el.classList.add('fx-tilting');
                el.style.transform = 'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateY(-4px)';
            });
            el.addEventListener('pointerleave', function () { el.classList.remove('fx-tilting'); el.style.transform = ''; });
        });
        document.addEventListener('pointermove', function (e) {
            var card = e.target.closest && e.target.closest('[data-glow]');
            if (!card) return;
            var r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        }, { passive: true });
    }

    // ---------- Magnetic buttons ----------
    if (motion && fine) {
        document.querySelectorAll('.btn, .nav-cta, [data-magnetic]').forEach(function (btn) {
            btn.addEventListener('pointermove', function (e) {
                var r = btn.getBoundingClientRect();
                var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
                btn.style.transform = 'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
            });
            btn.addEventListener('pointerleave', function () {
                btn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.7, 0.1, 1)';
                btn.style.transform = '';
                setTimeout(function () { btn.style.transition = ''; }, 500);
            });
        });
    }

    // ---------- Sparkles on primary buttons ----------
    if (motion) {
        document.addEventListener('click', function (e) {
            var b = e.target.closest && e.target.closest('.btn-primary, .nav-cta');
            if (!b) return;
            for (var i = 0; i < 9; i++) {
                var s = document.createElement('span');
                s.className = 'fx-spark'; s.textContent = '✦';
                var a = (i / 9) * Math.PI * 2, d = 40 + Math.random() * 36;
                s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
                s.style.setProperty('--sx', (Math.cos(a) * d).toFixed(0) + 'px');
                s.style.setProperty('--sy', (Math.sin(a) * d).toFixed(0) + 'px');
                s.style.color = ['#a597ff', '#8fb1ff', '#6fe0c6'][i % 3];
                document.body.appendChild(s);
                setTimeout(function (n) { return function () { n.remove(); }; }(s), 750);
            }
        });
    }

    // ---------- Custom cursor ----------
    var cursor, cx = -100, cy = -100, rx = -100, ry = -100;
    if (motion && fine) {
        cursor = document.createElement('div'); cursor.className = 'fx-cursor'; cursor.setAttribute('aria-hidden', 'true');
        cursor.innerHTML = '<span></span>';
        // Ring only: the normal pointer stays, so precision and familiarity aren't lost
        document.body.appendChild(cursor);
        var label = cursor.firstChild;
        document.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            cx = e.clientX; cy = e.clientY;
            if (rx < -50) { rx = cx; ry = cy; }
            root.classList.add('fx-has-cursor');
            var t = e.target;
            var lab = t.closest && t.closest('[data-cursor]');
            var link = t.closest && t.closest('a, button, label, summary, [role="button"], input[type="range"]');
            var field = t.closest && t.closest('input:not([type="range"]), textarea, select, iframe');
            cursor.classList.toggle('is-label', !!lab);
            cursor.classList.toggle('is-link', !lab && !!link);
            cursor.classList.toggle('is-hidden', !!field);
            if (lab) label.textContent = lab.getAttribute('data-cursor');
        }, { passive: true });
        document.addEventListener('pointerdown', function () { cursor.classList.add('is-down'); });
        document.addEventListener('pointerup', function () { cursor.classList.remove('is-down'); });
        document.documentElement.addEventListener('mouseleave', function () { root.classList.remove('fx-has-cursor'); });
    }

    // ---------- Back to top with progress ring ----------
    var btt = document.getElementById('back-to-top'), bttCircle = null, bttLen = 0;
    if (btt) {
        btt.classList.add('fx-btt');
        btt.innerHTML = '&#8593;<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="fx-grad" x1="0" x2="1"><stop offset="0" stop-color="#a597ff"/><stop offset="1" stop-color="#6fe0c6"/></linearGradient></defs><circle cx="24" cy="24" r="22"/></svg>';
        btt.setAttribute('aria-label', 'Back to top');
        bttCircle = btt.querySelector('circle'); bttLen = 2 * Math.PI * 22;
        bttCircle.style.strokeDasharray = bttLen;
        btt.addEventListener('click', function (e) { if (YN.lenis) { e.stopImmediatePropagation(); YN.lenis.scrollTo(0, { duration: 1.6 }); } }, true);
    }

    // ---------- Page-hero drift ----------
    var heroMedia = document.querySelector('.page-hero-media > img, .page-hero-media > video, .page-hero-media .hero-slideshow, .work-wall-inner');
    var heroIsWall = heroMedia && heroMedia.classList.contains('work-wall-inner');

    // ---------- Videos play only when visible ----------
    document.querySelectorAll('video[data-ix-video]').forEach(function (v) {
        v.muted = true;
        if (!motion) { v.removeAttribute('autoplay'); v.pause(); return; }
        if (!('IntersectionObserver' in window)) { v.play().catch(function () {}); return; }
        new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
                    var p = v.play(); if (p && p.catch) p.catch(function () {});
                } else { v.pause(); }
            });
        }, { rootMargin: '200px 0px' }).observe(v);
    });

    // ---------- Page transitions ----------
    if (motion) {
        var curtain = document.createElement('div'); curtain.className = 'fx-curtain'; curtain.setAttribute('aria-hidden', 'true');
        document.body.appendChild(curtain);
        document.addEventListener('click', function (e) {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            var a = e.target.closest && e.target.closest('a[href]');
            if (!a || a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-cal-link') || a.dataset.noTransition !== undefined) return;
            var url; try { url = new URL(a.href, location.href); } catch (_) { return; }
            if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
            if (url.pathname === location.pathname && url.hash) return;
            if (/\.(pdf|zip|png|jpe?g|webp|mp4)$/i.test(url.pathname)) return;
            e.preventDefault();
            root.classList.add('fx-leaving');
            setTimeout(function () { location.href = url.href; }, 380);
        });
        window.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('fx-leaving'); });
    }

    // ---------- "Which package fits?" finder ----------
    var PKGS = [
        { key: 'basic', name: 'Basic', price: '£350', fit: 'You need a sharp, single page that gets you found and called, fast.', inc: ['One custom page, built from scratch', 'Mobile-friendly and fast', 'Live in about 2 days', 'Basic on-page SEO'] },
        { key: 'standard', name: 'Standard', price: '£600', fit: 'You want a few proper pages and somewhere to show off your work. This is the one most businesses pick.', inc: ['Everything in Basic', '2-3 pages (Home, Services, Contact)', 'Portfolio or case study section', 'Advanced SEO and revisions'] },
        { key: 'premium', name: 'Premium', price: '£800', fit: 'You want it all handled: as many pages as you need, custom features and your branding done properly.', inc: ['Everything in Standard', 'Unlimited pages (within scope)', 'Custom animations and integrations', 'Branding support and priority delivery'] }
    ];
    var QUESTIONS = [
        { q: 'How many pages do you need?', a: [['Just one page', 0], ['A few: home, services, contact', 1], ['As many as it takes', 2]] },
        { q: 'Anything extra on top?', a: [['No, keep it simple', 0], ['Show off my work (portfolio)', 1], ['Bookings, a shop or custom features', 2]] },
        { q: 'What matters most to you?', a: [['Getting online fast and affordably', 0], ['The best value as I grow', 1], ['Everything handled for me', 2]] }
    ];
    document.querySelectorAll('[data-pkg-finder]').forEach(function (box) {
        var answers = [];
        box.classList.add('is-live');
        box.setAttribute('aria-live', 'polite');
        function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
        function render() {
            var step = answers.length;
            var html = '<div class="pkg-top"><span class="pkg-step">' + (step < QUESTIONS.length ? 'Question ' + (step + 1) + ' of ' + QUESTIONS.length : 'Your match') + '</span>' +
                '<span class="pkg-bar"><i style="transform:scaleX(' + (step / QUESTIONS.length) + ')"></i></span></div>';
            if (step < QUESTIONS.length) {
                var Q = QUESTIONS[step];
                html += '<p class="pkg-q" tabindex="-1">' + esc(Q.q) + '</p><div class="pkg-opts">';
                Q.a.forEach(function (o, i) { html += '<button type="button" class="pkg-opt" data-i="' + i + '"><span>' + esc(o[0]) + '</span><i aria-hidden="true">&rarr;</i></button>'; });
                html += '</div>' + (step ? '<button type="button" class="pkg-back">&larr; Back</button>' : '');
            } else {
                var tier = Math.max.apply(null, answers.map(function (a, k) { return QUESTIONS[k].a[a][1]; }));
                var P = PKGS[tier];
                html += '<div class="pkg-result" tabindex="-1"><p class="pkg-q">We\'d suggest <em>' + P.name + '</em><span class="pkg-price">' + P.price + '</span></p>' +
                    '<p class="pkg-fit">' + esc(P.fit) + '</p><ul class="pkg-inc">' + P.inc.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
                    '<div class="btn-row"><a class="btn btn-primary" href="checkout.html?pkg=' + P.key + '">Book ' + P.name + ' &middot; ' + P.price + '</a>' +
                    '<a class="btn btn-outline" href="https://cal.com/yrb-nova-a1ionp/15min" target="_blank" rel="noopener">Ask Ben first</a></div>' +
                    '<p class="pkg-note">One-off price, agreed before any work starts. Any current offer is applied at checkout. <button type="button" class="pkg-restart">Start again</button></p></div>';
            }
            box.innerHTML = html;
            var focusEl = box.querySelector('.pkg-result, .pkg-q');
            if (box.dataset.started && focusEl) focusEl.focus({ preventScroll: true });
        }
        box.addEventListener('click', function (e) {
            var opt = e.target.closest('.pkg-opt');
            if (opt) { box.dataset.started = '1'; answers.push(+opt.dataset.i); render(); return; }
            if (e.target.closest('.pkg-back')) { answers.pop(); render(); return; }
            if (e.target.closest('.pkg-restart')) { answers = []; render(); }
        });
        render();
    });

    // ---------- Reading progress on blog articles ----------
    var article = document.querySelector('.article');
    if (article) {
        var readBar = document.createElement('div'); readBar.className = 'fx-read'; readBar.setAttribute('aria-hidden', 'true');
        readBar.innerHTML = '<i></i>';
        document.body.appendChild(readBar);
        var readFill = readBar.firstChild;
        frameFns.push(function (t, changed) {
            if (!changed) return;
            var r = article.getBoundingClientRect();
            var p = clamp(-r.top / Math.max(1, r.height - vh * 0.6), 0, 1);
            readFill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
        });
    }

    // ---------- One animation loop for everything ----------
    var lastY = -1, hideAcc = 0, docH = 1;
    var menuToggle = document.getElementById('menu-toggle');
    function frame(t) {
        var y = window.scrollY;
        var moved = y !== lastY;
        if (moved || YN.dirty) {
            var dy = lastY < 0 ? 0 : y - lastY;
            lastY = y;
            if (header) {
                header.classList.toggle('is-solid', y > 40);
                hideAcc = (dy > 0) === (hideAcc > 0) ? hideAcc + dy : dy;
                var menuOpen = menuToggle && menuToggle.checked;
                if (motion && y > 320 && hideAcc > 60 && !menuOpen) header.classList.add('is-hidden');
                if (hideAcc < -30 || y < 120 || menuOpen) header.classList.remove('is-hidden');
            }
            if (bttCircle) {
                docH = Math.max(1, document.documentElement.scrollHeight - vh);
                bttCircle.style.strokeDashoffset = (bttLen * (1 - clamp(y / docH, 0, 1))).toFixed(1);
            }
            if (heroMedia && motion && !heroIsWall && y < vh * 1.5) heroMedia.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0) scale(' + (1.04 + y * 0.00008).toFixed(4) + ')';
            if (heroMedia && motion && heroIsWall && y < vh * 1.5) heroMedia.style.marginTop = (-y * 0.25).toFixed(1) + 'px';
        }
        for (var i = 0; i < frameFns.length; i++) frameFns[i](t, moved || YN.dirty);
        YN.dirty = false;
        if (cursor) {
            rx += (cx - rx) * 0.2; ry += (cy - ry) * 0.2;
            cursor.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        }
        requestAnimationFrame(frame);
    }
    window.addEventListener('resize', function () { vw = window.innerWidth; vh = window.innerHeight; YN.vw = vw; YN.vh = vh; setHeaderVar(); YN.dirty = true; });
    YN.vw = vw; YN.vh = vh;
    requestAnimationFrame(frame);

    // ---------- Smooth scrolling on desktop ----------
    if (motion && fine) {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js';
        s.async = true;
        s.onload = function () {
            if (!window.Lenis) return;
            YN.lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -20 } });
            (function raf(time) { YN.lenis.raf(time); requestAnimationFrame(raf); })(performance.now());
        };
        document.head.appendChild(s);
    }
})();
