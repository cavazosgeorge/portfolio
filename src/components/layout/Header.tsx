import { Container, Flex, Link } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticElement } from "../animations/MagneticElement";
import { useIsMobile } from "../../hooks/useIsMobile";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();

  // On mobile: use solid background (no expensive backdrop-filter)
  // On desktop: keep the animated blur effect
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    isMobile
      ? ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.98)"]
      : ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.9)"]
  );

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
          <Flex as="nav" gap={8} display={{ base: "none", md: "flex" }}>
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
          </Flex>
        </Flex>
      </Container>
    </motion.header>
  );
}
