/* Turns any grid of review cards into a swipeable carousel (YRB Nova demo kit).
   Drop-in: <script src="../_kit/review-carousel.js" defer></script>
   Finds parents of .review, .transform-card or .testimonial-card with 2+ cards. */
(function () {
    'use strict';
    const CARD = '.review, .transform-card, .testimonial-card';
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parents = new Set();
    document.querySelectorAll(CARD).forEach(c => { if (c.parentElement && c.parentElement.querySelectorAll(':scope > ' + CARD.split(', ').join(', :scope > ')).length >= 2) parents.add(c.parentElement); });
    if (!parents.size) return;

    const css = document.createElement('style');
    css.textContent = `
.yn-rc { position: relative; }
.yn-rc-track { display: flex !important; grid-template-columns: none !important; gap: 18px !important; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 6px 2px 16px !important; scrollbar-width: none; }
.yn-rc-track::-webkit-scrollbar { display: none; }
.yn-rc-track > * { flex: 0 0 86%; scroll-snap-align: start; margin: 0 !important; }
@media (min-width: 720px) { .yn-rc-track > * { flex-basis: calc(50% - 9px); } }
@media (min-width: 1000px) { .yn-rc-track > * { flex-basis: calc(33.333% - 12px); } }
.yn-rc-controls { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 10px; }
.yn-rc-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; opacity: 0.8; }
.yn-rc-btn:hover, .yn-rc-btn:focus-visible { opacity: 1; }
.yn-rc-btn svg { width: 18px; height: 18px; }
.yn-rc-dots { display: flex; gap: 8px; }
.yn-rc-dots button { width: 9px; height: 9px; padding: 0; border-radius: 50%; border: 0; background: currentColor; opacity: 0.3; cursor: pointer; transition: width .25s ease, opacity .25s ease; }
.yn-rc-dots button[aria-current="true"] { width: 24px; border-radius: 6px; opacity: 0.9; }
.yn-rc :focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }`;
    document.head.appendChild(css);

    const arrow = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

    parents.forEach(track => {
        const items = Array.from(track.children);
        const wrap = document.createElement('div');
        wrap.className = 'yn-rc';
        wrap.setAttribute('role', 'region');
        wrap.setAttribute('aria-roledescription', 'carousel');
        wrap.setAttribute('aria-label', 'Reviews');
        track.parentNode.insertBefore(wrap, track);
        wrap.appendChild(track);
        track.classList.add('yn-rc-track');
        track.setAttribute('tabindex', '0');
        items.forEach((it, i) => { it.setAttribute('role', 'group'); it.setAttribute('aria-roledescription', 'slide'); it.setAttribute('aria-label', `${i + 1} of ${items.length}`); });
        const controls = document.createElement('div');
        controls.className = 'yn-rc-controls';
        controls.innerHTML = `<button type="button" class="yn-rc-btn" aria-label="Previous review">${arrow('m15 18-6-6 6-6')}</button><div class="yn-rc-dots"></div><button type="button" class="yn-rc-btn" aria-label="Next review">${arrow('m9 18 6-6-6-6')}</button>`;
        wrap.appendChild(controls);
        const [prev, dots, next] = controls.children;
        const perView = () => Math.max(1, Math.round(track.clientWidth / (items[0].getBoundingClientRect().width + 18)));
        const pages = () => Math.max(1, items.length - perView() + 1);
        let idx = 0, auto = null;
        const render = () => {
            const n = pages();
            if (dots.children.length !== n) {
                dots.innerHTML = '';
                for (let i = 0; i < n; i++) { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Go to review ${i + 1}`); b.addEventListener('click', () => { go(i); stop(); }); dots.appendChild(b); }
            }
            Array.from(dots.children).forEach((b, i) => b.setAttribute('aria-current', i === idx ? 'true' : 'false'));
            controls.style.display = n > 1 ? '' : 'none';
        };
        const go = i => { idx = (i + pages()) % pages(); track.scrollTo({ left: items[idx].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); render(); };
        const stop = () => { clearInterval(auto); auto = null; };
        const start = () => { if (!reduce && !auto && pages() > 1) auto = setInterval(() => go(idx + 1), 6500); };
        prev.addEventListener('click', () => { go(idx - 1); stop(); });
        next.addEventListener('click', () => { go(idx + 1); stop(); });
        let t;
        track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => { let best = 0, bd = Infinity; items.forEach((it, i) => { const d = Math.abs(it.offsetLeft - track.offsetLeft - track.scrollLeft); if (d < bd) { bd = d; best = i; } }); idx = Math.min(best, pages() - 1); render(); }, 90); }, { passive: true });
        wrap.addEventListener('mouseenter', stop); wrap.addEventListener('mouseleave', start);
        wrap.addEventListener('focusin', stop); wrap.addEventListener('touchstart', stop, { passive: true });
        track.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { go(idx - 1); stop(); } if (e.key === 'ArrowRight') { go(idx + 1); stop(); } });
        window.addEventListener('resize', render);
        render(); start();
    });
})();
