// Creates a Retell web call for the "Talk to it now" button on voicedesk.html.
// Needs RETELL_API_KEY and RETELL_AGENT_ID set in Vercel. The API key never reaches the browser.

// Best-effort cap so one visitor can't burn through Retell minutes. Counts live per
// server instance, so it's a speed bump rather than a hard limit.
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function overLimit(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
    if (recent.length >= LIMIT) { hits.set(ip, recent); return true; }
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return false;
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const key = process.env.RETELL_API_KEY;
    const agent = process.env.RETELL_AGENT_ID;
    if (!key || !agent) {
        return res.status(503).json({ error: 'The live demo isn\'t switched on yet.' });
    }
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (overLimit(ip)) {
        return res.status(429).json({ error: 'You\'ve tried the live demo a few times already. Book a call and we\'ll show you more.' });
    }
    try {
        const r = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: { Authorization: `Bearer ${key.trim()}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ agent_id: agent.trim(), metadata: { source: 'yrbnova.com/voicedesk' } }),
            signal: AbortSignal.timeout(10000)
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.access_token) {
            console.error('Retell create-web-call failed:', r.status, data);
            // Retell's status code helps diagnose setup problems (401 key, 404 agent) and reveals nothing secret
            return res.status(502).json({ error: 'Couldn\'t start the call. Please try again.', code: r.status });
        }
        return res.status(200).json({ accessToken: data.access_token });
    } catch (err) {
        console.error('Retell web call error:', err.message);
        return res.status(500).json({ error: 'Couldn\'t start the call. Please try again.' });
    }
};
