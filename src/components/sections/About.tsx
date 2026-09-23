import { useSetting, useSkills } from "@/hooks/useContent";
import { Badge } from "@/components/ui/badge";
import { ContentState } from "@/components/layout/ContentState";
const capabilities = [
  {
    category: "devops",
    title: "Industrial systems & delivery",
    description:
      "Operational infrastructure, automation platforms, and dependable paths to production.",
  },
  {
    category: "ai",
    title: "AI & data systems",
    description:
      "Useful intelligence grounded in clear data flows, observable behavior, and real constraints.",
  },
  {
    category: "backend",
    title: "Application architecture",
    description:
      "APIs, services, and data models designed to remain understandable as products grow.",
  },
  {
    category: "frontend",
    title: "Product engineering",
    description:
      "Focused interfaces that make complex systems legible, efficient, and pleasant to use.",
  },
];
export function About() {
  const {
    data: skills,
    loading: skillsLoading,
    error: skillsError,
    refetch: retrySkills,
  } = useSkills();
  const { data, loading, error, refetch } = useSetting("about");
  const paragraphs = data?.paragraphs.filter((p) => p.trim()) || [];
  const visibleParagraphs = [
    paragraphs[0],
    paragraphs.find(
      (p, i) => i > 0 && /climb|gym|physique|outside|not coding/i.test(p),
    ) || paragraphs[1],
  ].filter(Boolean);
  return (
    <section id="about" className="section page-shell">
      <div className="split-section">
        <div className="section-heading-block">
          <p className="section-label">About / Approach</p>
          {data && (
            <h2>
              {data.heading} {data.subheading}
            </h2>
          )}
        </div>
        <div>
          <ContentState
            loading={loading && !data}
            error={error}
            empty={!data}
            retry={refetch}
          />
          <div className="about-copy">
            {visibleParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="capabilities">
        <h3>Capabilities</h3>
        <ContentState
          loading={skillsLoading && !skills.length}
          error={skillsError}
          empty={!skills.length}
          retry={retrySkills}
        />
        <div className="capability-grid">
          {capabilities.map((c) => (
            <article key={c.category}>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <div className="tag-list">
                {skills
                  .filter((s) => s.category === c.category)
                  .slice(0, 5)
                  .map((s) => (
                    <Badge variant="outline" key={s.id}>
                      {s.name}
                    </Badge>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
