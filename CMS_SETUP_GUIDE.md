# 🎨 Content Management System (CMS) Setup Guide

## What You Get

A clean admin interface at **yoursite.com/admin** where you can:
- ✅ Edit all website content (text, images)
- ✅ No code needed - just fill in forms
- ✅ Click "Publish" → Changes go live in 30 seconds
- ✅ All changes tracked in Git (can undo anything)

---

## 🚀 Quick Setup (15 minutes)

### **Step 1: Create GitHub OAuth App** (5 min)

This lets the CMS connect to your GitHub account securely.

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** `The Integration Studio CMS`
   - **Homepage URL:** `https://your-site-url.vercel.app`
   - **Authorization callback URL:** `https://your-site-url.vercel.app/api/auth/callback`
4. Click **"Register application"**
5. **Copy** the **Client ID**
6. Click **"Generate a new client secret"**
7. **Copy** the **Client Secret** (save both somewhere safe!)

---

### **Step 2: Add Environment Variables to Vercel** (3 min)

1. Go to: https://vercel.com/dashboard
2. Select your project: **the-integration-studio**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| **Key** | **Value** |
|---------|-----------|
| `OAUTH_CLIENT_ID` | [Your GitHub Client ID from Step 1] |
| `OAUTH_CLIENT_SECRET` | [Your GitHub Client Secret from Step 1] |

5. Click **"Save"**

---

### **Step 3: Redeploy** (1 min)

1. In Vercel dashboard, go to **Deployments**
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait 30 seconds

✅ **Done! Your CMS is now live!**

---

## 📝 How to Use the CMS

### **Access the Admin Panel:**

1. Go to: **https://your-site-url.vercel.app/admin**
2. Click **"Login with GitHub"**
3. Authorize the app (first time only)
4. You're in! 🎉

---

### **Edit Content:**

#### **Dashboard View:**
```
┌──────────────────────────────────┐
│  Content Manager                 │
│                                  │
│  Collections:                    │
│  ├─ Homepage (Deutsch)           │
│  ├─ Homepage (English)           │
│  ├─ Für Organisationen (Deutsch) │
│  ├─ For Organizations (English)  │
│  ├─ Workshops (Deutsch)          │
│  ├─ Workshops (English)          │
│  ├─ Über uns (Deutsch)           │
│  ├─ About (English)              │
│  └─ Website Settings             │
└──────────────────────────────────┘
```

#### **Editing Workflow:**

1. **Select a page** (e.g., "Homepage (Deutsch)")
2. **Click "Edit"**
3. **Change content** in the form fields:
   - Hero Label
   - Hero Title
   - Hero Description
   - Etc.
4. **Save as Draft** or **Publish** immediately
5. Changes go live in ~30 seconds!

---

## 🎯 What You Can Edit

### **For Each Page:**

#### **Homepage:**
- Hero section (label, title, tagline, description)
- Intro section (heading, paragraphs)

#### **Organization Page:**
- Page title
- Hero heading & description
- Intro text

#### **Workshops Page:**
- Page title
- Hero heading & description

#### **About Page:**
- Page title
- Hero heading
- Intro text

#### **Global Settings:**
- Site title
- Contact email
- Phone (optional)
- Social media links (Instagram, LinkedIn)

---

## 📸 Adding Images

1. In any text field, click the **image icon**
2. **Upload new image** or select existing
3. Image automatically added to `/assets/uploads/`
4. Image appears in your content

---

## 🔄 Editorial Workflow

The CMS uses an **editorial workflow**:

1. **Draft** → Make changes without publishing
2. **In Review** → Mark ready for review (optional)
3. **Ready** → Approve and publish

This prevents accidental changes going live immediately.

### **To Publish:**
1. Make your edits
2. Click **"Save"**
3. Click **"Publish"** → **"Publish now"**
4. Done! Live in 30 seconds ✅

---

## 🛠️ Current Setup

### **What's Configured:**

✅ **Content Collections:**
- 2 Homepage versions (EN/DE)
- 2 Organization pages (EN/DE)
- 2 Workshops pages (EN/DE)
- 2 About pages (EN/DE)
- 1 Settings page

✅ **Features:**
- Rich text editing
- Image uploads
- Draft/Publish workflow
- GitHub version control
- Auto-deployment

✅ **Security:**
- GitHub authentication
- Only authorized users can edit
- All changes tracked in Git

---

## ⚠️ Important Notes

### **Publishing Delay:**
Changes take **30-60 seconds** to go live because:
1. CMS commits to GitHub
2. Vercel detects the change
3. Vercel rebuilds and deploys
4. Changes appear live

This is normal! Not instant, but automated.

### **What Happens Behind the Scenes:**
```
1. You edit in CMS
2. Click "Publish"
3. CMS creates a Git commit
4. GitHub receives commit
5. Vercel webhook triggered
6. Site rebuilds (30 seconds)
7. Changes live! ✅
```

---

## 🔐 Security Best Practices

### **Access Control:**
- Only people with GitHub access to the repo can use the CMS
- To add editors:
  1. Go to GitHub repo settings
  2. Add them as collaborators
  3. They can now login to CMS

### **Password Security:**
- GitHub OAuth handles authentication
- No passwords stored in the site
- Secure by default

---

## 🆘 Troubleshooting

### **Problem: "Login with GitHub" doesn't work**

**Solution:**
1. Check OAuth app callback URL is correct
2. Verify environment variables in Vercel
3. Try redeploying

### **Problem: Changes don't appear after publishing**

**Solution:**
1. Wait 60 seconds (Vercel rebuild takes time)
2. Hard refresh browser: `Cmd + Shift + R`
3. Check Vercel deployments for errors

### **Problem: Can't see admin panel**

**Solution:**
1. Make sure you're going to `/admin` (not `/admin/`)
2. Check that `admin/index.html` exists
3. Redeploy from Vercel

### **Problem: Image uploads not working**

**Solution:**
1. Check `/assets/uploads/` folder exists
2. Verify media_folder setting in config
3. Try uploading smaller image

---

## 📚 Resources

### **Decap CMS Documentation:**
- Official docs: https://decapcms.org/docs/intro/
- Widget reference: https://decapcms.org/docs/widgets/
- Configuration: https://decapcms.org/docs/configuration-options/

### **Video Tutorials:**
- YouTube: Search "Decap CMS tutorial"
- "Netlify CMS" tutorials also apply (Decap is the new name)

---

## 🎓 Next Steps

### **After Initial Setup:**

1. **Test it out:**
   - Go to `/admin`
   - Edit the German homepage
   - Change one heading
   - Publish and check the live site

2. **Train your team:**
   - Show them the admin panel
   - Walk through editing one page
   - Explain the publish workflow

3. **Customize (optional):**
   - Add more editable fields
   - Configure image sizes
   - Add custom widgets

---

## 🔧 Advanced: Adding More Editable Fields

If you want to make more content editable, edit `admin/config.yml`:

```yaml
# Example: Add a new field to homepage
fields:
  - {label: "New Field Name", name: "field_id", widget: "string"}
  - {label: "Long Text", name: "long_text", widget: "text"}
  - {label: "Rich Text", name: "rich_text", widget: "markdown"}
  - {label: "Image", name: "image", widget: "image"}
```

Available widget types:
- `string` - Short text
- `text` - Long text (paragraph)
- `markdown` - Rich text editor
- `image` - Image upload
- `datetime` - Date picker
- `boolean` - Checkbox
- `select` - Dropdown
- `list` - Repeatable items

---

## ✅ Checklist: Is Everything Working?

- [ ] `/admin` loads without errors
- [ ] "Login with GitHub" button appears
- [ ] Can login successfully
- [ ] See list of pages to edit
- [ ] Can edit and save changes
- [ ] Changes appear after ~30 seconds
- [ ] Images upload successfully

**If all checked: You're all set! 🎉**

---

## 📞 Need Help?

1. **Check the docs:** https://decapcms.org/docs/
2. **GitHub issues:** Create issue in your repository
3. **Ask AI:** Use Cursor or ChatGPT to troubleshoot

---

## 🎉 You're Ready!

The CMS is now set up and ready to use. No more command line, no more code editing!

**Just:**
1. Go to `/admin`
2. Edit content
3. Publish
4. Done! ✅

**Enjoy your new CMS! 🚀**

---

*Last Updated: March 2024*
*CMS: Decap CMS v3.0*
