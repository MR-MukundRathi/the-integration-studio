// GitHub OAuth - Callback handler
// This receives the authorization code and exchanges it for an access token

export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: 'OAuth not configured. Please set environment variables in Vercel.'
    });
  }

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/json'
      }
    });

    const userData = await userResponse.json();

    // Return success with token (Decap CMS expects this format)
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorization Success</title>
      </head>
      <body>
        <script>
          // Send token back to CMS
          (function() {
            console.log('OAuth callback loaded');
            console.log('Token received:', '${tokenData.access_token}');
            console.log('Window opener exists:', !!window.opener);

            if (window.opener) {
              // Try Decap CMS format (string)
              const message = 'authorization:github:success:${tokenData.access_token}';
              console.log('Sending message 1:', message);
              window.opener.postMessage(message, window.location.origin);

              // Also try wildcard origin as backup
              setTimeout(function() {
                console.log('Sending message 2 with wildcard origin');
                window.opener.postMessage(message, '*');
              }, 100);

              // Try object format as final fallback (Decap CMS 3.x format)
              setTimeout(function() {
                const objMessage = {
                  token: '${tokenData.access_token}',
                  provider: 'github'
                };
                console.log('Sending message 3 (object - flat format):', objMessage);
                window.opener.postMessage(objMessage, '*');
              }, 200);

              console.log('All messages sent, closing in 2 seconds...');
              setTimeout(function() { window.close(); }, 2000);
            } else {
              console.error('No window.opener found!');
            }
          })();
        </script>
        <p>Authorization successful! Check the console for details. This window will close automatically...</p>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({
      error: 'Authentication failed',
      details: error.message
    });
  }
}
