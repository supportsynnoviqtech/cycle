/* ==========================================================================
   PerfectBike — localStorage helpers (W27, W28, W39)
   Only ever stores: preferred name, theme, direction, motion preference,
   personal planner records, sample-fixture load state. Never credentials,
   payment info, or identity documents.
   ========================================================================== */

const PerfectBikeStorage = (() => {
  const KEYS = {
    name: "perfectbike.preferredName",
    theme: "perfectbike.theme",
    dir: "perfectbike.direction",
    motion: "perfectbike.reduceMotion",
    personalRentals: "perfectbike.personalRentals",
    samplesLoaded: "perfectbike.samplesLoaded",
    notifications: "perfectbike.notifications",
  };

  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  function getPreferredName() { return get(KEYS.name, ""); }
  function setPreferredName(name) { return set(KEYS.name, name); }

  function getPersonalRentals() { return get(KEYS.personalRentals, []); }
  function setPersonalRentals(list) { return set(KEYS.personalRentals, list); }

  function areSamplesLoaded() { return get(KEYS.samplesLoaded, false); }
  function setSamplesLoaded(v) { return set(KEYS.samplesLoaded, v); }

  function getNotifications() { return get(KEYS.notifications, []); }
  function setNotifications(list) { return set(KEYS.notifications, list); }

  /* Full reset: clears identity + plans, does NOT re-seed samples automatically (W28). */
  function fullReset() {
    remove(KEYS.name);
    remove(KEYS.personalRentals);
    remove(KEYS.samplesLoaded);
    remove(KEYS.notifications);
  }

  function signOut() {
    remove(KEYS.name);
    /* plans are intentionally preserved on sign-out */
  }

  return {
    KEYS,
    get,
    set,
    remove,
    getPreferredName,
    setPreferredName,
    getPersonalRentals,
    setPersonalRentals,
    areSamplesLoaded,
    setSamplesLoaded,
    getNotifications,
    setNotifications,
    fullReset,
    signOut,
  };
})();
