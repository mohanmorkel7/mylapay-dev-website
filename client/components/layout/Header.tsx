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
    <header className="fixed inset-x-0 top-0 z-50 bg-white/10 backdrop-blur border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F9b23d41bd00a451298a1599df2fb1a80%2F5d260831bae44169b92984e1d6e76fd1?format=webp&width=200"
            alt="Company logo"
            className="h-8 w-auto rounded-sm"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition"
          >
            Get in touch
          </a>
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md hover:opacity-95 transition"
            aria-label="Get in touch"
          >
            Schedule a demo
          </button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10 transition"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transition"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-white/5",
          open ? "block" : "hidden",
        )}
      >
        <div className="container py-3 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base text-white/90 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 rounded-md bg-primary px-4 py-2 text-center text-primary-foreground"
          >
            Schedule a demo
          </a>
        </div>
      </div>
    </header>
  );
}
