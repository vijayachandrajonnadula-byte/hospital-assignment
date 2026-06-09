import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Avatar from "./Avatar";
import Btn from "./Btn";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Topbar({ showMenu, onMenuClick }) {
  const navigate = useNavigate();
  const { mobile } = useBreakpoint();

  return (
    <header style={{
      height: 68, flexShrink: 0, background: "#fff",
      borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
      gap: 12, padding: "0 20px 0 24px",
    }}>
      {/* Hamburger — shown on narrow screens */}
      {showMenu && (
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          style={{
            width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center",
            justifyContent: "center", color: "var(--text-2)",
            border: "1px solid var(--border)", background: "#fff", flexShrink: 0,
          }}
        >
          <Icon name="menu" size={20} />
        </button>
      )}

      {/* Search */}
      <label style={{
        display: "flex", alignItems: "center", gap: 10,
        flex: 1, maxWidth: mobile ? 240 : 460,
        background: "#F1F5F9", border: "1px solid transparent", borderRadius: 11,
        padding: "9px 14px", color: "var(--text-3)",
      }}>
        <Icon name="search" size={18} />
        <input
          placeholder={mobile ? "Search…" : "Search patients, ID, appointment, record…"}
          aria-label="Search patients, ID, appointment, or record"
          style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontSize: 14, color: "var(--text)" }}
        />
      </label>

      <div style={{ flex: 1 }} />

      {/* Notifications */}
      <button
        aria-label="Notifications, 1 unread"
        style={{
          width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center",
          justifyContent: "center", color: "var(--text-2)", border: "1px solid var(--border)",
          background: "#fff", position: "relative", flexShrink: 0,
        }}
      >
        <Icon name="bell" size={18} />
        <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--critical)", boxShadow: "0 0 0 2px #fff" }} />
      </button>

      {/* Divider + New Appointment — hidden on mobile */}
      {!mobile && (
        <>
          <div style={{ width: 1, height: 28, background: "var(--border)" }} />
          <Btn variant="primary" icon="plus" onClick={() => navigate("/appointments")}>
            New Appointment
          </Btn>
        </>
      )}

      {/* Plus icon only on mobile */}
      {mobile && (
        <button
          onClick={() => navigate("/appointments")}
          aria-label="New Appointment"
          style={{
            width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center",
            justifyContent: "center", background: "var(--primary)", color: "#fff", flexShrink: 0,
          }}
        >
          <Icon name="plus" size={18} />
        </button>
      )}

      {/* Avatar */}
      <Avatar name="Varsha Varadwaj" size={36} color="blue" ring={true} />
    </header>
  );
}
