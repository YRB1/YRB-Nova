// Server-side price calculation. This is what the customer is actually charged,
// so every discount advertised on the site must be applied here.
const offers = require('../offers.json');

const PACKAGES = {
    basic: { name: 'Basic Website Package', amount: 35000 },
    standard: { name: 'Standard Website Package', amount: 60000 },
    premium: { name: 'Premium Website Package', amount: 80000 }
};

// `seasonal` can be one offer or a list. If several are live at once, the biggest saving wins
// (e.g. Black Friday 30% beats Christmas 20%, then Christmas comes back when Black Friday ends).
function isLive(s, now) {
    if (!s || !s.enabled) return false;
    const start = s.startsAt ? new Date(s.startsAt) : null;
    const end = s.endsAt ? new Date(s.endsAt) : null;
    if (!end || isNaN(end)) return false;
    if (start && now < start) return false;
    return now < end;
}

function offerStrength(s) {
    return s.amountOffPence ? s.amountOffPence : Math.round(80000 * (s.percentOff || 0) / 100);
}

function seasonalActive(now = new Date()) {
    const live = [].concat(offers.seasonal || []).filter(s => isLive(s, now));
    return live.sort((a, b) => offerStrength(b) - offerStrength(a))[0] || null;
}

function discountFor(offer, listPence) {
    if (offer.amountOffPence) return Math.min(offer.amountOffPence, listPence);
    if (offer.percentOff) return Math.round(listPence * offer.percentOff / 100);
    return 0;
}

// Returns { pkg, listPence, discountPence, amount, discount: { type, label, code? } | null }
// Discounts never stack: the single biggest saving wins.
function priceFor(pkgKey, code, now = new Date()) {
    const pkg = PACKAGES[pkgKey];
    if (!pkg) return null;

    const candidates = [];
    const p = offers.popupDiscount;
    if (p && p.enabled && code && String(code).trim().toUpperCase() === String(p.code).toUpperCase()) {
        candidates.push({ type: 'code', label: p.label, code: p.code, pence: discountFor(p, pkg.amount) });
    }
    const s = seasonalActive(now);
    if (s) {
        candidates.push({ type: 'seasonal', label: s.label, id: s.id, pence: discountFor(s, pkg.amount) });
    }

    const best = candidates.sort((a, b) => b.pence - a.pence)[0] || null;
    const discountPence = best ? best.pence : 0;

    return {
        pkg,
        listPence: pkg.amount,
        discountPence,
        amount: pkg.amount - discountPence,
        discount: best ? { type: best.type, label: best.label, code: best.code || null, id: best.id || null } : null
    };
}

// True if the code is a real, live discount code (even if a bigger offer ends up winning)
function isValidCode(code) {
    const p = offers.popupDiscount;
    return !!(p && p.enabled && code && String(code).trim().toUpperCase() === String(p.code).toUpperCase());
}

module.exports = { PACKAGES, priceFor, seasonalActive, isValidCode };
