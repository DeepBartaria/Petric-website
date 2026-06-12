export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { eventName, eventId, eventUrl, params, fbp, fbc } = req.body;
    
    // Check if token exists
    const token = process.env.META_CAPI_TOKEN;
    if (!token) {
      console.warn("META_CAPI_TOKEN is not set.");
      return res.status(500).json({ error: 'Missing CAPI token' });
    }

    const pixelId = '906311355800710';
    
    // Extract IP address and User Agent securely via Vercel headers
    const clientIpAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    const clientUserAgent = req.headers['user-agent'] || '';

    // Construct user data payload according to Meta specifications
    const userData = {
      client_ip_address: clientIpAddress.split(',')[0].trim(),
      client_user_agent: clientUserAgent,
    };

    // Append Facebook click/browser IDs if available
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;
    
    // Build the final CAPI payload
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_id: eventId,
          event_source_url: eventUrl,
          user_data: userData,
          custom_data: params || {},
        }
      ]
    };

    // Send to Meta Graph API
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Meta CAPI Error:", data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("CAPI Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
