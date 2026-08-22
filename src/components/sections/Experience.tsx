import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { useExperience } from "../../hooks/useContent";

export function Experience() {
  const { data: experience, loading, error } = useExperience();

  return (
    <Box as="section" id="experience" py="var(--section-padding)" bg="var(--surface-primary)">
      <Container maxW="container.lg">
        <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "minmax(250px, 0.38fr) 1fr" }} gap={{ base: 10, lg: 20 }}>
          <Box>
            <Text className="section-kicker">Experience</Text>
            <Text as="h2" className="section-title">
              Building reliable systems, end to end.
            </Text>
            <Text mt={5} color="var(--text-secondary)" fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">
              Enterprise automation, infrastructure, product engineering, and AI delivery across regulated and fast-moving environments.
            </Text>
          </Box>

          <VStack align="stretch" gap={0} borderTop="1px solid var(--border-subtle)" aria-busy={loading}>
            {loading && experience.length === 0
              ? [0, 1, 2].map((index) => (
                  <Box key={index} py={9} borderBottom="1px solid var(--border-subtle)">
                    <Box className="editorial-skeleton" h="24px" maxW="620px" />
                  </Box>
                ))
              : experience.map((item, index) => (
                  <Box key={item.id} as="article" py={{ base: 8, md: 9 }} borderBottom="1px solid var(--border-subtle)">
                    <Box
                      display="grid"
                      gridTemplateColumns={{ base: "1fr", md: "170px minmax(0, 1fr)" }}
                      gap={{ base: 3, md: 8 }}
                    >
                      <Box>
                        <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-secondary)">
                          {item.period}
                        </Text>
                        {index === 0 && (
                          <Text
                            mt={3}
                            display="inline-flex"
                            px={2.5}
                            py={1}
                            borderRadius="full"
                            bg="var(--accent-soft)"
                            color="var(--accent-primary)"
                            fontFamily="var(--font-mono)"
                            fontSize="xs"
                            fontWeight="600"
                          >
                            CURRENT
                          </Text>
                        )}
                      </Box>

                      <Box>
                        <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap={1} align={{ sm: "baseline" }}>
                          <Text as="h3" fontFamily="var(--font-display)" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
                            {item.role}
                          </Text>
                          <Text color="var(--accent-primary)" fontWeight="600" flexShrink={0}>
                            {item.company}
                          </Text>
                        </Flex>
                        <Text mt={4} color="var(--text-secondary)" lineHeight="1.75">
                          {item.description}
                        </Text>
                        {item.technologies.length > 0 && (
                          <Flex mt={5} gap={2} flexWrap="wrap">
                            {item.technologies.slice(0, 5).map((technology) => (
                              <Text key={technology} className="editorial-tag">
                                {technology}
                              </Text>
                            ))}
                          </Flex>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}

            {error && !loading && experience.length === 0 && (
              <Text py={8} color="var(--text-secondary)" role="status">
                Experience details are temporarily unavailable.
              </Text>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
