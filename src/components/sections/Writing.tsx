import { Box, Container, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { useBlogPosts } from "../../hooks/useContent";

function getBlogBaseUrl(): string {
  const { hostname, protocol } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "https://www.blog.cavazosgeorge.com";
  }

  if (hostname.startsWith("www.")) {
    return `${protocol}//www.blog.${hostname.slice(4)}`;
  }

  return `${protocol}//blog.${hostname}`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Writing() {
  const { data, loading, error } = useBlogPosts();
  const posts = data.filter((post) => !post.draft).slice(0, 3);
  const blogBaseUrl = getBlogBaseUrl();

  return (
    <Box as="section" id="writing" py="var(--section-padding)" bg="var(--surface-primary)">
      <Container maxW="container.lg">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-end" }}
          justify="space-between"
          gap={6}
          mb={{ base: 10, md: 14 }}
        >
          <Box maxW="680px">
            <Text className="section-kicker">Writing</Text>
            <Text as="h2" className="section-title">
              Notes from the workbench.
            </Text>
            <Text mt={4} color="var(--text-secondary)" fontSize={{ base: "md", md: "lg" }}>
              Practical write-ups on AI workflows, production templates, and the systems behind the work.
            </Text>
          </Box>

          <Link
            href={blogBaseUrl}
            color="var(--accent-primary)"
            fontFamily="var(--font-mono)"
            fontSize="sm"
            fontWeight="600"
            textDecoration="none"
            _hover={{ textDecoration: "underline" }}
          >
            Browse all writing ↗
          </Link>
        </Flex>

        <VStack align="stretch" gap={0} borderTop="1px solid var(--border-subtle)" aria-busy={loading}>
          {loading && posts.length === 0
            ? [0, 1, 2].map((index) => (
                <Box key={index} py={8} borderBottom="1px solid var(--border-subtle)">
                  <Box className="editorial-skeleton" h="18px" maxW="680px" />
                </Box>
              ))
            : posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`${blogBaseUrl}/${post.id}`}
                  textDecoration="none"
                  color="inherit"
                  borderBottom="1px solid var(--border-subtle)"
                  py={{ base: 7, md: 8 }}
                  _hover={{ textDecoration: "none" }}
                  css={{ "&:hover .writing-title": { color: "var(--accent-primary)" } }}
                >
                  <Box
                    display="grid"
                    gridTemplateColumns={{ base: "1fr", md: "72px 160px minmax(0, 1fr) 120px" }}
                    gap={{ base: 3, md: 6 }}
                    alignItems="start"
                  >
                    <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-tertiary)">
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <Text fontFamily="var(--font-mono)" fontSize="xs" color="var(--text-secondary)">
                      {formatDate(post.published_at || post.created_at)}
                    </Text>
                    <Box>
                      <Text
                        className="writing-title"
                        as="h3"
                        fontFamily="var(--font-display)"
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="600"
                        lineHeight="1.2"
                        transition="color 160ms ease"
                      >
                        {post.title}
                      </Text>
                      <Text mt={2} color="var(--text-secondary)" lineHeight="1.7" maxW="680px">
                        {post.excerpt}
                      </Text>
                    </Box>
                    <Text
                      justifySelf={{ base: "start", md: "end" }}
                      color="var(--accent-primary)"
                      fontFamily="var(--font-mono)"
                      fontSize="sm"
                    >
                      Read ↗
                    </Text>
                  </Box>
                </Link>
              ))}

          {error && !loading && posts.length === 0 && (
            <Text py={8} color="var(--text-secondary)" role="status">
              Writing is temporarily unavailable. Visit the full archive or try again shortly.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
