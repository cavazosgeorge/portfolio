import { motion } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function MagneticElement({
  children,
  strength = 0.3,
  radius = 150,
  className,
  style,
  onClick,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const offset = useMagneticEffect(ref, strength, radius);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
