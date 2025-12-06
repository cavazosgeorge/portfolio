import { useEffect, useState, RefObject } from "react";
import { useMousePosition } from "./useMousePosition";

interface MagneticOffset {
  x: number;
  y: number;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  strength: number = 0.3,
  radius: number = 150
): MagneticOffset {
  const mouse = useMousePosition();
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY);

    if (distance < radius) {
      const pull = 1 - distance / radius;
      setOffset({
        x: (mouse.x - centerX) * strength * pull,
        y: (mouse.y - centerY) * strength * pull,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouse.x, mouse.y, strength, radius]);

  return offset;
}
