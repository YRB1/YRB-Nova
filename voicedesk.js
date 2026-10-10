/* YRB VoiceDesk page: live demo (Retell web call / phone) + missed-call calculator. */
(function () {
    'use strict';
    const cfg = window.VOICEDESK_CONFIG || {};
    const $ = id => document.getElementById(id);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Layer A: live demo (hidden until configured) ---------- */
    const live = $('vd-live');
    const hasPhone = !!(cfg.phone && cfg.phone.trim());
    const hasWeb = !!(cfg.webCall && cfg.webCall.enabled);
    if (live && (hasPhone || hasWeb)) {
        live.hidden = false;
        if (hasPhone) {
            const a = $('vd-phone');
            a.hidden = false;
            a.href = 'tel:' + cfg.phone.replace(/\s/g, '');
            a.textContent = 'Call our AI now: ' + cfg.phone;
        }
        if (hasWeb) {
            const start = $('vd-start'), end = $('vd-end'), orb = $('vd-orb'), status = $('vd-status');
            start.hidden = false;
            let client = null;
            const setState = s => { orb.dataset.state = s; };
            const finish = msg => { start.hidden = false; end.hidden = true; start.disabled = false; setState(''); status.textContent = msg || 'Call ended. Thanks for trying VoiceDesk!'; client = null; };
            start.addEventListener('click', async () => {
                start.disabled = true; status.textContent = 'Connecting… please allow microphone access.';
                try {
                    const mod = await import(cfg.webCall.sdkUrl);
                    const RetellWebClient = mod.RetellWebClient || (mod.default && mod.default.RetellWebClient);
                    const r = await fetch(cfg.webCall.endpoint, { method: 'POST' });
                    const d = await r.json().catch(() => ({}));
                    if (!r.ok || !d.accessToken) throw new Error(d.error || 'Could not start the call.');
                    client = new RetellWebClient();
                    client.on('call_started', () => { status.textContent = 'Connected. Say hello!'; setState('listening'); start.hidden = true; end.hidden = false; });
                    client.on('agent_start_talking', () => { setState('speaking'); status.textContent = 'VoiceDesk is speaking…'; });
                    client.on('agent_stop_talking', () => { setState('listening'); status.textContent = 'Listening…'; });
                    client.on('call_ended', () => finish());
                    client.on('error', err => { console.error('VoiceDesk call error:', err); try { client.stopCall(); } catch (_) {} finish('The call dropped. Please try again.'); });
                    await client.startCall({ accessToken: d.accessToken });
                } catch (err) {
                    console.error('VoiceDesk start error:', err);
                    finish(/permission|NotAllowed/i.test(String(err && err.name || err)) ? 'Microphone access is needed to talk to the demo.' : 'Couldn\'t start the live call. Try the example calls below.');
                }
            });
            end.addEventListener('click', () => { if (client) { try { client.stopCall(); } catch (_) {} } finish(); });
        }
    }

    /* ---------- Missed-call calculator ---------- */
    const missed = $('vd-missed'), rate = $('vd-rate'), value = $('vd-value');
    if (missed && rate && value) {
        const fmt = n => '£' + Math.round(n).toLocaleString('en-GB');
        const shown = { m: 0, y: 0 };
        let raf = null;
        const animate = (target) => {
            cancelAnimationFrame(raf);
            const from = { ...shown }, t0 = performance.now(), dur = reduce ? 0 : 600;
            const step = now => {
                const p = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
                shown.m = from.m + (target.m - from.m) * e; shown.y = from.y + (target.y - from.y) * e;
                $('vd-month').textContent = fmt(shown.m); $('vd-year').textContent = fmt(shown.y);
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        };
        const update = () => {
            const m = +missed.value, r = +rate.value / 100, v = +value.value;
            $('vd-missed-out').textContent = m;
            $('vd-rate-out').textContent = Math.round(r * 100) + '%';
            $('vd-value-out').textContent = fmt(v);
            const monthly = m * 4.33 * r * v;
            animate({ m: monthly, y: monthly * 12 });
        };
        [missed, rate, value].forEach(i => i.addEventListener('input', update));
        update();
    }
})();
