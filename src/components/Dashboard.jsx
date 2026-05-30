import { calcStats } from "../lib/stats";

export default function Dashboard({ contests }) {
  const stats = calcStats(contests);

  const cards = [
    { label: "Net Profit", value: `${stats.totalProfit >= 0 ? "+" : "-"}$${Math.abs(stats.totalProfit).toFixed(2)}`, tone: stats.totalProfit >= 0 ? "pos" : "neg" },
    { label: "ROI", value: `${stats.roi >= 0 ? "+" : ""}${stats.roi.toFixed(1)}%`, tone: stats.roi >= 0 ? "pos" : "neg" },
    { label: "Win Rate", value: `${stats.winRate.toFixed(1)}%`, tone: "neutral" },
    { label: "Contests", value: stats.contestsPlayed, tone: "neutral" },
    { label: "Total Wagered", value: `$${stats.totalWagered.toFixed(2)}`, tone: "neutral" },
    { label: "Cashes", value: stats.cashes, tone: "neutral" },
  ];

  const toneClass = {
    pos: "text-emerald-400",
    neg: "text-red-400",
    neutral: "text-white",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
            <div key={card.label} className="bg-slate-800/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">{card.label}</div>
              <div className={`text-2xl font-bold ${toneClass[card.tone]}`}>{card.value}</div>
            </div>
        ))}
    </div>
  );
}