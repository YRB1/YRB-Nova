// Creates a Retell web call for the "Talk to it now" button on voicedesk.html.
// Needs RETELL_API_KEY and RETELL_AGENT_ID set in Vercel. The API key never reaches the browser.
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
    try {
        const r = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ agent_id: agent, metadata: { source: 'yrbnova.com/voicedesk' } }),
            signal: AbortSignal.timeout(10000)
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.access_token) {
            console.error('Retell create-web-call failed:', r.status, data);
            return res.status(502).json({ error: 'Couldn\'t start the call. Please try again.' });
        }
        return res.status(200).json({ accessToken: data.access_token });
    } catch (err) {
        console.error('Retell web call error:', err.message);
        return res.status(500).json({ error: 'Couldn\'t start the call. Please try again.' });
    }
};
