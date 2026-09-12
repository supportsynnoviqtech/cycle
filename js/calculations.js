/* ==========================================================================
   PerfectBike — Shared calculation engine (W33, W34, W36, W37)
   Every page that touches rates, dates, deposits, or availability calls
   through here. Do not re-implement any of this logic in a page script.
   ========================================================================== */

const PerfectBikeCalc = (() => {
  const { RULES, CURRENCY, getBicycle, getTour } = PerfectBikeData;

  function formatMoney(amount) {
    return `${CURRENCY.symbol}${Number(amount).toFixed(2)}`;
  }

  function daysBetween(startISO, endISO) {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const ms = end.getTime() - start.getTime();
    return Math.round(ms / (1000 * 60 * 60 * 24));
  }

  function validateRentalInterval(startISO, endISO) {
    const days = daysBetween(startISO, endISO);
    if (!(days >= RULES.minDays && days <= RULES.maxDays)) {
      return { valid: false, days, reason: `Rental length must be ${RULES.minDays}–${RULES.maxDays} full days.` };
    }
    return { valid: true, days, reason: null };
  }

  function getDailyRate(bicycleId) {
    const bike = getBicycle(bicycleId);
    return bike ? bike.dailyRate : 0;
  }

  function calculateDeposit(bicycleId) {
    return getBicycle(bicycleId) ? RULES.depositPerBicycle : 0;
  }

  function calculateRentalTotal(bicycleId, days) {
    return getDailyRate(bicycleId) * days;
  }

  function calculateTourPrice(tourId) {
    const tour = getTour(tourId);
    return tour ? tour.pricePerGroup : 0;
  }

  /* Overlap rule: newStart < existingEnd AND newEnd > existingStart */
  function hasAvailabilityConflict(newStart, newEnd, existingRecords) {
    const nS = new Date(newStart).getTime();
    const nE = new Date(newEnd).getTime();
    return existingRecords.some((r) => {
      if (r.status === "completed" || r.status === "cancelled") return false;
      const eS = new Date(r.start).getTime();
      const eE = new Date(r.end).getTime();
      return nS < eE && nE > eS;
    });
  }

  function getRentalStatus(record, referenceNow) {
    const now = referenceNow.getTime();
    const start = new Date(record.start).getTime();
    const end = new Date(record.end).getTime();
    if (record.status === "cancelled") return "cancelled";
    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "active";
    return "completed";
  }

  function validateExtension(record, additionalDays) {
    if (additionalDays < RULES.minExtensionDays || additionalDays > RULES.maxExtensionDays) {
      return { valid: false, reason: `Extensions must be ${RULES.minExtensionDays}–${RULES.maxExtensionDays} days.` };
    }
    const currentDays = daysBetween(record.start, record.end);
    const totalDays = currentDays + additionalDays;
    if (totalDays > RULES.maxTotalDaysWithExtension) {
      return { valid: false, reason: `Total rental cannot exceed ${RULES.maxTotalDaysWithExtension} days.` };
    }
    return { valid: true, reason: null, totalDays };
  }

  function calculateExtensionTotal(bicycleId, totalDays) {
    /* Extensions use the original daily rate, no second deposit. */
    return calculateRentalTotal(bicycleId, totalDays);
  }

  function applyExtension(record, additionalDays) {
    const check = validateExtension(record, additionalDays);
    if (!check.valid) return { success: false, reason: check.reason, record };
    const newEnd = new Date(record.end);
    newEnd.setUTCDate(newEnd.getUTCDate() + additionalDays);
    const updated = {
      ...record,
      end: newEnd.toISOString(),
      days: check.totalDays,
      total: calculateExtensionTotal(record.bicycleId, check.totalDays),
    };
    return { success: true, record: updated };
  }

  function cancelUpcoming(record) {
    if (record.status !== "upcoming") {
      return { success: false, reason: "Only an upcoming rental can be cancelled.", record };
    }
    return { success: true, record: { ...record, status: "cancelled" } };
  }

  function createReceipt(record) {
    const bike = getBicycle(record.bicycleId);
    return {
      title: record.sample ? "Sample Receipt" : "Estimate Receipt",
      notice: record.sample
        ? "Sample – no payment processed."
        : "Estimate only – no payment processed in this demonstration.",
      reference: record.id,
      item: bike ? bike.name : record.bicycleId,
      days: record.days,
      total: formatMoney(calculateRentalTotal(record.bicycleId, record.days)),
      deposit: formatMoney(calculateDeposit(record.bicycleId)),
      dateRange: `${record.start} → ${record.end}`,
    };
  }

  function createAgreement(record) {
    const bike = getBicycle(record.bicycleId);
    return {
      title: record.sample ? "Sample Rental Agreement" : "Demonstration Rental Agreement",
      notice: record.sample
        ? "Sample – not legally executed."
        : "Illustrative only – not a legally executed agreement.",
      reference: record.id,
      item: bike ? bike.name : record.bicycleId,
      dateRange: `${record.start} → ${record.end}`,
    };
  }

  function createItinerary(record) {
    const tour = getTour(record.tourId);
    return {
      title: "Trip Itinerary (planning estimate)",
      notice: "Illustrative itinerary — not a confirmed booking.",
      reference: record.id,
      tour: tour ? tour.name : record.tourId,
      dateRange: `${record.start} → ${record.end}`,
    };
  }

  return {
    formatMoney,
    daysBetween,
    validateRentalInterval,
    getDailyRate,
    calculateDeposit,
    calculateRentalTotal,
    calculateTourPrice,
    hasAvailabilityConflict,
    getRentalStatus,
    validateExtension,
    calculateExtensionTotal,
    applyExtension,
    cancelUpcoming,
    createReceipt,
    createAgreement,
    createItinerary,
  };
})();
