// Add a sport here and it flows through the whole app.
// This single object is why adding NBA in October is a one-line change.

export const SPORTS = {
    NFL: { label: "NFL", positions: ["QB", "RB", "WR", "TE", "FLEX", "DST"] },
    NBA: { label: "NBA", positions: ["PG", "SG", "SF", "PF", "C", "G", "F", "UTIL"] },
    MLB: { label: "MLB", positions: ["P", "C", "1B", "2B", "3B", "SS", "OF"] },
    NHL: { label: "NHL", positions: ["C", "W", "D", "G", "UTIL"] },
};

export const SITES = ["Draftkings", "FanDuel", "PrizePicks", "Underdog", "Sleeper"];

export const CONTEST_TYPES = [
    "GPP (Tournament)",
    "Cash (50/50)",
    "Head-to-Head",
    "Satellite/Qualifier",
];

export const SLATE_TYPES = ["Main", "Showdown", "Afternoon", "Evening", "Primetime", "Turbo"];