import { Box, Container, Flex, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useProjects, type Project } from "../../hooks/useContent";

const PROJECT_CONTEXT: Record<string, { discipline: string; proof: string }> = {
  "satellite-tracker": {
    discipline: "Orbital data visualization",
    proof: "Live TLE data · 6,000+ satellites",
  },
  "trial-rag": {
    discipline: "Clinical AI",
    proof: "Citation-backed answers · Cohort filtering",
  },
  "brain-board": {
    discipline: "Visual knowledge tools",
    proof: "Drag-and-drop collections · Focused workflow",
  },
};

function ProjectLinks({ project }: { project: Project }) {
  if (!project.link && !project.github) return null;

  return (
    <Flex gap={5} flexWrap="wrap">
      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          color="var(--accent-primary)"
          fontFamily="var(--font-mono)"
          fontSize="sm"
          fontWeight="600"
          textDecoration="none"
          _hover={{ textDecoration: "underline" }}
        >
          View live ↗
        </Link>
      )}
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          color="var(--text-secondary)"
          fontFamily="var(--font-mono)"
          fontSize="sm"
          textDecoration="none"
          _hover={{ color: "var(--accent-primary)", textDecoration: "underline" }}
        >
          Source ↗
        </Link>
      )}
    </Flex>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const context = PROJECT_CONTEXT[project.id] || {
    discipline: "Product engineering",
    proof: "Designed and built end to end",
  };

  return (
    <Box as="article" py={{ base: 9, md: 12 }} borderBottom="1px solid var(--border-subtle)">
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "96px minmax(0, 1.25fr) minmax(280px, 0.75fr)" }}
        gap={{ base: 5, md: 8, lg: 12 }}
        alignItems="start"
      >
        <Text fontFamily="var(--font-mono)" fontSize="sm" color="var(--text-tertiary)">
          {String(index + 1).padStart(2, "0")}
        </Text>

        <Box>
          <Text className="section-kicker" mb={3}>
            {context.discipline}
          </Text>
          <Text
            as="h3"
            fontFamily="var(--font-display)"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="600"
            letterSpacing="-0.035em"
            lineHeight="1.05"
          >
            {project.title}
          </Text>
          <Text
            mt={5}
            maxW="720px"
            color="var(--text-secondary)"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.75"
          >
            {project.description}
          </Text>
        </Box>

        <VStack align="stretch" gap={6}>
          <Box borderLeft="2px solid var(--accent-primary)" pl={4}>
            <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-tertiary)" mb={2}>
              PROJECT PROOF
            </Text>
            <Text fontWeight="600" color="var(--text-primary)" lineHeight="1.5">
              {context.proof}
            </Text>
          </Box>

          <Flex gap={2} flexWrap="wrap">
            {project.tags.slice(0, 4).map((tag) => (
              <Text key={tag} className="editorial-tag">
                {tag}
              </Text>
            ))}
          </Flex>

          <ProjectLinks project={project} />
        </VStack>
      </Box>
    </Box>
  );
}

function ArchiveProject({ project }: { project: Project }) {
  return (
    <Box
      as="article"
      py={6}
      borderTop="1px solid var(--border-subtle)"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <Text as="h3" fontFamily="var(--font-display)" fontSize="xl" fontWeight="600">
          {project.title}
        </Text>
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            color="var(--accent-primary)"
            textDecoration="none"
          >
            ↗
          </Link>
        )}
      </Flex>
      <Text color="var(--text-secondary)" lineHeight="1.7" flex={1}>
        {project.description}
      </Text>
      <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-tertiary)">
        {project.tags.slice(0, 3).join(" · ")}
      </Text>
    </Box>
  );
}

export function Projects() {
  const { data, loading, error } = useProjects();
  const publishedProjects = data.filter((project) => !project.draft);
  const featuredProjects = publishedProjects.filter((project) => project.featured).slice(0, 3);
  const featuredProjectIds = new Set(featuredProjects.map((project) => project.id));
  const archiveProjects = publishedProjects.filter((project) => !featuredProjectIds.has(project.id));

  return (
    <Box as="section" id="projects" py="var(--section-padding)">
      <Container maxW="container.lg">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-end" }}
          justify="space-between"
          gap={6}
          mb={{ base: 8, md: 10 }}
        >
          <Box maxW="720px">
            <Text className="section-kicker">Selected work</Text>
            <Text as="h2" className="section-title">
              Systems that make complex work feel clear.
            </Text>
          </Box>
          <Text color="var(--text-secondary)" maxW="340px" lineHeight="1.7">
            A focused selection spanning real-time visualization, clinical AI, and visual knowledge tools.
          </Text>
        </Flex>

        <Box borderTop="1px solid var(--border-subtle)" aria-busy={loading}>
          {loading && featuredProjects.length === 0
            ? [0, 1, 2].map((index) => (
                <Box key={index} py={12} borderBottom="1px solid var(--border-subtle)">
                  <Box className="editorial-skeleton" h="28px" maxW="720px" />
                </Box>
              ))
            : featuredProjects.map((project, index) => (
                <FeaturedProject key={project.id} project={project} index={index} />
              ))}
        </Box>

        {error && !loading && publishedProjects.length === 0 && (
          <Text py={8} color="var(--text-secondary)" role="status">
            Selected work is temporarily unavailable. Please try again shortly.
          </Text>
        )}

        {archiveProjects.length > 0 && (
          <Box mt={{ base: 14, md: 20 }}>
            <Flex justify="space-between" align="baseline" gap={4} mb={4}>
              <Text as="h3" fontFamily="var(--font-display)" fontSize="2xl" fontWeight="600">
                Project archive
              </Text>
              <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-tertiary)">
                {archiveProjects.length} MORE
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 0, md: 10 }}>
              {archiveProjects.map((project) => (
                <ArchiveProject key={project.id} project={project} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
