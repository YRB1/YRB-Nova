const Stripe = require('stripe');

const PACKAGES = {
    basic: { name: 'Basic Website Package', amount: 35000 },
    standard: { name: 'Standard Website Package', amount: 60000 },
    premium: { name: 'Premium Website Package', amount: 80000 }
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'Payments are not configured yet. Set STRIPE_SECRET_KEY in the Vercel project settings.' });
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const selected = PACKAGES[body.pkg];

        if (!selected) {
            return res.status(400).json({ error: 'Invalid package selected' });
        }

        const origin = req.headers.origin || `https://${req.headers.host}`;

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            metadata: { package: body.pkg },
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: { name: `YRB Nova ${selected.name}` },
                        unit_amount: selected.amount
                    },
                    quantity: 1
                }
            ],
            custom_fields: [
                {
                    key: 'full_name',
                    label: { type: 'custom', custom: 'Your name' },
                    type: 'text',
                    optional: false,
                    text: { minimum_length: 1, maximum_length: 120 }
                },
                {
                    key: 'project_details',
                    label: { type: 'custom', custom: 'Tell us about your project' },
                    type: 'text',
                    optional: true,
                    text: { minimum_length: 1, maximum_length: 255 }
                }
            ],
            success_url: `${origin}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment-cancelled.html`
        });

        return res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('Stripe checkout session error:', err);
        return res.status(500).json({ error: 'Unable to start checkout. Please try again or contact us directly.' });
    }
};
