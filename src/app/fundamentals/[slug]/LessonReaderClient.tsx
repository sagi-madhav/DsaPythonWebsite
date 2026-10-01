"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Lesson, LessonBlock, Quiz, Exercise } from "@/data/types";
import { Navbar } from "@/components/layout/Navbar";
import { useProgressStore } from "@/store/useProgressStore";
import { usePyodide } from "@/hooks/usePyodide";
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  HelpCircle, 
  AlertCircle, 
  Lightbulb, 
  Terminal, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  Loader2,
  Check,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

interface LessonReaderClientProps {
  lesson: Lesson;
  prevLesson: { slug: string; title: string } | null;
  nextLesson: { slug: string; title: string } | null;
}

export function LessonReaderClient({
  lesson,
  prevLesson,
  nextLesson,
}: LessonReaderClientProps) {
  const { runScript, runTests, status: runnerStatus } = usePyodide();
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const markLessonCompleted = useProgressStore((state) => state.markLessonCompleted);
  const toggleProblemCompleted = useProgressStore((state) => state.toggleProblemCompleted);

  const isDone = completedLessons.includes(lesson.slug);

  // Snippet execution states (blockIdx -> stdout/error)
  const [snippetOutputs, setSnippetOutputs] = useState<Record<number, { stdout: string; error: string | null }>>({});
  const [runningSnippet, setRunningSnippet] = useState<number | null>(null);

  // Quiz selections (blockIdx -> selectedOptionIdx)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  // Exercise codes & results
  const [exerciseCodes, setExerciseCodes] = useState<Record<string, string>>({});
  const [exerciseResults, setExerciseResults] = useState<Record<string, { allPassed: boolean; message: string }>>({});
  const [runningExercise, setRunningExercise] = useState<string | null>(null);

  const handleRunSnippet = async (blockIdx: number, source: string) => {
    setRunningSnippet(blockIdx);
    try {
      const res = await runScript(source);
      setSnippetOutputs((prev) => ({
        ...prev,
        [blockIdx]: {
          stdout: res.stdout,
          error: res.error ? `${res.error.type}: ${res.error.message}` : null,
        },
      }));
    } catch (err: any) {
      setSnippetOutputs((prev) => ({
        ...prev,
        [blockIdx]: {
          stdout: "",
          error: err.message || "Failed to execute snippet",
        },
      }));
    } finally {
      setRunningSnippet(null);
    }
  };

  const handleSelectQuiz = (blockIdx: number, optionIdx: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [blockIdx]: optionIdx,
    }));
  };

  const handleRunExercise = async (exercise: Exercise) => {
    setRunningExercise(exercise.id);
    const code = exerciseCodes[exercise.id] ?? exercise.starterCode;
    try {
      const report = await runTests({
        source: code,
        harness: exercise.harness,
        tests: exercise.testCases,
      });

      if (report.loadError) {
        setExerciseResults((prev) => ({
          ...prev,
          [exercise.id]: {
            allPassed: false,
            message: `${report.loadError?.type}: ${report.loadError?.message}`,
          },
        }));
      } else {
        const passed = report.results.length > 0 && report.results.every((r) => r.passed);
        setExerciseResults((prev) => ({
          ...prev,
          [exercise.id]: {
            allPassed: passed,
            message: passed
              ? `✓ Passed all ${exercise.testCases.length} tests!`
              : `✗ Failed ${report.results.filter((r) => !r.passed).length} of ${exercise.testCases.length} tests.`,
          },
        }));
        if (passed) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
      }
    } catch (err: any) {
      setExerciseResults((prev) => ({
        ...prev,
        [exercise.id]: {
          allPassed: false,
          message: err.message || "Execution error",
        },
      }));
    } finally {
      setRunningExercise(null);
    }
  };

  const renderBlock = (block: LessonBlock, idx: number) => {
    switch (block.kind) {
      case "text": {
        return (
          <div key={idx} className="prose prose-invert prose-sm max-w-none space-y-2 text-zinc-300 leading-relaxed">
            {block.markdown.split("\n\n").map((para, pIdx) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={pIdx} className="text-base font-semibold text-white mt-6 mb-2">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("- ")) {
                return (
                  <ul key={pIdx} className="list-disc list-inside space-y-1 my-2">
                    {para.split("\n").map((line, lIdx) => (
                      <li key={lIdx}>{line.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={pIdx}>{para}</p>;
            })}
          </div>
        );
      }

      case "code": {
        const output = snippetOutputs[idx];
        const isRunning = runningSnippet === idx;

        return (
          <div key={idx} className="space-y-1.5 my-4">
            {block.caption && (
              <div className="text-xs text-zinc-400 italic flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{block.caption}</span>
              </div>
            )}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/80 bg-zinc-900/60">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-[11px] font-mono text-zinc-400">Python Sandbox</span>
                </div>
                <button
                  onClick={() => handleRunSnippet(idx, block.code)}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-medium text-xs shadow-sm transition-all"
                >
                  {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3 fill-current" />}
                  <span>Run</span>
                </button>
              </div>
              <pre className="p-3 text-xs font-mono text-zinc-200 overflow-x-auto whitespace-pre">
                {block.code}
              </pre>
              {output && (
                <div className="px-3 py-2 border-t border-zinc-800/80 bg-zinc-900/40 font-mono text-xs">
                  {output.stdout && (
                    <div className="text-zinc-300 whitespace-pre-wrap">{output.stdout}</div>
                  )}
                  {output.error && (
                    <div className="text-rose-400">{output.error}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case "quiz": {
        const q = block.question;
        const selected = quizAnswers[idx];
        const isAnswered = selected !== undefined;
        const isCorrect = selected === q.answerIndex;

        return (
          <div key={idx} className="my-5 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs font-semibold text-white leading-relaxed">
                {q.prompt}
              </div>
            </div>

            {q.code && (
              <pre className="p-2.5 rounded bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800/80 whitespace-pre">
                {q.code}
              </pre>
            )}

            <div className="space-y-1.5 pt-1">
              {q.options.map((option, optIdx) => {
                const isSelected = selected === optIdx;
                const isThisOptionCorrect = optIdx === q.answerIndex;

                let optClass = "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700";
                if (isAnswered) {
                  if (isThisOptionCorrect) {
                    optClass = "border-emerald-500/50 bg-emerald-950/40 text-emerald-200";
                  } else if (isSelected) {
                    optClass = "border-rose-500/50 bg-rose-950/40 text-rose-200";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectQuiz(idx, optIdx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition-colors flex items-center justify-between ${optClass}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isThisOptionCorrect && (
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isThisOptionCorrect && (
                      <X className="h-4 w-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                isCorrect ? "bg-emerald-950/20 text-emerald-300 border border-emerald-500/20" : "bg-rose-950/20 text-rose-300 border border-rose-500/20"
              }`}>
                <span className="font-bold">{isCorrect ? "Correct!" : "Not quite."} </span>
                <span>{q.explanation}</span>
              </div>
            )}
          </div>
        );
      }

      case "exercise": {
        const ex = block.exercise;
        const currentCode = exerciseCodes[ex.id] ?? ex.starterCode;
        const result = exerciseResults[ex.id];
        const isRunning = runningExercise === ex.id;

        return (
          <div key={idx} className="my-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                  Exercise: {ex.title}
                </span>
              </div>
              <button
                onClick={() => handleRunExercise(ex)}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-medium text-xs shadow-sm transition-all"
              >
                {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3 fill-current" />}
                <span>Test My Code</span>
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{ex.prompt}</p>

            <textarea
              value={currentCode}
              onChange={(e) => setExerciseCodes((prev) => ({ ...prev, [ex.id]: e.target.value }))}
              rows={6}
              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60 resize-y"
              spellCheck={false}
            />

            {result && (
              <div className={`p-2.5 rounded-lg text-xs font-mono font-medium ${
                result.allPassed
                  ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-950/40 text-rose-300 border border-rose-500/30"
              }`}>
                {result.message}
              </div>
            )}
          </div>
        );
      }

      case "callout": {
        const toneBorder =
          block.tone === "tip"
            ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-200"
            : block.tone === "warning"
            ? "border-amber-500/30 bg-amber-950/20 text-amber-200"
            : "border-blue-500/30 bg-blue-950/20 text-blue-200";

        return (
          <div key={idx} className={`p-3.5 rounded-xl border my-4 space-y-1 ${toneBorder}`}>
            <div className="font-semibold text-xs flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5" />
              <span>{block.title}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{block.markdown}</p>
          </div>
        );
      }

      case "table": {
        return (
          <div key={idx} className="my-4 overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i} className="p-2.5 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 bg-zinc-950">
                {block.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-900/40">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-zinc-300">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case "bigOChart": {
        return (
          <div key={idx} className="my-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Interactive Growth Rates Comparison
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-emerald-400 font-bold">O(1)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Constant time. Instant lookup.</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-cyan-400 font-bold">O(log n)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Halving search space. Binary search.</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-blue-400 font-bold">O(n)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Linear scan over n items.</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-amber-400 font-bold">O(n log n)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Standard comparison sorting.</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-rose-400 font-bold">O(n²)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Nested loops over pairs.</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-purple-400 font-bold">O(2ⁿ)</span>
                <div className="text-[11px] text-zinc-400 mt-1">Subsets / branching decision tree.</div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/fundamentals"
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Lessons</span>
          </Link>

          <button
            onClick={() => markLessonCompleted(lesson.slug, !isDone)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              isDone
                ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Circle className="h-3.5 w-3.5 text-zinc-500" />}
            <span>{isDone ? "Completed" : "Mark as Complete"}</span>
          </button>
        </div>

        {/* Lesson Header */}
        <div className="space-y-2 border-b border-zinc-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {lesson.title}
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {lesson.goal}
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-4">
          {lesson.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>

        {/* Bottom Pagination Links */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
          {prevLesson ? (
            <Link
              href={`/fundamentals/${prevLesson.slug}`}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{prevLesson.title}</span>
            </Link>
          ) : <div />}

          {nextLesson ? (
            <Link
              href={`/fundamentals/${nextLesson.slug}`}
              className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>{nextLesson.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/roadmap"
              className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Go to Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
