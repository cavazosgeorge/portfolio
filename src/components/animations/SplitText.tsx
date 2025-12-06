import { motion } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

interface SplitTextProps {
  children: string;
  className?: string;
  magnetic?: boolean;
  delay?: number;
}

function MagneticLetter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const offset = useMagneticEffect(ref, 0.4, 100);

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
      }}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.span>
  );
}

export function SplitText({
  children,
  className,
  magnetic = false,
  delay = 0,
}: SplitTextProps) {
  const letters = children.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {magnetic ? (
            <MagneticLetter>{char === " " ? "\u00A0" : char}</MagneticLetter>
          ) : (
            char === " " ? "\u00A0" : char
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}
