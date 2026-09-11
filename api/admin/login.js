const crypto = require('crypto');
const { setSessionCookie } = require('../../lib/adminAuth');

function safeEqual(a, b) {
    const hashA = crypto.createHash('sha256').update(String(a)).digest();
    const hashB = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(hashA, hashB);
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
        return res.status(500).json({ error: 'Admin login is not configured yet. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the Vercel project settings.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const username = typeof body.username === 'string' ? body.username : '';
        const password = typeof body.password === 'string' ? body.password : '';

        const usernameOk = safeEqual(username, process.env.ADMIN_USERNAME);
        const passwordOk = safeEqual(password, process.env.ADMIN_PASSWORD);

        if (!usernameOk || !passwordOk) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        setSessionCookie(res, Boolean(body.remember));
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Admin login error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};
