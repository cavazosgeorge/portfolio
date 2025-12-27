import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Box } from "@chakra-ui/react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box
      className="markdown-content"
      css={{
        // Headings
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginTop: "2rem",
          marginBottom: "1rem",
          lineHeight: 1.3,
        },
        "& h1": { fontSize: "2.25rem" },
        "& h2": { fontSize: "1.75rem", borderBottom: "1px solid var(--overlay-subtle)", paddingBottom: "0.5rem" },
        "& h3": { fontSize: "1.5rem" },
        "& h4": { fontSize: "1.25rem" },

        // Paragraphs
        "& p": {
          marginBottom: "1.25rem",
          lineHeight: 1.8,
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
        },

        // Links
        "& a": {
          color: "var(--glow-cyan)",
          textDecoration: "none",
          borderBottom: "1px solid transparent",
          transition: "border-color 0.2s ease",
          "&:hover": {
            borderBottomColor: "var(--glow-cyan)",
          },
        },

        // Inline code
        "& code:not(pre code)": {
          fontFamily: "var(--font-mono)",
          backgroundColor: "var(--overlay-subtle)",
          padding: "0.2em 0.4em",
          borderRadius: "4px",
          fontSize: "0.9em",
          color: "var(--warm-coral)",
        },

        // Code blocks
        "& pre": {
          backgroundColor: "var(--bg-secondary)",
          padding: "1.25rem",
          borderRadius: "12px",
          overflow: "auto",
          marginBottom: "1.5rem",
          border: "1px solid var(--overlay-subtle)",
        },
        "& pre code": {
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          backgroundColor: "transparent",
          padding: 0,
          color: "var(--text-primary)",
        },

        // Lists
        "& ul, & ol": {
          paddingLeft: "1.5rem",
          marginBottom: "1.25rem",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
        },
        "& li": {
          marginBottom: "0.5rem",
        },
        "& ul": {
          listStyleType: "disc",
        },
        "& ol": {
          listStyleType: "decimal",
        },

        // Blockquotes
        "& blockquote": {
          borderLeft: "4px solid var(--glow-cyan)",
          paddingLeft: "1.25rem",
          marginLeft: 0,
          marginBottom: "1.25rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
          backgroundColor: "var(--overlay-subtle)",
          padding: "1rem 1.25rem",
          borderRadius: "0 8px 8px 0",
        },
        "& blockquote p": {
          marginBottom: 0,
        },

        // Horizontal rules
        "& hr": {
          border: "none",
          borderTop: "1px solid var(--overlay-medium)",
          margin: "2rem 0",
        },

        // Tables
        "& table": {
          width: "100%",
          marginBottom: "1.5rem",
          borderCollapse: "collapse",
          fontSize: "0.95rem",
        },
        "& th, & td": {
          padding: "0.75rem 1rem",
          textAlign: "left",
          borderBottom: "1px solid var(--overlay-subtle)",
        },
        "& th": {
          color: "var(--text-primary)",
          fontWeight: 600,
          backgroundColor: "var(--bg-secondary)",
        },
        "& td": {
          color: "var(--text-secondary)",
        },
        "& tr:hover td": {
          backgroundColor: "var(--overlay-subtle)",
        },

        // Images
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        },

        // Strong and emphasis
        "& strong": {
          color: "var(--text-primary)",
          fontWeight: 600,
        },
        "& em": {
          fontStyle: "italic",
        },

        // Task lists (GFM)
        "& input[type='checkbox']": {
          marginRight: "0.5rem",
          accentColor: "var(--glow-cyan)",
        },

        // Syntax highlighting (highlight.js theme overrides)
        "& .hljs-keyword": { color: "var(--soft-lavender)" },
        "& .hljs-string": { color: "var(--glow-cyan)" },
        "& .hljs-number": { color: "var(--warm-coral)" },
        "& .hljs-comment": { color: "var(--text-secondary)", fontStyle: "italic" },
        "& .hljs-function": { color: "var(--glow-cyan)" },
        "& .hljs-title": { color: "var(--soft-lavender)" },
        "& .hljs-attr": { color: "var(--warm-coral)" },
        "& .hljs-variable": { color: "var(--text-primary)" },
        "& .hljs-built_in": { color: "var(--glow-cyan)" },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
