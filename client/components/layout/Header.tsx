import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/placeholder.svg"
            alt="Company logo"
            className="h-8 w-8 rounded-sm ring-1 ring-border"
          />
          <span className="font-bold tracking-tight text-lg">Nova</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden border-t bg-background", open ? "block" : "hidden")}>
        <div className="container py-3 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base text-foreground/90 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
