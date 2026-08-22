import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

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
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("color-mode");
  const domTheme = document.documentElement.getAttribute("data-theme");

  if (stored === "light" || stored === "dark") return stored;
  if (domTheme === "light" || domTheme === "dark") return domTheme;
  return "light";
}

function applyColorMode(mode: ColorMode) {
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;
  localStorage.setItem("color-mode", mode);

  const themeColorMeta = document.getElementById("theme-color");
  themeColorMeta?.setAttribute("content", mode === "dark" ? "#11130f" : "#f6f4ee");
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>(getInitialColorMode);

  const toggleColorMode = useCallback(() => {
    const newMode: ColorMode = colorMode === "dark" ? "light" : "dark";
    applyColorMode(newMode);
    setColorModeState(newMode);
  }, [colorMode]);

  const setMode = useCallback((mode: ColorMode) => {
    applyColorMode(mode);
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

// Fast refresh warning is intentionally scoped to this colocated context hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
