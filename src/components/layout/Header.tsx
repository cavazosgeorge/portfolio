import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticElement } from "../animations/MagneticElement";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.9)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);

  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
      }}
    >
      <Container maxW="container.xl">
        <Flex
          h="80px"
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <MagneticElement strength={0.2} radius={100}>
            <Link
              href="#"
              fontFamily="var(--font-display)"
              fontWeight="700"
              fontSize="xl"
              color="var(--text-primary)"
              _hover={{ textDecoration: "none", color: "var(--glow-cyan)" }}
              transition="color 0.3s ease"
            >
              GC
            </Link>
          </MagneticElement>

          {/* Navigation */}
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

          {/* Mobile menu button */}
          <Box display={{ base: "block", md: "none" }}>
            <MagneticElement strength={0.3} radius={50}>
              <Box
                as="button"
                p={2}
                color="var(--text-primary)"
                bg="transparent"
                border="none"
                cursor="pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Box>
            </MagneticElement>
          </Box>
        </Flex>
      </Container>
    </motion.header>
  );
}
