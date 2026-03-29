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
    // IMPORTANT: We need to properly escape the token for JavaScript
    const token = tokenData.access_token;
    const escapedToken = token.replace(/'/g, "\\'");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorization Success</title>
      </head>
      <body>
        <script>
          (function() {
            var token = '${escapedToken}';
            console.log('OAuth callback loaded');
            console.log('Token received:', token);
            console.log('Window opener exists:', !!window.opener);

            if (!window.opener) {
              console.error('No window.opener found!');
              document.body.innerHTML = '<p>Error: This page must be opened from the CMS.</p>';
              return;
            }

            // Send token using the Netlify/Decap CMS expected format
            function sendAuthMessage() {
              var message = 'authorization:github:success:' + token;
              console.log('Sending auth message:', message);

              // Try sending to opener origin
              try {
                window.opener.postMessage(message, window.opener.location.origin);
                console.log('Message sent to opener origin');
              } catch (e) {
                console.error('Failed to send to opener origin:', e);
              }

              // Also try wildcard as fallback
              setTimeout(function() {
                try {
                  window.opener.postMessage(message, '*');
                  console.log('Message sent with wildcard origin');
                } catch (e) {
                  console.error('Failed to send with wildcard:', e);
                }
              }, 100);

              // Try object format for newer Decap CMS
              setTimeout(function() {
                try {
                  var objMessage = {
                    token: token,
                    provider: 'github'
                  };
                  window.opener.postMessage(objMessage, '*');
                  console.log('Object format message sent');
                } catch (e) {
                  console.error('Failed to send object format:', e);
                }
              }, 200);

              // Close window after delay
              setTimeout(function() {
                console.log('Closing popup window');
                window.close();
              }, 1000);
            }

            // Send the message immediately
            sendAuthMessage();
          })();
        </script>
        <p>✓ Authorization successful! This window will close automatically...</p>
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
