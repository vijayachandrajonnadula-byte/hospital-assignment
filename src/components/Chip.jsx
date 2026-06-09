const STATUS = {
  "Waiting":            { c: "amber",  dot: "#F59E0B" },
  "In Progress":        { c: "blue",   dot: "#2563EB" },
  "Scheduled":          { c: "slate",  dot: "#64748B" },
  "Completed":          { c: "green",  dot: "#16A34A" },
  "Critical":           { c: "red",    dot: "#DC2626" },
  "Follow-up Required": { c: "teal",   dot: "#14B8A6" },
  "Cancelled":          { c: "slate",  dot: "#94A3B8" },
  "No-show":            { c: "rose",   dot: "#BE185D" },
  "High":               { c: "red",    dot: "#DC2626" },
  "Normal":             { c: "green",  dot: "#16A34A" },
  "Urgent":             { c: "red",    dot: "#DC2626" },
  "Patient":            { c: "blue",   dot: "#2563EB" },
  "Admin":              { c: "slate",  dot: "#64748B" },
  "Lab":                { c: "teal",   dot: "#14B8A6" },
  "Team":               { c: "violet", dot: "#6D28D9" },
};
const CHIP_BG = {
  blue:   ["#EFF4FF", "#1D4ED8"],
  teal:   ["#ECFDF8", "#0F766E"],
  green:  ["#ECFDF1", "#15803D"],
  amber:  ["#FFF7E8", "#B45309"],
  red:    ["#FEF1F1", "#B91C1C"],
  slate:  ["#F1F5F9", "#475569"],
  rose:   ["#FDF2F8", "#BE185D"],
  violet: ["#F5F3FF", "#6D28D9"],
};

export default function Chip({ label, dot = true, size = "md" }) {
  const s = STATUS[label] || { c: "slate", dot: "#64748B" };
  const [bg, fg] = CHIP_BG[s.c] || CHIP_BG.slate;
  const pad = size === "sm" ? "2px 8px 2px 7px" : "4px 11px 4px 9px";
  const fs = size === "sm" ? 11.5 : 12.5;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: pad,
      borderRadius: 999, background: bg, color: fg, fontSize: fs, fontWeight: 600,
      whiteSpace: "nowrap", lineHeight: 1.3,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />}
      {label}
    </span>
  );
}
