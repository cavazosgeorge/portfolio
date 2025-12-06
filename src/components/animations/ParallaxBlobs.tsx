import { Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MorphingBlob } from "./MorphingBlob";

export function ParallaxBlobs() {
  const { scrollY } = useScroll();

  // Different parallax speeds for each blob layer using scrollY (pixels)
  // Multiplier determines speed: smaller = slower parallax, larger = faster
  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, 500]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y4 = useTransform(scrollY, [0, 3000], [0, 300]);

  // Horizontal drift
  const x1 = useTransform(scrollY, [0, 3000], [0, 150]);
  const x2 = useTransform(scrollY, [0, 3000], [0, -200]);
  const x3 = useTransform(scrollY, [0, 3000], [0, 100]);
  const x4 = useTransform(scrollY, [0, 3000], [0, -150]);

  return (
    <Box
      position="fixed"
      inset={0}
      overflow="hidden"
      zIndex={0}
      pointerEvents="none"
    >
      {/* Cyan blob - top left, drifts up and right */}
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          left: "-5%",
          y: y1,
          x: x1,
        }}
      >
        <MorphingBlob
          color="var(--glow-cyan)"
          size={600}
          duration={25}
        />
      </motion.div>

      {/* Coral blob - mid right, drifts down and left */}
      <motion.div
        style={{
          position: "absolute",
          top: "25%",
          right: "-10%",
          y: y2,
          x: x2,
        }}
      >
        <MorphingBlob
          color="var(--warm-coral)"
          size={500}
          delay={5}
          duration={30}
        />
      </motion.div>

      {/* Lavender blob - center left, drifts up fastest */}
      <motion.div
        style={{
          position: "absolute",
          top: "55%",
          left: "15%",
          y: y3,
          x: x3,
        }}
      >
        <MorphingBlob
          color="var(--soft-lavender)"
          size={450}
          delay={10}
          duration={22}
        />
      </motion.div>

      {/* Second cyan blob - bottom right, gentle drift down */}
      <motion.div
        style={{
          position: "absolute",
          top: "75%",
          right: "10%",
          y: y4,
          x: x4,
        }}
      >
        <MorphingBlob
          color="var(--glow-cyan)"
          size={400}
          delay={15}
          duration={28}
        />
      </motion.div>
    </Box>
  );
}
