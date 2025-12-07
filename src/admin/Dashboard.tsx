import { Box, Container, Flex, Text, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { ProjectsEditor } from "./components/ProjectsEditor";
import { ExperienceEditor } from "./components/ExperienceEditor";
import { SkillsEditor } from "./components/SkillsEditor";

type Tab = "projects" | "experience" | "skills";

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const tabs: { id: Tab; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <Box minH="100vh" bg="var(--void)">
      {/* Header */}
      <Box
        bg="var(--void-lighter)"
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.1)"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="container.xl">
          <Flex h="60px" align="center" justify="space-between">
            <Flex align="center" gap={4}>
              <Text
                fontFamily="var(--font-display)"
                fontWeight="600"
                color="var(--text-primary)"
              >
                Portfolio Admin
              </Text>
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color="var(--text-secondary)"
              >
                {user?.email}
              </Text>
            </Flex>

            <Flex gap={2}>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "4px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                View Site
              </a>
              <Button
                size="sm"
                variant="ghost"
                color="var(--warm-coral)"
                fontFamily="var(--font-mono)"
                onClick={logout}
                _hover={{ bg: "rgba(255,107,107,0.1)" }}
              >
                Sign Out
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Flex gap={8}>
          {/* Sidebar */}
          <VStack
            w="200px"
            align="stretch"
            gap={1}
            flexShrink={0}
            position="sticky"
            top="80px"
            alignSelf="flex-start"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                justifyContent="flex-start"
                variant="ghost"
                color={activeTab === tab.id ? "var(--glow-cyan)" : "var(--text-secondary)"}
                bg={activeTab === tab.id ? "rgba(0,245,212,0.1)" : "transparent"}
                fontFamily="var(--font-mono)"
                fontSize="sm"
                onClick={() => setActiveTab(tab.id)}
                _hover={{
                  bg: activeTab === tab.id ? "rgba(0,245,212,0.1)" : "rgba(255,255,255,0.05)",
                }}
              >
                {tab.label}
              </Button>
            ))}
          </VStack>

          {/* Content */}
          <Box flex={1}>
            {activeTab === "projects" && <ProjectsEditor />}
            {activeTab === "experience" && <ExperienceEditor />}
            {activeTab === "skills" && <SkillsEditor />}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
