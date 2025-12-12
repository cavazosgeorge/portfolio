import { useEffect, useState, useRef, RefObject } from "react";
import { useMousePosition } from "./useMousePosition";

interface MagneticOffset {
  x: number;
  y: number;
}

// Check if device is touch-only (no mouse)
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  strength: number = 0.3,
  radius: number = 150
): MagneticOffset {
  const mouse = useMousePosition();
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });

  // Cache the bounding rect to avoid layout thrashing
  const rectRef = useRef<{ centerX: number; centerY: number } | null>(null);

  // Update cached rect on scroll/resize only
  useEffect(() => {
    // Skip entirely on touch devices - magnetic effects don't work with touch
    if (isTouchDevice()) return;

    const updateRect = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        rectRef.current = {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
      }
    };

    updateRect();
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [ref]);

  // Calculate offset using cached rect
  useEffect(() => {
    // Skip on touch devices
    if (isTouchDevice() || !rectRef.current) return;

    const { centerX, centerY } = rectRef.current;
    const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY);

    if (distance < radius) {
      const pull = 1 - distance / radius;
      setOffset({
        x: (mouse.x - centerX) * strength * pull,
        y: (mouse.y - centerY) * strength * pull,
      });
    } else if (offset.x !== 0 || offset.y !== 0) {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouse.x, mouse.y, strength, radius, offset.x, offset.y]);

  return offset;
}
