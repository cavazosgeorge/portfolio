import { Box } from "@chakra-ui/react";
import { Hero } from "./components/sections/Hero";

function App() {
  return (
    <Box minH="100vh" bg="var(--void)">
      <Hero />

      {/* Placeholder sections - to be built */}
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box color="var(--text-secondary)" fontFamily="var(--font-mono)">
          More sections coming soon...
        </Box>
      </Box>
    </Box>
  );
}

export default App;
