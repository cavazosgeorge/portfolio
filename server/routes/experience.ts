import { Hono } from "hono";
import { db } from "../db";

const experience = new Hono();

interface ExperienceRow {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string | null;
  sort_order: number;
}

// Get all experience
experience.get("/", (c) => {
  const rows = db
    .query("SELECT * FROM experience ORDER BY sort_order ASC")
    .all() as ExperienceRow[];

  const data = rows.map((row) => ({
    ...row,
    technologies: row.technologies ? JSON.parse(row.technologies) : [],
  }));

  return c.json(data);
});

// Get single experience
experience.get("/:id", (c) => {
  const { id } = c.req.param();
  const row = db.query("SELECT * FROM experience WHERE id = ?").get(id) as ExperienceRow | undefined;

  if (!row) {
    return c.json({ error: "Experience not found" }, 404);
  }

  return c.json({
    ...row,
    technologies: row.technologies ? JSON.parse(row.technologies) : [],
  });
});

// Create experience
experience.post("/", async (c) => {
  const body = await c.req.json();
  const { id, role, company, period, description, technologies, sort_order } = body;

  db.run(
    `INSERT INTO experience (id, role, company, period, description, technologies, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      role,
      company,
      period,
      description,
      technologies ? JSON.stringify(technologies) : null,
      sort_order ?? 0,
    ]
  );

  return c.json({ success: true, id }, 201);
});

// Update experience
experience.put("/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const { role, company, period, description, technologies, sort_order } = body;

  const result = db.run(
    `UPDATE experience
     SET role = ?, company = ?, period = ?, description = ?, technologies = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      role,
      company,
      period,
      description,
      technologies ? JSON.stringify(technologies) : null,
      sort_order ?? 0,
      id,
    ]
  );

  if (result.changes === 0) {
    return c.json({ error: "Experience not found" }, 404);
  }

  return c.json({ success: true });
});

// Delete experience with empty ID (cleanup route)
experience.delete("/", (c) => {
  const result = db.run("DELETE FROM experience WHERE id = ''", []);

  if (result.changes === 0) {
    return c.json({ error: "No empty experience found" }, 404);
  }

  return c.json({ success: true, deleted: result.changes });
});

// Delete experience
experience.delete("/:id", (c) => {
  const { id } = c.req.param();
  const result = db.run("DELETE FROM experience WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Experience not found" }, 404);
  }

  return c.json({ success: true });
});

// Reorder experience
experience.post("/reorder", async (c) => {
  const body = await c.req.json();
  const { order } = body;

  const stmt = db.query("UPDATE experience SET sort_order = ? WHERE id = ?");
  db.transaction(() => {
    for (const item of order as { id: string; sort_order: number }[]) {
      stmt.run(item.sort_order, item.id);
    }
  })();

  return c.json({ success: true });
});

export { experience };
