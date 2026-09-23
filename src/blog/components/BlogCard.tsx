import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { type BlogSummary } from "@/hooks/useContent";
import { formatDate } from "@/lib/urls";
export function BlogCard({ post, href }: { post: BlogSummary; href?: string }) {
  const date = post.published_at || post.created_at;
  const content = (
    <>
      <time dateTime={date}>{formatDate(date)}</time>
      <div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
      <ArrowUpRight className="writing-arrow" aria-hidden="true" />
    </>
  );
  return href ? (
    <a className="writing-item" href={href}>
      {content}
    </a>
  ) : (
    <Link className="writing-item" to={`/${post.id}`}>
      {content}
    </Link>
  );
}
