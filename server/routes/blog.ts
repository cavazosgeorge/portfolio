import { Hono } from "hono";
import { db } from "../db";

const blog = new Hono();

interface BlogPostRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  featured: number;
  draft: number;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Get all published blog posts (without content for listing)
blog.get("/", (c) => {
  const rows = db
    .query(
      `SELECT id, title, excerpt, tags, featured, draft, sort_order, published_at, created_at, updated_at
       FROM blog_posts
       WHERE draft = 0
       ORDER BY featured DESC, published_at DESC, created_at DESC`
    )
    .all() as Omit<BlogPostRow, "content">[];

  const data = rows.map((row) => ({
    ...row,
    tags: JSON.parse(row.tags),
    featured: Boolean(row.featured),
    draft: Boolean(row.draft),
  }));

  return c.json(data);
});

// Get single blog post by slug (includes content)
blog.get("/:id", (c) => {
  const { id } = c.req.param();
  const row = db
    .query("SELECT * FROM blog_posts WHERE id = ? AND draft = 0")
    .get(id) as BlogPostRow | undefined;

  if (!row) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({
    ...row,
    tags: JSON.parse(row.tags),
    featured: Boolean(row.featured),
    draft: Boolean(row.draft),
  });
});

export { blog };
