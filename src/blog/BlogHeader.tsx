import { Container, Flex, Link, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { MagneticElement } from "../components/animations/MagneticElement";
import { useIsMobile } from "../hooks/useIsMobile";
import { useColorMode } from "../hooks/useColorMode";
import { ColorModeToggle } from "../components/layout/ColorModeToggle";

const headerBgColors = {
  dark: {
    mobile: ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.98)"],
    desktop: ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.9)"],
  },
  light: {
    mobile: ["rgba(250, 249, 247, 0)", "rgba(250, 249, 247, 0.98)"],
    desktop: ["rgba(250, 249, 247, 0)", "rgba(250, 249, 247, 0.92)"],
  },
};

export function BlogHeader() {
  const isMobile = useIsMobile();
  const { colorMode } = useColorMode();
  const { scrollY } = useScroll();

  const bgColors = useMemo(() => {
    const theme = headerBgColors[colorMode];
    return isMobile ? theme.mobile : theme.desktop;
  }, [colorMode, isMobile]);

  const headerBg = useTransform(scrollY, [0, 100], bgColors);

  // Get the portfolio URL based on current hostname
  const portfolioUrl = useMemo(() => {
    const hostname = window.location.hostname;
    if (hostname.startsWith("www.blog.")) {
      return `https://${hostname.replace("www.blog.", "www.")}`;
    }
    if (hostname.startsWith("blog.")) {
      return `https://${hostname.replace("blog.", "")}`;
    }
    return "/";
  }, []);

  return (
    <motion.header
      key={colorMode}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: headerBg,
        backdropFilter: isMobile ? "none" : "blur(10px)",
      }}
    >
      <Container maxW="container.xl">
        <Flex h="80px" align="center" justify="space-between">
          {/* Blog title */}
          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <Text
              fontFamily="var(--font-display)"
              fontSize="lg"
              fontWeight="600"
              color="var(--text-primary)"
              _hover={{ color: "var(--glow-cyan)" }}
              transition="color 0.3s ease"
            >
              Blog
            </Text>
          </RouterLink>

          {/* Navigation */}
          <Flex as="nav" gap={8} align="center" display={{ base: "none", md: "flex" }}>
            <MagneticElement strength={0.3} radius={60}>
              <Link
                href={portfolioUrl}
                fontFamily="var(--font-mono)"
                fontSize="sm"
                color="var(--text-secondary)"
                _hover={{ textDecoration: "none", color: "var(--glow-cyan)" }}
                transition="color 0.3s ease"
              >
                Portfolio
              </Link>
            </MagneticElement>
            <ColorModeToggle />
          </Flex>
        </Flex>
      </Container>

      {/* Mobile toggle */}
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
