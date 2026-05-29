import { useState, useEffect } from "react";

const STORAGE_KEY = "dfs-tracker-contests";

export function useContests() {
    const [contests, setContests] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
          return [];
        }
      });

      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contests));
      }, [contests]);

      function addContest(contest) {
        const newContest = {
          ...contest,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          lineup: [],        // for player exposure feature later
          stackType: null,   // for your stack-tracking wedge later
        };
        setContests((prev) => [newContest, ...prev]);
      }

      function deleteContest(id) {
        setContests((prev) => prev.filter((c) => c.id !== id));
      }

      return { contests, addContest, deleteContest };
    }