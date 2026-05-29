import ContestForm from "./components/ContestForm";
import { useContests } from "./hooks/useContests";

function App() {
  const { contests, addContest, deleteContest } = useContests();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">DFS Tracker</h1>
        
        <ContestForm onAdd={addContest} />

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Logged Contests ({contests.length})</h2>
          {contests.length === 0 ? (
            <p className="text-slate-400">No contests yet. Add your first one above.</p>
          ) : (
            <ul className="space-y-2">
              {contests.map((c) => {
                const profit = c.payout - c.entryFee;
                return (
                  <li key={c.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3">
                    <div>
                      <span className="font-medium">{c.sport}</span>
                      <span className="text-slate-400"> · {c.site} · {c.contestType}</span>
                      <div className="text-sm text-slate-500">{c.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={profit >= 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                        {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
                      </span>
                      <button onClick={() => deleteContest(c.id)} className="text-slate-500 hover:text-red-400" title="Delete">✕</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;