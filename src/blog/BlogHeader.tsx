import { Box, Container, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useColorMode } from "../hooks/useColorMode";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.3 15.1A8.5 8.5 0 0 1 8.9 3.7 8.5 8.5 0 1 0 20.3 15.1Z" />
    </svg>
  );
}

function getPortfolioUrl() {
  const { hostname, port, protocol } = window.location;

  if (hostname.endsWith(".localhost")) {
    return `${protocol}//localhost${port ? `:${port}` : ""}`;
  }

  if (hostname.startsWith("www.blog.")) {
    return `https://${hostname.replace("www.blog.", "www.")}`;
  }

  if (hostname.startsWith("blog.")) {
    return `https://${hostname.replace("blog.", "")}`;
  }

  return "/";
}

export function BlogHeader() {
  const { isDark, toggleColorMode } = useColorMode();
  const portfolioUrl = getPortfolioUrl();

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
      <Container maxW="70rem">
        <Flex minH="4rem" align="center" justify="space-between" gap={4}>
          <RouterLink
            to="/"
            aria-label="George Cavazos writing home"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Flex align="baseline" gap={{ base: 2, sm: 3 }}>
              <Text
                fontFamily="var(--font-display)"
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="600"
                letterSpacing="-0.01em"
              >
                George Cavazos
              </Text>
              <Text
                fontFamily="var(--font-mono)"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                / Writing
              </Text>
            </Flex>
          </RouterLink>

          <Flex as="nav" aria-label="Blog navigation" gap={{ base: 2, sm: 5 }} align="center">
            <Link
              href={portfolioUrl}
              px={2}
              py={2}
              fontSize="sm"
              fontWeight="500"
              color="var(--text-secondary)"
              textDecoration="none"
              whiteSpace="nowrap"
              _hover={{ color: "var(--accent-primary)", textDecoration: "none" }}
              _focusVisible={{
                color: "var(--accent-primary)",
                outline: "2px solid var(--accent-primary)",
                outlineOffset: "2px",
              }}
              css={{ transition: "color 160ms ease" }}
            >
              <Box as="span" display={{ base: "none", sm: "inline" }}>
                Back to portfolio
              </Box>
              <Box as="span" display={{ base: "inline", sm: "none" }}>
                Portfolio
              </Box>
            </Link>

            <IconButton
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              minW="2.25rem"
              h="2.25rem"
              color="var(--text-secondary)"
              border="1px solid"
              borderColor="var(--border-subtle)"
              borderRadius="full"
              _hover={{ color: "var(--accent-primary)", bg: "var(--accent-soft)" }}
              _focus={{ boxShadow: "none" }}
              _focusVisible={{
                color: "var(--accent-primary)",
                outline: "2px solid var(--accent-primary)",
                outlineOffset: "2px",
                boxShadow: "none",
              }}
              css={{ transition: "color 160ms ease, background-color 160ms ease" }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
