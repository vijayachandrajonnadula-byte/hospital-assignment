import Icon from "./Icon";

const TONES = {
  blue:  ["#EFF4FF", "#2563EB"],
  teal:  ["#ECFDF8", "#0F766E"],
  red:   ["#FEF1F1", "#DC2626"],
  amber: ["#FFF7E8", "#B45309"],
  green: ["#ECFDF1", "#15803D"],
};

export default function KpiCard({ icon, tone, label, value, delta, up }) {
  const [bg, fg] = TONES[tone] || TONES.blue;
  const isDown = String(delta || "").trim().startsWith("-");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={20} />
        </div>
        {delta && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700,
            color: up ? "var(--success)" : "var(--critical)",
            background: up ? "var(--success-50)" : "var(--critical-50)",
            padding: "3px 8px", borderRadius: 99,
          }}>
            <Icon name={isDown ? "arrowDown" : "arrowUp"} size={12} sw={2.5} />
            {delta}
          </span>
        )}
      </div>
      <div style={{ fontSize: 30, fontWeight: 760, letterSpacing: "-.02em", marginTop: 14, color: tone === "red" ? "var(--critical)" : "var(--text)" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 500, marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}
