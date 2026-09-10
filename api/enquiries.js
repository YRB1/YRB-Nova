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
        const name = (body.name || '').trim();
        const email = (body.email || '').trim();
        const message = (body.message || '').trim();
        const budget = (body.budget || '').trim();

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
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
