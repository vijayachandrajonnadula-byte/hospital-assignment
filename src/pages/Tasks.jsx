import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";

const TASKS = [
  { title: "Review Meera Iyer lab result",        assigned: "Dr. Varsha Varadwaj", patient: "Meera Iyer",  color: "rose",   due: "Today, 09:00 AM", priority: "Urgent",    ic: "flask",   tone: "teal" },
  { title: "Confirm Kavya Menon follow-up appt",  assigned: "Nurse Priya",         patient: "Kavya Menon", color: "violet", due: "Today, 11:00 AM", priority: "Scheduled", ic: "calendar", tone: "blue" },
  { title: "Approve Rohan Das prescription refill",assigned:"Dr. Varsha Varadwaj", patient: "Rohan Das",   color: "amber",  due: "Today, 12:00 PM", priority: "Waiting",   ic: "pill",    tone: "amber" },
  { title: "Verify Fatima Khan insurance",        assigned: "Admin Team",          patient: "Fatima Khan", color: "teal",   due: "Today, 03:00 PM", priority: "Scheduled", ic: "shield",  tone: "slate" },
  { title: "Send discharge summary — Vikram Reddy",assigned:"Dr. Varsha Varadwaj", patient: "Vikram Reddy",color: "blue",   due: "Tomorrow",        priority: "Scheduled", ic: "file",    tone: "blue" },
];

const toneBg = { teal: ["#ECFDF8","#0F766E"], blue: ["#EFF4FF","#2563EB"], amber: ["#FFF7E8","#B45309"], slate: ["#F1F5F9","#475569"] };

export default function Tasks() {
  return (
    <Layout>
      <div className="app-body scroll-y">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Tasks</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Track and manage clinical and administrative tasks.</p>
          </div>
          <Btn variant="primary" icon="plus">New Task</Btn>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TASKS.map((t, i) => {
            const [bg, fg] = toneBg[t.tone] || toneBg.blue;
            return (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--sh-1)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={t.ic} size={19} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 650, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--text-2)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Avatar name={t.patient} size={18} color={t.color} /> {t.patient}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon name="user" size={13} /> {t.assigned}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon name="clock" size={13} /> {t.due}
                    </span>
                  </div>
                </div>
                <Chip label={t.priority} size="sm" />
                <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)" }}>
                  <Icon name="check" size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
