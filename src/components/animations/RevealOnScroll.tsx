import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const getVariants = (direction: RevealDirection): Variants => {
  const distance = 60;

  const initial: { [key: string]: number } = { opacity: 0 };

  switch (direction) {
    case "up":
      initial.y = distance;
      break;
    case "down":
      initial.y = -distance;
      break;
    case "left":
      initial.x = distance;
      break;
    case "right":
      initial.x = -distance;
      break;
  }

  return {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
