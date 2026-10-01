import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CATEGORY_INFO, CATEGORIES_LIST } from "@/data/categories";
import { PROBLEM_LIST } from "@/data/problemList";
import type { CategorySlug } from "@/data/types";
import { Navbar } from "@/components/layout/Navbar";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Lightbulb, 
  Compass, 
  Clock, 
  Sparkles,
  BookOpen
} from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES_LIST.map((c) => ({
    category: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = CATEGORY_INFO[category as CategorySlug];

  if (!info) {
    notFound();
  }

  const problems = PROBLEM_LIST.filter((p) => p.category === category);
  const firstProblem = problems[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/roadmap" className="hover:text-emerald-400 transition-colors">
              Roadmap
            </Link>
            <span>/</span>
            <span className="text-zinc-200">{info.title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>{info.title}</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {problems.length} problems
                </span>
              </h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                {info.tagline}
              </p>
            </div>

            {firstProblem && (
              <Link
                href={`/learn/${category}/${firstProblem.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-sm transition-colors shrink-0"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Mental Model & Recognition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              <Lightbulb className="h-4 w-4" />
              <span>Mental Model</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {info.mentalModel}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              <Compass className="h-4 w-4" />
              <span>Recognition Signals</span>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {info.recognitionSignals.map((signal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Python Template & Typical Complexity */}
        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Standard Python Template</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">
              {info.typicalComplexity}
            </span>
          </div>
          <pre className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto">
            {info.template}
          </pre>
        </div>

        {/* Problems List in this Category */}
        <div className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            NeetCode Problems in this Category
          </h2>

          <div className="divide-y divide-zinc-800/80 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
            {problems.map((p, idx) => {
              const diffColor =
                p.difficulty === "Easy"
                  ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/20"
                  : p.difficulty === "Medium"
                  ? "text-amber-400 bg-amber-950/40 border-amber-500/20"
                  : "text-rose-400 bg-rose-950/40 border-rose-500/20";

              return (
                <Link
                  key={p.id}
                  href={`/learn/${p.category}/${p.id}`}
                  className="flex items-center justify-between p-3.5 hover:bg-zinc-900/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-600 w-5">
                      {idx + 1}.
                    </span>
                    <span className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </span>
                    {p.blind75 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950/40 text-purple-300 border border-purple-500/20">
                        Blind 75
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${diffColor}`}>
                      {p.difficulty}
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
