# R Sristi — Portfolio Website

A premium, futuristic portfolio built with React + Three.js + Framer Motion.

## ✨ Features
- 🌐 Interactive 3D laptop with floating animation & mouse parallax
- 🤖 AI chatbot powered by Gemini API (knows your resume!)
- ⌨️ Command palette (press `/`)
- 🎨 Glassmorphism UI with neon blue/purple theme
- 🌊 Smooth scroll with Lenis
- 🔮 3D skill sphere (React Three Fiber)
- 🃏 3D tilt project cards
- 📱 Fully responsive
- ✨ Custom glowing cursor
- 🔗 Particles background

---

## 🚀 Local Setup (VS Code)

### 1. Extract the zip and open in VS Code
```bash
cd sristi-portfolio
code .
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start dev server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📁 Folder Structure

```
sristi-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── LaptopScene.jsx     ← Three.js 3D laptop
│   │   ├── sections/
│   │   │   ├── Hero.jsx            ← Main hero with 3D
│   │   │   ├── About.jsx           ← About + education
│   │   │   ├── Skills.jsx          ← 3D skill sphere
│   │   │   ├── Projects.jsx        ← 3D tilt cards
│   │   │   ├── Achievements.jsx    ← Timeline
│   │   │   └── Contact.jsx         ← Contact form
│   │   └── ui/
│   │       ├── ChatBot.jsx         ← Gemini AI chatbot
│   │       ├── CommandPalette.jsx  ← Press / to open
│   │       ├── CustomCursor.jsx    ← Glowing cursor
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       └── ParticleBackground.jsx
│   ├── data/
│   │   └── resume.js               ← ← ALL YOUR DATA IS HERE
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## 🎨 Customization

### Update your data
Edit `src/data/resume.js` — this is the single source of truth for all sections.

### Change theme colors
Edit `tailwind.config.js` and `src/index.css` CSS variables.

### Add your resume PDF for download
Drop `resume.pdf` into `/public/` and link to `/resume.pdf`.

---

## 🌍 Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push to GitHub: `git init && git add . && git commit -m "init" && git push`
2. Go to vercel.com → New Project → Import your repo
3. Framework: Vite (auto-detected)
4. Click Deploy ✅

---

## 🤖 Chatbot Note
The Gemini API key is included in `src/data/resume.js`. For production, move it to an environment variable:
1. Create `.env` file: `VITE_GEMINI_KEY=your_key_here`
2. In `ChatBot.jsx` use: `import.meta.env.VITE_GEMINI_KEY`
3. Add the env var in Vercel dashboard under Settings → Environment Variables

---

## 🛠️ Built With
- React 18 + Vite
- Three.js + React Three Fiber + Drei
- Framer Motion
- Lenis (smooth scroll)
- Tailwind CSS
- Gemini API (chatbot)
