import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const RECORDS = [
  { patient: "Meera Iyer",   color: "rose",   type: "Lab Report",        date: "28 May 2026", doc: "Glucose_Panel.pdf",          size: "248 KB" },
  { patient: "Arjun Nair",   color: "green",  type: "Consultation Note", date: "08 Jun 2026", doc: "ConsultNote_Arjun.pdf",       size: "64 KB" },
  { patient: "Kavya Menon",  color: "violet", type: "Lab Report",        date: "03 Mar 2026", doc: "ThyroidPanel_Kavya.pdf",      size: "112 KB" },
  { patient: "Rohan Das",    color: "amber",  type: "Prescription",      date: "10 Mar 2026", doc: "Prescription_Rohan.pdf",      size: "32 KB" },
  { patient: "Meera Iyer",   color: "rose",   type: "ECG Scan",          date: "18 Apr 2026", doc: "ECG_Meera_Apr.png",           size: "1.4 MB" },
  { patient: "Vikram Reddy", color: "blue",   type: "Discharge Summary", date: "01 Jun 2026", doc: "DischargeSummary_Vikram.pdf", size: "318 KB" },
];

export default function MedicalRecords() {
  const { mobile } = useBreakpoint();
  const cols = mobile ? "1.6fr 1fr 60px" : "2fr 1.2fr 1.2fr 1fr 80px";

  return (
    <Layout>
      <div className="app-body scroll-y">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 24 : 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Medical Records</h1>
            {!mobile && <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Access and manage all patient medical documents.</p>}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {!mobile && <Btn variant="secondary" icon="filter">Filter</Btn>}
            <Btn variant="primary" icon="plus">{mobile ? "Upload" : "Upload Record"}</Btn>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "12px 20px", background: "var(--bg)", borderBottom: "1px solid var(--border)", fontSize: 11, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em" }}>
            <span>Patient</span>
            {!mobile && <span>Document</span>}
            <span>Type</span>
            {!mobile && <span>Date</span>}
            <span>Action</span>
          </div>

          {/* Rows */}
          {RECORDS.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "14px 20px", alignItems: "center", borderBottom: i < RECORDS.length - 1 ? "1px solid var(--border-2)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Avatar name={r.patient} size={36} color={r.color} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.patient}</div>
                  {mobile && <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 1 }}>{r.date}</div>}
                </div>
              </div>
              {!mobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-50)", color: "var(--primary-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="file" size={15} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.doc}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{r.size}</div>
                  </div>
                </div>
              )}
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{r.type}</span>
              {!mobile && <span style={{ fontSize: 13, color: "var(--text-3)" }}>{r.date}</span>}
              <button style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--primary-600)" }}>
                <Icon name="download" size={15} /> View
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
