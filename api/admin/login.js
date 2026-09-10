const { setSessionCookie } = require('../../lib/adminAuth');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
        return res.status(500).json({ error: 'Admin login is not configured yet. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the Vercel project settings.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

        if (typeof body.password !== 'string' || body.password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        setSessionCookie(res, Boolean(body.remember));
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Admin login error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};
