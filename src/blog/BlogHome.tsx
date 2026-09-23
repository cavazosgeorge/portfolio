import { useEffect } from "react";
import { useBlogPosts } from "@/hooks/useContent";
import { ContentState } from "@/components/layout/ContentState";
import { BlogCard } from "./components/BlogCard";
export function BlogHome() {
  const { data, loading, error, refetch } = useBlogPosts();
  useEffect(() => {
    document.title = "Writing | George Cavazos";
  }, []);
  const published = data.filter((p) => !p.draft);
  const featured = published.filter((p) => p.featured);
  const regular = published.filter((p) => !p.featured);
  return (
    <div className="page-shell blog-home">
      <header className="blog-intro">
        <p className="section-label">Field notes</p>
        <h1>Notes on systems, software, and the work between them.</h1>
        <p>
          Practical writing about automation, AI, product engineering, and the
          decisions behind reliable technical work.
        </p>
      </header>
      <ContentState
        loading={loading && !data.length}
        error={error}
        empty={!published.length}
        retry={refetch}
      />
      {[
        { name: "Featured writing", posts: featured },
        {
          name: featured.length ? "All notes" : "Latest writing",
          posts: regular,
        },
      ].map(
        (group) =>
          group.posts.length > 0 && (
            <section
              className="writing-group"
              key={group.name}
              aria-label={group.name}
            >
              <div className="archive-heading">
                <h2>{group.name}</h2>
                <span>{group.posts.length} notes</span>
              </div>
              <div className="writing-list">
                {group.posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ),
      )}
    </div>
  );
}
