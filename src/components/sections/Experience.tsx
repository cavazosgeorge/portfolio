import { Box, Container, Text, VStack, Flex } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { experience } from "../../data/projects";

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  index: number;
  isLast: boolean;
}

function TimelineItem({
  role,
  company,
  period,
  description,
  technologies,
  index,
  isLast,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Flex
        direction={{ base: "column", md: isEven ? "row" : "row-reverse" }}
        align={{ base: "flex-start", md: "center" }}
        gap={6}
        mb={isLast ? 0 : 12}
      >
        {/* Content */}
        <Box
          flex={1}
          textAlign={{ base: "left", md: isEven ? "right" : "left" }}
        >
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--glow-cyan)"
            mb={1}
          >
            {period}
          </Text>
          <Text
            fontSize="xl"
            fontFamily="var(--font-display)"
            fontWeight="600"
            color="var(--text-primary)"
            mb={1}
          >
            {role}
          </Text>
          <Text
            fontSize="md"
            color="var(--warm-coral)"
            fontFamily="var(--font-display)"
            mb={3}
          >
            {company}
          </Text>
          <Text
            fontSize="sm"
            color="var(--text-secondary)"
            lineHeight="1.7"
            mb={3}
          >
            {description}
          </Text>
          {technologies && (
            <Flex
              gap={2}
              flexWrap="wrap"
              justify={{ base: "flex-start", md: isEven ? "flex-end" : "flex-start" }}
            >
              {technologies.map((tech) => (
                <Box
                  key={tech}
                  px={2}
                  py={1}
                  bg="rgba(255,255,255,0.05)"
                  borderRadius="md"
                  fontSize="xs"
                  fontFamily="var(--font-mono)"
                  color="var(--text-secondary)"
                >
                  {tech}
                </Box>
              ))}
            </Flex>
          )}
        </Box>

        {/* Timeline dot */}
        <Box
          position="relative"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Box
              w={4}
              h={4}
              borderRadius="full"
              bg="var(--glow-cyan)"
              boxShadow="0 0 20px var(--glow-cyan)"
            />
          </motion.div>
          {!isLast && (
            <Box
              position="absolute"
              top="100%"
              left="50%"
              transform="translateX(-50%)"
              w="2px"
              h="80px"
              bg="linear-gradient(to bottom, var(--glow-cyan), transparent)"
            />
          )}
        </Box>

        {/* Spacer for alignment */}
        <Box flex={1} display={{ base: "none", md: "block" }} />
      </Flex>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <Box
      as="section"
      id="experience"
      py="var(--section-padding)"
      position="relative"
      ref={containerRef}
    >
      {/* Background line (mobile) */}
      <Box
        display={{ base: "block", md: "none" }}
        position="absolute"
        left="0"
        top="200px"
        bottom="100px"
        w="2px"
        bg="var(--void-lighter)"
        ml={4}
      >
        <motion.div
          style={{
            height: lineHeight,
            background: "var(--glow-cyan)",
            width: "100%",
          }}
        />
      </Box>

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
                Experience
              </Text>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                lineHeight="1.2"
              >
                Where I've{" "}
                <Text as="span" color="var(--soft-lavender)">
                  worked
                </Text>
              </Text>
            </Box>
          </RevealOnScroll>

          {/* Timeline */}
          <Box position="relative" pl={{ base: 8, md: 0 }}>
            {experience.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                technologies={exp.technologies}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
