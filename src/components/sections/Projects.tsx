import { Box, Container, Text, VStack, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TiltCard } from "../animations/TiltCard";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { projects } from "../../data/projects";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
  featured?: boolean;
  link?: string;
}

function ProjectCard({ title, description, tags, index, featured, link }: ProjectCardProps) {
  const cardContent = (
    <Box
      p={6}
      bg="var(--void-lighter)"
      borderRadius="xl"
      border="1px solid"
      borderColor="rgba(255,255,255,0.05)"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Featured badge */}
      {featured && (
        <Text
          fontSize="xs"
          fontFamily="var(--font-mono)"
          color="var(--glow-cyan)"
          letterSpacing="0.1em"
          mb={3}
        >
          ★ FEATURED
        </Text>
      )}

      {/* Title */}
      <Text
        fontSize="xl"
        fontFamily="var(--font-display)"
        fontWeight="600"
        mb={3}
        color="var(--text-primary)"
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        fontSize="sm"
        color="var(--text-secondary)"
        lineHeight="1.7"
        mb={4}
        flex={1}
      >
        {description}
      </Text>

      {/* Tags and Link */}
      <Flex flexWrap="wrap" gap={2} align="center">
        {tags.map((tag) => (
          <Box
            key={tag}
            px={2}
            py={1}
            bg="rgba(255,255,255,0.05)"
            borderRadius="md"
            fontSize="xs"
            fontFamily="var(--font-mono)"
            color="var(--text-secondary)"
          >
            {tag}
          </Box>
        ))}
        {link && (
          <Box
            ml="auto"
            fontSize="xs"
            fontFamily="var(--font-mono)"
            color="var(--glow-cyan)"
            display="flex"
            alignItems="center"
            gap={1}
          >
            View Project →
          </Box>
        )}
      </Flex>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <TiltCard glowColor={featured ? "var(--glow-cyan)" : "var(--soft-lavender)"}>
            {cardContent}
          </TiltCard>
        </a>
      ) : (
        <TiltCard glowColor={featured ? "var(--glow-cyan)" : "var(--soft-lavender)"}>
          {cardContent}
        </TiltCard>
      )}
    </motion.div>
  );
}

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <Box
      as="section"
      id="projects"
      py="var(--section-padding)"
      position="relative"
    >
      <Container maxW="container.lg">
        <VStack gap={12} align="stretch">
          {/* Section header */}
          <RevealOnScroll>
            <Box textAlign="center">
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--glow-cyan)"
                letterSpacing="0.2em"
                textTransform="uppercase"
                mb={2}
              >
                Projects
              </Text>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                lineHeight="1.2"
              >
                Things I've{" "}
                <Text as="span" color="var(--warm-coral)">
                  built
                </Text>
              </Text>
            </Box>
          </RevealOnScroll>

          {/* Featured projects */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                index={index}
                link={project.link}
                featured
              />
            ))}
          </SimpleGrid>

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <Box>
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--text-secondary)"
                mb={4}
                letterSpacing="0.1em"
                textAlign="center"
              >
                OTHER PROJECTS
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    index={index + featuredProjects.length}
                    link={project.link}
                  />
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
