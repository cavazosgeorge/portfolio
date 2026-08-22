import { Box, Container, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useSetting, useSkills } from "../../hooks/useContent";

const DEFAULT_ABOUT = {
  heading: "Engineering with range,",
  subheading: "grounded in reliability.",
  paragraphs: [
    "I’m a senior software engineer who loves diving into tough problems—the ones that force you to rethink everything and come out better on the other side. I build large-scale web apps end-to-end, from backend architecture and automation systems to data-heavy AI tools, always trying to make things solid and actually useful.",
    "When I’m not coding, I’m usually chasing the same kind of progress elsewhere: training toward Men’s Physique, climbing routes that push my limits, or picking up whatever new skill catches my interest.",
  ],
};

const capabilities = [
  {
    category: "devops",
    number: "01",
    title: "Industrial systems & delivery",
    description: "Operational infrastructure, automation platforms, and dependable paths to production.",
    fallback: "Automation · Linux/RHEL · CI/CD · Containers",
  },
  {
    category: "ai",
    number: "02",
    title: "AI & data systems",
    description: "Useful intelligence grounded in clear data flows, observable behavior, and real constraints.",
    fallback: "RAG · LLM systems · Data visualization · SQL",
  },
  {
    category: "backend",
    number: "03",
    title: "Application architecture",
    description: "APIs, services, and data models designed to remain understandable as products grow.",
    fallback: "APIs · Node.js · Python · PostgreSQL",
  },
  {
    category: "frontend",
    number: "04",
    title: "Product engineering",
    description: "Focused interfaces that make complex systems legible, efficient, and pleasant to use.",
    fallback: "React · TypeScript · Design systems · Visualization",
  },
] as const;

export function About() {
  const { data: skills } = useSkills();
  const { data: about } = useSetting("about");
  const content = about || DEFAULT_ABOUT;
  const paragraphs = content.paragraphs.filter((paragraph) => paragraph.trim().length > 0);
  const professionalParagraph = paragraphs[0] || DEFAULT_ABOUT.paragraphs[0];
  const personalParagraph =
    paragraphs.find((paragraph, index) => index > 0 && /climb|gym|physique|outside|not coding/i.test(paragraph)) ||
    paragraphs[1] ||
    DEFAULT_ABOUT.paragraphs[1];

  return (
    <Box
      as="section"
      id="about"
      py="var(--section-padding)"
      position="relative"
      borderTop="1px solid"
      borderColor="var(--border-subtle)"
    >
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 20 }} align="flex-start">
          <Box flex="0 0 38%" position={{ base: "static", lg: "sticky" }} top={{ lg: "108px" }}>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              color="var(--accent-primary)"
              letterSpacing="0.12em"
              textTransform="uppercase"
              mb={5}
            >
              About / Approach
            </Text>
            <Text
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
              letterSpacing="-0.045em"
              lineHeight="1.08"
              textWrap="balance"
            >
              {content.heading}{" "}
              <Text as="span" color="var(--accent-primary)">
                {content.subheading}
              </Text>
            </Text>
          </Box>

          <VStack flex="1" align="stretch" gap={{ base: 10, md: 12 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 7, md: 10 }}>
              <Box>
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize="10px"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Professional
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} color="var(--text-secondary)" lineHeight="1.75">
                  {professionalParagraph}
                </Text>
              </Box>
              <Box>
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize="10px"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Beyond work
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} color="var(--text-secondary)" lineHeight="1.75">
                  {personalParagraph}
                </Text>
              </Box>
            </SimpleGrid>

            <Box>
              <Text
                fontFamily="var(--font-mono)"
                fontSize="10px"
                fontWeight="500"
                color="var(--text-secondary)"
                letterSpacing="0.1em"
                textTransform="uppercase"
                mb={4}
              >
                Capabilities
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gapX={10}>
                {capabilities.map((capability) => {
                  const matchingSkills = skills
                    .filter((skill) => skill.category === capability.category)
                    .slice(0, 5)
                    .map((skill) => skill.name)
                    .join(" · ");

                  return (
                    <Box
                      key={capability.category}
                      py={6}
                      borderTop="1px solid"
                      borderColor="var(--border-subtle)"
                    >
                      <Flex align="baseline" gap={3} mb={2}>
                        <Text fontFamily="var(--font-mono)" fontSize="10px" color="var(--accent-primary)">
                          {capability.number}
                        </Text>
                        <Text fontFamily="var(--font-display)" fontSize="lg" fontWeight="600" color="var(--text-primary)">
                          {capability.title}
                        </Text>
                      </Flex>
                      <Text fontSize="sm" color="var(--text-secondary)" lineHeight="1.65" mb={3}>
                        {capability.description}
                      </Text>
                      <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-primary)" lineHeight="1.7">
                        {matchingSkills || capability.fallback}
                      </Text>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
