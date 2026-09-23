import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Hero() {
  return (
    <section id="top" className="hero page-shell">
      <div className="hero-main">
        <p className="role-label">Lead AI Engineer</p>
        <h1>
          Building reliable AI systems for real-world engineering.
        </h1>
        <p className="hero-intro">
          I lead the technical team building AI-powered applications for Pfizer's
          Kalamazoo manufacturing site, with hands-on work across agentic AI,
          secure OT/IT integration, and full-stack software.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg">
            <a href="#projects">
              View selected work
              <ArrowDown data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#writing">Read selected writing</a>
          </Button>
        </div>
      </div>
      <aside className="hero-context" aria-label="Professional focus">
        <span className="context-mark" aria-hidden="true">
          gc.
        </span>
        <dl>
          <div>
            <dt>Current role</dt>
            <dd>Lead AI Engineer at Pfizer</dd>
          </div>
          <div>
            <dt>Core focus</dt>
            <dd>Agentic AI + secure OT/IT</dd>
          </div>
          <div>
            <dt>Built end to end</dt>
            <dd>AI, data + full-stack products</dd>
          </div>
        </dl>
        <a href="#experience" className="text-link">
          Explore my experience
        </a>
      </aside>
    </section>
  );
}
