"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { Trace, Heap } from "@/lib/trace/types";
import type { VisualizationConfig, VisualizerType } from "@/data/types";
import { buildHeaps, formatValue, narrationFor } from "@/lib/trace/replay";
import { buildScene, type Panel, type Scalar } from "./scene";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  FastForward,
  Layers,
  Sparkles,
  Info
} from "lucide-react";

interface TraceVisualizerProps {
  trace: Trace | null;
  code: string;
  config?: VisualizationConfig;
  visualizerType?: VisualizerType;
}

export function TraceVisualizer({
  trace,
  code,
  config,
  visualizerType,
}: TraceVisualizerProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1); // 1 = 1000ms, 2 = 500ms
  const codeLines = useMemo(() => code.split("\n"), [code]);

  // Compute full heap for every step
  const heaps = useMemo<Heap[]>(() => {
    if (!trace || !trace.steps.length) return [];
    return buildHeaps(trace);
  }, [trace]);

  const totalSteps = trace?.steps.length ?? 0;
  const currentStep = trace?.steps[stepIdx];
  const prevStep = stepIdx > 0 ? trace?.steps[stepIdx - 1] : undefined;
  const currentHeap = heaps[stepIdx];
  const prevHeap = stepIdx > 0 ? heaps[stepIdx - 1] : undefined;

  // Active line number and narration
  const activeLine = currentStep?.line ?? null;
  const narration = activeLine ? narrationFor(codeLines, activeLine) : null;
  const lineText = activeLine ? (codeLines[activeLine - 1] ?? "") : "";

  // Build current visual scene
  const scene = useMemo(() => {
    if (!currentStep || !currentHeap) return null;
    return buildScene({
      step: currentStep,
      heap: currentHeap,
      prev: prevStep,
      prevHeap,
      config,
      visualizerType,
      lineText,
    });
  }, [currentStep, currentHeap, prevStep, prevHeap, config, visualizerType, lineText]);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setStepIdx((prev) => Math.min(prev + 1, totalSteps - 1));
    }, 1000 / speed);
    return () => clearTimeout(timer);
  }, [isPlaying, stepIdx, totalSteps, speed]);

  // Reset when trace changes
  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, [trace?.sourceHash, trace]);

  if (!trace || !trace.steps.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-zinc-500 bg-zinc-950/60 border border-zinc-800 rounded-lg">
        <Layers className="h-10 w-10 mb-3 text-zinc-600 animate-pulse" />
        <p className="text-sm font-medium text-zinc-400">Loading step-by-step visualizer...</p>
        <p className="text-xs text-zinc-600 mt-1">Generating memory state and pointer frames.</p>
      </div>
    );
  }

  const frames = currentStep?.frames ?? [];
  const currentFrame = frames[frames.length - 1];

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Top Narration Banner */}
      <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
            <span>Line {activeLine}:</span>
            <code className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[11px] text-emerald-300 truncate">
              {lineText.trim() || "(executing)"}
            </code>
          </div>
          {narration && (
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              {narration}
            </p>
          )}
        </div>
      </div>

      {/* Center Stage: Interactive Data Structure Visualizers */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Call Stack Indicator (for recursion) */}
        {frames.length > 1 && (
          <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs">
            <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="h-3 w-3" />
              <span>Call Stack Depth ({frames.length} active frames):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {frames.map((f, i) => (
                <span
                  key={f.id}
                  className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                    i === frames.length - 1
                      ? "bg-indigo-600/30 border-indigo-400 text-indigo-200 font-semibold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {f.name} (frame #{f.id})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scalar Variables (Counters, Flags, Targets) */}
        {scene?.scalars && scene.scalars.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {scene.scalars.map((s) => (
              <div
                key={s.name}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-all ${
                  s.changed
                    ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 scale-105"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300"
                }`}
              >
                <span className="text-zinc-500">{s.name} =</span>
                <span className="font-semibold text-white">
                  {formatValue(s.value, currentHeap)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Render Each Data Structure Panel */}
        {scene?.panels.map((panel, pIdx) => {
          if (panel.kind === "array") {
            return (
              <div key={pIdx} className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-emerald-400">
                    {panel.name} <span className="text-zinc-500 font-normal">({panel.container}, len={panel.len})</span>
                  </span>
                </div>

                {/* Array Cells */}
                <div className="overflow-x-auto pb-4 pt-1">
                  <div className="inline-flex gap-1.5 items-end">
                    {panel.items.map((item, idx) => {
                      const isChanged = panel.changed.has(idx);
                      const inWindow = panel.window && idx >= panel.window[0] && idx <= panel.window[1];
                      const pointersHere = panel.pointers.filter((p) => p.index === idx);

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          {/* Index label */}
                          <span className="text-[10px] font-mono text-zinc-500 mb-1">{idx}</span>

                          {/* Data box */}
                          <div
                            className={`flex items-center justify-center min-w-[38px] h-10 px-2 rounded font-mono text-xs font-medium border transition-all ${
                              isChanged
                                ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40"
                                : inWindow
                                ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
                                : "bg-zinc-900 border-zinc-700/80 text-zinc-200"
                            }`}
                          >
                            {formatValue(item, currentHeap)}
                          </div>

                          {/* Pointer Arrows under cells */}
                          <div className="min-h-[22px] flex flex-col items-center justify-start mt-1">
                            {pointersHere.map((p) => (
                              <div
                                key={p.name}
                                className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-amber-400"
                              >
                                <span>▲</span>
                                <span>{p.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          if (panel.kind === "grid") {
            return (
              <div key={pIdx} className="space-y-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-semibold text-emerald-400">
                  {panel.name} <span className="text-zinc-500 font-normal">({panel.rows.length} × {panel.rows[0]?.length ?? 0} grid)</span>
                </div>
                <div className="overflow-x-auto pb-2">
                  <table className="border-collapse font-mono text-xs">
                    <thead>
                      <tr>
                        <th className="p-1 text-[10px] text-zinc-600"></th>
                        {panel.rows[0]?.map((_, c) => (
                          <th key={c} className="p-1 text-[10px] text-zinc-500 font-normal">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {panel.rows.map((row, r) => (
                        <tr key={r}>
                          <td className="p-1 text-[10px] text-zinc-500 font-normal text-right pr-2">{r}</td>
                          {row.map((cell, c) => {
                            const coordKey = `${r},${c}`;
                            const isChanged = panel.changed.has(coordKey);
                            const mark = panel.marks.find((m) => m.r === r && m.c === c);

                            return (
                              <td key={c} className="p-0.5">
                                <div
                                  className={`flex items-center justify-center min-w-[34px] h-8 px-1.5 rounded font-mono text-xs border relative ${
                                    mark
                                      ? "bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400"
                                      : isChanged
                                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                                      : "bg-zinc-900 border-zinc-800 text-zinc-200"
                                  }`}
                                >
                                  {formatValue(cell, currentHeap)}
                                  {mark && (
                                    <span className="absolute -top-1.5 -right-1.5 px-1 rounded-full bg-amber-500 text-black text-[9px] font-bold">
                                      {mark.label}
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          if (panel.kind === "map") {
            return (
              <div key={pIdx} className="space-y-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-semibold text-emerald-400 flex items-center justify-between">
                  <span>{panel.name} <span className="text-zinc-500 font-normal">({panel.cls}, {panel.entries.length} keys)</span></span>
                  {panel.lookup && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-normal border border-zinc-700">
                      Lookup: <code className="text-amber-400">{panel.lookup.expr}</code> → {panel.lookup.found ? "✓ found" : "✗ not in map"}
                    </span>
                  )}
                </div>
                {panel.entries.length === 0 ? (
                  <div className="text-xs text-zinc-600 font-mono italic p-2 bg-zinc-900/40 rounded">
                    (empty dictionary)
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {panel.entries.map(([k, v], eIdx) => {
                      const keyStr = formatValue(k, currentHeap);
                      const isChanged = panel.changedKeys.has(keyStr);
                      return (
                        <div
                          key={eIdx}
                          className={`p-2 rounded border font-mono text-xs transition-all ${
                            isChanged
                              ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500"
                              : "bg-zinc-900 border-zinc-800 text-zinc-300"
                          }`}
                        >
                          <div className="text-[10px] text-zinc-500 truncate">{keyStr}</div>
                          <div className="font-semibold text-white truncate">{formatValue(v, currentHeap)}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (panel.kind === "set") {
            return (
              <div key={pIdx} className="space-y-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <div className="text-xs font-mono font-semibold text-emerald-400">
                  {panel.name} <span className="text-zinc-500 font-normal">(set, {panel.items.length} items)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {panel.items.map((item, sIdx) => {
                    const strVal = formatValue(item, currentHeap);
                    const isAdded = panel.added.has(strVal);
                    return (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-full font-mono text-xs border ${
                          isAdded
                            ? "bg-emerald-950/60 border-emerald-400 text-emerald-200"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300"
                        }`}
                      >
                        {strVal}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Bottom Controls Bar */}
      <div className="px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Play / Step Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStepIdx(0)}
            title="Reset to beginning"
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
            disabled={stepIdx === 0}
            title="Step Back (Left Arrow)"
            className="p-1.5 rounded-md hover:bg-zinc-800 disabled:opacity-40 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause" : "Play Animation"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-all"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={() => setStepIdx((s) => Math.min(totalSteps - 1, s + 1))}
            disabled={stepIdx >= totalSteps - 1}
            title="Step Forward (Right Arrow)"
            className="p-1.5 rounded-md hover:bg-zinc-800 disabled:opacity-40 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Step Scrubber Slider */}
        <div className="flex items-center gap-3 flex-1 max-w-xs w-full">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={stepIdx}
            onChange={(e) => setStepIdx(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[11px] font-mono text-zinc-400 shrink-0">
            {stepIdx + 1} / {totalSteps}
          </span>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
          <span className="text-zinc-500">Speed:</span>
          {[1, 2, 4].map((spd) => (
            <button
              key={spd}
              onClick={() => setSpeed(spd)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                speed === spd
                  ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                  : "hover:bg-zinc-800 text-zinc-400"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
