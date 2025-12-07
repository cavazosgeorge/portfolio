import { db } from "./db";

// Simple session-based auth without Better Auth for now
// Using Bun's native SQLite which is incompatible with Better Auth's better-sqlite3 adapter

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession(userId: number): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();

  db.run(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
    [sessionId, userId, expiresAt]
  );

  return sessionId;
}

export function getSession(sessionId: string): { userId: number } | null {
  const session = db.query(
    "SELECT user_id, expires_at FROM sessions WHERE id = ?"
  ).get(sessionId) as { user_id: number; expires_at: string } | undefined;

  if (!session) return null;

  // Check if expired
  if (new Date(session.expires_at) < new Date()) {
    db.run("DELETE FROM sessions WHERE id = ?", [sessionId]);
    return null;
  }

  return { userId: session.user_id };
}

export function deleteSession(sessionId: string): void {
  db.run("DELETE FROM sessions WHERE id = ?", [sessionId]);
}

export async function verifyPassword(email: string, password: string): Promise<number | null> {
  const user = db.query(
    "SELECT id, password_hash FROM users WHERE email = ?"
  ).get(email) as { id: number; password_hash: string } | undefined;

  if (!user) return null;

  const valid = await Bun.password.verify(password, user.password_hash);
  return valid ? user.id : null;
}

export function getUserById(id: number): { id: number; email: string } | null {
  const user = db.query(
    "SELECT id, email FROM users WHERE id = ?"
  ).get(id) as { id: number; email: string } | undefined;

  return user || null;
}
