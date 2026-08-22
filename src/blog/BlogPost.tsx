import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = post ? `${post.title} | George Cavazos` : "Writing | George Cavazos";
  }, [post]);

  useEffect(() => {
    if (!slug) {
      setError("Post not found");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`/api/blog/${slug}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Post not found");
        }

        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((fetchError: unknown) => {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : "Post not found");
        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="48rem">
          <Text role="status" aria-live="polite" color="var(--text-secondary)">
            Loading note…
          </Text>
        </Container>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="48rem">
          <VStack gap={5} align="start">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              color="var(--text-primary)"
              fontFamily="var(--font-display)"
              fontWeight="600"
              letterSpacing="-0.035em"
            >
              Post not found
            </Text>
            <Text color="var(--text-secondary)" fontSize="lg">
              The post you're looking for doesn't exist or has been removed.
            </Text>
            <Link to="/" style={{ display: "inline-block", textDecoration: "none" }}>
              <Text
                color="var(--accent-primary)"
                fontWeight="600"
                fontSize="sm"
                _hover={{ textDecoration: "underline", textUnderlineOffset: "0.25em" }}
              >
                ← Back to blog
              </Text>
            </Link>
          </VStack>
        </Container>
      </Box>
    );
  }

  const displayDate = post.published_at || post.created_at;

  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="58rem">
        <Box as="article">
          <VStack gap={{ base: 9, md: 12 }} align="stretch">
            <Box maxW="48rem" mx="auto" w="100%">
              <Link to="/" style={{ display: "inline-block", textDecoration: "none" }}>
                <Text
                  color="var(--text-secondary)"
                  fontSize="sm"
                  fontWeight="500"
                  _hover={{ color: "var(--accent-primary)" }}
                  css={{ transition: "color 160ms ease" }}
                >
                  ← All writing
                </Text>
              </Link>
            </Box>

            <Box as="header" maxW="48rem" mx="auto" w="100%">
              <Text
                display="block"
                fontFamily="var(--font-mono)"
                fontSize="xs"
                color="var(--accent-primary)"
                letterSpacing="0.06em"
                textTransform="uppercase"
                mb={5}
              >
                <time dateTime={displayDate}>{formatDate(displayDate)}</time>
              </Text>

              <Text
                as="h1"
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                color="var(--text-primary)"
                letterSpacing="-0.045em"
                lineHeight={{ base: 1.1, md: 1.04 }}
                textWrap="balance"
                mb={post.excerpt ? 6 : 7}
              >
                {post.title}
              </Text>

              {post.excerpt && (
                <Text
                  color="var(--text-secondary)"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight={1.65}
                  mb={7}
                >
                  {post.excerpt}
                </Text>
              )}

              {post.tags.length > 0 && (
                <Flex gap={{ base: 3, md: 4 }} flexWrap="wrap">
                  {post.tags.map((tag) => (
                    <Text
                      key={tag}
                      fontSize="xs"
                      fontFamily="var(--font-mono)"
                      color="var(--text-secondary)"
                    >
                      {tag}
                    </Text>
                  ))}
                </Flex>
              )}
            </Box>

            <Box
              maxW="48rem"
              mx="auto"
              w="100%"
              borderTop="1px solid"
              borderColor="var(--border-subtle)"
              pt={{ base: 8, md: 10 }}
            >
              <MarkdownRenderer content={post.content} />
            </Box>

            <Flex
              maxW="48rem"
              mx="auto"
              w="100%"
              justify="space-between"
              align={{ base: "start", sm: "center" }}
              direction={{ base: "column", sm: "row" }}
              gap={4}
              pt={7}
              borderTop="1px solid"
              borderColor="var(--border-subtle)"
            >
              <Link to="/" style={{ display: "inline-block", textDecoration: "none" }}>
                <Text
                  color="var(--accent-primary)"
                  fontWeight="600"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline", textUnderlineOffset: "0.25em" }}
                >
                  ← All writing
                </Text>
              </Link>

              <Text fontSize="xs" fontFamily="var(--font-mono)" color="var(--text-secondary)">
                Last updated: {formatDate(post.updated_at)}
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
