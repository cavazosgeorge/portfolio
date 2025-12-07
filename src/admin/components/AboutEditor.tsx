import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";
import type { SiteSettings } from "../../hooks/useContent";

type AboutSettings = SiteSettings["about"];

const DEFAULT_ABOUT: AboutSettings = {
  heading: "Building at the intersection of",
  subheading: "creativity and code",
  paragraphs: [],
};

export function AboutEditor() {
  const [about, setAbout] = useState<AboutSettings>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/settings/about");
      if (res.ok) {
        const data = await res.json();
        setAbout(data);
      }
    } catch (err) {
      console.error("Failed to fetch about settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const saveAbout = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(about),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error("Failed to save about settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const addParagraph = () => {
    setAbout({
      ...about,
      paragraphs: [...about.paragraphs, ""],
    });
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...about.paragraphs];
    newParagraphs[index] = value;
    setAbout({ ...about, paragraphs: newParagraphs });
  };

  const removeParagraph = (index: number) => {
    setAbout({
      ...about,
      paragraphs: about.paragraphs.filter((_, i) => i !== index),
    });
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
          About Section
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={saveAbout}
          disabled={saving}
          _hover={{ opacity: 0.9 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Flex>

      {/* Heading */}
      <Box
        p={6}
        bg="var(--void-lighter)"
        borderRadius="lg"
        border="1px solid"
        borderColor="rgba(255,255,255,0.1)"
      >
        <VStack gap={4} align="stretch">
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--text-secondary)"
            letterSpacing="0.1em"
          >
            SECTION HEADING
          </Text>

          <Box>
            <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
              Main Heading
            </Text>
            <Input
              value={about.heading}
              onChange={(e) => setAbout({ ...about, heading: e.target.value })}
              bg="var(--void)"
              border="1px solid rgba(255,255,255,0.1)"
              color="var(--text-primary)"
              placeholder="Building at the intersection of"
            />
          </Box>

          <Box>
            <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
              Subheading (colored text)
            </Text>
            <Input
              value={about.subheading}
              onChange={(e) => setAbout({ ...about, subheading: e.target.value })}
              bg="var(--void)"
              border="1px solid rgba(255,255,255,0.1)"
              color="var(--text-primary)"
              placeholder="creativity and code"
            />
          </Box>
        </VStack>
      </Box>

      {/* Bio Paragraphs */}
      <Box
        p={6}
        bg="var(--void-lighter)"
        borderRadius="lg"
        border="1px solid"
        borderColor="rgba(255,255,255,0.1)"
      >
        <VStack gap={4} align="stretch">
          <Flex justify="space-between" align="center">
            <Text
              fontSize="sm"
              fontFamily="var(--font-mono)"
              color="var(--text-secondary)"
              letterSpacing="0.1em"
            >
              BIO PARAGRAPHS
            </Text>
            <Button
              size="xs"
              variant="ghost"
              color="var(--glow-cyan)"
              fontFamily="var(--font-mono)"
              onClick={addParagraph}
            >
              + Add Paragraph
            </Button>
          </Flex>

          {about.paragraphs.length === 0 ? (
            <Text fontSize="sm" color="var(--text-secondary)" fontStyle="italic">
              No paragraphs yet. Click "Add Paragraph" to get started.
            </Text>
          ) : (
            about.paragraphs.map((paragraph, index) => (
              <Box key={index}>
                <Flex justify="space-between" align="center" mb={1}>
                  <Text fontSize="sm" color="var(--text-secondary)">
                    Paragraph {index + 1}
                  </Text>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="var(--warm-coral)"
                    onClick={() => removeParagraph(index)}
                  >
                    Remove
                  </Button>
                </Flex>
                <Textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                  rows={4}
                  placeholder="Write your bio paragraph here..."
                />
              </Box>
            ))
          )}
        </VStack>
      </Box>

      {/* Preview hint */}
      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        Note: Skills are managed in the Skills tab. The About section displays all skills automatically.
      </Text>
    </VStack>
  );
}
