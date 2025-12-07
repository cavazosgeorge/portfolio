import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import type { Skill } from "../../hooks/useContent";

const CATEGORIES = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "devops", label: "DevOps" },
];

export function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({});

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({
      name: "",
      category: "frontend",
      sort_order: skills.length,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveSkill = async () => {
    const isNew = editingId === "new";
    const url = isNew ? "/api/admin/skills" : `/api/admin/skills/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await fetchSkills();
      cancelEdit();
    }
  };

  const deleteSkill = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    const res = await fetch(`/api/admin/skills/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      await fetchSkills();
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  if (loading) {
    return <Text color="var(--text-secondary)">Loading...</Text>;
  }

  return (
    <VStack align="stretch" gap={4}>
      <Flex justify="space-between" align="center">
        <Text
          fontSize="xl"
          fontFamily="var(--font-display)"
          fontWeight="600"
          color="var(--text-primary)"
        >
          Skills
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={startNew}
          _hover={{ opacity: 0.9 }}
        >
          Add Skill
        </Button>
      </Flex>

      {/* Edit Form */}
      {editingId !== null && (
        <Box
          p={6}
          bg="var(--void-lighter)"
          borderRadius="lg"
          border="1px solid"
          borderColor="rgba(255,255,255,0.1)"
        >
          <VStack gap={4} align="stretch">
            <Flex gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Name
                </Text>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Category
                </Text>
                <select
                  value={formData.category || "frontend"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    background: "var(--void)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </Box>
            </Flex>

            <Flex gap={2} justify="flex-end">
              <Button
                size="sm"
                variant="ghost"
                color="var(--text-secondary)"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                bg="var(--glow-cyan)"
                color="var(--void)"
                onClick={saveSkill}
              >
                Save
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}

      {/* Skills List by Category */}
      {CATEGORIES.map((category) => (
        <Box key={category.value}>
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--text-secondary)"
            mb={2}
            letterSpacing="0.1em"
          >
            {category.label.toUpperCase()}
          </Text>
          <Flex flexWrap="wrap" gap={2}>
            {(groupedSkills[category.value] || []).map((skill) => (
              <Flex
                key={skill.id}
                px={3}
                py={2}
                bg="var(--void-lighter)"
                borderRadius="full"
                border="1px solid"
                borderColor="rgba(255,255,255,0.05)"
                align="center"
                gap={2}
              >
                <Text fontSize="sm" color="var(--text-primary)">
                  {skill.name}
                </Text>
                <Button
                  size="xs"
                  variant="ghost"
                  color="var(--text-secondary)"
                  minW="auto"
                  h="auto"
                  p={1}
                  onClick={() => startEdit(skill)}
                  _hover={{ color: "var(--glow-cyan)" }}
                >
                  ✎
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  color="var(--text-secondary)"
                  minW="auto"
                  h="auto"
                  p={1}
                  onClick={() => deleteSkill(skill.id)}
                  _hover={{ color: "var(--warm-coral)" }}
                >
                  ×
                </Button>
              </Flex>
            ))}
          </Flex>
        </Box>
      ))}
    </VStack>
  );
}
