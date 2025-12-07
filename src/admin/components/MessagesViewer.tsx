import { useState, useEffect } from "react";
import { Box, VStack, Text, Button, Flex } from "@chakra-ui/react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  read: number;
  created_at: string;
}

interface MessagesViewerProps {
  onUnreadCountChange?: (count: number) => void;
}

export function MessagesViewer({ onUnreadCountChange }: MessagesViewerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const updateUnreadCount = (msgs: Message[]) => {
    if (onUnreadCountChange) {
      onUnreadCountChange(msgs.filter((m) => !m.read).length);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        updateUnreadCount(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: number) => {
    const res = await fetch(`/api/admin/messages/${id}/read`, {
      method: "PUT",
      credentials: "include",
    });

    if (res.ok) {
      const updatedMessages = messages.map((m) => (m.id === id ? { ...m, read: 1 } : m));
      setMessages(updatedMessages);
      updateUnreadCount(updatedMessages);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      const updatedMessages = messages.filter((m) => m.id !== id);
      setMessages(updatedMessages);
      updateUnreadCount(updatedMessages);
    }
  };

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      const msg = messages.find((m) => m.id === id);
      if (msg && !msg.read) {
        markAsRead(id);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return <Text color="var(--text-secondary)">Loading...</Text>;
  }

  return (
    <VStack align="stretch" gap={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={3}>
          <Text
            fontSize="xl"
            fontFamily="var(--font-display)"
            fontWeight="600"
            color="var(--text-primary)"
          >
            Messages
          </Text>
          {unreadCount > 0 && (
            <Box
              bg="var(--warm-coral)"
              color="white"
              fontSize="xs"
              fontFamily="var(--font-mono)"
              px={2}
              py={0.5}
              borderRadius="full"
            >
              {unreadCount} new
            </Box>
          )}
        </Flex>
        <Button
          size="sm"
          variant="ghost"
          color="var(--text-secondary)"
          onClick={fetchMessages}
        >
          Refresh
        </Button>
      </Flex>

      {messages.length === 0 ? (
        <Box
          p={8}
          bg="var(--void-lighter)"
          borderRadius="lg"
          border="1px solid rgba(255,255,255,0.05)"
          textAlign="center"
        >
          <Text color="var(--text-secondary)">No messages yet</Text>
        </Box>
      ) : (
        <VStack align="stretch" gap={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              p={4}
              bg="var(--void-lighter)"
              borderRadius="lg"
              border="1px solid"
              borderColor={!msg.read ? "var(--glow-cyan)" : "rgba(255,255,255,0.05)"}
              transition="all 0.2s ease"
              _hover={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <Flex
                justify="space-between"
                align="flex-start"
                mb={expandedId === msg.id ? 3 : 0}
                cursor="pointer"
                onClick={() => toggleExpand(msg.id)}
              >
                <Box flex={1}>
                  <Flex align="center" gap={2} mb={1}>
                    {!msg.read && (
                      <Box
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg="var(--glow-cyan)"
                      />
                    )}
                    <Text color="var(--text-primary)" fontWeight="500">
                      {msg.name}
                    </Text>
                    <Text fontSize="sm" color="var(--text-secondary)">
                      &lt;{msg.email}&gt;
                    </Text>
                  </Flex>
                  <Text fontSize="xs" color="var(--text-secondary)">
                    {formatDate(msg.created_at)}
                  </Text>
                </Box>
                <Button
                  size="sm"
                  variant="ghost"
                  color="var(--warm-coral)"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(msg.id);
                  }}
                >
                  Delete
                </Button>
              </Flex>

              {expandedId === msg.id && (
                <Box
                  mt={3}
                  pt={3}
                  borderTop="1px solid rgba(255,255,255,0.05)"
                >
                  <Text
                    color="var(--text-primary)"
                    whiteSpace="pre-wrap"
                    lineHeight="1.6"
                  >
                    {msg.message}
                  </Text>
                  <Flex mt={4} gap={2}>
                    <a
                      href={`mailto:${msg.email}?subject=Re: Your message&body=%0A%0A---%0AOriginal message:%0A${encodeURIComponent(msg.message)}`}
                      style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        background: "var(--glow-cyan)",
                        color: "var(--void)",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer",
                      }}
                    >
                      Reply via Email
                    </a>
                  </Flex>
                </Box>
              )}
            </Box>
          ))}
        </VStack>
      )}

      <Text fontSize="xs" color="var(--text-secondary)" fontStyle="italic">
        Click a message to expand and view the full content.
      </Text>
    </VStack>
  );
}
