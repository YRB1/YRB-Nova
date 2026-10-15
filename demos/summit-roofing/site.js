/* Concept demo behaviour by YRB Nova. Everything runs in the browser: forms show a
   confirmation screen and send nothing. Features switch on from markup:
   [data-nav-toggle]  mobile menu
   [data-steps]       multi-step form (.step panels, [data-next]/[data-back], required fields)
   [data-ba]          before/after slider
   [data-upload]      photo upload preview (client-side only)
   [data-book]        booking flow (location, service, date/time, details)
   [data-sales]       Sales Mode callouts (toggle injected when any exist)
   [data-year]        current year */
(function () {
    'use strict';
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const cfg = window.DEMO || {};
    const locale = cfg.locale || 'en-GB';

    $$('[data-year]').forEach(e => { e.textContent = new Date().getFullYear(); });

    /* Mobile menu */
    const toggle = $('[data-nav-toggle]');
    if (toggle) {
        const menu = $('#' + toggle.getAttribute('aria-controls'));
        toggle.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', open);
            menu.classList.toggle('open', open);
        });
    }

    /* Field validation shared by forms */
    function validate(scope) {
        let ok = true, first = null;
        $$('input, select, textarea', scope).forEach(inp => {
            if (inp.closest('[hidden]')) return;
            const box = inp.closest('.field, .check, .choices');
            let err = box && $('.err', box);
            if (!err && box && box.nextElementSibling && box.nextElementSibling.classList.contains('err')) err = box.nextElementSibling;
            let msg = '';
            const isGroup = inp.type === 'radio';
            if (isGroup) {
                if (inp.required && !$$(`input[name="${inp.name}"]`, scope).some(r => r.checked)) msg = 'Please choose an option.';
            } else if (inp.required && inp.type === 'checkbox' && !inp.checked) msg = 'Please tick to continue.';
            else if (inp.required && !inp.value.trim()) msg = 'This field is required.';
            else if (inp.type === 'email' && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) msg = 'Please enter a valid email address.';
            else if (inp.type === 'tel' && inp.value && inp.value.replace(/\D/g, '').length < 10) msg = 'Please enter a valid phone number.';
            else if (inp.dataset.pattern && inp.value && !new RegExp(inp.dataset.pattern, 'i').test(inp.value.trim())) msg = inp.dataset.patternMsg || 'Please check this field.';
            if (err && (!isGroup || inp === $(`input[name="${inp.name}"]`, scope))) err.textContent = msg;
            if (!isGroup) inp.setAttribute('aria-invalid', msg ? 'true' : 'false');
            if (msg) { ok = false; first = first || inp; }
        });
        if (first) first.focus();
        return ok;
    }

    /* Multi-step forms */
    $$('[data-steps]').forEach(form => {
        const steps = $$('.step', form);
        const bar = $('.progress', form.parentElement);
        let i = 0;
        const show = n => {
            i = n;
            steps.forEach((s, k) => { s.hidden = k !== n; });
            if (bar) $$('li', bar).forEach((li, k) => { li.classList.toggle('done', k < n); li.classList.toggle('current', k === n); });
            const h = $('h2, h3', steps[n]); if (h && n) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
            form.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        form.addEventListener('click', e => {
            if (e.target.closest('[data-next]')) { e.preventDefault(); if (validate(steps[i])) show(i + 1); }
            if (e.target.closest('[data-back]')) { e.preventDefault(); show(i - 1); }
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!validate(steps[i])) return;
            const data = new FormData(form);
            const done = $('[data-done]', form.parentElement);
            const name = (data.get('name') || '').toString().split(' ')[0] || 'there';
            const ref = (form.dataset.ref || 'QT') + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
            const rows = $$('[data-summary]', form).map(el => {
                const v = el.type === 'radio' ? ($$(`input[name="${el.name}"]`, form).find(r => r.checked) || {}).value : el.value;
                return v ? `<li><span>${esc(el.dataset.summary)}</span><strong>${esc(v)}</strong></li>` : '';
            }).filter((v, k, a) => v && a.indexOf(v) === k).join('');
            form.hidden = true; if (bar) bar.hidden = true;
            done.hidden = false;
            done.innerHTML = `<div class="done-tick" aria-hidden="true">&#10003;</div><h2 tabindex="-1">Thanks, ${esc(name)}. ${esc(form.dataset.doneTitle || 'Your request is in.')}</h2><p>${esc(form.dataset.doneText || 'We\'ll be in touch shortly.')}</p>${rows ? `<ul class="done-summary">${rows}</ul>` : ''}<p class="done-ref">Reference <strong>${ref}</strong></p><p class="done-note">This is a concept demo, so nothing was sent.</p>`;
            $('h2', done).focus();
        });
        // Prefill from links like quote.html?type=extensions
        const pre = new URLSearchParams(location.search).get('type');
        const preInput = pre && $(`input[data-key="${CSS.escape(pre)}"]`, form);
        if (preInput) { preInput.checked = true; show(1); } else show(0);
        // Option cards advance on a tap or click (not while arrowing through them with a keyboard)
        $$('.choices[data-auto] label', form).forEach(l => l.addEventListener('pointerup', () => setTimeout(() => { if ($('input', l).checked && validate(steps[i])) show(i + 1); }, 200)));
    });

    /* Single-step forms */
    $$('form[data-simple]').forEach(form => form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validate(form)) return;
        const done = $('[data-done]', form.parentElement);
        form.hidden = true; done.hidden = false;
        done.innerHTML = `<div class="done-tick" aria-hidden="true">&#10003;</div><h2 tabindex="-1">${esc(form.dataset.doneTitle || 'Thank you')}</h2><p>${esc(form.dataset.doneText || 'We\'ll be in touch soon.')}</p><p class="done-note">This is a concept demo, so nothing was sent.</p>`;
        $('h2', done).focus();
    }));

    /* Before/after sliders */
    $$('[data-ba]').forEach(box => {
        const range = $('input[type="range"]', box);
        const set = v => box.style.setProperty('--pos', v + '%');
        range.addEventListener('input', () => set(range.value));
        set(range.value);
    });

    /* Photo upload preview (files never leave the browser) */
    $$('[data-upload]').forEach(box => {
        const input = $('input[type="file"]', box), list = $('.thumbs', box);
        input.addEventListener('change', () => {
            list.innerHTML = '';
            Array.from(input.files).slice(0, 6).forEach(f => {
                if (!/^image\//.test(f.type)) return;
                const url = URL.createObjectURL(f);
                const li = document.createElement('li');
                li.innerHTML = `<img src="${url}" alt="Preview of ${esc(f.name)}">`;
                list.appendChild(li);
            });
            const n = input.files.length;
            $('.upload-count', box).textContent = n ? `${n} photo${n > 1 ? 's' : ''} added` : '';
        });
    });

    /* Booking flow */
    const book = $('[data-book]');
    if (book && cfg.locations) {
        const state = {};
        const steps = $$('.bk-step', book);
        const bar = $$('.progress li', book.parentElement);
        let i = 0;
        const fmtTime = t => { const [h, m] = t.split(':').map(Number); return new Date(2000, 0, 1, h, m).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' }); };
        const show = n => { i = n; steps.forEach((s, k) => { s.hidden = k !== n; }); bar.forEach((li, k) => { li.classList.toggle('done', k < n); li.classList.toggle('current', k === n); }); const h = $('h2', steps[n]); if (h && n) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } };
        const opt = (group, value, html) => `<button type="button" class="opt" data-group="${group}" data-value="${esc(value)}" aria-pressed="false">${html}</button>`;
        $('[data-list="location"]', book).innerHTML = cfg.locations.map(l => opt('location', l.id, `<strong>${esc(l.name)}</strong><small>${esc(l.address)}</small>`)).join('');
        $('[data-list="service"]', book).innerHTML = cfg.services.map(s => opt('service', s.id, `<strong>${esc(s.name)}</strong><small>${esc(s.duration)} · from ${esc(s.from)}</small>`)).join('');
        const days = [];
        for (let d = 1; days.length < 10; d++) { const x = new Date(); x.setDate(x.getDate() + d); if (x.getDay() !== 0) days.push(x); }
        $('[data-list="date"]', book).innerHTML = days.map(x => opt('date', `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`, `<small>${x.toLocaleDateString(locale, { weekday: 'short' })}</small><strong>${x.getDate()}</strong><small>${x.toLocaleDateString(locale, { month: 'short' })}</small>`)).join('');
        const renderTimes = () => {
            const times = ['09:00', '09:45', '10:30', '11:15', '12:00', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00'];
            const seed = (state.date || '').split('-').reduce((a, b) => a + +b, 0);
            $('[data-list="time"]', book).innerHTML = times.map((t, k) => (k * 7 + seed) % 4 === 0 ? `<button type="button" class="opt" disabled aria-label="${fmtTime(t)} unavailable">${fmtTime(t)}</button>` : opt('time', t, fmtTime(t))).join('');
        };
        book.addEventListener('click', e => {
            const b = e.target.closest('.opt[data-group]');
            if (b && !b.disabled) {
                const g = b.dataset.group;
                $$(`.opt[data-group="${g}"]`, book).forEach(x => x.setAttribute('aria-pressed', x === b));
                state[g] = b.dataset.value;
                if (g === 'date') { delete state.time; renderTimes(); }
                const step = b.closest('.bk-step');
                const need = (step.dataset.need || '').split(',');
                $('[data-next]', step).disabled = !need.every(k => state[k]);
            }
            if (e.target.closest('[data-next]')) show(i + 1);
            if (e.target.closest('[data-back]')) show(i - 1);
        });
        const params = new URLSearchParams(location.search);
        ['location', 'service'].forEach(k => { const v = params.get(k); const b = v && $(`.opt[data-group="${k}"][data-value="${CSS.escape(v)}"]`, book); if (b) b.click(); });
        const form = $('form', book);
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!validate(form)) return;
            const L = cfg.locations.find(l => l.id === state.location), S = cfg.services.find(s => s.id === state.service);
            const [y, m, d] = state.date.split('-').map(Number);
            const when = new Date(y, m - 1, d).toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' }) + ' at ' + fmtTime(state.time);
            const ref = (cfg.refPrefix || 'BK') + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
            const name = (new FormData(form).get('name') || '').toString().split(' ')[0];
            const done = $('[data-done]', book);
            done.innerHTML = `<div class="done-tick" aria-hidden="true">&#10003;</div><h2 tabindex="-1">You're booked, ${esc(name)}</h2><p><strong>${esc(S.name)}</strong> at ${esc(L.name)}<br>${esc(when)}</p><p class="done-ref">Confirmation <strong>${ref}</strong></p><p>${esc(cfg.bookDoneText || 'A confirmation text is on its way.')}</p><p class="done-note">This is a concept demo, so nothing was sent.</p>`;
            show(steps.length - 1);
            $('h2', done).focus();
        });
        // Back from the details step needs the next button re-enabled where a choice exists
        show(state.location && state.service ? 2 : 0);
    }

    /* Sales Mode: numbered callouts explaining why each feature earns its place */
    const salesEls = $$('[data-sales]');
    if (salesEls.length) {
        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'sales-toggle'; btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = '<span class="sw" aria-hidden="true"></span>Sales Mode';
        document.body.appendChild(btn);
        let on = false;
        const render = () => {
            $$('.sales-pin, .sales-note').forEach(x => x.remove());
            if (!on) return;
            salesEls.forEach((el, k) => {
                if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return;
                const pin = document.createElement('span');
                pin.className = 'sales-pin'; pin.textContent = k + 1;
                const note = document.createElement('span');
                note.className = 'sales-note'; note.innerHTML = `<strong>${k + 1}</strong> ${esc(el.dataset.sales)}`;
                if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
                el.appendChild(pin); el.appendChild(note);
            });
        };
        btn.addEventListener('click', () => { on = !on; btn.setAttribute('aria-pressed', on); document.body.classList.toggle('sales-on', on); render(); });
    }
})();
