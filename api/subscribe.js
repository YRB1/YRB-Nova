const { getSupabase } = require('../lib/supabase');
const offers = require('../offers.json');

const FORMSPREE_URL = 'https://formspree.io/f/mldaypqv';

// Email-capture popup. The lead is saved to the database first (shows in the admin
// Enquiries tab); the notification email is best-effort and never blocks the visitor.
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const p = offers.popupDiscount;
    if (!p || !p.enabled) {
        return res.status(410).json({ error: 'This offer has ended.' });
    }

    let body;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    } catch (_) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    // Honeypot: real visitors never fill this hidden field
    if (body.company) return res.status(200).json({ ok: true, code: p.code });

    const email = String(body.email || '').trim().slice(0, 250);
    const page = String(body.page || '').slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const message = `Requested the ${p.label} code (${p.code}) from the website popup.` + (page ? ` Page: ${page}` : '');

    let saved = false;
    const supabase = getSupabase();
    if (supabase) {
        const { error } = await supabase.from('enquiries').insert({ name: 'Website popup lead', email, message, budget: null });
        if (error) console.error('Popup lead insert error:', error);
        else saved = true;
    } else {
        console.error('Popup lead: Supabase is not configured');
    }

    let emailed = false;
    try {
        const r = await fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ email, _subject: `New popup lead: ${email}`, message }),
            signal: AbortSignal.timeout(5000)
        });
        emailed = r.ok;
        if (!r.ok) console.error('Popup lead notification failed:', r.status);
    } catch (err) {
        console.error('Popup lead notification error:', err.message);
    }

    if (!saved && !emailed) {
        return res.status(500).json({ error: 'Something went wrong. Please try again in a moment.' });
    }
    return res.status(200).json({ ok: true, code: p.code, label: p.label });
};
