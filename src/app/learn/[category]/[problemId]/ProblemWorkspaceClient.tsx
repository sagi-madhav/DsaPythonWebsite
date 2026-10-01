"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { ProblemData, CategoryInfo } from "@/data/types";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { PythonEditor } from "@/components/editor/PythonEditor";
import { TestRunnerPanel } from "@/components/editor/TestRunnerPanel";
import { TraceVisualizer } from "@/components/visualizers/TraceVisualizer";
import { useProgressStore } from "@/store/useProgressStore";
import { usePyodide } from "@/hooks/usePyodide";
import type { TestReport } from "@/lib/pyodide/types";
import type { Trace } from "@/lib/trace/types";
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Tv, 
  HelpCircle, 
  Sparkles, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Columns
} from "lucide-react";
import confetti from "canvas-confetti";

interface ProblemWorkspaceClientProps {
  problem: ProblemData;
  categoryInfo: CategoryInfo;
}

export function ProblemWorkspaceClient({
  problem,
  categoryInfo,
}: ProblemWorkspaceClientProps) {
  const { status: runnerStatus, preload, runTests } = usePyodide();
  const completedProblems = useProgressStore((state) => state.completedProblems);
  const toggleProblemCompleted = useProgressStore((state) => state.toggleProblemCompleted);
  const markProblemCompleted = useProgressStore((state) => state.markProblemCompleted);
  const getUserCode = useProgressStore((state) => state.getUserCode);
  const setUserCode = useProgressStore((state) => state.setUserCode);

  const isCompleted = completedProblems.includes(problem.id);

  // User code in Monaco editor
  const [code, setCode] = useState(() => getUserCode(problem.id, problem.starterCode));
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [leftTab, setLeftTab] = useState<"intuition" | "syntax" | "hints">("intuition");
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Pre-computed trace
  const [trace, setTrace] = useState<Trace | null>(null);

  // Fetch pre-computed trace
  useEffect(() => {
    fetch(`/traces/${problem.id}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setTrace(data))
      .catch(() => setTrace(null));
  }, [problem.id]);

  // Preload Pyodide WebAssembly runner
  useEffect(() => {
    preload();
  }, [preload]);

  // Handle Code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setUserCode(problem.id, newCode);
  };

  // Run Test Suite
  const handleRunCode = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const report = await runTests({
        source: code,
        harness: problem.harness,
        tests: problem.testCases,
      });
      setTestReport(report);

      const allPassed = report.results.length > 0 && report.results.every((r) => r.passed);
      if (allPassed && !report.loadError) {
        markProblemCompleted(problem.id, true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      setTestReport({
        loadError: {
          type: "RunnerError",
          message: err.message || "Failed to execute tests",
          line: null,
          column: null,
          text: null,
          traceback: String(err),
        },
        moduleStdout: "",
        results: [],
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, markProblemCompleted, problem, runTests]);

  // Ctrl+Enter hotkey to run tests
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode]);

  const difficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy": return "text-emerald-400 bg-emerald-950/40 border-emerald-500/20";
      case "Medium": return "text-amber-400 bg-amber-950/40 border-amber-500/20";
      case "Hard": return "text-rose-400 bg-rose-950/40 border-rose-500/20";
      default: return "text-zinc-400 bg-zinc-900 border-zinc-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Sidebar */}
        {sidebarOpen && (
          <Sidebar
            currentCategory={problem.category}
            currentProblemId={problem.id}
          />
        )}

        {/* 3-Panel Problem Workspace */}
        <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
          {/* Top Subheader: Breadcrumb & External Links */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-950/90 text-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Toggle Sidebar"
              >
                <Columns className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Link href={`/learn/${problem.category}/${problem.id}`} className="hover:text-white transition-colors">
                  {categoryInfo?.title ?? problem.category}
                </Link>
                <span>/</span>
                <span className="font-semibold text-white">{problem.title}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${difficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              {problem.blind75 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20">
                  Blind 75
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleProblemCompleted(problem.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  isCompleted
                    ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-zinc-500" />
                )}
                <span>{isCompleted ? "Solved" : "Mark as Solved"}</span>
              </button>

              <a
                href={problem.neetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                title="View on NeetCode.io"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">NeetCode</span>
              </a>

              {problem.videoUrl && (
                <a
                  href={problem.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors"
                  title="Watch Video Explanation"
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Video</span>
                </a>
              )}
            </div>
          </div>

          {/* 3 Columns Grid Container */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            {/* COLUMN 1: Intuition & Syntax Spotlights (4 cols) */}
            <div className="lg:col-span-4 border-r border-zinc-800 flex flex-col h-full overflow-hidden bg-zinc-950">
              {/* Tab Selector */}
              <div className="flex items-center border-b border-zinc-800 bg-zinc-900/60 p-1 text-xs">
                <button
                  onClick={() => setLeftTab("intuition")}
                  className={`flex-1 py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                    leftTab === "intuition"
                      ? "bg-zinc-800 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Intuition
                </button>
                <button
                  onClick={() => setLeftTab("syntax")}
                  className={`flex-1 py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                    leftTab === "syntax"
                      ? "bg-zinc-800 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Python Syntax ({problem.syntaxPrimers.length})
                </button>
                <button
                  onClick={() => setLeftTab("hints")}
                  className={`flex-1 py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                    leftTab === "hints"
                      ? "bg-zinc-800 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Hints & Solutions
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
                {leftTab === "intuition" && (
                  <>
                    {/* Problem Summary */}
                    <div className="space-y-2">
                      <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        The Goal in Plain English
                      </h2>
                      <div className="text-zinc-300 leading-relaxed space-y-2">
                        {problem.summary}
                      </div>
                    </div>

                    {/* Constraints */}
                    {problem.constraints && problem.constraints.length > 0 && (
                      <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                        <h3 className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">Constraints</h3>
                        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono">
                          {problem.constraints.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mental Model Analogy */}
                    <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <Lightbulb className="h-4 w-4" />
                        <span>Mental Model & Intuition</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {problem.intuitiveExplanation.intuition}
                      </p>
                    </div>

                    {/* Step-by-Step Walkthrough */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Step-by-Step Logic
                      </h3>
                      <ol className="space-y-2 text-xs text-zinc-300 list-decimal list-outside pl-4">
                        {problem.intuitiveExplanation.stepByStepWalkthrough.map((step, idx) => (
                          <li key={idx} className="leading-relaxed pl-1">{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Complexity Analysis */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs">
                      <div>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase">Time Complexity</span>
                        <div className="font-mono font-semibold text-emerald-400 mt-0.5">{problem.timeComplexity.optimal}</div>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase">Space Complexity</span>
                        <div className="font-mono font-semibold text-emerald-400 mt-0.5">{problem.spaceComplexity.optimal}</div>
                      </div>
                      <div className="col-span-2 text-[11px] text-zinc-400 mt-1 leading-relaxed border-t border-zinc-800/60 pt-2">
                        {problem.timeComplexity.explanation}
                      </div>
                    </div>

                    {/* Edge Cases */}
                    {problem.intuitiveExplanation.edgeCases.length > 0 && (
                      <div className="space-y-1.5">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                          Edge Cases to Keep in Mind
                        </h3>
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {problem.intuitiveExplanation.edgeCases.map((ec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400 shrink-0">•</span>
                              <span>{ec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {leftTab === "syntax" && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400">
                      Zero-syntax assumption: here is every Python construct used in this solution, explained in plain English.
                    </p>
                    {problem.syntaxPrimers.map((primer, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 space-y-2">
                        <code className="text-xs font-mono font-bold text-emerald-400 block pb-1 border-b border-zinc-800">
                          {primer.keywordOrMethod}
                        </code>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {primer.plainEnglishExplanation}
                        </p>
                        <div className="p-2 rounded bg-zinc-950 font-mono text-[11px] text-zinc-300 border border-zinc-800">
                          <pre className="whitespace-pre-wrap">{primer.exampleSnippet}</pre>
                        </div>
                        <div className="text-[11px] text-zinc-400 italic">
                          <span className="font-semibold text-zinc-500">Why here: </span>
                          {primer.whyWeUseItHere}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {leftTab === "hints" && (
                  <div className="space-y-4">
                    {/* Level 1 Hint */}
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-amber-400">Level 1: Conceptual Hint</span>
                        <button
                          onClick={() => setHintLevel(hintLevel >= 1 ? 0 : 1)}
                          className="text-[11px] font-mono text-zinc-400 hover:text-white"
                        >
                          {hintLevel >= 1 ? "Hide" : "Reveal"}
                        </button>
                      </div>
                      {hintLevel >= 1 && (
                        <p className="text-xs text-zinc-300 leading-relaxed pt-1 border-t border-zinc-800">
                          {problem.hints.conceptual}
                        </p>
                      )}
                    </div>

                    {/* Level 2 Hint */}
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-amber-400">Level 2: Structural Hint</span>
                        <button
                          onClick={() => setHintLevel(hintLevel >= 2 ? 1 : 2)}
                          className="text-[11px] font-mono text-zinc-400 hover:text-white"
                        >
                          {hintLevel >= 2 ? "Hide" : "Reveal"}
                        </button>
                      </div>
                      {hintLevel >= 2 && (
                        <p className="text-xs text-zinc-300 leading-relaxed pt-1 border-t border-zinc-800 font-mono text-[11px]">
                          {problem.hints.structural}
                        </p>
                      )}
                    </div>

                    {/* Level 3: Optimal Solution */}
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-emerald-400">Level 3: Full Reference Solution</span>
                        <button
                          onClick={() => setHintLevel(hintLevel >= 3 ? 2 : 3)}
                          className="text-[11px] font-mono text-zinc-400 hover:text-white"
                        >
                          {hintLevel >= 3 ? "Hide" : "Reveal"}
                        </button>
                      </div>
                      {hintLevel >= 3 && (
                        <div className="pt-2 border-t border-zinc-800 space-y-2">
                          <pre className="p-2.5 rounded bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto border border-zinc-800">
                            {problem.optimalSolution}
                          </pre>
                          <button
                            onClick={() => handleCodeChange(problem.optimalSolution)}
                            className="w-full py-1 text-xs font-medium rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                          >
                            Copy to Editor
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Common Mistakes */}
                    {problem.commonMistakes.length > 0 && (
                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Common Beginner Pitfalls</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                          {problem.commonMistakes.map((m, idx) => (
                            <li key={idx} className="leading-relaxed">{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 2: Dynamic Step-by-Step Visualizer (4 cols) */}
            <div className="lg:col-span-4 border-r border-zinc-800 flex flex-col h-full overflow-hidden bg-zinc-950 p-2">
              <TraceVisualizer
                trace={trace}
                code={problem.optimalSolution}
                config={problem.visualization}
                visualizerType={problem.visualizerType}
              />
            </div>

            {/* COLUMN 3: Monaco Code Sandbox & Output Console (4 cols) */}
            <div className="lg:col-span-4 flex flex-col h-full overflow-hidden bg-zinc-950 p-2 gap-2">
              {/* Editor Top Half */}
              <div className="flex-1 min-h-[280px]">
                <PythonEditor
                  value={code}
                  onChange={handleCodeChange}
                />
              </div>

              {/* Test Runner Bottom Half */}
              <div className="h-[280px] shrink-0">
                <TestRunnerPanel
                  testCases={problem.testCases}
                  report={testReport}
                  isRunning={isRunning}
                  runnerStatus={runnerStatus}
                  onRun={handleRunCode}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
