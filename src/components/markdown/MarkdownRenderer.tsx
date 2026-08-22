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
        color: "var(--text-secondary)",
        fontSize: "1.075rem",
        lineHeight: 1.78,
        overflowWrap: "break-word",

        "& > :first-child": {
          marginTop: 0,
        },
        "& > :last-child": {
          marginBottom: 0,
        },

        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: "var(--text-primary)",
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          scrollMarginTop: "6rem",
        },
        "& h1": {
          fontSize: "clamp(2rem, 5vw, 2.75rem)",
          marginTop: "3.5rem",
          marginBottom: "1.25rem",
        },
        "& h2": {
          fontSize: "clamp(1.65rem, 4vw, 2.1rem)",
          marginTop: "3.5rem",
          marginBottom: "1.1rem",
        },
        "& h3": {
          fontSize: "1.45rem",
          marginTop: "2.75rem",
          marginBottom: "0.9rem",
        },
        "& h4, & h5, & h6": {
          fontSize: "1.15rem",
          marginTop: "2.25rem",
          marginBottom: "0.75rem",
        },

        "& p": {
          marginBottom: "1.5rem",
          color: "var(--text-secondary)",
        },

        "& a": {
          color: "var(--accent-primary)",
          fontWeight: 500,
          textDecoration: "underline",
          textDecorationThickness: "0.08em",
          textUnderlineOffset: "0.2em",
          transition: "text-decoration-color 160ms ease",
          "&:hover": {
            textDecorationThickness: "0.12em",
          },
          "&:focus-visible": {
            outline: "2px solid var(--accent-primary)",
            outlineOffset: "3px",
          },
        },

        "& code:not(pre code)": {
          fontFamily: "var(--font-mono)",
          backgroundColor: "var(--accent-soft)",
          padding: "0.18em 0.38em",
          borderRadius: "3px",
          fontSize: "0.88em",
          color: "var(--text-primary)",
        },

        "& pre": {
          backgroundColor: "var(--accent-soft)",
          padding: "1.25rem 1.35rem",
          borderRadius: "6px",
          overflow: "auto",
          margin: "2rem 0",
          border: "1px solid var(--border-subtle)",
        },
        "& pre code": {
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          backgroundColor: "transparent",
          padding: 0,
          color: "var(--text-primary)",
        },

        "& ul, & ol": {
          paddingLeft: "1.4rem",
          marginBottom: "1.5rem",
          color: "var(--text-secondary)",
        },
        "& li": {
          marginBottom: "0.55rem",
        },
        "& li::marker": {
          color: "var(--accent-primary)",
        },
        "& ul": {
          listStyleType: "disc",
        },
        "& ol": {
          listStyleType: "decimal",
        },

        "& blockquote": {
          borderLeft: "2px solid var(--accent-primary)",
          paddingLeft: "1.5rem",
          marginLeft: 0,
          marginTop: "2rem",
          marginBottom: "2rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
        },
        "& blockquote p": {
          marginBottom: 0,
        },

        "& hr": {
          border: "none",
          borderTop: "1px solid var(--border-subtle)",
          margin: "3rem 0",
        },

        "& table": {
          display: "block",
          width: "100%",
          overflowX: "auto",
          margin: "2rem 0",
          borderCollapse: "collapse",
          fontSize: "0.925rem",
        },
        "& th, & td": {
          padding: "0.75rem",
          textAlign: "left",
          borderBottom: "1px solid var(--border-subtle)",
        },
        "& th": {
          color: "var(--text-primary)",
          fontWeight: 600,
          backgroundColor: "var(--accent-soft)",
        },
        "& td": {
          color: "var(--text-secondary)",
        },

        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: "4px",
          margin: "2rem 0",
          border: "1px solid var(--border-subtle)",
        },

        "& strong": {
          color: "var(--text-primary)",
          fontWeight: 600,
        },
        "& em": {
          fontStyle: "italic",
        },

        "& input[type='checkbox']": {
          marginRight: "0.5rem",
          accentColor: "var(--accent-primary)",
        },

        "& .hljs-keyword": { color: "var(--accent-primary)" },
        "& .hljs-string": { color: "var(--text-primary)" },
        "& .hljs-number": { color: "var(--accent-primary)" },
        "& .hljs-comment": { color: "var(--text-secondary)", fontStyle: "italic" },
        "& .hljs-function": { color: "var(--accent-primary)" },
        "& .hljs-title": { color: "var(--text-primary)" },
        "& .hljs-attr": { color: "var(--accent-primary)" },
        "& .hljs-variable": { color: "var(--text-primary)" },
        "& .hljs-built_in": { color: "var(--accent-primary)" },
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
