import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import { db, runMigrations } from "./db";
import { createSession, deleteSession, verifyPassword, getUserById } from "./auth";
import { requireAuth } from "./middleware/auth";
import { projects } from "./routes/projects";
import { experience } from "./routes/experience";
import { skills } from "./routes/skills";
import { settings } from "./routes/settings";

// Run migrations on startup
runMigrations();

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "/api/*",
  cors({
    origin: [process.env.APP_URL || "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// Auth routes
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();

  const userId = await verifyPassword(email, password);
  if (!userId) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const sessionId = await createSession(userId);
  const user = getUserById(userId);

  setCookie(c, "session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return c.json({ user });
});

app.post("/api/auth/logout", async (c) => {
  const sessionId = getCookie(c, "session");
  if (sessionId) {
    deleteSession(sessionId);
  }
  deleteCookie(c, "session");
  return c.json({ success: true });
});

app.get("/api/auth/me", requireAuth, (c) => {
  const user = c.get("user");
  return c.json({ user });
});

// Public API routes (read-only)
app.route("/api/projects", projects);
app.route("/api/experience", experience);
app.route("/api/skills", skills);
app.route("/api/settings", settings);

// Public contact form submission
app.post("/api/contact", async (c) => {
  const { name, email, message } = await c.req.json();

  if (!name || !email || !message) {
    return c.json({ error: "Name, email, and message are required" }, 400);
  }

  db.run(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message]
  );

  return c.json({ success: true }, 201);
});

// Protected admin routes
const admin = new Hono();
admin.use("*", requireAuth);

// Admin project routes
admin.post("/projects/reorder", async (c) => {
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

admin.post("/projects", async (c) => {
  const body = await c.req.json();
  const { id, title, description, tags, link, github, image, featured, sort_order } = body;

  db.run(
    `INSERT INTO projects (id, title, description, tags, link, github, image, featured, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      title,
      description,
      JSON.stringify(tags),
      link || null,
      github || null,
      image || null,
      featured ? 1 : 0,
      sort_order ?? 0,
    ]
  );

  return c.json({ success: true, id }, 201);
});

admin.put("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { title, description, tags, link, github, image, featured, sort_order } = body;

  const result = db.run(
    `UPDATE projects
     SET title = ?, description = ?, tags = ?, link = ?, github = ?, image = ?, featured = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      title,
      description,
      JSON.stringify(tags),
      link || null,
      github || null,
      image || null,
      featured ? 1 : 0,
      sort_order ?? 0,
      id,
    ]
  );

  if (result.changes === 0) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ success: true });
});

admin.delete("/projects/:id", (c) => {
  const id = c.req.param("id");
  const result = db.run("DELETE FROM projects WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ success: true });
});

// Admin experience routes
admin.post("/experience/reorder", async (c) => {
  const body = await c.req.json();
  const { order } = body; // Array of { id, sort_order }

  const stmt = db.query("UPDATE experience SET sort_order = ? WHERE id = ?");
  db.transaction(() => {
    for (const item of order as { id: string; sort_order: number }[]) {
      stmt.run(item.sort_order, item.id);
    }
  })();

  return c.json({ success: true });
});

admin.post("/experience", async (c) => {
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

admin.put("/experience/:id", async (c) => {
  const id = c.req.param("id");
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

// Delete experience with empty ID (cleanup route) - must come before /:id
admin.delete("/experience/", (c) => {
  const result = db.run("DELETE FROM experience WHERE id = ''", []);

  if (result.changes === 0) {
    return c.json({ error: "No empty experience found" }, 404);
  }

  return c.json({ success: true, deleted: result.changes });
});

admin.delete("/experience/:id", (c) => {
  const id = c.req.param("id");
  const result = db.run("DELETE FROM experience WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Experience not found" }, 404);
  }

  return c.json({ success: true });
});

// Admin skills routes
admin.post("/skills", async (c) => {
  const body = await c.req.json();
  const { name, category, sort_order } = body;

  const result = db.run(
    `INSERT INTO skills (name, category, sort_order) VALUES (?, ?, ?)`,
    [name, category, sort_order || 0]
  );

  return c.json({ success: true, id: result.lastInsertRowid }, 201);
});

admin.put("/skills/:id", async (c) => {
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

admin.delete("/skills/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const result = db.run("DELETE FROM skills WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Skill not found" }, 404);
  }

  return c.json({ success: true });
});

// Admin settings routes
admin.put("/settings/:key", async (c) => {
  const { key } = c.req.param();
  const body = await c.req.json();

  db.run(
    `INSERT INTO site_settings (key, value, updated_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [key, JSON.stringify(body)]
  );

  return c.json({ success: true });
});

// Admin messages routes
admin.get("/messages", (c) => {
  const messages = db
    .query(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`
    )
    .all();
  return c.json(messages);
});

admin.put("/messages/:id/read", (c) => {
  const id = parseInt(c.req.param("id"));
  const result = db.run("UPDATE contact_messages SET read = 1 WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Message not found" }, 404);
  }

  return c.json({ success: true });
});

admin.delete("/messages/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const result = db.run("DELETE FROM contact_messages WHERE id = ?", [id]);

  if (result.changes === 0) {
    return c.json({ error: "Message not found" }, 404);
  }

  return c.json({ success: true });
});

// Mount admin routes
app.route("/api/admin", admin);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use("/*", serveStatic({ root: "./dist" }));
  app.get("*", serveStatic({ path: "./dist/index.html" }));
}

const port = parseInt(process.env.PORT || "3000");

console.log(`Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
