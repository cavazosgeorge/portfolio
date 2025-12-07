import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { getSession, getUserById } from "../auth";

export async function requireAuth(c: Context, next: Next) {
  const sessionId = getCookie(c, "session");

  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const session = getSession(sessionId);
  if (!session) {
    return c.json({ error: "Session expired" }, 401);
  }

  const user = getUserById(session.userId);
  if (!user) {
    return c.json({ error: "User not found" }, 401);
  }

  c.set("user", user);
  await next();
}
