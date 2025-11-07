# Quick Deploy Reference Card

## 🚀 Fastest Deployment (5 Minutes)

### Using Vercel (Recommended)

1. **Create GitHub Repository**
   ```bash
   cd shakespeare-ga
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create repo on GitHub**: https://github.com/new
   - Name: `shakespeare-genetic-algorithm`
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/shakespeare-genetic-algorithm.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Vercel**
   - Go to: https://vercel.com/new
   - Click "Import" on your repository
   - Click "Deploy"
   - Done! ✅

---

## 📋 All Deployment Commands

### Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Render
- Use website: https://dashboard.render.com
- Click: New + → Static Site
- Build: `npm install && npm run build`
- Publish: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json: "homepage": "https://YOUR-USERNAME.github.io/shakespeare-genetic-algorithm"
# Add to scripts: "predeploy": "npm run build", "deploy": "gh-pages -d build"
npm run deploy
```

### Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## ⚡ Update Deployment

### Vercel/Render/Netlify (Auto-deploy enabled)
```bash
git add .
git commit -m "Update message"
git push
# Automatically deploys!
```

### GitHub Pages
```bash
git add .
git commit -m "Update message"
git push
npm run deploy
```

---

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**404 error?**
- Check `vercel.json` or `render.yaml` exists
- Verify homepage in `package.json`

**Blank screen?**
- Press F12 → Check Console for errors
- Hard refresh: Ctrl+Shift+R

---

## ✅ Pre-Deployment Checklist

- [ ] Code builds locally: `npm run build`
- [ ] App runs locally: `npm start`
- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Deployment platform account created
- [ ] Domain configured (optional)

---

## 🔗 Your Deployment URLs

Write down your URLs here:

- **GitHub Repo**: _________________________
- **Live Site**: _________________________
- **Deployment Date**: _________________________

---

For detailed instructions, see DEPLOYMENT_GUIDE.md
