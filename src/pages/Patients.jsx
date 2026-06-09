import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const PATIENT_LIST = [
  { id: 1, name: "Meera Iyer",    age: 42, gender: "F", id_: "CP-10482", status: "Follow-up Required", color: "rose",   condition: "Hypertension",      last: "12 May 2026" },
  { id: 2, name: "Arjun Nair",    age: 35, gender: "M", id_: "CP-10483", status: "In Progress",        color: "green",  condition: "General Illness",   last: "08 Jun 2026" },
  { id: 3, name: "Kavya Menon",   age: 29, gender: "F", id_: "CP-10484", status: "Scheduled",          color: "violet", condition: "Thyroid review",    last: "03 Mar 2026" },
  { id: 4, name: "Rohan Das",     age: 54, gender: "M", id_: "CP-10485", status: "Waiting",            color: "amber",  condition: "Diabetes",          last: "10 Mar 2026" },
  { id: 5, name: "Fatima Khan",   age: 31, gender: "F", id_: "CP-10486", status: "Scheduled",          color: "teal",   condition: "New patient",       last: "—" },
  { id: 6, name: "Vikram Reddy",  age: 48, gender: "M", id_: "CP-10487", status: "Completed",          color: "blue",   condition: "Post-op follow-up", last: "01 Jun 2026" },
];

export default function Patients() {
  const navigate = useNavigate();
  const { mobile } = useBreakpoint();

  const cols = mobile
    ? "1.6fr 1fr 1fr"
    : "2fr 1fr 1fr 1.2fr 1fr 1fr";

  return (
    <Layout>
      <div className="app-body scroll-y">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 24 : 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Patients</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Manage patient records and care plans.</p>
          </div>
          <Btn variant="primary" icon="plus">Add Patient</Btn>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--border)", borderRadius: 11, padding: "10px 16px", maxWidth: 420, marginBottom: 20, boxShadow: "var(--sh-1)" }}>
          <Icon name="search" size={17} style={{ color: "var(--text-3)" }} />
          <input
            placeholder={mobile ? "Search patients…" : "Search patients by name, ID, or condition…"}
            style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }}
          />
        </div>

        {/* Patient table */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", overflowX: "auto" }}>
          <div style={{ minWidth: mobile ? 360 : 0 }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "12px 20px", background: "var(--bg)", borderBottom: "1px solid var(--border)", fontSize: 11, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em" }}>
              <span>Patient</span>
              {!mobile && <span>ID</span>}
              {!mobile && <span>Age / Sex</span>}
              {!mobile && <span>Condition</span>}
              <span>Status</span>
              <span>Last Visit</span>
            </div>

            {PATIENT_LIST.map((p, i) => (
              <div
                key={p.id}
                style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "14px 20px", alignItems: "center", borderBottom: i < PATIENT_LIST.length - 1 ? "1px solid var(--border-2)" : "none", cursor: "pointer", transition: "background .12s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                onClick={() => navigate("/patients/1")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <Avatar name={p.name} size={38} color={p.color} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    {mobile && <div style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "'Roboto Mono',ui-monospace,monospace", marginTop: 1 }}>{p.id_}</div>}
                  </div>
                </div>
                {!mobile && <span style={{ fontSize: 13, color: "var(--text-2)", fontFamily: "'Roboto Mono',ui-monospace,monospace" }}>{p.id_}</span>}
                {!mobile && <span style={{ fontSize: 13.5, color: "var(--text-2)" }}>{p.age} · {p.gender}</span>}
                {!mobile && <span style={{ fontSize: 13.5, color: "var(--text)" }}>{p.condition}</span>}
                <Chip label={p.status} size="sm" />
                <span style={{ fontSize: 13, color: "var(--text-3)" }}>{p.last}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
