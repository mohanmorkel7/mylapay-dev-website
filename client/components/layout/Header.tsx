import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Our Capabilities", href: "/#capabilities" },
  { label: "Our Products", href: "/#products" },
  { label: "Developer", href: "/#developer" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Resources", href: "/#resources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/20" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F9b23d41bd00a451298a1599df2fb1a80%2F6bb77510276f42a2badf7d1520f1310b?format=webp&width=800"
            alt="Company logo"
            className="h-8 w-auto rounded-sm"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-800/90 hover:text-slate-900 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-800/90 hover:text-slate-900 hover:bg-white/10 transition"
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
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        className={cn(
          "md:hidden border-t",
          open ? "block" : "hidden",
        )}
      >
        <div className="container py-3 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base text-slate-800/90 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
