import { Box, Container, Heading, Text } from "@chakra-ui/react";

function App() {
  return (
    <Box minH="100vh" bg="gray.900" color="white">
      <Container maxW="container.xl" py={20}>
        <Heading as="h1" size="4xl" mb={4}>
          Portfolio
        </Heading>
        <Text fontSize="xl" color="gray.400">
          Coming soon...
        </Text>
      </Container>
    </Box>
  );
}

export default App;
