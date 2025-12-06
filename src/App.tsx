import { Box } from "@chakra-ui/react";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { ParallaxBlobs } from "./components/animations/ParallaxBlobs";

function App() {
  return (
    <Box minH="100vh" bg="var(--void)" position="relative">
      {/* Parallax blob background */}
      <ParallaxBlobs />

      <Header />
      <Box as="main" position="relative" zIndex={1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </Box>
    </Box>
  );
}

export default App;
