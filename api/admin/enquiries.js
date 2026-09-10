const { isAuthenticated } = require('../../lib/adminAuth');
const { getSupabase } = require('../../lib/supabase');

const ALLOWED_STATUSES = ['new', 'contacted', 'closed'];

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
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Enquiries fetch error:', error);
            return res.status(500).json({ error: 'Unable to load enquiries' });
        }

        return res.status(200).json({ enquiries: data });
    }

    if (req.method === 'PATCH') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
            const { id, status, notes } = body;

            if (!id) {
                return res.status(400).json({ error: 'Missing enquiry id' });
            }

            const update = {};
            if (status !== undefined) {
                if (!ALLOWED_STATUSES.includes(status)) {
                    return res.status(400).json({ error: 'Invalid status' });
                }
                update.status = status;
            }
            if (notes !== undefined) {
                update.notes = notes;
            }

            const { data, error } = await supabase
                .from('enquiries')
                .update(update)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Enquiry update error:', error);
                return res.status(500).json({ error: 'Unable to update enquiry' });
            }

            return res.status(200).json({ enquiry: data });
        } catch (err) {
            console.error('Enquiry update error:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
};
