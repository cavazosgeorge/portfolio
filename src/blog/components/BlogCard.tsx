import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiltCard } from "../../components/animations/TiltCard";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link to={`/${post.id}`} style={{ textDecoration: "none" }}>
        <TiltCard glowColor={post.featured ? "var(--glow-cyan)" : "var(--soft-lavender)"}>
          <Box
            p={6}
            bg="var(--bg-secondary)"
            borderRadius="xl"
            border="1px solid"
            borderColor="var(--overlay-subtle)"
            h="100%"
            display="flex"
            flexDirection="column"
            transition="border-color 0.3s ease"
            _hover={{ borderColor: "var(--overlay-medium)" }}
          >
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
              fontSize="xl"
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
              mb={3}
              lineHeight={1.3}
            >
              {post.title}
            </Text>

            {/* Excerpt */}
            <Text
              color="var(--text-secondary)"
              fontSize="md"
              lineHeight={1.7}
              mb={4}
              flex={1}
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </Text>

            {/* Tags */}
            {post.tags.length > 0 && (
              <Flex gap={2} flexWrap="wrap">
                {post.tags.map((tag) => (
                  <Box
                    key={tag}
                    px={2}
                    py={1}
                    bg="var(--overlay-subtle)"
                    borderRadius="md"
                    fontSize="xs"
                    fontFamily="var(--font-mono)"
                    color="var(--text-secondary)"
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </TiltCard>
      </Link>
    </motion.div>
  );
}
