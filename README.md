# ROSHINI A — Premium 3D Animated Developer Portfolio

A production-ready, interactive 3D developer portfolio website built for **ROSHINI A** — Full-Stack Developer | Software Development Enthusiast | AI & Machine Learning Enthusiast.

---

## 🌟 Key Features

1. **Editorial 3D Hero Experience**
   - Three.js animated mathematical cyber-icosahedron lattice with interactive mouse-follow parallax and ambient particle constellation.
   - Large typography with electric blue (`#2563eb`) and cyber cyan (`#00f0ff`) accents on deep navy/charcoal canvas (`#05070d`).
   - Reduced-motion accessibility fallback.

2. **Official Document Viewer & Verification Hub**
   - **Interactive Modal Viewer**: Fullscreen toggle, Zoom In / Zoom Out (up to 350%), 90° rotation, drag-and-pan, and instant high-res original download.
   - **Original Uploaded Documents**: Connected to all authentic uploaded certificates and internship documents.
   - **Accurate Document States**: Explicit differentiation between verified uploaded documents and "Pending Upload" states. No fake buttons or fabricated credentials.
   - **Timeline Discrepancy Flags**: Transparent alerts for recorded date differences (e.g. StaxTech and Edufyi Tech Solutions) displaying both document dates and resume timelines.

3. **Core Sections**
   - **Hero**: Personal branding, tagline, quick stats, 3D lattice, primary CTAs.
   - **About Me**: Official bio, high-resolution portrait, academic highlights (CGPA 8.89/10), core competencies, and language proficiencies.
   - **Technical Skills**: Filterable categories covering Languages, Frontend, Backend, Databases, Tools, and Core CS Concepts.
   - **Education Timeline**: B.E. CSE at J.N.N. Institute of Engineering, Class XII, Class X.
   - **Internship Experience**: LevelShift, StaxTech, Cognifyz Technologies, CodSoft, and Elythra Edufyi Tech Solutions with respective offer letter / completion certificate viewer.
   - **Professional Certifications Gallery**: Infosys Springboard (AI), Microsoft & LinkedIn (Generative AI), HP LIFE (Data Science), Google Cloud / Simplilearn (Image Generation), Accenture (Software Engineering), and IBM SkillsBuild (Web Dev).
   - **Projects Showcase**: Flagship prototype **HAZARDIQ** (AI & GIS-Based Disaster Decision-Support Platform) with architecture overview and modular project structure.
   - **Coding Profiles**: GitHub, LinkedIn, LeetCode, HackerRank with verified direct links and one-click copy.
   - **Contact Form**: Form validation, direct email link (`roshini120075@gmail.com`), phone (`+91 9363120075`), and Chennai location.
   - **Resume Hub**: Quick modal preview and original file download.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Local URL: `http://localhost:3000/`

---

## 📦 Production Build & Vercel Deployment

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel:
The project is preconfigured with `vercel.json` for seamless static hosting and routing.
1. Push repository to GitHub (`https://github.com/Roshini147/...`)
2. Import repository into [Vercel](https://vercel.com)
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**!

---

## 📂 Asset Organization

```
public/
  assets/
    profile/
      roshini.image.png
    resume/
      resume.png
    certificates/
      infosys/infosys.jpg
      microsoft/microsoft.jpg
      hp/HP.jpg
      google-cloud/google cloud.jpg
      accenture/accenture.png
      ibm/IBM.jpg
    internships/
      codsoft/completion-certificate/codsoft.jpg
      cognifyz/offer-letter/cognifyz.jpg
      staxtech/completion-certificate/staxtech.jpg
      levelshift/completion-certificate/levelshift.png
      edufyi/completion-certificate/edufyi.jpg
```

All data configurations are centralized and editable in [`src/data/portfolioData.ts`](src/data/portfolioData.ts).
