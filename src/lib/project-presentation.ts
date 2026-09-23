import type { Project } from "@/hooks/useContent";
// Keep the existing three-project spotlight and the API's curated ordering.
export function selectProjects(data: Project[]) {
  const published = data.filter((project) => !project.draft);
  const featured = published.filter((project) => project.featured).slice(0, 3);
  const ids = new Set(featured.map((project) => project.id));
  return {
    published,
    featured,
    archive: published.filter((project) => !ids.has(project.id)),
  };
}
