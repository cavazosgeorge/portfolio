import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useRef, ReactNode } from "react";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
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
  as = "span",
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

  const letter = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const MotionBox = motion(Box);

  return (
    <MotionBox
      as={as}
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block", perspective: "1000px" }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letter}
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
    </MotionBox>
  );
}
