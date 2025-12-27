import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { BlogHeader } from "./BlogHeader";
import { ParallaxBlobs } from "../components/animations/ParallaxBlobs";

export function BlogLayout() {
  return (
    <Box minH="100vh" bg="var(--bg-primary)" position="relative">
      {/* Parallax blob background */}
      <ParallaxBlobs />

      <BlogHeader />

      <Box as="main" position="relative" zIndex={1} pt="80px">
        <Outlet />
      </Box>
    </Box>
  );
}
