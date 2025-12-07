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
import type { Project } from "../../hooks/useContent";

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      tags: project.tags,
    });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
      link: "",
      github: "",
      featured: false,
      sort_order: projects.length,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveProject = async () => {
    const isNew = editingId === "new";
    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await fetchProjects();
      cancelEdit();
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      await fetchProjects();
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
          Projects
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={startNew}
          _hover={{ opacity: 0.9 }}
        >
          Add Project
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
                  Title
                </Text>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                rows={3}
              />
            </Box>

            <Flex gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Tags (comma-separated)
                </Text>
                <Input
                  value={(formData.tags || []).join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Link
                </Text>
                <Input
                  value={formData.link || ""}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
            </Flex>

            <Flex gap={4} align="center">
              <Box flex={1}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  GitHub
                </Text>
                <Input
                  value={formData.github || ""}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                />
              </Box>
              <Flex align="center" gap={2} mt={6}>
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ accentColor: "var(--glow-cyan)" }}
                />
                <Text color="var(--text-secondary)" fontSize="sm">
                  Featured
                </Text>
              </Flex>
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
                onClick={saveProject}
              >
                Save
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}

      {/* Project List */}
      <VStack align="stretch" gap={2}>
        {projects.map((project) => (
          <Flex
            key={project.id}
            p={4}
            bg="var(--void-lighter)"
            borderRadius="lg"
            border="1px solid"
            borderColor="rgba(255,255,255,0.05)"
            align="center"
            justify="space-between"
          >
            <Box>
              <Flex align="center" gap={2}>
                <Text color="var(--text-primary)" fontWeight="500">
                  {project.title}
                </Text>
                {project.featured && (
                  <Text fontSize="xs" color="var(--glow-cyan)">
                    FEATURED
                  </Text>
                )}
              </Flex>
              <Text fontSize="sm" color="var(--text-secondary)">
                {project.tags.join(", ")}
              </Text>
            </Box>
            <Flex gap={2}>
              <Button
                size="sm"
                variant="ghost"
                color="var(--text-secondary)"
                onClick={() => startEdit(project)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="var(--warm-coral)"
                onClick={() => deleteProject(project.id)}
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
