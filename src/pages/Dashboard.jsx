import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import KpiCard from "../components/KpiCard";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const SCHEDULE = [
  { time: "09:00", ap: "AM", name: "Meera Iyer",   type: "Follow-up",            status: "Waiting",     color: "rose",   note: "BP review" },
  { time: "09:30", ap: "AM", name: "Arjun Nair",   type: "General Consultation", status: "In Progress", color: "green",  note: "Cough, fever" },
  { time: "10:00", ap: "AM", name: "Kavya Menon",  type: "Lab Review",           status: "Scheduled",   color: "violet", note: "Thyroid panel" },
  { time: "10:30", ap: "AM", name: "Rohan Das",    type: "Diabetes Review",      status: "Waiting",     color: "amber",  note: "HbA1c follow-up" },
];

const ALERTS = [
  { t: "High BP reading detected",     w: "Meera Iyer · 148/92 mmHg",     tone: "red",   ic: "activity" },
  { t: "Abnormal glucose result",      w: "Rohan Das · 142 mg/dL",        tone: "red",   ic: "flask" },
  { t: "Medication allergy warning",   w: "Arjun Nair · Penicillin",      tone: "amber", ic: "alert" },
  { t: "Missed follow-up reminder",    w: "Kavya Menon · 3 days overdue", tone: "amber", ic: "clock" },
];

const INSIGHTS = [
  { l: "Average wait time",       v: "14", u: "min", d: "-2 min", up: true, pct: 55 },
  { l: "No-show rate",            v: "8",  u: "%",   d: "-1%",    up: true, pct: 8  },
  { l: "Appointments completed",  v: "76", u: "%",   d: "+5%",    up: true, pct: 76 },
  { l: "Patient satisfaction",    v: "4.7",u: "/5",  d: "+0.2",   up: true, pct: 94 },
];

const TASKS = [
  { ic: "flask",    tone: "teal",  t: "Nurse Priya requested review of lab result",    m: "Meera Iyer · 8 min ago",  tag: "Urgent" },
  { ic: "messages", tone: "blue",  t: "Patient follow-up message pending",              m: "Kavya Menon · 22 min ago", tag: null },
  { ic: "shield",   tone: "amber", t: "Admin team assigned insurance verification",     m: "Rohan Das · 1 hr ago",    tag: null },
];

const KPI_BOX = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 16, boxShadow: "var(--sh-1)", padding: 18,
};

function SectionCard({ title, count, action, children, headRight, onAction }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border-2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-.01em" }}>{title}</span>
          {count != null && (
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 99, padding: "1px 9px" }}>
              {count}
            </span>
          )}
        </div>
        {headRight || (action && (
          <button onClick={onAction} style={{ fontSize: 13, fontWeight: 600, color: "var(--primary-600)", display: "flex", alignItems: "center", gap: 4 }}>
            {action} <Icon name="chevronR" size={15} />
          </button>
        ))}
      </div>
      <div style={{ padding: 8, flex: 1 }}>{children}</div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { mobile, tablet } = useBreakpoint();

  const kpiCols   = mobile  ? "1fr 1fr" : tablet ? "1fr 1fr" : "repeat(4,1fr)";
  const mainCols  = (mobile || tablet) ? "1fr" : "1.55fr 1fr";
  const btmCols   = (mobile || tablet) ? "1fr" : "1.25fr 1fr";
  const insightCols = mobile ? "1fr" : "1fr 1fr";

  return (
    <Layout>
      <div className="app-body scroll-y">
        {/* Greeting */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 24 : 30, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>
              Good morning, Dr. Varsha
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-2)", margin: "6px 0 0" }}>
              Today's clinic overview · Monday, 08 June 2026
            </p>
          </div>
          {!mobile && (
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" icon="calendar">Today</Btn>
              <Btn variant="secondary" icon="download">Export</Btn>
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: kpiCols, gap: 12, marginBottom: 16 }}>
          <div style={KPI_BOX}>
            <KpiCard icon="patients" tone="blue"  label="Today's Patients"       value="32" delta="+4"  up={true} />
          </div>
          <div style={KPI_BOX}>
            <KpiCard icon="calendar" tone="teal"  label="Upcoming Appointments"  value="18" delta="+2"  up={true} />
          </div>
          <div style={{ ...KPI_BOX, borderColor: "#FBD5D5", background: "linear-gradient(180deg,#FFF6F6,#fff)" }}>
            <KpiCard icon="alert"    tone="red"   label="Critical Alerts"        value="5"  delta="+2"  up={false} />
          </div>
          <div style={KPI_BOX}>
            <KpiCard icon="flask"    tone="amber" label="Pending Lab Reports"    value="12" delta="-3"  up={true} />
          </div>
        </div>

        {/* Main grid: Schedule + Alerts */}
        <div style={{ display: "grid", gridTemplateColumns: mainCols, gap: 14, marginBottom: 14 }}>
          <SectionCard title="Today's Schedule" count="12" action="View all" onAction={() => navigate("/appointments")}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SCHEDULE.map(s => (
                <div
                  key={s.name}
                  tabIndex={0}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 10px", borderRadius: 12, cursor: "pointer", transition: "background .12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => navigate("/appointments")}
                >
                  <div style={{ textAlign: "center", minWidth: 48 }}>
                    <div style={{ fontSize: 15, fontWeight: 750, letterSpacing: "-.02em" }}>{s.time}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-3)" }}>{s.ap}</div>
                  </div>
                  <div style={{ width: 1, height: 34, background: "var(--border)" }} />
                  <Avatar name={s.name} size={38} color={s.color} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 650 }}>{s.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.type} · {s.note}
                    </div>
                  </div>
                  {!mobile && <Chip label={s.status} />}
                  <button style={{ color: "var(--text-3)", display: "flex", padding: 4, flexShrink: 0 }}>
                    <Icon name="chevronR" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Patient Alerts" count="5" headRight={<Chip label="Critical" size="sm" />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 8px" }}>
              {ALERTS.map(a => {
                const red = a.tone === "red";
                return (
                  <div key={a.t} style={{
                    display: "flex", gap: 11, alignItems: "flex-start", padding: "11px 12px",
                    borderRadius: 12,
                    background: red ? "var(--critical-50)" : "var(--warning-50)",
                    border: "1px solid " + (red ? "#FBD5D5" : "#FCE8C0"),
                  }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: "#fff", color: red ? "var(--critical)" : "var(--warning)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={a.ic} size={17} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 650, color: red ? "#7F1D1D" : "#7A4A06" }}>{a.t}</div>
                      <div style={{ fontSize: 12, color: red ? "#B4534E" : "#9A6A1E", marginTop: 2 }}>{a.w}</div>
                    </div>
                    <button style={{ color: red ? "var(--critical)" : "var(--warning)", display: "flex", marginTop: 2, flexShrink: 0 }}>
                      <Icon name="chevronR" size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Bottom grid: Insights + Tasks */}
        <div style={{ display: "grid", gridTemplateColumns: btmCols, gap: 14 }}>
          <SectionCard title="Operational Insights" action="Analytics" onAction={() => navigate("/analytics")}>
            <div style={{ display: "grid", gridTemplateColumns: insightCols, gap: 10, padding: "6px 8px" }}>
              {INSIGHTS.map(m => (
                <div key={m.l} style={{ background: "var(--bg)", border: "1px solid var(--border-2)", borderRadius: 12, padding: "14px 15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 500 }}>{m.l}</div>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--success)" }}>{m.d}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 760, letterSpacing: "-.02em", margin: "8px 0 10px" }}>
                    {m.v}<span style={{ fontSize: 14, color: "var(--text-3)", fontWeight: 600, marginLeft: m.u === "%" ? 1 : 3 }}>{m.u}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: m.pct + "%", borderRadius: 99, background: "linear-gradient(90deg,#2563EB,#14B8A6)" }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Messages & Tasks" count="3" action="Inbox" onAction={() => navigate("/messages")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "4px 4px" }}>
              {TASKS.map(t => {
                const tones = { teal: ["#ECFDF8", "#0F766E"], blue: ["#EFF4FF", "#2563EB"], amber: ["#FFF7E8", "#B45309"] };
                const [bg, fg] = tones[t.tone];
                return (
                  <div
                    key={t.t}
                    style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "11px 12px", borderRadius: 12, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    onClick={() => navigate("/messages")}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={t.ic} size={17} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4 }}>{t.t}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{t.m}</div>
                    </div>
                    {t.tag && <Chip label={t.tag} size="sm" />}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </Layout>
  );
}
