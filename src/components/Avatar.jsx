const AV_COLORS = {
  blue:   ["#DBE6FE", "#1D4ED8"],
  teal:   ["#CCFBEF", "#0F766E"],
  green:  ["#D1FADF", "#15803D"],
  amber:  ["#FEF0C7", "#B45309"],
  red:    ["#FEE2E2", "#B91C1C"],
  violet: ["#EAE2FE", "#6D28D9"],
  slate:  ["#E2E8F0", "#475569"],
  rose:   ["#FCE7F0", "#BE185D"],
};

export default function Avatar({ name = "", size = 36, color = "blue", ring = false }) {
  const [bg, fg] = AV_COLORS[color] || AV_COLORS.blue;
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      fontWeight: 700, fontSize: size * 0.38, letterSpacing: ".01em",
      boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 3.5px ${fg}33` : "none",
    }}>
      {initials}
    </div>
  );
}
