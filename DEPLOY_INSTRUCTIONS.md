# Deployment Instructions for Katharina

## Problem: "Another Author" Error on Vercel

This happens because the GitHub repository might be linked to another Vercel account.

## Solution 1: Disconnect GitHub Integration (Fastest)

1. **On GitHub**, go to repository settings:
   - https://github.com/katharinawitt1990-blip/the-integration-studio/settings/installations

2. **Find "Vercel"** in the list of installed GitHub Apps

3. **Click "Configure"** next to Vercel

4. **Remove or disconnect** the Vercel integration

5. **Go back to Vercel** and try importing the project again as new

## Solution 2: Fork and Deploy Your Own Copy

1. **Fork the repository:**
   - Go to: https://github.com/katharinawitt1990-blip/the-integration-studio
   - Click "Fork" button (top right)
   - Create fork in your account

2. **Deploy the fork in Vercel:**
   - Go to vercel.com
   - Click "Add New" → "Project"
   - Import from YOUR forked repository
   - Deploy

3. **Update CMS config:**
   - After deployment, edit `admin/config.yml`
   - Change the `repo:` line to your forked repo name
   - Commit and redeploy

## Solution 3: Deploy via Vercel CLI (Alternative)

If GitHub integration keeps failing:

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd the-integration-studio

# Login to your Vercel account
vercel login

# Deploy
vercel --prod
```

## After Successful Deployment

Once deployed by ANY method above, remember to:

1. **Create GitHub OAuth App**
   - Go to: https://github.com/settings/developers
   - Create new OAuth App with your Vercel URL
   - Get Client ID and Secret

2. **Add to Vercel Environment Variables:**
   - `OAUTH_CLIENT_ID`
   - `OAUTH_CLIENT_SECRET`

3. **Redeploy** so CMS authentication works

4. **Access CMS at:** your-site.vercel.app/admin

---

If all else fails, share the exact error message you're seeing for more specific help.
