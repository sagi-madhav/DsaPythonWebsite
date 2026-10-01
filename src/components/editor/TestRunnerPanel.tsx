"use client";

import { useState } from "react";
import type { TestCase } from "@/data/types";
import type { TestReport, RunnerStatus } from "@/lib/pyodide/types";
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  AlertCircle, 
  Loader2,
  Clock,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

interface TestRunnerPanelProps {
  testCases: TestCase[];
  report: TestReport | null;
  isRunning: boolean;
  runnerStatus: RunnerStatus;
  onRun: () => void;
  onAllPassed?: () => void;
}

export function TestRunnerPanel({
  testCases,
  report,
  isRunning,
  runnerStatus,
  onRun,
}: TestRunnerPanelProps) {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"tests" | "stdout">("tests");

  const results = report?.results ?? [];
  const allPassed = results.length > 0 && results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;
  const currentResult = results[selectedCaseIdx];
  const currentTestCase = testCases[selectedCaseIdx];

  const formatValue = (val: unknown): string => {
    if (val === undefined) return "None";
    if (val === null) return "None";
    if (typeof val === "boolean") return val ? "True" : "False";
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Top Bar: Action Buttons & Status */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab("tests")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === "tests"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Test Cases
              {results.length > 0 && (
                <span className={`ml-1.5 font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                  allPassed
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                }`}>
                  {passedCount}/{testCases.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("stdout")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                activeTab === "stdout"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Console</span>
            </button>
          </div>
        </div>

        {/* Run Button */}
        <div className="flex items-center gap-3">
          {runnerStatus === "loading" && (
            <span className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Booting Python...
            </span>
          )}
          <button
            onClick={onRun}
            disabled={isRunning || runnerStatus === "loading"}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run Code</span>
                <span className="text-[10px] font-mono text-emerald-200/60 hidden sm:inline">Ctrl+Enter</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Load Error Banner */}
        {report?.loadError && (
          <div className="mb-3 p-3 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs font-mono space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertCircle className="h-4 w-4" />
              <span>{report.loadError.type}: {report.loadError.message}</span>
            </div>
            {report.loadError.line && (
              <div className="text-zinc-400 text-[11px]">
                Line {report.loadError.line}: {report.loadError.text}
              </div>
            )}
            <pre className="mt-1 text-[10px] text-rose-300/80 whitespace-pre-wrap">
              {report.loadError.traceback}
            </pre>
          </div>
        )}

        {/* All Passed Celebration Banner */}
        {allPassed && !report?.loadError && (
          <div className="mb-3 p-2.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="font-semibold">All {testCases.length} tests passed! Excellent work!</span>
            </div>
            <button
              onClick={() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.8 } })}
              className="text-[11px] font-mono text-emerald-400 underline hover:text-emerald-300"
            >
              🎉 celebrate again
            </button>
          </div>
        )}

        {activeTab === "tests" ? (
          <div className="space-y-3">
            {/* Case selector pills */}
            <div className="flex flex-wrap gap-1.5">
              {testCases.map((tc, idx) => {
                const res = results[idx];
                const isSelected = selectedCaseIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      isSelected
                        ? "bg-zinc-800 text-white border border-zinc-700"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80"
                    }`}
                  >
                    {res ? (
                      res.passed ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <XCircle className="h-3 w-3 text-rose-400" />
                      )
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                    )}
                    <span>Case {idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Test Case Details */}
            {currentTestCase && (
              <div className="space-y-2.5 text-xs">
                {currentTestCase.description && (
                  <p className="text-zinc-400 italic text-[11px] leading-relaxed">
                    💡 {currentTestCase.description}
                  </p>
                )}

                {/* Input block */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
                    Input:
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800/80 font-mono text-zinc-200 text-xs overflow-x-auto">
                    {Object.entries(currentTestCase.input).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-zinc-500">{k} = </span>
                        <span>{formatValue(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected block */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
                    Expected:
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800/80 font-mono text-emerald-400/90 text-xs overflow-x-auto">
                    {formatValue(currentTestCase.expected)}
                  </div>
                </div>

                {/* Actual block (if test ran) */}
                {currentResult && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono font-medium uppercase tracking-wider">
                      <span className={currentResult.passed ? "text-emerald-400" : "text-rose-400"}>
                        Actual Output:
                      </span>
                      <span className="text-zinc-500 flex items-center gap-1 font-normal text-[10px]">
                        <Clock className="h-3 w-3" />
                        {currentResult.ms.toFixed(1)} ms
                      </span>
                    </div>
                    <div className={`p-2 rounded border font-mono text-xs overflow-x-auto ${
                      currentResult.passed
                        ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                        : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                    }`}>
                      {currentResult.error ? (
                        <div className="space-y-1 text-rose-300">
                          <div className="font-bold">{currentResult.error.type}: {currentResult.error.message}</div>
                          {currentResult.error.line && (
                            <div className="text-[10px] text-zinc-400">At line {currentResult.error.line}</div>
                          )}
                        </div>
                      ) : (
                        formatValue(currentResult.actual)
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Console stdout view */
          <div className="h-full">
            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 whitespace-pre-wrap min-h-[140px]">
              {report?.moduleStdout || currentResult?.stdout ? (
                <>
                  {report?.moduleStdout && <div>{report.moduleStdout}</div>}
                  {currentResult?.stdout && <div>{currentResult.stdout}</div>}
                </>
              ) : (
                <span className="text-zinc-600 italic">No console output. Use print(...) in your Python code to debug.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
