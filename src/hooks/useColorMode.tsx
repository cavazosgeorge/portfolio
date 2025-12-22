import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  isDark: boolean;
  isLight: boolean;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

function getInitialColorMode(): ColorMode {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("color-mode") as ColorMode | null;
  return stored || "dark";
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>(getInitialColorMode);

  // Sync with DOM on mount (in case SSR/hydration mismatch)
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as ColorMode;
    if (current && current !== colorMode) {
      setColorModeState(current);
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    const newMode: ColorMode = colorMode === "dark" ? "light" : "dark";

    // Update DOM
    document.documentElement.setAttribute("data-theme", newMode);
    document.documentElement.style.colorScheme = newMode;

    // Update localStorage
    localStorage.setItem("color-mode", newMode);

    // Update theme-color meta tag
    const themeColorMeta = document.getElementById("theme-color");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", newMode === "dark" ? "#0a0a0f" : "#faf9f7");
    }

    // Update state
    setColorModeState(newMode);
  }, [colorMode]);

  const setMode = useCallback((mode: ColorMode) => {
    // Update DOM
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;

    // Update localStorage
    localStorage.setItem("color-mode", mode);

    // Update theme-color meta tag
    const themeColorMeta = document.getElementById("theme-color");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", mode === "dark" ? "#0a0a0f" : "#faf9f7");
    }

    // Update state
    setColorModeState(mode);
  }, []);

  const value: ColorModeContextValue = {
    colorMode,
    toggleColorMode,
    setColorMode: setMode,
    isDark: colorMode === "dark",
    isLight: colorMode === "light",
  };

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
