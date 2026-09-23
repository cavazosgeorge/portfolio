import { selectProjects } from "@/lib/project-presentation";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useState } from "react";
import { useProjects, type Project } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ContentState } from "@/components/layout/ContentState";
const previews: Record<string, string> = {
  pocketops: "/images/projects/pocketops.webp",
  "basecamp-glacier": "/images/projects/basecamp-glacier.webp",
  outpost: "/images/projects/outpost.webp",
};
function ProjectImage({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.image || previews[project.id];
  if (!src || failed)
    return (
      <div className="project-placeholder">
        <Code2 aria-hidden="true" />
        <span>{project.title}</span>
      </div>
    );
  return (
    <img
      src={src}
      alt={`${project.title} interface preview`}
      width={1280}
      height={720}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.link && (
        <Button asChild variant="default">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live: ${project.title} (new tab)`}
          >
            View live
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </a>
        </Button>
      )}
      {project.github && (
        <Button asChild variant="outline">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source: ${project.title} (new tab)`}
          >
            Source
            <Code2 data-icon="inline-end" aria-hidden="true" />
          </a>
        </Button>
      )}
    </>
  );
}
export function Projects() {
  const { data, loading, error, refetch } = useProjects();
  const { published, featured, archive } = selectProjects(data);
  return (
    <section id="projects" className="section page-shell">
      <div className="section-heading">
        <div>
          <p className="section-label">Selected work</p>
          <h2>Systems that make complex work feel clear.</h2>
        </div>
        <p>
          A focused selection spanning real-time visualization, clinical AI, and
          visual knowledge tools.
        </p>
      </div>
      <ContentState
        loading={loading && !data.length}
        error={error}
        empty={!published.length}
        retry={refetch}
      />
      <div className="project-stack">
        {featured.map((project) => (
          <article key={project.id} aria-label={project.title}>
            <Card className="project-card">
              <div className="project-preview">
                <ProjectImage project={project} />
                <span className="preview-caption">
                  {project.title} ·{" "}
                  {previews[project.id] && !project.image
                    ? "Public demo"
                    : "Project preview"}
                </span>
              </div>
              <div className="project-details">
                <CardHeader>
                  <CardTitle>
                    <h3>{project.title}</h3>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="tag-list">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <ProjectLinks project={project} />
                </CardFooter>
              </div>
            </Card>
          </article>
        ))}
      </div>
      {archive.length > 0 && (
        <div className="archive">
          <div className="archive-heading">
            <h3>Project archive</h3>
            <span>{archive.length} more projects</span>
          </div>
          <div className="archive-grid">
            {archive.map((project) => (
              <article key={project.id} className="archive-project">
                <div className="archive-title">
                  <h4>{project.title}</h4>
                  {project.link && (
                    <Button asChild variant="ghost" size="icon">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} (new tab)`}
                      >
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                </div>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {project.github && (
                  <Button asChild variant="link">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title} source
                    </a>
                  </Button>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
