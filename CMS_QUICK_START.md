# ⚡ CMS Quick Start - 5 Minutes

## 🎯 What This Is

A visual content editor for your website - no coding needed!

**URL:** `https://your-site.vercel.app/admin`

---

## 🚀 First-Time Setup (Do Once)

### 1. Create GitHub OAuth App
1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Name: `The Integration Studio CMS`
   - Homepage: `https://your-site.vercel.app`
   - Callback: `https://your-site.vercel.app/api/callback`
4. Copy **Client ID** and **Client Secret**

### 2. Add to Vercel
1. Vercel Dashboard → Your Project → Settings
2. Environment Variables → Add:
   - `OAUTH_CLIENT_ID` = [your client id]
   - `OAUTH_CLIENT_SECRET` = [your secret]
3. Redeploy

✅ **Done! CMS is live!**

---

## 📝 Daily Use (Every Time You Edit)

### How to Edit Content:

```
1. Go to: your-site.vercel.app/admin
2. Click "Login with GitHub"
3. Select the page to edit
4. Change the text in form fields
5. Click "Publish"
6. Wait 30 seconds → Live! ✅
```

---

## 🎨 What You Can Edit

### Available Pages:
- ✅ **Homepage** (German & English)
- ✅ **For Organizations** (German & English)
- ✅ **Workshops** (German & English)
- ✅ **About** (German & English)
- ✅ **Website Settings** (email, social links)

### What You Can Change:
- ✅ All text content
- ✅ Headings and descriptions
- ✅ Images (upload new ones)
- ✅ Contact information
- ✅ Social media links

---

## 📸 Adding Images

1. In any field, look for the image icon
2. Click → Upload or select image
3. Image automatically added to website

---

## ⏱️ How Long Until Changes Are Live?

**30-60 seconds**

This is because:
1. You click "Publish"
2. Changes save to GitHub
3. Vercel rebuilds the site
4. Changes go live

**Tip:** Refresh your browser with `Cmd + Shift + R` to see changes

---

## 🔄 Workflow Options

### Quick Publish (Recommended for beginners):
```
Edit → Publish → Live in 30 seconds
```

### Editorial Workflow (For careful review):
```
Edit → Save as Draft → Review → Publish → Live
```

---

## 🆘 Common Issues

### "Login doesn't work"
- Check OAuth app settings
- Verify environment variables in Vercel
- Try redeploying

### "Changes don't appear"
- Wait full 60 seconds
- Hard refresh: `Cmd + Shift + R`
- Check Vercel deployments for errors

### "Can't find /admin"
- Make sure you're going to `/admin` exactly
- Check that files were deployed

---

## ✅ Quick Checklist

Before first use:
- [ ] OAuth app created
- [ ] Environment variables added to Vercel
- [ ] Site redeployed
- [ ] Can access `/admin`
- [ ] Can login with GitHub

---

## 🎯 Example: Edit German Homepage

1. Go to `/admin`
2. Login
3. Click **"Homepage (Deutsch)"**
4. Change "Hero Description" text
5. Click **"Publish"**
6. Visit your site in 30 seconds - see the change!

---

## 📞 Need More Help?

- **Full Guide:** See `CMS_SETUP_GUIDE.md`
- **Decap Docs:** https://decapcms.org/docs/
- **Ask AI:** Use Cursor or ChatGPT

---

## 🎉 You're Ready!

The CMS makes website editing as easy as using a Google Form.

**No code. No command line. Just edit and publish!** ✅

---

*For detailed setup instructions, see: CMS_SETUP_GUIDE.md*
