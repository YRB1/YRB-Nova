/* Halden Physio demo data. Edit this file to change practices, treatments and the AI call examples. */
window.SITE = {
  "id": "halden-physio",
  "name": "Halden Physio",
  "shortName": "Halden",
  "region": "East Midlands",
  "refPrefix": "HP",
  "bookUrl": "book.html",
  "homeUrl": "index.html",
  "practices": [
    {
      "id": "leicester",
      "name": "Halden Leicester",
      "town": "Leicester",
      "address": "12 Oriel Court, Leicester LE1",
      "phone": "01632 960101",
      "lat": 52.634,
      "lng": -1.131,
      "hours": {
        "0": null,
        "1": [
          "07:30",
          "20:00"
        ],
        "2": [
          "07:30",
          "20:00"
        ],
        "3": [
          "07:30",
          "20:00"
        ],
        "4": [
          "07:30",
          "20:00"
        ],
        "5": [
          "07:30",
          "18:00"
        ],
        "6": [
          "08:00",
          "13:00"
        ]
      },
      "page": "location-leicester.html",
      "tags": [
        "Flagship",
        "Rehab gym"
      ]
    },
    {
      "id": "loughborough",
      "name": "Halden Loughborough",
      "town": "Loughborough",
      "address": "3 Ashby Lane Court, Loughborough LE11",
      "phone": "01632 960102",
      "lat": 52.772,
      "lng": -1.206,
      "hours": {
        "0": null,
        "1": [
          "07:30",
          "20:00"
        ],
        "2": [
          "07:30",
          "20:00"
        ],
        "3": [
          "07:30",
          "20:00"
        ],
        "4": [
          "07:30",
          "20:00"
        ],
        "5": [
          "07:30",
          "18:00"
        ],
        "6": [
          "08:00",
          "13:00"
        ]
      },
      "page": null,
      "tags": [
        "Sports injuries"
      ]
    },
    {
      "id": "nottingham",
      "name": "Halden Nottingham",
      "town": "Nottingham",
      "address": "21 Lacemaker Row, Nottingham NG1",
      "phone": "01632 960103",
      "lat": 52.952,
      "lng": -1.148,
      "hours": {
        "0": null,
        "1": [
          "07:30",
          "20:00"
        ],
        "2": [
          "07:30",
          "20:00"
        ],
        "3": [
          "07:30",
          "20:00"
        ],
        "4": [
          "07:30",
          "20:00"
        ],
        "5": [
          "07:30",
          "18:00"
        ],
        "6": [
          "08:00",
          "13:00"
        ]
      },
      "page": null,
      "tags": []
    },
    {
      "id": "derby",
      "name": "Halden Derby",
      "town": "Derby",
      "address": "8 Bridgegate Yard, Derby DE1",
      "phone": "01632 960104",
      "lat": 52.925,
      "lng": -1.478,
      "hours": {
        "0": null,
        "1": [
          "08:00",
          "19:00"
        ],
        "2": [
          "08:00",
          "19:00"
        ],
        "3": [
          "08:00",
          "19:00"
        ],
        "4": [
          "08:00",
          "19:00"
        ],
        "5": [
          "08:00",
          "18:00"
        ],
        "6": [
          "08:00",
          "13:00"
        ]
      },
      "page": null,
      "tags": []
    }
  ],
  "treatments": [
    {
      "id": "assessment",
      "name": "Physio assessment",
      "from": "£55",
      "duration": "45 mins",
      "nhs": false
    },
    {
      "id": "massage",
      "name": "Sports massage",
      "from": "£45",
      "duration": "30 mins",
      "nhs": false
    },
    {
      "id": "backneck",
      "name": "Back & neck pain",
      "from": "£55",
      "duration": "45 mins",
      "nhs": false
    },
    {
      "id": "rehab",
      "name": "Post-surgery rehab",
      "from": "£60",
      "duration": "45 mins",
      "nhs": false
    },
    {
      "id": "shockwave",
      "name": "Shockwave therapy",
      "from": "£70",
      "duration": "20 mins",
      "nhs": false
    },
    {
      "id": "followup",
      "name": "Follow-up appointment",
      "from": "£45",
      "duration": "30 mins",
      "nhs": false
    },
    {
      "id": "sameday",
      "name": "Same-day pain appointment",
      "from": "£55",
      "duration": "45 mins",
      "nhs": false
    },
    {
      "id": "acupuncture",
      "name": "Acupuncture",
      "from": "£45",
      "duration": "30 mins",
      "nhs": false
    },
    {
      "id": "video",
      "name": "Video assessment",
      "from": "£40",
      "duration": "30 mins",
      "nhs": false
    }
  ],
  "calls": {
    "booking": {
      "tab": "Knee pain → assessment",
      "title": "After-hours call becomes a booked assessment",
      "summary": "A runner calls at 8:40pm with knee pain. The AI asks the right questions, finds a Saturday slot and books an assessment.",
      "callerLabel": "Incoming call · 07700 900412",
      "line": "Halden Loughborough · 8:42pm",
      "aiName": "Halden AI receptionist",
      "callerName": "Caller",
      "lines": [
        {
          "who": "ai",
          "text": "Hi, you're through to Halden Physio, Loughborough. I'm the clinic's AI receptionist. How can I help?"
        },
        {
          "who": "caller",
          "text": "Hi, my knee's been sore since a half marathon two weeks ago. Can I get it looked at?"
        },
        {
          "who": "ai",
          "text": "Sorry to hear that. An initial physio assessment is the best place to start. It's £55 for 45 minutes and includes your first treatment. Would a weekday evening or Saturday suit you better?"
        },
        {
          "who": "caller",
          "text": "Saturday morning, if you have it."
        },
        {
          "event": {
            "icon": "cal",
            "title": "Checked availability",
            "detail": "Loughborough · Saturday · sports physio"
          }
        },
        {
          "who": "ai",
          "text": "Ravi, our senior physio, has Saturday at 8:30 or 10:15. He sees a lot of runners. Which would you like?"
        },
        {
          "who": "caller",
          "text": "8:30 please."
        },
        {
          "who": "ai",
          "text": "Lovely. Can I take your full name and mobile number?"
        },
        {
          "who": "caller",
          "text": "Jordan Pike, 07700 900412."
        },
        {
          "event": {
            "icon": "check",
            "title": "Assessment booked",
            "detail": "Sat 8:30am · Initial assessment · Ravi Sandhu"
          }
        },
        {
          "who": "ai",
          "text": "You're booked with Ravi on Saturday at 8:30. I've texted you a confirmation with a short form to fill in, and a reminder to wear shorts."
        },
        {
          "event": {
            "icon": "sms",
            "title": "Confirmation SMS sent",
            "detail": "With pre-appointment form"
          }
        },
        {
          "event": {
            "icon": "cal",
            "title": "Added to clinic diary",
            "detail": "Booked into Ravi's Saturday list"
          }
        }
      ]
    },
    "urgent": {
      "tab": "Post-op warning signs",
      "title": "Warning signs after surgery handed to a human",
      "summary": "A rehab patient calls with calf swelling and breathlessness after knee surgery. The AI recognises the red flags, advises 999 and alerts the on-call clinician.",
      "callerLabel": "Incoming call · 07700 900538",
      "line": "Halden Leicester · 7:15pm",
      "aiName": "Halden AI receptionist",
      "callerName": "Caller",
      "lines": [
        {
          "who": "ai",
          "text": "Hi, you're through to Halden Physio, Leicester. I'm the clinic's AI receptionist. How can I help?"
        },
        {
          "who": "caller",
          "text": "I had a knee replacement ten days ago. My calf's swollen and painful, and I'm a bit short of breath."
        },
        {
          "event": {
            "icon": "alert",
            "title": "Red flag detected",
            "detail": "Calf swelling + breathlessness after surgery",
            "urgent": true
          }
        },
        {
          "who": "ai",
          "text": "Thank you for telling me. Those symptoms need checking urgently. Please call 999 now. I'm also alerting our on-call clinician so they can ring you straight back."
        },
        {
          "event": {
            "icon": "phone",
            "title": "On-call clinician alerted",
            "detail": "Live handover · callback within minutes",
            "urgent": true
          }
        },
        {
          "who": "system",
          "text": "Call passed to Ellie Marsh (on-call clinician)"
        },
        {
          "event": {
            "icon": "note",
            "title": "Notes shared",
            "detail": "Surgery date, symptoms and caller number"
          }
        }
      ]
    }
  }
};
