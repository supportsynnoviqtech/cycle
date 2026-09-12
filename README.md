# PerfectBike ? Urban Bicycle Rental & City Tour Service

**Assessment Reference:** `SYN-FE-DESIGN-001`  
**Developer & Employee ID:** Deepak Kumar B (`SYN INT 0001`)  
**Submission Date:** 12 September 2026  
**Architecture:** Pure Frontend Demonstration (Semantic HTML5, CSS3 Custom Properties, Vanilla JS ES6+, GSAP 3.12.5)

---

## 1. Project Overview

**PerfectBike** is a fictional urban bicycle rental and guided-tour company designed to provide flexible, self-guided, and guided city exploration. This repository contains the complete, responsive, static demonstration website for PerfectBike.

### Key Highlights
- **100% Frontend Static Site:** No backend, database, external API calls, or payment gateways.
- **24 Comprehensive Views:** 12 public marketing pages, 2 entry pages (`login.html`, `signup.html`), and 10 dedicated dashboard views.
- **10+ Section Baseline:** Every single view contains at least 10 distinct, meaningful sections answering specific visitor and rider questions (Requirement W03).
- **Central Calculation Engine:** Shared tariff calculation engine (`js/calculations.js`, `js/data.js`) maintaining strict daily rates ($18 City, $26 Hybrid, $38 Electric), $75 deposit, and tour pricing ($150 / $210).
- **Pre-Seeded Sample Fixture:** 5 sample rentals (1 active, 2 upcoming, 2 completed) isolated from personal planner records with a consistent sample clock (11 Sept 2026, 12:00 UTC).
- **Printable HTML Document Generator:** Instant generation of printable HTML receipts, agreements, and trip itineraries with explicit sample disclaimers (*"Sample ? no payment processed"*, *"Sample ? not legally executed"*).
- **Local GSAP Motion System:** 9 entrance animation patterns with graceful reduced-motion safety (`js/motion.js`).
- **Theme & Direction Controls:** Full Light/Dark mode and LTR/RTL layout switching available on both public and entry pages.

---

## 2. Directory & Asset Structure

```
perfectbike/
??? index.html                   # Public Home 1 (Editorial Concept)
??? home-2.html                  # Public Home 2 (Urban Cycling Concept with Video)
??? fleet.html                   # Bicycle Fleet Overview
??? bike-city.html               # The Wayfarer Detail
??? bike-hybrid.html             # The Crosscut Detail
??? bike-electric.html           # The Ascent Detail
??? guided-tours.html            # Guided Tours Listing
??? tour-easy.html               # The Morning Loop Tour Detail
??? tour-moderate.html           # The Ridgeline Circuit Tour Detail
??? pickup-locations.html        # Hub Locations & Hours
??? rules-deposit.html           # Rental Rules & Security Deposit Policy
??? pricing.html                 # Complete Rate & Pricing Matrix
??? login.html                   # Standalone Preferred-Name Log In
??? signup.html                  # Standalone Preferred-Name Sign Up
??? dashboard-overview.html      # Dashboard Destination 01 (Overview)
??? dashboard-browse.html        # Dashboard Destination 02 (Browse Catalogue)
??? dashboard-book.html          # Dashboard Destination 03 (Book a Ride)
??? dashboard-active.html        # Dashboard Destination 04 (Active Rental)
??? dashboard-extend.html        # Dashboard Destination 05 (Extend Rental)
??? dashboard-history.html       # Dashboard Destination 06 (Rental History)
??? dashboard-documents.html     # Dashboard Destination 07 (Documents & Print)
??? dashboard-profile.html       # Dashboard Destination 08 (Rider Profile)
??? dashboard-notifications.html # Dashboard Destination 09 (Notifications)
??? dashboard-settings.html      # Dashboard Destination 10 (Settings & Controls)
??? css/
?   ??? tokens.css               # Color tokens, typography, shadows, dark theme tokens
?   ??? base.css                 # Reset, typography, utility classes, RTL support
?   ??? components.css           # Navigation, cards, badges, buttons, tables, video overlay
?   ??? layout.css               # Grid system, section spacing, dashboard shell, print media
??? js/
?   ??? data.js                  # Shared catalogue data, rates, sample fixture seed
?   ??? storage.js               # LocalStorage wrapper (preferred name, theme, RTL, personal plans)
?   ??? calculations.js          # Financial & duration calculation logic engine
?   ??? theme.js                 # Theme (light/dark) & direction (LTR/RTL) toggle controller
?   ??? dashboard.js             # Dedicated dashboard shell, greeting & navigation
?   ??? motion.js                # GSAP + ScrollTrigger 9 entrance animation patterns
??? assets/
?   ??? fonts/                   # Fraunces & Inter SIL OFL local variable woff2 fonts
?   ??? gsap/                    # GSAP 3.12.5 & ScrollTrigger 3.12.5 local scripts
?   ??? video/                   # urban-cycling.mp4 (Home 2 video asset)
?   ??? images/                  # video-poster.svg and SVG icons
??? docs/
    ??? DESIGN-MANIFEST.md       # Color palette, typography, layout rules
    ??? MOTION-MANIFEST.md       # GSAP motion patterns & accessibility setup
    ??? ROUTE-INVENTORY.md       # 24-view section inventory and route table
    ??? ASSET-LICENCE-REGISTER.md# Font, script, and media licences
    ??? AI-ASSISTANCE-REGISTER.md# AI assistance & human oversight declaration
    ??? KNOWN-ISSUES.md          # Defect log baseline (0 defects)
```

---

## 3. How to Run & Verify Locally

1. **Option A: Direct File Opening**
   - Open any `.html` file (e.g. `index.html` or `dashboard-overview.html`) directly in any modern Web browser (Chromium, Firefox, Safari/WebKit).

2. **Option B: Local Web Server (Recommended)**
   - Using Python built-in HTTP server:
     ```bash
     python -m http.server 8080
     ```
   - Open `http://localhost:8080` in your browser.

---

## 4. Key Demonstration Flows

1. **Entry & Preferred Name Flow:**
   - Navigate to `login.html` or `signup.html`.
   - Enter your preferred display name (e.g., *"Alex"*).
   - Click **Log In** or **Create Account**. Your name persists across the header and dashboard greeting.

2. **Theme & RTL Toggle:**
   - Toggle **Light/Dark Theme** or **LTR/RTL Layout** using the top controls or from `dashboard-settings.html`. All 24 pages respond instantly.

3. **Booking & Extension Engine:**
   - Go to `dashboard-book.html`, select dates (1?14 days), bike model, and optional helmet. Observe exact daily rate and deposit calculations.
   - Go to `dashboard-extend.html` to extend an active rental by 1?7 days with $0 second deposit.

4. **Printable Document Generation:**
   - Visit `dashboard-documents.html` to view or print sample receipts, rental agreements, and trip itineraries. Press **Print Document** to trigger clean PDF rendering via `@media print`.

---

## 5. Traceability Matrix (W01?W46)

All 46 requirement points (`W01` to `W46`) from specification **SYN-FE-DESIGN-001** have been fully implemented and verified. Complete evidence is recorded in `03-Synnoviq-Final-QA-QC-Checklist.docx` and `03-Synnoviq-Final-QA-QC-Checklist.txt`.
