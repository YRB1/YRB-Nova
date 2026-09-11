const { isAuthenticated } = require('../../lib/adminAuth');
const { getSupabase } = require('../../lib/supabase');

module.exports = async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const supabase = getSupabase();
    if (!supabase) {
        return res.status(500).json({ error: 'Database is not configured yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the Vercel project settings.' });
    }

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Bookings fetch error:', error);
            return res.status(500).json({ error: 'Unable to load bookings' });
        }

        return res.status(200).json({ bookings: data });
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
            const packageName = (body.package || '').trim();
            const amount = parseFloat(body.amount_gbp);

            if (!packageName || Number.isNaN(amount) || amount < 0) {
                return res.status(400).json({ error: 'Package name and a valid amount are required.' });
            }

            const { data, error } = await supabase
                .from('bookings')
                .insert({
                    package: packageName,
                    amount_gbp: amount,
                    customer_name: (body.customer_name || '').trim() || null,
                    customer_email: (body.customer_email || '').trim() || null,
                    customer_phone: (body.customer_phone || '').trim() || null,
                    project_details: (body.project_details || '').trim() || null,
                    status: body.status || 'paid',
                    stripe_session_id: null
                })
                .select()
                .single();

            if (error) {
                console.error('Manual booking insert error:', error);
                return res.status(500).json({ error: 'Unable to add booking' });
            }

            return res.status(200).json({ booking: data });
        } catch (err) {
            console.error('Manual booking insert error:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
            if (!body.id) {
                return res.status(400).json({ error: 'Missing booking id' });
            }

            const { error } = await supabase.from('bookings').delete().eq('id', body.id);

            if (error) {
                console.error('Booking delete error:', error);
                return res.status(500).json({ error: 'Unable to delete booking' });
            }

            return res.status(200).json({ ok: true });
        } catch (err) {
            console.error('Booking delete error:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
};
