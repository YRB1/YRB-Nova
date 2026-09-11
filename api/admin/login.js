const crypto = require('crypto');
const { setSessionCookie } = require('../../lib/adminAuth');
const { getSupabase } = require('../../lib/supabase');

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function safeEqual(a, b) {
    const hashA = crypto.createHash('sha256').update(String(a)).digest();
    const hashB = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(hashA, hashB);
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) return forwarded.split(',')[0].trim();
    return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
        return res.status(500).json({ error: 'Admin login is not configured yet. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the Vercel project settings.' });
    }

    const ip = getClientIp(req);
    const supabase = getSupabase();

    try {
        if (supabase) {
            const { data: record } = await supabase.from('login_attempts').select('*').eq('ip', ip).maybeSingle();
            if (record && record.locked_until && new Date(record.locked_until) > new Date()) {
                const waitMins = Math.ceil((new Date(record.locked_until) - new Date()) / 60000);
                return res.status(429).json({ error: `Too many failed attempts. Try again in ${waitMins} minute${waitMins === 1 ? '' : 's'}.` });
            }
        }

        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const username = typeof body.username === 'string' ? body.username : '';
        const password = typeof body.password === 'string' ? body.password : '';

        const usernameOk = safeEqual(username, process.env.ADMIN_USERNAME);
        const passwordOk = safeEqual(password, process.env.ADMIN_PASSWORD);

        if (!usernameOk || !passwordOk) {
            if (supabase) {
                const { data: record } = await supabase.from('login_attempts').select('*').eq('ip', ip).maybeSingle();
                const failedCount = (record ? record.failed_count : 0) + 1;
                const lockedUntil = failedCount >= MAX_ATTEMPTS
                    ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
                    : null;
                await supabase.from('login_attempts').upsert(
                    { ip, failed_count: failedCount, locked_until: lockedUntil, last_attempt: new Date().toISOString() },
                    { onConflict: 'ip' }
                );
            }
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        if (supabase) {
            await supabase.from('login_attempts').delete().eq('ip', ip);
        }

        setSessionCookie(res, Boolean(body.remember));
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Admin login error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};
