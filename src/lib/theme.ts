export const THEME_STORAGE_KEY = "grade-a-it-desk-theme-v1";

export const themeIds = ["desk", "paper", "night", "system"] as const;

export type ThemeId = (typeof themeIds)[number];
export type PaletteId = "desk" | "paper" | "night";

export const themeOptions: {
  id: ThemeId;
  label: string;
  hint: string;
}[] = [
  { id: "desk", label: "Desk", hint: "Warm paper and teal ink" },
  { id: "paper", label: "Paper", hint: "Brighter page, higher contrast" },
  { id: "night", label: "Night", hint: "Dark teal for evening study" },
  { id: "system", label: "System", hint: "Follow this device" },
];

export function isThemeId(value: string | null): value is ThemeId {
  return themeIds.includes(value as ThemeId);
}

const themeListeners = new Set<() => void>();

function emitTheme() {
  for (const listener of themeListeners) listener();
}

export function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    themeListeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(raw) ? raw : "system";
  } catch {
    return "system";
  }
}

export function prefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function subscribeDarkPref(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export function resolvePalette(
  theme: ThemeId,
  darkPref = prefersDark(),
): PaletteId {
  if (theme === "system") return darkPref ? "night" : "desk";
  return theme;
}

export function applyTheme(theme: ThemeId, darkPref = prefersDark()) {
  if (typeof document === "undefined") return;
  const palette = resolvePalette(theme, darkPref);
  const root = document.documentElement;
  root.classList.toggle("dark", palette === "night");
  root.dataset.theme = palette;
  root.style.colorScheme = palette === "night" ? "dark" : "light";
}

export function persistTheme(theme: ThemeId) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode */
  }
  applyTheme(theme);
  emitTheme();
}

export const themeBootstrapScript = `(function(){
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var t = localStorage.getItem(key);
    if (t !== "desk" && t !== "paper" && t !== "night" && t !== "system") t = "system";
    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var p = t === "system" ? (dark ? "night" : "desk") : t;
    var root = document.documentElement;
    if (p === "night") root.classList.add("dark");
    else root.classList.remove("dark");
    root.setAttribute("data-theme", p);
    root.style.colorScheme = p === "night" ? "dark" : "light";
  } catch (e) {}
})();`;
