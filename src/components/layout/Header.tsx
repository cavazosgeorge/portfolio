import { Box, Container, Flex, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ColorModeToggle } from "./ColorModeToggle";

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Writing", href: "#writing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <Box as="span" position="relative" display="block" boxSize="20px" aria-hidden="true">
      <Box
        as="span"
        position="absolute"
        top={open ? "9px" : "5px"}
        left="2px"
        width="16px"
        height="1.5px"
        bg="currentColor"
        transform={open ? "rotate(45deg)" : "none"}
        transition="top 160ms ease, transform 160ms ease"
      />
      <Box
        as="span"
        position="absolute"
        top="9px"
        left="2px"
        width="16px"
        height="1.5px"
        bg="currentColor"
        opacity={open ? 0 : 1}
        transition="opacity 120ms ease"
      />
      <Box
        as="span"
        position="absolute"
        top={open ? "9px" : "13px"}
        left="2px"
        width="16px"
        height="1.5px"
        bg="currentColor"
        transform={open ? "rotate(-45deg)" : "none"}
        transition="top 160ms ease, transform 160ms ease"
      />
    </Box>
  );
}

const navLinkStyles = {
  fontFamily: "var(--font-body)",
  fontSize: "sm",
  fontWeight: "500",
  color: "var(--text-secondary)",
  textDecoration: "none",
  transition: "color 160ms ease",
  _hover: { color: "var(--accent-primary)", textDecoration: "none" },
  _focusVisible: { color: "var(--accent-primary)" },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="var(--surface-primary)"
      borderBottom="1px solid"
      borderColor="var(--border-subtle)"
    >
      <Container maxW="container.xl">
        <Flex h={{ base: "64px", md: "68px" }} align="center" justify="space-between">
          <Link
            href="#top"
            onClick={closeMenu}
            display="inline-flex"
            alignItems="center"
            gap={2}
            color="var(--text-primary)"
            fontFamily="var(--font-display)"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            letterSpacing="-0.02em"
            textDecoration="none"
            _hover={{ color: "var(--accent-primary)", textDecoration: "none" }}
          >
            George Cavazos
            <Box as="span" boxSize="5px" borderRadius="full" bg="var(--accent-primary)" aria-hidden="true" />
          </Link>

          <Flex as="nav" aria-label="Primary navigation" gap={7} align="center" display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.external ? `${link.name} (opens in a new tab)` : undefined}
                {...navLinkStyles}
              >
                {link.name}
              </Link>
            ))}
            <Box w="1px" h="20px" bg="var(--border-subtle)" aria-hidden="true" />
            <ColorModeToggle />
          </Flex>

          <Flex align="center" gap={1} display={{ base: "flex", md: "none" }}>
            <ColorModeToggle />
            <IconButton
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              variant="ghost"
              size="sm"
              color="var(--text-primary)"
              _hover={{ bg: "var(--accent-soft)", color: "var(--accent-primary)" }}
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "none" }}
            >
              <MenuIcon open={isMenuOpen} />
            </IconButton>
          </Flex>
        </Flex>
      </Container>

      <Box
        id="mobile-navigation"
        display={{ base: isMenuOpen ? "block" : "none", md: "none" }}
        position="absolute"
        top="100%"
        left={0}
        right={0}
        bg="var(--surface-primary)"
        borderBottom="1px solid"
        borderColor="var(--border-subtle)"
        boxShadow="0 18px 40px rgba(0, 0, 0, 0.12)"
      >
        <Container maxW="container.xl">
          <VStack as="nav" aria-label="Mobile navigation" align="stretch" gap={0} py={3}>
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.external ? `${link.name} (opens in a new tab)` : undefined}
                onClick={closeMenu}
                display="block"
                width="100%"
                py={3.5}
                borderTop={index === 0 ? "none" : "1px solid"}
                borderColor="var(--border-subtle)"
                {...navLinkStyles}
              >
                <Flex align="center" justify="space-between">
                  <Text as="span">{link.name}</Text>
                  <Text as="span" color="var(--accent-primary)" fontFamily="var(--font-mono)" fontSize="xs" aria-hidden="true">
                    {link.external ? "↗" : "→"}
                  </Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
