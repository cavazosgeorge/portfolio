import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BlogCard } from "./components/BlogCard";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  published_at?: string | null;
  created_at: string;
}

export function BlogHome() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Writing | George Cavazos";
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/blog", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load posts");
        }

        return res.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((fetchError: unknown) => {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const publishedPosts = posts.filter((post) => !post.draft);
  const featuredPosts = publishedPosts.filter((post) => post.featured);
  const regularPosts = publishedPosts.filter((post) => !post.featured);

  return (
    <Box as="section" py={{ base: 16, md: 24 }}>
      <Container maxW="70rem">
        <VStack gap={{ base: 14, md: 20 }} align="stretch">
          <Box maxW="52rem">
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              color="var(--accent-primary)"
              letterSpacing="0.12em"
              textTransform="uppercase"
              mb={5}
            >
              Field notes
            </Text>
            <Text
              as="h1"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
              letterSpacing="-0.045em"
              lineHeight={{ base: 1.08, md: 1.02 }}
              textWrap="balance"
              mb={6}
            >
              Notes on systems, software, and the work between them.
            </Text>
            <Text
              maxW="42rem"
              color="var(--text-secondary)"
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight={1.65}
            >
              Practical writing about automation, AI, product engineering, and
              the decisions behind reliable technical work.
            </Text>
          </Box>

          {loading ? (
            <Box
              role="status"
              aria-live="polite"
              py={12}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="var(--border-subtle)"
            >
              <Text color="var(--text-secondary)" fontSize="sm">
                Loading writing…
              </Text>
            </Box>
          ) : error ? (
            <Box
              role="alert"
              py={12}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="var(--border-subtle)"
            >
              <Text color="var(--text-primary)" fontWeight="600" mb={2}>
                The writing archive is temporarily unavailable.
              </Text>
              <Text color="var(--text-secondary)">
                Please refresh the page or check back shortly.
              </Text>
            </Box>
          ) : posts.length === 0 ? (
            <Box
              py={12}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="var(--border-subtle)"
            >
              <Text color="var(--text-secondary)" fontSize="lg">
                No published notes yet. Check back soon.
              </Text>
            </Box>
          ) : (
            <VStack gap={{ base: 14, md: 18 }} align="stretch">
              {featuredPosts.length > 0 && (
                <Box as="section" aria-labelledby="featured-writing-heading">
                  <Flex align="baseline" justify="space-between" gap={4} mb={5}>
                    <Text
                      as="h2"
                      id="featured-writing-heading"
                      fontFamily="var(--font-display)"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="600"
                      letterSpacing="-0.025em"
                    >
                      Featured writing
                    </Text>
                    <Text
                      fontFamily="var(--font-mono)"
                      fontSize="xs"
                      color="var(--text-secondary)"
                    >
                      {String(featuredPosts.length).padStart(2, "0")}
                    </Text>
                  </Flex>
                  <Box borderBottom="1px solid" borderColor="var(--border-subtle)">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </Box>
                </Box>
              )}

              {regularPosts.length > 0 && (
                <Box as="section" aria-labelledby="all-writing-heading">
                  <Flex align="baseline" justify="space-between" gap={4} mb={5}>
                    <Text
                      as="h2"
                      id="all-writing-heading"
                      fontFamily="var(--font-display)"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="600"
                      letterSpacing="-0.025em"
                    >
                      {featuredPosts.length > 0 ? "All notes" : "Latest writing"}
                    </Text>
                    <Text
                      fontFamily="var(--font-mono)"
                      fontSize="xs"
                      color="var(--text-secondary)"
                    >
                      {String(regularPosts.length).padStart(2, "0")}
                    </Text>
                  </Flex>
                  <Box borderBottom="1px solid" borderColor="var(--border-subtle)">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </Box>
                </Box>
              )}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
