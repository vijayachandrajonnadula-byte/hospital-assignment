import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import Icon from "./Icon";
import Avatar from "./Avatar";

const NAV_MAIN = [
  { id: "Dashboard",       path: "/",               icon: "dashboard" },
  { id: "Patients",        path: "/patients",        icon: "patients" },
  { id: "Appointments",    path: "/appointments",    icon: "calendar",  badge: "18" },
  { id: "Medical Records", path: "/medical-records", icon: "records" },
  { id: "Messages",        path: "/messages",        icon: "messages",  badge: "4" },
  { id: "Tasks",           path: "/tasks",           icon: "tasks" },
  { id: "Analytics",       path: "/analytics",       icon: "analytics" },
];

export default function Sidebar({ narrow = false, drawerOpen = false, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    if (narrow && onClose) onClose();
  };

  return (
    <aside
      style={{
        width: 252,
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px 14px",
        // On narrow screens: drawer behaviour (fixed, slides in from left)
        ...(narrow ? {
          position: "fixed",
          left: drawerOpen ? 0 : -260,
          top: 0, bottom: 0,
          zIndex: 200,
          transition: "left .22s cubic-bezier(.4,0,.2,1)",
          boxShadow: drawerOpen ? "var(--sh-pop)" : "none",
          overflowY: "auto",
        } : {
          alignSelf: "stretch",
          overflow: "hidden",
        }),
      }}
    >
      {/* Logo */}
      <div style={{ padding: "4px 8px 18px" }}>
        <Logo size={34} />
      </div>

      {/* Clinical group label */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", letterSpacing: ".07em", padding: "6px 10px 8px" }}>
        CLINICAL
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_MAIN.map(item => {
          const on = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.path)}
              style={{
                display: "flex", alignItems: "center", gap: 11, padding: "9px 11px",
                borderRadius: 10, width: "100%", textAlign: "left",
                fontSize: 14, fontWeight: on ? 650 : 500,
                color: on ? "var(--primary-600)" : "var(--text-2)",
                background: on ? "var(--primary-50)" : "transparent",
                boxShadow: on ? "inset 0 0 0 1px #DBE6FE" : "none",
                transition: "background .12s, color .12s", position: "relative",
              }}
              onMouseEnter={e => { if (!on) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (!on) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; } }}
            >
              {on && (
                <span style={{ position: "absolute", left: -14, top: 9, bottom: 9, width: 3, borderRadius: 99, background: "var(--primary)" }} />
              )}
              <Icon name={item.icon} size={19} sw={on ? 2 : 1.75} />
              <span style={{ flex: 1 }}>{item.id}</span>
              {item.badge && (
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 99,
                  background: on ? "var(--primary)" : "#E2E8F0",
                  color: on ? "#fff" : "var(--text-2)",
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Settings */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 10 }}>
        {(() => {
          const on = isActive("/settings");
          return (
            <button
              onClick={() => handleNav("/settings")}
              style={{
                display: "flex", alignItems: "center", gap: 11, padding: "9px 11px",
                borderRadius: 10, width: "100%", textAlign: "left",
                fontSize: 14, fontWeight: on ? 650 : 500,
                color: on ? "var(--primary-600)" : "var(--text-2)",
                background: on ? "var(--primary-50)" : "transparent",
              }}
              onMouseEnter={e => { if (!isActive("/settings")) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (!isActive("/settings")) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; } }}
            >
              <Icon name="settings" size={19} />
              Settings
            </button>
          );
        })()}
      </nav>

      {/* HIPAA status card */}
      <div style={{
        background: "linear-gradient(135deg,#0F2A52,#13386B)",
        borderRadius: 14, padding: "13px 14px", color: "#fff", marginBottom: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 0 3px rgba(52,211,153,.25)" }} />
          Systems secure
        </div>
        <div style={{ fontSize: 11.5, color: "#9DB4D6", marginTop: 5, lineHeight: 1.4 }}>
          HIPAA-compliant · End-to-end encrypted
        </div>
      </div>

      {/* User card */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 12, border: "1px solid var(--border)" }}>
        <Avatar name="Varsha Varadwaj" size={36} color="blue" />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.25 }}>
          <div style={{ fontSize: 13, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Dr. Varsha Varadwaj
          </div>
          <div style={{ fontSize: 11.5, color: "var(--text-2)" }}>General Physician</div>
        </div>
        <Icon name="chevronD" size={16} style={{ color: "var(--text-3)" }} />
      </div>
    </aside>
  );
}
