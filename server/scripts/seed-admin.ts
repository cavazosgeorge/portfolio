import { db, runMigrations } from "../db";

// Run migrations first
runMigrations();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
  console.log("Usage: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=yourpassword bun run db:seed-admin");
  process.exit(1);
}

// Hash password using Bun's built-in
const passwordHash = await Bun.password.hash(password, {
  algorithm: "bcrypt",
  cost: 10,
});

// Check if user already exists
const existing = db.query("SELECT id FROM users WHERE email = ?").get(email);

if (existing) {
  // Update password
  db.run("UPDATE users SET password_hash = ? WHERE email = ?", [passwordHash, email]);
  console.log(`Admin user ${email} password updated`);
} else {
  // Create new user
  db.run("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
  console.log(`Admin user ${email} created`);
}

process.exit(0);
