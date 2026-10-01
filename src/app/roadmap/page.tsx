"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CATEGORIES_LIST } from "@/data/categories";
import { PROBLEM_LIST } from "@/data/problemList";
import { useProgressStore } from "@/store/useProgressStore";
import { 
  CheckCircle2, 
  ArrowRight, 
  Map, 
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";

export default function RoadmapPage() {
  const completedProblems = useProgressStore((state) => state.completedProblems);

  // Group categories into intuitive tiers
  const tiers = [
    {
      name: "Tier 1: Core Data Structures & Pointers",
      description: "Fundamental data structures and pointer movements that appear in 70% of coding interviews.",
      categories: ["arrays-and-hashing", "two-pointers", "sliding-window", "stack", "binary-search"],
    },
    {
      name: "Tier 2: Linked Structures & Hierarchies",
      description: "Pointers and trees: master recursion, tree traversals, and dynamic queues.",
      categories: ["linked-list", "trees", "tries", "heap-priority-queue"],
    },
    {
      name: "Tier 3: Search Spaces & Networks",
      description: "Explore recursive decision trees and traverse network topologies.",
      categories: ["backtracking", "graphs", "advanced-graphs"],
    },
    {
      name: "Tier 4: Dynamic Programming & Optimization",
      description: "The gold standard of algorithmic thinking: breaking problems into subproblems.",
      categories: ["1-d-dp", "2-d-dp", "greedy"],
    },
    {
      name: "Tier 5: Specialized Patterns",
      description: "Geometric coordinates, time intervals, and binary bitwise operations.",
      categories: ["intervals", "math-and-geometry", "bit-manipulation"],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Map className="h-3.5 w-3.5" />
            <span>Interactive NeetCode 150 Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Algorithmic Roadmap
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            A structured path from zero Python knowledge to passing top technical interviews. Problems are grouped into 18 core patterns so you learn transferable mental models.
          </p>
        </div>

        {/* Roadmap Tiers */}
        <div className="space-y-8">
          {tiers.map((tier, tIdx) => (
            <div key={tIdx} className="space-y-4">
              <div className="border-b border-zinc-800 pb-2">
                <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    {tIdx + 1}
                  </span>
                  <span>{tier.name}</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">{tier.description}</p>
              </div>

              {/* Category Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tier.categories.map((slug) => {
                  const cat = CATEGORIES_LIST.find((c) => c.slug === slug);
                  if (!cat) return null;

                  const problems = PROBLEM_LIST.filter((p) => p.category === cat.slug);
                  const solved = problems.filter((p) => completedProblems.includes(p.id)).length;
                  const percent = Math.round((solved / problems.length) * 100);
                  const firstProblem = problems[0];

                  return (
                    <div
                      key={cat.slug}
                      className="group relative flex flex-col justify-between p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                            {cat.title}
                          </h3>
                          <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60">
                            {solved}/{problems.length}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                          {cat.tagline}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Links */}
                      <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-800/60 text-xs">
                        <Link
                          href={`/learn/${cat.slug}`}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          View Pattern
                        </Link>
                        {firstProblem && (
                          <Link
                            href={`/learn/${cat.slug}/${firstProblem.id}`}
                            className="flex items-center gap-1 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <span>Start</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
