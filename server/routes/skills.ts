import { Hono } from "hono";
import { db } from "../db";

const skills = new Hono();

interface SkillRow {
  id: number;
  name: string;
  category: string;
  sort_order: number;
}

// Get all skills
skills.get("/", (c) => {
  const rows = db
    .query("SELECT * FROM skills ORDER BY category, sort_order ASC")
    .all() as SkillRow[];

  return c.json(rows);
});

// Get skills by category
skills.get("/category/:category", (c) => {
  const { category } = c.req.param();
  const rows = db
    .query("SELECT * FROM skills WHERE category = ? ORDER BY sort_order ASC")
    .all(category) as SkillRow[];

  return c.json(rows);
});

// Create skill
skills.post("/", async (c) => {
  const body = await c.req.json();
  const { name, category, sort_order } = body;

  const result = db.run(
    `INSERT INTO skills (name, category, sort_order) VALUES (?, ?, ?)`,
    [name, category, sort_order ?? 0]
  );

  return c.json({ success: true, id: result.lastInsertRowid }, 201);
});

// Update skill
skills.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const { name, category, sort_order } = body;

  const result = db.run(
    `UPDATE skills SET name = ?, category = ?, sort_order = ? WHERE id = ?`,
    [name, category, sort_order ?? 0, id]
  );

  if (result.changes === 0) {
    return c.json({ error: "Skill not found" }, 404);
  }

  return c.json({ success: true });
});

// Delete skill
skills.delete("/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const result = db.run("DELETE FROM skills WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Skill not found" }, 404);
  }

  return c.json({ success: true });
});

// Reorder skills
skills.post("/reorder", async (c) => {
  const body = await c.req.json();
  const { order } = body;

  const stmt = db.query("UPDATE skills SET sort_order = ? WHERE id = ?");
  db.transaction(() => {
    for (const item of order as { id: number; sort_order: number }[]) {
      stmt.run(item.sort_order, item.id);
    }
  })();

  return c.json({ success: true });
});

export { skills };
