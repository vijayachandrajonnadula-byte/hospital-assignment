import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const APPTS = [
  { id: 1, time: "09:00 AM", name: "Meera Iyer",   type: "Follow-up",            status: "Waiting",     color: "rose",   reason: "Hypertension follow-up & BP review",             prev: "12 May — adjusted Amlodipine to 5mg" },
  { id: 2, time: "09:30 AM", name: "Arjun Nair",   type: "General Consultation", status: "In Progress", color: "green",  reason: "Persistent cough and mild fever (4 days)",        prev: "First visit this quarter" },
  { id: 3, time: "10:00 AM", name: "Kavya Menon",  type: "Lab Review",           status: "Scheduled",   color: "violet", reason: "Review thyroid function panel results",           prev: "03 Mar — lab tests collected" },
  { id: 4, time: "10:30 AM", name: "Rohan Das",    type: "Diabetes Review",      status: "Waiting",     color: "amber",  reason: "Quarterly HbA1c review & medication check",       prev: "10 Mar — HbA1c 7.2%, advised diet" },
  { id: 5, time: "11:00 AM", name: "Fatima Khan",  type: "New Patient",          status: "Scheduled",   color: "teal",   reason: "New patient intake & general assessment",         prev: "No prior visits" },
];

const FILTERS = ["All", "Waiting", "In Progress", "Scheduled", "Completed", "Cancelled"];

function DetailRow({ ic, label, val }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name={ic} size={16} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 1 }}>{val}</div>
      </div>
    </div>
  );
}

export default function Appointments() {
  const [sel, setSel] = useState(1);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { mobile, tablet } = useBreakpoint();

  const a = APPTS.find(x => x.id === sel);
  const list = filter === "All" ? APPTS : APPTS.filter(x => x.status === filter);

  const queueTiles = [
    { l: "Current queue",   v: "7 waiting", ic: "patients",    tone: "amber" },
    { l: "Average delay",   v: "12 min",    ic: "clock",       tone: "blue" },
    { l: "Completed today", v: "14",        ic: "checkCircle", tone: "green" },
  ];
  const tileColors = { amber: ["#FFF7E8", "#B45309"], blue: ["#EFF4FF", "#2563EB"], green: ["#ECFDF1", "#15803D"] };

  // On mobile/tablet: use scrollable layout; on desktop: fixed height
  const isNarrow = mobile || tablet;
  const bodyClass = isNarrow ? "app-body scroll-y" : "app-body-fixed";

  return (
    <Layout>
      <div className={bodyClass}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 24 : 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Appointments</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Manage today's schedule, patient visits, and follow-ups.</p>
          </div>
          <Btn variant="primary" icon="plus">Add Appointment</Btn>
        </div>

        {/* Queue stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {queueTiles.map(({ l, v, ic, tone }) => {
            const [bg, fg] = tileColors[tone];
            return (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 11, background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "11px 16px", boxShadow: "var(--sh-1)" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={ic} size={17} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 500 }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 750 }}>{v}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, boxShadow: "var(--sh-1)" }}>
            <Icon name="chevronL" size={16} style={{ color: "var(--text-3)" }} />
            <Icon name="calendar" size={16} style={{ color: "var(--primary-600)" }} />
            Today, 08 June 2026
            <Icon name="chevronR" size={16} style={{ color: "var(--text-3)" }} />
          </div>
          {!mobile && (
            <>
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 9, padding: 3, gap: 2 }}>
                {[["List", "list"], ["Calendar", "grid"]].map(([l, ic], i) => (
                  <button key={l} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, background: i === 0 ? "#fff" : "transparent", color: i === 0 ? "var(--text)" : "var(--text-2)", boxShadow: i === 0 ? "var(--sh-1)" : "none" }}>
                    <Icon name={ic} size={15} /> {l}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              {["Doctor", "Department", "Type"].map(d => (
                <button key={d} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 500, color: "var(--text-2)", boxShadow: "var(--sh-1)" }}>
                  {d} <Icon name="chevronD" size={14} />
                </button>
              ))}
            </>
          )}
        </div>

        {/* Filter chips */}
        <div className="tabs-strip" style={{ display: "flex", gap: 8, marginBottom: 14, paddingBottom: 2 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 99, whiteSpace: "nowrap",
                border: "1px solid " + (filter === f ? "var(--primary)" : "var(--border)"),
                background: filter === f ? "var(--primary-50)" : "#fff",
                color: filter === f ? "var(--primary-600)" : "var(--text-2)",
                transition: "all .12s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List + Detail panel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isNarrow ? "1fr" : "1.5fr 1fr",
          gap: 14,
          ...(isNarrow ? {} : { flex: 1, minHeight: 0 }),
        }}>
          {/* Appointment list */}
          <div
            className="scroll-y"
            style={{
              background: "#fff", border: "1px solid var(--border)", borderRadius: 16,
              boxShadow: "var(--sh-1)", padding: 8,
              ...(isNarrow ? {} : { overflow: "auto" }),
            }}
          >
            {list.map(x => {
              const on = x.id === sel;
              return (
                <button
                  key={x.id}
                  onClick={() => setSel(x.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "13px 12px",
                    borderRadius: 12, width: "100%", textAlign: "left",
                    background: on ? "var(--primary-50)" : "transparent",
                    boxShadow: on ? "inset 0 0 0 1px #DBE6FE" : "none",
                    transition: "background .12s", marginBottom: 2,
                  }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--bg)"; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ textAlign: "center", minWidth: 56 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 750 }}>{x.time.split(" ")[0]}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-3)" }}>{x.time.split(" ")[1]}</div>
                  </div>
                  <div style={{ width: 1, height: 36, background: "var(--border)" }} />
                  <Avatar name={x.name} size={40} color={x.color} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 650 }}>{x.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {x.type} · Dr. Varsha Varadwaj
                    </div>
                  </div>
                  <Chip label={x.status} />
                </button>
              );
            })}
            {list.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text-3)", fontSize: 13.5 }}>
                No {filter.toLowerCase()} appointments.
              </div>
            )}
          </div>

          {/* Detail panel */}
          {a && (
            <div style={{
              background: "#fff", border: "1px solid var(--border)", borderRadius: 16,
              boxShadow: "var(--sh-1)", display: "flex", flexDirection: "column",
              ...(isNarrow ? {} : { overflow: "hidden" }),
            }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-2)", background: "var(--bg)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>
                  Appointment Details
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <Avatar name={a.name} size={50} color={a.color} ring={true} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 2 }}>{a.type}</div>
                  </div>
                  <Chip label={a.status} />
                </div>
              </div>

              <div
                className="scroll-y"
                style={{
                  padding: 20, display: "flex", flexDirection: "column", gap: 16,
                  ...(isNarrow ? {} : { flex: 1, overflow: "auto" }),
                }}
              >
                <DetailRow ic="clock"       label="Time"               val={`${a.time} · 08 June 2026`} />
                <DetailRow ic="stethoscope" label="Consultation type"  val={a.type} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>Reason for visit</div>
                  <div style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.5 }}>{a.reason}</div>
                </div>
                <div style={{ padding: "13px 15px", background: "var(--bg)", borderRadius: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>Previous visit summary</div>
                  <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{a.prev}</div>
                </div>
              </div>

              <div style={{ padding: 16, borderTop: "1px solid var(--border-2)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <Btn variant="primary"    icon="user"     size="sm" onClick={() => navigate("/patients/1")}>View Patient</Btn>
                <Btn variant="secondary"  icon="calendar" size="sm">Reschedule</Btn>
                <Btn variant="secondary"  icon="bell"     size="sm">Send Reminder</Btn>
                <Btn variant="tealBtn"    icon="check"    size="sm">Mark Complete</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
