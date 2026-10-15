/* Halden Physio — fictional 4-clinic physiotherapy group in the East Midlands (concept demo by YRB Nova).
   Phone numbers use Ofcom's reserved drama ranges (01632 960xxx, 07700 900xxx), so they never reach a real business.
   No regulator or trade-body claims: this is a fictional brand. */
const wk = (o, c, sat) => ({ 0: null, 1: [o, c], 2: [o, c], 3: [o, c], 4: [o, c], 5: [o, '18:00'], 6: sat || ['08:00', '13:00'] });

module.exports = {
    id: 'halden-physio',
    name: 'Halden Physio',
    shortName: 'Halden',
    region: 'East Midlands',
    refPrefix: 'HP',
    schemaType: 'MedicalClinic',
    phone: '01632 960100',
    email: 'hello@haldenphysio.example',
    themeColor: '#0E3B5C',
    demoBanner: true,
    demoMetaPrefix: 'Concept demo website for a physiotherapy group, built by YRB Nova.',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap',
    favicon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0E3B5C"/><path d="M18 46V18M46 46V18M18 32h28" stroke="#B9F06A" stroke-width="6" stroke-linecap="round"/></svg>',
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#0E3B5C"/><path d="M12 29V11M28 29V11M12 20h16" stroke="#B9F06A" stroke-width="4" stroke-linecap="round"/></svg>',
    logoText: 'Halden<span class="logo-sub">Physio</span>',
    ogImage: '1571019614242-c5c5dee9f50b',
    heroImg: '1571019614242-c5c5dee9f50b',
    heroAlt: 'A physiotherapist supporting a client through a strengthening exercise',
    heroFloat1Pos: 'left:14px;bottom:18px;',
    heroFloat2Pos: 'right:14px;top:18px;',
    urgentPhone: '01632 960400',
    urgentTreatment: 'sameday',
    glows: ['width:460px;height:460px;background:#B9F06A;top:-200px;right:-160px', 'width:420px;height:420px;background:#5FB3E0;bottom:-200px;left:-160px'],

    urgent: {
        label: 'Same-day appointments',
        html: 'In pain right now? Same-day appointments at all 4 clinics. <a href="tel:01632960400">Call 01632 960400</a> or <a href="book.html?treatment=sameday">book online</a>'
    },

    practices: [
        { id: 'leicester', name: 'Halden Leicester', town: 'Leicester', street: '12 Oriel Court', postcode: 'LE1', address: '12 Oriel Court, Leicester LE1', phone: '01632 960101', lat: 52.6340, lng: -1.1310, hours: wk('07:30', '20:00'), page: 'location-leicester.html', tags: ['Flagship', 'Rehab gym'] },
        { id: 'loughborough', name: 'Halden Loughborough', town: 'Loughborough', street: '3 Ashby Lane Court', postcode: 'LE11', address: '3 Ashby Lane Court, Loughborough LE11', phone: '01632 960102', lat: 52.7720, lng: -1.2060, hours: wk('07:30', '20:00'), tags: ['Sports injuries'] },
        { id: 'nottingham', name: 'Halden Nottingham', town: 'Nottingham', street: '21 Lacemaker Row', postcode: 'NG1', address: '21 Lacemaker Row, Nottingham NG1', phone: '01632 960103', lat: 52.9520, lng: -1.1480, hours: wk('07:30', '20:00') },
        { id: 'derby', name: 'Halden Derby', town: 'Derby', street: '8 Bridgegate Yard', postcode: 'DE1', address: '8 Bridgegate Yard, Derby DE1', phone: '01632 960104', lat: 52.9250, lng: -1.4780, hours: wk('08:00', '19:00') }
    ],

    treatments: [
        {
            id: 'assessment', name: 'Physio assessment', page: 'treatment-physio-assessment.html', from: '£55', fromNum: 55, duration: '45 mins',
            img: '1631217868264-e5b90bb7e133', imgAlt: 'A physiotherapist talking through a treatment plan with a patient', titleTail: 'Get a clear diagnosis and plan',
            short: 'A full assessment, a clear diagnosis and your first treatment, all in one appointment.',
            meta: 'Book a physiotherapy assessment from £55 at Halden Physio in Leicester, Loughborough, Nottingham and Derby. Diagnosis, treatment and a home plan in one visit.',
            headline: 'Find out what\'s wrong, and what to do about it',
            intro: 'Your first appointment is all about answers. We listen, assess how you move, explain what\'s going on in plain English and start treatment the same day.',
            what: 'A 45-minute appointment with a chartered physiotherapist. We take your history, test movement, strength and joints, give you a clear diagnosis and start hands-on treatment, then send you home with a simple exercise plan.',
            who: ['Anyone with a new or ongoing ache, pain or injury', 'People who\'ve been told to "rest it" and it hasn\'t helped', 'Anyone who wants a proper diagnosis before spending more'],
            steps: [['Your story', 'What happened, what hurts and what you want to get back to.'], ['Movement tests', 'Strength, range and joint tests to find the cause, not just the pain.'], ['Diagnosis & first treatment', 'A clear explanation, then hands-on treatment straight away.'], ['Your home plan', 'Two or three exercises sent to your phone, with videos.']],
            prices: [['Initial assessment', '45 mins, includes treatment', '£55'], ['Follow-up appointment', '30 mins', '£45'], ['Video assessment', '30 mins, online', '£40']],
            faqs: [['Do I need a GP referral?', 'No. You can book directly. If we think you need a scan or a GP appointment, we\'ll tell you and write a letter.'], ['What should I wear?', 'Something comfortable you can move in. Shorts for knee or ankle problems, a vest top for shoulders.'], ['Can I use my health insurance?', 'Yes. We work with most major insurers. Bring your authorisation number and we\'ll bill them directly.'], ['How many sessions will I need?', 'Most people need three to five. We\'ll give you an honest estimate at your first visit.']],
            cta: 'Assessments available today at all 4 clinics.'
        },
        {
            id: 'massage', name: 'Sports massage', page: 'treatment-sports-massage.html', from: '£45', fromNum: 45, duration: '30 mins',
            img: '1519823551278-64ac92734fb1', imgAlt: 'A therapist giving a deep tissue massage to a client\'s back', titleTail: 'Recover faster, train harder',
            short: 'Deep tissue work to ease tight muscles, speed up recovery and keep you training.',
            meta: 'Sports massage from £45 at Halden Physio. Deep tissue massage for runners, gym-goers and anyone with tight, sore muscles. Leicester, Loughborough, Nottingham and Derby.',
            headline: 'Loosen up. Recover properly.',
            intro: 'Whether you\'re training for a marathon or just sitting at a desk all day, a good sports massage takes the tension out and gets you moving freely again.',
            what: 'A firm, focused massage from a qualified sports massage therapist, targeting the muscles that are tight or overworked. We can combine it with stretching and simple advice to stop the tightness coming back.',
            who: ['Runners, cyclists and gym-goers in training', 'Anyone with tight shoulders, neck or back from desk work', 'People recovering after an event or a hard block of training'],
            steps: [['Quick check-in', 'Where it\'s tight, what you\'ve been doing, any injuries.'], ['Targeted massage', 'Deep tissue work focused on the areas that need it.'], ['Stretch & release', 'Assisted stretching to lock in the gains.'], ['Aftercare tips', 'Simple stretches to keep you loose between sessions.']],
            prices: [['Sports massage', '30 mins', '£45'], ['Sports massage', '60 mins', '£65'], ['Block of 5', '60 mins each', '£295']],
            faqs: [['Will it hurt?', 'It\'s firm, but it should never be more than you\'re comfortable with. Tell your therapist and they\'ll adjust.'], ['How often should I have one?', 'In heavy training, every two to four weeks works well. Otherwise, whenever you feel tight.'], ['Should I have one before a race?', 'A light massage two to three days before is ideal. Save deep work for after the event.'], ['Is it physio?', 'It\'s complementary. If your therapist spots an injury, they\'ll suggest a physio assessment.']],
            cta: 'Book a sports massage at your nearest Halden clinic.'
        },
        {
            id: 'backneck', name: 'Back & neck pain', page: 'treatment-back-neck-pain.html', from: '£55', fromNum: 55, duration: '45 mins',
            img: '1588776814546-1ffcf47267a5', imgAlt: 'A clinician reviewing a spine scan on a light box', titleTail: 'Physiotherapy for back and neck pain',
            short: 'Proven, hands-on treatment and exercise to ease back and neck pain and stop it coming back.',
            meta: 'Physiotherapy for back and neck pain from £55 at Halden Physio. Same-day appointments in Leicester, Loughborough, Nottingham and Derby.',
            headline: 'Back pain is common. Living with it isn\'t necessary.',
            intro: 'Most back and neck pain gets better with the right treatment and the right exercise. We\'ll find out what\'s driving yours and get you moving with confidence again.',
            what: 'An assessment to understand your pain, followed by hands-on treatment, a tailored exercise plan and practical advice for work, sleep and sport. We\'ll also check for anything that needs a doctor.',
            who: ['New or recurring lower back pain', 'Stiff, sore neck or headaches from posture', 'Sciatica or pain travelling into the arm or leg', 'Anyone worried about their back who wants reassurance'],
            steps: [['Assessment', 'History, movement tests and screening for anything serious.'], ['Hands-on treatment', 'Joint mobilisation and soft-tissue work to ease pain.'], ['Exercise plan', 'A short, achievable plan to rebuild strength.'], ['Stay well', 'Advice for desk set-up, lifting and sleep to stop it returning.']],
            prices: [['Initial assessment', '45 mins, includes treatment', '£55'], ['Follow-up appointment', '30 mins', '£45'], ['Same-day pain appointment', 'Booked by 12pm', '£55']],
            faqs: [['Should I rest my back?', 'Gentle movement usually helps more than bed rest. We\'ll show you what\'s safe to do.'], ['Do I need a scan?', 'Most back pain doesn\'t need one. If we think you do, we\'ll explain why and arrange the next step.'], ['When should I see a doctor instead?', 'If you have numbness around the groin, problems controlling your bladder or bowels, or weakness in both legs, call 999 or go to A&E straight away.'], ['Can you help with sciatica?', 'Yes. Most sciatica improves with the right exercise and treatment over a few weeks.']],
            cta: 'Same-day back pain appointments, booked by 12pm.'
        },
        {
            id: 'rehab', name: 'Post-surgery rehab', page: 'treatment-post-surgery-rehab.html', from: '£60', fromNum: 60, duration: '45 mins',
            img: '1597452485669-2c7bb5fef90d', imgAlt: 'A man doing a supported strength exercise in a rehab gym', titleTail: 'Rehab after knee, hip and shoulder surgery',
            short: 'Structured rehab after surgery, from the first wobbly steps to full strength.',
            meta: 'Post-surgery rehabilitation from £60 at Halden Physio: knee, hip, shoulder and ACL rehab with a rehab gym in Leicester. Clinics in Loughborough, Nottingham and Derby.',
            headline: 'Surgery is step one. We\'ll take it from here.',
            intro: 'The work you do after an operation makes all the difference. We\'ll guide you through every stage with a clear plan, milestones and a physio who knows your surgeon\'s protocol.',
            what: 'A rehabilitation programme built around your operation and your goals. We work from your surgeon\'s protocol, progress you through clear stages and use our rehab gym to rebuild strength, balance and confidence.',
            who: ['Knee and hip replacements', 'ACL reconstruction and knee arthroscopy', 'Shoulder surgery, including rotator cuff repair', 'Fractures once you\'re out of a cast or boot'],
            steps: [['Post-op assessment', 'We review your operation notes and set clear goals.'], ['Early recovery', 'Swelling, movement and walking, safely and steadily.'], ['Strength & balance', 'Progressive work in our rehab gym.'], ['Back to life', 'Return to work, sport or the things you love.']],
            prices: [['Post-op assessment', '45 mins', '£60'], ['Rehab session', '45 mins', '£55'], ['Rehab package', '6 sessions', '£299']],
            faqs: [['How soon after surgery should I start?', 'Usually within one to two weeks, depending on your operation. Bring your discharge letter and we\'ll follow your surgeon\'s guidance.'], ['Do you work with my surgeon\'s protocol?', 'Yes. We follow it closely and can send progress updates to your consultant.'], ['What if something doesn\'t feel right?', 'If you notice calf pain or swelling, chest pain, breathlessness, a fever or a hot, red wound, contact your surgical team or call 999 straight away.'], ['Can I claim on insurance?', 'Most insurers cover post-surgical physio. We\'ll help with the paperwork.']],
            cta: 'Post-op assessments within a week of your surgery.'
        },
        {
            id: 'shockwave', name: 'Shockwave therapy', page: 'treatment-shockwave-therapy.html', from: '£70', fromNum: 70, duration: '20 mins',
            img: '1551076805-e1869033e561', imgAlt: 'A bright, clean clinical treatment room', titleTail: 'For stubborn tendon pain',
            short: 'A proven option for tendon pain that hasn\'t settled, like plantar fasciitis and tennis elbow.',
            meta: 'Shockwave therapy from £70 a session at Halden Physio for plantar fasciitis, Achilles and tennis elbow pain. Available in Leicester and Nottingham, after an assessment.',
            headline: 'For the pain that just won\'t shift',
            intro: 'Tendon problems can drag on for months. Shockwave therapy is a well-researched option for stubborn cases, used alongside the right exercise plan.',
            what: 'Short pulses of sound waves are delivered to the painful tendon through a handheld device, which helps kick-start healing and reduce pain. Each session takes around 15 minutes and is usually given weekly for three to five weeks.',
            who: ['Plantar fasciitis (heel pain)', 'Achilles and patellar tendon pain', 'Tennis and golfer\'s elbow', 'Shoulder tendon problems that haven\'t settled'],
            steps: [['Assessment first', 'We confirm shockwave is right for you.'], ['Treatment', 'Around 15 minutes per session, with no needles.'], ['Exercise plan', 'Loading exercises to strengthen the tendon.'], ['Review', 'Progress check after three sessions.']],
            prices: [['Shockwave session', '20 mins, after assessment', '£70'], ['Course of 3', '', '£195'], ['Course of 5', '', '£300']],
            faqs: [['Does it hurt?', 'It can be uncomfortable, but we adjust the intensity so it stays tolerable. Most sessions take around 15 minutes.'], ['How many sessions will I need?', 'Usually three to five, a week apart.'], ['Is it suitable for everyone?', 'Not for everyone. We\'ll check your health at your assessment, as it isn\'t used during pregnancy or with some medical conditions.'], ['Where is it available?', 'At our Leicester and Nottingham clinics, after an assessment at any Halden clinic.']],
            cta: 'Book an assessment to see if shockwave is right for you.'
        },
        { id: 'followup', name: 'Follow-up appointment', from: '£45', fromNum: 45, duration: '30 mins', short: 'Continue your treatment with the same physio.' },
        { id: 'sameday', name: 'Same-day pain appointment', from: '£55', fromNum: 55, duration: '45 mins', short: 'For new pain or a flare-up you need seen today. Book by 12pm.' },
        { id: 'acupuncture', name: 'Acupuncture', from: '£45', fromNum: 45, duration: '30 mins', short: 'Western acupuncture alongside physio for pain relief.' },
        { id: 'video', name: 'Video assessment', from: '£40', fromNum: 40, duration: '30 mins', short: 'An assessment and exercise plan from home.' }
    ],

    fees: [
        { group: 'Physiotherapy', items: [['Initial assessment', '45 mins, includes treatment', '£55'], ['Follow-up appointment', '30 mins', '£45'], ['Same-day pain appointment', 'Booked by 12pm', '£55'], ['Video assessment', '30 mins, online', '£40']] },
        { group: 'Rehab', items: [['Post-op assessment', '45 mins', '£60'], ['Rehab session', '45 mins', '£55'], ['Rehab package', '6 sessions', '£299']] },
        { group: 'Massage & specialist treatments', items: [['Sports massage', '30 mins', '£45'], ['Sports massage', '60 mins', '£65'], ['Acupuncture', '30 mins', '£45'], ['Shockwave therapy', 'Per session, after assessment', '£70'], ['Shockwave therapy', 'Course of 3', '£195']] }
    ],

    team: [
        { name: 'Ellie Marsh', role: 'Clinical Lead Physiotherapist', bio: 'Specialises in knee and hip rehab, and runs our post-surgery programme.', creds: 'MSc Sports Physiotherapy', practice: 'Halden Leicester', img: '1594824476967-48c8b964273f', alt: 'Portrait of Ellie Marsh' },
        { name: 'Ravi Sandhu', role: 'Senior Physiotherapist', bio: 'A former club rugby physio with a soft spot for stubborn shoulder problems.', creds: 'BSc (Hons) Physiotherapy', practice: 'Halden Loughborough', img: '1622253692010-333f2da6031d', alt: 'Portrait of Ravi Sandhu' },
        { name: 'Hannah Cole', role: 'Physiotherapist', bio: 'Helps desk workers and new parents get on top of back and neck pain.', creds: 'BSc (Hons) Physiotherapy', practice: 'Halden Nottingham', img: '1559839734-2b71ea197ec2', alt: 'Portrait of Hannah Cole' },
        { name: 'Tom Brennan', role: 'Physiotherapist & Shockwave Lead', bio: 'Treats runners and walkers with heel, Achilles and knee pain.', creds: 'MSc Musculoskeletal Physiotherapy', practice: 'Halden Derby', img: '1612349317150-e413f6a5b16d', alt: 'Portrait of Tom Brennan' }
    ],

    reviews: [
        { stars: 5, text: 'Months of heel pain sorted in five sessions. Tom explained everything and the exercises actually fitted round my day.', name: 'Gemma', where: 'Derby' },
        { stars: 5, text: 'Booked online at 10pm, seen the next morning. My back was in a state and I walked out standing straight.', name: 'Marcus', where: 'Leicester' },
        { stars: 5, text: 'Ellie got me from crutches to running again after my ACL. Clear plan, no fluff, always on my side.', name: 'Jess', where: 'Leicester' },
        { stars: 5, text: 'Ravi fixed a shoulder two other places couldn\'t. Honest about how long it would take, and he was right.', name: 'Callum', where: 'Loughborough' },
        { stars: 4, text: 'Great physio and really easy booking. Parking near the Nottingham clinic is the only downside.', name: 'Aisha', where: 'Nottingham' },
        { stars: 5, text: 'Hannah sorted my neck and my desk set-up. No more headaches by Friday afternoon.', name: 'Priya', where: 'Nottingham' }
    ],

    calls: {
        booking: {
            tab: 'Knee pain → assessment', title: 'After-hours call becomes a booked assessment', summary: 'A runner calls at 8:40pm with knee pain. The AI asks the right questions, finds a Saturday slot and books an assessment.',
            callerLabel: 'Incoming call · 07700 900412', line: 'Halden Loughborough · 8:42pm', aiName: 'Halden AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Hi, you\'re through to Halden Physio, Loughborough. I\'m the clinic\'s AI receptionist. How can I help?' },
                { who: 'caller', text: 'Hi, my knee\'s been sore since a half marathon two weeks ago. Can I get it looked at?' },
                { who: 'ai', text: 'Sorry to hear that. An initial physio assessment is the best place to start. It\'s £55 for 45 minutes and includes your first treatment. Would a weekday evening or Saturday suit you better?' },
                { who: 'caller', text: 'Saturday morning, if you have it.' },
                { event: { icon: 'cal', title: 'Checked availability', detail: 'Loughborough · Saturday · sports physio' } },
                { who: 'ai', text: 'Ravi, our senior physio, has Saturday at 8:30 or 10:15. He sees a lot of runners. Which would you like?' },
                { who: 'caller', text: '8:30 please.' },
                { who: 'ai', text: 'Lovely. Can I take your full name and mobile number?' },
                { who: 'caller', text: 'Jordan Pike, 07700 900412.' },
                { event: { icon: 'check', title: 'Assessment booked', detail: 'Sat 8:30am · Initial assessment · Ravi Sandhu' } },
                { who: 'ai', text: 'You\'re booked with Ravi on Saturday at 8:30. I\'ve texted you a confirmation with a short form to fill in, and a reminder to wear shorts.' },
                { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'With pre-appointment form' } },
                { event: { icon: 'cal', title: 'Added to clinic diary', detail: 'Booked into Ravi\'s Saturday list' } }
            ]
        },
        urgent: {
            tab: 'Post-op warning signs', title: 'Warning signs after surgery handed to a human', summary: 'A rehab patient calls with calf swelling and breathlessness after knee surgery. The AI recognises the red flags, advises 999 and alerts the on-call clinician.',
            callerLabel: 'Incoming call · 07700 900538', line: 'Halden Leicester · 7:15pm', aiName: 'Halden AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Hi, you\'re through to Halden Physio, Leicester. I\'m the clinic\'s AI receptionist. How can I help?' },
                { who: 'caller', text: 'I had a knee replacement ten days ago. My calf\'s swollen and painful, and I\'m a bit short of breath.' },
                { event: { icon: 'alert', title: 'Red flag detected', detail: 'Calf swelling + breathlessness after surgery', urgent: true } },
                { who: 'ai', text: 'Thank you for telling me. Those symptoms need checking urgently. Please call 999 now. I\'m also alerting our on-call clinician so they can ring you straight back.' },
                { event: { icon: 'phone', title: 'On-call clinician alerted', detail: 'Live handover · callback within minutes', urgent: true } },
                { who: 'system', text: 'Call passed to Ellie Marsh (on-call clinician)' },
                { event: { icon: 'note', title: 'Notes shared', detail: 'Surgery date, symptoms and caller number' } }
            ]
        }
    },
    callIds: ['booking', 'urgent'],

    sales: {
        headerBook: 'Book button on every screen: people in pain book the moment they decide, often late at night.',
        heroButtons: 'Book and Call above the fold on mobile: most people search for a physio on their phone, in pain.',
        finder: 'One site for all 4 clinics: one brand, one booking system, and a new clinic goes live in a day.',
        prices: 'Clear "from" prices: removes the biggest reason people hesitate to book a physio.',
        urgent: 'Same-day appointments up front: captures people in pain before they call a competitor.',
        ai: 'AI receptionist answers 24/7: books assessments after hours and hands red-flag calls to a clinician.',
        reviews: 'Patient stories where people decide: trust is what turns a visitor into a booking.',
        offer: 'New patient offer with lead capture: turns "maybe later" visitors into contacts you can follow up.',
        fees: 'Full price list: honest pricing builds trust and brings in patients who are ready to book.',
        booking: 'Five-step online booking: patients book at midnight without a single phone call.',
        lead: 'Lead capture: every enquiry lands in your inbox, ready to follow up.'
    },

    locationExtra: {
        meta: 'Halden Leicester: our flagship physiotherapy clinic and rehab gym in Leicester city centre. Early, late and Saturday appointments. Book online.',
        intro: 'Our flagship clinic, five minutes from the station, with four treatment rooms, a fully equipped rehab gym and appointments from 7:30am to 8pm on weekdays.',
        img: '1597452485669-2c7bb5fef90d', imgAlt: 'Rehab gym with strength equipment',
        access: ['5 minutes\' walk from Leicester station', 'Step-free access and a lift', 'Pay-and-display parking next door', 'Changing room and showers'],
        teamTitle: 'Your Leicester physios',
        cta: 'Appointments from 7:30am, and until 8pm on weekdays.'
    },

    copy: {
        unit: 'clinic', unitPlural: 'clinics', unitTitle: 'Physiotherapy clinic', patientsWord: 'patients',
        bookLabel: 'Book an appointment', navLocations: 'Clinics', navTreatments: 'Treatments', navFees: 'Prices', navTeam: 'Our physios', navOffers: 'New patients',
        titleHome: 'Halden Physio | Physiotherapy in Leicester, Loughborough, Nottingham & Derby',
        metaHome: 'Physiotherapy, sports massage and rehab at 4 Halden Physio clinics across the East Midlands. Same-day appointments and online booking.',
        heroPill: 'Physiotherapy · 4 East Midlands clinics',
        heroTitle: 'Move better. <em>Feel like you again.</em>',
        heroLede: 'Expert physiotherapy for pain, injuries and recovery after surgery. Clear answers at your first visit, a plan that fits your life and same-day appointments when it can\'t wait.',
        heroTrust: ['Same-day appointments', 'Early, late & Saturdays', 'Insurance welcome'],
        heroFloat1: '<span class="float-dot" aria-hidden="true"></span><span><strong>Next appointment</strong>Today, 5:15pm · Leicester</span>',
        heroFloat2: '<span><strong>Rated 4.9 ★</strong>Sample rating for this demo</span>',
        whys: [
            { icon: 'clock', title: 'Seen fast', text: 'Same-day appointments for new pain, and early, late and Saturday slots.' },
            { icon: 'check', title: 'Clear answers', text: 'A diagnosis and a plan at your first visit, in plain English.' },
            { icon: 'heart', title: 'A plan you\'ll stick to', text: 'Short, realistic exercise plans sent to your phone with videos.' },
            { icon: 'pound', title: 'Honest prices', text: 'Every price published. No packages pushed on you.' }
        ],
        finderEyebrow: 'Our clinics', finderTitle: 'Find your nearest Halden clinic', finderLede: 'Four clinics in Leicester, Loughborough, Nottingham and Derby. Search by postcode or town.', finderExample: 'LE11 or Derby',
        locationsTitle: 'Halden clinics', locationsLede: 'Four clinics, one standard of care, with the same booking system and the same honest prices at each.',
        treatEyebrow: 'Treatments', treatTitle: 'Treatment that gets you moving', treatLede: 'Every treatment starts with understanding what\'s going on. Then we fix it, and show you how to keep it fixed.', treatmentsTitle: 'Our treatments',
        urgentSection: { eyebrow: 'Same-day appointments', title: 'In pain right now? We can usually see you today.', text: 'Book a same-day pain appointment by 12pm at any clinic. If you have chest pain, sudden weakness, numbness around the groin or loss of bladder control, call 999.' },
        aiEyebrow: 'Answered 24/7', aiTitle: 'A receptionist that never misses a call', aiLede: 'Our AI receptionist answers when the clinic is busy or closed. It books assessments, answers questions about prices and parking, and passes anything urgent straight to a clinician.', aiFoot: 'This is a simulated example call for demonstration. Medical concerns are always passed to a qualified clinician.',
        reviewsEyebrow: 'Patient stories', reviewsTitle: 'Back to doing what they love', reviewsLede: 'Example reviews showing how real patient feedback would appear on this site.',
        teamEyebrow: 'Our physios', teamTitle: 'Physios who explain, not just treat', teamLede: 'Experienced physiotherapists and sports therapists across all four clinics.', teamPageTitle: 'Meet our physios',
        offerEyebrow: 'New patients', offerTitle: '£15 off your first assessment', offerText: 'New to Halden? Your first physio assessment is £40 instead of £55 this month, at any of our four clinics.', offerCta: 'Claim new patient offer',
        ctaTitle: 'Ready to feel better?', ctaText: 'Book online in under a minute, or call any time and our AI receptionist will help.',
        titleLocations: 'Our clinics | Leicester, Loughborough, Nottingham, Derby | Halden Physio', metaLocations: 'Find your nearest Halden Physio clinic in Leicester, Loughborough, Nottingham or Derby.',
        titleTreatments: 'Physiotherapy treatments | Halden Physio', metaTreatments: 'Physio assessments, sports massage, back and neck pain treatment, post-surgery rehab and shockwave therapy at 4 Halden clinics.',
        titleFees: 'Prices | Halden Physio', metaFees: 'Our full price list for physiotherapy, rehab, sports massage, acupuncture and shockwave therapy.',
        feesEyebrow: 'Prices', feesTitle: 'Clear, honest prices', feesLede: 'The same prices at every clinic. Insured? We\'ll bill most major insurers directly.', feesNotice: '',
        feesFoot: 'Prices are for this demo and are illustrative.',
        titleBook: 'Book a physio appointment online | Halden Physio', metaBook: 'Book a physio assessment, sports massage or rehab session online at any of our 4 clinics. Instant confirmation by text.',
        bookTitle: 'Book an appointment', bookLede: 'Choose your clinic and a time. Instant confirmation by text.', bookStep1: 'Every clinic offers assessments, follow-ups and sports massage.', bookStep2Title: 'What would you like to book?', bookStep2: 'New to us? Choose a physio assessment.', stepTreatment: 'Treatment',
        bookExtraField: '<div class="k-field"><label for="bf-insured">How are you paying?</label><select id="bf-insured" name="payment"><option>Paying myself</option><option>Health insurance</option><option>Through my employer</option></select></div>',
        bookNotesPh: 'e.g. Where it hurts, how long it\'s been going on, any recent surgery', bookFoot: 'Prefer to talk to someone? Call',
        titleTeam: 'Our physios | Halden Physio', metaTeam: 'Meet the physiotherapists at Halden Physio\'s clinics in Leicester, Loughborough, Nottingham and Derby.',
        titleOffers: 'New patient offer: £15 off your first assessment | Halden Physio', metaOffers: 'New to Halden Physio? Get £15 off your first physiotherapy assessment at any of our 4 East Midlands clinics.',
        offersTitle: 'New patient offer', offersLede: 'Your first physio assessment for £40 instead of £55, at any Halden clinic.',
        offersPoints: ['A full 45-minute assessment', 'Your diagnosis and first treatment in one visit', 'An exercise plan sent to your phone', 'Same-day appointments available', 'No referral needed'],
        offersSmall: 'One per new patient. This is a demo offer.',
        offersFormTitle: 'Claim your offer', offersButton: 'Send me my offer code',
        offersExtraField: '<div class="k-field"><label for="lf-problem">What\'s bothering you?</label><select id="lf-problem" name="problem"><option>Back or neck</option><option>Knee or hip</option><option>Shoulder</option><option>Sports injury</option><option>Recovery after surgery</option></select></div>',
        offersSuccessTitle: 'Your offer is on its way', offersSuccess: 'Check your inbox for your code. Use it when you book online, or mention it when you call.',
        accessPractices: 'All Halden clinics have step-free access, ground-floor treatment rooms or a lift, and accessible toilets.',
        privacyHealth: 'Health information such as your injury, medical history and treatment notes, so we can treat you safely.',
        hoursNote: 'Most clinics: Mon to Thu 7:30am to 8pm, Fri until 6pm, Sat 8am to 1pm.',
        footerAbout: 'Physiotherapy, sports massage and rehab at 4 clinics across the East Midlands.',
        regLine: 'A fictional physiotherapy group created as a concept demo.'
    }
};
