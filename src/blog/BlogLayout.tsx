import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { BlogHeader } from "./BlogHeader";

export function BlogLayout() {
  return (
    <Box
      minH="100vh"
      bg="var(--surface-primary)"
      color="var(--text-primary)"
    >
      <a className="skip-link" href="#blog-main">
        Skip to writing
      </a>
      <BlogHeader />
      <Box as="main" id="blog-main">
        <Outlet />
      </Box>
    </Box>
  );
}
