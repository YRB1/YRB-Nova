/* Lumen Skin Clinic — fictional 6-clinic aesthetics & dermatology group (demo by YRB Nova).
   Prescription-only treatments are presented as prescriber consultations (UK advertising rules for POMs).
   Phone numbers use Ofcom's reserved drama ranges, so they never reach a real business. */
const wk = (o, c, sat) => ({ 0: null, 1: [o, c], 2: [o, c], 3: [o, '20:00'], 4: [o, '20:00'], 5: [o, c], 6: sat || ['09:00', '17:00'] });

module.exports = {
    id: 'lumen-skin',
    name: 'Lumen Skin Clinic',
    shortName: 'Lumen',
    region: 'UK',
    refPrefix: 'LM',
    schemaType: 'MedicalClinic',
    phone: '020 7946 0600',
    email: 'concierge@lumenskin.example',
    themeColor: '#121010',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;700&display=swap',
    favicon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#121010"/><circle cx="32" cy="32" r="15" fill="none" stroke="#D9C3A5" stroke-width="3"/><circle cx="32" cy="32" r="5" fill="#D9C3A5"/></svg>',
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="#D9C3A5" stroke-width="1.2"/><circle cx="20" cy="20" r="11" fill="none" stroke="#D9C3A5" stroke-width="1.2"/><circle cx="20" cy="20" r="3.2" fill="#D9C3A5"/></svg>',
    logoText: 'LUMEN<span class="logo-sub">Skin Clinic</span>',
    ogImage: '1531746020798-e6953c6e8e04',
    heroImg: '1531746020798-e6953c6e8e04',
    heroAlt: 'Close-up portrait of a woman with clear, glowing skin',
    heroFloat1Pos: 'left:14px;bottom:18px;',
    heroFloat2Pos: 'right:14px;top:18px;',
    urgentPhone: '020 7946 0999',
    urgentTreatment: 'aftercare',
    glows: ['width:460px;height:460px;background:#8C6B4A;top:-180px;right:-140px', 'width:380px;height:380px;background:#5A4A55;bottom:-180px;left:-140px'],

    urgent: {
        label: 'Aftercare line',
        html: 'Concerned after a treatment? Our clinical aftercare line is open 24/7. <a href="tel:02079460999">Call 020 7946 0999</a>'
    },

    practices: [
        { id: 'marylebone', name: 'Lumen Marylebone', town: 'London', street: '18 Wexford Mews', postcode: 'W1G', address: '18 Wexford Mews, Marylebone, London W1G', phone: '020 7946 0618', lat: 51.5205, lng: -0.1490, hours: wk('09:00', '19:00'), page: 'location-marylebone.html', tags: ['Flagship', 'Dermatology'] },
        { id: 'chelsea', name: 'Lumen Chelsea', town: 'London', street: '7 Ashbourne Place', postcode: 'SW3', address: '7 Ashbourne Place, Chelsea, London SW3', phone: '020 7946 0632', lat: 51.4910, lng: -0.1690, hours: wk('09:00', '19:00') },
        { id: 'manchester', name: 'Lumen Manchester', town: 'Manchester', street: '22 Spinningfield Row', postcode: 'M3', address: '22 Spinningfield Row, Manchester M3', phone: '0161 496 0645', lat: 53.4800, lng: -2.2520, hours: wk('09:00', '19:00') },
        { id: 'leeds', name: 'Lumen Leeds', town: 'Leeds', street: '11 Albion Yard', postcode: 'LS1', address: '11 Albion Yard, Leeds LS1', phone: '0113 496 0659', lat: 53.7980, lng: -1.5450, hours: wk('09:30', '18:30') },
        { id: 'bristol', name: 'Lumen Clifton', town: 'Bristol', street: '4 Regency Steps', postcode: 'BS8', address: '4 Regency Steps, Clifton, Bristol BS8', phone: '0117 496 0662', lat: 51.4560, lng: -2.6200, hours: wk('09:30', '18:30') },
        { id: 'edinburgh', name: 'Lumen Edinburgh', town: 'Edinburgh', street: '9 Heriot Lane', postcode: 'EH2', address: '9 Heriot Lane, Edinburgh EH2', phone: '0131 496 0677', lat: 55.9530, lng: -3.1980, hours: wk('09:30', '18:30') }
    ],

    treatments: [
        {
            id: 'antiwrinkle', name: 'Anti-wrinkle consultation', page: 'treatment-anti-wrinkle.html', from: '£199', fromNum: 199, duration: '45 mins',
            img: '1552693673-1bf958298935', imgAlt: 'A practitioner in gloves assessing a client\'s skin', titleTail: 'Prescriber-led consultations',
            short: 'A medical consultation to soften lines naturally, with prescription treatments only where right for you.',
            meta: 'Anti-wrinkle consultations with a medical prescriber at Lumen Skin Clinic. Natural-looking results, treatment plans from £199. London, Manchester, Leeds, Bristol and Edinburgh.',
            headline: 'Softer lines. Still unmistakably you.',
            intro: 'Our approach is quiet and natural: refreshed, rested, never "done". Every plan starts with a face-to-face consultation with a medical prescriber who listens first.',
            what: 'A thorough consultation with a doctor, dentist or nurse prescriber to assess your skin, discuss your goals and explain every option. Where a prescription treatment is suitable, it\'s only prescribed after this consultation, and you\'ll always have time to think.',
            who: ['Adults over 18 bothered by forehead lines, frown lines or crow\'s feet', 'Anyone who wants a subtle, natural-looking result', 'People who\'d like an honest opinion before committing to anything'],
            steps: [['Face-to-face consultation', 'Your medical history, goals and a full skin assessment with a prescriber.'], ['Your personal plan', 'A written plan with prices. Time to think, never pressure.'], ['Treatment', 'If suitable, treatment by your prescriber in a private suite.'], ['Two-week review', 'A complimentary review to make sure you\'re delighted.']],
            prices: [['Consultation with a prescriber', 'Redeemable against treatment', '£50'], ['One area', 'Following consultation', '£199'], ['Two areas', 'Following consultation', '£279'], ['Three areas', 'Following consultation', '£339'], ['Two-week review', '', 'Complimentary']],
            financeNote: 'Prescription-only treatments are only provided after a face-to-face consultation with a qualified medical prescriber.',
            faqs: [['Will I look "frozen"?', 'Not with us. Our signature is subtle: we aim for softened lines and natural movement, so friends notice you look well, not that you\'ve had something done.'], ['Who will treat me?', 'Every consultation and treatment is carried out by a registered doctor, dentist or nurse prescriber with advanced aesthetic training.'], ['How long do results last?', 'Typically three to four months, varying from person to person. Your prescriber will talk you through what to expect.'], ['Is there any downtime?', 'Most people return to work straight away. You may notice slight redness for an hour or two.']],
            cta: 'Begin with a consultation. No obligation, ever.'
        },
        {
            id: 'boosters', name: 'Skin boosters', page: 'treatment-skin-boosters.html', from: '£295', fromNum: 295, duration: '45 mins',
            img: '1616394584738-fc6e612e71b9', imgAlt: 'A client relaxing during a hydrating facial treatment', titleTail: 'Deep hydration & glow',
            short: 'Deep hydration that restores glow and bounce from within, for skin that looks rested.',
            meta: 'Skin boosters from £295 at Lumen Skin Clinic for deep hydration, glow and improved texture. Consultation-led treatment across our 6 UK clinics.',
            headline: 'The glow you get after a really good holiday',
            intro: 'Skin boosters hydrate your skin from within, improving texture, fine lines and that tired, dull look that no moisturiser quite reaches.',
            what: 'Micro-injections of a hydrating gel spread evenly across the face, neck or hands, drawing in moisture and supporting your skin\'s natural renewal. Results build gradually over a course of treatments.',
            who: ['Anyone with dry, dull or tired-looking skin', 'Fine lines on the face, neck or décolletage', 'Clients preparing for a wedding or special event'],
            steps: [['Skin consultation', 'A detailed analysis of your skin and goals.'], ['Numbing & prep', 'A soothing numbing cream for comfort.'], ['Treatment', 'Around 30 minutes, with minimal discomfort.'], ['Course & glow', 'Usually two or three sessions, a month apart.']],
            prices: [['Single session', 'Face', '£295'], ['Course of three', 'Face', '£795'], ['Neck or hands', 'Per session', '£295']],
            faqs: [['When will I see results?', 'Many clients notice a fresher look within a week, with the best results after a full course.'], ['Does it hurt?', 'We apply numbing cream first, so most clients describe it as mild and very manageable.'], ['Is there downtime?', 'You may have small bumps for 24 to 48 hours. We recommend avoiding make-up until the next day.'], ['How long does it last?', 'Results typically last six to nine months, with a single maintenance session to keep the glow.']],
            cta: 'Begin with a skin consultation at any Lumen clinic.'
        },
        {
            id: 'acne', name: 'Acne & dermatology', page: 'treatment-acne-dermatology.html', from: '£150', fromNum: 150, duration: '30 mins',
            img: '1570172619644-dfd03ed5d881', imgAlt: 'A client receiving a calming clinical facial treatment', titleTail: 'Consultant dermatologist appointments',
            short: 'Specialist care for acne, rosacea, pigmentation and mole checks, led by dermatologists.',
            meta: 'See a consultant dermatologist from £150 at Lumen Skin Clinic for acne, rosacea, pigmentation, eczema and mole checks. Short waits in London, Manchester, Leeds, Bristol and Edinburgh.',
            headline: 'Skin that\'s calmer, clearer and finally understood',
            intro: 'Persistent skin conditions affect how you feel every single day. Our consultant dermatologists get to the root cause, with treatment plans that actually work.',
            what: 'An appointment with a consultant dermatologist to diagnose and treat conditions including acne, rosacea, pigmentation, eczema and suspicious moles, combining medical treatment with in-clinic therapies where helpful.',
            who: ['Adults and teenagers (with a parent) with acne or acne scarring', 'Anyone with rosacea, redness or pigmentation', 'People who want a mole or skin lesion checked quickly'],
            steps: [['Dermatologist consultation', 'A thorough assessment with a consultant, usually within a week.'], ['Diagnosis & plan', 'A clear explanation and a written treatment plan.'], ['Treatment', 'Prescriptions, in-clinic therapies, or both.'], ['Follow-up', 'Regular reviews until your skin is where you want it.']],
            prices: [['Consultant dermatologist consultation', 'New patient', '£150'], ['Follow-up consultation', '', '£110'], ['Mole check', 'Up to 3 moles, with dermoscopy', '£150'], ['Full skin check', 'Head to toe, with mapping', '£250'], ['Clinical facial for acne', '', '£120']],
            faqs: [['Do I need a GP referral?', 'No. You can book directly, and we\'ll write to your GP afterwards if you\'d like us to.'], ['How quickly can I be seen?', 'Most clients see a consultant dermatologist within a week, often sooner.'], ['Can you prescribe medication?', 'Yes. Our consultants can prescribe where appropriate, including specialist acne treatments with the right monitoring.'], ['What happens if a mole looks concerning?', 'We\'ll explain our findings straight away and arrange fast removal and testing, or an urgent referral, as needed.']],
            cta: 'Appointments with a consultant dermatologist, usually within a week.'
        },
        {
            id: 'laser', name: 'Laser & resurfacing', page: 'treatment-laser.html', from: '£350', fromNum: 350, duration: '60 mins',
            img: '1515377905703-c4788e51af15', imgAlt: 'A drop of serum falling from a pipette in soft, dark light', titleTail: 'Laser skin resurfacing',
            short: 'Fade pigmentation, refine texture and soften scarring with medical-grade laser.',
            meta: 'Laser skin resurfacing from £350 at Lumen Skin Clinic. Treat pigmentation, acne scarring, texture and fine lines with medical-grade laser, after a skin consultation.',
            headline: 'Smoother, brighter skin, gently renewed',
            intro: 'Medical-grade laser treatments that resurface and renew, improving pigmentation, texture, scarring and fine lines, tailored to your skin type.',
            what: 'Controlled laser energy that encourages your skin to renew itself, producing fresh collagen and lifting away damaged, uneven layers. We choose the laser and settings for your skin tone and concerns.',
            who: ['Sun damage, pigmentation and age spots', 'Acne scarring and uneven texture', 'Fine lines and enlarged pores', 'All skin types, after a patch test'],
            steps: [['Skin consultation & patch test', 'We assess your skin and test a small area first.'], ['Prepare', 'A short skincare routine to prepare your skin.'], ['Laser session', 'With cooling and numbing for comfort.'], ['Aftercare', 'A tailored routine and a review appointment.']],
            prices: [['Skin consultation & patch test', 'Redeemable against treatment', '£50'], ['Laser resurfacing, face', 'Per session', '£350'], ['Course of three, face', '', '£950'], ['Pigmentation treatment', 'Small area', 'From £180']],
            faqs: [['Is laser safe for darker skin?', 'Yes, with the right laser and settings. Our practitioners are experienced in treating all skin types, and we always patch test first.'], ['How much downtime is there?', 'It depends on the treatment. Lighter treatments may cause a day of redness; deeper resurfacing can need a few days. We\'ll plan around your diary.'], ['How many sessions will I need?', 'Most concerns improve over a course of three sessions, four to six weeks apart.'], ['Can I have laser in summer?', 'Some treatments, yes, with strict sun protection. Your practitioner will advise the best timing.']],
            cta: 'Begin with a skin consultation and patch test.'
        },
        { id: 'consultation', name: 'Skin consultation', from: '£50', fromNum: 50, duration: '30 mins', short: 'An in-depth skin analysis and personal plan, redeemable against treatment.' },
        { id: 'peel', name: 'Chemical peel', from: '£120', fromNum: 120, duration: '45 mins', short: 'Brightening peels for a smoother, more even complexion.' },
        { id: 'facial', name: 'Clinical facial', from: '£120', fromNum: 120, duration: '60 mins', short: 'Results-driven facials prescribed for your skin, not a spa menu.' },
        { id: 'aftercare', name: 'Aftercare review', from: 'Complimentary', fromNum: 0, duration: '20 mins', short: 'For any client with a question or concern after treatment.' }
    ],

    fees: [
        { group: 'Consultations', items: [['Skin consultation', 'Redeemable against treatment', '£50'], ['Consultation with a prescriber', 'Redeemable against treatment', '£50'], ['Consultant dermatologist', 'New patient', '£150'], ['Aftercare review', '', 'Complimentary']] },
        { group: 'Injectable treatments', note: 'Prescription-only treatments are only provided after a face-to-face consultation with a qualified medical prescriber.', items: [['Anti-wrinkle treatment, one area', 'Following consultation', '£199'], ['Anti-wrinkle treatment, three areas', 'Following consultation', '£339'], ['Skin boosters', 'Per session', '£295'], ['Dermal filler', 'Per area, following consultation', 'From £295']] },
        { group: 'Skin & laser', items: [['Clinical facial', '', '£120'], ['Chemical peel', '', '£120'], ['Laser resurfacing, face', 'Per session', '£350'], ['Pigmentation treatment', 'Small area', 'From £180']] },
        { group: 'Dermatology', items: [['Follow-up consultation', '', '£110'], ['Mole check', 'Up to 3 moles', '£150'], ['Full skin check', 'With mapping', '£250']] }
    ],

    team: [
        { name: 'Dr Isla Bennett', role: 'Medical Director', bio: 'An aesthetic doctor known for her "less is more" philosophy and meticulous consultations.', creds: 'MBBS, MRCGP', practice: 'Lumen Marylebone', img: '1595476108010-b4d1f102b1b1', alt: 'Dr Isla Bennett treating a client' },
        { name: 'Dr Nadia Rahman', role: 'Consultant Dermatologist', bio: 'Specialises in acne, rosacea and pigmentation in all skin types.', creds: 'MBChB, FRCP (Derm)', practice: 'Lumen Manchester', img: '1519699047748-de8e457a634e', alt: 'Portrait of Dr Nadia Rahman' },
        { name: 'Dr James Whitmore', role: 'Aesthetic Doctor', bio: 'Brings an eye for facial balance and a calm, unhurried approach to every consultation.', creds: 'MBBS', practice: 'Lumen Chelsea', img: '1507003211169-0a1dd7228f2d', alt: 'Portrait of Dr James Whitmore' },
        { name: 'Freya Lawson', role: 'Advanced Nurse Prescriber', bio: 'Leads our skin booster and laser programme, with a gift for putting first-timers at ease.', creds: 'RGN, NMC Independent Prescriber', practice: 'Lumen Leeds', img: '1487412947147-5cebf100ffc2', alt: 'Portrait of Freya Lawson' }
    ],

    reviews: [
        { stars: 5, text: 'I was nervous I\'d look different. Instead everyone just asks if I\'ve been on holiday. Exactly what I wanted.', name: 'Charlotte', where: 'Marylebone' },
        { stars: 5, text: 'Years of acne, and Dr Rahman was the first person to really explain why. Six months on, my skin is clear.', name: 'Aiden', where: 'Manchester' },
        { stars: 5, text: 'The consultation felt like a conversation, not a sales pitch. I left with a plan and no pressure at all.', name: 'Sophie', where: 'Chelsea' },
        { stars: 5, text: 'Beautiful clinic, impeccable aftercare. They called me the next day just to check in.', name: 'Hannah', where: 'Leeds' },
        { stars: 4, text: 'Laser results are wonderful on my pigmentation. Downtime was a touch longer than I expected, but they warned me.', name: 'Priya', where: 'Clifton' },
        { stars: 5, text: 'Booked a mole check online on a Sunday evening and was seen on Tuesday. Reassuring and so professional.', name: 'Callum', where: 'Edinburgh' }
    ],

    calls: {
        pricing: {
            tab: 'Price question → consultation', title: 'Price enquiry becomes a booked consultation', summary: 'A caller asks about prices at 9pm. The AI explains clearly, without pressure, and books a consultation with a prescriber.',
            callerLabel: 'Incoming call · 07700 900733', line: 'Lumen Marylebone · 9:06pm', aiName: 'Lumen AI concierge', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Good evening, Lumen Skin Clinic, Marylebone. I\'m the clinic\'s AI concierge. How may I help?' },
                { who: 'caller', text: 'Hi, I\'m thinking about something for my forehead lines. How much is it?' },
                { who: 'ai', text: 'Of course. Treatment for one area is from £199, but everything starts with a consultation with one of our medical prescribers. That\'s £50, and it\'s redeemable against treatment.' },
                { who: 'caller', text: 'Okay, that sounds sensible. Is there anything on a Saturday?' },
                { event: { icon: 'cal', title: 'Checked availability', detail: 'Marylebone · Saturdays · prescriber clinics' } },
                { who: 'ai', text: 'Dr Isla Bennett has Saturday at 11:30am or 2:15pm. Would either suit you?' },
                { who: 'caller', text: '11:30 would be lovely.' },
                { who: 'ai', text: 'Wonderful. May I take your name and mobile number?' },
                { who: 'caller', text: 'It\'s Olivia Hart, 07700 900733.' },
                { event: { icon: 'check', title: 'Consultation booked', detail: 'Sat 11:30am · Prescriber consultation · Dr Bennett' } },
                { who: 'ai', text: 'You\'re booked with Dr Bennett on Saturday at 11:30. I\'ve sent a confirmation with a short medical questionnaire, so your consultation can focus entirely on you.' },
                { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'With pre-consultation questionnaire' } },
                { event: { icon: 'cal', title: 'Added to clinic calendar', detail: 'Synced with Dr Bennett\'s diary' } }
            ]
        },
        urgent: {
            tab: 'Aftercare concern', title: 'Possible complication escalated to a clinician', summary: 'A client calls after a filler treatment with pain and skin colour changes. The AI recognises the warning signs and transfers immediately to the on-call clinician.',
            callerLabel: 'Incoming call · 07700 900815', line: 'Lumen aftercare line · 10:32pm', aiName: 'Lumen AI concierge', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Lumen aftercare line. I\'m the clinic\'s AI concierge. How can I help?' },
                { who: 'caller', text: 'I had filler this afternoon and the area\'s getting really painful. The skin looks pale and a bit mottled.' },
                { event: { icon: 'alert', title: 'Urgent aftercare concern', detail: 'Pain + skin colour change after filler', urgent: true } },
                { who: 'ai', text: 'Thank you for calling straight away. Those symptoms need to be checked by a clinician urgently, so I\'m connecting you to our on-call doctor now. Please stay on the line.' },
                { event: { icon: 'phone', title: 'Transferred to on-call clinician', detail: 'Live handover · treatment record attached', urgent: true } },
                { who: 'system', text: 'Call transferred to Dr James Whitmore (on call)' },
                { event: { icon: 'note', title: 'Treatment notes shared', detail: 'Today\'s treatment, area and product batch' } }
            ]
        }
    },
    callIds: ['pricing', 'urgent'],

    sales: {
        headerBook: 'Book button on every screen: high-value clients book the moment they\'re ready.',
        heroButtons: 'Book and Call above the fold on mobile: premium clients browse on their phones in the evening.',
        finder: 'One site for all 6 clinics: one brand, one experience, and new clinics go live in a day.',
        prices: '"From" prices with a consultation-first message: qualifies leads and stays inside UK advertising rules.',
        urgent: '24/7 aftercare line: the safety reassurance high-value clients look for before booking.',
        ai: 'AI concierge answers 24/7: turns 9pm price enquiries into booked consultations, and escalates concerns to a clinician.',
        reviews: 'Reviews where clients decide: trust is the deciding factor in aesthetics.',
        offer: 'Membership & offer capture: builds a list of high-value clients for repeat treatments.',
        fees: 'Clear price guide: builds trust and attracts clients who are ready to book.',
        booking: 'Five-step online booking: clients book consultations at midnight without a phone call.',
        lead: 'Lead capture: every enquiry lands in your inbox, ready to nurture into a consultation.'
    },

    locationExtra: {
        meta: 'Lumen Marylebone: our flagship aesthetics and dermatology clinic in central London. Late appointments Wednesday and Thursday, Saturday opening. Book online.',
        intro: 'Our flagship clinic, set in a quiet Marylebone mews, with five private treatment suites, an in-house dermatology service and evening appointments on Wednesdays and Thursdays.',
        img: '1560750588-73207b1ef5b8', imgAlt: 'A calm, softly lit treatment space with plants and natural textures',
        access: ['5 minutes from Baker Street and Bond Street stations', 'Step-free access and a lift to all floors', 'Discreet, private entrance', 'Complimentary refreshments'],
        teamTitle: 'Your Marylebone practitioners',
        cta: 'Late appointments on Wednesdays and Thursdays until 8pm.'
    },

    copy: {
        unit: 'clinic', unitPlural: 'clinics', unitTitle: 'Skin clinic', patientsWord: 'clients',
        bookLabel: 'Book a consultation', navLocations: 'Clinics', navTreatments: 'Treatments', navFees: 'Price guide', navTeam: 'Practitioners', navOffers: 'Membership',
        titleHome: 'Lumen Skin Clinic | Aesthetics & dermatology | London, Manchester, Leeds',
        metaHome: 'Medical-led aesthetics and dermatology at 6 Lumen clinics across the UK. Natural results, consultant dermatologists and consultations with medical prescribers.',
        heroPill: 'Medical-led aesthetics · 6 UK clinics',
        heroTitle: 'Skin, <em>quietly</em> transformed',
        heroLede: 'Natural, medical-led aesthetics and dermatology. Every treatment begins with a consultation, every result looks like you, and every client is looked after long after they leave.',
        heroTrust: ['Doctor & prescriber-led', 'Consultant dermatologists', '24/7 aftercare line'],
        heroFloat1: '<span class="float-dot" aria-hidden="true"></span><span><strong>Next consultation</strong>Thursday, 6:30pm</span>',
        heroFloat2: '<span><strong>Rated 4.9 ★</strong>Sample rating for this demo</span>',
        whys: [
            { icon: 'shield', title: 'Medical-led', text: 'Every treatment is delivered or overseen by doctors, dentists, nurse prescribers or dermatologists.' },
            { icon: 'sparkle', title: 'Natural results', text: 'Refreshed, never "done". Our signature is subtle, considered and unmistakably you.' },
            { icon: 'heart', title: 'Consultation first', text: 'Honest advice, written plans and time to think. No pressure, ever.' },
            { icon: 'clock', title: 'Aftercare, 24/7', text: 'A clinical aftercare line that\'s always answered, and a review after every treatment.' }
        ],
        finderEyebrow: 'Our clinics', finderTitle: 'Find your nearest Lumen', finderLede: 'Six clinics in London, Manchester, Leeds, Bristol and Edinburgh. Search by postcode or city.', finderExample: 'W1 or Leeds',
        locationsTitle: 'Lumen clinics', locationsLede: 'Six clinics, one standard of care. Each one calm, private and designed around you.',
        treatEyebrow: 'Treatments', treatTitle: 'Considered treatments, beautifully done', treatLede: 'From clinical dermatology to subtle aesthetics, every journey begins with a consultation and a clear, written plan.', treatmentsTitle: 'Our treatments',
        urgentSection: { eyebrow: 'Aftercare', title: 'Concerned after a treatment? We\'re here 24/7.', text: 'If you have increasing pain, skin colour changes or any worry after a treatment, call our clinical aftercare line straight away. A clinician is always on call.' },
        aiEyebrow: 'Answered 24/7', aiTitle: 'A concierge that never misses a call', aiLede: 'Our AI concierge answers when clinics are busy or closed. It explains treatments and prices, books consultations, and puts any aftercare concern straight through to a clinician.', aiFoot: 'This is a simulated example call for demonstration. Clinical concerns are always passed to a qualified clinician.',
        reviewsEyebrow: 'Client stories', reviewsTitle: 'In our clients\' words', reviewsLede: 'Example reviews showing how real client feedback would appear on this site.',
        teamEyebrow: 'Our practitioners', teamTitle: 'Medical experts with an artist\'s eye', teamLede: 'Doctors, prescribers and dermatologists who share one philosophy: enhance, never change.', teamPageTitle: 'Meet our practitioners',
        offerEyebrow: 'Lumen Membership', offerTitle: 'Membership from £49 a month', offerText: 'A monthly clinical facial or peel, 10% off treatments and priority booking. Join this month and your first facial is complimentary.', offerCta: 'Explore membership',
        ctaTitle: 'Begin with a conversation', ctaText: 'Book a consultation online, or call our concierge team (or our AI concierge) any time.',
        titleLocations: 'Our clinics | London, Manchester, Leeds, Bristol, Edinburgh | Lumen', metaLocations: 'Find your nearest Lumen Skin Clinic: Marylebone, Chelsea, Manchester, Leeds, Clifton (Bristol) and Edinburgh.',
        titleTreatments: 'Aesthetic & dermatology treatments | Lumen Skin Clinic', metaTreatments: 'Prescriber-led anti-wrinkle consultations, skin boosters, consultant dermatology and laser resurfacing at 6 Lumen clinics.',
        titleFees: 'Price guide | Lumen Skin Clinic', metaFees: 'Our full price guide for consultations, injectable treatments, laser, skin treatments and dermatology.',
        feesEyebrow: 'Price guide', feesTitle: 'Transparent pricing', feesLede: 'Every price, clearly listed. Your personal plan will always confirm your exact cost before any treatment.', feesNotice: '',
        feesFoot: 'Prices are for this demo and are illustrative. Prescription-only treatments are only provided following a consultation with a qualified prescriber.',
        titleBook: 'Book a consultation online | Lumen Skin Clinic', metaBook: 'Book a skin consultation, dermatology appointment or treatment online at any of our 6 clinics. Instant confirmation by text.',
        bookTitle: 'Book a consultation', bookLede: 'Choose your clinic and a time. Instant confirmation by text.', bookStep1: 'Every clinic offers consultations, dermatology and aftercare reviews.', bookStep2Title: 'What would you like to book?', bookStep2: 'Not sure? A skin consultation is the perfect place to start.', stepTreatment: 'Treatment',
        bookExtraField: '<div class="k-field"><label for="bf-first-time">Have you had aesthetic treatments before?</label><select id="bf-first-time" name="experience"><option>No, this is my first time</option><option>Yes, elsewhere</option><option>Yes, at Lumen</option></select></div>',
        bookNotesPh: 'e.g. What you\'d like to discuss, or any concerns', bookFoot: 'Prefer to speak to someone? Call our concierge on',
        titleTeam: 'Our practitioners | Lumen Skin Clinic', metaTeam: 'Meet Lumen\'s aesthetic doctors, nurse prescribers and consultant dermatologists.',
        titleOffers: 'Lumen Membership | Monthly facials & 10% off | Lumen Skin Clinic', metaOffers: 'Lumen Membership from £49 a month: a monthly clinical facial or peel, 10% off treatments and priority booking.',
        offersTitle: 'Lumen Membership', offersLede: 'Consistent care for consistently beautiful skin, from £49 a month.',
        offersPoints: ['A monthly clinical facial or chemical peel', '10% off all treatments', 'Priority booking and evening appointments', 'A complimentary skin consultation each year', 'First facial complimentary when you join this month'],
        offersSmall: 'Minimum term 6 months. Available at all 6 clinics. This is a demo offer.',
        offersFormTitle: 'Request membership details', offersButton: 'Send me the details',
        offersExtraField: '<div class="k-field"><label for="lf-interest">Main interest</label><select id="lf-interest" name="interest"><option>Glow & hydration</option><option>Fine lines</option><option>Acne & breakouts</option><option>Pigmentation</option></select></div>',
        offersSuccessTitle: 'Thank you', offersSuccess: 'Your membership guide is on its way to your inbox. Our concierge team will be in touch within one working day.',
        accessPractices: 'All Lumen clinics offer step-free access or lifts, private consultation suites and quiet appointment times on request.',
        privacyHealth: 'Medical history and treatment records, so we can treat you safely.',
        hoursNote: 'Most clinics: Mon to Fri 9:30am to 6:30pm, late Wed & Thu until 8pm, Sat 9am to 5pm.',
        footerAbout: 'Medical-led aesthetics and dermatology at 6 clinics across the UK.',
        regLine: 'Registered with the CQC and Healthcare Improvement Scotland (fictional demo).'
    }
};
