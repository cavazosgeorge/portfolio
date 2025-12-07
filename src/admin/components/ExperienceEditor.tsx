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
import type { Experience } from "../../hooks/useContent";

export function ExperienceEditor() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});

  const fetchExperience = async () => {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setExperience(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({ ...exp });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({
      id: "",
      role: "",
      company: "",
      period: "",
      description: "",
      technologies: [],
      sort_order: experience.length,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveExperience = async () => {
    const isNew = editingId === "new";
    const url = isNew ? "/api/admin/experience" : `/api/admin/experience/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await fetchExperience();
      cancelEdit();
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    const res = await fetch(`/api/admin/experience/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      await fetchExperience();
    }
  };

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
          Experience
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={startNew}
          _hover={{ opacity: 0.9 }}
        >
          Add Experience
        </Button>
      </Flex>

      {/* Edit Form */}
      {editingId && (
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
                  ID (slug)
                </Text>
                <Input
                  value={formData.id || ""}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={editingId !== "new"}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Period
                </Text>
                <Input
                  value={formData.period || ""}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="e.g., Oct 2022 - Present"
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
            </Flex>

            <Flex gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Role
                </Text>
                <Input
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Company
                </Text>
                <Input
                  value={formData.company || ""}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
            </Flex>

            <Box>
              <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                Description
              </Text>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                bg="var(--void)"
                border="1px solid rgba(255,255,255,0.1)"
                color="var(--text-primary)"
                rows={4}
              />
            </Box>

            <Box>
              <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                Technologies (comma-separated)
              </Text>
              <Input
                value={(formData.technologies || []).join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                  })
                }
                bg="var(--void)"
                border="1px solid rgba(255,255,255,0.1)"
                color="var(--text-primary)"
              />
            </Box>

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
                onClick={saveExperience}
              >
                Save
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}

      {/* Experience List */}
      <VStack align="stretch" gap={2}>
        {experience.map((exp) => (
          <Flex
            key={exp.id}
            p={4}
            bg="var(--void-lighter)"
            borderRadius="lg"
            border="1px solid"
            borderColor="rgba(255,255,255,0.05)"
            align="center"
            justify="space-between"
          >
            <Box>
              <Text color="var(--text-primary)" fontWeight="500">
                {exp.role}
              </Text>
              <Text fontSize="sm" color="var(--warm-coral)">
                {exp.company}
              </Text>
              <Text fontSize="xs" color="var(--text-secondary)">
                {exp.period}
              </Text>
            </Box>
            <Flex gap={2}>
              <Button
                size="sm"
                variant="ghost"
                color="var(--text-secondary)"
                onClick={() => startEdit(exp)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="var(--warm-coral)"
                onClick={() => deleteExperience(exp.id)}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
}
