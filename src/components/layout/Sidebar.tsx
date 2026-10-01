"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { PROBLEM_LIST } from "@/data/problemList";
import { CATEGORIES_LIST } from "@/data/categories";
import { useProgressStore } from "@/store/useProgressStore";
import type { CategorySlug, Difficulty } from "@/data/types";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Search,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  currentCategory?: CategorySlug;
  currentProblemId?: string;
}

export function Sidebar({ currentCategory, currentProblemId }: SidebarProps) {
  const pathname = usePathname();
  const completedProblems = useProgressStore((state) => state.completedProblems);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CATEGORIES_LIST.forEach((cat) => {
      initial[cat.slug] = cat.slug === currentCategory;
    });
    return initial;
  });

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const filteredProblems = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return PROBLEM_LIST.filter(
      (p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const difficultyBadgeColor = (diff: Difficulty) => {
    switch (diff) {
      case "Easy":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-500/20";
      case "Medium":
        return "text-amber-400 bg-amber-950/40 border-amber-500/20";
      case "Hard":
        return "text-rose-400 bg-rose-950/40 border-rose-500/20";
    }
  };

  return (
    <aside className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14">
      {/* Search Header */}
      <div className="p-3 border-b border-zinc-800/80">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter all 150 problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Problem Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {filteredProblems ? (
          <div className="space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Found {filteredProblems.length} match{filteredProblems.length === 1 ? "" : "es"}
            </div>
            {filteredProblems.map((p) => {
              const isDone = completedProblems.includes(p.id);
              const isCurrent = p.id === currentProblemId;
              return (
                <Link
                  key={p.id}
                  href={`/learn/${p.category}/${p.id}`}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                    isCurrent
                      ? "bg-emerald-500/10 text-emerald-300 font-medium border border-emerald-500/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isDone ? (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                    )}
                    <span className="truncate">{p.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${difficultyBadgeColor(p.difficulty)}`}>
                    {p.difficulty[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          CATEGORIES_LIST.map((category) => {
            const isOpen = openCategories[category.slug];
            const problems = PROBLEM_LIST.filter((p) => p.category === category.slug);
            const categoryCompletedCount = problems.filter((p) => completedProblems.includes(p.id)).length;
            const isCategoryActive = category.slug === currentCategory;

            return (
              <div key={category.slug} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.slug)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                    isCategoryActive
                      ? "text-zinc-100 bg-zinc-900/90"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                    )}
                    <span className="truncate">{category.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {categoryCompletedCount}/{problems.length}
                  </span>
                </button>

                {isOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-zinc-800/80 ml-3.5 my-1">
                    {problems.map((p) => {
                      const isDone = completedProblems.includes(p.id);
                      const isCurrent = p.id === currentProblemId;
                      return (
                        <Link
                          key={p.id}
                          href={`/learn/${p.category}/${p.id}`}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors ${
                            isCurrent
                              ? "bg-emerald-500/10 text-emerald-300 font-medium border border-emerald-500/20"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isDone ? (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                            )}
                            <span className="truncate">{p.title}</span>
                          </div>
                          <span className={`text-[10px] font-mono px-1 py-0.2 rounded border ${difficultyBadgeColor(p.difficulty)}`}>
                            {p.difficulty[0]}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60">
        <Link
          href="/roadmap"
          className="flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Interactive Pattern Roadmap</span>
        </Link>
      </div>
    </aside>
  );
}
