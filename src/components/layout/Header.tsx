import { Container, Flex, Link } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import { MagneticElement } from "../animations/MagneticElement";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useColorMode } from "../../hooks/useColorMode";
import { ColorModeToggle } from "./ColorModeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Header background colors for scroll animation
const headerBgColors = {
  dark: {
    mobile: ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.98)"],
    desktop: ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.9)"],
  },
  light: {
    // Soft cream: #faf9f7 = rgb(250, 249, 247)
    mobile: ["rgba(250, 249, 247, 0)", "rgba(250, 249, 247, 0.98)"],
    desktop: ["rgba(250, 249, 247, 0)", "rgba(250, 249, 247, 0.92)"],
  },
};

export function Header() {
  const isMobile = useIsMobile();
  const { colorMode } = useColorMode();
  const { scrollY } = useScroll();

  // Memoize the color array to prevent unnecessary recalculations
  const bgColors = useMemo(() => {
    const theme = headerBgColors[colorMode];
    return isMobile ? theme.mobile : theme.desktop;
  }, [colorMode, isMobile]);

  // On mobile: use solid background (no expensive backdrop-filter)
  // On desktop: keep the animated blur effect
  const headerBg = useTransform(scrollY, [0, 100], bgColors);

  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: headerBg,
        // Only apply backdrop-filter on desktop - it's extremely expensive on iOS
        backdropFilter: isMobile ? "none" : "blur(10px)",
      }}
    >
      <Container maxW="container.xl">
        <Flex
          h="80px"
          align="center"
          justify="center"
        >
          {/* Navigation - hidden on mobile since content is scrollable */}
          <Flex as="nav" gap={8} align="center" display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <MagneticElement key={link.name} strength={0.3} radius={60}>
                <Link
                  href={link.href}
                  fontFamily="var(--font-mono)"
                  fontSize="sm"
                  color="var(--text-secondary)"
                  _hover={{ textDecoration: "none", color: "var(--glow-cyan)" }}
                  transition="color 0.3s ease"
                >
                  {link.name}
                </Link>
              </MagneticElement>
            ))}
            <ColorModeToggle />
          </Flex>
        </Flex>
      </Container>

      {/* Mobile toggle - floating button at bottom right */}
      <Flex
        position="fixed"
        bottom="1.5rem"
        right="1.5rem"
        zIndex={101}
        display={{ base: "flex", md: "none" }}
        bg="var(--bg-secondary)"
        borderRadius="full"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
        p={2}
        border="1px solid"
        borderColor="var(--overlay-medium)"
      >
        <ColorModeToggle />
      </Flex>
    </motion.header>
  );
}
