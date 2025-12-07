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
import type { Experience } from "../../hooks/useContent";

interface SortableExperienceItemProps {
  exp: Experience;
  onEdit: (exp: Experience) => void;
  onDelete: (id: string) => void;
}

function SortableExperienceItem({ exp, onEdit, onDelete }: SortableExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exp.id });

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
      </Flex>

      <Flex gap={2}>
        <Button
          size="sm"
          variant="ghost"
          color="var(--text-secondary)"
          onClick={() => onEdit(exp)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="var(--warm-coral)"
          onClick={() => onDelete(exp.id)}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
}

export function ExperienceEditor() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});
  const [technologiesInput, setTechnologiesInput] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    setTechnologiesInput((exp.technologies || []).join(", "));
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
    setTechnologiesInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveExperience = async () => {
    const isNew = editingId === "new";

    // Validate required fields
    if (isNew && !formData.id?.trim()) {
      alert("ID (slug) is required");
      return;
    }

    const url = isNew ? "/api/admin/experience" : `/api/admin/experience/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    // Parse technologies from the input string
    const technologies = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...formData, technologies }),
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = experience.findIndex((e) => e.id === active.id);
      const newIndex = experience.findIndex((e) => e.id === over.id);

      const reordered = arrayMove(experience, oldIndex, newIndex);
      setExperience(reordered);

      // Send reorder to server
      const order = reordered.map((e, index) => ({
        id: e.id,
        sort_order: index,
      }));

      await fetch("/api/admin/experience/reorder", {
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
                value={technologiesInput}
                onChange={(e) => setTechnologiesInput(e.target.value)}
                placeholder="e.g., React, TypeScript, Node.js"
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={experience.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <VStack align="stretch" gap={2}>
            {experience.map((exp) => (
              <SortableExperienceItem
                key={exp.id}
                exp={exp}
                onEdit={startEdit}
                onDelete={deleteExperience}
              />
            ))}
          </VStack>
        </SortableContext>
      </DndContext>

      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        Drag to reorder your experience timeline.
      </Text>
    </VStack>
  );
}
