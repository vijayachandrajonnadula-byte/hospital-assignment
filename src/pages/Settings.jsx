import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import Btn from "../components/Btn";

const SECTIONS = [
  {
    title: "Profile",
    icon: "user",
    items: [
      { label: "Full name",        value: "Dr. Varsha Varadwaj" },
      { label: "Role",             value: "General Physician" },
      { label: "Email",            value: "varsha.varadwaj@caresync.health" },
      { label: "Phone",            value: "+91 98765 43210" },
      { label: "Department",       value: "General Medicine" },
    ],
  },
  {
    title: "Notifications",
    icon: "bell",
    items: [
      { label: "Critical alerts",     value: "On · Push & Email" },
      { label: "New messages",        value: "On · Push" },
      { label: "Lab result updates",  value: "On · Email" },
      { label: "Appointment reminders", value: "On · Push" },
    ],
  },
  {
    title: "Security",
    icon: "shield",
    items: [
      { label: "Two-factor authentication", value: "Enabled" },
      { label: "Session timeout",           value: "30 minutes" },
      { label: "Last login",                value: "08 Jun 2026, 08:05 AM" },
    ],
  },
];

function SettingRow({ label, value, last }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: last ? "none" : "1px solid var(--border-2)" }}>
      <span style={{ fontSize: 14, color: "var(--text-2)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
        <button style={{ color: "var(--text-3)" }}><Icon name="edit" size={14} /></button>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <Layout>
      <div className="app-body scroll-y">
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Settings</h1>
          <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Manage your profile, preferences, and security.</p>
        </div>

        {/* Profile hero */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", padding: 24, marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar name="Varsha Varadwaj" size={72} color="blue" ring={true} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 750, letterSpacing: "-.02em" }}>Dr. Varsha Varadwaj</div>
            <div style={{ fontSize: 14, color: "var(--text-2)", marginTop: 3 }}>General Physician · CareSync Pro</div>
          </div>
          <Btn variant="secondary" icon="edit">Edit Profile</Btn>
        </div>

        {/* Settings sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SECTIONS.map(s => (
            <div key={s.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid var(--border-2)" }}>
                <Icon name={s.icon} size={18} style={{ color: "var(--primary-600)" }} />
                <span style={{ fontSize: 15.5, fontWeight: 700 }}>{s.title}</span>
              </div>
              <div style={{ padding: "4px 20px" }}>
                {s.items.map((item, i) => (
                  <SettingRow key={item.label} label={item.label} value={item.value} last={i === s.items.length - 1} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div style={{ background: "#fff", border: "1px solid #FBD5D5", borderRadius: 16, padding: "16px 20px", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--critical)" }}>Sign out</div>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 2 }}>End your current session securely.</div>
          </div>
          <Btn variant="danger" icon="logout">Sign Out</Btn>
        </div>
      </div>
    </Layout>
  );
}
