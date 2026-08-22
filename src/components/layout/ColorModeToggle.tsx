import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "../../hooks/useColorMode";

const SunIcon = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 15.2A8.5 8.5 0 0 1 8.8 3.2a8.5 8.5 0 1 0 12 12Z" />
  </svg>
);

export function ColorModeToggle() {
  const { toggleColorMode, isDark } = useColorMode();

  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      color="var(--text-secondary)"
      transition="color 160ms ease, background-color 160ms ease"
      _hover={{ color: "var(--accent-primary)", bg: "var(--accent-soft)" }}
      _focus={{ boxShadow: "none" }}
      _focusVisible={{ boxShadow: "none" }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
