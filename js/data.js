/* ==========================================================================
   PerfectBike — Central data/configuration module (W29–W37)
   Single source of truth: every page reads from here. Never restate a rate,
   deposit, timezone, or rule anywhere else — import it from here instead.
   ========================================================================== */

const PerfectBikeData = (() => {
  const CURRENCY = { code: "USD", symbol: "$" };
  const TIMEZONE_LABEL = "UTC";

  const RULES = {
    minDays: 1,
    maxDays: 14,
    minExtensionDays: 1,
    maxExtensionDays: 7,
    maxTotalDaysWithExtension: 14,
    depositPerBicycle: 75,
    hubOpen: "08:00",
    hubClose: "20:00",
    pickupWindowStart: "08:00",
    pickupWindowEnd: "19:59",
    tourEarlyArrivalMinutes: 15,
  };

  const BICYCLES = [
    {
      id: "city",
      name: "The Wayfarer",
      category: "City",
      dailyRate: 18,
      hubId: "central-square",
      tagline: "Light, upright, made for weaving through traffic and errands alike.",
      features: ["Upright riding position", "Step-through frame", "Front basket mount", "Puncture-resistant tyres"],
      idealFor: "Short hops, commuting, café-hopping, first-time city riders.",
      inclusions: ["Helmet", "Lock", "Front & rear lights", "Free fitting"],
      image: "assets/images/bike-city.svg",
    },
    {
      id: "hybrid",
      name: "The Crosscut",
      category: "Hybrid",
      dailyRate: 26,
      hubId: "riverside-dock",
      tagline: "A do-anything build for longer rides across mixed terrain.",
      features: ["Flat-bar hybrid frame", "Wider gear range", "Rack-ready rear mount", "All-weather tyres"],
      idealFor: "Half-day exploring, riverside paths, riders who want more range than a city bike.",
      inclusions: ["Helmet", "Lock", "Front & rear lights", "Free fitting"],
      image: "assets/images/bike-hybrid.svg",
    },
    {
      id: "electric",
      name: "The Ascent",
      category: "Electric",
      dailyRate: 38,
      hubId: "harbor-terrace",
      tagline: "Pedal-assist power for hills, distance, and hot afternoons.",
      features: ["Mid-drive pedal assist", "4 assist levels", "Removable battery, 60km range", "Integrated lights"],
      idealFor: "Longer routes, hillier neighbourhoods, riders who want distance without the effort.",
      inclusions: ["Helmet", "Lock", "Front & rear lights", "Free fitting"],
      image: "assets/images/bike-electric.svg",
    },
  ];

  const TOURS = [
    {
      id: "easy",
      name: "The Morning Loop",
      difficulty: "Easy",
      distanceKm: 12,
      durationHours: 3,
      pricePerGroup: 150,
      minRiders: 1,
      maxRiders: 6,
      hubId: "central-square",
      summary: "A relaxed loop through the old quarter and the harbor promenade.",
      included: ["Bicycle", "Helmet", "Guide", "Fitting", "Briefing"],
      excluded: ["Food", "Drinks"],
      image: "assets/images/tour-easy.svg",
    },
    {
      id: "moderate",
      name: "The Ridgeline Circuit",
      difficulty: "Moderate",
      distanceKm: 22,
      durationHours: 4,
      pricePerGroup: 210,
      minRiders: 1,
      maxRiders: 6,
      hubId: "harbor-terrace",
      summary: "A longer route with a climb to the overlook and a fast return along the river.",
      included: ["Bicycle", "Helmet", "Guide", "Fitting", "Briefing"],
      excluded: ["Food", "Drinks"],
      image: "assets/images/tour-moderate.svg",
    },
  ];

  const HUBS = [
    { id: "central-square", name: "Central Square Hub", area: "Old Quarter", note: "Illustrative location — not a real address." },
    { id: "riverside-dock", name: "Riverside Dock Hub", area: "Riverside", note: "Illustrative location — not a real address." },
    { id: "harbor-terrace", name: "Harbor Terrace Hub", area: "Harbor District", note: "Illustrative location — not a real address." },
  ];

  /* Immutable reference clock for the sample fixture only — never Date.now(). */
  const SAMPLE_REFERENCE_NOW = new Date("2026-09-11T12:00:00Z");

  function daysFromRef(offsetDays) {
    const d = new Date(SAMPLE_REFERENCE_NOW.getTime());
    d.setUTCDate(d.getUTCDate() + offsetDays);
    return d.toISOString();
  }

  const SAMPLE_RENTALS = [
    {
      id: "SMP-1001",
      sample: true,
      bicycleId: "hybrid",
      hubId: "riverside-dock",
      start: daysFromRef(-1),
      end: daysFromRef(1),
      days: 2,
      status: "active",
    },
    {
      id: "SMP-1002",
      sample: true,
      bicycleId: "city",
      hubId: "central-square",
      start: daysFromRef(3),
      end: daysFromRef(4),
      days: 1,
      status: "upcoming",
    },
    {
      id: "SMP-1003",
      sample: true,
      bicycleId: "electric",
      hubId: "harbor-terrace",
      start: daysFromRef(6),
      end: daysFromRef(9),
      days: 3,
      status: "upcoming",
    },
    {
      id: "SMP-1004",
      sample: true,
      bicycleId: "city",
      hubId: "central-square",
      start: daysFromRef(-10),
      end: daysFromRef(-8),
      days: 2,
      status: "completed",
    },
    {
      id: "SMP-1005",
      sample: true,
      bicycleId: "hybrid",
      hubId: "riverside-dock",
      start: daysFromRef(-20),
      end: daysFromRef(-17),
      days: 3,
      status: "completed",
    },
  ];

  function getBicycle(id) { return BICYCLES.find((b) => b.id === id) || null; }
  function getTour(id) { return TOURS.find((t) => t.id === id) || null; }
  function getHub(id) { return HUBS.find((h) => h.id === id) || null; }

  return {
    CURRENCY,
    TIMEZONE_LABEL,
    RULES,
    BICYCLES,
    TOURS,
    HUBS,
    SAMPLE_REFERENCE_NOW,
    SAMPLE_RENTALS,
    getBicycle,
    getTour,
    getHub,
  };
})();
