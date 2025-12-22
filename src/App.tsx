import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { ParallaxBlobs } from "./components/animations/ParallaxBlobs";
import { AuthProvider, useAuth } from "./admin/AuthContext";
import { ColorModeProvider } from "./hooks/useColorMode";
import { Login } from "./admin/Login";
import { Dashboard } from "./admin/Dashboard";

function Portfolio() {
  return (
    <Box minH="100vh" bg="var(--bg-primary)" position="relative">
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box minH="100vh" bg="var(--bg-primary)" display="flex" alignItems="center" justifyContent="center">
        <Box color="var(--text-secondary)">Loading...</Box>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;
