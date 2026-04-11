# H.U.S.T.L.E Consulting LLC — Project Handoff

Use this file to resume the build in a new chat session with full context.

---

## What This Project Is

A 4-page dark-immersive 3D business website for **H.U.S.T.L.E Consulting LLC**.

- **Owner:** Jahleel (Founder & CEO)
- **Team:** Jahleel + Princess Uzoma (Business Dev & Finance)
- **Email:** hustleconsultingllc@gmail.com
- **Tagline:** "Changing the world one hustle at a time"
- **Acronym:** Humbly Use Skills That Lead Everyone
- **Services:** Business Consulting (AI-leveraged), AI Strategy, App Development, Web Development
- **Target clients:** Small/local business owners

---

## Key Files

| File | What it is |
|---|---|
| `/Users/jahleel/AI-Knowledgebase/docs/superpowers/specs/2026-04-10-hustle-consulting-website-design.md` | Full design spec (approved) |
| `/Users/jahleel/AI-Knowledgebase/docs/superpowers/plans/2026-04-10-hustle-consulting-website.md` | Full implementation plan (13 tasks) |
| `/Users/jahleel/hustle-consulting-website/` | Project root |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 5 (SSR, Node adapter, standalone mode) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | GSAP + ScrollTrigger |
| React islands | `@astrojs/react` |
| PDF generation | `pdf-lib` |
| Email delivery | Resend → `hustleconsultingllc@gmail.com` |
| Testing | Vitest |
| Source control | GitHub: `https://github.com/12mensea25-dev/hustle-consulting-website` |
| Hosting | Railway (auto-deploys from GitHub `main`) |

---

## Brand

| Element | Value |
|---|---|
| Background | `#0a0a0a` |
| Text | `#F5F0E3` (warm cream) |
| Accent | `#C0392B` (red/crimson) |
| Display font | Oswald 700/900 (Google Fonts) |
| Body font | Georgia serif |
| Logo | Handshake (black + red hands) |
| Vibe | Dark immersive 3D — animated grid floor, mouse parallax, floating tags, glow orb |

---

## Site Structure

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero (3D grid, parallax) + Services section |
| About | `/about` | Mission + acronym breakdown + team cards |
| Services | `/services` | Expanded per-service sections |
| Contact | `/contact` | Intake form → email + PDF to hustleconsultingllc@gmail.com |

---

## Assets

| Asset | Location |
|---|---|
| Jahleel headshot | `public/assets/jahleel.jpg` ✅ |
| Princess photo | `public/assets/princess.jpg` ⚠️ needs to be added manually |

---

## Project File Map

```
hustle-consulting-website/
├── public/assets/
│   ├── jahleel.jpg          ✅ ready
│   └── princess.jpg         ⚠️ add manually
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro ✅ done
│   ├── components/
│   │   ├── Nav.astro              ← Task 3
│   │   ├── Footer.astro           ← Task 3
│   │   ├── HeroSection.astro      ← Task 4
│   │   ├── ServicesSection.astro  ← Task 5
│   │   ├── AboutSection.astro     ← Task 7
│   │   ├── ContactSection.astro   ← Task 12
│   │   └── ContactForm.tsx        ← Task 12
│   ├── pages/
│   │   ├── index.astro      ← Task 6
│   │   ├── about.astro      ← Task 7
│   │   ├── services.astro   ← Task 8
│   │   ├── contact.astro    ← Task 12
│   │   └── api/contact.ts   ← Task 11
│   ├── lib/
│   │   ├── pdf.ts           ← Task 9
│   │   └── email.ts         ← Task 10
│   └── styles/
│       └── global.css       ✅ done
├── tests/
│   ├── pdf.test.ts          ← Task 9
│   ├── email.test.ts        ← Task 10
│   └── contact-api.test.ts  ← Task 11
├── astro.config.mjs         ✅ done
├── railway.json             ✅ done
└── .env.example             ✅ done
```

---

## Task Progress

| # | Task | Status |
|---|---|---|
| 1 | Project Scaffold | ✅ Complete |
| 2 | Global Styles + Base Layout | ✅ Complete |
| 3 | Nav + Footer Components | ⏳ Next |
| 4 | Hero Section | ⏳ Pending |
| 5 | Services Section | ⏳ Pending |
| 6 | Home Page | ⏳ Pending |
| 7 | About Section + Page | ⏳ Pending |
| 8 | Services Page | ⏳ Pending |
| 9 | PDF Generation Library | ⏳ Pending |
| 10 | Email Sender Library | ⏳ Pending |
| 11 | Contact API Route | ⏳ Pending |
| 12 | Contact Form + Contact Page | ⏳ Pending |
| 13 | Build + Railway Deploy | ⏳ Pending |

---

## How to Resume

Tell Claude in the new session:

> "I'm building the H.U.S.T.L.E Consulting LLC website. Read `/Users/jahleel/hustle-consulting-website/HANDOFF.md` for full context, then read the implementation plan at `/Users/jahleel/AI-Knowledgebase/docs/superpowers/plans/2026-04-10-hustle-consulting-website.md`. Tasks 1 and 2 are complete. Continue from Task 3 using subagent-driven development."

---

## Before Deploying (Task 13)

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key
3. Add `RESEND_API_KEY=re_your_key` to Railway environment variables
4. Connect Railway to the GitHub repo `hustle-consulting-website`
5. Railway will auto-deploy on every push to `main`

---

## Commands

```bash
cd /Users/jahleel/hustle-consulting-website
npm run dev        # local dev server
npm run build      # production build
npm test           # run Vitest tests
git push           # triggers Railway auto-deploy
```
