import { Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { memo } from "react";
import { MorphingBlob } from "./MorphingBlob";
import { useIsMobile } from "../../hooks/useIsMobile";

export const ParallaxBlobs = memo(function ParallaxBlobs() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();

  // Different parallax speeds for each blob layer using scrollY (pixels)
  // Only calculate transforms on desktop
  const y1 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : 500]);
  const y3 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : -600]);
  const y4 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : 300]);

  // Horizontal drift (disabled on mobile)
  const x1 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : 150]);
  const x2 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : -200]);
  const x3 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : 100]);
  const x4 = useTransform(scrollY, [0, 3000], [0, isMobile ? 0 : -150]);

  // On mobile: render fewer, simpler, static blobs
  if (isMobile) {
    return (
      <Box
        position="fixed"
        inset={0}
        overflow="hidden"
        zIndex={0}
        pointerEvents="none"
      >
        {/* Just 2 static gradient blobs on mobile for ambient background */}
        <Box
          position="absolute"
          top="10%"
          left="-10%"
          width="350px"
          height="350px"
          background="radial-gradient(circle at center, var(--glow-cyan), transparent 70%)"
          borderRadius="50%"
          opacity={0.4}
        />
        <Box
          position="absolute"
          top="60%"
          right="-5%"
          width="300px"
          height="300px"
          background="radial-gradient(circle at center, var(--warm-coral), transparent 70%)"
          borderRadius="50%"
          opacity={0.35}
        />
      </Box>
    );
  }

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
});
