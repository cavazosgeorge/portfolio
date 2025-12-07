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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Project } from "../../hooks/useContent";

interface SortableProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

function SortableProjectItem({ project, onEdit, onDelete }: SortableProjectItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      p={4}
      bg="var(--void-lighter)"
      borderRadius="lg"
      border="1px solid"
      borderColor={isDragging ? "var(--glow-cyan)" : "rgba(255,255,255,0.05)"}
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap={3} flex={1}>
        {/* Drag handle */}
        <Box
          {...attributes}
          {...listeners}
          cursor="grab"
          p={2}
          borderRadius="md"
          _hover={{ bg: "rgba(255,255,255,0.05)" }}
          color="var(--text-secondary)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="4" r="1.5" />
            <circle cx="12" cy="4" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
            <circle cx="4" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        </Box>

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
      </Flex>

      <Flex gap={2}>
        <Button
          size="sm"
          variant="ghost"
          color="var(--text-secondary)"
          onClick={() => onEdit(project)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="var(--warm-coral)"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
}

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent, isFeatured: boolean) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const group = isFeatured
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => !p.featured);

      const oldIndex = group.findIndex((p) => p.id === active.id);
      const newIndex = group.findIndex((p) => p.id === over.id);

      const reorderedGroup = arrayMove(group, oldIndex, newIndex);

      // Update local state immediately for responsiveness
      const otherGroup = isFeatured
        ? projects.filter((p) => !p.featured)
        : projects.filter((p) => p.featured);

      const newProjects = isFeatured
        ? [...reorderedGroup, ...otherGroup]
        : [...otherGroup, ...reorderedGroup];

      setProjects(newProjects);

      // Send reorder to server
      const order = reorderedGroup.map((p, index) => ({
        id: p.id,
        sort_order: index,
      }));

      await fetch("/api/admin/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ order }),
      });
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

      {/* Featured Projects */}
      {projects.filter((p) => p.featured).length > 0 && (
        <Box>
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--glow-cyan)"
            mb={2}
            letterSpacing="0.1em"
          >
            FEATURED PROJECTS
          </Text>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, true)}
          >
            <SortableContext
              items={projects.filter((p) => p.featured).map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <VStack align="stretch" gap={2}>
                {projects
                  .filter((p) => p.featured)
                  .map((project) => (
                    <SortableProjectItem
                      key={project.id}
                      project={project}
                      onEdit={startEdit}
                      onDelete={deleteProject}
                    />
                  ))}
              </VStack>
            </SortableContext>
          </DndContext>
        </Box>
      )}

      {/* Other Projects */}
      {projects.filter((p) => !p.featured).length > 0 && (
        <Box>
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--text-secondary)"
            mb={2}
            letterSpacing="0.1em"
          >
            OTHER PROJECTS
          </Text>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, false)}
          >
            <SortableContext
              items={projects.filter((p) => !p.featured).map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <VStack align="stretch" gap={2}>
                {projects
                  .filter((p) => !p.featured)
                  .map((project) => (
                    <SortableProjectItem
                      key={project.id}
                      project={project}
                      onEdit={startEdit}
                      onDelete={deleteProject}
                    />
                  ))}
              </VStack>
            </SortableContext>
          </DndContext>
        </Box>
      )}

      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        Drag projects to reorder within each section. Toggle "Featured" to move between sections.
      </Text>
    </VStack>
  );
}
