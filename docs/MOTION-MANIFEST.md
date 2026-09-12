# Motion Manifest ? PerfectBike (SYN-FE-DESIGN-001)

## Overview

PerfectBike employs a lightweight, progressive motion system built with GSAP 3.12.5 and ScrollTrigger. Motion is used intentionally to clarify hierarchy, signal interactivity, and bring editorial warmth to public pages and dashboards without compromising performance or accessibility.

---

## Motion Architecture (`js/motion.js`)

- **Engine:** GSAP 3.12.5 & ScrollTrigger 3.12.5 (packaged locally in `assets/gsap/`).
- **Initialization:** Automatically runs on `DOMContentLoaded`.
- **Selector:** Elements with `data-animate="<pattern>"` attribute.
- **Scroll Triggering:** Starts when element enters 85% of viewport height.

---

## Entrance Motion Patterns (9 Distinct Variants)

1. **`fade-up`**
   - **Properties:** Opacity `0 -> 1`, Y `40px -> 0px`, Duration `0.8s`, Ease `power2.out`.
   - **Usage:** Section headings, primary text blocks, card grid containers.

2. **`fade-down`**
   - **Properties:** Opacity `0 -> 1`, Y `-30px -> 0px`, Duration `0.6s`, Ease `power2.out`.
   - **Usage:** Header bars, hero badge overlays, top notifications.

3. **`fade-left`**
   - **Properties:** Opacity `0 -> 1`, X `40px -> 0px`, Duration `0.8s`, Ease `power2.out`.
   - **Usage:** Right-hand feature columns, specification cards on detail pages.

4. **`fade-right`**
   - **Properties:** Opacity `0 -> 1`, X `-40px -> 0px`, Duration `0.8s`, Ease `power2.out`.
   - **Usage:** Left-hand imagery blocks, editorial hero text.

5. **`zoom-in`**
   - **Properties:** Opacity `0 -> 1`, Scale `0.92 -> 1`, Duration `0.7s`, Ease `back.out(1.4)`.
   - **Usage:** Interactive card callouts, highlight badges, modal dialogs.

6. **`zoom-out`**
   - **Properties:** Opacity `0 -> 1`, Scale `1.08 -> 1`, Duration `0.7s`, Ease `power2.out`.
   - **Usage:** Hero video container, fleet showcase hero images.

7. **`flip-up`**
   - **Properties:** Opacity `0 -> 1`, RotationX `-15deg -> 0deg`, Y `30px -> 0px`, Duration `0.8s`, Ease `power2.out`.
   - **Usage:** Pricing tier cards, key stats counters.

8. **`stagger-fade`**
   - **Properties:** Child elements opacity `0 -> 1`, Y `20px -> 0px`, Stagger `0.1s`, Duration `0.6s`, Ease `power2.out`.
   - **Usage:** Card grids, feature bullet lists, location listings.

9. **`slide-up`**
   - **Properties:** Y `100% -> 0%`, Duration `0.6s`, Ease `power3.out`.
   - **Usage:** Toast notifications, modal drawer transitions, mobile menu overlays.

---

## Accessibility & Failure Safety

- **Reduced Motion Safety:** Fully respects user preference `prefers-reduced-motion: reduce`.
  - When active, all durations are set to `0s`, transforms are cancelled, and opacity is set directly to `1`.
- **Graceful Fallback:** If GSAP fails to load (e.g. script blocked), CSS rules ensure all `data-animate` elements default to `opacity: 1` and `transform: none` so content remains 100% visible and accessible.
