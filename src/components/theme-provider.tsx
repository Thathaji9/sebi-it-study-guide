"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  applyTheme,
  persistTheme,
  prefersDark,
  readStoredTheme,
  subscribeDarkPref,
  subscribeTheme,
  type ThemeId,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    () => "system" as const,
  );
  const darkPref = useSyncExternalStore(
    subscribeDarkPref,
    prefersDark,
    () => false,
  );

  useEffect(() => {
    applyTheme(theme, darkPref);
  }, [theme, darkPref]);

  const setTheme = useCallback((next: ThemeId) => {
    persistTheme(next);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
