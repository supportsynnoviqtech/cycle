/* ==========================================================================
   PerfectBike — Shared public header/footer renderer (W09, W12)
   Every public page includes <div id="site-header"></div> /
   <div id="site-footer"></div> and calls PerfectBikeShell.mount("home") etc.
   Keeps nav/footer identical across all 12 public pages from one source.
   ========================================================================== */

const PerfectBikeShell = (() => {
  const NAV_ITEMS = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "home2", label: "Home 2", href: "home-2.html" },
    { id: "fleet", label: "Fleet", href: "fleet.html" },
    { id: "tours", label: "Guided Tours", href: "guided-tours.html" },
    { id: "pickup", label: "Pickup Locations", href: "pickup-locations.html" },
    { id: "rules", label: "Rules & Deposit", href: "rules-deposit.html" },
    { id: "pricing", label: "Pricing", href: "pricing.html" },
    { id: "dashboard", label: "Dashboard", href: "dashboard-overview.html" },
  ];

  function sunIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/>
    </svg>`;
  }
  function cogIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.6-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 3h-4l-.3 2.9a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 1.7 1L11 21h4l.3-2.9a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6z"/>
    </svg>`;
  }
  function menuIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>`;
  }
  function closeIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>`;
  }

  function renderHeader(activeId) {
    const links = NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}" ${item.id === activeId ? 'aria-current="page"' : ""}>${item.label}</a>`
    ).join("");

    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html" title="PerfectBike Home">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><circle cx="7" cy="17" r="4"/><circle cx="17" cy="17" r="4"/><path d="M7 17l4-8h4l3 8M11 9l-3 8M11 9h6"/></svg>
          <span>PerfectBike</span>
        </a>
        <nav class="main-nav" aria-label="Primary nav">${links}</nav>
        <div class="header-actions">
          <a class="btn btn-secondary btn-sm" href="pricing.html">See pricing</a>
          <a class="btn btn-primary btn-sm" href="fleet.html">Book a bike</a>
        </div>
        <div class="header-utils">
          <button type="button" class="icon-control js-theme-toggle" aria-pressed="false" aria-label="Switch theme" title="Toggle Theme">${sunIcon()}</button>
          <button type="button" class="icon-control js-dir-toggle" aria-pressed="false" aria-label="Switch layout direction" title="Toggle LTR/RTL">${cogIcon()}</button>
          <button type="button" class="icon-control nav-toggle js-drawer-open" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">${menuIcon()}</button>
        </div>
      </div>
    </header>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="scrim js-drawer-close"></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
        <div class="drawer-header" style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:1px solid var(--color-border);margin-bottom:16px;">
          <a class="brand" href="index.html" style="font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="17" r="4"/><circle cx="17" cy="17" r="4"/><path d="M7 17l4-8h4l3 8M11 9l-3 8M11 9h6"/></svg>
            <span>PerfectBike</span>
          </a>
          <button type="button" class="icon-control js-drawer-close" aria-label="Close menu">${closeIcon()}</button>
        </div>
        <nav class="mobile-nav-links" style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
          ${links}
        </nav>
        <div class="mobile-drawer-actions" style="display:flex;flex-direction:column;gap:10px;padding-top:16px;border-top:1px solid var(--color-border);">
          <a class="btn btn-secondary btn-block" href="pricing.html">See Pricing</a>
          <a class="btn btn-primary btn-block" href="fleet.html">Book a Bike</a>
        </div>
      </div>
    </div>`;
  }

  function renderFooter() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html" style="margin-bottom:12px;display:inline-flex;align-items:center;gap:6px;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="17" r="4"/><circle cx="17" cy="17" r="4"/><path d="M7 17l4-8h4l3 8M11 9l-3 8M11 9h6"/></svg>
              <span>PerfectBike</span>
            </a>
            <p style="font-size:var(--size-small);color:var(--color-text-muted);max-width:280px;margin-top:8px;">
              The city, at your pace. Premium bicycle rentals and curated guided city tours.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="home-2.html">Home 2</a></li>
              <li><a href="fleet.html">Bicycle Fleet</a></li>
              <li><a href="guided-tours.html">Guided Tours</a></li>
            </ul>
          </div>
          <div>
            <h4>Rental Info</h4>
            <ul>
              <li><a href="pickup-locations.html">Pickup Locations</a></li>
              <li><a href="rules-deposit.html">Rules & Deposit</a></li>
              <li><a href="pricing.html">Pricing Structure</a></li>
              <li><a href="dashboard-overview.html">Rider Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul>
              <li><a href="login.html">Sign In</a></li>
              <li><a href="signup.html">Create Account</a></li>
              <li><a href="dashboard-active.html">Active Rental</a></li>
              <li><a href="dashboard-history.html">Ride History</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal & Safety</h4>
            <ul>
              <li><a href="rules-deposit.html#rules">Safety Guidelines</a></li>
              <li><a href="rules-deposit.html#deposit">Deposit Policy</a></li>
              <li><a href="dashboard-documents.html">Liability Waiver</a></li>
              <li><a href="dashboard-settings.html">Privacy Settings</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} PerfectBike. Illustrative demonstration site (SYN-FE-DESIGN-001).</span>
          <div style="display:flex;gap:16px;">
            <a href="rules-deposit.html">Terms of Service</a>
            <a href="rules-deposit.html">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  function mount(activeId = "") {
    const headerContainer = document.getElementById("site-header");
    if (headerContainer) {
      headerContainer.innerHTML = renderHeader(activeId);
    }

    const footerContainer = document.getElementById("site-footer");
    if (footerContainer) {
      footerContainer.innerHTML = renderFooter();
    }

    // Attach Event Listeners
    if (window.PerfectBikeTheme) {
      document.querySelectorAll(".js-theme-toggle").forEach((btn) => {
        btn.addEventListener("click", () => PerfectBikeTheme.toggleTheme());
      });
      document.querySelectorAll(".js-dir-toggle").forEach((btn) => {
        btn.addEventListener("click", () => PerfectBikeTheme.toggleDirection());
      });
    }

    const drawer = document.getElementById("mobile-drawer");
    if (drawer) {
      const openBtns = document.querySelectorAll(".js-drawer-open");
      const closeBtns = document.querySelectorAll(".js-drawer-close");

      openBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          drawer.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          document.body.style.overflow = "hidden";
        });
      });

      closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          drawer.classList.remove("is-open");
          openBtns.forEach((b) => b.setAttribute("aria-expanded", "false"));
          document.body.style.overflow = "";
        });
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) {
          drawer.classList.remove("is-open");
          openBtns.forEach((b) => b.setAttribute("aria-expanded", "false"));
          document.body.style.overflow = "";
        }
      });
    }
  }

  function autoInit() {
    const headerEl = document.getElementById("site-header");
    if (headerEl && (!headerEl.innerHTML || headerEl.innerHTML.trim() === "")) {
      const path = window.location.pathname.toLowerCase();
      let activeId = "";
      if (path.includes("home-2")) activeId = "home2";
      else if (path.includes("index") || path.endsWith("/")) activeId = "home";
      else if (path.includes("fleet")) activeId = "fleet";
      else if (path.includes("guided") || path.includes("tour")) activeId = "tours";
      else if (path.includes("pickup")) activeId = "pickup";
      else if (path.includes("rules")) activeId = "rules";
      else if (path.includes("pricing")) activeId = "pricing";
      else if (path.includes("dashboard")) activeId = "dashboard";

      mount(activeId);
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }

  return { mount, NAV_ITEMS };
})();
