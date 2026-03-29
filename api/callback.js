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
            if (window.opener) {
              window.opener.postMessage(
                'authorization:github:success:${tokenData.access_token}',
                '*'
              );
              // Also try the object format as fallback
              setTimeout(function() {
                window.opener.postMessage({
                  type: 'authorization_success',
                  payload: {
                    token: '${tokenData.access_token}',
                    provider: 'github'
                  }
                }, '*');
              }, 100);
            }
            setTimeout(function() { window.close(); }, 500);
          })();
        </script>
        <p>Authorization successful! This window will close automatically...</p>
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
