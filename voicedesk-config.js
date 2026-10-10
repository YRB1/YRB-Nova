/* =====================================================================
   YRB VoiceDesk — live demo settings. This is the ONLY file to edit to
   switch on the real demo parts of voicedesk.html.

   1. LIVE PHONE NUMBER: put your demo number in `phone` (e.g. '0115 496 0000').
      A big tap-to-call button appears on the page automatically.

   2. TALK IN THE BROWSER (Retell web call):
      a) In Vercel → Project → Settings → Environment Variables, add
         RETELL_API_KEY  = your Retell API key (secret, never put it in this file)
         RETELL_AGENT_ID = the agent id of your demo receptionist
      b) Set `webCall.enabled` below to true.
      c) Add to the Content-Security-Policy in vercel.json:
         script-src  ... https://cdn.jsdelivr.net
         connect-src ... https://api.retellai.com wss://*.livekit.cloud https://*.livekit.cloud
      The "Talk to it now" button then appears and starts a live call.
   ===================================================================== */
window.VOICEDESK_CONFIG = {
    name: 'YRB VoiceDesk',
    site: 'https://ai-receptionist-backend-sage.vercel.app',
    phone: '',
    webCall: {
        enabled: false,
        endpoint: '/api/voicedesk-web-call',
        sdkUrl: 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2/+esm'
    }
};
