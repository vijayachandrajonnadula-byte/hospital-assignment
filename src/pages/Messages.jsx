import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import useBreakpoint from "../hooks/useBreakpoint";

const FOLDERS = [
  { id: "All",             ic: "messages",    n: 12 },
  { id: "Patients",        ic: "patients",    n: 4 },
  { id: "Care Team",       ic: "stethoscope", n: 5 },
  { id: "Lab Updates",     ic: "flask",       n: 2 },
  { id: "Insurance/Admin", ic: "shield",      n: 1 },
  { id: "Urgent",          ic: "alert",       n: 3 },
];

const CONVOS = [
  { id: 1, name: "Nurse Priya",       color: "teal",   subj: "Lab result needs review",        tag: "Urgent",  time: "8m",  preview: "Meera Iyer's glucose result came back high…", unread: true },
  { id: 2, name: "Meera Iyer",        color: "rose",   subj: "Follow-up question",              tag: "Patient", time: "24m", preview: "Should I continue the new dosage if I feel…", unread: true },
  { id: 3, name: "Admin Team",        color: "slate",  subj: "Insurance verification pending",  tag: "Admin",   time: "1h",  preview: "Rohan Das's insurance needs verification…",   unread: false },
  { id: 4, name: "Lab Team",          color: "blue",   subj: "Glucose report uploaded",         tag: "Lab",     time: "2h",  preview: "Report for Meera Iyer is now available…",    unread: false },
  { id: 5, name: "Care Coordinator",  color: "violet", subj: "Discharge summary review",        tag: "Team",    time: "3h",  preview: "Please review the discharge summary for…",   unread: false },
];

const THREAD = [
  { me: false, txt: "Dr. Varsha, Meera Iyer's glucose result came back high (142 mg/dL). Please review before her 09:00 AM follow-up.", t: "08:12 AM" },
  { me: true,  txt: "Thanks, I'll review it before the consultation. Please keep her BP reading ready.", t: "08:15 AM" },
  { me: false, txt: "Done — latest BP is 148/92. I've attached the full lab report.", t: "08:16 AM", attach: "Glucose_Panel_Meera.pdf" },
];

function CtxRow({ ic, label, val, tone }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: tone === "red" ? "var(--critical-50)" : "var(--bg)", color: tone === "red" ? "var(--critical)" : "var(--text-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name={ic} size={15} />
      </div>
      <div>
        <div style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1, color: tone === "red" ? "var(--critical)" : "var(--text)" }}>{val}</div>
      </div>
    </div>
  );
}

/* ── Folders sidebar panel ───────────────────────────────── */
function FoldersPanel({ folder, setFolder }) {
  return (
    <div style={{ borderRight: "1px solid var(--border)", padding: 16, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <div style={{ fontSize: 16, fontWeight: 750, marginBottom: 14, letterSpacing: "-.01em" }}>Messages</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {FOLDERS.map(f => {
          const on = f.id === folder;
          return (
            <button
              key={f.id}
              onClick={() => setFolder(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 10,
                fontSize: 13.5, fontWeight: on ? 650 : 500,
                color: on ? "var(--primary-600)" : "var(--text-2)",
                background: on ? "var(--primary-50)" : "transparent", textAlign: "left",
              }}
              onMouseEnter={e => { if (!on) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (!on) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; } }}
            >
              <Icon name={f.ic} size={17} style={{ color: f.id === "Urgent" && !on ? "var(--critical)" : "inherit" }} />
              <span style={{ flex: 1 }}>{f.id}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: on ? "var(--primary-600)" : "var(--text-3)" }}>{f.n}</span>
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1 }} />
      <Btn variant="primary" icon="edit" full>Compose</Btn>
    </div>
  );
}

/* ── Conversation list panel ─────────────────────────────── */
function ConvoList({ active, setActive, folder, setFolder, showFolderStrip, onSelect }) {
  return (
    <div style={{ borderRight: "1px solid var(--border)", background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      {/* folder strip for tablet/mobile */}
      {showFolderStrip && (
        <div className="tabs-strip" style={{ display: "flex", gap: 6, padding: "10px 12px", borderBottom: "1px solid var(--border)", background: "#fff" }}>
          {FOLDERS.map(f => {
            const on = f.id === folder;
            return (
              <button
                key={f.id}
                onClick={() => setFolder(f.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: on ? 650 : 500,
                  padding: "5px 11px", borderRadius: 99, whiteSpace: "nowrap", flexShrink: 0,
                  border: "1px solid " + (on ? "var(--primary)" : "var(--border)"),
                  background: on ? "var(--primary-50)" : "#fff",
                  color: on ? "var(--primary-600)" : "var(--text-2)",
                }}
              >
                <Icon name={f.ic} size={13} style={{ color: f.id === "Urgent" && !on ? "var(--critical)" : "inherit" }} />
                {f.id}
              </button>
            );
          })}
        </div>
      )}
      <div style={{ padding: "12px 12px 8px", borderBottom: "1px solid var(--border)", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", color: "var(--text-3)" }}>
          <Icon name="search" size={16} />
          <span style={{ fontSize: 13 }}>Search messages</span>
        </div>
      </div>
      <div className="scroll-y" style={{ flex: 1, overflow: "auto", padding: 8 }}>
        {CONVOS.map(x => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              onClick={() => onSelect(x.id)}
              style={{
                display: "flex", gap: 11, padding: "12px 12px", borderRadius: 12, width: "100%", textAlign: "left",
                background: on ? "#fff" : "transparent",
                boxShadow: on ? "var(--sh-1)" : "none",
                border: "1px solid " + (on ? "var(--border)" : "transparent"),
                marginBottom: 2,
              }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = "rgba(255,255,255,.6)"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ position: "relative" }}>
                <Avatar name={x.name} size={42} color={x.color} />
                {x.unread && (
                  <span style={{ position: "absolute", top: -1, right: -1, width: 11, height: 11, borderRadius: 99, background: x.tag === "Urgent" ? "var(--critical)" : "var(--primary)", boxShadow: "0 0 0 2px #fff" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13.5, fontWeight: x.unread ? 700 : 600 }}>{x.name}</span>
                  <span style={{ fontSize: 11.5, color: "var(--text-3)" }}>{x.time}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", margin: "2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{x.subj}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{x.preview}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Chat panel ──────────────────────────────────────────── */
function ChatPanel({ c, onBack }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#fff", minHeight: 0, overflow: "hidden" }}>
      <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back to messages"
            style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)", flexShrink: 0 }}
          >
            <Icon name="chevronL" size={18} />
          </button>
        )}
        <Avatar name={c.name} size={40} color={c.color} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>Subject: {c.subj}</div>
        </div>
        {c.tag === "Urgent" && <Chip label="Urgent" size="sm" />}
        <button aria-label="Conversation options" style={{ color: "var(--text-3)", display: "flex", padding: 4 }}>
          <Icon name="dots" size={18} />
        </button>
      </div>

      <div className="scroll-y" style={{ flex: 1, overflow: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: "auto" }}>
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>Today · 08 June 2026</div>
          {THREAD.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.me ? "flex-end" : "flex-start", gap: 4 }}>
              <div style={{
                maxWidth: "82%", padding: "12px 16px",
                borderRadius: m.me ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.me ? "var(--primary)" : "#fff",
                color: m.me ? "#fff" : "var(--text)",
                fontSize: 14, lineHeight: 1.55,
                border: m.me ? "none" : "1px solid var(--border)",
                boxShadow: "var(--sh-1)",
              }}>
                {m.txt}
                {m.attach && (
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 10, padding: "9px 11px", background: m.me ? "rgba(255,255,255,.16)" : "var(--bg)", borderRadius: 9 }}>
                    <Icon name="file" size={16} />
                    <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{m.attach}</span>
                    <Icon name="download" size={15} />
                  </div>
                )}
              </div>
              <span style={{ fontSize: 11, color: "var(--text-3)", padding: "0 4px" }}>{m.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)", borderRadius: 12, padding: "8px 8px 8px 16px" }}>
          <input
            placeholder="Type a secure message…"
            aria-label="Type a secure message"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent" }}
          />
          <button aria-label="Attach file" style={{ color: "var(--text-3)", display: "flex", padding: 6 }}>
            <Icon name="paperclip" size={18} />
          </button>
          <Btn variant="primary" icon="send" size="sm">Send</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <Btn variant="secondary" icon="tasks"   size="sm" style={{ flex: 1 }}>Assign Task</Btn>
          <Btn variant="secondary" icon="records" size="sm" style={{ flex: 1 }}>Attach Record</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Context panel ───────────────────────────────────────── */
function ContextPanel({ navigate }) {
  return (
    <div className="scroll-y" style={{ borderLeft: "1px solid var(--border)", background: "#fff", padding: 18, overflowY: "auto" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 14 }}>
        Linked Context
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "var(--bg)", borderRadius: 12, border: "1px solid var(--border)" }}>
        <Avatar name="Meera Iyer" size={44} color="rose" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Meera Iyer</div>
          <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 1 }}>CP-10482 · 42F</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "16px 0" }}>
        <CtxRow ic="calendar" label="Appointment" val="Today, 09:00 AM" />
        <CtxRow ic="trend"    label="Risk"        val="Elevated glucose & BP trend" tone="red" />
      </div>

      <div style={{ height: 1, background: "var(--border)", margin: "4px 0 16px" }} />

      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>
        Quick Actions
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Btn variant="secondary" icon="user"  full onClick={() => navigate("/patients/1")}>Open Patient Profile</Btn>
        <Btn variant="secondary" icon="flask" full>View Lab Report</Btn>
        <Btn variant="secondary" icon="tasks" full>Create Follow-up Task</Btn>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Messages() {
  const [active, setActive]         = useState(1);
  const [folder, setFolder]         = useState("All");
  const [mobileView, setMobileView] = useState("list"); // "list" | "chat"
  const navigate = useNavigate();
  const { mobile, tablet, desktop } = useBreakpoint();
  const c = CONVOS.find(x => x.id === active);

  function selectConvo(id) {
    setActive(id);
    if (mobile) setMobileView("chat");
  }

  /* ── mobile: one panel at a time ── */
  if (mobile) {
    return (
      <Layout>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
          {mobileView === "list" ? (
            <ConvoList
              active={active}
              setActive={setActive}
              folder={folder}
              setFolder={setFolder}
              showFolderStrip={true}
              onSelect={selectConvo}
            />
          ) : (
            <ChatPanel c={c} onBack={() => setMobileView("list")} />
          )}
        </div>
      </Layout>
    );
  }

  /* ── tablet: convo list + chat (no folders sidebar, no context panel) ── */
  if (tablet) {
    return (
      <Layout>
        <div style={{ flex: 1, minWidth: 0, display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", minHeight: 0, overflow: "hidden", height: "100%" }}>
          <ConvoList
            active={active}
            setActive={setActive}
            folder={folder}
            setFolder={setFolder}
            showFolderStrip={true}
            onSelect={selectConvo}
          />
          <ChatPanel c={c} />
        </div>
      </Layout>
    );
  }

  /* ── desktop: all 4 columns ── */
  return (
    <Layout>
      <div style={{ flex: 1, minWidth: 0, display: "grid", gridTemplateColumns: "206px 296px minmax(0,1fr) 272px", minHeight: 0, overflow: "hidden", height: "100%" }}>
        <FoldersPanel folder={folder} setFolder={setFolder} />
        <ConvoList
          active={active}
          setActive={setActive}
          folder={folder}
          setFolder={setFolder}
          showFolderStrip={false}
          onSelect={selectConvo}
        />
        <ChatPanel c={c} />
        <ContextPanel navigate={navigate} />
      </div>
    </Layout>
  );
}
