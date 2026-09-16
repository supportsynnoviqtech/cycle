/* ==========================================================================
   PerfectBike ? Dedicated Dashboard Shell & Controller (W26?W28, W33?W37)
   Powers all 10 dashboard destinations: Overview, Browse, Book, Active,
   Extend, History, Documents, Profile, Notifications, Settings.
   ========================================================================== */

const PerfectBikeDashboard = (() => {
  const { RULES, BICYCLES, TOURS, HUBS, SAMPLE_REFERENCE_NOW, SAMPLE_RENTALS, getBicycle, getTour, getHub } = PerfectBikeData;
  const Calc = PerfectBikeCalc;
  const Storage = PerfectBikeStorage;

  const DASH_PAGES = [
    { id: "overview", label: "Overview", href: "dashboard-overview.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>' },
    { id: "browse", label: "Browse", href: "dashboard-browse.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' },
    { id: "book", label: "Book", href: "dashboard-book.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
    { id: "active", label: "Active", href: "dashboard-active.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    { id: "extend", label: "Extend", href: "dashboard-extend.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M12 8v8M8 12h8"/><circle cx="12" cy="12" r="10"/></svg>' },
    { id: "history", label: "History", href: "dashboard-history.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M12 8v4l3 3"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/></svg>' },
    { id: "documents", label: "Documents", href: "dashboard-documents.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>' },
    { id: "profile", label: "Profile", href: "dashboard-profile.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    { id: "notifications", label: "Notifications", href: "dashboard-notifications.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
    { id: "settings", label: "Settings", href: "dashboard-settings.html", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.6-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 3h-4l-.3 2.9a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 1.7 1L11 21h4l.3-2.9a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6z"/></svg>' },
  ];

  function getCombinedRentals() {
    const personal = Storage.getPersonalRentals();
    const samples = Storage.areSamplesLoaded() ? SAMPLE_RENTALS : [];
    return [...personal, ...samples];
  }

  function escapeHtml(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function mountSidebar(activeId) {
    const container = document.getElementById("dash-sidebar-mount");
    if (!container) return;

    const preferredName = Storage.getPreferredName() || "Rider";

    const navHtml = DASH_PAGES.map(p => {
      const isActive = p.id === activeId;
      return `<a class="dash-nav-link ${isActive ? 'active' : ''}" href="${p.href}" ${isActive ? 'aria-current="page"' : ''}>
        ${p.icon}
        <span>${p.label}</span>
      </a>`;
    }).join("");

    container.innerHTML = `
      <div class="dash-sidebar" id="dash-sidebar">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <a class="dash-brand" href="index.html" title="PerfectBike - Home">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="17" r="4"/><circle cx="17" cy="17" r="4"/><path d="M7 17l4-8h4l3 8M11 9l-3 8M11 9h6"/></svg>
            <span>PerfectBike</span>
          </a>
          <button type="button" class="icon-control js-dash-sidebar-close" aria-label="Close sidebar" style="display:none;margin-bottom:18px;" id="js-dash-sidebar-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav class="dash-nav" aria-label="Dashboard destinations">
          ${navHtml}
        </nav>
        <div class="dash-sidebar-footer">
          <div style="font-size:var(--size-small);color:var(--color-text-muted);display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;">Rider: ${escapeHtml(preferredName)}</span>
            <div style="display:flex;gap:4px;">
              <button type="button" class="icon-control js-theme-toggle" aria-label="Switch theme" style="width:30px;height:30px;padding:4px;" title="Toggle theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/></svg>
              </button>
              <button type="button" class="icon-control js-dir-toggle" aria-label="Switch text direction" style="width:30px;height:30px;padding:4px;" title="Toggle LTR/RTL">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M8 7h11M8 17h11M13 3l-4 4 4 4M14 21l4-4-4-4"/></svg>
              </button>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm btn-block" id="js-signout-btn">Sign Out</button>
          <a class="btn btn-ghost btn-sm btn-block" href="index.html" style="margin-top:4px;">Public Site</a>
        </div>
      </div>
      <div class="dash-sidebar-overlay" id="dash-sidebar-overlay"></div>
    `;

    // Sign out & Theme listeners
    document.getElementById("js-signout-btn")?.addEventListener("click", () => {
      Storage.signOut();
      window.location.href = "login.html";
    });

    if (window.PerfectBikeTheme) {
      PerfectBikeTheme.bindToggles(container);
    }

    // Mobile Sidebar Toggles
    const sidebar = document.getElementById("dash-sidebar");
    const overlay = document.getElementById("dash-sidebar-overlay");
    const closeBtn = document.getElementById("js-dash-sidebar-close");
    const openBtns = document.querySelectorAll(".js-dash-mobile-open");

    function openDashSidebar() {
      if (sidebar) sidebar.classList.add("is-open");
      if (overlay) overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeDashSidebar() {
      if (sidebar) sidebar.classList.remove("is-open");
      if (overlay) overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    openBtns.forEach(b => b.addEventListener("click", openDashSidebar));
    closeBtn?.addEventListener("click", closeDashSidebar);
    overlay?.addEventListener("click", closeDashSidebar);

    // Populate user greeting name element if present in DOM
    const nameEl = document.getElementById("user-greeting-name");
    if (nameEl) {
      nameEl.textContent = preferredName;
    }
  }

  return {
    DASH_PAGES,
    getCombinedRentals,
    mountSidebar,
    escapeHtml,
  };
})();
