import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

/* ── data ───────────────────────────────────────────────── */
const TIMELINE = [
  { d: "12 May 2026", t: "Follow-up consultation",  who: "Dr. Varsha Varadwaj", desc: "BP elevated, adjusted Amlodipine dosage. Advised low-sodium diet.",     tone: "blue" },
  { d: "18 Apr 2026", t: "Blood pressure review",    who: "Nurse Priya",          desc: "Recorded 146/90 mmHg. Flagged for physician review.",                   tone: "amber" },
  { d: "03 Mar 2026", t: "Lab test completed",        who: "Diagnostics Lab",      desc: "Lipid panel and HbA1c collected. Results uploaded.",                    tone: "teal" },
  { d: "14 Feb 2026", t: "Initial consultation",      who: "Dr. Varsha Varadwaj", desc: "New patient intake. History of hypertension noted.",                    tone: "slate" },
];
const MEDS = [
  { n: "Amlodipine", dose: "5 mg",    freq: "Once daily · morning",     for: "Hypertension", tone: "blue"  },
  { n: "Metformin",  dose: "500 mg",  freq: "Twice daily · with meals", for: "Pre-diabetes", tone: "teal"  },
  { n: "Vitamin D",  dose: "1000 IU", freq: "Once daily",               for: "Supplement",   tone: "amber" },
];
const LABS = [
  ["Blood Glucose", "142 mg/dL", "70–110",  "High",   "28 May 2026"],
  ["BP Reading",    "148/92",    "<120/80",  "High",   "29 May 2026"],
  ["Cholesterol",   "196 mg/dL", "<200",     "Normal", "20 May 2026"],
];
const NOTES = [
  { who: "Dr. Varsha Varadwaj", t: "12 May 2026 · 09:24", txt: "Patient reports occasional morning headaches. BP trend remains elevated despite medication adherence. Increasing Amlodipine to 5mg and scheduling 2-week follow-up." },
  { who: "Dr. Varsha Varadwaj", t: "18 Apr 2026 · 11:10", txt: "Reviewed home BP log. Recommend continued monitoring and reducing sodium intake. Lab work ordered." },
];
const DOCS = [
  ["Discharge Summary — Feb 2026", "PDF · 248 KB"],
  ["Lipid Panel Report",            "PDF · 112 KB"],
  ["ECG Scan — Apr 2026",           "PNG · 1.4 MB"],
  ["Insurance Authorization",       "PDF · 88 KB"],
];
const TONE_COLORS = {
  blue:  "#2563EB", amber: "#F59E0B",
  teal:  "#14B8A6", slate: "#94A3B8",
};
const MED_TONES  = {
  blue:  ["#EFF4FF", "#2563EB"],
  teal:  ["#ECFDF8", "#0F766E"],
  amber: ["#FFF7E8", "#B45309"],
};
const CRIT_TONES = {
  red:   ["#FEF1F1", "#DC2626", "#FBD5D5"],
  amber: ["#FFF7E8", "#B45309", "#FCE8C0"],
};

/* ── reusable sub-components ────────────────────────────── */
function PanelCard({ title, action, children, icon }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 18px", borderBottom: "1px solid var(--border-2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 700 }}>
          {icon && <span style={{ color: "var(--text-3)", display: "flex" }}><Icon name={icon} size={17} /></span>}
          {title}
        </div>
        {action && (
          <button style={{ fontSize: 13, fontWeight: 600, color: "var(--primary-600)", display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
            {action}
          </button>
        )}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}

function CritItem({ ic, tone, label, val }) {
  const [bg, fg, bd] = CRIT_TONES[tone] || CRIT_TONES.red;
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "center", background: bg, border: `1px solid ${bd}`, borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name={ic} size={18} />
      </div>
      <div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: fg, textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 650, color: tone === "red" ? "#7F1D1D" : "#7A4A06", marginTop: 1 }}>{val}</div>
      </div>
    </div>
  );
}

/* ── main-column content cards ──────────────────────────── */
function TimelineCard() {
  return (
    <PanelCard title="Medical Timeline" icon="clock" action="Full history">
      <div style={{ paddingLeft: 4 }}>
        {TIMELINE.map((e, i) => (
          <div key={e.d} style={{ display: "flex", gap: 16, paddingBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
                background: TONE_COLORS[e.tone],
                boxShadow: `0 0 0 4px ${TONE_COLORS[e.tone]}28`,
              }} />
              {i < TIMELINE.length - 1 && (
                <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 4, minHeight: 16 }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontSize: 14.5, fontWeight: 650 }}>{e.t}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-3)", fontWeight: 500, whiteSpace: "nowrap" }}>{e.d}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 4, lineHeight: 1.5 }}>{e.desc}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="user" size={12} /> {e.who}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

function MedsCard() {
  return (
    <PanelCard title="Current Medications" icon="pill" action="Manage">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MEDS.map(m => {
          const [bg, fg] = MED_TONES[m.tone] || MED_TONES.blue;
          return (
            <div key={m.n} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="pill" size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 650 }}>
                  {m.n}{" "}
                  <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{m.dose}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 1 }}>{m.freq}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 99, padding: "3px 10px", whiteSpace: "nowrap" }}>
                {m.for}
              </span>
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
}

function LabsCard() {
  const COLS = "1.3fr 1fr 1fr .85fr 1fr";
  return (
    <PanelCard title="Recent Lab Results" icon="flask" action="View all">
      <div style={{ overflowX: "auto", marginLeft: -4, marginRight: -4 }}>
        <div style={{ minWidth: 480 }}>
          <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 10, fontSize: 11, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
            {["Test", "Result", "Reference", "Status", "Date"].map(h => <span key={h}>{h}</span>)}
          </div>
          {LABS.map(([test, res, ref, st, date], i) => (
            <div key={test} style={{ display: "grid", gridTemplateColumns: COLS, gap: 10, alignItems: "center", padding: "12px 0", borderBottom: i < LABS.length - 1 ? "1px solid var(--border-2)" : "none", fontSize: 13.5 }}>
              <span style={{ fontWeight: 650 }}>{test}</span>
              <span style={{ fontWeight: 600, color: st === "High" ? "var(--critical)" : "var(--text)", fontFamily: "'Roboto Mono',ui-monospace,monospace" }}>{res}</span>
              <span style={{ color: "var(--text-2)", fontFamily: "'Roboto Mono',ui-monospace,monospace", fontSize: 12.5 }}>{ref}</span>
              <Chip label={st} size="sm" />
              <span style={{ color: "var(--text-2)", fontSize: 12.5 }}>{date}</span>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}

function NotesCard() {
  return (
    <PanelCard title="Doctor Notes" icon="edit" action="Add note">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {NOTES.map(n => (
          <div key={n.t} style={{ padding: "14px 16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, borderLeft: "3px solid var(--primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Avatar name={n.who} size={24} color="blue" />
              <span style={{ fontSize: 13, fontWeight: 650 }}>{n.who}</span>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>· {n.t}</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.55 }}>{n.txt}</div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

function DocsCard({ mobile }) {
  return (
    <PanelCard title="Documents" icon="file" action="Upload">
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
        {DOCS.map(([name, meta]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="file" size={17} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 1 }}>{meta}</div>
            </div>
            <button style={{ color: "var(--text-3)", display: "flex", background: "none", border: "none", cursor: "pointer" }}>
              <Icon name="download" size={16} />
            </button>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

/* ── right sidebar ──────────────────────────────────────── */
function PatientSidebar({ sticky }) {
  const SUMMARY_ROWS = [
    ["Phone",      "+91 98••• ••432"],
    ["Email",      "meera.i@email.com"],
    ["Blood group","B+"],
    ["Care plan",  "Hypertension mgmt"],
  ];
  const CARE_TEAM = [
    ["Dr. Varsha Varadwaj", "Primary Physician", "blue"],
    ["Nurse Priya",          "Care Nurse",         "teal"],
    ["Dr. Sameer Khan",      "Cardiology",         "violet"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, ...(sticky ? { position: "sticky", top: 24 } : {}) }}>
      <PanelCard title="Patient Summary" icon="user">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SUMMARY_ROWS.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < SUMMARY_ROWS.length - 1 ? "1px solid var(--border-2)" : "none" }}>
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 12px", background: "var(--warning-50)", border: "1px solid #FCE8C0", borderRadius: 10 }}>
            <Icon name="alert" size={16} style={{ color: "var(--warning)", flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7A4A06" }}>Allergy: Penicillin</span>
          </div>
        </div>
      </PanelCard>

      <PanelCard title="Care Team">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CARE_TEAM.map(([name, role, color]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Avatar name={name} size={36} color={color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 1 }}>{role}</div>
              </div>
              <button
                aria-label={`Message ${name}`}
                style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--border)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)", flexShrink: 0, cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--text-3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <Icon name="messages" size={15} />
              </button>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

/* ── tab-driven content render ──────────────────────────── */
function renderTabContent(tab, mobile) {
  const all = tab === "Overview";
  const out = [];
  if (all || tab === "Medical History") out.push(<TimelineCard key="tl" />);
  if (all || tab === "Prescriptions")   out.push(<MedsCard key="md" />);
  if (all || tab === "Lab Results")     out.push(<LabsCard key="lb" />);
  if (all || tab === "Notes")           out.push(<NotesCard key="nt" />);
  if (tab === "Documents")              out.push(<DocsCard key="dc" mobile={mobile} />);
  return out;
}

/* ── page ───────────────────────────────────────────────── */
const TABS = ["Overview", "Medical History", "Lab Results", "Prescriptions", "Notes", "Documents"];

export default function PatientProfile() {
  const [tab, setTab] = useState("Overview");
  const navigate = useNavigate();
  const { mobile, tablet } = useBreakpoint();
  const isNarrow = mobile || tablet;

  return (
    <Layout>
      <div className="app-body scroll-y">

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-2)", marginBottom: 16 }}>
          <span
            style={{ cursor: "pointer", color: "var(--text-2)" }}
            onClick={() => navigate("/patients")}
            onMouseEnter={e => e.currentTarget.style.color = "var(--primary-600)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}
          >
            Patients
          </span>
          <Icon name="chevronR" size={14} />
          <span style={{ color: "var(--text)", fontWeight: 600 }}>Meera Iyer</span>
        </div>

        {/* Patient header card */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", padding: mobile ? 16 : 22, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: mobile ? 12 : 18, flexWrap: "wrap" }}>
            <Avatar name="Meera Iyer" size={mobile ? 52 : 64} color="rose" ring={true} />

            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: mobile ? 20 : 25, fontWeight: 750, letterSpacing: "-.02em", margin: 0, lineHeight: 1.2 }}>
                  Meera Iyer
                </h1>
                <Chip label="Follow-up Required" />
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 13, color: "var(--text-2)", flexWrap: "wrap", alignItems: "center" }}>
                <span>42 yrs · Female</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <b style={{ color: "var(--text)", fontFamily: "'Roboto Mono',ui-monospace,monospace" }}>CP-10482</b>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="drop" size={14} style={{ color: "var(--critical)" }} /> B+
                </span>
                {!mobile && <span>Last visit: 12 May 2026</span>}
                <span style={{ color: "var(--primary-600)", fontWeight: 600 }}>Next: Today, 09:00 AM</span>
              </div>
            </div>

            {/* action buttons */}
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap", flexShrink: 0 }}>
              {!mobile && <Btn variant="primary"   icon="stethoscope">Start Consultation</Btn>}
              <Btn variant="secondary" icon="edit">Add Note</Btn>
              <Btn variant="secondary" icon="messages" onClick={() => navigate("/messages")}>Message</Btn>
              {mobile && <Btn variant="primary" icon="stethoscope">Consult</Btn>}
            </div>
          </div>

          {/* critical info strip */}
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 10, marginTop: 18 }}>
            <CritItem ic="alert" tone="red"   label="Allergy"           val="Penicillin" />
            <CritItem ic="heart" tone="amber" label="Chronic condition" val="Hypertension" />
            <CritItem ic="trend" tone="red"   label="Risk flag"         val="Elevated blood pressure trend" />
          </div>
        </div>

        {/* Tabs — tabs-strip enables horizontal scroll on mobile */}
        <div className="tabs-strip" style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
          {TABS.map(t => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "11px 14px",
                  fontSize: mobile ? 13 : 14,
                  fontWeight: active ? 650 : 500,
                  color: active ? "var(--primary-600)" : "var(--text-2)",
                  background: "transparent",
                  border: "none",
                  borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                  marginBottom: -1,
                  cursor: "pointer",
                  transition: "color .12s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--text-2)"; }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Two-column body */}
        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1.6fr 1fr", gap: 16, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {renderTabContent(tab, mobile)}
          </div>
          <PatientSidebar sticky={!isNarrow} />
        </div>

      </div>
    </Layout>
  );
}
