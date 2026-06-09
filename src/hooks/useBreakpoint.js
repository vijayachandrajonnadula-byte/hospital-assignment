import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    mobile:  w < 640,
    tablet:  w >= 640 && w < 1100,
    desktop: w >= 1100,
    w,
  };
}
