const { getSupabase } = require('../lib/supabase');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const supabase = getSupabase();
    if (!supabase) {
        return res.status(500).json({ error: 'Database is not configured yet.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const name = (body.name || '').trim().slice(0, 250);
        const email = (body.email || '').trim().slice(0, 250);
        const message = (body.message || '').trim().slice(0, 4000);
        const budget = (body.budget || '').trim().slice(0, 120);

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        const { error } = await supabase
            .from('enquiries')
            .insert({ name, email, message, budget: budget || null });

        if (error) {
            console.error('Enquiry insert error:', error);
            return res.status(500).json({ error: 'Unable to save enquiry' });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Enquiry insert error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};
