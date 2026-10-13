/* YRB VoiceDesk — simulated call scenarios used by the call simulator (demos/_kit/kit.js).
   Add a new industry by adding another entry here and its id to data-call="..." on the page. */
window.SITE = window.SITE || {};
window.SITE.calls = {
    dental: {
        tab: 'Dental', title: 'New patient books a check-up', summary: '7:42pm, reception has closed. The AI registers a new patient, books a check-up and texts a confirmation.',
        callerLabel: 'Incoming call · 07700 900341', line: 'Dental practice · 7:42pm', aiName: 'VoiceDesk', callerName: 'Caller',
        lines: [
            { who: 'ai', text: 'Good evening, you\'re through to Brightwell Dental. I\'m the AI receptionist. How can I help?' },
            { who: 'caller', text: 'Hi, I\'ve just moved here and I need to register and book a check-up.' },
            { who: 'ai', text: 'Welcome! I can do both now. Would you like an NHS or private check-up?' },
            { who: 'caller', text: 'Private is fine. Anything early next week, before work?' },
            { event: { icon: 'cal', title: 'Checked availability', detail: 'Early appointments, next 7 days' } },
            { who: 'ai', text: 'I have Tuesday at 8am or Wednesday at 8:30am. A new patient exam is £65, including X-rays if you need them.' },
            { who: 'caller', text: 'Tuesday at 8, please.' },
            { who: 'ai', text: 'Lovely. Can I take your name and mobile number for the confirmation?' },
            { who: 'caller', text: 'Emma Clarke, 07700 900341.' },
            { event: { icon: 'check', title: 'Appointment booked: Tue 8:00am', detail: 'New patient exam · added to the practice diary' } },
            { who: 'ai', text: 'You\'re booked for Tuesday at 8am. I\'ve texted you the details and a link to your medical history form.' },
            { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'Address, parking and forms link' } },
            { event: { icon: 'cal', title: 'Added to calendar', detail: 'Booked into the practice calendar' } },
            { event: { icon: 'note', title: 'Call summary sent', detail: 'Emailed to reception for 8am' } }
        ]
    },
    vets: {
        tab: 'Vets', title: 'Worried owner put straight through to a vet', summary: '11:48pm. A dog has eaten dark chocolate. The AI recognises the emergency and transfers to the on-call vet.',
        callerLabel: 'Incoming call · 07700 900467', line: 'Vet group emergency line · 11:48pm', aiName: 'VoiceDesk', callerName: 'Caller',
        lines: [
            { who: 'ai', text: 'Hollow Oak Vets emergency line, you\'re through to the AI receptionist. What\'s happened?' },
            { who: 'caller', text: 'My dog\'s just eaten a whole bar of dark chocolate and he\'s being sick. I\'m really worried.' },
            { event: { icon: 'alert', title: 'Emergency detected', detail: 'Possible poisoning · vomiting', urgent: true } },
            { who: 'ai', text: 'I\'m sorry, that\'s frightening. Dark chocolate can be dangerous for dogs, so I\'m putting you through to the on-call vet now. Please stay on the line.' },
            { event: { icon: 'phone', title: 'Transferred to on-call vet', detail: 'Live handover · under 10 seconds', urgent: true } },
            { who: 'system', text: 'Call transferred to the on-call vet' },
            { event: { icon: 'note', title: 'Notes passed to the vet', detail: 'What was eaten, how much, symptoms' } }
        ]
    },
    aesthetics: {
        tab: 'Aesthetics', title: 'Price question becomes a booked consultation', summary: '9:06pm. A caller asks about prices. The AI answers clearly, without pressure, and books a consultation.',
        callerLabel: 'Incoming call · 07700 900733', line: 'Aesthetics clinic · 9:06pm', aiName: 'VoiceDesk', callerName: 'Caller',
        lines: [
            { who: 'ai', text: 'Good evening, Lumen Skin Clinic. I\'m the clinic\'s AI concierge. How may I help?' },
            { who: 'caller', text: 'Hi, I\'m interested in skin boosters. How much are they?' },
            { who: 'ai', text: 'A single session is £295, or £795 for a course of three. Everything starts with a skin consultation, which is £50 and comes off your treatment.' },
            { who: 'caller', text: 'That sounds good. Could I come in on a Saturday?' },
            { event: { icon: 'cal', title: 'Checked availability', detail: 'Saturday consultations' } },
            { who: 'ai', text: 'I have Saturday at 11:30am or 2:15pm. Which suits you?' },
            { who: 'caller', text: '11:30, please. It\'s Olivia Hart, 07700 900733.' },
            { event: { icon: 'check', title: 'Consultation booked: Sat 11:30am', detail: 'Skin consultation · £50' } },
            { who: 'ai', text: 'You\'re booked for Saturday at 11:30, Olivia. I\'ve sent a confirmation with a short questionnaire so we can focus on you.' },
            { event: { icon: 'sms', title: 'Confirmation SMS sent', detail: 'With pre-consultation questionnaire' } },
            { event: { icon: 'cal', title: 'Added to calendar', detail: 'Booked into the clinic calendar' } }
        ]
    },
    trades: {
        tab: 'Trades', title: 'After-hours leak: details captured, owner alerted', summary: '10:15pm. A burst pipe. The AI takes the details, gives safety advice and alerts the plumber straight away.',
        callerLabel: 'Incoming call · 07700 900926', line: 'Plumbing & heating · 10:15pm', aiName: 'VoiceDesk', callerName: 'Caller',
        lines: [
            { who: 'ai', text: 'Hi, you\'ve reached Clearflow Plumbing. I\'m the AI assistant answering out of hours. What\'s going on?' },
            { who: 'caller', text: 'A pipe\'s burst under my kitchen sink. There\'s water everywhere!' },
            { event: { icon: 'alert', title: 'Emergency job flagged', detail: 'Active leak · after hours', urgent: true } },
            { who: 'ai', text: 'Okay, first, turn off your stopcock. It\'s usually under the kitchen sink or where the water pipe comes into the house. Turn it clockwise.' },
            { who: 'caller', text: 'Right... done. It\'s stopped.' },
            { who: 'ai', text: 'Well done. Can I take your name, address and best number? I\'m alerting the engineer on call right now.' },
            { who: 'caller', text: 'Dan Whitfield, 14 Brook Lane, LE11. 07700 900926.' },
            { event: { icon: 'user', title: 'Job details captured', detail: 'Name, address, photos link sent' } },
            { event: { icon: 'sms', title: 'Owner alerted by SMS & call', detail: 'Emergency callout request · 10:16pm' } },
            { who: 'ai', text: 'Thanks, Dan. Our engineer has been alerted and will call you back within 15 minutes to arrange a visit. Keep the water off until then.' },
            { event: { icon: 'note', title: 'Call summary logged', detail: 'Added to the job sheet for the morning' } }
        ]
    }
};
