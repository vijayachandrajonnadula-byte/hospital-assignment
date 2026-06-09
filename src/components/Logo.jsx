export function LogoMark({ size = 36, radius = 10 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: "linear-gradient(145deg,#2563EB 0%,#1E5BD6 55%,#14B8A6 145%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 10px rgba(37,99,235,.28)",
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12.5h4l2-4 3 8 2.5-6 1.5 2h7" />
      </svg>
    </div>
  );
}

export function Logo({ size = 36 }) {
  const wm = Math.round(size * 0.5);
  const ol = Math.max(8.5, size * 0.255);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.33) }}>
      <LogoMark size={size} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: wm, fontWeight: 700, letterSpacing: "-.022em", color: "var(--text)", lineHeight: 1.08, whiteSpace: "nowrap" }}>
          CareSync <span style={{ color: "var(--primary)" }}>Pro</span>
        </div>
        <div style={{ fontSize: ol, fontWeight: 600, color: "var(--text-3)", letterSpacing: ".15em", textTransform: "uppercase", lineHeight: 1, marginTop: Math.round(size * 0.085) }}>
          Provider Suite
        </div>
      </div>
    </div>
  );
}
