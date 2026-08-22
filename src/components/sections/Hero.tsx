import { Box, Container, Flex, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const proofPoints = [
  { label: "Current role", value: "Senior Engineer at Pfizer" },
  { label: "Core focus", value: "Industrial automation + IT/OT" },
  { label: "Built end to end", value: "AI, data + full-stack products" },
] as const;

export function Hero() {
  return (
    <Box
      as="section"
      id="top"
      position="relative"
      minH={{ base: "auto", lg: "calc(82vh - 68px)" }}
      display="flex"
      alignItems="center"
      py={{ base: 20, md: 24, lg: 28 }}
    >
      <Container maxW="container.xl">
        <VStack align="stretch" gap={{ base: 12, md: 16 }}>
          <Box maxW="980px">
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              fontFamily="var(--font-mono)"
              fontWeight="500"
              color="var(--accent-primary)"
              letterSpacing="0.12em"
              textTransform="uppercase"
              mb={{ base: 5, md: 7 }}
            >
              Senior Automation IT/OT Engineer
            </Text>

            <Text
              as="h1"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
              letterSpacing="-0.055em"
              lineHeight={{ base: "1.02", md: "0.98" }}
              textWrap="balance"
            >
              Building reliable systems where industrial automation, data, and AI meet.
            </Text>

            <Text
              mt={{ base: 6, md: 8 }}
              maxW="720px"
              fontSize={{ base: "lg", md: "xl" }}
              color="var(--text-secondary)"
              lineHeight="1.7"
            >
              I turn complex operational problems into dependable platforms, useful data, and thoughtful software people can trust.
            </Text>

            <Flex mt={{ base: 8, md: 10 }} gap={3} align="center" flexWrap="wrap">
              <Link
                href="#projects"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                minH="48px"
                px={6}
                bg="var(--accent-primary)"
                color="var(--accent-contrast)"
                border="1px solid"
                borderColor="var(--accent-primary)"
                borderRadius="md"
                fontSize="sm"
                fontWeight="600"
                textDecoration="none"
                transition="transform 160ms ease, opacity 160ms ease"
                _hover={{ textDecoration: "none", transform: "translateY(-1px)", opacity: 0.9 }}
              >
                View selected work
              </Link>
              <Link
                href="#writing"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                minH="48px"
                px={6}
                color="var(--text-primary)"
                border="1px solid"
                borderColor="var(--border-subtle)"
                borderRadius="md"
                fontSize="sm"
                fontWeight="600"
                textDecoration="none"
                transition="border-color 160ms ease, color 160ms ease"
                _hover={{ textDecoration: "none", borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}
              >
                Read selected writing
              </Link>
            </Flex>
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="var(--border-subtle)"
          >
            {proofPoints.map((point, index) => (
              <Box
                key={point.label}
                py={{ base: 5, md: 6 }}
                px={{ base: 0, md: index === 0 ? 0 : 7 }}
                borderTop={{ base: index === 0 ? "none" : "1px solid", md: "none" }}
                borderLeft={{ base: "none", md: index === 0 ? "none" : "1px solid" }}
                borderColor="var(--border-subtle)"
              >
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize="10px"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={1.5}
                >
                  {point.label}
                </Text>
                <Text fontSize={{ base: "md", md: "sm", lg: "md" }} color="var(--text-primary)" fontWeight="500">
                  {point.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
