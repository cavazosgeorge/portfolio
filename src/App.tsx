import { Box } from "@chakra-ui/react";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { MorphingBlob } from "./components/animations/MorphingBlob";

function App() {
  return (
    <Box minH="100vh" bg="var(--void)" position="relative">
      {/* Global blob background - spans entire page */}
      <Box
        position="fixed"
        inset={0}
        overflow="hidden"
        zIndex={0}
        pointerEvents="none"
      >
        <MorphingBlob
          color="var(--glow-cyan)"
          size={600}
          top="5%"
          left="-5%"
          duration={25}
        />
        <MorphingBlob
          color="var(--warm-coral)"
          size={500}
          top="30%"
          right="-10%"
          delay={5}
          duration={30}
        />
        <MorphingBlob
          color="var(--soft-lavender)"
          size={450}
          top="60%"
          left="20%"
          delay={10}
          duration={22}
        />
        <MorphingBlob
          color="var(--glow-cyan)"
          size={400}
          top="85%"
          right="15%"
          delay={15}
          duration={28}
        />
      </Box>

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
