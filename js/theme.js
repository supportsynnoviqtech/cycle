/* ==========================================================================
   PerfectBike — Theme + direction controller (W10, W11)
   Applies data-theme and dir at the document root, persists both, and wires
   up any .js-theme-toggle / .js-dir-toggle controls found on the page.
   ========================================================================== */

const PerfectBikeTheme = (() => {
  function getTheme() {
    return PerfectBikeStorage.get(PerfectBikeStorage.KEYS.theme, "light");
  }
  function getDirection() {
    return PerfectBikeStorage.get(PerfectBikeStorage.KEYS.dir, "ltr");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    PerfectBikeStorage.set(PerfectBikeStorage.KEYS.theme, theme);
    document.querySelectorAll(".js-theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.lang = document.documentElement.lang || "en";
    PerfectBikeStorage.set(PerfectBikeStorage.KEYS.dir, dir);
    document.querySelectorAll(".js-dir-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", dir === "rtl" ? "true" : "false");
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
    });
  }

  function toggleTheme() {
    applyTheme(getTheme() === "dark" ? "light" : "dark");
  }
  function toggleDirection() {
    applyDirection(getDirection() === "rtl" ? "ltr" : "rtl");
  }

  /* Idempotent bind: dashboard pages inject the sidebar (and its toggle
     buttons) dynamically and may call this again after DOMContentLoaded has
     already fired once, so guard against attaching the same listener twice
     (which would make a single click silently cancel itself out). */
  function bindToggles(root = document) {
    root.querySelectorAll(".js-theme-toggle").forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", toggleTheme);
    });
    root.querySelectorAll(".js-dir-toggle").forEach((btn) => {
      if (btn.dataset.dirBound) return;
      btn.dataset.dirBound = "1";
      btn.addEventListener("click", toggleDirection);
    });
  }

  function init() {
    applyTheme(getTheme());
    applyDirection(getDirection());
    bindToggles();
  }

  /* Apply theme/direction before paint to avoid a flash of wrong theme. */
  applyTheme(getTheme());
  applyDirection(getDirection());

  document.addEventListener("DOMContentLoaded", init);

  return { getTheme, getDirection, applyTheme, applyDirection, toggleTheme, toggleDirection, bindToggles };
})();
