# Mobile-First Redesign Implementation Plan

> **For Claude:** Use executing-plans or follow manually task-by-task.

**Goal:** Fix broken mobile nav and make the site feel alive on both mobile and desktop.

**Architecture:** Pure CSS + vanilla JS for all animations (IntersectionObserver for scroll-reveal, class toggles for mobile menu). No new libraries. Astro components stay server-rendered.

**Tech Stack:** Astro, Tailwind CSS v4, vanilla JS, CSS keyframes

---

### Task 1: Fix Mobile Nav — Hamburger Menu

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Replace Nav.astro entirely**

```astro
---
const links = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
];
const pathname = Astro.url.pathname;
---
<nav id="main-nav" aria-label="Main" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300" style="background: rgba(10,10,10,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(192,57,43,0.2);">
  <a href="/" aria-label="H.U.S.T.L.E Consulting LLC — Home" class="flex flex-col no-underline">
    <span class="text-[15px] font-black tracking-[4px] uppercase text-[var(--cream)]">H.U.S.T.L.E</span>
    <span class="text-[8px] font-bold tracking-[3px] uppercase text-[var(--red)]">Consulting LLC</span>
  </a>

  <!-- Desktop links -->
  <div class="hidden md:flex items-center gap-9">
    {links.map(l => (
      <a href={l.href} aria-current={pathname === l.href ? 'page' : undefined} class="text-[10px] font-black tracking-[3px] uppercase text-[var(--cream)] opacity-50 hover:opacity-100 transition-opacity no-underline">{l.label}</a>
    ))}
    <a href="/contact" class="text-[10px] font-black tracking-[2px] uppercase px-5 py-2.5 border border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white transition-all no-underline">Book a Call</a>
  </div>

  <!-- Hamburger button (mobile only) -->
  <button id="menu-toggle" aria-label="Open menu" aria-expanded="false" class="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none">
    <span class="ham-line block w-6 h-[2px] bg-[var(--cream)] transition-all duration-300 origin-center"></span>
    <span class="ham-line block w-6 h-[2px] bg-[var(--cream)] transition-all duration-300 origin-center"></span>
    <span class="ham-line block w-6 h-[2px] bg-[var(--cream)] transition-all duration-300 origin-center"></span>
  </button>
</nav>

<!-- Mobile menu overlay -->
<div id="mobile-menu" class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 transition-all duration-300 pointer-events-none" style="background: rgba(10,10,10,0.97); opacity: 0; transform: translateY(-8px);">
  {links.map(l => (
    <a href={l.href} class="text-[28px] font-black tracking-[6px] uppercase text-[var(--cream)] no-underline hover:text-[var(--red)] transition-colors">{l.label}</a>
  ))}
  <a href="/contact" class="mt-4 px-10 py-4 bg-[var(--red)] text-white text-[13px] font-black tracking-[3px] uppercase no-underline" style="box-shadow: 0 0 40px rgba(192,57,43,0.4);">Book a Call</a>
</div>

<style>
  #main-nav.scrolled {
    border-bottom-color: rgba(192,57,43,0.4);
  }
  #mobile-menu.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  #menu-toggle.open .ham-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  #menu-toggle.open .ham-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  #menu-toggle.open .ham-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
</style>

<script>
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle?.addEventListener('click', () => {
    const isOpen = menu?.classList.contains('open');
    menu?.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(!isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
</script>
```

**Step 2: Verify**
- Open site on mobile viewport in browser
- Three lines appear top right
- Tapping opens full-screen menu
- Tapping a link or outside closes it

**Step 3: Commit**
```bash
git add src/components/Nav.astro
git commit -m "fix: add working mobile hamburger nav"
```

---

### Task 2: Global Scroll-Reveal Setup

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Add reveal CSS to global.css**

Append to `src/styles/global.css`:
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* Tactile button press */
.btn-press:active {
  transform: scale(0.97);
}
```

**Step 2: Add IntersectionObserver script to BaseLayout.astro**

Add before closing `</body>`:
```html
<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

**Step 3: Commit**
```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: add scroll-reveal system and tactile button press"
```

---

### Task 3: Hero Section — Left-Align Desktop + Mobile Polish

**Files:**
- Modify: `src/components/HeroSection.astro`

**Step 1: Update hero layout**

Change the hero content from centered to left-aligned split layout on desktop. Replace the `<div id="hero-inner">` block and its parent section opening:

```astro
<section id="hero" class="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-20">
```

Replace the hero-inner div:
```astro
  <div id="hero-inner" class="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 text-left" style="animation: heroEntrance 1.2s cubic-bezier(0.23,1,0.32,1) both;">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-8 h-px bg-[var(--red)]"></div>
      <span class="text-[10px] font-black tracking-[6px] uppercase text-[var(--red)]">Humbly Use Skills That Lead Everyone</span>
    </div>

    <h1 class="font-black uppercase leading-[0.88] mb-2 reveal" style="font-size: clamp(52px, 10vw, 110px); letter-spacing: -2px; text-shadow: 0 0 80px rgba(192,57,43,0.2);">
      Built for<br>
      <span class="text-[var(--red)]">Local</span><br>
      <span style="-webkit-text-stroke: 2px var(--cream); color: transparent;">Business.</span>
    </h1>

    <p class="text-[12px] tracking-[4px] uppercase mt-6 mb-10 reveal reveal-delay-1" style="color: rgba(245,240,227,0.4);">
      Changing the world one hustle at a time
    </p>

    <div class="flex gap-4 flex-wrap reveal reveal-delay-2">
      <a href="/contact" class="btn-press px-10 py-4 bg-[var(--red)] text-white text-[11px] font-black tracking-[3px] uppercase no-underline transition-all duration-300 hover:-translate-y-1" style="box-shadow: 0 0 40px rgba(192,57,43,0.5), 0 20px 60px rgba(0,0,0,0.5);">
        Book a Discovery Call
      </a>
      <a href="/services" class="btn-press px-10 py-4 text-[11px] font-black tracking-[3px] uppercase no-underline transition-all duration-300 hover:border-[var(--cream)] hover:text-[var(--cream)]" style="border: 1.5px solid rgba(245,240,227,0.25); color: rgba(245,240,227,0.6);">
        Our Services
      </a>
    </div>
  </div>
```

Also update the mouse parallax script to use `translateX` only (not both axes) to avoid fighting the left-align:
```js
if (inner) inner.style.transform = `translateX(${x * 8}px)`;
```

**Step 2: Commit**
```bash
git add src/components/HeroSection.astro
git commit -m "feat: left-align hero, add reveal animations, mobile min-h fix"
```

---

### Task 4: Services Section — Mobile Stack + Scroll Reveal

**Files:**
- Modify: `src/components/ServicesSection.astro`

**Step 1: Add reveal classes and fix mobile padding**

- Change `px-12` → `px-6 md:px-12`
- Add `reveal reveal-delay-{n}` to each service card
- Change grid to `grid-cols-1 md:grid-cols-3`

Updated section opening and cards:
```astro
<section class="px-6 md:px-12 py-20 md:py-28" style="border-top: 1px solid rgba(192,57,43,0.15);">
  <div class="flex items-center gap-4 mb-12 md:mb-16 reveal">
    <span class="text-[9px] font-black tracking-[5px] uppercase text-[var(--red)]">What We Do</span>
    <div class="flex-1 h-px" style="background: rgba(192,57,43,0.2);"></div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-0.5">
    {[
      { num: '01', title: 'Business\nConsulting', desc: 'Strategic guidance for local businesses ready to grow. We diagnose where you are, plan where you\'re going, and help you execute.' },
      { num: '02', title: 'AI\nStrategy', desc: 'We bring AI to your business — practically, not theoretically. Real tools, real workflows, real results for your operation.' },
      { num: '03', title: 'App & Web\nDevelopment', desc: 'Custom apps and websites built to convert. From idea to live product — designed, built, and deployed.' },
    ].map((s, i) => (
      <div class={`service-card group relative px-8 py-10 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 reveal reveal-delay-${i + 1}`} style="border: 1px solid rgba(245,240,227,0.05); background: rgba(245,240,227,0.01);">
        <div class="absolute top-0 left-0 w-0.5 h-0 bg-[var(--red)] transition-all duration-500 group-hover:h-full"></div>
        <div class="text-[11px] font-black tracking-[3px] text-[var(--red)] mb-5 opacity-60">{s.num}</div>
        <h3 class="text-[22px] font-black uppercase leading-none mb-4 whitespace-pre-line">{s.title}</h3>
        <p class="text-[12px] leading-relaxed font-normal" style="color: rgba(245,240,227,0.4); font-family: Georgia, serif;">{s.desc}</p>
        <div class="flex items-center gap-2 mt-6 text-[9px] font-black tracking-[3px] uppercase text-[var(--red)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="/services" class="no-underline text-[var(--red)]">Learn more</a>
          <span>→</span>
        </div>
      </div>
    ))}
  </div>
</section>
```

**Step 2: Commit**
```bash
git add src/components/ServicesSection.astro
git commit -m "feat: services mobile stack, scroll reveal"
```

---

### Task 5: About Section — Team Cards Mobile Fix + Scroll Reveal

**Files:**
- Modify: `src/components/AboutSection.astro`

**Step 1: Fix padding and team grid mobile**

- Change `px-12` → `px-6 md:px-12`
- Team grid: `grid-cols-1 sm:grid-cols-2` → keep sm:grid-cols-2 but add `max-w-sm mx-auto sm:max-w-none` so on very small phones they center nicely
- Add `reveal` to headline, bio, acronym rows, team section

Updated section:
```astro
<section class="px-6 md:px-12 py-20 md:py-28" style="border-top: 1px solid rgba(192,57,43,0.12);">
  <div class="flex items-center gap-4 mb-12 md:mb-16 reveal">
    <span class="text-[9px] font-black tracking-[5px] uppercase text-[var(--red)]">Who We Are</span>
    <div class="flex-1 h-px" style="background: rgba(192,57,43,0.2);"></div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
    <div class="reveal">
      <h2 class="font-black uppercase leading-[0.88] mb-8" style="font-size: clamp(36px, 5vw, 60px);">
        We lead.<br>
        <span class="text-[var(--red)]">You</span><br>
        <span style="-webkit-text-stroke: 1.5px var(--cream); color: transparent;">Grow.</span>
      </h2>
      <p class="text-[14px] leading-relaxed mb-8" style="color: rgba(245,240,227,0.5); font-family: Georgia, serif; font-weight: 400;">
        H.U.S.T.L.E Consulting LLC was built for the local business owner who knows they have something real — but needs the strategy, technology, and execution to take it to the next level. We bring AI-powered consulting and custom development to businesses ready to grow.
      </p>
      <div class="flex flex-col gap-0">
        {[
          ['H', 'Humbly'],
          ['U', 'Use'],
          ['S', 'Skills'],
          ['T', 'That'],
          ['L', 'Lead'],
          ['E', 'Everyone'],
        ].map(([letter, word]) => (
          <div class="acronym-row group flex items-baseline gap-3 py-2.5 cursor-default transition-all duration-300" style="border-bottom: 1px solid rgba(245,240,227,0.05);">
            <span class="text-[22px] font-black text-[var(--red)] w-6 leading-none">{letter}</span>
            <span class="text-[11px] font-black tracking-[3px] uppercase" style="color: rgba(245,240,227,0.7);">{word}</span>
          </div>
        ))}
      </div>
    </div>

    <div class="reveal reveal-delay-2">
      <p class="text-[9px] font-black tracking-[4px] uppercase mb-7" style="color: rgba(245,240,227,0.3);">The Team</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { img: '/assets/jahleel.jpg', name: 'Jahleel', role: 'Founder & CEO', bio: 'Business consulting, AI strategy & full-stack development.' },
          { img: '/assets/princess.jpg', name: 'Princess Uzoma', role: 'Business Dev & Finance', bio: 'Economics (UW) · Finance MS (U of Miami). Built for growth strategy.' },
        ].map(m => (
          <div class="team-card group relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2" style="border: 1px solid rgba(245,240,227,0.07); background: rgba(245,240,227,0.02);">
            <img src={m.img} alt={m.name} class="w-full object-cover object-top transition-all duration-500 group-hover:grayscale-0" style="aspect-ratio: 3/4; filter: grayscale(20%);" />
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div class="p-4" style="border-top: 1px solid rgba(245,240,227,0.06);">
              <p class="text-[13px] font-black uppercase tracking-[1px] mb-1">{m.name}</p>
              <p class="text-[9px] font-bold tracking-[2px] uppercase text-[var(--red)] mb-2">{m.role}</p>
              <p class="text-[10px] leading-relaxed" style="color: rgba(245,240,227,0.35); font-family: Georgia, serif; font-weight: 400;">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**
```bash
git add src/components/AboutSection.astro
git commit -m "feat: about mobile layout fix, scroll reveal"
```

---

### Task 6: Build + Deploy

**Step 1: Build**
```bash
npm run build
```
Expected: `[build] Complete!`

**Step 2: Commit docs**
```bash
git add docs/
git commit -m "docs: add mobile-first redesign plan"
```

**Step 3: Push + Deploy**
```bash
git push jahleelheath main
npx vercel --prod
```
Expected: deployment URL ending in `vercel.app` with status "Ready"
