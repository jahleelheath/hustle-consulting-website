# Mobile-First Redesign — H.U.S.T.L.E Consulting

## Goal
Fix broken mobile nav and make the site feel alive on both mobile and desktop.

## Design Decisions

### 1. Mobile Nav
- Hamburger button (top right) on screens < md
- Full-screen overlay slides in, shows Services / About / Book a Call
- X button and tap-outside closes it
- No JS libraries — pure CSS + minimal vanilla JS toggle

### 2. Hero Section
- Left-aligned headline + CTAs on desktop (split layout)
- Mobile: single column, large tap targets on buttons
- Staggered fade-up on load (CSS keyframes, no library)

### 3. Services Section
- Cards scroll-reveal staggered as they enter viewport (IntersectionObserver)
- Mobile: single column stack, full width cards

### 4. About / Team Section
- Team cards full width on mobile (no cramped 2-col on small screens)
- Scroll-reveal same as services

### 5. Buttons
- `scale-[0.97]` on active/press for tactile feel
- Minimum 44px tap target on mobile

### 6. Global
- Each section fades in on scroll via IntersectionObserver + CSS
- No Framer Motion (not installed, keep bundle lean)
