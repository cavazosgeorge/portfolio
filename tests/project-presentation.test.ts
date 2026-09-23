import { expect, test } from "bun:test";
import { selectProjects } from "../src/lib/project-presentation";
import type { Project } from "../src/hooks/useContent";
function project(id: string, featured: boolean, draft = false): Project {
  return {
    id,
    title: id,
    description: id,
    tags: [],
    featured,
    draft,
    sort_order: 0,
  };
}
test("preserves the curated first-three spotlight, archived featured entries, and source order", () => {
  const data = [
    project("a", true),
    project("private", true, true),
    project("b", true),
    project("c", true),
    project("d", true),
    project("e", false),
  ];
  const original = JSON.stringify(data);
  const result = selectProjects(data);
  expect(result.featured.map((p) => p.id)).toEqual(["a", "b", "c"]);
  expect(result.archive.map((p) => p.id)).toEqual(["d", "e"]);
  expect(JSON.stringify(data)).toBe(original);
  expect(result.archive[0].featured).toBe(true);
});
test("handles no featured projects and all-draft collections without promoting records", () => {
  expect(selectProjects([project("a", false)]).featured).toEqual([]);
  expect(
    selectProjects([project("a", false)]).archive.map((p) => p.id),
  ).toEqual(["a"]);
  expect(selectProjects([project("private", true, true)]).published).toEqual(
    [],
  );
  expect(selectProjects([])).toEqual({
    published: [],
    featured: [],
    archive: [],
  });
});
