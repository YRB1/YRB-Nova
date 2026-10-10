/* Brightwell Dental Group — fictional 12-practice Midlands dental group (demo by YRB Nova).
   Phone numbers use Ofcom's reserved drama ranges, so they never reach a real business. */
const wk = (o, c, late) => ({ 0: null, 1: [o, late || c], 2: [o, c], 3: [o, late || c], 4: [o, c], 5: [o, c], 6: ['09:00', '13:00'] });

module.exports = {
    id: 'brightwell-dental',
    name: 'Brightwell Dental Group',
    shortName: 'Brightwell Dental',
    region: 'Midlands',
    refPrefix: 'BW',
    schemaType: 'Dentist',
    phone: '0115 496 0400',
    email: 'hello@brightwell-dental.example',
    themeColor: '#1F4D47',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap',
    favicon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#1F4D47"/><path d="M21 18c-6 0-9 5-8 11 1 5 3 7 4 13 1 5 2 8 5 8 3 0 3-7 6-7h8c3 0 3 7 6 7 3 0 4-3 5-8 1-6 3-8 4-13 1-6-2-11-8-11-4 0-6 2-9 2s-5-2-9-2z" fill="#F2A57A"/></svg>',
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#1F4D47"/><path d="M13.2 11.5c-3.7 0-5.6 3.1-5 6.9.6 3.1 1.9 4.4 2.5 8.1.6 3.1 1.2 5 3.1 5s1.9-4.4 3.8-4.4h5c1.9 0 1.9 4.4 3.8 4.4s2.5-1.9 3.1-5c.6-3.7 1.9-5 2.5-8.1.6-3.8-1.3-6.9-5-6.9-2.5 0-3.8 1.3-5.6 1.3s-3.1-1.3-5.6-1.3z" fill="#F2A57A"/><circle cx="29.5" cy="10.5" r="3" fill="#FAF6F0"/></svg>',
    logoText: 'Brightwell<span class="logo-sub">Dental</span>',
    ogImage: '1494790108377-be9c29b29330',
    heroImg: '1494790108377-be9c29b29330',
    heroAlt: 'A woman with a warm, confident smile',
    heroFloat1Pos: 'left:12px;bottom:16px;',
    heroFloat2Pos: 'right:12px;top:16px;',
    urgentPhone: '0115 496 0999',
    urgentTreatment: 'emergency',
    glows: ['width:420px;height:420px;background:#F2A57A;top:-140px;right:-120px', 'width:360px;height:360px;background:#9CC5B8;bottom:-160px;left:-120px'],

    urgent: {
        label: 'Urgent dental care',
        html: 'In pain? Same-day emergency appointments at all 12 practices. <a href="tel:01154960999">Call 0115 496 0999</a> or <a href="book.html?treatment=emergency">book online</a>'
    },

    practices: [
        { id: 'nottingham', name: 'Brightwell Nottingham', town: 'Nottingham', street: '14 Larkspur Mews', postcode: 'NG1', address: '14 Larkspur Mews, Nottingham NG1', phone: '0115 496 0418', lat: 52.9536, lng: -1.1505, hours: wk('08:00', '18:00', '20:00'), page: 'location-nottingham.html', tags: ['Flagship', 'Late nights'] },
        { id: 'derby', name: 'Brightwell Derby', town: 'Derby', street: '3 Cedarwell Yard', postcode: 'DE1', address: '3 Cedarwell Yard, Derby DE1', phone: '01632 960211', lat: 52.9225, lng: -1.4746, hours: wk('08:30', '17:30', '19:30') },
        { id: 'leicester', name: 'Brightwell Leicester', town: 'Leicester', street: '27 Wrenfield Walk', postcode: 'LE1', address: '27 Wrenfield Walk, Leicester LE1', phone: '0116 496 0782', lat: 52.6339, lng: -1.1306, hours: wk('08:00', '18:00', '20:00'), tags: ['Late nights'] },
        { id: 'loughborough', name: 'Brightwell Loughborough', town: 'Loughborough', street: '9 Hollybank Court', postcode: 'LE11', address: '9 Hollybank Court, Loughborough LE11', phone: '01632 960344', lat: 52.7721, lng: -1.2062, hours: wk('08:30', '17:30') },
        { id: 'coventry', name: 'Brightwell Coventry', town: 'Coventry', street: '41 Ashgrove Mews', postcode: 'CV1', address: '41 Ashgrove Mews, Coventry CV1', phone: '01632 960517', lat: 52.4081, lng: -1.5106, hours: wk('08:30', '17:30', '19:30') },
        { id: 'edgbaston', name: 'Brightwell Edgbaston', town: 'Birmingham', street: '112 Kestrel Row', postcode: 'B15', address: '112 Kestrel Row, Edgbaston, Birmingham B15', phone: '0121 496 0275', lat: 52.4588, lng: -1.9268, hours: wk('08:00', '18:00', '20:00'), tags: ['Implant centre'] },
        { id: 'solihull', name: 'Brightwell Solihull', town: 'Solihull', street: '6 Poplar Arcade', postcode: 'B91', address: '6 Poplar Arcade, Solihull B91', phone: '0121 496 0639', lat: 52.4130, lng: -1.7780, hours: wk('08:30', '17:30') },
        { id: 'wolverhampton', name: 'Brightwell Wolverhampton', town: 'Wolverhampton', street: '18 Fernleigh Walk', postcode: 'WV1', address: '18 Fernleigh Walk, Wolverhampton WV1', phone: '01632 960758', lat: 52.5862, lng: -2.1288, hours: wk('08:30', '17:30', '19:00') },
        { id: 'northampton', name: 'Brightwell Northampton', town: 'Northampton', street: '22 Millbrook Yard', postcode: 'NN1', address: '22 Millbrook Yard, Northampton NN1', phone: '01632 960846', lat: 52.2405, lng: -0.8907, hours: wk('08:30', '17:30') },
        { id: 'mansfield', name: 'Brightwell Mansfield', town: 'Mansfield', street: '5 Rowan Court', postcode: 'NG18', address: '5 Rowan Court, Mansfield NG18', phone: '0115 496 0912', lat: 53.1430, lng: -1.1960, hours: wk('08:30', '17:30') },
        { id: 'lincoln', name: 'Brightwell Lincoln', town: 'Lincoln', street: '30 Minster View Mews', postcode: 'LN1', address: '30 Minster View Mews, Lincoln LN1', phone: '01632 960923', lat: 53.2344, lng: -0.5397, hours: wk('08:30', '17:30') },
        { id: 'burton', name: 'Brightwell Burton', town: 'Burton upon Trent', street: '11 Maltings Yard', postcode: 'DE14', address: '11 Maltings Yard, Burton upon Trent DE14', phone: '01632 960487', lat: 52.8070, lng: -1.6430, hours: wk('08:30', '17:30') }
    ],

    treatments: [
        {
            id: 'checkup', name: 'Check-ups & hygiene', page: 'treatment-checkups.html', nhs: true, from: '£55', fromNum: 55, duration: '30 mins',
            img: '1606811971618-4486d14f3f99', imgAlt: 'A dentist gently checking a patient\'s teeth', titleTail: 'Dental check-up in the Midlands',
            short: 'Thorough, unhurried check-ups and hygienist cleans for the whole family, NHS or private.',
            meta: 'Book a dental check-up or hygienist clean at any of our 12 Midlands practices. NHS and private, early and late appointments, private check-ups from £55.',
            headline: 'Check-ups that keep problems small (and costs low)',
            intro: 'A proper check-up takes time. We look at your teeth, gums, mouth and jaw, explain anything we find in plain English and never push treatment you don\'t need.',
            what: 'A full examination of your teeth, gums and soft tissues, with a mouth cancer screening and X-rays when needed. Add a hygienist clean to remove the build-up brushing can\'t reach and keep your gums healthy.',
            who: ['New and existing patients of any age', 'Anyone who hasn\'t seen a dentist for a while (no judgement, ever)', 'Families who want everyone seen on the same visit', 'NHS and private patients'],
            steps: [['Book online', 'Choose your practice and a time that suits you, including early mornings and evenings.'], ['Quick health check', 'We go through your medical history and any worries before we start.'], ['Your examination', 'A thorough, gentle check with X-rays only if you need them.'], ['A clear plan', 'You leave knowing exactly where you stand, with written prices for anything we recommend.']],
            prices: [['Private new patient examination', 'Including X-rays if needed', '£65'], ['Private check-up', '', '£55'], ['Hygienist appointment', '30 minutes', '£75'], ['Children under 18', 'With a parent on a membership plan', 'Free'], ['NHS check-up', 'Charged at the current NHS Band 1 rate, set nationally', 'NHS Band 1']],
            faqs: [['How often should I have a check-up?', 'Most people need one every 6 to 12 months, but your dentist will recommend an interval based on your mouth, not a one-size-fits-all rule.'], ['Do you take NHS patients?', 'Yes. All 12 practices offer NHS dentistry where we have availability, alongside private appointments. Ask your practice about current NHS waiting times.'], ['I\'m nervous about the dentist. Can you help?', 'Absolutely. Tell us when you book and we\'ll give you a longer appointment, explain everything before we do it and agree a stop signal. Sedation is available for treatment at selected practices.'], ['Do I need X-rays every time?', 'No. We only take X-rays when they\'re needed to check for hidden problems, usually every one to two years.']],
            cta: 'Early, evening and Saturday appointments at all 12 practices.'
        },
        {
            id: 'aligners', name: 'Clear aligners', page: 'treatment-clear-aligners.html', from: '£1,995', fromNum: 1995, duration: '45 mins consultation',
            img: '1609840114035-3c981b782dfe', imgAlt: 'A woman fitting a clear aligner over her teeth', titleTail: 'Invisible teeth straightening',
            short: 'Straighter teeth with near-invisible aligners, planned by our specialist team. 0% finance available.',
            meta: 'Straighten your teeth discreetly with clear aligners from £1,995 at Brightwell Dental. Free 3D smile scan and 0% finance across 12 Midlands practices.',
            headline: 'Straighter teeth, without the metal',
            intro: 'Clear aligners are removable, near-invisible trays that move your teeth a little at a time. Most people around you won\'t even notice you\'re wearing them.',
            what: 'A series of custom-made clear trays, each worn for one to two weeks, gently moving your teeth into place. We plan your whole treatment with a 3D scan so you can see your new smile before you start.',
            who: ['Adults and older teens with crowded, gappy or crooked teeth', 'Anyone who had braces as a child and has seen their teeth move back', 'People who want a discreet option for work or social life'],
            steps: [['Free smile scan', 'A quick 3D scan, no messy moulds, and a chat about what you want to change.'], ['See your new smile', 'We show you a digital preview of your result and a fixed, written price.'], ['Wear your aligners', 'Swap to a new set every week or two, with check-ins every 6 to 8 weeks.'], ['Keep it straight', 'Retainers keep your new smile in place for good.']],
            prices: [['Free smile scan & consultation', '', 'Free'], ['Mild cases', 'Usually 3 to 6 months', '£1,995'], ['Moderate cases', 'Usually 6 to 12 months', '£2,995'], ['Complex cases', '12 months or more', '£3,995'], ['Retainers', 'Upper and lower', '£250']],
            financeNote: '0% finance over 12 months, or spread the cost over up to 48 months. Subject to status.',
            faqs: [['Does it hurt?', 'You\'ll feel some pressure for a day or two with each new set. That\'s a sign they\'re working. Most people find it far more comfortable than traditional braces.'], ['How long will it take?', 'Most cases take between 3 and 12 months. Your dentist will give you a personal estimate at your free consultation.'], ['Can I eat normally?', 'Yes. You take your aligners out to eat and drink anything other than water, so there are no food restrictions.'], ['Is it available on the NHS?', 'Cosmetic straightening isn\'t available on the NHS for adults. Children who meet NHS criteria can be referred for orthodontic assessment.']],
            cta: 'Start with a free 3D smile scan. No obligation, no pressure.'
        },
        {
            id: 'implants', name: 'Dental implants', page: 'treatment-implants.html', from: '£2,495', fromNum: 2495, duration: '60 mins consultation',
            img: '1588776814546-1ffcf47267a5', imgAlt: 'A dentist reviewing dental X-rays on a light screen', titleTail: 'Replace missing teeth',
            short: 'Permanent, natural-looking replacements for missing teeth, placed by experienced implant dentists.',
            meta: 'Replace missing teeth with dental implants from £2,495 at Brightwell Dental. Consultation, 3D scans and 0% finance at our Midlands implant centres.',
            headline: 'Replace missing teeth for good',
            intro: 'A dental implant is the closest thing to a natural tooth. It\'s fixed in place, looks completely natural and lets you eat, smile and talk with confidence again.',
            what: 'A small titanium post placed in your jaw where the root of your tooth used to be. Once it has healed, we fit a crown on top that\'s colour-matched to your other teeth.',
            who: ['Anyone missing one or more teeth', 'People tired of loose dentures', 'Patients with healthy gums and enough bone, or who can have bone grafting'],
            steps: [['Consultation & 3D scan', 'We check your gums and bone and talk through every option, including alternatives.'], ['Your written plan', 'A clear timeline and a fixed price before anything starts.'], ['Placing the implant', 'A gentle procedure under local anaesthetic, with sedation if you prefer.'], ['Your new tooth', 'After healing, usually 3 to 4 months, we fit your custom crown.']],
            prices: [['Implant consultation with 3D scan', 'Redeemable against treatment', '£95'], ['Single implant with crown', '', '£2,495'], ['Implant-retained denture', 'Per arch', '£5,995'], ['Bone grafting', 'If needed', 'From £450']],
            financeNote: '0% finance over 12 months, or spread the cost over up to 60 months. Subject to status.',
            faqs: [['Does it hurt?', 'The procedure is done under local anaesthetic, so you shouldn\'t feel pain. Most people say it was easier than having a tooth out. Sedation is available if you\'re anxious.'], ['How long do implants last?', 'With good care and regular check-ups, implants can last for many years, often decades.'], ['Am I suitable?', 'Most adults with healthy gums are. Smoking and some medical conditions can affect healing, which we\'ll discuss at your consultation.'], ['Can I have implants on the NHS?', 'Implants are rarely available on the NHS and only in specific clinical circumstances. We\'ll explain your NHS and private options.']],
            cta: 'Book an implant consultation at our Edgbaston or Nottingham implant centres.'
        },
        {
            id: 'whitening', name: 'Teeth whitening', page: 'treatment-whitening.html', from: '£295', fromNum: 295, duration: '30 mins',
            img: '1580489944761-15a19d654956', imgAlt: 'A smiling woman with naturally bright teeth', titleTail: 'Professional teeth whitening',
            short: 'Safe, dentist-led whitening that lifts years of stains. Home kits or in-chair treatment.',
            meta: 'Professional teeth whitening from £295 at Brightwell Dental. Safe, dentist-led home and in-chair whitening at 12 practices across the Midlands.',
            headline: 'A brighter smile, done safely',
            intro: 'Coffee, tea and time all leave their mark. Professional whitening lifts stains gently and safely, with results you can see within a couple of weeks.',
            what: 'Dentist-prescribed whitening gel in custom trays you wear at home, or a faster in-chair treatment. Unlike salon or online kits, it\'s legal, safe and supervised by a dentist.',
            who: ['Adults with healthy teeth and gums', 'Anyone with stains from coffee, tea, red wine or smoking', 'People preparing for a wedding or big event'],
            steps: [['Quick check', 'We make sure your teeth and gums are healthy enough for whitening.'], ['Custom trays', 'We scan your teeth and make trays that fit perfectly.'], ['Whiten at home', 'Wear your trays for a short time each day for 2 to 3 weeks.'], ['Keep it bright', 'Top-up gel keeps your smile bright for longer.']],
            prices: [['Home whitening kit', 'Custom trays and gel', '£295'], ['In-chair whitening', 'Plus home top-up kit', '£495'], ['Top-up gel', '', '£35']],
            faqs: [['Is whitening safe?', 'Yes, when it\'s done by a dentist. In the UK it\'s only legal for dentists to provide whitening with effective strength gel, because they check your teeth are healthy first.'], ['Will it make my teeth sensitive?', 'Some people feel mild, temporary sensitivity. We give you a gel and routine to keep it to a minimum.'], ['How long does it last?', 'Results usually last a year or more, depending on what you eat and drink. Occasional top-ups keep it fresh.'], ['Will it whiten crowns or fillings?', 'No. Whitening only works on natural teeth, so we\'ll talk you through options if you have visible crowns or fillings.']],
            cta: 'Whitening appointments at all 12 practices.'
        },
        { id: 'emergency', name: 'Emergency appointment', from: '£85', fromNum: 85, duration: '30 mins', nhs: true, short: 'Same-day help for toothache, swelling, broken teeth and lost fillings.' },
        { id: 'hygiene', name: 'Hygienist clean', from: '£75', fromNum: 75, duration: '30 mins', short: 'A deep, gentle clean that keeps gums healthy and teeth looking their best.' },
        { id: 'bonding', name: 'Composite bonding', from: '£195', fromNum: 195, duration: '60 mins', short: 'Repair chips and close small gaps in a single visit, with no drilling.' },
        { id: 'children', name: 'Children\'s dentistry', from: 'Free', fromNum: 0, duration: '20 mins', nhs: true, short: 'Fun, gentle visits that help children grow up unafraid of the dentist.' }
    ],

    fees: [
        { group: 'Check-ups & hygiene', items: [['New patient examination', 'Including X-rays if needed', '£65'], ['Check-up', '', '£55'], ['Hygienist appointment', '30 minutes', '£75'], ['Children\'s check-up', 'Under 18, with a parent on a plan', 'Free']] },
        { group: 'Emergency care', items: [['Emergency appointment', 'Same day, includes pain relief', '£85'], ['Out-of-hours emergency', 'Evenings and weekends', '£150']] },
        { group: 'Fillings & restorative', items: [['White filling', 'Per tooth', 'From £120'], ['Root canal treatment', 'Front to back teeth', 'From £395'], ['Crown', 'Porcelain or zirconia', 'From £595'], ['Composite bonding', 'Per tooth', '£195']] },
        { group: 'Cosmetic & straightening', items: [['Teeth whitening', 'Home kit', '£295'], ['In-chair whitening', 'Plus home top-up kit', '£495'], ['Clear aligners', 'Mild to complex cases', 'From £1,995']] },
        { group: 'Implants', items: [['Implant consultation with 3D scan', 'Redeemable against treatment', '£95'], ['Single implant with crown', '', '£2,495']] },
        { group: 'NHS dentistry', note: 'NHS charges are set nationally and are the same at every practice in England. We\'ll always tell you which band applies before treatment. <a href="https://www.nhs.uk/nhs-services/dentists/dental-costs/" rel="noopener">See current NHS dental charges on nhs.uk</a>.', items: [['Band 1', 'Examination, diagnosis, X-rays, scale and polish', 'NHS Band 1'], ['Band 2', 'Band 1 plus fillings, root canal and extractions', 'NHS Band 2'], ['Band 3', 'Band 2 plus crowns, dentures and bridges', 'NHS Band 3'], ['Urgent treatment', '', 'NHS Band 1']] }
    ],

    team: [
        { name: 'Dr Amara Okafor', role: 'Clinical Director', bio: 'Leads clinical standards across all 12 practices and still sees patients every week in Nottingham.', creds: 'BDS, MJDF', practice: 'Brightwell Nottingham', img: '1531123897727-8f129e1688ce', alt: 'Portrait of Dr Amara Okafor' },
        { name: 'Dr Rohan Mehta', role: 'Implant Dentist', bio: 'Has placed implants for over a decade and loves seeing patients eat their favourite foods again.', creds: 'BDS, MSc Implant Dentistry', practice: 'Brightwell Edgbaston', img: '1612349317150-e413f6a5b16d', alt: 'Portrait of Dr Rohan Mehta' },
        { name: 'Dr Sophie Hartley', role: 'Cosmetic & Aligner Lead', bio: 'Plans every clear aligner case in the group and believes the best results look completely natural.', creds: 'BDS, PG Cert Orthodontics', practice: 'Brightwell Leicester', img: '1559839734-2b71ea197ec2', alt: 'Portrait of Dr Sophie Hartley' },
        { name: 'Dr Tom Ellison', role: 'Dentist, nervous patients', bio: 'Known for his calm manner and patience. Many of his patients hadn\'t seen a dentist for years.', creds: 'BDS', practice: 'Brightwell Nottingham', img: '1500648767791-00dcc994a43e', alt: 'Portrait of Dr Tom Ellison' },
        { name: 'Priya Kaur', role: 'Dental Hygienist', bio: 'Makes hygiene visits genuinely relaxing, with plenty of practical tips that actually stick.', creds: 'Dip Dental Hygiene', practice: 'Brightwell Derby', img: '1629909615184-74f495363b67', alt: 'Priya Kaur, dental hygienist, wearing a mask and holding dental instruments' },
        { name: 'Hannah Brooks', role: 'Treatment Coordinator', bio: 'Walks you through prices, finance and next steps, so there are never any surprises.', creds: 'Patient care team', practice: 'Brightwell Nottingham', img: '1573496359142-b8d87734a5a2', alt: 'Portrait of Hannah Brooks' }
    ],

    reviews: [
        { stars: 5, text: 'I hadn\'t been to a dentist in eight years because of nerves. Dr Ellison was so patient and explained every step. I actually left smiling.', name: 'Sarah, 41', where: 'Nottingham' },
        { stars: 5, text: 'Booked online at 10pm on a Sunday and was seen at 8am the next morning with a cracked tooth. Brilliant from start to finish.', name: 'James, 33', where: 'Leicester' },
        { stars: 5, text: 'My aligner treatment took seven months and nobody at work noticed. The finance made it really affordable too.', name: 'Priya, 28', where: 'Edgbaston' },
        { stars: 4, text: 'Friendly team and a really clean, calm practice. Parking was a bit tight but the late appointments are a lifesaver.', name: 'Mark, 52', where: 'Derby' },
        { stars: 5, text: 'Both my children now actually look forward to their check-ups. That says it all.', name: 'Laura, 37', where: 'Solihull' },
        { stars: 5, text: 'Clear prices before anything started, no pressure, and my implant looks just like my other teeth.', name: 'David, 64', where: 'Edgbaston' }
    ],

    calls: {
        checkup: {
            tab: 'Booking a check-up', title: 'New patient books a check-up', summary: 'A new patient calls at 7:42pm, after reception has closed. The AI books them in and texts a confirmation.',
            callerLabel: 'Incoming call · 07700 900341', line: 'Brightwell Nottingham · 7:42pm', aiName: 'Brightwell AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Good evening, you\'re through to Brightwell Dental, Nottingham. I\'m the AI receptionist. How can I help?' },
                { who: 'caller', text: 'Hi, I\'ve just moved to the area and I need to register and book a check-up.' },
                { who: 'ai', text: 'Welcome to Nottingham! I can do both right now. Would you like an NHS or private check-up?' },
                { who: 'caller', text: 'Private is fine. Have you got anything early next week? Ideally before work.' },
                { event: { icon: 'cal', title: 'Checked availability', detail: 'Nottingham · early appointments, next 7 days' } },
                { who: 'ai', text: 'I have Tuesday at 8:00am or Wednesday at 8:30am with Dr Ellison. A new patient exam is £65, including X-rays if you need them.' },
                { who: 'caller', text: 'Tuesday at 8 is perfect.' },
                { who: 'ai', text: 'Lovely. Can I take your full name and the best mobile number for a text confirmation?' },
                { who: 'caller', text: 'It\'s Emma Clarke, 07700 900341.' },
                { event: { icon: 'user', title: 'New patient registered', detail: 'Emma Clarke · details added to records' } },
                { event: { icon: 'check', title: 'Appointment booked', detail: 'Tue 8:00am · New patient exam · Dr Ellison' } },
                { who: 'ai', text: 'You\'re booked in for Tuesday at 8am with Dr Ellison. I\'ve just texted you the details and a link to fill in your medical history before you come in.' },
                { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'Includes address, parking info and forms link' } },
                { who: 'caller', text: 'Amazing, thank you!' },
                { who: 'ai', text: 'You\'re welcome, Emma. See you on Tuesday. Have a lovely evening.' },
                { event: { icon: 'note', title: 'Call summary sent to reception', detail: 'Ready for the team at 8am' } }
            ]
        },
        urgent: {
            tab: 'Urgent dental pain', title: 'Urgent call handed to a human', summary: 'A caller describes swelling that\'s affecting their swallowing. The AI recognises the warning signs and transfers the call straight to the on-call dentist.',
            callerLabel: 'Incoming call · 07700 900582', line: 'Brightwell Leicester · Saturday 6:15pm', aiName: 'Brightwell AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Hello, Brightwell Dental, Leicester. I\'m the AI receptionist. How can I help?' },
                { who: 'caller', text: 'I\'ve had a really bad toothache for two days and now my face is swollen. It\'s getting hard to swallow.' },
                { event: { icon: 'alert', title: 'Urgent symptoms detected', detail: 'Facial swelling + difficulty swallowing', urgent: true } },
                { who: 'ai', text: 'I\'m sorry you\'re going through that. Swelling that makes it hard to swallow needs looking at urgently. If you find it hard to breathe at any point, please call 999 straight away.' },
                { who: 'ai', text: 'I\'m putting you through to our on-call dentist right now. Please stay on the line.' },
                { event: { icon: 'phone', title: 'Transferred to on-call dentist', detail: 'Live handover · caller kept on the line', urgent: true } },
                { who: 'system', text: 'Call transferred to Dr Ellison (on call)' },
                { event: { icon: 'note', title: 'Notes passed to dentist', detail: 'Symptoms, duration and caller number shared' } }
            ]
        }
    },
    callIds: ['checkup', 'urgent'],

    sales: {
        headerBook: 'Booking button visible on every screen: fewer visitors leave without booking.',
        heroButtons: 'Book and Call above the fold on mobile: patients act in the first five seconds, not after scrolling.',
        finder: 'One site for all 12 practices: patients find their nearest in seconds, and new acquisitions go live in a day.',
        prices: '"From" prices on every treatment: fewer price-shopping calls, more ready-to-book patients.',
        urgent: 'Urgent care front and centre: emergency patients become long-term patients.',
        ai: 'AI receptionist answers 24/7: no more lost bookings at 7pm or weekends, with urgent calls passed to a human.',
        reviews: 'Reviews right where patients decide: social proof that lifts booking rates.',
        offer: 'New patient offer with email capture: turns browsers into leads you can follow up.',
        fees: 'Transparent price list: builds trust and cuts "how much is…" calls to reception.',
        booking: 'Five-step online booking: patients book at midnight without anyone answering the phone.',
        lead: 'Lead capture form: every new patient enquiry lands in your inbox, ready to convert.'
    },

    locationExtra: {
        meta: 'Brightwell Nottingham: NHS and private dentist in Nottingham city centre. Late appointments until 8pm, Saturday opening and same-day emergencies. Book online.',
        intro: 'Our flagship practice in the heart of Nottingham, with seven surgeries, late appointments until 8pm and a calm, light-filled space that feels nothing like a typical dentist.',
        img: '1598256989800-fe5f95da9787', imgAlt: 'A bright, modern dental surgery with a warm orange chair',
        access: ['Step-free access and a ground-floor surgery', '2 minutes from the Old Market Square tram stop', 'Pay-and-display parking on Larkspur Lane', 'Hearing loop at reception'],
        teamTitle: 'Friendly faces you\'ll get to know',
        cta: 'Evening appointments until 8pm, Monday and Wednesday.'
    },

    copy: {
        unit: 'practice', unitPlural: 'practices', unitTitle: 'Dentist', patientsWord: 'patients',
        bookLabel: 'Book now', navLocations: 'Find a practice', navTreatments: 'Treatments', navFees: 'Prices', navTeam: 'Our team', navOffers: 'New patients',
        titleHome: 'Brightwell Dental Group | Dentists across the Midlands | Book online',
        metaHome: 'Friendly NHS and private dentists at 12 practices across the Midlands. Early, late and Saturday appointments, same-day emergencies and online booking 24/7.',
        heroPill: '12 practices across the Midlands',
        heroTitle: 'The dentist you <em>won\'t</em> dread',
        heroLede: 'Gentle, unhurried care from people who genuinely like what they do. Early, late and Saturday appointments, clear prices and same-day help when it hurts.',
        heroTrust: ['NHS & private', 'Same-day emergencies', '0% finance available'],
        heroFloat1: '<span class="float-dot" aria-hidden="true"></span><span><strong>Next appointment</strong>Tomorrow, 8:00am</span>',
        heroFloat2: '<span><strong>Rated 4.9 ★</strong>Sample rating for this demo</span>',
        whys: [
            { icon: 'clock', title: 'Early, late & Saturdays', text: 'Appointments from 8am and until 8pm at selected practices, so you don\'t lose a day at work.' },
            { icon: 'heart', title: 'Gentle with nerves', text: 'Longer appointments, a stop signal and sedation options. Many of our patients were nervous too.' },
            { icon: 'pound', title: 'Clear, honest prices', text: 'Written prices before any treatment and 0% finance on bigger treatments. No surprises.' },
            { icon: 'shield', title: 'NHS & private', text: 'NHS dentistry where we have availability, and private care with shorter waits.' }
        ],
        finderEyebrow: 'Find your practice', finderTitle: 'There\'s a Brightwell near you', finderLede: 'Search by postcode or town, or let us find your nearest practice. Every practice offers online booking and same-day emergencies.', finderExample: 'NG1 or Derby',
        locationsTitle: 'Find a Brightwell practice', locationsLede: '12 practices across the Midlands, from Lincoln to Wolverhampton, all with the same standard of care and the same easy online booking.',
        treatEyebrow: 'Treatments', treatTitle: 'Everything your smile needs, under one roof', treatLede: 'From routine check-ups to life-changing implants, with clear "from" prices so you know where you stand.', treatmentsTitle: 'Our treatments',
        urgentSection: { eyebrow: 'Dental emergency?', title: 'In pain? We\'ll see you today.', text: 'Toothache, swelling, a broken tooth or a lost filling. Every practice keeps same-day emergency slots, and our phone line answers 24/7.' },
        aiEyebrow: 'Answered 24/7', aiTitle: 'Every call answered, even at 7pm on a Sunday', aiLede: 'Our AI receptionist answers when the practice is busy or closed. It books appointments, answers questions about prices and parking, and always puts urgent calls through to a person.', aiFoot: 'This is a simulated example call for demonstration. Urgent or clinical calls are always passed to a member of our team.',
        reviewsEyebrow: 'Patient stories', reviewsTitle: 'What our patients say', reviewsLede: 'Example reviews showing how real patient feedback would appear on this site.',
        teamEyebrow: 'Our team', teamTitle: 'Dentists who put you at ease', teamLede: 'Experienced, friendly clinicians who take the time to listen. You\'ll always know who\'s looking after you.', teamPageTitle: 'Meet the Brightwell team',
        offerEyebrow: 'New patients', offerTitle: 'New patient exam, X-rays & hygiene clean for £99', offerText: 'Usually £140. Join Brightwell and get a full check-up, any X-rays you need and a hygienist clean in one visit.', offerCta: 'Claim the new patient offer',
        ctaTitle: 'Ready when you are', ctaText: 'Book online in under a minute, or call and our team (or our AI receptionist) will help.',
        titleLocations: 'Find a dentist near you | 12 Midlands practices | Brightwell Dental', metaLocations: 'Find your nearest Brightwell Dental practice by postcode or town. 12 practices across Nottingham, Derby, Leicester, Birmingham, Coventry and the Midlands.',
        titleTreatments: 'Dental treatments & prices | Brightwell Dental Group', metaTreatments: 'Check-ups, hygiene, clear aligners, implants, whitening, bonding and emergency dentistry at 12 Midlands practices, with clear "from" prices.',
        titleFees: 'Dental price list | NHS & private fees | Brightwell Dental', metaFees: 'Our full private price list and NHS band information, with 0% finance on larger treatments. No hidden costs, ever.',
        feesEyebrow: 'Fee guide', feesTitle: 'Clear prices. No surprises.', feesLede: 'Every price, in one place. You\'ll always get a written plan with your exact cost before any treatment starts.', feesNotice: '',
        feesFoot: 'Prices are for this demo and are illustrative. 0% finance available on treatments over £1,000, subject to status.',
        titleBook: 'Book a dentist appointment online | Brightwell Dental', metaBook: 'Book a dental appointment online in under a minute at any of our 12 Midlands practices. Instant confirmation by text.',
        bookTitle: 'Book your appointment', bookLede: 'It takes less than a minute. You\'ll get an instant text confirmation.', bookStep1: 'All practices offer the same treatments and online booking.', bookStep2Title: 'What would you like to book?', bookStep2: 'Not sure? Choose a check-up and we\'ll take it from there.', stepTreatment: 'Treatment',
        bookExtraField: '<div class="k-field"><label for="bf-type">Are you a new or existing patient?</label><select id="bf-type" name="ptype"><option>New patient</option><option>Existing patient</option></select></div>',
        bookNotesPh: 'e.g. I\'m a nervous patient, or I need step-free access', bookFoot: 'Prefer to talk? Call us any time on',
        titleTeam: 'Our dentists & team | Brightwell Dental Group', metaTeam: 'Meet the friendly dentists, hygienists and patient care team across Brightwell Dental\'s 12 Midlands practices.',
        titleOffers: 'New patient offer: exam, X-rays & clean £99 | Brightwell Dental', metaOffers: 'Join Brightwell Dental and get a new patient exam, X-rays and hygienist clean for £99 (usually £140) at any of our 12 practices.',
        offersTitle: 'Join Brightwell for £99', offersLede: 'Everything you need to get your smile back on track, in one relaxed visit.',
        offersPoints: ['Full examination with your new dentist', 'Any X-rays you need', '30-minute hygienist clean', 'A clear, written plan with prices', 'Usually £140, save £41'],
        offersSmall: 'New private patients only. One per person. Available at all 12 practices. This is a demo offer.',
        offersFormTitle: 'Claim your £99 new patient visit', offersButton: 'Send me my offer', offersSuccessTitle: 'Your offer is on its way', offersSuccess: 'Check your inbox for your offer code. You can book straight away online.',
        accessPractices: 'Most of our practices have step-free access and ground-floor surgeries. Hearing loops are available at reception, and we\'re happy to book longer appointments for anyone who needs extra time. Check each practice page for parking and access details.',
        privacyHealth: 'Medical and dental history, so we can treat you safely.',
        hoursNote: 'Most practices: Mon to Fri 8:30am to 5:30pm, Sat 9am to 1pm. Late appointments at selected practices.',
        footerAbout: 'Friendly NHS and private dentistry at 12 practices across the Midlands.',
        regLine: 'Registered with the Care Quality Commission (fictional demo).'
    }
};
