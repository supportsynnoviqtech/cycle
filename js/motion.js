/* ==========================================================================
   PerfectBike — Motion system (W19–W23)
   CSS never hides an element by default — every [data-animate] element is
   fully visible until GSAP successfully runs, so a blocked/failed script
   never hides content (failure safety). Patterns registered below; assign
   one per section deliberately, avoiding repeats on adjacent sections.
   ========================================================================== */

const PerfectBikeMotion = (() => {
  const prefersReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    PerfectBikeStorage.get(PerfectBikeStorage.KEYS.motion, false) === "reduce";

  const gsapReady = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  let triggers = [];

  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---- Pattern library: 9 distinct entrance treatments ---- */
  const PATTERNS = {
    "fade-up": (el) => gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    "fade-down": (el) => gsap.fromTo(el, { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    "fade-left": (el) => gsap.fromTo(el, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" }),
    "fade-right": (el) => gsap.fromTo(el, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" }),
    "scale-in": (el) => gsap.fromTo(el, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }),
    "clip-reveal": (el) =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.inOut" }
      ),
    "mask-wipe": (el) =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" }
      ),
    "stagger-reveal": (el) => {
      const kids = el.children.length ? el.children : [el];
      return gsap.fromTo(
        kids,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    },
    "count-up": (el) => {
      const target = Number(el.dataset.countTo || el.textContent);
      const obj = { val: 0 };
      gsap.set(el, { autoAlpha: 1 });
      return gsap.to(obj, {
        val: target,
        duration: 1.1,
        ease: "power1.out",
        onUpdate: () => (el.textContent = Math.round(obj.val).toLocaleString()),
      });
    },
  };

  function buildTriggers() {
    triggers.forEach((t) => t.kill());
    triggers = [];

    if (!gsapReady) return;
    const reduced = prefersReduced();

    document.querySelectorAll("[data-animate]").forEach((el) => {
      const pattern = el.getAttribute("data-animate");
      const fn = PATTERNS[pattern];
      if (!fn) return;

      if (reduced) {
        gsap.set(el, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      const tween = fn(el);
      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
        return;
      }
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: false,
        onEnter: () => tween.play(0),
        onEnterBack: () => tween.play(0),
      });
      tween.pause(0);
      triggers.push(st);
    });
  }

  function playPageOpen() {
    const main = document.getElementById("main") || document.body;
    if (!gsapReady || prefersReduced()) return; /* already visible by default CSS - no JS required */
    gsap.fromTo(main, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }

  function safetyFallback() {
    /* If GSAP never loaded, or a page didn't call init(), make sure nothing
       is left invisible: any [data-animate] element without inline opacity
       from GSAP is shown via this class after a short delay. */
    setTimeout(() => {
      document.querySelectorAll("[data-animate]").forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.visibility === "hidden" || style.opacity === "0") {
          el.style.visibility = "visible";
          el.style.opacity = "1";
        }
      });
    }, 1200);
  }

  function init() {
    buildTriggers();
    playPageOpen();
    safetyFallback();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => gsapReady && ScrollTrigger.refresh(), 200);
    });

    document.querySelectorAll(".js-theme-toggle, .js-dir-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => gsapReady && ScrollTrigger.refresh(), 350);
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (!gsapReady) return;
      if (document.hidden) gsap.globalTimeline.pause();
      else gsap.globalTimeline.resume();
    });
  }

  return { init, PATTERNS: Object.keys(PATTERNS) };
})();

document.addEventListener("DOMContentLoaded", PerfectBikeMotion.init);
