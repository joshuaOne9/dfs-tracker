import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// DB row (snake_case) -> JS contest (camelCase)
const fromRow = (row) => ({
  id: row.id,
  date: row.played_on,
  sport: row.sport,
  site: row.site,
  slateType: row.slate_type,
  contestType: row.contest_type,
  entryFee: Number(row.entry_fee),
  payout: Number(row.payout),
  lineup: row.lineup,
  stackType: row.stack_type,
  notes: row.notes,
});

// JS contest (camelCase) -> DB row (snake_case) for insert
const toRow = (c) => ({
  played_on: c.date,
  sport: c.sport,
  site: c.site,
  slate_type: c.slateType ?? null,
  contest_type: c.contestType,
  entry_fee: Number(c.entryFee),
  payout: Number(c.payout),
  lineup: c.lineup ?? null,
  stack_type: c.stackType ?? null,
  notes: c.notes ?? null,
});

export function useContests(session) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch this user's contests whenever the session changes
  useEffect(() => {
    if (!session) {
      setContests([]);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    supabase
      .from("contests")
      .select("*")
      .order("played_on", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("Failed to load contests:", error.message);
        else setContests(data.map(fromRow));
        setLoading(false);
      });
    return () => { active = false; };
  }, [session]);

  const addContest = async (contest) => {
    const { data, error } = await supabase
      .from("contests")
      .insert(toRow(contest))
      .select()
      .single();
    if (error) return console.error("Failed to add contest:", error.message);
    setContests((prev) => [fromRow(data), ...prev]);
  };

  const deleteContest = async (id) => {
    const { error } = await supabase.from("contests").delete().eq("id", id);
    if (error) return console.error("Failed to delete contest:", error.message);
    setContests((prev) => prev.filter((c) => c.id !== id));
  };

  return { contests, addContest, deleteContest, loading };
}