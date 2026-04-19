# Resume Prompt

> [!IMPORTANT]
> Paste this exactly into a new session to pick up where we left off:

```
I'm building the H.U.S.T.L.E Consulting LLC website. Read `/Users/jahleel/hustle-consulting-website/HANDOFF.md` for full context, then read the implementation plan at `/Users/jahleel/AI-Knowledgebase/docs/superpowers/plans/2026-04-10-hustle-consulting-website.md`. Tasks 1, 2, and 3 are complete. Continue from Task 4.

IMPORTANT: Use subagent-driven development throughout. For every task:
1. Dispatch a fresh implementer subagent with the full task text + context (never let it read the plan itself — provide all needed content directly in the prompt)
2. After the implementer reports DONE, dispatch a spec compliance reviewer subagent — it reads the relevant files and verifies everything in the spec was built and nothing extra was added. It must return VERDICT: ✅ SPEC COMPLIANT or VERDICT: ❌ ISSUES FOUND with a bullet list.
3. Only after spec passes, dispatch a code quality reviewer subagent — it checks for bugs, correctness issues, accessibility problems, and code quality. It returns VERDICT: ✅ APPROVED or VERDICT: ❌ NEEDS FIXES with required changes.
4. If either reviewer finds issues, dispatch the implementer to fix them, then re-run the relevant reviewer. Do not proceed to the next task until both reviews pass.
5. After all tasks are complete, run a final full-codebase reviewer before closing out.

This two-stage review process is critical — it has already caught real bugs and accessibility issues in this project.
```

---

# H.U.S.T.L.E Consulting LLC — Project Handoff

Use this file to resume the build in a new session with full context.

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

CSS vars available everywhere: `--bg`, `--cream`, `--red`, `--surface`, `--border`

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
│   │   ├── Nav.astro              ✅ done (Task 3)
│   │   ├── Footer.astro           ✅ done (Task 3)
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
| 3 | Nav + Footer Components | ✅ Complete |
| 4 | Hero Section | ✅ Complete |
| 5 | Services Section | ✅ Complete |
| 6 | Home Page | ✅ Complete |
| 7 | About Section + Page | ✅ Complete |
| 8 | Services Page | ✅ Complete |
| 9 | PDF Generation Library | ✅ Complete |
| 10 | Email Sender Library | ✅ Complete |
| 11 | Contact API Route | ✅ Complete |
| 12 | Contact Form + Contact Page | ✅ Complete |
| 13 | Build + Railway Deploy | ✅ Complete |

### What Task 3 produced

- **`Nav.astro`**: A sophisticated, fixed top navigation bar.
  - Glassmorphic design (`backdrop-filter: blur`, semi-transparent background).
  - Dynamic scroll listener that deepens border opacity on scroll.
  - Active page detection with `aria-current="page"`.
  - Responsive visibility (links hidden on mobile, shown on `md:` breakpoints).
  - Premium "Book a Call" CTA with hover transitions.
- **`Footer.astro`**: A minimal, elegant footer strip.
  - Subtle red top border.
  - Branded tagline and copyright information.
  - Correct text color inheritance and accessibility labels.

---

## Subagent-Driven Development Process

This project mandates a multi-stage subagent review workflow for every task. This process was established during Task 3 to ensure high-quality, spec-compliant code.

### The Workflow

1.  **IMPLEMENTER**: Creates the code based on the task description.
2.  **SPEC COMPLIANCE REVIEWER**: Verifies all requirements are met and no extra code was added. Returns a binary verdict.
3.  **CODE QUALITY REVIEWER**: Checks for bugs, accessibility (A11y), responsive design issues, and idiomatic code patterns.

### Rationale: Why we do this

AI agents often focus on completing the functional task but may miss subtle "production-grade" details. This workflow creates a "checks and balances" system that prevents technical debt from accumulating.

### Specific Bugs Caught in Task 3

The subagent review process proved its value immediately by catching the following issues in Task 3:
- **Responsive Layout**: Nav links were overlapping on mobile devices; fixed by hiding them behind a menu/breakpoint.
- **Accessibility (A11y)**: Missing `aria-current="page"` on active links, which is critical for screen readers.
- **Semantic HTML**: Missing `aria-label` on the header `<nav>` element and the logo link.
- **CSS Fragility**: The footer copyright text relied on implicit parent colors which caused it to disappear on certain background transitions; fixed by explicitly setting color vars.

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
