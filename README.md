# Abhay Chaudhary — Personal Portfolio Website

A clean, light, smooth, and premium personal portfolio website for **Abhay Chaudhary** (Computer Science & Engineering — Graphics & Gaming).

Designed in a quiet, monochrome style (black, white, and warm off-white `#f4f2ee`), with custom CSS micro-animations, self-hosted fonts, Lenis smooth scrolling, an interactive 3D hanging lanyard ID card, a periodic table of tech skills, an expanding project accordion gallery, an ink-flood certification index, a unified chronological path, and a pinned horizontal achievements gallery.

---

## 🚀 Quick Start Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build Production Bundle**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📋 Sections Overview

| Section Index | Title | Component Path | Description |
| :--- | :--- | :--- | :--- |
| **00 — Hero** | Hero & Intro Video | `src/components/hero/Hero.tsx` | Seamless video loop with sound controls, mix-blend-mode multiply, and ghost backdrop |
| **01 — About** | About & ID Card | `src/components/sections/AboutSection.tsx` | 3-column grid featuring interactive hanging 3D lanyard developer ID card |
| **02 — Skills** | Skills Periodic Table | `src/components/sections/SkillsSection.tsx` | 8-column periodic table with family filter chips & 150px sticky inspector panel |
| **03 — Work** | Selected Work | `src/components/sections/WorkSection.tsx` | Expanding accordion gallery with slim folded spines and grayscale illustrative UIs |
| **04 — Certifications** | Certifications & Leadership | `src/components/sections/CertificationsSection.tsx` | Ink-flood numbered index list with hover flood animation and sliding arrow indicators |
| **05 — Experience** | Experience & Education | `src/components/sections/ExperienceSection.tsx` | Unified vertical chronological path with scroll-animated ink spine |
| **06 — Achievements** | Accomplishments | `src/components/sections/AchievementsSection.tsx` | Pinned horizontal scrolling gallery with count-up numbers and brand glow cards |
| **07 — Contact** | Get In Touch | `src/components/sections/ContactSection.tsx` | Interactive letter-hopping heading, copy email button with feedback, and spinning text badge |

---

## 🎥 Rebuilding the Hero Video Loop

The intro video pipeline converts raw MP4/MOV videos into a seamless, 9.5-second looping video (`hero.mp4` and `hero.webm`) with sample-accurate audio cross-fading and background whitening.

To rebuild the video assets:

```bash
python scripts/build-hero-assets.py
```

### Requirements for Python script:
- `opencv-python`
- `imageio-ffmpeg`
- `pydub`
- `numpy`

---

## 📜 Credits & Brand Logo Licenses

All brand logos located in `public/logos/` are trademarks of their respective owners:
- **Devicon** (MIT License): C++, Python, C#, Unity, React, TypeScript, JavaScript, Vite, Supabase, MySQL, Firebase, Git, Figma, Blender, VS Code.
- **Simple Icons** (CC0 1.0 Universal / MIT): LeetCode, CodeChef, GeeksforGeeks, HackerRank, IEEE.

Used strictly for educational and self-promotional portfolio demonstration under fair use guidelines.
Full license text available in `public/logos/LICENSE.txt`.
