"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Menu,
  PenLine,
  Scale,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/data/exam";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Desk", icon: LayoutDashboard },
  { href: "/syllabus", label: "Syllabus", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: PenLine },
  { href: "/mock", label: "Mocks", icon: ClipboardList },
  { href: "/notes", label: "Notes", icon: BookOpen },
  { href: "/pattern", label: "Pattern", icon: Scale },
];

function NavLinks({
  onClick,
  stacked,
}: {
  onClick?: () => void;
  stacked?: boolean;
}) {
  const pathname = usePathname();
  return (
    <nav className={cn("flex gap-1", stacked && "flex-col")}>
      {links.map((l) => {
        const active =
          l.href === "/"
            ? pathname === "/"
            : pathname === l.href || pathname.startsWith(`${l.href}/`);
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClick}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-heading text-sm text-primary-foreground">
              A
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-base leading-none tracking-tight">
                {APP_NAME}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                SEBI Officer Grade A · IT stream
              </span>
            </span>
          </Link>
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{APP_NAME}</SheetTitle>
          </SheetHeader>
          <div className="px-4">
            <NavLinks stacked onClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        {children}
      </main>

      <footer className="border-t py-5 text-center text-xs text-muted-foreground">
        Practice bank aligned to the official IT syllabus in the 2025 SEBI Grade A
        advertisement. Confirm every fact against sebi.gov.in before the exam.
      </footer>
    </div>
  );
}
