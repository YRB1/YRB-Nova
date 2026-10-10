/* Hollow Oak Vets — fictional 9-clinic small-animal vet group in the South West (demo by YRB Nova).
   Phone numbers use Ofcom's reserved drama ranges, so they never reach a real business. */
const wk = (o, c, sat, sun) => ({ 0: sun || null, 1: [o, c], 2: [o, c], 3: [o, c], 4: [o, c], 5: [o, c], 6: sat || ['09:00', '13:00'] });

module.exports = {
    id: 'hollow-oak-vets',
    name: 'Hollow Oak Vets',
    shortName: 'Hollow Oak Vets',
    region: 'South West',
    refPrefix: 'HO',
    schemaType: 'VeterinaryCare',
    phone: '0117 496 0300',
    email: 'hello@hollowoakvets.example',
    themeColor: '#3E6B48',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,800&display=swap',
    favicon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="20" fill="#3E6B48"/><circle cx="32" cy="27" r="14" fill="#F4C26B"/><rect x="29" y="34" width="6" height="18" rx="3" fill="#8B5E3C"/></svg>',
    logo: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="14" fill="#3E6B48"/><path d="M20 7c-6 0-10 4.4-10 9.6 0 4 2.4 6.6 5.4 7.6.7 3.6-.8 6.4-2.6 8.8h14.4c-1.8-2.4-3.3-5.2-2.6-8.8 3-1 5.4-3.6 5.4-7.6C30 11.4 26 7 20 7z" fill="#F4C26B"/><ellipse cx="20" cy="27" rx="2.4" ry="3.4" fill="#3E6B48"/><circle cx="16" cy="15" r="1.6" fill="#3E6B48"/><circle cx="24" cy="14" r="1.6" fill="#3E6B48"/><circle cx="20" cy="11.5" r="1.6" fill="#3E6B48"/></svg>',
    logoText: 'Hollow Oak<span class="logo-sub">Vets</span>',
    ogImage: '1543466835-00a7907e9de1',
    heroImg: '1543466835-00a7907e9de1',
    heroAlt: 'A happy beagle looking up at the camera',
    heroFloat1Pos: 'left:12px;bottom:16px;',
    heroFloat2Pos: 'right:12px;top:16px;',
    urgentPhone: '0117 496 0999',
    urgentTreatment: 'urgent',
    glows: ['width:420px;height:420px;background:#F4C26B;top:-150px;right:-120px', 'width:380px;height:380px;background:#A9C9A4;bottom:-170px;left:-140px'],

    urgent: {
        label: 'Emergency vet care',
        html: 'Worried about your pet? Our emergency line is open 24/7. <a href="tel:01174960999">Call 0117 496 0999</a> now'
    },

    practices: [
        { id: 'bristol', name: 'Hollow Oak Bristol', town: 'Bristol', street: '8 Willowmead Lane', postcode: 'BS6', address: '8 Willowmead Lane, Bristol BS6', phone: '0117 496 0318', lat: 51.4710, lng: -2.5980, hours: wk('08:00', '19:00', ['09:00', '17:00'], ['10:00', '16:00']), page: 'location-bristol.html', tags: ['Hospital', '24/7 emergencies'] },
        { id: 'bath', name: 'Hollow Oak Bath', town: 'Bath', street: '14 Larkhall Mews', postcode: 'BA1', address: '14 Larkhall Mews, Bath BA1', phone: '01632 960612', lat: 51.3858, lng: -2.3620, hours: wk('08:30', '18:30') },
        { id: 'exeter', name: 'Hollow Oak Exeter', town: 'Exeter', street: '3 Orchard Rise', postcode: 'EX4', address: '3 Orchard Rise, Exeter EX4', phone: '01632 960634', lat: 50.7260, lng: -3.5275, hours: wk('08:30', '18:30', ['09:00', '15:00']), tags: ['Hospital'] },
        { id: 'taunton', name: 'Hollow Oak Taunton', town: 'Taunton', street: '21 Meadowsweet Way', postcode: 'TA1', address: '21 Meadowsweet Way, Taunton TA1', phone: '01632 960655', lat: 51.0150, lng: -3.1030, hours: wk('08:30', '18:00') },
        { id: 'cheltenham', name: 'Hollow Oak Cheltenham', town: 'Cheltenham', street: '6 Linden Court', postcode: 'GL50', address: '6 Linden Court, Cheltenham GL50', phone: '01632 960671', lat: 51.8990, lng: -2.0780, hours: wk('08:30', '18:30') },
        { id: 'gloucester', name: 'Hollow Oak Gloucester', town: 'Gloucester', street: '40 Hazelwood Road', postcode: 'GL1', address: '40 Hazelwood Road, Gloucester GL1', phone: '01632 960688', lat: 51.8640, lng: -2.2380, hours: wk('08:30', '18:00') },
        { id: 'swindon', name: 'Hollow Oak Swindon', town: 'Swindon', street: '12 Kingfisher Close', postcode: 'SN1', address: '12 Kingfisher Close, Swindon SN1', phone: '01632 960694', lat: 51.5580, lng: -1.7810, hours: wk('08:30', '18:30') },
        { id: 'plymouth', name: 'Hollow Oak Plymouth', town: 'Plymouth', street: '9 Harbourview Terrace', postcode: 'PL4', address: '9 Harbourview Terrace, Plymouth PL4', phone: '01632 960707', lat: 50.3720, lng: -4.1330, hours: wk('08:30', '18:30', ['09:00', '15:00']) },
        { id: 'truro', name: 'Hollow Oak Truro', town: 'Truro', street: '2 Fernside Yard', postcode: 'TR1', address: '2 Fernside Yard, Truro TR1', phone: '01632 960719', lat: 50.2630, lng: -5.0510, hours: wk('08:30', '18:00') }
    ],

    treatments: [
        {
            id: 'vaccinations', name: 'Vaccinations', page: 'treatment-vaccinations.html', from: '£55', fromNum: 55, duration: '20 mins',
            img: '1628009368231-7bb7cfcb0def', imgAlt: 'A vet gently examining a calm tabby cat', titleTail: 'Dog, cat & rabbit vaccinations',
            short: 'Puppy, kitten and booster vaccinations with a full health check every time.',
            meta: 'Dog, cat and rabbit vaccinations from £55 at Hollow Oak Vets, with a full nose-to-tail health check. 9 clinics across the South West. Book online.',
            headline: 'Protection that starts with a proper health check',
            intro: 'Every vaccination appointment includes an unhurried nose-to-tail check, so we catch small problems early and you get to ask everything you\'ve been wondering about.',
            what: 'Vaccines that protect your pet against serious, sometimes fatal diseases like parvovirus, distemper, cat flu and myxomatosis. Puppies and kittens need a starter course, then a yearly booster keeps protection up.',
            who: ['Puppies from 8 weeks and kittens from 9 weeks', 'Adult dogs, cats and rabbits due a booster', 'Pets whose vaccinations have lapsed (we\'ll restart them safely)', 'Dogs going into kennels or travelling'],
            steps: [['Book online', 'Choose your clinic and a time, including Saturday mornings.'], ['Health check', 'Heart, eyes, ears, teeth, weight and coat, checked gently.'], ['Vaccination', 'A quick injection, with plenty of treats and fuss.'], ['Reminder set', 'We text you when the next booster is due.']],
            prices: [['Puppy or kitten starter course', 'Two injections and two health checks', '£95'], ['Dog annual booster', 'Including health check', '£55'], ['Cat annual booster', 'Including health check', '£55'], ['Rabbit annual booster', 'Including health check', '£59'], ['Kennel cough vaccine', 'Nasal, no injection', '£38']],
            financeNote: 'All routine vaccinations are included in our Pet Health Plans from £16.99 a month.',
            faqs: [['When should my puppy or kitten be vaccinated?', 'Puppies can start from 8 weeks and kittens from 9 weeks, with a second injection 2 to 4 weeks later. We\'ll talk you through when it\'s safe to go out.'], ['Do adult pets really need yearly boosters?', 'Some parts of the vaccine last longer than others, so a yearly booster keeps every part of the protection up to date. Your vet will tailor it to your pet\'s lifestyle.'], ['Are there side effects?', 'Most pets are completely fine. Some feel a little quiet or sore for a day. Serious reactions are very rare and we\'ll always explain what to look out for.'], ['My pet\'s vaccinations have lapsed. Is that a problem?', 'Not at all. We\'ll simply restart the course so your pet is fully protected again.']],
            cta: 'Vaccination appointments at all 9 clinics, including Saturdays.'
        },
        {
            id: 'neutering', name: 'Neutering', page: 'treatment-neutering.html', from: '£185', fromNum: 185, duration: 'Day procedure',
            img: '1507146426996-ef05306b995a', imgAlt: 'A golden puppy with a red collar looking curious', titleTail: 'Dog & cat neutering',
            short: 'Safe, day-case neutering with pain relief, a pre-op check and post-op check-ups included.',
            meta: 'Dog and cat neutering from £185 at Hollow Oak Vets. Pre-op check, pain relief and post-op check-ups included, with clear fixed prices. 9 South West clinics.',
            headline: 'Neutering with care, and with clear prices',
            intro: 'It\'s natural to feel nervous about your pet having an operation. Our team does this every day, with gentle handling, proper pain relief and plenty of updates for you.',
            what: 'A routine operation (spaying for females, castration for males) that prevents unwanted litters and can reduce the risk of some cancers and behaviour problems. Most pets go home the same day.',
            who: ['Cats from 4 months', 'Dogs from 6 months, depending on breed and size', 'Rabbits from around 4 to 6 months'],
            steps: [['Pre-op check', 'A free consultation to check your pet is fit for surgery and answer your questions.'], ['Drop off in the morning', 'Your pet is settled in a quiet, warm kennel by our nurses.'], ['Surgery & recovery', 'Monitored throughout by a vet and nurse, with pain relief.'], ['Home the same day', 'Plus free post-op checks at 3 and 10 days.']],
            prices: [['Cat castrate', '', '£115'], ['Cat spay', '', '£145'], ['Dog castrate', 'Under 20kg', '£185'], ['Dog spay', 'Under 20kg', '£295'], ['Dog spay', '20kg and over', '£365'], ['Rabbit neuter', '', '£135']],
            financeNote: 'All prices include the pre-op check, anaesthetic, pain relief and post-op checks. Pet Health Plan members save 10%.',
            faqs: [['Is neutering painful?', 'Your pet is fully anaesthetised during the operation and goes home with pain relief. Most are back to their usual selves within a few days.'], ['Will it change my pet\'s personality?', 'Your pet will still be your pet. Neutering can calm some hormone-driven behaviours like roaming or marking, but it won\'t change their character.'], ['Does my pet need a buster collar?', 'Usually, yes, or a soft recovery suit, to stop them licking the wound. We\'ll provide one.'], ['Can I stay with my pet?', 'You\'ll drop them off in the morning and we\'ll call you as soon as they\'re awake, usually by lunchtime.']],
            cta: 'Free pre-op consultations at all 9 clinics.'
        },
        {
            id: 'dental', name: 'Pet dental care', page: 'treatment-pet-dental.html', from: '£295', fromNum: 295, duration: 'Day procedure',
            img: '1537151625747-768eb6cf92b2', imgAlt: 'A corgi puppy with a big smile', titleTail: 'Dog & cat dental care',
            short: 'Free dental checks, scale and polish, and gentle extractions when teeth are causing pain.',
            meta: 'Dog and cat dental care at Hollow Oak Vets: free nurse dental checks, scale and polish from £295 and clear fixed prices. 9 clinics across the South West.',
            headline: 'Healthy teeth mean a happier, longer life',
            intro: 'Most dogs and cats over three have some dental disease, and they\'re experts at hiding the pain. A clean mouth can transform how they eat, play and feel.',
            what: 'A thorough clean under anaesthetic to remove tartar above and below the gumline, a full check of every tooth, and gentle removal of any teeth that are causing pain.',
            who: ['Pets with bad breath, red gums or brown tartar', 'Dogs and cats who chew on one side or drop food', 'Older pets who haven\'t had a dental check recently'],
            steps: [['Free nurse dental check', 'We look at your pet\'s mouth and give you a written estimate.'], ['Dental day', 'A full clean and check under anaesthetic, with dental X-rays where needed.'], ['Home the same day', 'With pain relief and soft food tips.'], ['Keep it clean', 'Simple home care advice so you don\'t need another one soon.']],
            prices: [['Nurse dental check', '', 'Free'], ['Scale & polish', 'Dog or cat, including anaesthetic', '£295'], ['Dental X-rays', '', '£95'], ['Extractions', 'Per tooth, depending on complexity', 'From £35']],
            financeNote: 'We always give you a written estimate before the procedure and call you if anything changes.',
            faqs: [['Why does my pet need an anaesthetic?', 'Cleaning under the gumline, where most disease is, can\'t be done safely while your pet is awake. Anaesthetic also lets us take X-rays and check every tooth.'], ['How do I know if my pet has dental pain?', 'Look for bad breath, red gums, dropping food, chewing on one side or pawing at the mouth. Many pets show no signs at all, which is why checks matter.'], ['Can I brush my pet\'s teeth?', 'Yes, and it\'s the best thing you can do. Our nurses will show you how, with pet-safe toothpaste.'], ['Is dental care covered by insurance?', 'Some policies cover dental treatment after an accident or illness. Check your policy, and we\'re happy to help with claims.']],
            cta: 'Book a free nurse dental check at any clinic.'
        },
        {
            id: 'plans', name: 'Pet Health Plans', page: 'treatment-health-plans.html', from: '£16.99/month', fromNum: 16.99, duration: 'Monthly plan',
            img: '1581888227599-779811939961', imgAlt: 'A happy dog resting in a cosy dog bed', titleTail: 'Spread the cost of routine pet care',
            short: 'Vaccinations, flea and worm treatment and check-ups in one easy monthly payment.',
            meta: 'Pet Health Plans from £16.99 a month at Hollow Oak Vets: vaccinations, flea and worm treatment, two health checks and 10% off other treatment.',
            headline: 'All their routine care, in one monthly payment',
            intro: 'No more surprise bills for the basics. Our Pet Health Plans cover the routine care your pet needs to stay healthy, and you save money compared with paying separately.',
            what: 'A monthly plan that includes annual vaccinations, year-round flea and worm treatment, two health checks a year and discounts on other treatment. It isn\'t insurance, but it works brilliantly alongside it.',
            who: ['Dogs, cats and rabbits of any age', 'New puppies and kittens (with a starter plan)', 'Owners who like to know exactly what they\'ll spend each month'],
            steps: [['Choose a plan', 'Pick the plan for your pet\'s species and size.'], ['Sign up online or in clinic', 'Set up a simple monthly direct debit.'], ['Care, all year', 'Book included treatments whenever they\'re due.'], ['Save as you go', 'Members get 10% off most other treatment.']],
            prices: [['Cat plan', 'Vaccinations, flea & worm, 2 health checks', '£16.99/month'], ['Small dog plan', 'Under 10kg', '£18.99/month'], ['Medium dog plan', '10kg to 25kg', '£21.99/month'], ['Large dog plan', 'Over 25kg', '£25.99/month'], ['Rabbit plan', 'Vaccinations and 2 health checks', '£11.99/month']],
            financeNote: 'Members save an average of £150 a year compared with paying for the same care separately (illustrative figure for this demo).',
            faqs: [['Is a health plan the same as insurance?', 'No. A plan covers routine, preventative care. Insurance covers unexpected illness and accidents. Most owners have both.'], ['Can I cancel?', 'Yes, after 12 months you can cancel at any time. If you cancel early, you just pay the difference for anything you\'ve already used.'], ['Can I use my plan at any clinic?', 'Yes, at all 9 Hollow Oak clinics.'], ['Does it cover emergencies?', 'It doesn\'t cover the cost of emergency treatment, but members get 10% off most treatment, including some emergency care.']],
            cta: 'Join in clinic or online. Your pet\'s cover starts straight away.'
        },
        { id: 'consult', name: 'Vet consultation', from: '£52', fromNum: 52, duration: '15 mins', short: 'A full consultation for any worry, big or small.' },
        { id: 'urgent', name: 'Urgent same-day appointment', from: '£75', fromNum: 75, duration: '20 mins', short: 'Same-day appointments for poorly pets, at every clinic.' },
        { id: 'microchip', name: 'Microchipping', from: '£25', fromNum: 25, duration: '10 mins', short: 'Quick, permanent ID. A legal requirement for dogs and now for cats in England too.' },
        { id: 'nurse', name: 'Nurse clinic', from: 'Free', fromNum: 0, duration: '20 mins', short: 'Weight checks, nail clips, puppy advice and post-op checks.' }
    ],

    fees: [
        { group: 'Consultations', items: [['Vet consultation', '15 minutes, any species', '£52'], ['Second opinion consultation', '30 minutes', '£85'], ['Nurse clinic', 'Weight checks, advice, post-op checks', 'Free'], ['Repeat prescription', 'Per prescription', '£19']] },
        { group: 'Vaccinations', items: [['Puppy or kitten starter course', 'Two injections and two health checks', '£95'], ['Annual booster', 'Dog or cat, including health check', '£55'], ['Rabbit annual booster', '', '£59'], ['Kennel cough vaccine', '', '£38']] },
        { group: 'Neutering', note: 'Prices include pre-op check, anaesthetic, pain relief and post-op checks.', items: [['Cat castrate', '', '£115'], ['Cat spay', '', '£145'], ['Dog castrate', 'Under 20kg', '£185'], ['Dog spay', 'Under 20kg / 20kg and over', '£295 / £365']] },
        { group: 'Dental', items: [['Nurse dental check', '', 'Free'], ['Scale & polish under anaesthetic', '', '£295'], ['Extractions', 'Per tooth', 'From £35']] },
        { group: 'Emergency & out of hours', items: [['Urgent same-day appointment', 'During opening hours', '£75'], ['Out-of-hours consultation', 'Evenings, weekends and bank holidays', '£185'], ['Overnight hospitalisation', 'Per night, plus treatment', '£165']] },
        { group: 'Other', items: [['Microchipping', '', '£25'], ['Euthanasia', 'Including a quiet room and time with your pet', 'From £195'], ['Individual cremation', 'With return of ashes', 'From £180']] }
    ],

    team: [
        { name: 'Dr Eleanor Price', role: 'Clinical Director', bio: 'Has looked after South West pets for 18 years and still loves a waggy-tailed vaccination clinic.', creds: 'BVSc MRCVS', practice: 'Hollow Oak Bristol', img: '1628009368231-7bb7cfcb0def', alt: 'Dr Eleanor Price examining a tabby cat' },
        { name: 'Dr Arjun Shah', role: 'Senior Vet, Surgery', bio: 'Leads our neutering and soft tissue surgery, and is known for his calm reassurance with nervous owners.', creds: 'BVetMed MRCVS', practice: 'Hollow Oak Exeter', img: '1612531386530-97286d97c2d2', alt: 'Portrait of Dr Arjun Shah' },
        { name: 'Dr Holly Marsh', role: 'Vet, Dentistry', bio: 'Our dental lead, who believes a pain-free mouth is the best gift you can give an older pet.', creds: 'BVM BVS MRCVS', practice: 'Hollow Oak Bath', img: '1508214751196-bcfd4ca60f91', alt: 'Portrait of Dr Holly Marsh' },
        { name: 'Ellie Turner', role: 'Head Nurse', bio: 'Runs our nurse clinics and has a treat in every pocket. Rabbits are her speciality.', creds: 'RVN', practice: 'Hollow Oak Bristol', img: '1544005313-94ddf0286df2', alt: 'Portrait of Ellie Turner' },
        { name: 'Sam Fletcher', role: 'Veterinary Nurse', bio: 'Looks after our surgery patients as they wake up, and sends the updates owners wait for.', creds: 'RVN', practice: 'Hollow Oak Cheltenham', img: '1607990281513-2c110a25bd8c', alt: 'Portrait of Sam Fletcher' },
        { name: 'Dr Grace Owusu', role: 'Vet, Emergency & Critical Care', bio: 'Heads up our 24/7 emergency service at the Bristol hospital.', creds: 'BVSc MRCVS', practice: 'Hollow Oak Bristol', img: '1517841905240-472988babdf9', alt: 'Portrait of Dr Grace Owusu' }
    ],

    reviews: [
        { stars: 5, text: 'They saw our cocker spaniel within the hour when he ate something he shouldn\'t have. Calm, kind and they explained every cost upfront.', name: 'Rachel', where: 'Bristol' },
        { stars: 5, text: 'Our nervous rescue cat used to hide for days after the vet. Not here. Quiet waiting room, gentle nurses and lots of patience.', name: 'Tom', where: 'Bath' },
        { stars: 5, text: 'Love that every price is on the website. No awkward surprises at the desk.', name: 'Jo', where: 'Exeter' },
        { stars: 4, text: 'Really caring team. Saturday appointments get booked up fast, but the online booking makes it easy to grab one.', name: 'Ben', where: 'Cheltenham' },
        { stars: 5, text: 'The health plan saves us a fortune and the reminder texts mean we never miss a booster.', name: 'Aisha', where: 'Swindon' },
        { stars: 5, text: 'When it was time to say goodbye to our old girl, they gave us all the time we needed. We\'ll never forget their kindness.', name: 'Margaret', where: 'Plymouth' }
    ],

    calls: {
        booking: {
            tab: 'Booking vaccinations', title: 'New kitten owner books vaccinations', summary: 'A new kitten owner calls on a Saturday afternoon. The AI books the first vaccination and sends a reminder.',
            callerLabel: 'Incoming call · 07700 900218', line: 'Hollow Oak Bath · Saturday 3:20pm', aiName: 'Hollow Oak AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Hello, Hollow Oak Vets, Bath. I\'m the AI receptionist. How can I help today?' },
                { who: 'caller', text: 'Hi! We\'ve just picked up a kitten, she\'s nine weeks old. I think she needs her vaccinations?' },
                { who: 'ai', text: 'Congratulations! Yes, nine weeks is the perfect time to start. Her starter course is two injections with two health checks, and it\'s £95 in total.' },
                { who: 'caller', text: 'Great. Can we come in next week? After 4 if possible.' },
                { event: { icon: 'cal', title: 'Checked availability', detail: 'Bath · after 4pm, next 7 days' } },
                { who: 'ai', text: 'I have Wednesday at 4:30pm or Thursday at 5:15pm with Dr Holly Marsh. Which would you prefer?' },
                { who: 'caller', text: 'Wednesday at 4:30, please.' },
                { who: 'ai', text: 'Lovely. What\'s your kitten\'s name, and the best number to text?' },
                { who: 'caller', text: 'She\'s called Pip. My number\'s 07700 900218.' },
                { event: { icon: 'user', title: 'New patient added', detail: 'Pip · kitten · 9 weeks' } },
                { event: { icon: 'check', title: 'Appointment booked', detail: 'Wed 4:30pm · First vaccination · Dr Marsh' } },
                { who: 'ai', text: 'Pip is booked in for Wednesday at 4:30. I\'ve texted you the details, plus a reminder to bring her in a secure carrier. We\'ll book her second injection on the day.' },
                { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'With carrier tip and clinic address' } },
                { who: 'caller', text: 'Perfect, thank you so much.' },
                { event: { icon: 'note', title: 'Call summary sent to clinic', detail: 'New kitten · starter course' } }
            ]
        },
        urgent: {
            tab: 'Sick pet emergency', title: 'Worried owner put straight through to a vet', summary: 'An owner calls late at night after their dog ate chocolate. The AI recognises it as urgent and transfers the call to the on-call vet immediately.',
            callerLabel: 'Incoming call · 07700 900467', line: 'Hollow Oak Bristol · 11:48pm', aiName: 'Hollow Oak AI receptionist', callerName: 'Caller',
            lines: [
                { who: 'ai', text: 'Hollow Oak Vets emergency line, you\'re through to the AI receptionist. What\'s happened?' },
                { who: 'caller', text: 'My dog\'s just eaten a whole bar of dark chocolate and now he\'s being sick. I\'m really worried.' },
                { event: { icon: 'alert', title: 'Emergency detected', detail: 'Chocolate poisoning risk · vomiting', urgent: true } },
                { who: 'ai', text: 'I\'m sorry, that\'s frightening. Dark chocolate can be dangerous for dogs, so I\'m putting you through to our on-call vet right now. Please stay on the line.' },
                { event: { icon: 'phone', title: 'Transferred to on-call vet', detail: 'Live handover · under 10 seconds', urgent: true } },
                { who: 'system', text: 'Call transferred to Dr Grace Owusu (on call, Bristol hospital)' },
                { event: { icon: 'note', title: 'Notes passed to vet', detail: 'Dark chocolate, whole bar, vomiting' } }
            ]
        }
    },
    callIds: ['booking', 'urgent'],

    sales: {
        headerBook: 'Booking button on every screen: worried owners book instead of ringing round.',
        heroButtons: 'Book and Call above the fold on mobile: most pet owners search on their phone, often in a hurry.',
        finder: 'One site for all 9 clinics: owners find the nearest open clinic, and new acquisitions go live in a day.',
        prices: 'Prices on every treatment: ready for the new price-transparency rules and fewer "how much?" calls.',
        urgent: 'Emergency line front and centre: urgent visits turn into loyal, long-term clients.',
        ai: 'AI receptionist answers 24/7: books routine care and transfers emergencies to a vet in seconds.',
        reviews: 'Reviews where owners decide: trust is everything when it\'s their pet.',
        offer: 'Health plan sign-ups: predictable monthly revenue for every clinic.',
        fees: 'Published fee guide: meets UK price-transparency expectations and builds instant trust.',
        booking: 'Five-step online booking: owners book at midnight, reception isn\'t tied up on the phone.',
        lead: 'Lead capture: every new client enquiry lands in your inbox, ready to welcome.'
    },

    locationExtra: {
        meta: 'Hollow Oak Bristol: vet hospital in Bristol with 24/7 emergency care, evening and weekend appointments. Book online or call 0117 496 0318.',
        intro: 'Our Bristol hospital is the heart of Hollow Oak: three consult rooms, a full surgical suite, separate cat and dog waiting areas, and our 24/7 emergency service.',
        img: '1548199973-03cce0bbc87b', imgAlt: 'Two small dogs running happily along a sunny path',
        access: ['Separate cat and dog waiting areas', 'Free parking for 12 cars, plus 2 accessible bays', 'Step-free access throughout', 'Open every day, with 24/7 emergency care on site'],
        teamTitle: 'Gentle hands, big hearts',
        cta: 'Open 7 days, with 24/7 emergency care on site.'
    },

    copy: {
        unit: 'clinic', unitPlural: 'clinics', unitTitle: 'Vets', patientsWord: 'pet owners',
        bookLabel: 'Book an appointment', navLocations: 'Find a clinic', navTreatments: 'Services', navFees: 'Fee guide', navTeam: 'Our team', navOffers: 'Health plans & offers',
        titleHome: 'Hollow Oak Vets | Friendly vets across the South West | Book online',
        metaHome: 'Friendly, independent-feeling vets at 9 clinics across the South West, with 24/7 emergency care, published prices and online booking any time.',
        heroPill: '9 clinics across the South West',
        heroTitle: 'Vets who love them <em>like you do</em>',
        heroLede: 'Gentle, unhurried care for dogs, cats and rabbits, with prices published upfront, Saturday appointments and a 24/7 emergency line for the moments that can\'t wait.',
        heroTrust: ['Prices published upfront', '24/7 emergency line', 'Fear-free handling'],
        heroFloat1: '<span class="float-dot" aria-hidden="true"></span><span><strong>Next appointment</strong>Today, 4:30pm</span>',
        heroFloat2: '<span><strong>Rated 4.9 ★</strong>Sample rating for this demo</span>',
        whys: [
            { icon: 'pound', title: 'Prices upfront', text: 'Our full fee guide is published online, and you\'ll always get a written estimate before treatment.' },
            { icon: 'heart', title: 'Fear-free handling', text: 'Quiet rooms, cat-only waiting areas and all the time your pet needs to feel safe.' },
            { icon: 'clock', title: '24/7 emergencies', text: 'Our Bristol hospital is open around the clock, and our phone line never sleeps.' },
            { icon: 'paw', title: 'Health plans', text: 'Spread the cost of routine care from £16.99 a month and save on other treatment.' }
        ],
        finderEyebrow: 'Find a clinic', finderTitle: 'Your nearest Hollow Oak', finderLede: 'Search by postcode or town, or let us find the nearest clinic to you. Every clinic offers online booking and same-day appointments.', finderExample: 'BS6 or Exeter',
        locationsTitle: 'Find a Hollow Oak clinic', locationsLede: '9 clinics across the South West, from Truro to Cheltenham, with 24/7 emergency care at our Bristol hospital.',
        treatEyebrow: 'Services', treatTitle: 'Everything your pet needs, from first jabs to golden years', treatLede: 'Preventative care, surgery and dentistry, with every price published so there are never any surprises.', treatmentsTitle: 'Our services',
        urgentSection: { eyebrow: 'Pet emergency?', title: 'Worried? Call us now, day or night.', text: 'If your pet has eaten something they shouldn\'t, is struggling to breathe, can\'t wee, or has been injured, call our 24/7 emergency line straight away.' },
        aiEyebrow: 'Answered 24/7', aiTitle: 'Every call answered, even at midnight', aiLede: 'Our AI receptionist answers when clinics are busy or closed. It books routine appointments, answers questions about prices, and puts emergencies straight through to a vet.', aiFoot: 'This is a simulated example call for demonstration. Emergencies are always passed straight to a member of our clinical team.',
        reviewsEyebrow: 'Happy pets, happy owners', reviewsTitle: 'What pet owners say', reviewsLede: 'Example reviews showing how real client feedback would appear on this site.',
        teamEyebrow: 'Our team', teamTitle: 'Gentle hands, big hearts', teamLede: 'Experienced vets and nurses who treat every pet like their own.', teamPageTitle: 'Meet the Hollow Oak team',
        offerEyebrow: 'Pet Health Plans', offerTitle: 'First month of any health plan, free', offerText: 'Vaccinations, flea and worm treatment and two health checks a year, from £16.99 a month. Join now and your first month is on us.', offerCta: 'See health plans & offers',
        ctaTitle: 'We\'re here when they need us', ctaText: 'Book online in under a minute, or call and our team (or our AI receptionist) will help.',
        titleLocations: 'Find a vet near you | 9 South West clinics | Hollow Oak Vets', metaLocations: 'Find your nearest Hollow Oak Vets clinic by postcode or town: Bristol, Bath, Exeter, Taunton, Cheltenham, Gloucester, Swindon, Plymouth and Truro.',
        titleTreatments: 'Vet services & prices | Hollow Oak Vets', metaTreatments: 'Vaccinations, neutering, pet dental care, health plans, microchipping and emergency care at 9 South West clinics, with published prices.',
        titleFees: 'Vet fee guide | Every price published | Hollow Oak Vets', metaFees: 'Our full vet fee guide, published online: consultations, vaccinations, neutering, dental, emergency and out-of-hours prices.',
        feesEyebrow: 'Fee guide', feesTitle: 'Every price, published.', feesLede: 'We believe you should know what your pet\'s care costs before you walk in. Here\'s our full fee guide.',
        feesNotice: '<strong>Price transparency is coming to every UK vet.</strong> The Competition and Markets Authority has pushed for vets to publish clear prices so owners can compare. We already do, at every clinic, and we\'ll always give you a written estimate before treatment.',
        feesFoot: 'Prices are for this demo and are illustrative. Medication and diagnostic tests are charged separately and will always be explained first.',
        titleBook: 'Book a vet appointment online | Hollow Oak Vets', metaBook: 'Book a vet appointment online in under a minute at any of our 9 South West clinics. Instant confirmation by text.',
        bookTitle: 'Book an appointment', bookLede: 'It takes less than a minute. You\'ll get an instant text confirmation.', bookStep1: 'Every clinic offers same-day appointments for poorly pets.', bookStep2Title: 'What does your pet need?', bookStep2: 'Not sure? Choose a vet consultation and we\'ll take it from there.', stepTreatment: 'Service',
        bookExtraField: '<div class="k-grid-2" style="gap:0 16px"><div class="k-field"><label for="bf-pet">Pet\'s name</label><input id="bf-pet" name="petname" required><div class="k-err"></div></div><div class="k-field"><label for="bf-species">Species</label><select id="bf-species" name="species"><option>Dog</option><option>Cat</option><option>Rabbit</option><option>Other small pet</option></select></div></div>',
        bookNotesPh: 'e.g. She\'s nervous of other dogs, or he\'s been off his food', bookFoot: 'Emergency? Don\'t book online, call us now on',
        titleTeam: 'Our vets & nurses | Hollow Oak Vets', metaTeam: 'Meet the vets, nurses and care team across Hollow Oak Vets\' 9 South West clinics.',
        titleOffers: 'Pet Health Plans & new client offer | Hollow Oak Vets', metaOffers: 'Pet Health Plans from £16.99 a month with your first month free. Vaccinations, flea and worm treatment and two health checks a year.',
        offersTitle: 'First month free on any health plan', offersLede: 'Everything your pet needs to stay healthy, in one easy monthly payment.',
        offersPoints: ['Annual vaccinations', 'Year-round flea & worm treatment', 'Two health checks a year', 'Free nurse clinics', '10% off most other treatment'],
        offersSmall: 'New plan members only. 12-month minimum term. Available at all 9 clinics. This is a demo offer.',
        offersFormTitle: 'Get your free first month', offersButton: 'Send me the offer',
        offersExtraField: '<div class="k-field"><label for="lf-pet">Your pet</label><select id="lf-pet" name="pet"><option>Dog</option><option>Cat</option><option>Rabbit</option></select></div>',
        offersSuccessTitle: 'Your offer is on its way', offersSuccess: 'Check your inbox for your sign-up link. You can also join at your next appointment.',
        accessPractices: 'All of our clinics have step-free access and accessible parking bays. Assistance dogs are always welcome, and we\'re happy to arrange quieter appointment times for anyone who needs them.',
        privacyHealth: 'Your pet\'s medical history, so we can treat them safely.',
        hoursNote: 'Most clinics: Mon to Fri 8:30am to 6:30pm, Sat 9am to 1pm. 24/7 emergency care at our Bristol hospital.',
        footerAbout: 'Friendly vets for dogs, cats and rabbits at 9 clinics across the South West.',
        regLine: 'RCVS-registered practice (fictional demo).'
    }
};
