import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Layout({ children }) {
  const { desktop } = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const narrow = !desktop;

  return (
    <div className="app-shell">
      {/* Backdrop overlay when drawer is open on narrow screens */}
      {narrow && drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,23,42,.45)",
            zIndex: 199,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <Sidebar
        narrow={narrow}
        drawerOpen={narrow && drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="app-main">
        <Topbar
          showMenu={narrow}
          onMenuClick={() => setDrawerOpen(v => !v)}
        />
        {children}
      </div>
    </div>
  );
}
