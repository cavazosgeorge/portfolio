import { Box, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BlogCard } from "./components/BlogCard";
import { RevealOnScroll } from "../components/animations/RevealOnScroll";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  created_at: string;
}

export function BlogHome() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <Box as="section" py="var(--section-padding)">
      <Container maxW="container.lg">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <RevealOnScroll>
            <Box textAlign="center">
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--glow-cyan)"
                letterSpacing="0.1em"
                mb={2}
              >
                THOUGHTS & TUTORIALS
              </Text>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                color="var(--text-primary)"
              >
                Blog
              </Text>
            </Box>
          </RevealOnScroll>

          {loading ? (
            <Text color="var(--text-secondary)" textAlign="center">
              Loading posts...
            </Text>
          ) : posts.length === 0 ? (
            <Box textAlign="center" py={12}>
              <Text color="var(--text-secondary)" fontSize="lg">
                No posts yet. Check back soon!
              </Text>
            </Box>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontFamily="var(--font-mono)"
                    color="var(--glow-cyan)"
                    letterSpacing="0.1em"
                    mb={4}
                  >
                    FEATURED
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {featuredPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                  </SimpleGrid>
                </Box>
              )}

              {/* All Posts */}
              {regularPosts.length > 0 && (
                <Box>
                  {featuredPosts.length > 0 && (
                    <Text
                      fontSize="sm"
                      fontFamily="var(--font-mono)"
                      color="var(--text-secondary)"
                      letterSpacing="0.1em"
                      mb={4}
                    >
                      ALL POSTS
                    </Text>
                  )}
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {regularPosts.map((post, index) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        index={index + featuredPosts.length}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
