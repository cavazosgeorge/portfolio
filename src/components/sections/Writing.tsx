import { ArrowUpRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { ContentState } from "@/components/layout/ContentState";
import { getBlogBaseUrl } from "@/lib/urls";
import { BlogCard } from "@/blog/components/BlogCard";
export function Writing() {
  const { data, loading, error, refetch } = useBlogPosts();
  const posts = data.filter((p) => !p.draft).slice(0, 3);
  return (
    <section id="writing" className="section page-shell">
      <div className="section-heading">
        <div>
          <p className="section-label">Writing</p>
          <h2>Notes from the workbench.</h2>
          <p>
            Practical write-ups on AI workflows, production templates, and the
            systems behind the work.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={getBlogBaseUrl()}>
            Browse all writing
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <ContentState
        loading={loading && !data.length}
        error={error}
        empty={!posts.length}
        retry={refetch}
      />
      <div className="writing-list">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            href={`${getBlogBaseUrl()}/${post.id}`}
          />
        ))}
      </div>
    </section>
  );
}
