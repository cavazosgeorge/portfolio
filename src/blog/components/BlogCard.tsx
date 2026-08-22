import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  published_at?: string | null;
  created_at: string;
}

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post }: BlogCardProps) {
  const displayDate = post.published_at || post.created_at;
  const visibleTags = post.tags.slice(0, 3);
  const remainingTagCount = post.tags.length - visibleTags.length;

  return (
    <Box as="article" borderTop="1px solid" borderColor="var(--border-subtle)">
      <Link
        to={`/${post.id}`}
        aria-label={`Read ${post.title}`}
        style={{ color: "inherit", display: "block", textDecoration: "none" }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "10rem minmax(0, 1fr) auto" }}
          gap={{ base: 4, md: 8 }}
          alignItems="start"
          py={{ base: 7, md: 8 }}
          px={{ base: 0, md: 2 }}
          css={{
            transition: "background-color 160ms ease",
            "&:hover": {
              backgroundColor: "var(--accent-soft)",
            },
            "&:hover .blog-card-title": {
              color: "var(--accent-primary)",
            },
            "&:hover .blog-card-arrow": {
              transform: "translateX(3px)",
            },
          }}
        >
          <Box pt={{ md: 1 }}>
            <Text
              display="block"
              fontFamily="var(--font-mono)"
              fontSize="xs"
              color="var(--text-secondary)"
              whiteSpace="nowrap"
            >
              <time dateTime={displayDate}>{formatDate(displayDate)}</time>
            </Text>
            {post.featured && (
              <Text
                mt={2}
                fontFamily="var(--font-mono)"
                fontSize="xs"
                fontWeight="500"
                color="var(--accent-primary)"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                Featured
              </Text>
            )}
          </Box>

          <Box maxW="44rem">
            <Text
              as="h3"
              className="blog-card-title"
              fontSize={{ base: "xl", md: "2xl" }}
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
              letterSpacing="-0.025em"
              lineHeight={1.25}
              textWrap="balance"
              mb={post.excerpt ? 3 : 0}
              css={{ transition: "color 160ms ease" }}
            >
              {post.title}
            </Text>

            {post.excerpt && (
              <Text
                color="var(--text-secondary)"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight={1.6}
                mb={visibleTags.length > 0 ? 4 : 0}
                css={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </Text>
            )}

            {visibleTags.length > 0 && (
              <Flex gap={3} flexWrap="wrap" align="center">
                {visibleTags.map((tag) => (
                  <Text
                    key={tag}
                    fontSize="xs"
                    fontFamily="var(--font-mono)"
                    color="var(--text-secondary)"
                  >
                    {tag}
                  </Text>
                ))}
                {remainingTagCount > 0 && (
                  <Text
                    fontSize="xs"
                    fontFamily="var(--font-mono)"
                    color="var(--text-secondary)"
                  >
                    +{remainingTagCount}
                  </Text>
                )}
              </Flex>
            )}
          </Box>

          <Text
            as="span"
            className="blog-card-arrow"
            aria-hidden="true"
            display={{ base: "none", md: "block" }}
            color="var(--accent-primary)"
            fontSize="xl"
            lineHeight={1}
            pt={1}
            css={{ transition: "transform 160ms ease" }}
          >
            →
          </Text>
        </Grid>
      </Link>
    </Box>
  );
}
