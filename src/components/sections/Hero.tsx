import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Hero() {
  return (
    <section id="top" className="hero page-shell">
      <div className="hero-main">
        <p className="role-label">Senior Automation IT/OT Engineer</p>
        <h1>
          Building reliable systems where industrial automation, data, and AI
          meet.
        </h1>
        <p className="hero-intro">
          I turn complex operational problems into dependable platforms, useful
          data, and thoughtful software people can trust.
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
            <dd>Senior Engineer at Pfizer</dd>
          </div>
          <div>
            <dt>Core focus</dt>
            <dd>Industrial automation + IT/OT</dd>
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
