# Analytics Career Connect — Deploy Karne Ka Tarika

## Step 1 — .env File Banao
Project root mein `.env` naam ki file banao aur yeh paste karo:

```
VITE_NVIDIA_KEY_QUALITY=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
VITE_NVIDIA_KEY_ANALYSIS=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
VITE_NVIDIA_KEY_FAST=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
VITE_NVIDIA_KEY_FALLBACK=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
```

## Step 2 — GitHub Pe Upload
1. github.com pe jao → New Repository → "resume-builder" naam do
2. ZIP extract karo local mein
3. Upar wali `.env` file banao (Step 1 wali)
4. GitHub Desktop ya commands se upload karo:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUMHARA-USERNAME/resume-builder.git
git push -u origin main
```
⚠️ .env file automatically exclude hogi (.gitignore mein hai)

## Step 3 — Vercel Pe Deploy (Free)
1. vercel.com pe jao → "Add New Project"
2. GitHub se login karo
3. Apna repo select karo
4. "Environment Variables" section mein 4 keys add karo:
   - VITE_NVIDIA_KEY_QUALITY = (key paste karo)
   - VITE_NVIDIA_KEY_ANALYSIS = (key paste karo)
   - VITE_NVIDIA_KEY_FAST = (key paste karo)
   - VITE_NVIDIA_KEY_FALLBACK = (key paste karo)
5. "Deploy" click karo
6. 2-3 minute mein website live! 🎉
