import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768 || "ontouchstart" in window;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const isTouchDevice = "ontouchstart" in window;

    const handleChange = () => {
      setIsMobile(mediaQuery.matches || isTouchDevice);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
