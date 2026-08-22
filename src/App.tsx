import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { Writing } from "./components/sections/Writing";
import { AuthProvider, useAuth } from "./admin/AuthContext";
import { ColorModeProvider } from "./hooks/useColorMode";

const Login = lazy(() => import("./admin/Login").then((module) => ({ default: module.Login })));
const Dashboard = lazy(() => import("./admin/Dashboard").then((module) => ({ default: module.Dashboard })));
const BlogLayout = lazy(() => import("./blog/BlogLayout").then((module) => ({ default: module.BlogLayout })));
const BlogHome = lazy(() => import("./blog/BlogHome").then((module) => ({ default: module.BlogHome })));
const BlogPost = lazy(() => import("./blog/BlogPost").then((module) => ({ default: module.BlogPost })));

function isBlogSubdomain(): boolean {
  const hostname = window.location.hostname;
  return hostname.startsWith("blog.") || hostname.startsWith("www.blog.");
}

function Portfolio() {
  return (
    <Box minH="100vh" bg="var(--bg-primary)" position="relative">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <Box as="main" id="main-content" position="relative" zIndex={1}>
        <Hero />
        <Projects />
        <Experience />
        <Writing />
        <About />
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
  const isBlog = isBlogSubdomain();

  return (
    <BrowserRouter>
      <ColorModeProvider>
        <AuthProvider>
          <Suspense fallback={<Box minH="100vh" bg="var(--bg-primary)" />}>
            <Routes>
              {isBlog ? (
                // Blog subdomain routes
                <>
                  <Route path="/" element={<BlogLayout />}>
                    <Route index element={<BlogHome />} />
                    <Route path=":slug" element={<BlogPost />} />
                  </Route>
                </>
              ) : (
                // Main portfolio routes
                <>
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
                </>
              )}
            </Routes>
          </Suspense>
        </AuthProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;
