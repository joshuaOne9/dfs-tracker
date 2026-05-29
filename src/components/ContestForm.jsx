import { useState } from "react";
import { SPORTS, SITES, CONTEST_TYPES, SLATE_TYPES } from "../data/constants";

const today = () => new Date().toISOString().split("T")[0];

const emptyForm = {
    date: today(),
    sport: "NFL",
    site: "Draftkings",
    contestType: "GPP (Tournament)",
    slateType: "Main",
    entryFee: "",
    payout: "",
    notes: "",
};

export default function ContestForm({ onAdd }) {
    const [form, setForm] = useState(emptyForm);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAdd({
            ...form,
            entryFee: parseFloat(form.entryFee) || 0,
            payout: parseFloat(form.payout) || 0,
        });
        setForm({ ...emptyForm, date: form.date }); // keep date for fast multi-entry
      }

    const input =
      "w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text white focus:border-emerald-500 focus:outline-none";
    const label = "block text-sm font-medium text-slate-300 mb-1";
    
    return (
      <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-x1 p-6 space-y-4">
       <h2 className="text-xl font-bold mb-2">Log a Contest</h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
           <label className={label}>Date</label>
           <input type="date" name="date" value={form.date} onChange={handleChange} className={input} />
        </div>
        <div>
           <label className={label}>Sport</label>
           <select name="sport" value={form.sport} onChange={handleChange} className={input}>
            {Object.keys(SPORTS).map((k) => (
                <option key={k} value={k}>{SPORTS[k].label}</option>
            ))}
            </select> 
        </div>
        <div>
           <label className={label}>Site</label>
           <select name="site" value={form.site} onChange={handleChange} className={input}>
             {SITES.map((s) => <option key={s} value={s}>{s}</option>)}
           </select>
        </div>
        <div>
           <label className={label}>Contest Type</label>
           <select name="contestType" value={form.contestType} onChange={handleChange} className={input}>
             {CONTEST_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
           </select>
        </div>
        <div>
           <label className={label}>Slate</label>
           <select name="slateType" value={form.slateType} onChange={handleChange} className={input}>
             {SLATE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
           </select> 
        </div>
        <div className="hidden sm:block"></div>
        <div>
           <label className={label}>Entry Fee ($)</label>
           <input type="number" step="0.01" name="entryFee" value={form.entryFee} onChange={handleChange} placeholder="0.00" className={input} />
        </div>
        <div>
           <label className={label}>Payout ($)</label>
           <input type="number" step="0.01" name="payout" value={form.payout} onChange={handleChange} placeholder="0.00" className={input} />
        </div>
       </div>

        <div>
           <label className={label}>Notes (optional)</label>
           <textarea name="notes" value={form.notes} onChange={handleChange} rows="2" className={input} placeholder="Stack notes, late swap, etc." />
       </div>

       <button type="submit" className="w-full bg-emeral-600 hover:bg-emerald-500 font-semibold py-2.5 rounded-lg transition-colors">
         Add Contest
       </button>
      </form>
    );
}