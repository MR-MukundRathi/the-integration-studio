// GitHub OAuth - Initial auth request
// This initiates the OAuth flow when user clicks "Login with GitHub"

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({
      error: 'OAuth not configured. Please set OAUTH_CLIENT_ID in Vercel environment variables.'
    });
  }

  // GitHub OAuth authorization URL
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;

  // Redirect user to GitHub for authorization
  res.redirect(authUrl);
}
