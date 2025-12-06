import { Box } from "@chakra-ui/react";

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

export function MorphingBlob({
  color,
  size,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 20,
}: MorphingBlobProps) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={`${size}px`}
      height={`${size}px`}
      background={color}
      borderRadius="60% 40% 30% 70% / 60% 30% 70% 40%"
      filter="blur(60px)"
      opacity={0.6}
      animation={`morph ${duration}s ease-in-out infinite`}
      animationDelay={`${delay}s`}
      pointerEvents="none"
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
}
