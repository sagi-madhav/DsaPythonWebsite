"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CATEGORIES_LIST } from "@/data/categories";
import { PROBLEM_LIST } from "@/data/problemList";
import { LESSONS } from "@/data/fundamentalsData";
import { useProgressStore } from "@/store/useProgressStore";
import { 
  Code2, 
  BookOpen, 
  Map, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  Zap,
  Award,
  Layers,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const completedProblems = useProgressStore((state) => state.completedProblems);
  const completedLessons = useProgressStore((state) => state.completedLessons);

  const solvedCount = completedProblems.length;
  const totalProblems = PROBLEM_LIST.length;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);

  const blind75Solved = PROBLEM_LIST.filter(
    (p) => p.blind75 && completedProblems.includes(p.id)
  ).length;

  // Find the first unsolved problem for Quick Continue
  const nextProblem = PROBLEM_LIST.find((p) => !completedProblems.includes(p.id)) || PROBLEM_LIST[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Python DSA Learning Platform</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Master the NeetCode 150 with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Visual Intuition
              </span>{" "}
              in Pure Python.
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              Zero Python assumptions. Step-by-step memory pointer visualizers, an in-browser Python WebAssembly runtime, and structured mental models for every pattern.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/learn/${nextProblem.category}/${nextProblem.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98]"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Continue Solving: {nextProblem.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/fundamentals"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs sm:text-sm transition-colors"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>Python Fundamentals ({completedLessons.length}/13)</span>
            </Link>

            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs sm:text-sm transition-colors"
            >
              <Map className="h-4 w-4 text-cyan-400" />
              <span>View Roadmap</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>NeetCode 150 Solved</span>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {solvedCount} <span className="text-sm font-normal text-zinc-500 font-mono">/ {totalProblems}</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Blind 75 Subset</span>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {blind75Solved} <span className="text-sm font-normal text-zinc-500 font-mono">/ 75</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((blind75Solved / 75) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Python Fundamentals</span>
              <BookOpen className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {completedLessons.length} <span className="text-sm font-normal text-zinc-500 font-mono">/ {LESSONS.length}</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedLessons.length / LESSONS.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 18 Pattern Categories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                The 18 Core Patterns
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Every interview problem is a variation of one of these algorithmic patterns.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore Graph</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES_LIST.map((cat) => {
              const problems = PROBLEM_LIST.filter((p) => p.category === cat.slug);
              const solved = problems.filter((p) => completedProblems.includes(p.id)).length;
              const percent = Math.round((solved / problems.length) * 100);
              const firstProblem = problems[0];

              return (
                <div
                  key={cat.slug}
                  className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {solved}/{problems.length}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {cat.tagline}
                    </p>

                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/60 text-xs">
                    <Link
                      href={`/learn/${cat.slug}`}
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Mental Model
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
      </main>
    </div>
  );
}
