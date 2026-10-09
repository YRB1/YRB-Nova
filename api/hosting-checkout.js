const Stripe = require('stripe');

// Optional hosting & support add-on, billed automatically by Stripe as a subscription.
const PLANS = {
    monthly: { label: 'Hosting & support (monthly)', amount: 1000, interval: 'month' },
    yearly: { label: 'Hosting & support (yearly)', amount: 10000, interval: 'year' }
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'Payments are not configured yet.' });
    }

    let body;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    } catch (_) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const plan = PLANS[body.plan];
    if (!plan) return res.status(400).json({ error: 'Please choose monthly or yearly.' });

    const website = String(body.website || '').trim().slice(0, 200);
    const origin = `https://${req.headers.host || 'yrbnova.com'}`;

    try {
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: 'gbp',
                    unit_amount: plan.amount,
                    recurring: { interval: plan.interval },
                    product_data: { name: `YRB Nova ${plan.label}` }
                }
            }],
            custom_fields: [
                { key: 'full_name', label: { type: 'custom', custom: 'Full name' }, type: 'text' },
                { key: 'project_details', label: { type: 'custom', custom: 'Your website address' }, type: 'text', optional: true }
            ],
            phone_number_collection: { enabled: true },
            metadata: { package: `hosting-${body.plan}`, website },
            subscription_data: { metadata: { package: `hosting-${body.plan}`, website } },
            success_url: `${origin}/payment-success.html?hosting=1`,
            cancel_url: `${origin}/services.html#hosting`
        });
        return res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('Hosting checkout error:', err);
        return res.status(500).json({ error: 'Unable to start checkout. Please try again or contact us directly.' });
    }
};
