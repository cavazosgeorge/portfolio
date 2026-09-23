import { useExperience } from "@/hooks/useContent";
import { Badge } from "@/components/ui/badge";
import { ContentState } from "@/components/layout/ContentState";
export function Experience() {
  const { data, loading, error, refetch } = useExperience();
  return (
    <section id="experience" className="section section-tint">
      <div className="page-shell split-section">
        <div className="section-heading-block">
          <p className="section-label">Experience</p>
          <h2>Building reliable systems, end to end.</h2>
          <p>
            Enterprise automation, infrastructure, product engineering, and AI
            delivery across regulated and fast-moving environments.
          </p>
        </div>
        <div className="experience-list">
          <ContentState
            loading={loading && !data.length}
            error={error}
            empty={!data.length}
            retry={refetch}
          />
          {data.map((item, index) => (
            <article key={item.id} className="experience-item">
              <div className="experience-meta">
                <span>{item.period}</span>
                {index === 0 && <Badge variant="secondary">Current</Badge>}
              </div>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.technologies.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
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
