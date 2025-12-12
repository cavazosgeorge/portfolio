import { Box } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, memo, useCallback } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

// Check if device is touch-only
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const TiltCard = memo(function TiltCard({
  children,
  className,
  glowColor = "var(--glow-cyan)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTouch = isTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Cache rect dimensions to avoid layout thrashing
  const rectCache = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Skip tilt on touch devices
    if (isTouch || !ref.current) return;

    // Cache rect if not available or update on first move
    if (!rectCache.current) {
      const rect = ref.current.getBoundingClientRect();
      rectCache.current = { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
    }

    const { width, height, left, top } = rectCache.current;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [isTouch, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    // Clear cache on leave so it refreshes on next enter
    rectCache.current = null;
  }, [x, y]);

  const MotionBox = motion(Box);

  // On mobile: render simple card without tilt effects and expensive shadows
  if (isMobile) {
    return (
      <Box
        ref={ref}
        className={className}
        position="relative"
        cursor="pointer"
        css={{
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: "1px",
            background: `linear-gradient(135deg, ${glowColor}40, transparent 50%, ${glowColor}20)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            opacity: 0.5,
          },
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      position="relative"
      cursor="pointer"
      css={{
        "&:hover": {
          boxShadow: `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20`,
        },
        "&:hover::before": {
          opacity: 1,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px",
          background: `linear-gradient(135deg, ${glowColor}60, transparent 50%, ${glowColor}30)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
      }}
    >
      {children}
    </MotionBox>
  );
});
