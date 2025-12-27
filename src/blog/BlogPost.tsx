import { Box, Container, VStack, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Box py="var(--section-padding)">
        <Container maxW="container.md">
          <Text color="var(--text-secondary)" textAlign="center">
            Loading...
          </Text>
        </Container>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box py="var(--section-padding)">
        <Container maxW="container.md">
          <VStack gap={4} textAlign="center">
            <Text fontSize="2xl" color="var(--text-primary)" fontFamily="var(--font-display)">
              Post not found
            </Text>
            <Text color="var(--text-secondary)">
              The post you're looking for doesn't exist or has been removed.
            </Text>
            <Link to="/">
              <Text
                color="var(--glow-cyan)"
                fontFamily="var(--font-mono)"
                fontSize="sm"
                _hover={{ textDecoration: "underline" }}
              >
                ← Back to blog
              </Text>
            </Link>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py="var(--section-padding)">
      <Container maxW="container.md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <VStack gap={8} align="stretch">
            {/* Back link */}
            <Link to="/">
              <Text
                color="var(--glow-cyan)"
                fontFamily="var(--font-mono)"
                fontSize="sm"
                _hover={{ textDecoration: "underline" }}
              >
                ← Back to blog
              </Text>
            </Link>

            {/* Post header */}
            <Box>
              {/* Date */}
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--glow-cyan)"
                mb={3}
              >
                {formatDate(post.created_at)}
              </Text>

              {/* Title */}
              <Text
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                color="var(--text-primary)"
                lineHeight={1.2}
                mb={4}
              >
                {post.title}
              </Text>

              {/* Tags */}
              {post.tags.length > 0 && (
                <Flex gap={2} flexWrap="wrap">
                  {post.tags.map((tag) => (
                    <Box
                      key={tag}
                      px={3}
                      py={1}
                      bg="var(--overlay-subtle)"
                      borderRadius="full"
                      fontSize="sm"
                      fontFamily="var(--font-mono)"
                      color="var(--text-secondary)"
                    >
                      {tag}
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>

            {/* Divider */}
            <Box h="1px" bg="var(--overlay-subtle)" />

            {/* Content */}
            <MarkdownRenderer content={post.content} />

            {/* Footer */}
            <Box h="1px" bg="var(--overlay-subtle)" mt={8} />

            <Flex justify="space-between" align="center" py={4}>
              <Link to="/">
                <Text
                  color="var(--glow-cyan)"
                  fontFamily="var(--font-mono)"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  ← Back to blog
                </Text>
              </Link>
              <Text fontSize="sm" color="var(--text-secondary)">
                Last updated: {formatDate(post.updated_at)}
              </Text>
            </Flex>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
}
