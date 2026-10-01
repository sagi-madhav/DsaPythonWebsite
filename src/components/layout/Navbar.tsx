"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgressStore } from "@/store/useProgressStore";
import { 
  Code2, 
  Map, 
  BookOpen, 
  Terminal, 
  FileText, 
  CheckCircle2, 
  Menu,
  X 
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const completedCount = useProgressStore((state) => state.completedProblems.length);
  const completedLessons = useProgressStore((state) => state.completedLessons.length);

  const navLinks = [
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: "/fundamentals", label: "Fundamentals", icon: BookOpen, badge: `${completedLessons}/13` },
    { href: "/learn/arrays-and-hashing/two-sum", label: "Problems", icon: Code2 },
    { href: "/cheatsheet", label: "Cheat Sheet", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold">
              NeetCode <span className="text-emerald-400 font-mono">Python</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="h-4 w-4 text-emerald-400/80" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side stats pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/roadmap"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium hover:bg-emerald-950/70 transition-colors"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>{completedCount} / 150 Solved</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
