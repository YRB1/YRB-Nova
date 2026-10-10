/* =====================================================================
   YRB Nova demo kit — shared behaviour for healthcare demo sites.
   Brand data comes from window.SITE (assets/data.js): practices,
   treatments, team, call scenarios and Sales Mode callouts.
   Each feature only runs if its markup is on the page.
   ===================================================================== */
(function () {
    'use strict';
    const SITE = window.SITE || {};
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
    };
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ICON = {
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
        cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
        sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>',
        play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
        pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
        replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
        sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
        mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>',
        left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
        right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
    };
    window.KIT_ICON = ICON;

    /* ---------------- Opening hours helpers ---------------- */
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    function hoursFor(p, d) { return (p.hours && p.hours[d]) || null; } // [open, close] or null
    function openNow(p, now = new Date()) {
        const h = hoursFor(p, now.getDay());
        if (!h) return false;
        const m = now.getHours() * 60 + now.getMinutes();
        return m >= toMin(h[0]) && m < toMin(h[1]);
    }
    function fmtTime(t) {
        let [h, m] = t.split(':').map(Number);
        const ap = h >= 12 ? 'pm' : 'am';
        h = h % 12 || 12;
        return m ? `${h}:${String(m).padStart(2, '0')}${ap}` : `${h}${ap}`;
    }
    function todayLine(p, now = new Date()) {
        const h = hoursFor(p, now.getDay());
        if (!h) return 'Closed today';
        return openNow(p, now) ? `Open now, until ${fmtTime(h[1])}` : `Today ${fmtTime(h[0])}–${fmtTime(h[1])}`;
    }
    window.KIT_HOURS = { openNow, todayLine, fmtTime, hoursFor, DAYS };

    // Weekly hours table: <table data-hours="practice-id">
    $$('[data-hours]').forEach(tbl => {
        const p = (SITE.practices || []).find(x => x.id === tbl.dataset.hours);
        if (!p) return;
        const today = new Date().getDay();
        const order = [1, 2, 3, 4, 5, 6, 0];
        tbl.innerHTML = '<caption class="k-sr">Opening hours</caption><tbody>' + order.map(d => {
            const h = hoursFor(p, d);
            return `<tr class="${d === today ? 'today' : ''}"><td>${DAYS[d]}${d === today ? ' (today)' : ''}</td><td>${h ? fmtTime(h[0]) + ' – ' + fmtTime(h[1]) : 'Closed'}</td></tr>`;
        }).join('') + '</tbody>';
    });
    $$('[data-open-now]').forEach(el => {
        const p = (SITE.practices || []).find(x => x.id === el.dataset.openNow);
        if (!p) return;
        const o = openNow(p);
        el.className = 'k-open ' + (o ? 'is-open' : 'is-closed');
        el.textContent = todayLine(p);
    });

    /* ---------------- Mobile nav ---------------- */
    const menu = $('.k-mobile-nav');
    const menuBtn = $('.k-menu-btn');
    if (menu && menuBtn) {
        const close = () => { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; menuBtn.focus(); };
        menuBtn.addEventListener('click', () => {
            menu.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
            const first = menu.querySelector('a, button'); if (first) first.focus();
        });
        $$('.k-close, a', menu).forEach(el => el.addEventListener('click', () => { if (el.classList.contains('k-close') || el.tagName === 'A') close(); }));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) close(); });
    }

    /* ---------------- Urgent banner dismiss ---------------- */
    $$('[data-dismiss]').forEach(btn => btn.addEventListener('click', () => { const t = btn.closest(btn.dataset.dismiss); if (t) t.remove(); }));

    /* ---------------- Scroll reveal ---------------- */
    const reveals = $$('.k-reveal');
    if (reveals.length && 'IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    } else reveals.forEach(el => el.classList.add('in'));

    /* ---------------- Sticky mobile booking bar ---------------- */
    const bar = $('.k-mobile-bar');
    if (bar) {
        document.body.classList.add('k-has-bar');
        const upd = () => bar.classList.toggle('show', window.scrollY > 420);
        window.addEventListener('scroll', upd, { passive: true });
        upd();
    }

    /* ---------------- Carousel (reviews) ---------------- */
    $$('[data-carousel]').forEach(root => {
        const track = $('.k-carousel-track', root);
        const items = Array.from(track.children);
        const dotsWrap = $('.k-carousel-dots', root);
        const prev = $('[data-prev]', root), next = $('[data-next]', root);
        root.setAttribute('role', 'region');
        root.setAttribute('aria-roledescription', 'carousel');
        items.forEach((it, i) => { it.setAttribute('role', 'group'); it.setAttribute('aria-roledescription', 'slide'); it.setAttribute('aria-label', `${i + 1} of ${items.length}`); });
        const perView = () => Math.max(1, Math.round(track.clientWidth / (items[0] ? items[0].getBoundingClientRect().width + 18 : 1)));
        const pages = () => Math.max(1, items.length - perView() + 1);
        let idx = 0;
        const go = i => {
            idx = (i + pages()) % pages();
            track.scrollTo({ left: items[idx].offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
            renderDots();
        };
        function renderDots() {
            if (!dotsWrap) return;
            const n = pages();
            if (dotsWrap.children.length !== n) {
                dotsWrap.innerHTML = '';
                for (let i = 0; i < n; i++) {
                    const b = document.createElement('button');
                    b.type = 'button'; b.setAttribute('aria-label', `Go to review ${i + 1}`);
                    b.addEventListener('click', () => { go(i); stop(); });
                    dotsWrap.appendChild(b);
                }
            }
            Array.from(dotsWrap.children).forEach((b, i) => b.setAttribute('aria-current', i === idx ? 'true' : 'false'));
        }
        if (prev) prev.addEventListener('click', () => { go(idx - 1); stop(); });
        if (next) next.addEventListener('click', () => { go(idx + 1); stop(); });
        let t = null;
        track.addEventListener('scroll', () => {
            clearTimeout(t);
            t = setTimeout(() => {
                const left = track.scrollLeft;
                let best = 0, bd = Infinity;
                items.forEach((it, i) => { const d = Math.abs(it.offsetLeft - track.offsetLeft - left); if (d < bd) { bd = d; best = i; } });
                idx = Math.min(best, pages() - 1); renderDots();
            }, 90);
        }, { passive: true });
        let auto = null;
        const start = () => { if (!reduceMotion && !auto) auto = setInterval(() => go(idx + 1), 6500); };
        const stop = () => { clearInterval(auto); auto = null; };
        root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop); root.addEventListener('touchstart', stop, { passive: true });
        root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { go(idx - 1); stop(); } if (e.key === 'ArrowRight') { go(idx + 1); stop(); } });
        window.addEventListener('resize', renderDots);
        renderDots(); start();
    });

    /* ---------------- Location finder ---------------- */
    const R = 3958.8; // miles
    const dist = (a, b) => { const r = x => x * Math.PI / 180; const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng); const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
    // Approximate centres for Midlands postcode areas, used if the postcode lookup is unavailable
    const AREAS = { NG: [52.95, -1.15], DE: [52.92, -1.48], LE: [52.63, -1.13], CV: [52.41, -1.51], B: [52.48, -1.9], WV: [52.59, -2.13], WS: [52.59, -1.98], DY: [52.51, -2.08], NN: [52.24, -0.9], LN: [53.23, -0.54], ST: [53.0, -2.18], S: [53.38, -1.47], PE: [52.57, -0.24], MK: [52.04, -0.76], OX: [51.75, -1.26], WR: [52.19, -2.22], TF: [52.68, -2.45], SY: [52.71, -2.75], HR: [52.06, -2.72], GL: [51.86, -2.24], LU: [51.88, -0.42], CB: [52.2, 0.12], DN: [53.52, -1.13], WF: [53.68, -1.5], SK: [53.4, -2.15], M: [53.48, -2.24], BS: [51.45, -2.59], BA: [51.38, -2.36], EX: [50.72, -3.53], TA: [51.02, -3.1], PL: [50.38, -4.14], TR: [50.26, -5.05], SN: [51.56, -1.78], TQ: [50.46, -3.53], DT: [50.71, -2.44], BH: [50.72, -1.88], EH: [55.95, -3.19], G: [55.86, -4.25], LS: [53.8, -1.55], W: [51.51, -0.15], SW: [51.47, -0.17], EC: [51.52, -0.09], WC: [51.52, -0.12], N: [51.56, -0.11], E: [51.53, -0.03], NW: [51.55, -0.18], SE: [51.47, -0.06], L: [53.41, -2.98], NE: [54.97, -1.61], CF: [51.48, -3.18] };
    function renderPractice(p, d) {
        const o = openNow(p);
        const book = (SITE.bookUrl || 'book.html') + '?location=' + encodeURIComponent(p.id);
        const page = p.page ? `<a class="k-btn k-btn-ghost" href="${esc(p.page)}">View practice</a>` : '';
        return `<article class="k-practice k-glass">
            <h3>${esc(p.name)}</h3>
            <p class="k-addr">${esc(p.address)}</p>
            <div class="k-meta"><span class="k-open ${o ? 'is-open' : 'is-closed'}">${esc(todayLine(p))}</span>${d != null ? `<span class="k-distance">${d < 10 ? d.toFixed(1) : Math.round(d)} miles</span>` : ''}${(p.tags || []).map(t => `<span class="k-distance">${esc(t)}</span>`).join('')}</div>
            <div class="k-actions"><a class="k-btn k-btn-primary" href="${book}">Book here</a>${page}<a class="k-btn k-btn-ghost" href="tel:${esc(p.phone.replace(/\s/g, ''))}" aria-label="Call ${esc(p.name)} on ${esc(p.phone)}">${ICON.phone} Call</a></div>
        </article>`;
    }
    $$('[data-finder]').forEach(root => {
        const list = $('.k-practices', root);
        const input = $('input', root);
        const status = $('.k-finder-status', root);
        const nearBtn = $('[data-nearest]', root);
        const limit = parseInt(root.dataset.limit || '0', 10);
        const practices = SITE.practices || [];
        const show = (arr, msg) => {
            const shown = limit ? arr.slice(0, limit) : arr;
            list.innerHTML = shown.map(x => renderPractice(x.p || x, x.d != null ? x.d : null)).join('');
            if (msg != null) status.textContent = msg;
        };
        const byDistance = (pt, label) => {
            const arr = practices.map(p => ({ p, d: dist(pt, p) })).sort((a, b) => a.d - b.d);
            show(arr, `${practices.length} practices, nearest to ${label} first.`);
        };
        show(practices, `${practices.length} practices across the ${SITE.region || 'region'}.`);
        const search = async q => {
            q = q.trim();
            if (!q) { show(practices, `${practices.length} practices across the ${SITE.region || 'region'}.`); return; }
            const town = practices.filter(p => (p.town + ' ' + p.name + ' ' + p.address).toLowerCase().includes(q.toLowerCase()));
            if (town.length) { const c = town[0]; byDistance(c, c.town); return; }
            const pc = q.toUpperCase().replace(/\s+/g, '');
            if (/^[A-Z]{1,2}[0-9][0-9A-Z]?([0-9][A-Z]{2})?$/.test(pc)) {
                status.textContent = 'Finding your nearest practices…';
                try {
                    const full = pc.length >= 5;
                    const url = full ? `https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}` : `https://api.postcodes.io/outcodes/${encodeURIComponent(pc)}`;
                    const r = await fetch(url);
                    if (r.ok) { const j = await r.json(); if (j.result && j.result.latitude) { byDistance({ lat: j.result.latitude, lng: j.result.longitude }, q.toUpperCase()); return; } }
                } catch (_) { /* fall back to area centres */ }
                const area = (pc.match(/^[A-Z]{1,2}/) || [''])[0];
                const c = AREAS[area] || AREAS[area[0]];
                if (c) { byDistance({ lat: c[0], lng: c[1] }, q.toUpperCase()); return; }
            }
            show([], '');
            status.textContent = `We couldn't find "${q}". Try a town like ${practices[0] ? practices[0].town : 'Nottingham'} or a postcode like NG1.`;
        };
        let deb = null;
        input.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(() => search(input.value), 350); });
        const form = input.closest('form');
        if (form) form.addEventListener('submit', e => { e.preventDefault(); search(input.value); });
        if (nearBtn) nearBtn.addEventListener('click', () => {
            if (!navigator.geolocation) { status.textContent = 'Location is not available in this browser. Try a postcode instead.'; return; }
            status.textContent = 'Finding your location…';
            navigator.geolocation.getCurrentPosition(
                pos => byDistance({ lat: pos.coords.latitude, lng: pos.coords.longitude }, 'you'),
                () => { status.textContent = 'We couldn\'t get your location. Try typing your postcode or town instead.'; },
                { timeout: 8000, maximumAge: 600000 }
            );
        });
    });

    /* ---------------- Booking flow ---------------- */
    const bookRoot = $('[data-booking]');
    if (bookRoot) {
        const params = new URLSearchParams(location.search);
        const state = { location: params.get('location') || '', treatment: params.get('treatment') || '', date: '', time: '' };
        const steps = $$('.k-step', bookRoot);
        const prog = $$('.k-progress li', bookRoot);
        let cur = 0;
        const practices = SITE.practices || [], treatments = SITE.treatments || [];
        const P = id => practices.find(p => p.id === id), T = id => treatments.find(t => t.id === id);
        const show = i => {
            cur = i;
            steps.forEach((s, k) => s.classList.toggle('active', k === i));
            prog.forEach((p, k) => { p.classList.toggle('done', k < i); p.classList.toggle('current', k === i); if (k === i) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current'); });
            const h = steps[i].querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
            bookRoot.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            refresh();
        };
        const opt = (sel, val, html, extra = '') => `<button type="button" class="k-option" data-${sel}="${esc(val)}" aria-pressed="${state[sel] === val}" ${extra}>${html}</button>`;
        function renderLocations() {
            $('[data-list="location"]', bookRoot).innerHTML = practices.map(p => opt('location', p.id, `<span><strong>${esc(p.name)}</strong><small>${esc(p.address)} · ${esc(todayLine(p))}</small></span>`)).join('');
        }
        function renderTreatments() {
            $('[data-list="treatment"]', bookRoot).innerHTML = treatments.map(t => opt('treatment', t.id, `<span><strong>${esc(t.name)}</strong><small>${esc(t.duration || '')}${t.nhs ? ' · NHS or private' : ''}</small></span><span class="k-price-tag">${esc(t.from)}</span>`)).join('');
        }
        function renderDays() {
            const wrap = $('[data-list="date"]', bookRoot);
            const p = P(state.location);
            const days = [];
            const d = new Date(); d.setHours(0, 0, 0, 0);
            for (let i = 0; days.length < 12 && i < 30; i++) {
                const x = new Date(d); x.setDate(d.getDate() + i);
                if (!p || hoursFor(p, x.getDay())) days.push(x);
            }
            wrap.innerHTML = days.map(x => {
                // Local date (toISOString would shift a day back during British Summer Time)
                const v = `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
                const lab = x.toLocaleDateString('en-GB', { weekday: 'short' });
                return opt('date', v, `<small>${lab}</small><strong>${x.getDate()}</strong><small>${x.toLocaleDateString('en-GB', { month: 'short' })}</small>`);
            }).join('');
        }
        function renderSlots() {
            const wrap = $('[data-list="time"]', bookRoot);
            const p = P(state.location);
            if (!state.date || !p) { wrap.innerHTML = '<p class="k-events-empty">Choose a day to see times.</p>'; return; }
            const day = new Date(state.date + 'T00:00:00');
            const h = hoursFor(p, day.getDay());
            if (!h) { wrap.innerHTML = '<p class="k-events-empty">Closed this day.</p>'; return; }
            const slots = [];
            const now = new Date();
            for (let m = toMin(h[0]); m + 30 <= toMin(h[1]); m += 30) {
                const hh = String(Math.floor(m / 60)).padStart(2, '0'), mm = String(m % 60).padStart(2, '0');
                const t = `${hh}:${mm}`;
                const seed = (day.getDate() * 31 + m + p.id.length * 7) % 9;
                const past = day.toDateString() === now.toDateString() && m <= now.getHours() * 60 + now.getMinutes() + 60;
                slots.push(opt('time', t, fmtTime(t), (seed < 3 || past) ? 'disabled aria-disabled="true"' : ''));
            }
            wrap.innerHTML = slots.join('');
        }
        function refresh() {
            $$('[data-location]', bookRoot).forEach(b => b.setAttribute('aria-pressed', b.dataset.location === state.location));
            $$('[data-treatment]', bookRoot).forEach(b => b.setAttribute('aria-pressed', b.dataset.treatment === state.treatment));
            $$('[data-date]', bookRoot).forEach(b => b.setAttribute('aria-pressed', b.dataset.date === state.date));
            $$('[data-time]', bookRoot).forEach(b => b.setAttribute('aria-pressed', b.dataset.time === state.time));
            const need = [state.location, state.treatment, state.date && state.time];
            $$('[data-next-step]', bookRoot).forEach((b, i) => { b.disabled = !need[i]; });
            const sum = $('[data-summary]', bookRoot);
            if (sum) {
                const p = P(state.location), t = T(state.treatment);
                const when = state.date ? new Date(state.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
                sum.innerHTML = `<div><span>Practice</span><span>${p ? esc(p.name) : '–'}</span></div><div><span>Treatment</span><span>${t ? esc(t.name) : '–'}</span></div><div><span>When</span><span>${when ? esc(when) + (state.time ? ', ' + fmtTime(state.time) : '') : '–'}</span></div><div><span>Price</span><span>${t ? esc(t.from) : '–'}</span></div>`;
            }
        }
        bookRoot.addEventListener('click', e => {
            const b = e.target.closest('.k-option');
            if (b && !b.disabled) {
                for (const k of ['location', 'treatment', 'date', 'time']) if (b.dataset[k] !== undefined) {
                    state[k] = b.dataset[k];
                    if (k === 'location') { state.date = ''; state.time = ''; renderDays(); renderSlots(); }
                    if (k === 'date') { state.time = ''; renderSlots(); }
                }
                refresh();
            }
            const nx = e.target.closest('[data-next-step]'); if (nx && !nx.disabled) show(cur + 1);
            const bk = e.target.closest('[data-prev-step]'); if (bk) show(cur - 1);
        });
        const form = $('form', bookRoot);
        form.addEventListener('submit', e => {
            e.preventDefault();
            let ok = true;
            $$('[required]', form).forEach(inp => {
                const err = inp.closest('.k-field, .k-check') && inp.closest('.k-field, .k-check').querySelector('.k-err');
                let msg = '';
                if (inp.type === 'checkbox' ? !inp.checked : !inp.value.trim()) msg = 'Please fill this in.';
                else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) msg = 'Please enter a valid email address.';
                else if (inp.type === 'tel' && inp.value.replace(/\D/g, '').length < 10) msg = 'Please enter a valid UK phone number.';
                if (err) err.textContent = msg;
                inp.setAttribute('aria-invalid', msg ? 'true' : 'false');
                if (msg && ok) { ok = false; inp.focus(); }
            });
            if (!ok) return;
            const p = P(state.location), t = T(state.treatment);
            const name = (form.querySelector('[name="firstname"]') || {}).value || 'there';
            const ref = (SITE.refPrefix || 'BK') + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
            const when = new Date(state.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) + ' at ' + fmtTime(state.time);
            const done = $('[data-confirmation]', bookRoot);
            done.innerHTML = `<div class="k-success"><div class="k-tick">${ICON.check}</div><h2 tabindex="-1">You're booked in, ${esc(name)}</h2><p>${esc(t.name)} at <strong>${esc(p.name)}</strong><br>${esc(when)}</p><p>Your reference: <span class="k-ref">${ref}</span></p><div class="k-sms k-glass"><small>Text message · just now</small>${esc(SITE.shortName || 'We')}: Hi ${esc(name)}, you're booked for ${esc(t.name)} at ${esc(p.name)}, ${esc(when)}. Reply C to cancel. Ref ${ref}</div><div class="k-btn-row" style="justify-content:center;margin-top:22px"><a class="k-btn k-btn-primary" data-ics href="#">${ICON.cal} Add to calendar</a><a class="k-btn k-btn-ghost" href="${esc(SITE.homeUrl || 'index.html')}">Back to home</a></div><p style="margin-top:16px;font-size:.85rem;opacity:.75">This is a demo, so no real appointment was made.</p></div>`;
            const ics = $('[data-ics]', done);
            ics.addEventListener('click', ev => {
                ev.preventDefault();
                const start = state.date.replace(/-/g, '') + 'T' + state.time.replace(':', '') + '00';
                const endM = toMin(state.time) + 30; const end = state.date.replace(/-/g, '') + 'T' + String(Math.floor(endM / 60)).padStart(2, '0') + String(endM % 60).padStart(2, '0') + '00';
                const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//YRB Nova demo//EN', 'BEGIN:VEVENT', 'UID:' + ref + '@demo', 'DTSTART:' + start, 'DTEND:' + end, 'SUMMARY:' + t.name + ' – ' + p.name, 'LOCATION:' + p.address, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
                const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = 'appointment.ics'; a.click();
            });
            show(steps.length - 1);
        });
        renderLocations(); renderTreatments(); renderDays(); renderSlots();
        // Skip steps that were pre-filled from the link (e.g. "Book here" on a practice card)
        let start = 0;
        if (state.location && P(state.location)) start = 1;
        if (start === 1 && state.treatment && T(state.treatment)) start = 2;
        steps.forEach((s, k) => s.classList.toggle('active', k === start));
        cur = start;
        prog.forEach((p, k) => { p.classList.toggle('done', k < start); p.classList.toggle('current', k === start); });
        refresh();
    }

    /* ---------------- Generic lead forms ---------------- */
    $$('form[data-lead]').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let ok = true;
            $$('[required]', form).forEach(inp => {
                const wrap = inp.closest('.k-field, .k-check');
                const err = wrap && wrap.querySelector('.k-err');
                let msg = '';
                if (inp.type === 'checkbox' ? !inp.checked : !inp.value.trim()) msg = 'Please fill this in.';
                else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) msg = 'Please enter a valid email address.';
                if (err) err.textContent = msg;
                inp.setAttribute('aria-invalid', msg ? 'true' : 'false');
                if (msg && ok) { ok = false; inp.focus(); }
            });
            if (!ok) return;
            const done = form.parentElement.querySelector('.k-form-success');
            form.hidden = true;
            if (done) { done.classList.add('show'); const h = done.querySelector('h2, h3'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } }
        });
    });

    /* ---------------- AI call simulator ---------------- */
    // Markup: <div data-call="scenarioId1,scenarioId2"> ... built here. Scenarios live in SITE.calls.
    $$('[data-call]').forEach(root => {
        const ids = root.dataset.call.split(',').map(s => s.trim()).filter(Boolean);
        const scen = ids.map(id => (SITE.calls || {})[id]).filter(Boolean);
        if (!scen.length) return;
        const bars = Array.from({ length: 22 }, () => '<i></i>').join('');
        root.classList.add('k-call', 'k-glass');
        root.innerHTML = `
            ${scen.length > 1 ? `<div class="k-call-tabs" role="tablist" aria-label="Example calls">${scen.map((s, i) => `<button type="button" role="tab" class="k-call-tab" aria-selected="${i === 0}" data-tab="${i}">${esc(s.tab)}</button>`).join('')}</div>` : ''}
            <div class="k-phone" aria-label="Simulated phone call">
                <div class="k-phone-top"><div><strong data-caller></strong><small data-line></small></div><span class="k-call-timer" data-timer>00:00</span></div>
                <div class="k-wave" data-wave aria-hidden="true">${bars}</div>
                <div class="k-speaking" data-speaking aria-hidden="true"></div>
                <div class="k-transcript" data-transcript role="log" aria-live="polite" aria-label="Call transcript"></div>
                <div class="k-call-controls">
                    <button type="button" class="primary" data-play>${ICON.play} <span>Play call</span></button>
                    <button type="button" data-replay>${ICON.replay} <span>Replay</span></button>
                    <button type="button" data-sound aria-pressed="false">${ICON.mute} <span>Sound off</span></button>
                </div>
            </div>
            <div class="k-call-side">
                <span class="k-call-label">Simulated example call</span>
                <h3 data-title></h3>
                <p data-summary style="color:var(--k-ink-soft);margin:0 0 6px"></p>
                <ul class="k-events" data-events aria-live="polite"><li class="k-events-empty">Press play to watch what happens during the call.</li></ul>
            </div>`;
        const el = n => $(`[data-${n}]`, root);
        const transcript = el('transcript'), events = el('events'), wave = el('wave'), speaking = el('speaking'), timer = el('timer');
        const playBtn = el('play');
        let s = scen[0], step = 0, playing = false, tId = null, secs = 0, clock = null, typingTimer = null, sound = false;
        const synth = window.speechSynthesis;
        const pickVoice = (who) => {
            if (!synth) return null;
            const vs = synth.getVoices().filter(v => /en-GB/i.test(v.lang));
            if (!vs.length) return null;
            const female = vs.find(v => /female|libby|sonia|hazel|susan|serena|kate/i.test(v.name));
            const male = vs.find(v => /male|ryan|george|daniel|thomas|arthur/i.test(v.name) && !/female/i.test(v.name));
            return who === 'ai' ? (female || vs[0]) : (male || vs[vs.length - 1]);
        };
        function setScenario(i) {
            stop(true);
            s = scen[i];
            $$('.k-call-tab', root).forEach((t, k) => t.setAttribute('aria-selected', k === i));
            el('caller').textContent = s.callerLabel || 'Incoming call';
            el('line').textContent = s.line || '';
            el('title').textContent = s.title;
            el('summary').textContent = s.summary || '';
            reset();
        }
        function reset() {
            step = 0; secs = 0; timer.textContent = '00:00';
            transcript.innerHTML = '';
            events.innerHTML = '<li class="k-events-empty">Press play to watch what happens during the call.</li>';
            wave.classList.remove('talking', 'caller'); speaking.textContent = '';
            playBtn.innerHTML = `${ICON.play} <span>Play call</span>`;
        }
        function stop(hard) {
            playing = false; clearTimeout(tId); clearInterval(clock); clearInterval(typingTimer);
            if (synth) synth.cancel();
            wave.classList.remove('talking', 'caller');
            if (!hard) playBtn.innerHTML = `${ICON.play} <span>Resume</span>`;
        }
        function addEvent(ev) {
            const empty = $('.k-events-empty', events); if (empty) empty.remove();
            const li = document.createElement('li');
            li.className = 'k-event k-glass' + (ev.urgent ? ' urgent' : '');
            li.innerHTML = `<span class="k-ev-icon">${ICON[ev.icon] || ICON.check}</span><span><strong>${esc(ev.title)}</strong>${ev.detail ? `<small>${esc(ev.detail)}</small>` : ''}</span>`;
            events.appendChild(li);
        }
        function next() {
            if (!playing) return;
            if (step >= s.lines.length) {
                playing = false; clearInterval(clock);
                wave.classList.remove('talking', 'caller'); speaking.textContent = 'Call ended';
                playBtn.innerHTML = `${ICON.replay} <span>Play again</span>`;
                return;
            }
            const ln = s.lines[step];
            if (ln.event) { addEvent(ln.event); step++; tId = setTimeout(next, reduceMotion ? 150 : 900); return; }
            const b = document.createElement('div');
            b.className = 'k-bubble ' + ln.who;
            const label = ln.who === 'ai' ? (s.aiName || 'AI receptionist') : ln.who === 'caller' ? (s.callerName || 'Caller') : '';
            b.innerHTML = (label ? `<small>${esc(label)}</small>` : '') + '<span></span>';
            transcript.appendChild(b);
            const span = b.lastChild;
            if (ln.who !== 'system') { wave.classList.add('talking'); wave.classList.toggle('caller', ln.who === 'caller'); speaking.textContent = ln.who === 'ai' ? 'AI speaking' : 'Caller speaking'; }
            else { wave.classList.remove('talking', 'caller'); speaking.textContent = ''; }
            const text = ln.text;
            const finish = () => {
                span.textContent = text; span.classList.remove('k-typing');
                transcript.scrollTop = transcript.scrollHeight;
                step++;
                const pause = ln.who === 'system' ? 700 : 650;
                tId = setTimeout(next, reduceMotion ? 200 : pause);
            };
            if (sound && synth && ln.who !== 'system') {
                span.textContent = text; transcript.scrollTop = transcript.scrollHeight;
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'en-GB'; u.rate = ln.who === 'ai' ? 1.02 : 1.05; u.pitch = ln.who === 'ai' ? 1.05 : 0.95;
                const v = pickVoice(ln.who); if (v) u.voice = v;
                u.onend = () => { if (playing) finish(); };
                u.onerror = () => { if (playing) finish(); };
                synth.speak(u);
                return;
            }
            if (reduceMotion) { finish(); return; }
            span.classList.add('k-typing');
            let i = 0;
            const speed = ln.who === 'ai' ? 22 : 26;
            typingTimer = setInterval(() => {
                i += 2; span.textContent = text.slice(0, i);
                transcript.scrollTop = transcript.scrollHeight;
                if (i >= text.length) { clearInterval(typingTimer); finish(); }
            }, speed);
        }
        function play() {
            if (playing) { stop(false); return; }
            if (step >= s.lines.length) reset();
            playing = true;
            playBtn.innerHTML = `${ICON.pause} <span>Pause</span>`;
            clock = setInterval(() => { secs++; timer.textContent = String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0'); }, 1000);
            next();
        }
        playBtn.addEventListener('click', play);
        el('replay').addEventListener('click', () => { stop(true); reset(); play(); });
        const soundBtn = el('sound');
        if (!synth) soundBtn.hidden = true;
        soundBtn.addEventListener('click', () => {
            sound = !sound;
            soundBtn.setAttribute('aria-pressed', sound);
            soundBtn.innerHTML = sound ? `${ICON.sound} <span>Sound on</span>` : `${ICON.mute} <span>Sound off</span>`;
            if (!sound && synth) synth.cancel();
        });
        $$('.k-call-tab', root).forEach(t => t.addEventListener('click', () => setScenario(+t.dataset.tab)));
        root.addEventListener('keydown', e => {
            const tabs = $$('.k-call-tab', root); const i = tabs.indexOf(document.activeElement);
            if (i < 0) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; tabs[n].focus(); setScenario(n); }
        });
        // Buttons elsewhere on the page can start a specific scenario: <button data-play-call="0">
        $$('[data-play-call]').forEach(btn => btn.addEventListener('click', () => {
            setScenario(+btn.dataset.playCall || 0);
            root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
            setTimeout(play, reduceMotion ? 0 : 500);
        }));
        setScenario(0);
    });

    /* ---------------- Sales Mode ---------------- */
    // Any element with data-sales="One-line reason this makes the client money" gets a numbered callout.
    const salesEls = $$('[data-sales]');
    if (salesEls.length) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'k-sales-toggle';
        toggle.setAttribute('aria-pressed', 'false');
        toggle.innerHTML = '<span class="k-switch" aria-hidden="true"></span><span>Sales Mode</span>';
        document.body.appendChild(toggle);
        let on = false, pins = [], panel = null, tip = null;
        const removeTip = () => { if (tip) { tip.remove(); tip = null; } $$('.k-sales-highlight').forEach(x => x.classList.remove('k-sales-highlight')); };
        const place = () => {
            pins.forEach(({ pin, el }) => {
                const r = el.getBoundingClientRect();
                const visible = r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden';
                pin.style.display = visible ? 'flex' : 'none';
                pin.style.top = (window.scrollY + r.top - 10) + 'px';
                pin.style.left = (window.scrollX + Math.min(r.right - 18, document.documentElement.clientWidth - 40)) + 'px';
            });
        };
        const showTip = (i) => {
            removeTip();
            const { el, pin } = pins[i];
            el.classList.add('k-sales-highlight');
            tip = document.createElement('div');
            tip.className = 'k-sales-tip';
            tip.setAttribute('role', 'status');
            tip.innerHTML = `<strong>Why it makes money · ${i + 1}</strong>${esc(el.dataset.sales)}`;
            document.body.appendChild(tip);
            const pr = pin.getBoundingClientRect();
            const w = Math.min(280, document.documentElement.clientWidth - 24);
            let left = window.scrollX + pr.left - w + 28; left = Math.max(window.scrollX + 12, left);
            tip.style.width = w + 'px'; tip.style.left = left + 'px'; tip.style.top = (window.scrollY + pr.bottom + 8) + 'px';
        };
        const enable = () => {
            on = true; toggle.setAttribute('aria-pressed', 'true'); store.set('k_sales', '1');
            pins = salesEls.map((el, i) => {
                const pin = document.createElement('button');
                pin.type = 'button'; pin.className = 'k-sales-pin'; pin.textContent = i + 1;
                pin.setAttribute('aria-label', `Sales note ${i + 1}: ${el.dataset.sales}`);
                pin.addEventListener('click', e => { e.stopPropagation(); showTip(i); });
                document.body.appendChild(pin);
                return { pin, el };
            });
            panel = document.createElement('div');
            panel.className = 'k-sales-panel';
            panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', 'Sales Mode notes');
            panel.innerHTML = `<h2>Why this site makes money</h2><ol>${salesEls.map((el, i) => `<li><button type="button" data-goto="${i}"><b>${i + 1}</b><span>${esc(el.dataset.sales)}</span></button></li>`).join('')}</ol><p class="k-sales-foot">Tap a number to jump to the feature. Visitors never see Sales Mode unless it's switched on.</p>`;
            document.body.appendChild(panel);
            $$('[data-goto]', panel).forEach(b => b.addEventListener('click', () => {
                const i = +b.dataset.goto;
                pins[i].el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
                setTimeout(() => { place(); showTip(i); }, reduceMotion ? 50 : 600);
            }));
            place();
        };
        const disable = () => {
            on = false; toggle.setAttribute('aria-pressed', 'false'); store.set('k_sales', '0');
            pins.forEach(p => p.pin.remove()); pins = [];
            if (panel) panel.remove(); panel = null; removeTip();
        };
        toggle.addEventListener('click', () => (on ? disable() : enable()));
        window.addEventListener('resize', () => { if (on) { place(); removeTip(); } });
        window.addEventListener('scroll', () => { if (on && !tip) place(); }, { passive: true });
        document.addEventListener('click', e => { if (tip && !e.target.closest('.k-sales-tip, .k-sales-pin, .k-sales-panel')) removeTip(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') removeTip(); });
        window.addEventListener('load', () => { if (on) place(); });
        if (store.get('k_sales') === '1') enable();
    }

    /* ---------------- Cookie consent (UK GDPR style) ---------------- */
    const cookie = $('.k-cookie');
    if (cookie) {
        const KEY = 'k_cookie_' + (SITE.id || 'demo');
        if (!store.get(KEY)) setTimeout(() => cookie.classList.add('show'), 700);
        const save = v => { store.set(KEY, v); cookie.classList.remove('show'); };
        $('[data-cookie="accept"]', cookie).addEventListener('click', () => save('all'));
        $('[data-cookie="reject"]', cookie).addEventListener('click', () => save('essential'));
        const prefs = $('.k-cookie-prefs', cookie);
        $('[data-cookie="manage"]', cookie).addEventListener('click', e => {
            if (!prefs.classList.contains('open')) { prefs.classList.add('open'); e.target.textContent = 'Save choices'; return; }
            const a = $('[name="analytics"]', prefs).checked, m = $('[name="marketing"]', prefs).checked;
            save(JSON.stringify({ analytics: a, marketing: m }));
        });
        $$('[data-open-cookies]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); cookie.classList.add('show'); }));
    }

    /* ---------------- Year ---------------- */
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
