import { Box, Container, Flex, Text, VStack, Button } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { ProjectsEditor } from "./components/ProjectsEditor";
import { ExperienceEditor } from "./components/ExperienceEditor";
import { SkillsEditor } from "./components/SkillsEditor";
import { AboutEditor } from "./components/AboutEditor";
import { LinksEditor } from "./components/LinksEditor";
import { MessagesViewer } from "./components/MessagesViewer";

type Tab = "projects" | "experience" | "skills" | "about" | "links" | "messages";

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages", { credentials: "include" });
      if (res.ok) {
        const messages = await res.json();
        setUnreadCount(messages.filter((m: { read: number }) => !m.read).length);
      }
    } catch {
      // Ignore errors
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const handleUnreadCountChange = useCallback((count: number) => {
    setUnreadCount(count);
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "links", label: "Links" },
    { id: "messages", label: "Messages" },
  ];

  return (
    <Box minH="100vh" bg="var(--bg-primary)">
      {/* Header */}
      <Box
        bg="var(--bg-secondary)"
        borderBottom="1px solid"
        borderColor="var(--overlay-medium)"
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
                _hover={{ bg: "var(--overlay-subtle)" }}
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
                bg={activeTab === tab.id ? "var(--glow-cyan-dim)" : "transparent"}
                fontFamily="var(--font-mono)"
                fontSize="sm"
                onClick={() => setActiveTab(tab.id)}
                _hover={{
                  bg: activeTab === tab.id ? "var(--glow-cyan-dim)" : "var(--overlay-subtle)",
                }}
              >
                <Flex align="center" gap={2} w="100%" justify="space-between">
                  {tab.label}
                  {tab.id === "messages" && unreadCount > 0 && (
                    <Box
                      bg="var(--warm-coral)"
                      color="white"
                      fontSize="xs"
                      px={1.5}
                      py={0.5}
                      borderRadius="full"
                      minW="20px"
                      textAlign="center"
                    >
                      {unreadCount}
                    </Box>
                  )}
                </Flex>
              </Button>
            ))}
          </VStack>

          {/* Content */}
          <Box flex={1}>
            {activeTab === "projects" && <ProjectsEditor />}
            {activeTab === "experience" && <ExperienceEditor />}
            {activeTab === "skills" && <SkillsEditor />}
            {activeTab === "about" && <AboutEditor />}
            {activeTab === "links" && <LinksEditor />}
            {activeTab === "messages" && <MessagesViewer onUnreadCountChange={handleUnreadCountChange} />}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
