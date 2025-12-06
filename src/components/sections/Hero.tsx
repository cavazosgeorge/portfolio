import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SplitText } from "../animations/SplitText";

export function Hero() {
  return (
    <Box
      as="section"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.xl" position="relative">
        <VStack gap={6} align="center" textAlign="center">
          <Box>
            <Text
              fontSize="sm"
              fontFamily="var(--font-mono)"
              color="var(--glow-cyan)"
              letterSpacing="0.2em"
              textTransform="uppercase"
              mb={4}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Software Developer
              </motion.span>
            </Text>

            <Box
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontFamily="var(--font-display)"
              fontWeight="700"
              lineHeight="1.1"
            >
              <SplitText magnetic delay={0.8}>
                George Cavazos
              </SplitText>
            </Box>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="var(--text-secondary)"
              maxW="600px"
              fontFamily="var(--font-body)"
            >
              Building digital experiences that blend creativity with clean code.
              Crafting interfaces that feel alive.
            </Text>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            style={{ marginTop: "4rem" }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Box
                width="30px"
                height="50px"
                border="2px solid"
                borderColor="var(--text-secondary)"
                borderRadius="full"
                position="relative"
                opacity={0.5}
                _hover={{ opacity: 1, borderColor: "var(--glow-cyan)" }}
                transition="all 0.3s ease"
              >
                <motion.div
                  animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--glow-cyan)",
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}
