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
        return res.status(500).json({ error: 'Payments are not configured yet.' });
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const selected = PACKAGES[body.pkg];

        if (!selected) {
            return res.status(400).json({ error: 'Invalid package selected' });
        }

        const name = (body.name || '').trim();
        const email = (body.email || '').trim();
        const phone = (body.phone || '').trim();
        const details = (body.details || '').trim();

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: selected.amount,
            currency: 'gbp',
            receipt_email: email,
            description: `YRB Nova - ${selected.name}`,
            automatic_payment_methods: { enabled: true },
            metadata: {
                package: body.pkg,
                package_name: selected.name,
                customer_name: name.slice(0, 250),
                customer_phone: phone.slice(0, 60),
                project_details: details.slice(0, 480)
            }
        });

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            amount: selected.amount,
            packageName: selected.name
        });
    } catch (err) {
        console.error('PaymentIntent creation error:', err);
        return res.status(500).json({ error: 'Unable to start checkout. Please try again or contact us directly.' });
    }
};
