import { Database } from "bun:sqlite";
import { readFileSync, readdirSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const DB_PATH = process.env.DB_PATH || "./data/portfolio.db";

// Ensure data directory exists
mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH, { create: true });

// Enable WAL mode for better concurrent access
db.exec("PRAGMA journal_mode = WAL");

// Run migrations
export function runMigrations() {
  // Create migrations tracking table
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrationsDir = join(import.meta.dir, "migrations");

  let migrationFiles: string[];
  try {
    migrationFiles = readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();
  } catch {
    console.log("No migrations directory found, skipping migrations");
    return;
  }

  const applied = new Set(
    db
      .query("SELECT name FROM _migrations")
      .all()
      .map((row) => (row as { name: string }).name)
  );

  for (const file of migrationFiles) {
    if (applied.has(file)) continue;

    console.log(`Running migration: ${file}`);
    const sql = readFileSync(join(migrationsDir, file), "utf-8");

    db.transaction(() => {
      db.exec(sql);
      db.run("INSERT INTO _migrations (name) VALUES (?)", [file]);
    })();
  }
}
