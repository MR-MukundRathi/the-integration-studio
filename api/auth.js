// GitHub OAuth - Initial auth request
// This initiates the OAuth flow when user clicks "Login with GitHub"

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({
      error: 'OAuth not configured. Please set OAUTH_CLIENT_ID in Vercel environment variables.'
    });
  }

  // Construct callback URL
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const callbackUrl = `${protocol}://${host}/api/callback`;

  // GitHub OAuth authorization URL with explicit callback
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(callbackUrl)}`;

  console.log('Redirecting to GitHub OAuth with callback:', callbackUrl);

  // Redirect user to GitHub for authorization
  res.redirect(authUrl);
}
