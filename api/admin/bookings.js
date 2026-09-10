const { isAuthenticated } = require('../../lib/adminAuth');
const { getSupabase } = require('../../lib/supabase');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!isAuthenticated(req)) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const supabase = getSupabase();
    if (!supabase) {
        return res.status(500).json({ error: 'Database is not configured yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the Vercel project settings.' });
    }

    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Bookings fetch error:', error);
        return res.status(500).json({ error: 'Unable to load bookings' });
    }

    return res.status(200).json({ bookings: data });
};
