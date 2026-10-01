"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LESSONS } from "@/data/fundamentalsData";
import { useProgressStore } from "@/store/useProgressStore";
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Terminal,
  Code2
} from "lucide-react";

export default function FundamentalsPage() {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const totalCompleted = completedLessons.length;
  const percent = Math.round((totalCompleted / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Module 0: Python for DSA Primer</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Python Fundamentals
              </h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                Zero-syntax assumption. 13 hands-on micro-lessons teaching exactly the Python constructs you need to solve NeetCode 150 problems.
              </p>
            </div>

            {/* Overall Progress Indicator */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-1.5 shrink-0 min-w-[160px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Progress:</span>
                <span className="font-bold text-white">{totalCompleted} / {LESSONS.length}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {LESSONS.map((lesson, idx) => {
            const isDone = completedLessons.includes(lesson.slug);

            return (
              <Link
                key={lesson.slug}
                href={`/fundamentals/${lesson.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-mono font-semibold text-zinc-400">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <span>{lesson.title}</span>
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                      {lesson.goal}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:self-center pl-8 sm:pl-0">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>~{lesson.estimatedMinutes}m</span>
                  </span>

                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                    <span>{isDone ? "Review" : "Start"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
