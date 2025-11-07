# Deployment Guide - Shakespeare Genetic Algorithm App

Complete step-by-step instructions for deploying your app to the cloud.

## Prerequisites

Before deploying, ensure you have:
- ✅ All files in the `shakespeare-ga` folder
- ✅ Node.js and npm installed
- ✅ A GitHub account (for most deployment options)

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest and fastest deployment option. It's made by the creators of React and offers free hosting.

### Step 1: Create a Vercel Account
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### Step 2: Push Your Code to GitHub

Open your terminal and navigate to the shakespeare-ga folder:

```bash
cd shakespeare-ga
```

Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Shakespeare GA app"
```

Create a new repository on GitHub:
1. Go to [https://github.com/new](https://github.com/new)
2. Name it: `shakespeare-genetic-algorithm`
3. Click **"Create repository"**
4. Don't initialize with README (we already have code)

Connect and push to GitHub:
```bash
git remote add origin https://github.com/YOUR-USERNAME/shakespeare-genetic-algorithm.git
git branch -M main
git push -u origin main
```
*Replace `YOUR-USERNAME` with your actual GitHub username*

### Step 3: Deploy on Vercel

**Option A: Via Vercel Website (Easiest)**
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Find your `shakespeare-genetic-algorithm` repository
4. Click **"Import"**
5. Vercel will auto-detect it's a React app
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete
8. You'll get a live URL like: `https://shakespeare-genetic-algorithm.vercel.app`

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd shakespeare-ga

# Deploy
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → shakespeare-genetic-algorithm
- **Directory?** → ./
- **Override settings?** → No

**Your app is now live!** 🎉

---

## Option 2: Deploy to Render.com (Free Alternative)

Render offers free static site hosting with automatic deployments from GitHub.

### Step 1: Create a Render Account
1. Go to [https://render.com/register](https://render.com/register)
2. Click **"Sign up with GitHub"**
3. Authorize Render

### Step 2: Push Code to GitHub
(Follow the same GitHub steps from Vercel Option 1, Step 2)

### Step 3: Deploy on Render

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Click **"Connect a repository"**
4. Grant Render access to your repository
5. Select your `shakespeare-genetic-algorithm` repository
6. Configure the site:
   - **Name**: `shakespeare-ga`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
7. Click **"Create Static Site"**
8. Wait 3-5 minutes for first deployment
9. You'll get a URL like: `https://shakespeare-ga.onrender.com`

**Your app is now live!** 🎉

### Automatic Deployments
Every time you push to GitHub, Render will automatically redeploy your app!

---

## Option 3: Deploy to GitHub Pages (Traditional)

Free hosting directly on GitHub. Best for simple projects.

### Step 1: Install gh-pages Package
```bash
cd shakespeare-ga
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Open `package.json` and add these lines:

**At the top level** (after `"name"` and before `"version"`):
```json
"homepage": "https://YOUR-USERNAME.github.io/shakespeare-genetic-algorithm",
```

**In the `"scripts"` section**, add:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Your scripts section should look like:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

*Replace `YOUR-USERNAME` with your GitHub username*

### Step 3: Push to GitHub
(Follow the same GitHub steps from Option 1, Step 2)

### Step 4: Deploy
```bash
npm run deploy
```

This will:
1. Build your app
2. Create a `gh-pages` branch
3. Deploy to GitHub Pages

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select branch: `gh-pages` and folder: `/ (root)`
4. Click **Save**
5. Your app will be live at: `https://YOUR-USERNAME.github.io/shakespeare-genetic-algorithm`

**Your app is now live!** 🎉

### Update Deployment
Whenever you make changes:
```bash
git add .
git commit -m "Your update message"
git push
npm run deploy
```

---

## Option 4: Deploy to Netlify

Another popular free hosting option.

### Step 1: Create Netlify Account
1. Go to [https://app.netlify.com/signup](https://app.netlify.com/signup)
2. Sign up with GitHub

### Step 2: Push to GitHub
(Follow the same GitHub steps from Option 1, Step 2)

### Step 3: Deploy on Netlify

**Via Website:**
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"GitHub"**
4. Select your repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click **"Deploy site"**

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Your app is now live!** 🎉

---

## Comparison of Deployment Options

| Platform | Ease | Speed | Free Tier | Auto-Deploy | Custom Domain |
|----------|------|-------|-----------|-------------|---------------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Very Fast | Yes | ✅ | ✅ |
| **Render** | ⭐⭐⭐⭐ | Fast | Yes | ✅ | ✅ |
| **GitHub Pages** | ⭐⭐⭐ | Medium | Yes | ✅ | ✅ |
| **Netlify** | ⭐⭐⭐⭐ | Fast | Yes | ✅ | ✅ |

### Recommendation:
- **For beginners**: Use **Vercel** (easiest, fastest)
- **For learning**: Use **GitHub Pages** (good to learn Git)
- **For alternatives**: Use **Render** or **Netlify**

---

## Testing Your Deployment

After deployment, test your app:

1. ✅ Open the live URL
2. ✅ Select a Shakespeare quote
3. ✅ Click "Start Evolution"
4. ✅ Watch the genetic algorithm work
5. ✅ Try adjusting parameters
6. ✅ Test custom phrase input
7. ✅ Test on mobile device

---

## Troubleshooting

### Build Fails on Deployment

**Problem**: `npm install` or `npm run build` fails

**Solutions**:
1. Make sure `package.json` has all dependencies
2. Delete `node_modules` and `package-lock.json`, then run:
   ```bash
   npm install
   npm run build
   ```
3. Check for TypeScript errors locally first

### 404 Error on Deployed Site

**Problem**: Page shows 404 or routing doesn't work

**Solutions**:
1. For Vercel: The `vercel.json` file should handle this
2. For Netlify: Add a `_redirects` file in `public/`:
   ```
   /*    /index.html   200
   ```
3. For GitHub Pages: Make sure homepage URL is correct in `package.json`

### Blank White Screen

**Problem**: App loads but shows blank screen

**Solutions**:
1. Open browser DevTools (F12) → Console
2. Check for JavaScript errors
3. Ensure all file paths are correct
4. Verify `public/index.html` exists
5. Check build completed successfully

### Changes Not Showing

**Problem**: Pushed changes but site looks the same

**Solutions**:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check deployment logs to ensure build succeeded
4. For GitHub Pages, wait 2-3 minutes after `npm run deploy`

---

## Sharing Your App

Once deployed, share your genetic algorithm app:

1. **Copy the live URL** (e.g., `https://your-app.vercel.app`)
2. **Add to your resume** as a portfolio project
3. **Share on LinkedIn** with hashtags: #GeneticAlgorithm #ReactJS #AI
4. **Add to GitHub README** with a live demo link
5. **Include in your assignment submission**

---

## Next Steps After Deployment

1. ✅ Test all features on the live site
2. ✅ Share the URL with your instructor
3. ✅ Add the URL to your project documentation
4. ✅ Take screenshots for your report
5. ✅ Optionally add Google Analytics to track visitors

---

## Need Help?

If you encounter issues:
1. Check the platform's documentation (Vercel/Render/etc.)
2. Review the error messages in deployment logs
3. Search for the error on Stack Overflow
4. Ask your instructor or classmates

---

**Congratulations on deploying your Genetic Algorithm app!** 🎉🧬

