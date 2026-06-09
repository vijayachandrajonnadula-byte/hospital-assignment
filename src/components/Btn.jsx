import Icon from "./Icon";

const SIZES = {
  sm: { p: "7px 12px", fs: 13, h: 34 },
  md: { p: "9px 16px", fs: 14, h: 40 },
  lg: { p: "12px 20px", fs: 15, h: 46 },
};

const VARIANTS = {
  primary:   { background: "var(--primary)", color: "#fff", boxShadow: "0 1px 2px rgba(37,99,235,.3), inset 0 1px 0 rgba(255,255,255,.18)", border: "1px solid var(--primary-600)" },
  secondary: { background: "#fff", color: "var(--text)", border: "1px solid var(--border)", boxShadow: "var(--sh-1)" },
  ghost:     { background: "transparent", color: "var(--text-2)", border: "1px solid transparent" },
  danger:    { background: "var(--critical)", color: "#fff", border: "1px solid #B91C1C" },
  tealBtn:   { background: "var(--teal)", color: "#fff", border: "1px solid #0D9488" },
};

export default function Btn({ children, variant = "primary", icon, iconR, size = "md", full, onClick, style }) {
  const sz = SIZES[size] || SIZES.md;
  const vr = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        padding: sz.p, fontSize: sz.fs, fontWeight: 600, borderRadius: 10,
        width: full ? "100%" : "auto",
        transition: "filter .15s, transform .05s",
        cursor: "pointer",
        ...vr, ...style,
      }}
      onMouseDown={e => e.currentTarget.style.transform = "translateY(.5px)"}
      onMouseUp={e => e.currentTarget.style.transform = ""}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.filter = ""; }}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(.97)"}
    >
      {icon && <Icon name={icon} size={sz.fs + 2} />}
      {children}
      {iconR && <Icon name={iconR} size={sz.fs + 2} />}
    </button>
  );
}
