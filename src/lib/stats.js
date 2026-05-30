// Pure calculation layer. Takes the contests array, returns computed stats.
// No React, no UI, just math. The dashboard and charts both read from this.
export function calcStats(contests) {
  if (contests.length === 0) {
    return { totalProfit: 0, totalWagered: 0, roi: 0, winRate: 0, contestsPlayed: 0, cashes: 0 };
  }

  const contestsPlayed = contests.length;
  const totalWagered = contests.reduce((sum, c) => sum + c.entryFee, 0);
  const totalPayout = contests.reduce((sum, c) => sum + c.payout, 0);
  const totalProfit = totalPayout - totalWagered;

  // "Cash" = finished in the money (got any payout back).
  // If you'd rather count only net-profitable entryies, change to: c.payout > c.entryFee
  const cashes = contests.filter((c) => c.payout > 0).length;

  const roi = totalWagered > 0 ? (totalProfit / totalWagered) * 100 : 0;
  const winRate = (cashes / contestsPlayed) * 100;

  return { totalProfit, totalWagered, roi, winRate, contestsPlayed, cashes };
}