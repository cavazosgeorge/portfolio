import { Box, Container, Text, VStack, Input, Textarea, Flex, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { MagneticElement } from "../animations/MagneticElement";
import { useSetting } from "../../hooks/useContent";

const inputStyles = {
  bg: "var(--bg-secondary)",
  border: "1px solid",
  borderColor: "var(--overlay-medium)",
  borderRadius: "lg",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "md",
  px: 4,
  py: 3,
  _placeholder: { color: "var(--text-secondary)" },
  _hover: { borderColor: "var(--glow-cyan-dim)" },
  _focus: {
    borderColor: "var(--glow-cyan)",
    boxShadow: "0 0 0 1px var(--glow-cyan)",
    outline: "none",
  },
  transition: "all 0.3s ease",
};

const DEFAULT_CONTACT = {
  heading: "Get in Touch",
  email: "your@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
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
    { name: "Email", href: `mailto:${contact.email}` },
  ].filter((link) => link.href && link.href !== "mailto:");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="section"
      id="contact"
      py="var(--section-padding)"
      position="relative"
      overflow="hidden"
    >
      {/* Background glow */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        width="600px"
        height="600px"
        background="radial-gradient(circle, var(--warm-coral) 0%, transparent 70%)"
        opacity={0.1}
        pointerEvents="none"
      />

      <Container maxW="container.md" position="relative">
        <VStack gap={12} align="stretch">
          {/* Section header */}
          <RevealOnScroll>
            <Box textAlign="center">
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--glow-cyan)"
                letterSpacing="0.2em"
                textTransform="uppercase"
                mb={2}
              >
                Contact
              </Text>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontFamily="var(--font-display)"
                fontWeight="600"
                lineHeight="1.2"
                mb={4}
              >
                Let's{" "}
                <Text as="span" color="var(--warm-coral)">
                  connect
                </Text>
              </Text>
              <Text
                fontSize="lg"
                color="var(--text-secondary)"
                maxW="500px"
                mx="auto"
              >
                Have a project in mind or just want to chat? I'd love to hear
                from you.
              </Text>
            </Box>
          </RevealOnScroll>

          {/* Contact form or success message */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Box
                textAlign="center"
                p={8}
                bg="var(--bg-secondary)"
                borderRadius="xl"
                border="1px solid var(--glow-cyan)"
              >
                <Text
                  fontSize="2xl"
                  fontFamily="var(--font-display)"
                  color="var(--glow-cyan)"
                  mb={2}
                >
                  Message sent!
                </Text>
                <Text color="var(--text-secondary)">
                  Thanks for reaching out. I'll get back to you soon.
                </Text>
              </Box>
            </motion.div>
          ) : (
            <RevealOnScroll delay={0.2}>
              <form onSubmit={handleSubmit}>
                <Box
                  bg="var(--bg-secondary)"
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="var(--overlay-subtle)"
                >
                  <VStack gap={5}>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      gap={5}
                      w="100%"
                    >
                      <Box flex={1}>
                        <Text
                          fontSize="sm"
                          fontFamily="var(--font-mono)"
                          color="var(--text-secondary)"
                          mb={2}
                        >
                          NAME
                        </Text>
                        <Input
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          {...inputStyles}
                        />
                      </Box>
                      <Box flex={1}>
                        <Text
                          fontSize="sm"
                          fontFamily="var(--font-mono)"
                          color="var(--text-secondary)"
                          mb={2}
                        >
                          EMAIL
                        </Text>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          {...inputStyles}
                        />
                      </Box>
                    </Flex>

                    <Box w="100%">
                      <Text
                        fontSize="sm"
                        fontFamily="var(--font-mono)"
                        color="var(--text-secondary)"
                        mb={2}
                      >
                        MESSAGE
                      </Text>
                      <Textarea
                        placeholder="What's on your mind?"
                        rows={5}
                        required
                        resize="none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        {...inputStyles}
                      />
                    </Box>

                    {error && (
                      <Text color="var(--warm-coral)" fontSize="sm">
                        {error}
                      </Text>
                    )}

                    <MagneticElement strength={0.2} radius={100}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          padding: "12px 32px",
                          background: "var(--glow-cyan)",
                          color: "var(--text-on-accent)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.7 : 1,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </MagneticElement>
                  </VStack>
                </Box>
              </form>
            </RevealOnScroll>
          )}

          {/* Social links */}
          <RevealOnScroll delay={0.3}>
            <Flex justify="center" gap={6}>
              {socialLinks.map((link) => (
                <MagneticElement key={link.name} strength={0.3} radius={80}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    color="var(--text-secondary)"
                    fontFamily="var(--font-mono)"
                    fontSize="sm"
                    transition="color 0.3s ease"
                    _hover={{ color: "var(--glow-cyan)", textDecoration: "none" }}
                  >
                    {link.name}
                  </Link>
                </MagneticElement>
              ))}
            </Flex>
          </RevealOnScroll>
        </VStack>
      </Container>

      {/* Footer */}
      <Box mt={20} textAlign="center">
        <Text
          fontSize="sm"
          color="var(--text-secondary)"
          fontFamily="var(--font-mono)"
        >
          Built with React, Framer Motion & Chakra UI
        </Text>
      </Box>
    </Box>
  );
}
