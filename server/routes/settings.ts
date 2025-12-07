import { Hono } from "hono";
import { db } from "../db";

const settings = new Hono();

interface SettingRow {
  key: string;
  value: string;
  updated_at: string;
}

// Get all settings
settings.get("/", (c) => {
  const rows = db.query("SELECT * FROM site_settings").all() as SettingRow[];

  const data: Record<string, unknown> = {};
  for (const row of rows) {
    data[row.key] = JSON.parse(row.value);
  }

  return c.json(data);
});

// Get single setting
settings.get("/:key", (c) => {
  const { key } = c.req.param();
  const row = db.query("SELECT * FROM site_settings WHERE key = ?").get(key) as SettingRow | undefined;

  if (!row) {
    return c.json({ error: "Setting not found" }, 404);
  }

  return c.json(JSON.parse(row.value));
});

// Update setting
settings.put("/:key", async (c) => {
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

export { settings };
