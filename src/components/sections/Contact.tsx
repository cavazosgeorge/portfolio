import { Box, Button, Container, Flex, Input, Link, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSetting } from "../../hooks/useContent";

const DEFAULT_CONTACT = {
  heading: "Get in touch",
  email: "",
  github: "https://github.com/cavazosgeorge",
  linkedin: "",
};

const inputStyles = {
  bg: "var(--bg-secondary)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "10px",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "md",
  px: 4,
  py: 3,
  _placeholder: { color: "var(--text-tertiary)" },
  _hover: { borderColor: "var(--border-strong)" },
  _focus: { borderColor: "var(--accent-primary)", boxShadow: "none", outline: "none" },
  _focusVisible: { borderColor: "var(--accent-primary)", boxShadow: "0 0 0 3px var(--accent-soft)", outline: "none" },
  transition: "border-color 160ms ease, box-shadow 160ms ease",
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { data: contactData } = useSetting("contact");
  const contact = contactData || DEFAULT_CONTACT;

  const socialLinks = [
    { name: "GitHub", href: contact.github },
    { name: "LinkedIn", href: contact.linkedin },
    { name: "Email", href: contact.email ? `mailto:${contact.email}` : "" },
  ].filter((link) => Boolean(link.href));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or use one of the links below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="section" id="contact" pt="var(--section-padding)" pb={{ base: 8, md: 10 }}>
      <Container maxW="container.lg">
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 0.8fr) minmax(420px, 1.2fr)" }}
          gap={{ base: 12, lg: 20 }}
          alignItems="start"
        >
          <Box>
            <Text className="section-kicker">{contact.heading}</Text>
            <Text as="h2" className="section-title">
              Let’s build something useful.
            </Text>
            <Text mt={5} maxW="520px" color="var(--text-secondary)" fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">
              Have a project, technical challenge, or idea worth exploring? Send a note and tell me what you are working on.
            </Text>

            {socialLinks.length > 0 && (
              <Flex mt={8} gap={6} flexWrap="wrap">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    color="var(--accent-primary)"
                    fontFamily="var(--font-mono)"
                    fontSize="sm"
                    fontWeight="600"
                    textDecoration="none"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {link.name} ↗
                  </Link>
                ))}
              </Flex>
            )}
          </Box>

          {submitted ? (
            <Box
              role="status"
              border="1px solid var(--accent-primary)"
              borderRadius="12px"
              bg="var(--accent-soft)"
              p={{ base: 7, md: 9 }}
            >
              <Text as="h3" fontFamily="var(--font-display)" fontSize="2xl" fontWeight="600">
                Message sent.
              </Text>
              <Text mt={2} color="var(--text-secondary)">
                Thanks for reaching out. I’ll get back to you soon.
              </Text>
            </Box>
          ) : (
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg="var(--surface-primary)"
              border="1px solid var(--border-subtle)"
              borderRadius="12px"
              p={{ base: 6, md: 8 }}
            >
              <VStack gap={5} align="stretch">
                <Flex direction={{ base: "column", md: "row" }} gap={5}>
                  <Box flex={1}>
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      {...inputStyles}
                    />
                  </Box>
                  <Box flex={1}>
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      {...inputStyles}
                    />
                  </Box>
                </Flex>

                <Box>
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="What are you building?"
                    rows={6}
                    required
                    resize="vertical"
                    value={formData.message}
                    onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                    {...inputStyles}
                  />
                </Box>

                {error && (
                  <Text role="alert" color="var(--danger-text)" fontSize="sm">
                    {error}
                  </Text>
                )}

                <Button
                  type="submit"
                  alignSelf="flex-start"
                  bg="var(--accent-primary)"
                  color="var(--accent-contrast)"
                  borderRadius="8px"
                  px={6}
                  py={5}
                  fontWeight="700"
                  disabled={isSubmitting}
                  _hover={{ bg: "var(--accent-hover)" }}
                  _focus={{ boxShadow: "none" }}
                  _focusVisible={{ outline: "3px solid var(--accent-soft)", outlineOffset: "3px", boxShadow: "none" }}
                  transition="background-color 160ms ease"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </VStack>
            </Box>
          )}
        </Box>

        <Flex
          mt={{ base: 16, md: 24 }}
          pt={6}
          borderTop="1px solid var(--border-subtle)"
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={3}
          color="var(--text-tertiary)"
          fontFamily="var(--font-mono)"
          fontSize="xs"
        >
          <Text>© {new Date().getFullYear()} George Cavazos</Text>
          <Text>Designed for clarity. Built for the long run.</Text>
        </Flex>
      </Container>
    </Box>
  );
}
