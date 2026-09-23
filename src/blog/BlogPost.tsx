import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContentState } from "@/components/layout/ContentState";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { formatDate } from "@/lib/urls";
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
function normalizeIntroText(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "")
    .toLocaleLowerCase();
}

function withoutDuplicateIntro(
  content: string,
  title: string,
  excerpt: string,
) {
  const lines = content.split("\n");
  let firstContentLine = lines.findIndex((line) => line.trim().length > 0);

  if (firstContentLine === -1) return content;

  const headingMatch = lines[firstContentLine].trim().match(/^#\s+(.+?)\s*#*$/);
  const headingMatchesTitle =
    headingMatch &&
    normalizeIntroText(headingMatch[1]) === normalizeIntroText(title);

  if (headingMatchesTitle) {
    lines.splice(firstContentLine, 1);
  } else if (headingMatch) {
    firstContentLine += 1;
  }

  while (lines[firstContentLine]?.trim() === "") {
    lines.splice(firstContentLine, 1);
  }

  if (
    excerpt &&
    normalizeIntroText(lines[firstContentLine] || "") ===
      normalizeIntroText(excerpt)
  ) {
    lines.splice(firstContentLine, 1);
    while (lines[firstContentLine]?.trim() === "") {
      lines.splice(firstContentLine, 1);
    }
  }

  return lines.join("\n");
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = post
      ? `${post.title} | George Cavazos`
      : "Writing | George Cavazos";
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
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError(
          fetchError instanceof Error ? fetchError.message : "Post not found",
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  if (loading)
    return (
      <div className="page-shell article-shell">
        <ContentState
          loading
          error={null}
          empty={false}
          retry={() => window.location.reload()}
        />
      </div>
    );
  if (error || !post)
    return (
      <div className="page-shell article-shell">
        <h1>Post not found</h1>
        <p>The post you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="outline">
          <Link to="/">Back to blog</Link>
        </Button>
      </div>
    );
  const date = post.published_at || post.created_at;
  return (
    <article className="page-shell article-shell">
      <Button asChild variant="ghost">
        <Link to="/">
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          All writing
        </Link>
      </Button>
      <header className="article-header">
        <time dateTime={date}>{formatDate(date)}</time>
        <h1>{post.title}</h1>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="tag-list">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <Separator />
      <MarkdownRenderer
        content={withoutDuplicateIntro(post.content, post.title, post.excerpt)}
      />
      <Separator />
      <footer className="article-footer">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            All writing
          </Link>
        </Button>
        <span>Last updated: {formatDate(post.updated_at)}</span>
      </footer>
    </article>
  );
}
