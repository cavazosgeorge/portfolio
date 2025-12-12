import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

// Check if device is touch-only (no mouse)
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const pendingPositionRef = useRef<MousePosition | null>(null);

  const updatePosition = useCallback(() => {
    if (pendingPositionRef.current) {
      setPosition(pendingPositionRef.current);
      pendingPositionRef.current = null;
    }
    rafIdRef.current = null;
  }, []);

  useEffect(() => {
    // Skip mouse tracking entirely on touch-only devices
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to ~60fps (16ms)
      if (now - lastUpdateRef.current < 16) {
        // Store pending position for next frame
        pendingPositionRef.current = { x: e.clientX, y: e.clientY };
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(updatePosition);
        }
        return;
      }

      lastUpdateRef.current = now;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updatePosition]);

  return position;
}
