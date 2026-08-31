import { themeBootstrapScript } from "@/lib/theme";

/** Runs before paint so the first frame matches the stored theme. */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
    />
  );
}
