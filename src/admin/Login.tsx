import { useState } from "react";
import { Box, Container, VStack, Text, Input, Button } from "@chakra-ui/react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box minH="100vh" bg="var(--void)" display="flex" alignItems="center">
      <Container maxW="400px">
        <Box
          p={8}
          bg="var(--void-lighter)"
          borderRadius="xl"
          border="1px solid"
          borderColor="rgba(255,255,255,0.1)"
        >
          <VStack gap={6} as="form" onSubmit={handleSubmit}>
            <Text
              fontSize="2xl"
              fontFamily="var(--font-display)"
              fontWeight="600"
              color="var(--text-primary)"
            >
              Admin Login
            </Text>

            {error && (
              <Text color="var(--warm-coral)" fontSize="sm">
                {error}
              </Text>
            )}

            <Box w="100%">
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--text-secondary)"
                mb={2}
              >
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="var(--void)"
                border="1px solid"
                borderColor="rgba(255,255,255,0.1)"
                color="var(--text-primary)"
                _focus={{
                  borderColor: "var(--glow-cyan)",
                  boxShadow: "0 0 0 1px var(--glow-cyan)",
                }}
                required
              />
            </Box>

            <Box w="100%">
              <Text
                fontSize="sm"
                fontFamily="var(--font-mono)"
                color="var(--text-secondary)"
                mb={2}
              >
                Password
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="var(--void)"
                border="1px solid"
                borderColor="rgba(255,255,255,0.1)"
                color="var(--text-primary)"
                _focus={{
                  borderColor: "var(--glow-cyan)",
                  boxShadow: "0 0 0 1px var(--glow-cyan)",
                }}
                required
              />
            </Box>

            <Button
              type="submit"
              w="100%"
              bg="var(--glow-cyan)"
              color="var(--void)"
              fontFamily="var(--font-mono)"
              fontWeight="600"
              _hover={{ opacity: 0.9 }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
