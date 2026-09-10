const crypto = require('crypto');

const COOKIE_NAME = 'yrb_admin_session';
const SESSION_HOURS = 12;

function sign(value) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createSessionToken() {
    const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
    const payload = String(expires);
    return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token) {
    if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;

    const expected = sign(payload);
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expected);

    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

    return Number(payload) > Date.now();
}

function parseCookies(req) {
    const header = req.headers.cookie;
    const cookies = {};
    if (!header) return cookies;

    header.split(';').forEach(part => {
        const idx = part.indexOf('=');
        if (idx === -1) return;
        const key = part.slice(0, idx).trim();
        const value = part.slice(idx + 1).trim();
        cookies[key] = decodeURIComponent(value);
    });

    return cookies;
}

function isAuthenticated(req) {
    const cookies = parseCookies(req);
    return verifySessionToken(cookies[COOKIE_NAME]);
}

function setSessionCookie(res) {
    const token = createSessionToken();
    const maxAge = SESSION_HOURS * 60 * 60;
    res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`
    );
}

function clearSessionCookie(res) {
    res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
    );
}

module.exports = { isAuthenticated, setSessionCookie, clearSessionCookie };
