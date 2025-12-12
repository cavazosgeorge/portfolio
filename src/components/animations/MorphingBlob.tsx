import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface MorphingBlobProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
}

export const MorphingBlob = memo(function MorphingBlob({
  color,
  size,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 20,
}: MorphingBlobProps) {
  const isMobile = useIsMobile();

  // On mobile: use radial-gradient instead of expensive blur filter
  // and disable morphing animation
  if (isMobile) {
    return (
      <Box
        position="absolute"
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        width={`${size}px`}
        height={`${size}px`}
        background={`radial-gradient(circle at center, ${color}, transparent 70%)`}
        borderRadius="50%"
        opacity={0.5}
        pointerEvents="none"
      />
    );
  }

  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={`${size}px`}
      height={`${size}px`}
      background={`radial-gradient(circle at center, ${color} 0%, transparent 70%)`}
      borderRadius="60% 40% 30% 70% / 60% 30% 70% 40%"
      opacity={0.6}
      animation={`morph ${duration}s ease-in-out infinite`}
      animationDelay={`${delay}s`}
      pointerEvents="none"
      willChange="transform"
      css={{
        "@keyframes morph": {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "rotate(0deg) scale(1)",
          },
          "25%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
            transform: "rotate(90deg) scale(1.1)",
          },
          "50%": {
            borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%",
            transform: "rotate(180deg) scale(1)",
          },
          "75%": {
            borderRadius: "60% 30% 60% 40% / 70% 40% 50% 60%",
            transform: "rotate(270deg) scale(0.95)",
          },
        },
      }}
    />
  );
});
