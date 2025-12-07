import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import type { SiteSettings } from "../../hooks/useContent";

type ContactSettings = SiteSettings["contact"];

const DEFAULT_CONTACT: ContactSettings = {
  heading: "Get in Touch",
  email: "",
  github: "",
  linkedin: "",
};

export function LinksEditor() {
  const [contact, setContact] = useState<ContactSettings>(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContact = async () => {
    try {
      const res = await fetch("/api/settings/contact");
      if (res.ok) {
        const data = await res.json();
        setContact(data);
      }
    } catch (err) {
      console.error("Failed to fetch contact settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const saveContact = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(contact),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error("Failed to save contact settings:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Text color="var(--text-secondary)">Loading...</Text>;
  }

  return (
    <VStack align="stretch" gap={6}>
      <Flex justify="space-between" align="center">
        <Text
          fontSize="xl"
          fontFamily="var(--font-display)"
          fontWeight="600"
          color="var(--text-primary)"
        >
          Social Links
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={saveContact}
          disabled={saving}
          _hover={{ opacity: 0.9 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Flex>

      <Box
        p={6}
        bg="var(--void-lighter)"
        borderRadius="lg"
        border="1px solid"
        borderColor="rgba(255,255,255,0.1)"
      >
        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
              GitHub URL
            </Text>
            <Input
              value={contact.github}
              onChange={(e) => setContact({ ...contact, github: e.target.value })}
              bg="var(--void)"
              border="1px solid rgba(255,255,255,0.1)"
              color="var(--text-primary)"
              placeholder="https://github.com/yourusername"
            />
          </Box>

          <Box>
            <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
              LinkedIn URL
            </Text>
            <Input
              value={contact.linkedin}
              onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
              bg="var(--void)"
              border="1px solid rgba(255,255,255,0.1)"
              color="var(--text-primary)"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </Box>

          <Box>
            <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
              Email Address
            </Text>
            <Input
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              bg="var(--void)"
              border="1px solid rgba(255,255,255,0.1)"
              color="var(--text-primary)"
              placeholder="your@email.com"
            />
          </Box>
        </VStack>
      </Box>

      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        These links appear in the Contact section footer on the public site.
      </Text>
    </VStack>
  );
}
