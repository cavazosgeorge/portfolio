import { useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { useSetting } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ContentState } from "@/components/layout/ContentState";
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const {
    data: contact,
    loading,
    error: contactError,
    refetch,
  } = useSetting("contact");
  const links = [
    { name: "GitHub", href: contact?.github },
    { name: "LinkedIn", href: contact?.linkedin },
    { name: "Email", href: contact?.email ? `mailto:${contact.email}` : "" },
  ].filter((l) => l.href);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error();
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError(
        "Your message could not be sent. Please try again or use one of the contact links.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section id="contact" className="section section-tint">
      <div className="page-shell">
        <div className="contact-grid">
          <div className="section-heading-block">
            <p className="section-label">
              {contact?.heading || "Get in touch"}
            </p>
            <h2>Let’s build something useful.</h2>
            <p>
              Have a project, technical challenge, or idea worth exploring? Send
              a note and tell me what you are working on.
            </p>
            <div className="social-links">
              {links.map((l) => (
                <Button asChild variant="outline" key={l.name}>
                  <a
                    href={l.href}
                    target={l.href?.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {l.name}
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
            {contactError && (
              <ContentState
                loading={loading}
                error={contactError}
                empty={false}
                retry={refetch}
              />
            )}
          </div>
          {submitted ? (
            <Alert role="status">
              <Check aria-hidden="true" />
              <AlertTitle>Message sent.</AlertTitle>
              <AlertDescription>
                Thanks for reaching out. I’ll get back to you soon.
              </AlertDescription>
            </Alert>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              aria-label="Contact George"
              aria-busy={isSubmitting}
            >
              <FieldGroup>
                <FieldGroup className="contact-name-row">
                  <Field>
                    <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((v) => ({ ...v, name: e.target.value }))
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((v) => ({ ...v, email: e.target.value }))
                      }
                    />
                  </Field>
                </FieldGroup>
                <Field>
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="What are you building?"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((v) => ({ ...v, message: e.target.value }))
                    }
                  />
                </Field>
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Message not sent</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="self-start"
                >
                  {isSubmitting && (
                    <LoaderCircle
                      data-icon="inline-start"
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </FieldGroup>
            </form>
          )}
        </div>
        <footer className="site-footer">
          <Separator />
          <div>
            <span>© {new Date().getFullYear()} George Cavazos</span>
            <span>Designed for clarity. Built for the long run.</span>
            <a href="#top" className="text-link">
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
