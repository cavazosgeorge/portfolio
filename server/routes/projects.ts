import { Hono } from "hono";
import { db } from "../db";

const projects = new Hono();

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  tags: string;
  link: string | null;
  github: string | null;
  image: string | null;
  featured: number;
  draft: number;
  sort_order: number;
}

// Get all projects
projects.get("/", (c) => {
  const rows = db
    .query("SELECT * FROM projects ORDER BY featured DESC, sort_order ASC")
    .all() as ProjectRow[];

  const data = rows.map((row) => ({
    ...row,
    tags: JSON.parse(row.tags),
    featured: Boolean(row.featured),
    draft: Boolean(row.draft),
  }));

  return c.json(data);
});

// Get single project
projects.get("/:id", (c) => {
  const { id } = c.req.param();
  const row = db.query("SELECT * FROM projects WHERE id = ?").get(id) as ProjectRow | undefined;

  if (!row) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({
    ...row,
    tags: JSON.parse(row.tags),
    featured: Boolean(row.featured),
    draft: Boolean(row.draft),
  });
});

// Create project
projects.post("/", async (c) => {
  const body = await c.req.json();
  const { id, title, description, tags, link, github, image, featured, draft, sort_order } = body;

  db.run(
    `INSERT INTO projects (id, title, description, tags, link, github, image, featured, draft, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      title,
      description,
      JSON.stringify(tags),
      link || null,
      github || null,
      image || null,
      featured ? 1 : 0,
      (draft ?? false) ? 1 : 0,
      sort_order ?? 0,
    ]
  );

  return c.json({ success: true, id }, 201);
});

// Update project
projects.put("/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const { title, description, tags, link, github, image, featured, draft, sort_order } = body;

  const result = db.run(
    `UPDATE projects
     SET title = ?, description = ?, tags = ?, link = ?, github = ?, image = ?, featured = ?, draft = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      title,
      description,
      JSON.stringify(tags),
      link || null,
      github || null,
      image || null,
      featured ? 1 : 0,
      (draft ?? false) ? 1 : 0,
      sort_order ?? 0,
      id,
    ]
  );

  if (result.changes === 0) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ success: true });
});

// Delete project
projects.delete("/:id", (c) => {
  const { id } = c.req.param();
  const result = db.run("DELETE FROM projects WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ success: true });
});

// Reorder projects
projects.post("/reorder", async (c) => {
  const body = await c.req.json();
  const { order } = body; // Array of { id, sort_order }

  const stmt = db.query("UPDATE projects SET sort_order = ? WHERE id = ?");
  db.transaction(() => {
    for (const item of order as { id: string; sort_order: number }[]) {
      stmt.run(item.sort_order, item.id);
    }
  })();

  return c.json({ success: true });
});

export { projects };
