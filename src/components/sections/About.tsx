import { Box, Container, Flex, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { skills } from "../../data/projects";

const SkillTag = ({ name, index }: { name: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
  >
    <Box
      px={4}
      py={2}
      bg="var(--void-lighter)"
      border="1px solid"
      borderColor="var(--glow-cyan-dim)"
      borderRadius="full"
      fontSize="sm"
      fontFamily="var(--font-mono)"
      color="var(--text-primary)"
      transition="all 0.3s ease"
      _hover={{
        borderColor: "var(--glow-cyan)",
        boxShadow: "0 0 20px var(--glow-cyan-dim)",
        transform: "translateY(-2px)",
      }}
    >
      {name}
    </Box>
  </motion.div>
);

export function About() {
  return (
    <Box
      as="section"
      id="about"
      py="var(--section-padding)"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle gradient background */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="800px"
        height="800px"
        background="radial-gradient(circle, var(--glow-cyan-dim) 0%, transparent 70%)"
        opacity={0.3}
        pointerEvents="none"
      />

      <Container maxW="container.lg" position="relative">
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
                About
              </Text>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                lineHeight="1.2"
              >
                Building at the intersection of
                <br />
                <Text as="span" color="var(--glow-cyan)">
                  creativity
                </Text>{" "}
                and{" "}
                <Text as="span" color="var(--warm-coral)">
                  code
                </Text>
              </Text>
            </Box>
          </RevealOnScroll>

          {/* Bio content */}
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={12}
            align="flex-start"
          >
            <Box flex={1}>
              <RevealOnScroll delay={0.1}>
                <VStack gap={6} align="stretch">
                  <Text
                    fontSize="lg"
                    color="var(--text-secondary)"
                    lineHeight="1.8"
                  >
                    I'm a software developer who believes that great code should
                    feel as good as it works. I specialize in building web
                    applications that are both technically robust and genuinely
                    delightful to use.
                  </Text>
                  <Text
                    fontSize="lg"
                    color="var(--text-secondary)"
                    lineHeight="1.8"
                  >
                    When I'm not coding, you'll find me exploring new
                    technologies, contributing to open source, or experimenting
                    with creative coding projects that push the boundaries of
                    what's possible in the browser.
                  </Text>
                </VStack>
              </RevealOnScroll>
            </Box>

            {/* Skills */}
            <Box flex={1}>
              <RevealOnScroll delay={0.2}>
                <Text
                  fontSize="sm"
                  fontFamily="var(--font-mono)"
                  color="var(--text-secondary)"
                  mb={4}
                  letterSpacing="0.1em"
                >
                  TECHNOLOGIES I WORK WITH
                </Text>
                <Wrap gap={3}>
                  {skills.map((skill, index) => (
                    <WrapItem key={skill.name}>
                      <SkillTag name={skill.name} index={index} />
                    </WrapItem>
                  ))}
                </Wrap>
              </RevealOnScroll>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
