import { useMemo } from "react";
import type { SiteContent } from "@/lib/site-content";

export function useThemeStyles(c: SiteContent) {
  return useMemo(
    () =>
      ({
        ["--background" as never]: c.colorBackground,
        ["--foreground" as never]: c.colorForeground,
        ["--accent" as never]: c.colorAccent,
        ["--font-display" as never]: `"${c.fontDisplay}", sans-serif`,
        ["--font-body" as never]: `"${c.fontBody}", system-ui, sans-serif`,
        ["--font-mono" as never]: `"${c.fontMono}", ui-monospace, monospace`,
      }) as React.CSSProperties,
    [c],
  );
}
