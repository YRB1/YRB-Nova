const Stripe = require('stripe');
const { getSupabase } = require('../lib/supabase');

function readRawBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

function findCustomField(customFields, key) {
    const field = (customFields || []).find(cf => cf.key === key);
    return field && field.text ? field.text.value : null;
}

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).send('Method not allowed');
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return res.status(500).send('Webhook is not configured');
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers['stripe-signature'];
    const rawBody = await readRawBody(req);

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const supabase = getSupabase();

        if (supabase) {
            const { error } = await supabase.from('bookings').upsert(
                {
                    stripe_session_id: session.id,
                    package: (session.metadata && session.metadata.package) || 'unknown',
                    amount_gbp: (session.amount_total || 0) / 100,
                    customer_email: session.customer_details ? session.customer_details.email : null,
                    customer_name: findCustomField(session.custom_fields, 'full_name'),
                    project_details: findCustomField(session.custom_fields, 'project_details'),
                    status: 'paid'
                },
                { onConflict: 'stripe_session_id' }
            );

            if (error) {
                console.error('Booking insert error:', error);
            }
        } else {
            console.error('Received checkout.session.completed but Supabase is not configured.');
        }
    }

    return res.status(200).json({ received: true });
}

handler.config = { api: { bodyParser: false } };

module.exports = handler;
