import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@/hooks/useColorMode";
export function ColorModeToggle() {
  const { isDark, toggleColorMode } = useColorMode();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleColorMode}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
