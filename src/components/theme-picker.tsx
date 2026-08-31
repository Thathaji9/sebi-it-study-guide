"use client";

import { Check, Monitor, Moon, Sun, FileText } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { themeOptions, type ThemeId } from "@/lib/theme";
import { cn } from "@/lib/utils";

const icons: Record<ThemeId, typeof Sun> = {
  desk: Sun,
  paper: FileText,
  night: Moon,
  system: Monitor,
};

function ThemeList({
  onPick,
}: {
  onPick?: () => void;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <div role="listbox" aria-label="Theme" className="grid gap-1">
      {themeOptions.map((opt) => {
        const Icon = icons[opt.id];
        const active = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => {
              setTheme(opt.id);
              onPick?.();
            }}
            className={cn(
              "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{opt.label}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs leading-snug",
                  active
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {opt.hint}
              </span>
            </span>
            {active ? <Check className="mt-0.5 size-4 shrink-0" /> : null}
          </button>
        );
      })}
    </div>
  );
}

export function ThemePicker({ stacked }: { stacked?: boolean }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const Icon = icons[theme];

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (stacked) {
    return (
      <div className="space-y-2">
        <p className="px-1 text-[11px] tracking-wide text-muted-foreground uppercase">
          Theme
        </p>
        <ThemeList />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Choose theme"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon />
      </Button>
      {open ? (
        <div
          id={menuId}
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg"
        >
          <ThemeList onPick={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
