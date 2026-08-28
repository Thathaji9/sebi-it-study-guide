"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Menu,
  MessagesSquare,
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
  { href: "/interview", label: "Interview", icon: MessagesSquare },
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
            <svg
              viewBox="0 0 32 32"
              className="size-8 shrink-0"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="7" fill="#1F4E5F" />
              <path
                fill="#F7F4EE"
                fillRule="evenodd"
                d="M16 6.2 25.4 23.2h-2.95l-1.72-4.55H11.27L9.55 23.2H6.6L16 6.2Zm0 5.15-2.72 5.5h5.44L16 11.35Z"
              />
              <rect
                x="10.2"
                y="24.55"
                width="11.6"
                height="1.45"
                rx="0.72"
                fill="#C4A35A"
              />
            </svg>
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
