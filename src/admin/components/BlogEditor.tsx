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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface SortableBlogItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

function SortableBlogItem({ post, onEdit, onDelete }: SortableBlogItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

        <Box flex={1}>
          <Flex align="center" gap={2}>
            <Text color="var(--text-primary)" fontWeight="500">
              {post.title}
            </Text>
            {post.featured && (
              <Text fontSize="xs" color="var(--glow-cyan)">
                FEATURED
              </Text>
            )}
            {post.draft && (
              <Text fontSize="xs" color="var(--warm-coral)">
                DRAFT
              </Text>
            )}
          </Flex>
          <Flex align="center" gap={2}>
            <Text fontSize="sm" color="var(--text-secondary)">
              {post.tags.join(", ") || "No tags"}
            </Text>
            <Text fontSize="xs" color="var(--text-secondary)">
              · {formatDate(post.created_at)}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex gap={2}>
        <Button
          size="sm"
          variant="ghost"
          color="var(--text-secondary)"
          onClick={() => onEdit(post)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="var(--warm-coral)"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
}

export function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchPosts = async () => {
    const res = await fetch("/api/admin/blog", { credentials: "include" });
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({ ...post });
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      tags: [],
      featured: false,
      draft: true,
      sort_order: posts.length,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const savePost = async () => {
    const isNew = editingId === "new";
    const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await fetchPosts();
      cancelEdit();
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      await fetchPosts();
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = posts.findIndex((p) => p.id === active.id);
      const newIndex = posts.findIndex((p) => p.id === over.id);

      const reordered = arrayMove(posts, oldIndex, newIndex);
      setPosts(reordered);

      const order = reordered.map((p, index) => ({
        id: p.id,
        sort_order: index,
      }));

      await fetch("/api/admin/blog/reorder", {
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
          Blog Posts
        </Text>
        <Button
          size="sm"
          bg="var(--glow-cyan)"
          color="var(--void)"
          fontFamily="var(--font-mono)"
          onClick={startNew}
          _hover={{ opacity: 0.9 }}
        >
          New Post
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
                  Slug (URL path)
                </Text>
                <Input
                  value={formData.id || ""}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={editingId !== "new"}
                  placeholder="my-blog-post"
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                  _placeholder={{ color: "var(--text-secondary)" }}
                />
              </Box>
              <Box flex={2}>
                <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                  Title
                </Text>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="My Blog Post Title"
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                  _placeholder={{ color: "var(--text-secondary)" }}
                />
              </Box>
            </Flex>

            <Box>
              <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                Excerpt (preview text for cards)
              </Text>
              <Textarea
                value={formData.excerpt || ""}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A short summary of your post..."
                bg="var(--void)"
                border="1px solid rgba(255,255,255,0.1)"
                color="var(--text-primary)"
                _placeholder={{ color: "var(--text-secondary)" }}
                rows={2}
              />
            </Box>

            <Box>
              <Text fontSize="sm" color="var(--text-secondary)" mb={1}>
                Content (Markdown)
              </Text>
              <Textarea
                value={formData.content || ""}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="# Your blog post content here...

Write your post using Markdown syntax.

## Subheading

- List item
- Another item

```javascript
const code = 'syntax highlighted';
```"
                bg="var(--void)"
                border="1px solid rgba(255,255,255,0.1)"
                color="var(--text-primary)"
                _placeholder={{ color: "var(--text-secondary)" }}
                fontFamily="var(--font-mono)"
                fontSize="sm"
                rows={15}
              />
            </Box>

            <Flex gap={4} align="center">
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
                  placeholder="react, typescript, tutorial"
                  bg="var(--void)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="var(--text-primary)"
                  _placeholder={{ color: "var(--text-secondary)" }}
                />
              </Box>
              <Flex align="center" gap={4} mt={6}>
                <Flex align="center" gap={2}>
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
                <Flex align="center" gap={2}>
                  <input
                    type="checkbox"
                    checked={formData.draft ?? true}
                    onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
                    style={{ accentColor: "var(--warm-coral)" }}
                  />
                  <Text color="var(--text-secondary)" fontSize="sm">
                    Draft
                  </Text>
                </Flex>
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
                onClick={savePost}
              >
                Save
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}

      {/* Posts List */}
      {posts.length > 0 ? (
        <Box>
          <Text
            fontSize="sm"
            fontFamily="var(--font-mono)"
            color="var(--text-secondary)"
            mb={2}
            letterSpacing="0.1em"
          >
            ALL POSTS ({posts.length})
          </Text>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={posts.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <VStack align="stretch" gap={2}>
                {posts.map((post) => (
                  <SortableBlogItem
                    key={post.id}
                    post={post}
                    onEdit={startEdit}
                    onDelete={deletePost}
                  />
                ))}
              </VStack>
            </SortableContext>
          </DndContext>
        </Box>
      ) : (
        <Text color="var(--text-secondary)" fontStyle="italic">
          No blog posts yet. Click "New Post" to create your first post.
        </Text>
      )}

      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        Drag posts to reorder. Posts marked as "Draft" will not be visible on the public blog.
      </Text>
    </VStack>
  );
}
