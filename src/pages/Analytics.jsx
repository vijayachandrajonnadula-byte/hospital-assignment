import { useState } from "react";
import Layout from "../components/Layout";
import KpiCard from "../components/KpiCard";
import Icon from "../components/Icon";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const KPI_BOX = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 16, boxShadow: "var(--sh-1)", padding: 18,
};

function ChartCard({ title, sub, action, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--sh-1)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-.01em" }}>{title}</div>
          {sub && <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{sub}</div>}
        </div>
        {action && (
          <button style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "5px 11px", display: "flex", alignItems: "center", gap: 5 }}>
            {action} <Icon name="chevronD" size={13} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function LineChart() {
  const data = [260, 290, 275, 320, 300, 360, 340, 400, 380, 428];
  const W = 700, H = 220, pad = 8;
  const max = 460, min = 220;
  const pts = data.map((v, i) => [
    pad + (i * (W - pad * 2)) / (data.length - 1),
    H - 24 - ((v - min) / (max - min)) * (H - 50),
  ]);
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = path + ` L${pts[pts.length - 1][0].toFixed(1)} ${H - 24} L${pts[0][0].toFixed(1)} ${H - 24} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 200 }}>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2563EB" stopOpacity=".18" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1={pad} x2={W - pad} y1={20 + i * 50} y2={20 + i * 50} stroke="#EDF1F6" strokeWidth={1} />
        ))}
        <path d={area} fill="url(#lg)" />
        <path d={path} fill="none" stroke="#2563EB" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) =>
          i === pts.length - 1 ? <circle key={i} cx={p[0]} cy={p[1]} r={5} fill="#2563EB" stroke="#fff" strokeWidth={2.5} /> : null
        )}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--text-3)", marginTop: 4, padding: "0 4px" }}>
        {["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Now"].map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

function Donut() {
  const segs = [["Completed", 84, "#16A34A"], ["Waiting", 9, "#F59E0B"], ["Cancelled", 4, "#94A3B8"], ["No-show", 3, "#DC2626"]];
  const total = segs.reduce((a, s) => a + s[1], 0);
  let acc = 0;
  const r = 58, C = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={150} height={150} viewBox="0 0 150 150" style={{ flexShrink: 0 }}>
        <circle cx={75} cy={75} r={r} fill="none" stroke="#EDF1F6" strokeWidth={18} />
        {segs.map((s, i) => {
          const frac = s[1] / total;
          const dash = frac * C;
          const off = -acc * C;
          acc += frac;
          return (
            <circle key={i} cx={75} cy={75} r={r} fill="none" stroke={s[2]} strokeWidth={18}
              strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={off}
              transform="rotate(-90 75 75)" strokeLinecap="butt" />
          );
        })}
        <text x={75} y={71} textAnchor="middle" fontSize={26} fontWeight={750} fill="#0F172A">84%</text>
        <text x={75} y={90} textAnchor="middle" fontSize={11} fill="#64748B" fontWeight={600}>Completed</text>
      </svg>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11 }}>
        {segs.map(s => (
          <div key={s[0]} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s[2], flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: "var(--text-2)" }}>{s[0]}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{s[1]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  const data = [
    ["General Medicine", 142, "#2563EB"],
    ["Cardiology",       86,  "#14B8A6"],
    ["Pediatrics",       64,  "#16A34A"],
    ["Diagnostics",      98,  "#F59E0B"],
    ["Emergency",        47,  "#DC2626"],
  ];
  const max = 150;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {data.map(([name, v, c]) => (
        <div key={name}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>{name}</span>
            <span style={{ fontWeight: 700, color: "var(--text-2)" }}>{v}</span>
          </div>
          <div style={{ height: 10, borderRadius: 99, background: "#F1F5F9", overflow: "hidden" }}>
            <div style={{ height: "100%", width: (v / max * 100) + "%", borderRadius: 99, background: c, transition: "width .6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Satisfaction() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 6 }}>
        <div style={{ fontSize: 46, fontWeight: 780, letterSpacing: "-.03em", lineHeight: 1 }}>4.7</div>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 14, color: "var(--text-3)", fontWeight: 600 }}>/ 5.0</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: "var(--success)" }}>
            <Icon name="arrowUp" size={12} sw={2.5} /> +0.2
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width={18} height={18} viewBox="0 0 24 24" fill={i <= 4 ? "#F59E0B" : "none"} stroke={i <= 4 ? "#F59E0B" : "#CBD5E1"} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {["“Quick and attentive consultation.”", "“Wait time was much shorter today.”"].map(t => (
          <div key={t} style={{ fontSize: 12.5, color: "var(--text-2)", fontStyle: "italic", padding: "9px 12px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border-2)", lineHeight: 1.45 }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function PendingTasks() {
  const tasks = [
    ["Lab review pending",       "Glucose & lipid panels awaiting sign-off",   "flask",   "teal",  "6 tasks", "Urgent"],
    ["Follow-up calls",          "Patients overdue for follow-up contact",      "phone",   "blue",  "9 tasks", null],
    ["Prescription approvals",   "Refill requests awaiting approval",           "pill",    "amber", "4 tasks", null],
    ["Insurance verification",   "Coverage checks pending for new patients",    "shield",  "slate", "3 tasks", null],
  ];
  const tones = {
    teal:  ["#ECFDF8", "#0F766E"],
    blue:  ["#EFF4FF", "#2563EB"],
    amber: ["#FFF7E8", "#B45309"],
    slate: ["#F1F5F9", "#475569"],
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
      {tasks.map(([t, d, ic, tone, count, tag]) => {
        const [bg, fg] = tones[tone];
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={ic} size={19} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 650 }}>{t}</span>
                {tag && <Chip label={tag} size="sm" />}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{d}</div>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-2)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 99, padding: "4px 11px", whiteSpace: "nowrap", flexShrink: 0 }}>
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState("Last 30 days");
  const { mobile, tablet } = useBreakpoint();

  const kpiCols   = (mobile || tablet) ? "1fr 1fr" : "repeat(4,1fr)";
  const chart1Cols = (mobile || tablet) ? "1fr" : "1.7fr 1fr";
  const chart2Cols = (mobile || tablet) ? "1fr" : "1.4fr 1fr";

  return (
    <Layout>
      <div className="app-body scroll-y">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 24 : 28, fontWeight: 750, letterSpacing: "-.025em", margin: 0 }}>Analytics</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-2)", margin: "5px 0 0" }}>Monitor clinic performance, patient flow, and operational efficiency.</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!mobile && (
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3, gap: 2 }}>
                {["Last 7 days", "Last 30 days", "Custom"].map(r => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    style={{
                      padding: "7px 13px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                      background: range === r ? "#fff" : "transparent",
                      color: range === r ? "var(--text)" : "var(--text-2)",
                      boxShadow: range === r ? "var(--sh-1)" : "none",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
            <Btn variant="secondary" icon="download">Export</Btn>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: kpiCols, gap: 12, marginBottom: 14 }}>
          <div style={KPI_BOX}><KpiCard icon="patients"    tone="blue"  label="Patient Volume · this month"  value="428"  delta="+12%" up={true} /></div>
          <div style={KPI_BOX}><KpiCard icon="checkCircle" tone="green" label="Appointment Completion"       value="84%"  delta="+6%"  up={true} /></div>
          <div style={KPI_BOX}><KpiCard icon="clock"       tone="teal"  label="Average Wait Time"            value="14m"  delta="-3 min" up={true} /></div>
          <div style={KPI_BOX}><KpiCard icon="trend"       tone="amber" label="No-show Rate"                 value="8%"   delta="-2%"  up={true} /></div>
        </div>

        {/* Row 1: Trend + Donut */}
        <div style={{ display: "grid", gridTemplateColumns: chart1Cols, gap: 14, marginBottom: 14 }}>
          <ChartCard title="Patient Volume Trend" sub={range} action="Daily">
            <LineChart />
          </ChartCard>
          <ChartCard title="Appointments by Status">
            <Donut />
          </ChartCard>
        </div>

        {/* Row 2: Bar + Satisfaction */}
        <div style={{ display: "grid", gridTemplateColumns: chart2Cols, gap: 14, marginBottom: 14 }}>
          <ChartCard title="Department Workload" sub="Appointments handled">
            <BarChart />
          </ChartCard>
          <ChartCard title="Patient Satisfaction">
            <Satisfaction />
          </ChartCard>
        </div>

        {/* Row 3: Pending tasks */}
        <ChartCard title="Pending Clinical Tasks" action="Assign all">
          <PendingTasks />
        </ChartCard>
      </div>
    </Layout>
  );
}
