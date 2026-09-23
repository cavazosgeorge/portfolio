/** Read-only deployed API/asset smoke check; browser QA remains required. */
const base = (process.argv[2] || "https://www.cavazosgeorge.com").replace(
  /\/$/,
  "",
);
async function read(path: string) {
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res;
}
const html = await (await read("/")).text();
if (!html.includes("George Cavazos | Lead AI Engineer"))
  throw new Error("SEO title missing");
const assets = Array.from(
  html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g),
  (m) => m[1],
);
for (const path of assets) await read(path);
for (const path of [
  "/health",
  "/api/projects",
  "/api/experience",
  "/api/skills",
  "/api/settings",
  "/api/blog",
]) {
  const data = await (await read(path)).json();
  console.log(path, Array.isArray(data) ? `${data.length} records` : "ok");
}
for (const name of ["pocketops", "basecamp-glacier", "outpost"])
  await read(`/images/projects/${name}.webp`);
const auth = await fetch(base + "/api/auth/me");
if (auth.status !== 401)
  throw new Error(`Anonymous auth expected 401, got ${auth.status}`);
console.log(
  `Verified ${assets.length} entry assets, 3 previews, content APIs, SEO title and auth boundary on ${base}`,
);
export {};
